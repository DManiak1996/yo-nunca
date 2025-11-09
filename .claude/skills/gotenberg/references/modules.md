# Gotenberg - Modules

**Pages:** 1

---

## Routes

**URL:** https://gotenberg.dev/docs/routes

**Contents:**
- Routes
- Convert with Chromium​
  - URL into PDF route​
  - HTML file into PDF route​
  - Markdown file(s) into PDF route​
  - Page Properties​
  - Header & Footer​
  - Wait Before Rendering​
  - Emulated Media Type​
  - Cookies​

Most routes within Gotenberg are designed to accept multipart/form-data requests and generate one or more PDF files. This guide will assist you in understanding their usage.

The next routes leverage the capabilities of the Chromium browser to effectively transform a diverse range of HTML documents into PDFs.

Checkout the Chromium module configuration to tailor the Chromium behavior to your needs.

This multipart/form-data route converts a web page into PDF.

It accepts the following specific form field:

This errors happens if one ore more form fields are invalid.

Gotenberg also returns a 400 Bad Request if it encounters any of the following network errors while attempting to load the main page:

This error happens when the given URL is not authorized.

See the Chromium module configuration for more details.

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

This multipart/form-data route converts an HTML file into PDF.

It accepts the following specific form file:

This errors happens if one ore more form fields are invalid.

Gotenberg also returns a 400 Bad Request if it encounters any of the following network errors while attempting to load the main page:

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

You may also send additional files, like images, fonts, stylesheets, and so on.

The only requirement is that their paths in the index.html file are on the root level.

For instance, this will work:

Remote paths for images, fonts (e.g., Google Fonts), etc., work too.

Beware of the <base> HTML element, as it may break path resolution for any relative href.

This multipart/form-data route converts Markdown file(s) into PDF.

It accepts the following specific form files:

It works like the HTML route but with access to a Go template function toHTML. This function converts a markdown file's content into HTML (with MathJaX support).

This errors happens if one ore more form fields are invalid.

Gotenberg also returns a 400 Bad Request if it encounters any of the following network errors while attempting to load the main page:

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

Each route accepts the following form fields:

If the singlePage form field is set to true, it automatically overrides the values from the paperHeight and nativePageRanges form fields.

Examples of paper size (width x height):

The rules regarding the printBackground and omitBackground form fields are the following:

Each route accepts the following form files:

Each of them has to be a complete HTML document:

It is recommended to use a large font-size to ensure that the content displays correctly.

The following classes allow you to inject printing values:

There are some limitations:

Remove external assets from your header and footer; they can slow rendering or cause the request to fail.

Each route accepts the following form fields:

These form fields do not work if JavaScript is disabled via --chromium-disable-javascript.

See the Chromium module configuration for more details.

When the page relies on JavaScript for rendering, and you don't have access to the page's code, you may want to wait a certain amount of time to make sure Chromium has fully rendered the page you're trying to generate.

A more reliable option than the previous form field:

Each route accepts the following form field:

Some websites have dedicated CSS rules for print. Using "screen" allows you to force the "standard" CSS rules.

Each route accepts the following form field:

Cookies are set to automatically expire after a specified duration, determined by the request time limit. Additionally, you have the option to clear cookies after each conversion.

For further details, refer to the API module configuration and the Chromium module configuration sections.

This form field is a JSON-formatted array with items accepting the following keys:

Each route accepts the following form fields:

You can add an optional scope token to a header value to restrict its application using a regular expression.

For example, "X-Scoped-Header":"value;scope=https?:\\/\\/([a-zA-Z0-9-]+\\.)*domain\\.com\\/.*" will apply the X-Scoped-Header only to requests directed at domain.com and its subdomains.

Note that the scope token is only processed by Gotenberg and is never sent with the header value.

Each route accepts the following form field:

An X99 entry means every HTTP status codes between X00 and X99 (e.g., 499 means every HTTP status codes between 400 and 499).

Gotenberg returns a 400 Bad Request if it encounters any of the following network errors while attempting to load the main page:

If you want a similar behavior for resources too, you may use the following form field:

It's currently not possible to have more details about the exact resource that is failing.

Each route accepts the following form field:

This form field does not work if JavaScript is disabled via --chromium-disable-javascript.

See the Chromium module configuration for more details.

Each route accepts the following form field:

By default, Gotenberg does not wait for the network idle event, significantly speeding up the conversion process.

Prior to Gotenberg 8.11.0, false was the default value.

Each route accepts the following form fields:

Gotenberg currently does not validate the splitSpan value if splitMode is pages, as it depends on the selected engine for the split feature:

See also the PDF Engines module configuration for more details.

Each route accepts the following form fields:

As of Gotenberg 8.21.0, using the generateTaggedPdf form field may yield better results if you're prioritizing accessibility over strict (and sometimes hacky) PDF/UA compliance.

At present, the following PDF/A formats are available:

Each route accepts the following form field:

Not all metadata are writable. Consider taking a look at https://exiftool.org/TagNames/XMP.html#pdf for an (exhaustive?) list of available metadata.

Writing metadata may compromise PDF/A compliance.

Each route accepts the following form field:

You can capture screenshots using the following three routes, which function similarly to their PDF equivalents:

These routes accept the following form fields:

The following features are also available:

If your screenshots' content is repeated and clipped, consider setting the skipNetworkIdleEvent form field to false.

The next route leverage the capabilities of LibreOffice to effectively transform a diverse range of Office documents (Word, Excel, PowerPoint, etc.) into PDFs.

Checkout the LibreOffice module configuration to tailor the LibreOffice behavior to your needs.

This route mainly targets Office documents, but you can also use it to manipulate PDFs, for instance by compressing images.

