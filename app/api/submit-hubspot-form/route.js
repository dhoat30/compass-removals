

import { NextResponse } from 'next/server'
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
export async function POST(req, res) {
    const { hubspotFormObject, hubspotFormID, portalID } = await req.json();

    if (!HUBSPOT_API_KEY || !portalID || !hubspotFormID) {
        return NextResponse.json({
            message: "Missing HubSpot configuration",
            success: false,
            missing: {
                HUBSPOT_API_KEY: !HUBSPOT_API_KEY,
                portalID: !portalID,
                hubspotFormID: !hubspotFormID,
            }
        }, { status: 400 });
    }

    var payload = JSON.stringify({
        "submittedAt": new Date().getTime(),
        "fields": (hubspotFormObject || []).filter((field) => field?.name && field.value !== undefined && field.value !== null),

        "legalConsentOptions": { // Include this object when GDPR options are enabled
            "consent": {
                "consentToProcess": true,
                "text": "I agree to allow Example Company to store and process my personal data.",
                "communications": [
                    {
                        "value": true,
                        "subscriptionTypeId": 999,
                        "text": "I agree to receive marketing communications from Example Company."
                    }
                ]
            }
        }
    })

    // hubspot request options
    var postOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: payload,
        redirect: 'follow'
    };

    try {
        // submit form
        const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalID}/${hubspotFormID}`, postOptions)
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return NextResponse.json({
                message: "HubSpot submission failed",
                success: false,
                status: response.status,
                data,
            }, { status: response.status });
        }

        return NextResponse.json({ message: "This Worked", success: true, data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Unknown HubSpot route error",
            success: false
        }, { status: 500 });
        // res.status(500).send('Error sending email');

    }
}

export async function GET(req, res) {
    const response = await res.json();
    return NextResponse.json( response);

};
