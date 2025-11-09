# Gotenberg - Api

**Pages:** 1

---

## Webhook

**URL:** https://gotenberg.dev/docs/webhook

**Contents:**
- Webhook

The webhook feature lets Gotenberg asynchronously upload output files from multipart/form-data routes to a specified destination. The API immediately returns a 204 No Content response while the upload continues in the background.

It uses the following HTTP headers:

Checkout the Webhook module configuration to tailor the Webhook feature to your needs.

PipeDream provides an excellent platform if you wish to test the webhook feature.

This errors happens if one ore more headers are invalid.

This error happens if at least one of the given URLs is not authorized.

See the Webhook module configuration for more details.

You may customize the Content-Disposition header thanks to output filename header.

**Examples:**

Example 1 (bash):
```bash
curl \--request POST http://localhost:3000/forms/chromium/convert/url \--header 'Gotenberg-Webhook-Extra-Http-Headers: {"MyHeader": "MyValue"}' \--header 'Gotenberg-Webhook-Url: https://my.webhook.url' \--header 'Gotenberg-Webhook-Method: PUT' \--header 'Gotenberg-Webhook-Error-Url: https://my.webhook.error.url' \--header 'Gotenberg-Webhook-Error-Method: POST' \--form url=https://my.url
```

Example 2 (text):
```text
Gotenberg-Trace: {trace}
```

Example 3 (text):
```text
Content-Type: text/plain; charset=UTF-8Gotenberg-Trace: {trace}Body: {error}
```

Example 4 (text):
```text
Content-Type: text/plain; charset=UTF-8Gotenberg-Trace: {trace}Body: Forbidden
```

---
