# N8N - Getting Started

**Pages:** 11

---

## Okta Workforce Identity SAML setup

**URL:** llms-txt#okta-workforce-identity-saml-setup

**Contents:**
- Prerequisites
- Setup

Set up SAML SSO in n8n with Okta.

Workforce Identity and Customer Identity

This guide covers setting up Workforce Identity. This is the original Okta product. Customer Identity is Okta's name for Auth0, which they've acquired.

You need an Okta Workforce Identity account, and the redirect URL and entity ID from n8n's SAML settings.

Okta Workforce may enforce two factor authentication for users, depending on your Okta configuration.

Read the [Set up SAML](../setup/) guide first.

1. In your Okta admin panel, select **Applications** > **Applications**.

1. Select **Create App Integration**. Okta opens the app creation modal.

1. Select **SAML 2.0**, then select **Next**.

1. On the **General Settings** tab, enter `n8n` as the **App name**.

1. On the **Configure SAML** tab, complete the following **General** fields:

- **Single sign-on URL**: the **Redirect URL** from n8n.
   - **Audience URI (SP Entity ID)**: the **Entity ID** from n8n.
   - **Default RelayState**: leave this empty.
   - **Name ID format**: `EmailAddress`.
   - **Application username**: `Okta username`.
   - **Update application username on**: `Create and update`.

1. Create **Attribute Statements**:

| **Name**                                                             | **Name format** | **Value**      |
   | -------------------------------------------------------------------- | --------------- | -------------- |
   | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/firstname`    | URI Reference   | user.firstName |
   | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/lastname`     | URI Reference   | user.lastName  |
   | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn`          | URI Reference   | user.login     |
   | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` | URI Reference   | user.email     |

1. Select **Next**. Okta may prompt you to complete a marketing form, or may take you directly to your new n8n Okta app.

1. Assign the n8n app to people:

1. On the n8n app dashboard in Okta, select **Assignments**.
   1. Select **Assign** > **Assign to People**. Okta displays a modal with a list of available people.
   1. Select **Assign** next to the person you want to add. Okta displays a prompt to confirm the username.
   1. Leave the username as email address. Select **Save and Go Back**.
   1. Select **Done**.

1. Get the metadata XML: on the **Sign On** tab, copy the Metadata URL. Navigate to it, and copy the XML. Paste this into **Identity Provider Settings** in n8n.

1. Select **Save settings**.

1. Select **Test settings**. n8n opens a new tab. If you're not currently logged in, Okta prompts you to sign in. n8n then displays a success message confirming the attributes returned by Okta.

---

## Kafka credentials

**URL:** llms-txt#kafka-credentials

**Contents:**
- Supported authentication methods
- Related resources
- Using client ID

You can use these credentials to authenticate the following nodes:

- [Kafka](../../app-nodes/n8n-nodes-base.kafka/)
- [Kafka Trigger](../../trigger-nodes/n8n-nodes-base.kafkatrigger/)

## Supported authentication methods

