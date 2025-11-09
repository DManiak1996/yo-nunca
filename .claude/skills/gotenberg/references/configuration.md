# Gotenberg - Configuration

**Pages:** 1

---

## Configuration

**URL:** https://gotenberg.dev/docs/configuration

**Contents:**
- Configuration
- How To​
- API​
- Chromium​
- LibreOffice​
  - Switch Language​
- PDF Engines​
- Webhook​
- Prometheus​
- Logging​

The Docker image includes a binary with flags to configure its modules. This guide lists all available flags so you can fine-tune Gotenberg to your needs.

To set one or more flags, it's necessary to override the Docker image's default command.

For example, with the Docker CLI:

Or with Docker Compose:

Do not redefine the Gotenberg Docker image default entrypoint, but override the command instead. See this issue for more details.

Alternatively, you can set environment variables that directly correspond to the command-line flags.

For example, with the Docker CLI:

Or with Docker Compose:

The API module is an HTTP/1 and HTTP/2 (with H2C support) server.

The following flags allow you to configure the API module:

The Chromium module interacts with the Chromium browser to convert HTML documents to PDF.

A single Chromium browser manages the conversions in a stateful mode, enabling quicker single conversions. However, due to a lock mechanism, a Chromium browser cannot execute parallel operations.

During periods of heavy load, incoming requests will accumulate in the queue until they are processed, time out, or the queue reaches its maximum capacity. In the latter case, the request will be terminated prematurely.

To maintain performance under a heavy load, consider increasing the number of Gotenberg instances.

Before Gotenberg 8.22.0, the amd64 image used Google Chrome (stable), while other architectures used Chromium. Now all architectures use Chromium.

The following flags allow you to configure the Chromium module:

*Prior to Gotenberg 8.15.2, restarting Chromium resulted in zombie processes.

The LibreOffice module interacts with LibreOffice to convert numerous documents to PDF, thanks to unoconv.

A single LibreOffice instance manages the conversions in a stateful mode, enabling quicker single conversions. However, due to a lock mechanism, a LibreOffice instance cannot execute parallel operations.

During periods of heavy load, incoming requests will accumulate in the queue until they are processed, time out, or the queue reaches its maximum capacity. In the latter case, the request will be terminated prematurely.

To maintain performance under a heavy load, consider increasing the number of Gotenberg instances.

The following flags allow you to configure the LibreOffice module:

By default, LibreOffice uses the English language when it converts documents to PDF. You may override this behavior by building your own Docker image.

For instance, with the German language:

Gotenberg 8.23.1 and after

Prior Gotenberg 8.22.0

The PDF Engines module gathers all engines that can manipulate PDF files. It calls each engine until one successfully handles a task. A PDF engine is an external tool that Gotenberg leverages to perform a specific task, such as merging PDF files.

Currently, Gotenberg supports the following PDF engines:

PDFtk and QPDF only supports the split mode pages with unification.

The following flags allow you to configure the PDF Engines module:

As of Gotenberg 8.13.0, the flag --pdfengines-engines has been deprecated.

The webhook feature enables Gotenberg to upload the output file originating from multipart/form-data routes to a selected destination.

The following flags allow you to configure the Webhook module:

The Prometheus module collects metrics from other modules and exposes an HTTP endpoint that can be scraped by Prometheus.

The following flags allow you to configure the Prometheus module:

Gotenberg employs a logger that generates structured logs. Structured logs are formatted in a standardized, machine-readable way, making them extremely beneficial for centralized log management.

The following flags allow you to configure the logger:

As of Gotenberg 8.19.0, the flag --log-enable-gcp-severity has been deprecated in favor of --log-enable-gcp-fields.

To ensure running tasks have enough time to complete, Gotenberg waits for a specific duration before initiating the shutdown process.

The following flag allows you to configure this duration:

For Gotenberg versions prior to 8.21.0, when using the webhook feature, make sure this duration is equal to or longer than the API timeout. This ensures that all asynchronous processes finish before Gotenberg begins its shutdown sequence.

The following flag allows you to hide the startup banner with:

The default Docker image is pre-packaged with an extensive assortment of fonts, including Asian ones. If your application requires additional or specific fonts not included in this collection, you'll need to construct a tailored Docker image to incorporate those fonts.

Or, if you have many fonts:

You could also mount a volume containing your fonts to /usr/local/share/fonts/ as suggested in this comment.

The Docker image employs a specific non-root user, named gotenberg, with a User ID (uid) and Group ID (gid) of 1001. If you want to change these identifiers, you will have to build a custom Docker image:

Since Gotenberg 8.21.0, the image also supports arbitrary user IDs (OpenShift).

**Examples:**

Example 1 (bash):
```bash
docker run --rm -p "3000:3000" gotenberg/gotenberg:8 gotenberg --my-module-property=foo
```

Example 2 (yaml):
```yaml
services:  # Your other services.  gotenberg:    image: gotenberg/gotenberg:8    command:      - "gotenberg"      - "--my-module-property=foo"
```

Example 3 (bash):
```bash
docker run --rm -p "3000:3000" -e MY_MODULE_PROPERTY=foo gotenberg/gotenberg:8
```

Example 4 (yaml):
```yaml
services:  # Your other services.  gotenberg:    image: gotenberg/gotenberg:8    environment:      MY_MODULE_PROPERTY: "foo"
```

---
