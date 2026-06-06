import { NextResponse } from "next/server";

const MOVERMATE_TOKEN = process.env.MOVERMATE_TOKEN;
const MOVERMATE_LEADS_URL =
  process.env.MOVERMATE_LEADS_URL ||
  "https://server.movermate.com.au/webhook/leads";

function removeEmptyValues(value) {
  if (Array.isArray(value)) {
    return value
      .map(removeEmptyValues)
      .filter((item) => item !== undefined && item !== null && item !== "");
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [key, item]) => {
      const nextValue = removeEmptyValues(item);
      if (
        nextValue !== undefined &&
        nextValue !== null &&
        nextValue !== "" &&
        (!Array.isArray(nextValue) || nextValue.length > 0) &&
        (typeof nextValue !== "object" ||
          Array.isArray(nextValue) ||
          Object.keys(nextValue).length > 0)
      ) {
        acc[key] = nextValue;
      }
      return acc;
    }, {});
  }

  return value;
}

export async function POST(req) {
  if (!MOVERMATE_TOKEN) {
    return NextResponse.json(
      {
        message: "Missing Movermate configuration",
        success: false,
        missing: { MOVERMATE_TOKEN: true },
      },
      { status: 400 }
    );
  }

  const { movermateLead } = await req.json();
  const payload = removeEmptyValues(movermateLead || {});

  if (!payload.firstName) {
    return NextResponse.json(
      {
        message: "Missing required Movermate lead field",
        success: false,
        missing: { firstName: true },
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(MOVERMATE_LEADS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: MOVERMATE_TOKEN,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Movermate submission failed",
          success: false,
          status: response.status,
          data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: "Movermate lead submitted",
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unknown Movermate route error",
        success: false,
      },
      { status: 500 }
    );
  }
}