Refer to [Kafka's documentation](https://kafka.apache.org/documentation/) for more information about using the service.

If you're new to Kafka, refer to the [Apache Kafka Quickstart](https://kafka.apache.org/quickstart) for initial setup.

Refer to [Encryption and Authentication using SSL](https://kafka.apache.org/documentation/#security_ssl) for working with SSL in Kafka.

To configure this credential, you'll need a running Kafka environment and:

- A **Client ID**
- A list of relevant **Brokers**
- Username/password authentication details if your Kafka environment uses authentication

1. Enter the `CLIENT-ID` of the client or consumer group in the **Client ID** field in your credential.
1. Enter a comma-separated list of relevant **Brokers** for the credential to use in the format `<broker-service-name>:<port>`. Use the name you gave the broker when you defined it in the `services` list. For example, `kafka-1:9092,kafka-2:9092` would add the brokers `kafka-1` and `kafka-2` on port `9092`.
1. If your Kafka environment doesn't use SSL, turn off the **SSL** toggle.
1. If you've enabled authentication using SASL in your Kafka environment, turn on the **Authentication** toggle. Then add:
   1. The **Username**
   1. The **Password**
   1. Select the broker's configured **SASL Mechanism**. Refer to [SASL configuration](https://kafka.apache.org/documentation/#security_sasl_config) for more information. Options include:
      - `Plain`
      - `scram-sha-256`
      - `scram-sha-512`

---

## The very quick quickstart

**URL:** llms-txt#the-very-quick-quickstart

**Contents:**
- Step one: Open a workflow template and sign up for n8n Cloud
- Step two: Run the workflow
- Step three: Add a node
- Next steps

This quickstart gets you started using n8n as quickly as possible. Its allows you to try out the UI and introduces two key features: [workflow templates](../../glossary/#template-n8n) and [expressions](../../glossary/#expression-n8n). It doesn't include detailed explanations or explore concepts in-depth.

In this tutorial, you will:

- Load a [workflow](../../glossary/#workflow-n8n) from the workflow templates library
- Add a node and configure it using expressions
- Run your first workflow

## Step one: Open a workflow template and sign up for n8n Cloud

n8n provides a quickstart template using training nodes. You can use this to work with fake data and avoid setting up [credentials](../../glossary/#credential-n8n).

This quickstart uses [n8n Cloud](../../manage-cloud/overview/). A free trial is available for new users.

1. Go to [Templates | Very quick quickstart](https://n8n.io/workflows/1700-very-quick-quickstart/).
1. Select **Use for free** to view the options for using the template.
1. Select **Get started free with n8n cloud** to sign up for a new Cloud instance.

1. Gets example data from the [Customer Datastore](../../integrations/builtin/app-nodes/n8n-nodes-base.n8ntrainingcustomerdatastore/) node.
1. Uses the [Edit Fields](../../integrations/builtin/core-nodes/n8n-nodes-base.set/) node to extract only the desired data and assigns that data to variables. In this example, you map the customer name, ID, and description.

The individual pieces in an n8n workflow are called [nodes](../../glossary/#node-n8n). Double click a node to explore its settings and how it processes data.

## Step two: Run the workflow

Select **Execute Workflow**. This runs the workflow, loading the data from the Customer Datastore node, then transforming it with Edit Fields. You need this data available in the workflow so that you can work with it in the next step.

## Step three: Add a node

Add a third node to message each customer and tell them their description. Use the Customer Messenger node to send a message to fake recipients.

1. Select the **Add node** connector on the Edit Fields node.
1. Search for **Customer Messenger**. n8n shows a list of nodes that match the search.
1. Select **Customer Messenger (n8n training)** to add the node to the [canvas](../../glossary/#canvas-n8n). n8n opens the node automatically.
1. Use [expressions](../../code/expressions/) to map in the **Customer ID** and create the **Message**:
   1. In the **INPUT** panel select the **Schema** tab.

1. Drag **Edit Fields1** > **customer_id** into the **Customer ID** field in the node settings.

1. Hover over **Message**. Select the **Expression** tab, then select the expand button to open the full expressions editor.

1. Copy this expression into the editor:

1. Close the expressions editor, then close the **Customer Messenger** node by clicking outside the node or selecting **Back to canvas**.
1. Select **Execute Workflow**. n8n runs the workflow.

The complete workflow should look like this:

[View workflow file](/_workflows/try-it-out/quickstart/very-quick-quickstart-workflow.json)

- Read n8n's [longer try it out tutorial](../tutorial-first-workflow/) for a more complex workflow, and an introduction to more features and n8n concepts.
- Take the [text courses](../../courses/) or [video courses](../../video-courses/).

**Examples:**

Example 1 (unknown):
```unknown
Hi {{ $json.customer_name }}. Your description is: {{ $json.customer_description }}
```

---

## Welcome to n8n Docs

**URL:** llms-txt#welcome-to-n8n-docs

**Contents:**
- Where to start
- About n8n

This is the documentation for [n8n](https://n8n.io/), a [fair-code](https://faircode.io) licensed workflow automation tool that combines AI capabilities with business process automation.

It covers everything from setup to usage and development. It's a work in progress and all [contributions](help-community/contributing/) are welcome.

Jump in with n8n's quickstart guides.

[Try it out](try-it-out/)

- **Choose the right n8n for you**

Cloud, npm, self-host . . .

[Options](choose-n8n/)

- **Explore integrations**

Browse n8n's integrations library.

[Find your apps](integrations/)

- **Build AI functionality**

n8n supports building AI functionality and tools.

[Advanced AI](advanced-ai/)

n8n (pronounced n-eight-n) helps you to connect any app with an API with any other, and manipulate its data with little or no code.

- Customizable: highly flexible workflows and the option to build custom nodes.
- Convenient: use the npm or Docker to try out n8n, or the Cloud hosting option if you want us to handle the infrastructure.
- Privacy-focused: self-host n8n for privacy and security.

---

## Server setups

**URL:** llms-txt#server-setups

Self-host with Docker Compose:

- [Digital Ocean](digital-ocean/)
- [Heroku](heroku/)
- [Hetzner Cloud](hetzner/)

Self-host with Google Cloud Run (with access to n8n workflow tools for Google Workspace, e.g. Gmail, Drive):

- [Google Cloud Run](google-cloud-run/)

Starting points for a Kubernetes setup:

- [AWS](aws/)
- [Azure](azure/)
- [Google Kubernetes Engine (GKE)](google-kubernetes-engine/)

Configuration guides to help you get started on other platforms:

- [Docker Compose](docker-compose/)

---

## Deployment

**URL:** llms-txt#deployment

**Contents:**
- User data
- Backups
- Restarting

Embed requires an embed license. For more information about when to use Embed, as well as costs and licensing processes, refer to [Embed](https://n8n.io/embed/) on the n8n website.

See the [hosting documentation](../../hosting/installation/server-setups/) for detailed setup options.

n8n recommends that you follow the same or similar practices used internally for n8n Cloud: Save user data using [Rook](https://rook.io/) and, if an n8n server goes down, a new instance starts on another machine using the same data.

Due to this, you don't need to use backups except in case of a catastrophic failure, or when a user wants to reactivate their account within your prescribed retention period (two weeks for n8n Cloud).

n8n recommends creating nightly backups by attaching another container, and copying all data to this second container. In this manner, RAM usage is negligible, and so doesn't impact the amount of users you can place on the server.

If your instance is down or restarting, missed executions (for example, Cron or Webhook nodes) during this time aren't recoverable. If it's important for you to maintain 100% uptime, you need to build another proxy in front of it which caches the data.

---

## Choose your n8n

**URL:** llms-txt#choose-your-n8n

**Contents:**
- Platforms
- Licenses
- Free versions
- Paid versions

This section contains information on n8n's range of platforms, pricing plans, and licenses.

There are different ways to set up n8n depending on how you intend to use it:

- [n8n Cloud](../manage-cloud/overview/): hosted solution, no need to install anything.
- [Self-host](../hosting/): recommended method for production or customized use cases.
  - [npm](../hosting/installation/npm/)
  - [Docker](../hosting/installation/docker/)
  - [Server setup guides](../hosting/installation/server-setups/) for popular platforms
- [Embed](../embed/): n8n Embed allows you to white label n8n and build it into your own product. Contact n8n on the [Embed website](https://n8n.io/embed/) for pricing and support.

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

n8n's [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) and [n8n Enterprise License](https://github.com/n8n-io/n8n/blob/master/LICENSE_EE.md) are based on the [fair-code](https://faircode.io/) model.

For a detailed explanation of the license, refer to [Sustainable Use License](../sustainable-use-license/).

n8n offers the following free options:

- A free trial of Cloud
- A free self-hosted community edition for self-hosted users

n8n has two paid versions:

- n8n Cloud: choose from a range of paid plans to suit your usage and feature needs.
- Self-hosted: there are both free and paid versions of self-hosted.

For details of the Cloud plans and contact details for Enterprise Self-hosted, refer to [Pricing](https://n8n.io/pricing/) on the n8n website.

---

## Self-hosting n8n

**URL:** llms-txt#self-hosting-n8n

This section provides guidance on setting up n8n for both the Enterprise and Community self-hosted editions. The Community edition is free, the Enterprise edition isn't.

See [Community edition features](community-edition-features/) for a list of available features.

- **Installation and server setups**

Install n8n on any platform using npm or Docker. Or follow our guides to popular hosting platforms.

[Docker installation guide](installation/docker/)

Learn how to configure n8n with environment variables.

[Environment Variables](configuration/environment-variables/)

- **Users and authentication**

Choose and set up user authentication for your n8n instance.

[Authentication](configuration/user-management-self-hosted/)

Manage data, modes, and processes to keep n8n running smoothly at scale.

[Scaling](scaling/queue-mode/)

Secure your n8n instance by setting up SSL, SSO, or 2FA or blocking or opting out of some data collection or features.

[Securing n8n guide](securing/overview/)

New to n8n or AI? Try our Self-hosted AI Starter Kit. Curated by n8n, it combines the self-hosted n8n platform with compatible AI products and components to get you started building self-hosted AI workflows.

[Starter kits](starter-kits/ai-starter-kit/)

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

---

## Discord credentials

**URL:** llms-txt#discord-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using bot
- Using OAuth2
- Using webhook
- Choose an authentication method

You can use these credentials to authenticate the following nodes:

- [Discord](../../app-nodes/n8n-nodes-base.discord/)

- Create a [Discord](https://www.discord.com/) account.
- For Bot and OAuth2 credentials:
  - [Set up your local developer environment](https://discord.com/developers/docs/quick-start/getting-started#step-0-project-setup).
  - [Create an application and a bot user](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app).
- For webhook credentials, [create a webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

## Supported authentication methods

- Bot
- OAuth2
- Webhook

Not sure which method to use? Refer to [Choose an authentication method](#choose-an-authentication-method) for more guidance.

Refer to [Discord's Developer documentation](https://discord.com/developers/docs/intro) for more information about the service.

Use this method if you want to add the bot to your Discord server using a bot token rather than OAuth2.

To configure this credential, you'll need:

- A **Bot Token**: Generated once you create an application with a bot.

To create an application with a bot and generate the **Bot Token**:

1. If you don't have one already, create an app in the [developer portal](https://discord.com/developers/applications?new_application=true).
1. Enter a **Name** for your app.
1. Select **Create**.
1. Select **Bot** from the left menu.
1. Under **Token**, select **Reset Token** to generate a new bot token.
1. Copy the token and add it to your n8n credential.
1. In **Bot > Privileged Gateway Intents**, add any privileged intents you want your bot to have. Refer to [Configuring your bot](https://discord.com/developers/docs/quick-start/getting-started#configuring-your-bot) for more information on privileged intents.
   - n8n recommends activating **SERVER MEMBERS INTENT: Required for your bot to receive events listed under GUILD_MEMBERS**.
1. In **Installation > Installation Contexts**, select the installation contexts you want your bot to use:
   - Select **Guild Install** for server-installed apps. (Most common for n8n users.)
   - Select **User Install** for user-installed apps. (Less common for n8n users, but may be useful for testing.)
   - Refer to Discord's [Choosing installation contexts](https://discord.com/developers/docs/quick-start/getting-started#choosing-installation-contexts) documentation for more information about these installation contexts.
1. In **Installation > Install Link**, select **Discord Provided Link** if it's not already selected.
1. Still on the **Installation** page, in the **Default Install Settings** section, select `applications.commands` and `bot` scopes. Refer to Discord's [Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes) documentation for more information about these and other scopes.
1. Add permissions on the **Bot > Bot Permissions** page. Refer to Discord's [Permissions](https://discord.com/developers/docs/topics/permissions) documentation for more information. n8n recommends selecting these permissions for the [Discord](../../app-nodes/n8n-nodes-base.discord/) node:
   - Manage Roles
   - Manage Channels
   - Read Messages/View Channels
   - Send Messages
   - Create Public Threads
   - Create Private Threads
   - Send Messages in Threads
   - Send TTS Messages
   - Manage Messages
   - Manage Threads
   - Embed Links
   - Attach Files
   - Read Message History
   - Add Reactions
1. Add the app to your server or test server:
   1. Go to **Installation > Install Link** and copy the link listed there.
   1. Paste the link in your browser and hit Enter.
   1. Select **Add to server** in the installation prompt.
   1. Once your app's added to your server, you'll see it in the member list.

These steps outline the basic functionality needed to set up your n8n credential. Refer to the [Discord Creating an App](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app) guide for more information on creating an app, especially:

- [Fetching your credentials](https://discord.com/developers/docs/quick-start/getting-started#fetching-your-credentials) for getting your app's credentials into your local developer environment.
- [Handling interactivity](https://discord.com/developers/docs/quick-start/getting-started#step-3-handling-interactivity) for information on setting up public endpoints for interactive `/slash` commands.

Use this method if you want to add the bot to Discord servers using the OAuth2 flow, which simplifies the process for those installing your app.

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**
- Choose whether to send **Authentication** in the **Header** or **Body**
- A **Bot Token**

For details on creating an application with a bot and generating the token, follow the same steps as in [Using bot](#using-bot) above.

1. Copy the **Bot Token** you generate and add it into the n8n credential.
1. Open the **OAuth2** page in your Discord application to access your **Client ID** and generate a **Client Secret**. Add these to your n8n credential.
1. From n8n, copy the **OAuth Redirect URL** and add it into the Discord application in **OAuth2 > Redirects**. Be sure you save these changes.

To configure this credential, you'll need:

- A **Webhook URL**: Generated once you create a webhook.

To get a Webhook URL, you create a webhook and copy the URL that gets generated:

1. Open your Discord **Server Settings** and open the **Integrations** tab.
1. Select **Create Webhook** to create a new webhook.
1. Give your webhook a **Name** that makes sense.
1. Select the **avatar** next to the **Name** to edit or upload a new avatar.
1. In the **CHANNEL** dropdown, select the channel the webhook should post to.
1. Select **Copy Webhook URL** to copy the Webhook URL. Enter this URL in your n8n credential.

Refer to the [Discord Making a Webhook documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) for more information.

## Choose an authentication method

The simplest installation is a **webhook**. You create and add webhooks to a single channel on a Discord server. Webhooks can post messages to a channel. They don't require a bot user or authentication. But they can't listen or respond to user requests or commands. If you need a straightforward way to send messages to a channel without the need for interaction or feedback, use a webhook.

A **bot** is an interactive step up from a webhook. You add bots to the Discord server (referred to as a `guild` in the Discord API documentation) or to user accounts. Bots added to the server can interact with users on all the server's channels. They can manage channels, send and retrieve messages, retrieve the list of all users, and change their roles. If you need to build an interactive, complex, or multi-step workflow, use a bot.

**OAuth2** is basically a **bot** that uses an OAuth2 flow rather than just the bot token. As with bots, you add these to the Discord server or to user accounts. These credentials offer the same functionalities as bots, but they can simplify the installation of the bot on your server.

---

## Docker Installation

**URL:** llms-txt#docker-installation

**Contents:**
- Prerequisites
- Starting n8n
- Using with PostgreSQL
- Updating

n8n recommends using [Docker](https://www.docker.com/) for most self-hosting needs. It provides a clean, isolated environment, avoids operating system and tooling incompatibilities, and makes database and environment management simpler.

You can also use n8n in Docker with [Docker Compose](../server-setups/docker-compose/). You can find Docker Compose configurations for various architectures in the [n8n-hosting repository](https://github.com/n8n-io/n8n-hosting).

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

You can also follow along with our video guide here:

Before proceeding, install Docker:

- [Docker Desktop](https://docs.docker.com/get-docker/) is available for Mac, Windows, and Linux. Docker Desktop includes the Docker Engine and Docker Compose.
- [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/linux/) are also available as separate packages for Linux. Use this for Linux machines without a graphical environment or when you don't want the Docker Desktop UI.

Latest and Next versions

n8n releases a new minor version most weeks. The `latest` version is for production use. `next` is the most recent release. You should treat `next` as a beta: it may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12).

Current `latest`: 1.118.1\
Current `next`: 1.119.0

From your terminal, run the following commands, replacing the `<YOUR_TIMEZONE>` placeholders with [your timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List):

This command creates a volume to store persistent data, downloads the required n8n image, and starts the container with the following settings:

- Maps and exposes port `5678` on the host.
- Sets the timezone for the container:
  - the `TZ` environment variable sets the system timezone to control what scripts and commands like `date` return.
  - the [`GENERIC_TIMEZONE` environment variable](../../configuration/environment-variables/timezone-localization/) sets the correct timezone for schedule-oriented nodes like the [Schedule Trigger node](../../../integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/).
- Enforces secure file permissions for the n8n configuration file.
- Enables [task runners](../../configuration/task-runners/), the recommended way of executing tasks in n8n.
- Mounts the `n8n_data` volume to the `/home/node/.n8n` directory to persist your data across container restarts.

Once running, you can access n8n by opening: <http://localhost:5678>

## Using with PostgreSQL

By default, n8n uses SQLite to save [credentials](../../../glossary/#credential-n8n), past executions, and workflows. n8n also supports PostgreSQL, configurable using environment variables as detailed below.

Persisting the `.n8n` directory still recommended

When using PostgreSQL, n8n doesn't need to use the `.n8n` directory for the SQLite database file. However, the directory still contains other important data like encryption keys, instance logs, and source control feature assets. While you can work around some of these requirements, (for example, by setting the [`N8N_ENCRYPTION_KEY` environment variable](../../configuration/environment-variables/deployment/)), it's best to continue mapping a persistent volume for the directory to avoid potential issues.

To use n8n with PostgreSQL, execute the following commands, replacing the placeholders (depicted within angled brackets, for example `<POSTGRES_USER>`) with your actual values:

You can find a complete `docker-compose` file for PostgreSQL in the [n8n hosting repository](https://github.com/n8n-io/n8n-hosting/tree/main/docker-compose/withPostgres).

To update n8n, in Docker Desktop, navigate to the **Images** tab and select **Pull** from the context menu to download the latest n8n image:

You can also use the command line to pull the latest, or a specific version:

**Examples:**

Example 1 (unknown):
```unknown
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="<YOUR_TIMEZONE>" \
 -e TZ="<YOUR_TIMEZONE>" \
 -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true \
 -e N8N_RUNNERS_ENABLED=true \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

Example 2 (unknown):
```unknown
docker volume create n8n_data

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="<YOUR_TIMEZONE>" \
 -e TZ="<YOUR_TIMEZONE>" \
 -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true \
 -e N8N_RUNNERS_ENABLED=true \
 -e DB_TYPE=postgresdb \
 -e DB_POSTGRESDB_DATABASE=<POSTGRES_DATABASE> \
 -e DB_POSTGRESDB_HOST=<POSTGRES_HOST> \
 -e DB_POSTGRESDB_PORT=<POSTGRES_PORT> \
 -e DB_POSTGRESDB_USER=<POSTGRES_USER> \
 -e DB_POSTGRESDB_SCHEMA=<POSTGRES_SCHEMA> \
 -e DB_POSTGRESDB_PASSWORD=<POSTGRES_PASSWORD> \
 -v n8n_data:/home/node/.n8n \
 docker.n8n.io/n8nio/n8n
```

---

## Cockpit credentials

**URL:** llms-txt#cockpit-credentials

**Contents:**
- Prerequisites
- Supported authentication methods
- Related resources
- Using API access token

You can use these credentials to authenticate the following nodes:

- [Cockpit](../../app-nodes/n8n-nodes-base.cockpit/)

- Create a [Cockpit](https://getcockpit.com/) account.
- Set up a [self-hosted instance of Cockpit](https://getcockpit.com/documentation/core/quickstart/installation).

## Supported authentication methods

Refer to [Cockpit's API documentation](https://getcockpit.com/documentation/core/api/introduction) for more information about the service.

## Using API access token

To configure this credential, you'll need:

- Your **Cockpit URL**: The URL you use to access your Cockpit instance
- An **Access Token**: Refer to the [Cockpit Managing tokens documentation](https://getcockpit.com/documentation/core/api/authentication/#managing-tokens) for instructions on creating an API token. Use the **API token** as the n8n **Access Token**.

---
