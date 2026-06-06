import crypto from "crypto";

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || "v21";
const GOOGLE_ADS_AUTH_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_ADS_API_URL = `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}`;

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function cleanCustomerId(value) {
  return onlyDigits(value);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normalizePhone(phone) {
  const digits = onlyDigits(phone);
  if (!digits) return "";
  return digits.startsWith("64") ? `+${digits}` : `+64${digits.replace(/^0/, "")}`;
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function formatGoogleAdsDateTime(date = new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetMinutes);
  const offsetHours = pad(Math.floor(absOffset / 60));
  const offsetMins = pad(absOffset % 60);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}${sign}${offsetHours}:${offsetMins}`;
}

function getConversionActionResourceName() {
  if (process.env.CONVERSION_ACTION_RESOURCE) {
    return process.env.CONVERSION_ACTION_RESOURCE;
  }

  const customerId = cleanCustomerId(process.env.GOOGLE_ADS_CUSTOMER_ID);
  const conversionActionId = cleanCustomerId(
    process.env.GOOGLE_ADS_CONVERSION_ACTION_ID
  );

  if (!customerId || !conversionActionId) return "";
  return `customers/${customerId}/conversionActions/${conversionActionId}`;
}

function getMissingConfig() {
  return [
    "GOOGLE_ADS_DEVELOPER_TOKEN",
    "GOOGLE_ADS_CLIENT_ID",
    "GOOGLE_ADS_CLIENT_SECRET",
    "GOOGLE_ADS_REFRESH_TOKEN",
    "GOOGLE_ADS_CUSTOMER_ID",
  ].filter((key) => !process.env[key]);
}

async function getGoogleAdsAccessToken() {
  const response = await fetch(GOOGLE_ADS_AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description || data.error || "Could not get Google Ads token"
    );
  }

  return data.access_token;
}

function buildUserIdentifiers({ email, phone } = {}) {
  const identifiers = [];
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = normalizePhone(phone);

  if (normalizedEmail) {
    identifiers.push({ hashedEmail: sha256(normalizedEmail) });
  }

  if (normalizedPhone) {
    identifiers.push({ hashedPhoneNumber: sha256(normalizedPhone) });
  }

  return identifiers.slice(0, 5);
}

function getClickIdentifier({ gclid, gbraid, wbraid } = {}) {
  if (gclid) return { gclid };
  if (wbraid) return { wbraid };
  if (gbraid) return { gbraid };
  return {};
}

export async function uploadGoogleAdsClickConversion({
  clickIds = {},
  email,
  phone,
  transactionId,
  conversionDate = new Date(),
  conversionValue = 0,
  currencyCode = "NZD",
  debugEnabled = true,
  validateOnly = false,
} = {}) {
  const missingConfig = getMissingConfig();
  const conversionAction = getConversionActionResourceName();

  if (!conversionAction) {
    missingConfig.push("GOOGLE_ADS_CONVERSION_ACTION_ID");
  }

  if (missingConfig.length) {
    return {
      success: false,
      skipped: true,
      message: "Missing Google Ads configuration",
      missingConfig,
    };
  }

  const clickIdentifier = getClickIdentifier(clickIds);
  const userIdentifiers = buildUserIdentifiers({ email, phone });

  if (!Object.keys(clickIdentifier).length && !userIdentifiers.length) {
    return {
      success: false,
      skipped: true,
      message: "No Google click ID or enhanced conversion user data found",
    };
  }

  const customerId = cleanCustomerId(process.env.GOOGLE_ADS_CUSTOMER_ID);
  const accessToken = await getGoogleAdsAccessToken();
  const conversion = {
    ...clickIdentifier,
    conversionAction,
    conversionDateTime: formatGoogleAdsDateTime(conversionDate),
    conversionValue: Number(conversionValue) || 0,
    currencyCode,
    orderId: transactionId,
    conversionEnvironment: "WEB",
  };

  if (userIdentifiers.length) {
    conversion.userIdentifiers = userIdentifiers;
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    "Content-Type": "application/json",
  };

  const loginCustomerId = cleanCustomerId(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID);
  if (loginCustomerId) {
    headers["login-customer-id"] = loginCustomerId;
  }

  const response = await fetch(
    `${GOOGLE_ADS_API_URL}/customers/${customerId}:uploadClickConversions`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        conversions: [conversion],
        partialFailure: true,
        validateOnly,
        debugEnabled,
      }),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.partialFailureError) {
    return {
      success: false,
      status: response.status,
      data,
    };
  }

  return {
    success: true,
    status: response.status,
    data,
  };
}
