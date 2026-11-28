# Contact form and API

[Back to README](../README.md)

## Configure email

Create a Resend API key and verify a sender domain in Resend. For local development set the following in `apps/web/.env.local` (example values only):

```dotenv
RESEND_API_KEY=replace_with_your_resend_api_key
CONTACT_FROM_EMAIL="AZMACH.E <enquiries@azmache.com>"
```

Use a sender address authorized by Resend. Restart the development server after changing environment variables. Do not prefix these variables with NEXT_PUBLIC_. The current root ignore file does not explicitly list .env files; before creating a local secret file, add a local exclusion (e.g. in .git/info/exclude) and verify with `git check-ignore apps/web/.env.local`. Never commit credentials.

Production environments must supply the same two variables securely. The recipient is currently hardcoded to info@azmache.com in the route; CONTACT_FROM_EMAIL controls the sender, not the recipient.

## Endpoint

POST /api/contact/ with Content-Type: application/json.

| Field | Validation |
| --- | --- |
| name | Required, maximum 100 characters |
| email | Required, email format, maximum 150 characters |
| company | Optional, maximum 120 characters |
| phone | Required, maximum 40 characters |
| service | Required, maximum 80 characters |
| message | Required, 20–1200 characters |

Strings are trimmed. The route rejects a body longer than 8192 JavaScript string units, malformed JSON and non-object payloads. The service value is length-validated rather than checked against a fixed enum.

## Responses

| HTTP status | Meaning |
| --- | --- |
| 200 | Resend accepted the request; response contains ok: true |
| 400 | Invalid JSON or fields |
| 403 | Supplied Origin does not match request URL origin |
| 413 | Body too long |
| 503 | Email configuration unavailable |
| 502 | Provider failure or network error |

Error responses contain an error string. A successful response means provider acceptance, not proof of inbox delivery. Provider requests have a 10-second timeout.

## Request flow

The client serializes FormData as JSON, disables submit while sending, displays a status message and resets the form after success. The server validates the request, sends a plain-text email via Resend and sets reply_to to the visitor email. No provider credentials are sent to the browser.

## Operational notes

Origin validation is not authentication, and requests without Origin are accepted. There is no application-level rate limiting, CAPTCHA, durable queue or database storage in the current route. Consider rate limiting and abuse prevention before high-volume public use. Avoid logging enquiry contents or secrets; treat submitted contact information as personal data. Check provider dashboard and verified DNS settings when troubleshooting delivery.