This multipart/form-data route convert one or more Office documents into PDF.

Currently, the following extensions are supported:

.123 .602 .abw .bib .bmp .cdr .cgm .cmx .csv .cwk .dbf .dif .doc .docm .docx .dot .dotm .dotx .dxf .emf .eps .epub .fodg .fodp .fods .fodt .fopd .gif .htm .html .hwp .jpeg .jpg .key .ltx .lwp .mcw .met .mml .mw .numbers .odd .odg .odm .odp .ods .odt .otg .oth .otp .ots .ott .pages .pbm .pcd .pct .pcx .pdb .pdf .pgm .png .pot .potm .potx .ppm .pps .ppt .pptm .pptx .psd .psw .pub .pwp .pxl .ras .rtf .sda .sdc .sdd .sdp .sdw .sgl .slk .smf .stc .std .sti .stw .svg .svm .swf .sxc .sxd .sxg .sxi .sxm .sxw .tga .tif .tiff .txt .uof .uop .uos .uot .vdx .vor .vsd .vsdm .vsdx .wb2 .wk1 .wks .wmf .wpd .wpg .wps .xbm .xhtml .xls .xlsb .xlsm .xlsx .xlt .xltm .xltx .xlw .xml .xpm .zabw

This errors happens if one ore more form fields are invalid.

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

The route also accepts the following form fields:

If multiple files are provided, the page ranges will be applied independently to each file.

The route accepts the following form fields:

The route also accepts the following form fields:

Alphanumerically means numbers first, then letters in alphabetical order.

The route accepts the following form fields:

Gotenberg currently does not validate the splitSpan value if splitMode is pages, as it depends on the selected engine for the split feature:

See also the PDF Engines module configuration for more details.

The route also accepts the following form fields:

At present, the following PDF/A formats are available:

The route accepts the following form field:

Not all metadata are writable. Consider taking a look at https://exiftool.org/TagNames/XMP.html#pdf for an (exhaustive?) list of available metadata.

Writing metadata may compromise PDF/A compliance.

The route accepts the following form field:

This multipart/form-data route transforms one or more PDF files into the requested PDF/A format and/or PDF/UA.

It accepts the following form files and form fields:

*Note that at least one of the form field must be provided.

At present, the following PDF/A formats are available:

This errors happens if one ore more form fields are invalid.

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

This multipart/form-data route returns the metadata of one or more PDF files.

It accepts the following form files:

This errors happens if one ore more form fields are invalid.

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

This multipart/form-data route accepts one or more PDF files and writes/overrides their metadata.

It accepts the following form files and form field:

Not all metadata are writable. Consider taking a look at https://exiftool.org/TagNames/XMP.html#pdf for an (exhaustive?) list of available metadata.

Writing metadata may compromise PDF/A compliance.

This errors happens if one ore more form fields are invalid.

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

This multipart/form-data route accepts PDF files and merges them alphanumerically.

Alphanumerically means numbers first, then letters in alphabetical order.

This errors happens if one ore more form fields are invalid.

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

This multipart/form-data route splits PDF files.

Gotenberg currently does not validate the splitSpan value if splitMode is pages, as it depends on the selected engine for the split feature:

See also the PDF Engines module configuration for more details.

This errors happens if one ore more form fields are invalid.

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

This multipart/form-data route flatten PDF files.

This errors happens if one ore more form fields are invalid.

If a request doesn't complete within a specified duration, the API will respond with a 503 Service Unavailable status.

See the API module configuration for more details.

The details entry gathers the health checks from modules:

The body will be empty with the HEAD method.

This route exposes the metrics from other modules using the Prometheus format.

Currently, the metrics include:

See the Prometheus module configuration for more information.

Custom variants of Gotenberg may not print a strict semver version.

For instance, the live demo prints 8.24.0-live-demo-snapshot.

See for instance https://demo.gotenberg.dev/debug.

This route is only available if the flag --api-enable-debug-route is set to true.

A trace, or request ID, serves to identify a specific request in the logs.

By default, the API assigns a unique UUID trace to every request. However, you also have the option to specify the trace for each request using the Gotenberg-Trace header.

The API also incorporates a Gotenberg-Trace header into each response. If you're utilizing the webhook feature, this header will also be added to each request made to your callbacks.

The --api-trace-header flag allows you to configure the header key. See the API module configuration for more details.

By default, for multipart/form-data endpoints, the API generates a response with a UUID filename. However, you have the option to specify the filename for each request using the Gotenberg-Output-Filename header.

The API automatically appends the file extension, so there's no need for you to set it manually.

All multipart/form-data endpoints accept the following form field:

This form field does not work if this feature is disabled via --api-disable-download-from.

For further details, refer to the API module configuration.

This form field is a JSON-formatted array with items accepting the following keys:

This errors happens if at least one entry is invalid.

This error happens if at least one of the given URLs is not authorized.

See the API module configuration for more details.

Currently, a bug is preventing Gotenberg to parse an empty mediatype. If you're using AWS S3, make sure to set the Content-Disposition header with the attachment value in the S3 metadata.

**Examples:**

Example 1 (text):
```text
POST /forms/chromium/convert/url
```

Example 2 (bash):
```bash
curl \--request POST http://localhost:3000/forms/chromium/convert/url \--form url=https://my.url \-o my.pdf
```

Example 3 (text):
```text
Content-Disposition: attachement; filename={output-filename.pdf}Content-Type: {content-type}Content-Length: {content-length}Gotenberg-Trace: {trace}Body: {output-file}
```

Example 4 (text):
```text
Content-Type: text/plain; charset=UTF-8Gotenberg-Trace: {trace}Body: {error}
```

---
