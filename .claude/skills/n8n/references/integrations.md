# N8N - Integrations

**Pages:** 24

---

## Using an API playground

**URL:** llms-txt#using-an-api-playground

**Contents:**
- Documentation playground
- Built-in playground

This documentation site provides a playground to test out calls. Self-hosted users also have access to a built-in playground hosted as part of their instance.

## Documentation playground

You can test API calls from this site's [API reference](../api-reference/). You need to set your server's base URL and instance name, and add an API key.

n8n uses [Scalar's](https://github.com/scalar/scalar) open source API platform to power this functionality.

Exposed API key and data

Use a test API key with limited scopes and test data when using a playground. All calls from the playground are routed through Scalar's proxy servers.

You have access to your live data. This is useful for trying out requests. Be aware you can change or delete real data.

## Built-in playground

The API playground isn't available on Cloud. It's available for all self-hosted pricing tiers.

The n8n API comes with a built-in Swagger UI playground in self-hosted versions. This provides interactive documentation, where you can try out requests. The path to access the playground depends on your hosting.

n8n constructs the path from values set in your environment variables:

The API version number is `1`. There may be multiple versions available in the future.

If you select **Authorize** and enter your API key in the API playground, you have access to your live data. This is useful for trying out requests. Be aware you can change or delete real data.

The API includes built-in documentation about credential formats. This is available using the `credentials` endpoint:

How to find `credentialTypeName`

To find the type, download your workflow as JSON and examine it. For example, for a Google Drive node the `{credentialTypeName}` is `googleDriveOAuth2Api`:

**Examples:**

Example 1 (unknown):
```unknown
N8N_HOST:N8N_PORT/N8N_PATH/api/v<api-version-number>/docs
```

Example 2 (unknown):
```unknown
N8N_HOST:N8N_PORT/N8N_PATH/api/v<api-version-number>/credentials/schema/{credentialTypeName}
```

Example 3 (unknown):
```unknown
{
    ...,
    "credentials": {
        "googleDriveOAuth2Api": {
        "id": "9",
        "name": "Google Drive"
        }
    }
}
```

---

## n8n public REST API

**URL:** llms-txt#n8n-public-rest-api

**Contents:**
- Learn about REST APIs

The n8n API isn't available during the free trial. Please upgrade to access this feature.

Using n8n's public [API](../glossary/#api), you can programmatically perform many of the same tasks as you can in the GUI. This section introduces n8n's REST API, including:

- How to [authenticate](authentication/)
- [Paginating](pagination/) results
- Using the [built-in API playground](using-api-playground/) (self-hosted n8n only)
- [Endpoint reference](api-reference/)

n8n provides an [n8n API node](../integrations/builtin/core-nodes/n8n-nodes-base.n8n/) to access the API in your workflows.

## Learn about REST APIs

The API documentation assumes you are familiar with REST APIs. If you're not, these resources may be helpful:

- [KnowledgeOwl's guide to working with APIs](https://support.knowledgeowl.com/help/working-with-apis): a basic introduction, including examples of how to call REST APIs.
- [IBM Cloud Learn Hub - What is an Application Programming Interface (API)](https://www.ibm.com/cloud/learn/api): this gives a general, but technical, introduction to APIs.
- [IBM Cloud Learn Hub - What is a REST API?](https://www.ibm.com/cloud/learn/rest-apis): more detailed information about REST APIs.
- [MDN web docs - An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview): REST APIs work over HTTP and use HTTP verbs, or methods, to specify the action to perform.

Use the API playground

Trying out the API in the [playground](using-api-playground/) can help you understand how APIs work. If you're worried about changing live data, consider setting up a test workflow, or test n8n instance, to explore safely.

---

## npm credentials

**URL:** llms-txt#npm-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API access token

You can use these credentials to authenticate the following nodes:

- [npm](../../app-nodes/n8n-nodes-base.npm/)

Create an [npm](https://www.npmjs.com/) account.

## Supported authentication methods

Refer to [npm's external integrations documentation](https://docs.npmjs.com/integrations/integrating-npm-with-external-services) for more information about the service.

## Using API access token

To configure this credential, you'll need:

- An **Access Token**: Create an access token by selecting **Access Tokens** from your profile menu. Refer to [npm's Creating and viewing access tokens documentation](https://docs.npmjs.com/creating-and-viewing-access-tokens) for more detailed instructions.
- A **Registry URL**: If you're using a custom npm registry, update the **Registry URL** to that custom registry. Otherwise, keep the public registry value.

---

## API authentication

**URL:** llms-txt#api-authentication

**Contents:**
- API Scopes
- Create an API key
- Call the API using your key

n8n uses API keys to authenticate API calls.

The n8n API isn't available during the free trial. Please upgrade to access this feature.

Users of [enterprise instances](https://n8n.io/enterprise/) can limit which resources and actions a key can access with scopes. API key scopes allow you specify the exact level of access a key needs for its intended purpose.

Non-enterprise API keys have full access to all the account's resources and capabilities.

1. Log in to n8n.
1. Go to **Settings** > **n8n API**.
1. Select **Create an API key**.
1. Choose a **Label** and set an **Expiration** time for the key.
1. If on an enterprise plan, choose the **Scopes** to give the key.
1. Copy **My API Key** and use this key to authenticate your calls.

## Call the API using your key

Send the API key in your API call as a header named `X-N8N-API-KEY`.

For example, say you want to get all active workflows. Your curl request will look like this:

---

## Rapid7 InsightVM credentials

**URL:** llms-txt#rapid7-insightvm-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API key

You can use these credentials to authenticate when using the [HTTP Request node](../../core-nodes/n8n-nodes-base.httprequest/) to make a [Custom API call](../../../custom-operations/).

Create a [Rapid7 InsightVM](https://www.rapid7.com/products/insightvm/) account.

## Supported authentication methods

Refer to [Rapid7 InsightVM's API documentation](https://help.rapid7.com/insightvm/en-us/api/integrations.html) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../../../custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/rapid7-insight-platform/) on n8n's website.

To configure this credential, you'll need a [Rapid7 InsightVM](https://www.rapid7.com/products/insightvm/) account and:

- A **URL**: The API endpoint URL where the resource or data you are requesting lives. You can find more information about the expected format in the [endpoint section of the Rapid7's API overview](https://docs.rapid7.com/insight/api-overview/#endpoint).
- An **API Key**: Refer to [Rapid7's Managing Platform API Keys documentation](https://docs.rapid7.com/insight/managing-platform-api-keys/) to create an API key.

Refer to [Rapid7 InsightVM's API documentation](https://help.rapid7.com/insightvm/en-us/api/integrations.html) for more information about authenticating to the service.

---

## Strapi credentials

**URL:** llms-txt#strapi-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API user account
  - Configure a role
  - Create a user account
- Using API token

You can use these credentials to authenticate the following nodes:

- [Strapi](../../app-nodes/n8n-nodes-base.strapi/)

Create a [Strapi](https://strapi.io/) admin account with:

- Access to an existing Strapi project.
- At least one collection type within that project.
- Published data within that collection type.

Refer to the Strapi developer [Quick Start Guide](https://docs.strapi.io/dev-docs/quick-start) for more information.

## Supported authentication methods

- API user account: Requires a user account with appropriate content permissions.
- API token: Requires an admin account.

Refer to [Strapi's documentation](https://docs.strapi.io/dev-docs/api/rest) for more information about the service.

## Using API user account

To configure this credential, you'll need:

- A user **Email**: Must be for a user account, not an admin account. Refer to the more detailed instructions below.
- A user **Password**: Must be for a user account, not an admin account. Refer to the more detailed instructions below.
- The **URL**: Use the public URL of your Strapi server, defined in `./config/server.js` as the `url` parameter. Strapi recommends using an absolute URL.
  - For Strapi Cloud projects, use the URL of your Cloud project, for example: `https://my-strapi-project-name.strapiapp.com`
- The **API Version**: Select the version of the API you want your calls to use. Options include:
  - **Version 3**
  - **Version 4**

In Strapi, the configuration involves two steps:

1. [Configure a role](#configure-a-role).
1. [Create a user account](#create-a-user-account).

Refer to the more detailed instructions below for each step.

For API access, use the Users & Permissions Plugin in **Settings > Users & Permissions Plugin**.

Refer to [Configuring Users & Permissions Plugin](https://docs.strapi.io/user-docs/settings/configuring-users-permissions-plugin-settings) for more information on the plugin. Refer to [Configuring end-user roles](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-end-users-roles) for more information on roles.

For the n8n credential, the user must have a role that grants them API permissions on the collection type. For the role, you can either:

- Update the default **Authenticated** role to include the permissions and assign the user to that role. Refer to [Configuring role's permissions](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-end-users-roles#configuring-roles-permissions) for more information.
- Create a new role to include the permissions and assign the user to that role. Refer to [Creating a new role](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-end-users-roles#creating-a-new-role) for more information.

For either option, once you open the role:

1. Go to the **Permissions** section.
1. Open the section for the relevant collection type.
1. Select the permissions for the collection type that the role should have. Options include:
   - `create` (POST)
   - `find` and `findone` (GET)
   - `update` (PUT)
   - `delete` (DELETE)
1. Repeat for all relevant collection types.
1. Save the role.

Refer to [Endpoints](https://docs.strapi.io/dev-docs/api/rest#endpoints) for more information on the permission options.

### Create a user account

Now that you have an appropriate role, create an end-user account and assign the role to it:

1. Go to **Content Manager > Collection Types > User**.
1. Select **Add new entry**.
1. Fill in the user details. The n8n credential requires these fields, though your Strapi project may have more custom required fields:
   - **Username**: Required for all Strapi users.
   - **Email**: Enter in Strapi and use as the **Email** in the n8n credential.
   - **Password**: Enter in Strapi and use as the **Password** in the n8n credential.
   - **Role**: Select the role you set up in the previous step.

Refer to [Managing end-user accounts](https://docs.strapi.io/user-docs/users-roles-permissions/managing-end-users) for more information.

To configure this credential, you'll need:

- An **API Token**: Create an API token from **Settings > Global Settings > API Tokens**. Refer to Strapi's [Creating a new API token documentation](https://docs.strapi.io/user-docs/settings/API-tokens#creating-a-new-api-token) for more details and information on regenerating API tokens.

API tokens permission

If you don't see the **API tokens** option in **Global settings**, your account doesn't have the **API tokens > Read** permission.

- The **URL**: Use the public URL of your Strapi server, defined in `./config/server.js` as the `url` parameter. Strapi recommends using an absolute URL.

- For Strapi Cloud projects, use the URL of your Cloud project, for example: `https://my-strapi-project-name.strapiapp.com`

- The **API Version**: Select the version of the API you want your calls to use. Options include:

- **Version 3**
  - **Version 4**

---

## Adalo credentials

**URL:** llms-txt#adalo-credentials

**Contents:**
- Supported authentication methods
- Related resources
- Using API key

You can use these credentials to authenticate the following nodes:

- [Adalo](../../app-nodes/n8n-nodes-base.adalo/)

You need a Team or Business plan to use the Adalo APIs.

## Supported authentication methods

Refer to [Adalo's API collections documentation](https://help.adalo.com/integrations/the-adalo-api/collections) for more information about working with the service.

To configure this credential, you'll need an [Adalo](https://www.adalo.com/) account and:

- An **API Key**
- An **App ID**

To get these, create an Adalo app:

1. From the app dropdown in the top navigation, select **CREATE NEW APP**.
1. Select the App Layout type that makes sense for you and select **Next**.
   - If you're new to using the product, Adalo recommend using **Mobile Only**.
1. Select a template to get started with or select **Blank**, then select **Next**.
1. Enter an **App Name**, like `n8n integration`.
1. If applicable, select the **Team** for the app.
1. Select branding colors.
1. Select **Create**. The app editor opens.
1. In the left menu, select **Settings** (the gear cog icon).
1. Select **App Access**.
1. In the **API Key** section, select **Generate Key**.
   - If you don't have the correct plan level, you'll see a prompt to upgrade instead.
1. Copy the key and enter it as the **API Key** in your n8n credential.
1. The URL includes the **App ID** after `https://app.adalo.com/apps/`. For example, if the URL for your app is `https://app.adalo.com/apps/b78bdfcf-48dc-4550-a474-dd52c19fc371/app-settings`, `b78bdfcf-48dc-4550-a474-dd52c19fc371` is the App ID. Copy this value and enter it in your n8n credential.

Refer to [Creating an app](https://help.adalo.com/design/designing-your-app/creating-an-app) for more information on creating apps in Adalo. Refer to [The Adalo API](https://help.adalo.com/integrations/the-adalo-api) for more information on generating API keys.

---

## Todoist credentials

**URL:** llms-txt#todoist-credentials

**Contents:**
- Supported authentication methods
- Related resources
- Using API key
- Using OAuth2

You can use these credentials to authenticate the following nodes:

- [Todoist](../../app-nodes/n8n-nodes-base.todoist/)

## Supported authentication methods

Refer to [Todoist's REST API documentation](https://developer.todoist.com/rest/v2/#overview) for more information about the service.

To configure this credential, you'll need a [Todoist](https://todoist.com/) account and:

To get your **API Key**:

1. In Todoist, open your [**Integration settings**](https://todoist.com/prefs/integrations).
1. Select the **Developer** tab.
1. Copy your **API token** and enter it as the **API Key** in your n8n credential.

Refer to [Find your API token](https://todoist.com/help/articles/find-your-api-token-Jpzx9IIlB) for more information.

Note for n8n Cloud users

Cloud users don't need to provide connection details. Select **Connect my account** to connect through your browser.

If you're [self-hosting](../../../../hosting/) n8n, you'll need a [Todoist](https://todoist.com/) account and:

- A **Client ID**
- A **Client Secret**

Get both by creating an application:

1. Open the Todoist [App Management Console](https://developer.todoist.com/appconsole.html).
1. Select **Create a new app**.
1. Enter an **App name** for your app, like `n8n integration`.
1. Select **Create app**.
1. Copy the n8n **OAuth Redirect URL** and enter it as the **OAuth redirect URL** in Todoist.
1. Copy the **Client ID** from Todoist and enter it in your n8n credential.
1. Copy the **Client Secret** from Todoist and enter it in your n8n credential.
1. Configure the rest of your Todoist app as it makes sense for your use case.

Refer to the Todoist [Authorization Guide](https://developer.todoist.com/guides/#authorization) for more information.

---

## uProc credentials

**URL:** llms-txt#uproc-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API Key

You can use these credentials to authenticate the following nodes:

- [uProc](../../app-nodes/n8n-nodes-base.uproc/)

Create a [uProc](https://uproc.io) account.

## Supported authentication methods

Refer to [uProc's API documentation](https://docs.uproc.io/api/) for more information about the service.

To configure this credential, you'll need:

- An **Email** address: Enter the email address you use to log in to uProc. This is also displayed in **Settings > Integrations > API Credentials**.
- An **API Key**: Go to **Settings > Integrations > API Credentials**. Copy the **API Key (real)** from the **API Credentials** section and enter it in your n8n credential.

---

## Handling API rate limits

**URL:** llms-txt#handling-api-rate-limits

**Contents:**
- Identify rate limit issues
- Handle rate limits for integrations
  - Enable Retry On Fail
  - Use Loop Over Items and Wait
- Handle rate limits in the HTTP Request node
  - Batch requests
  - Paginate results

[API](../../../glossary/#api) rate limits are restrictions on request frequency. For example, an API may limit the number of requests you can make per minute, or per day.

APIs can also limits how much data you can send in one request, or how much data the API sends in a single response.

## Identify rate limit issues

When an n8n node hits a rate limit, it errors. n8n displays the error message in the node output panel. This includes the error message from the service.

If n8n received error 429 (too many requests) from the service, the error message is **The service is receiving too many requests from you**.

To check the rate limits for the service you're using, refer to the API documentation for the service.

## Handle rate limits for integrations

There are two ways to handle rate limits in n8n's integrations: using the Retry On Fail setting, or using a combination of the [Loop Over Items](../core-nodes/n8n-nodes-base.splitinbatches/) and [Wait](../core-nodes/n8n-nodes-base.wait/) nodes:

- Retry On Fail adds a pause between API request attempts.
- With Loop Over Items and Wait you can break you request data into smaller chunks, as well as pausing between requests.

### Enable Retry On Fail

When you enable Retry On Fail, the node automatically tries the request again if it fails the first time.

1. Open the node.
1. Select **Settings**.
1. Enable the **Retry On Fail** toggle.
1. Configure the retry settings: if using this to work around rate limits, set **Wait Between Tries (ms)** to more than the rate limit. For example, if the API you're using allows one request per second, set **Wait Between Tries (ms)** to `1000` to allow a 1 second wait.

### Use Loop Over Items and Wait

Use the Loop Over Items node to batch the input items, and the Wait node to introduce a pause between each request.

1. Add the Loop Over Items node before the node that calls the API. Refer to [Loop Over Items](../core-nodes/n8n-nodes-base.splitinbatches/) for information on how to configure the node.
1. Add the Wait node after the node that calls the API, and connect it back to the Loop Over Items node. Refer to [Wait](../core-nodes/n8n-nodes-base.wait/) for information on how to configure the node.

For example, to handle rate limits when using OpenAI:

## Handle rate limits in the HTTP Request node

The HTTP Request node has built-in settings for handling rate limits and large amounts of data.

Use the Batching option to send more than one request, reducing the request size, and introducing a pause between requests. This is the equivalent of using Loop Over Items and Wait.

1. In the HTTP Request node, select **Add Option** > **Batching**.
1. Set **Items per Batch**: this is the number of input items to include in each request.
1. Set **Batch Interval (ms)** to introduce a delay between requests. For example, if the API you're using allows one request per second, set **Wait Between Tries (ms)** to `1000` to allow a 1 second wait.

APIs paginate their results when they need to send more data than they can handle in a single response. For more information on pagination in the HTTP Request node, refer to [HTTP Request node | Pagination](../core-nodes/n8n-nodes-base.httprequest/#pagination).

---

## APITemplate.io credentials

**URL:** llms-txt#apitemplate.io-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API key

You can use these credentials to authenticate the following nodes:

- [APITemplate.io](../../app-nodes/n8n-nodes-base.apitemplateio/)

Create an [APITemplate.io](https://apitemplate.io/) account.

## Supported authentication methods

Refer to [APITemplate.io's API documentation](https://apitemplate.io/apiv2/) for more information about the service.

To configure this credential, you'll need:

- An **API Key**: Once you've created an APITemplate.io account, go to **API Integration** to copy the **API Key**.

---

## One Simple API credentials

**URL:** llms-txt#one-simple-api-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API token

You can use these credentials to authenticate the following nodes:

- [One Simple API](../../app-nodes/n8n-nodes-base.onesimpleapi/)

Create a [One Simple API](https://onesimpleapi.com/register) account.

## Supported authentication methods

Refer to [One Simple API's documentation](https://onesimpleapi.com/docs) for more information about the service.

To configure this credential, you'll need:

- An **API token**: Create a new API token on the [API Tokens](https://onesimpleapi.com/user/api-tokens) page. Be sure you select appropriate permissions for the token.

You can also access the API Tokens page by selecting your **Profile > API Tokens**.

---

## Unleashed Software credentials

**URL:** llms-txt#unleashed-software-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API key

You can use these credentials to authenticate the following nodes:

- [Unleashed Software](../../app-nodes/n8n-nodes-base.unleashedsoftware/)

Create an [Unleashed Software](https://www.unleashedsoftware.com/) account.

## Supported authentication methods

Refer to [Unleashed's API documentation](https://apidocs.unleashedsoftware.com/) for more information about the service.

To configure this credential, you'll need:

- An **API ID**: Go to **Integrations > Unleashed API Access** to find your **API ID**.
- An **API Key**: Go to **Integrations > Unleashed API Access** to find your **API Key**.

Refer to [Unleashed API Access](https://support.unleashedsoftware.com/hc/en-us/articles/4402393233689-Unleashed-API-Access) for more information.

Account owner required

You must log in as an Unleashed account owner to view the API ID and API Key.

---

## API pagination

**URL:** llms-txt#api-pagination

The default page size is 100 results. You can change the page size limit. The maximum permitted size is 250.

When a response contains more than one page, it includes a cursor, which you can use to request the next pages.

For example, say you want to get all active workflows, 150 at a time.

---

## ProfitWell credentials

**URL:** llms-txt#profitwell-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API token

You can use these credentials to authenticate the following nodes:

- [ProfitWell](../../app-nodes/n8n-nodes-base.profitwell/)

Create a [ProfitWell](https://www2.profitwell.com/signup/start) account.

## Supported authentication methods

Refer to [Profitwell's API documentation](https://profitwellapiv2.docs.apiary.io/) for more information about the service.

To configure this credential, you'll need:

- An **API Token**: To get an API key or token, go to **Account Settings > Integrations** and select **ProfitWell API**.

---

## PagerDuty credentials

**URL:** llms-txt#pagerduty-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API token
- Using OAuth2

You can use these credentials to authenticate the following nodes:

- [PagerDuty](../../app-nodes/n8n-nodes-base.pagerduty/)

Create a [PagerDuty](https://pagerduty.com/) account.

## Supported authentication methods

Refer to [PagerDuty's API documentation](https://developer.pagerduty.com/docs/531092d4c6658-rest-api-v2-overview) for more information about the service.

To configure this credential, you'll need:

- A general access **API Token**: To generate an API token, go to **Integrations > Developer Tools > API Access Keys > Create New API Key**. Refer to [Generate a General Access REST API key](https://support.pagerduty.com/docs/api-access-keys#generate-a-general-access-rest-api-key) for more information.

Note for n8n Cloud users

Cloud users don't need to provide connection details. Select **Connect my account** to connect through your browser.

If you need to configure OAuth2 from scratch, [register a new Pagerduty app](https://developer.pagerduty.com/docs/dd91fbd09a1a1-register-an-app).

Use these settings for registering your app:

- In the **Category** dropdown list, select **Infrastructure Automation**.
- In the **Functionality** section, select **OAuth 2.0**.

Once you **Save** your app, open the app details and [edit your app configuration](https://developer.pagerduty.com/docs/dd91fbd09a1a1-register-an-app#editing-your-app-configuration) to use these settings:

- Within the **OAuth 2.0** section, select **Add**.
- Copy the **OAuth Callback URL** from n8n and paste it into the **Redirect URL** field.
- Copy the **Client ID** and **Client Secret** from PagerDuty and add these to your n8n credentials.
- Select **Read/Write** from the **Set Permission Scopes** dropdown list.

Refer to the instructions in [App functionality](https://developer.pagerduty.com/docs/b25fd1b8acb1b-app-functionality) for more information on available functionality. Refer to the PagerDuty [OAuth Functionality documentation](https://developer.pagerduty.com/docs/f59fdbd94ceab-o-auth-functionality) for more information on the OAuth flow.

---

## HighLevel credentials

**URL:** llms-txt#highlevel-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API key
- Using OAuth2

You can use these credentials to authenticate the following nodes:

- [HighLevel node](../../app-nodes/n8n-nodes-base.highlevel/)

Create a [HighLevel developer](https://marketplace.gohighlevel.com/) account.

## Supported authentication methods

- API key: Use with API v1
- OAuth2: Use with API v2

HighLevel deprecated API v1.0 and no longer maintains it. Use OAuth2 to set up new credentials.

Refer to [HighLevel's API 2.0 documentation](https://highlevel.stoplight.io/docs/integrations/0443d7d1a4bd0-overview) for more information about the service.

For existing integrations with the API v1.0, refer to [HighLevel's API 1.0 documentation](https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api).

To configure this credential, you'll need:

- An **API Key**: Refer to the [HighLevel API 1.0 Welcome documentation](https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api) for instructions on getting your API key.

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

To generate both, create an app in **My Apps > Create App**. Use these settings:

1. Set **Distribution Type** to **Sub-Account**.

1. Add these **Scopes**:

- `locations.readonly`
   - `contacts.readonly`
   - `contacts.write`
   - `opportunities.readonly`
   - `opportunities.write`
   - `users.readonly`

1. Copy the **OAuth Redirect URL** from n8n and add it as a **Redirect URL** in your HighLevel app.

1. Copy the **Client ID** and **Client Secret** from HighLevel and add them to your n8n credential.

1. Add the same scopes added above to your n8n credential in a space-separated list. For example:

`locations.readonly contacts.readonly contacts.write opportunities.readonly opportunities.write users.readonly`

Refer to HighLevel's [API Authorization documentation](https://highlevel.stoplight.io/docs/integrations/a04191c0fabf9-authorization) for more details. Refer to HighLevel's [API Scopes documentation](https://highlevel.stoplight.io/docs/integrations/vcctp9t1w8hja-scopes) for more information about available scopes.

---

## Medium credentials

**URL:** llms-txt#medium-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API access token
- Using OAuth2

You can use these credentials to authenticate the following nodes:

- [Medium](../../app-nodes/n8n-nodes-base.medium/)

Medium API no longer supported

Medium has stopped supporting the Medium API. These credentials still appear within n8n, but you can't configure new integrations using them.

- Create an account on [Medium](https://www.medium.com/).
- For OAuth2, request access to credentials by emailing [yourfriends@medium.com](mailto:yourfriends@medium.com).

## Supported authentication methods

- API access token
- OAuth2

Refer to [Medium's API documentation](https://github.com/Medium/medium-api-docs) for more information about the service.

## Using API access token

To configure this credential, you'll need:

- An API **Access Token**: Generate a token in **Settings >** [**Security and apps**](https://medium.com/me/settings/security) **> Integration tokens**. Use the integration token this generates as your n8n **Access Token**.

Refer to the Medium API [Self-issued access tokens documentation](https://github.com/Medium/medium-api-docs?tab=readme-ov-file#21-self-issued-access-tokens) for more information.

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

To generate a **Client ID** and **Client Secret**, you'll need access to the **Developers** menu. From there, create a new application to generate the Client ID and Secret.

Use these settings for your new application:

- Select **OAuth 2** as the **Authorization Protocol**
- Copy the **OAuth Callback URL** from n8n and use this as the **Callback URL** in Medium.

---

## Intercom credentials

**URL:** llms-txt#intercom-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API key

You can use these credentials to authenticate the following nodes:

- [Intercom](../../app-nodes/n8n-nodes-base.intercom/)

- Create an [Intercom](https://www.intercom.com/) developer account.
- [Create an app](https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/) in your developer hub.

## Supported authentication methods

Refer to [Intercom's API documentation](https://developers.intercom.com/docs/references/introduction/) for more information about the service.

To configure this credential, you'll need:

- An **API Key**: Intercom automatically generates an **Access Token** when you [create an app](https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/). Use this **Access Token** as your n8n **API Key**. Refer to [How to get your Access Token](https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/#how-to-get-your-access-token) for more detailed instructions.

---

## Disable the public REST API

**URL:** llms-txt#disable-the-public-rest-api

**Contents:**
- Disable the API playground
- Related resources

The [n8n public REST API](../../../api/) allows you to programmatically perform many of the same tasks as you can in the n8n GUI.

If you don't plan on using this API, n8n recommends disabling it to improve the security of your n8n installation.

To disable the [public REST API](../../../api/), set the `N8N_PUBLIC_API_DISABLED` environment variable to `true`, for example:

## Disable the API playground

To disable the [API playground](../../../api/using-api-playground/), set the `N8N_PUBLIC_API_SWAGGERUI_DISABLED` environment variable to `true`, for example:

Refer to [Deployment environment variables](../../configuration/environment-variables/deployment/) for more information on these environment variables.

Refer to [Configuration](../../configuration/configuration-methods/) for more information on setting environment variables.

**Examples:**

Example 1 (unknown):
```unknown
export N8N_PUBLIC_API_DISABLED=true
```

Example 2 (unknown):
```unknown
export N8N_PUBLIC_API_SWAGGERUI_DISABLED=true
```

---

## Zammad credentials

**URL:** llms-txt#zammad-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using basic auth
- Using token auth

You can use these credentials to authenticate the following nodes:

- [Zammad](../../app-nodes/n8n-nodes-base.zammad/)

- Create a hosted [Zammad](https://zammad.com/) account or set up your own Zammad instance.
- For token authentication, enable **API Token Access** in **Settings > System > API**. Refer to [Setting up a Zammad](https://admin-docs.zammad.org/en/latest/system/integrations/zabbix.html?#setting-up-a-zammad) for more information.

## Supported authentication methods

- Basic auth
- Token auth: Zammad recommends using this authentication method.

Refer to [Zammad's API Authentication documentation](https://docs.zammad.org/en/latest/api/intro.html?#authentication) for more information about authenticating with the service.

To configure this credential, you'll need:

- A **Base URL**: Enter the URL of your Zammad instance.
- An **Email** address: Enter the email address you use to log in to Zammad.
- A **Password**: Enter your Zammad password.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

To configure this credential, you'll need:

- A **Base URL**: Enter the URL of your Zammad instance.
- An **Access Token**: Once **API Token Access** is enabled for the Zammad instance, any user with the `user_preferences.access_token` permission can generate an **Access Token** by going to your **avatar > Profile > Token Access** and **Create** a new token.
  - The access token permissions depend on what actions you'd like to complete with this credential. For all functionality within the [Zammad](../../app-nodes/n8n-nodes-base.zammad/) node, select:
    - `admin.group`
    - `admin.organization`
    - `admin.user`
    - `ticket.agent`
    - `ticket.customer`
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

---

## Bubble credentials

**URL:** llms-txt#bubble-credentials

**Contents:**
- Supported authentication methods
- Related resources
- Using API key

You can use these credentials to authenticate the following nodes:

- [Bubble](../../app-nodes/n8n-nodes-base.bubble/)

You need a paid plan to access the Bubble APIs.

## Supported authentication methods

Refer to [Bubble's API documentation](https://manual.bubble.io/help-guides/integrations/api) for more information about the service.

To configure this credential, you'll need a paid [Bubble](https://bubble.io) account and:

- An **API Token**
- An **App Name**
- Your **Domain**, if you're using a custom domain

To set it up, you'll need to create an app:

1. Go to the [**Apps**](https://bubble.io/home/apps) page in Bubble.
1. Select **Create an app**.
1. Enter a **Name** for your app, like `n8n-integration`.
1. Select **Get started**. The app's details open.
1. In the left navigation, select **Settings** (the gear cog icon).
1. Select the **API** tab.
1. In the **Public API Endpoints** section, check the box to **Enable Data API**.
1. The page displays the **Data API root URL**, for example: `https://n8n-integration.bubbleapps.io/version-test/api/1.1/obj`.
1. Copy the part of the URL after `https://` and before `.bubbleapps.io` and enter it in n8n as the **App Name**. In the above example, you'd enter `n8n-integration`.
1. Select **Generate a new API token**.
1. Enter an **API Token Label**, like `n8n integration`.
1. Copy the **Private key** and enter it as the **API Token** in your n8n credential.
   - Refer to [Data API | Authentication](https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api/authentication) for more information on generating API tokens.
1. In n8n, select the **Environment** that best matches your app:
   - Select **Development** for an app that you haven't deployed, accessed at `https://appname.bubbleapps.io/version-test` or `https://www.mydomain.com/version-test`.
   - Select **Live** for an app that you've [deployed](https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/deploying-your-app), accessed at `https://appname.bubbleapps.io` or `https://www.mydomain.com`.
1. In n8n, select your **Hosting**:
   - If you haven't set up a custom domain, select **Bubble Hosting**.
   - If you've set up a [custom domain](https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/web-app/custom-domain-and-dns), select **Self Hosted** and enter your custom **Domain**.

Refer to Bubble's [Creating and managing apps](https://manual.bubble.io/help-guides/getting-started/creating-and-managing-apps) documentation for more information.

---

## Twist credentials

**URL:** llms-txt#twist-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using OAuth2
  - Local environment redirect URL

You can use these credentials to authenticate the following nodes:

- [Twist](../../app-nodes/n8n-nodes-base.twist/)

- Create a [Twist](https://twist.com/) account.
- [Create a general integration](https://twist.com/app_console/create_app) and configure a valid OAuth Redirect URL. Refer to [Using OAuth2](#using-oauth2) for more information.

## Supported authentication methods

Refer to [Twist's API documentation](https://developer.twist.com/v3/#authorization) for more information about authenticating with the service.

To configure this credential, you'll need:

- A **Client ID**: Generated once you create a general integration.
- A **Client Secret**: Generated once you create a general integration.

To generate your Client ID and Client Secret, [create a general integration](https://twist.com/app_console/create_app).

Use these settings for your integration's **OAuth Authentication**:

- Copy the **OAuth Redirect URL** from n8n and enter it as the **OAuth 2 redirect URL** in Twist.

OAuth Redirect URL for self-hosted n8n

Twist doesn't accept a `localhost` Redirect URL. The Redirect URL should be a URL in your domain, for example: `https://mytemplatemaker.example.com/gr_callback`. If your n8n **OAuth Redirect URL** contains localhost, refer below to [Local environment redirect URL](#local-environment-redirect-url) for generating a URL that Twist will allow.

- Select **Update OAuth settings** to save those changes.

- Copy the **Client ID** and **Client Secret** from Twist and enter them in the appropriate fields in n8n.

### Local environment redirect URL

Twist doesn't accept a localhost callback URL. These steps should allow you to configure the OAuth credentials for the local environment:

1. Use [ngrok](https://ngrok.com/) to expose the local server running on port `5678` to the internet. In your terminal, run the following command:

1. Run the following command in a new terminal. Replace `<YOUR-NGROK-URL>` with the URL that you get from the previous step.

1. Use the generated URL as your **OAuth 2 redirect URL** in Twist.

**Examples:**

Example 1 (unknown):
```unknown
ngrok http 5678
```

Example 2 (unknown):
```unknown
export WEBHOOK_URL=<YOUR-NGROK-URL>
```

---

## Venafi TLS Protect Datacenter credentials

**URL:** llms-txt#venafi-tls-protect-datacenter-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API integration

You can use these credentials to authenticate the following nodes:

- [Venafi TLS Protect Datacenter node](../../app-nodes/n8n-nodes-base.venafitlsprotectdatacenter/)

- Create a Venafi [TLS Protect Datacenter](https://venafi.com/) account.
- Set the expiration and refresh time for tokens. Refer to [Setting up token authentication](https://docs.venafi.com/Docs/current/TopNav/Content/SDK/AuthSDK/t-SDKa-Setup-OAuth.php) for more information.
- Create an [API integration](https://docs.venafi.com/Docs/current/TopNav/Content/API-ApplicationIntegration/c-APIAppIntegrations-about.php) in **API > Integrations**. Refer to [Integrating other systems with Venafi products](https://docs.venafi.com/Docs/current/TopNav/Content/API-ApplicationIntegration/t-APIAppIntegrations-creating.php) for detailed instructions.
  - Take note of the Client ID for your integration.
  - Choose the scopes needed for the operations you want to perform within n8n. Refer to the scopes table in [Integrating other systems with Venafi products](https://docs.venafi.com/Docs/current/TopNav/Content/API-ApplicationIntegration/t-APIAppIntegrations-creating.php) for more details on available scopes.

## Supported authentication methods

Refer to [Venafi's API integration documentation](https://docs.venafi.com/Docs/currentSDK/TopNav/Content/SDK/WebSDK/c-sdk-AboutThisGuide.php) for more information about the service.

## Using API integration

To configure this credential, you'll need:

- A **Domain**: Enter your Venafi TLS Protect Datacenter domain.
- A **Client ID**: Enter the **Client ID** from your API integration. Refer to the information and links in [Prerequisites](#prerequisites) for more information on creating an API integration.
- A **Username**: Enter your username.
- A **Password**: Enter your password.
- **Allow Self-Signed Certificates**: If turned on, the credential will allow self-signed certificates.

---
