"use client";

export function sendFormSubmissionToGoogleTagManager({
  eventName = "quote_form_submission",
  formName = "Moving Quote",
  formData = {},
  clickIds = {},
  transactionId,
  conversionValue,
  currency = "NZD",
} = {}) {
  if (typeof window === "undefined") return false;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    formName,
    transaction_id: transactionId,
    orderId: transactionId,
    value: conversionValue,
    currency,
    formData: {
      ...formData,
      gclid: clickIds.gclid || formData.gclid || "",
      gbraid: clickIds.gbraid || formData.gbraid || "",
      wbraid: clickIds.wbraid || formData.wbraid || "",
      fbclid: clickIds.fbclid || formData.fbclid || "",
      fbc: clickIds.fbc || formData.fbc || "",
      fbp: clickIds.fbp || formData.fbp || "",
    },
  });

  return true;
}
