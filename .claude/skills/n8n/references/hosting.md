# N8N - Hosting

**Pages:** 23

---

## For a self-hosted n8n instance

**URL:** llms-txt#for-a-self-hosted-n8n-instance

curl -X 'GET' \
  '<N8N_HOST>:<N8N_PORT>/<N8N_PATH>/api/v<version-number>/workflows?active=true&limit=150&cursor=MTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDA' \
  -H 'accept: application/json'

---

## Spotify credentials

**URL:** llms-txt#spotify-credentials

**Contents:**
- Supported authentication methods
- Related resources
- Using OAuth2

You can use these credentials to authenticate the following nodes:

- [Spotify](../../app-nodes/n8n-nodes-base.spotify/)

## Supported authentication methods

Refer to [Spotify's Web API documentation](https://developer.spotify.com/documentation/web-api) for more information about the service.

Note for n8n Cloud users

Cloud users don't need to provide connection details. Select **Connect my account** to connect through your browser.

If you're [self-hosting](../../../../hosting/) n8n, you'll need a [Spotify Developer](https://developer.spotify.com/) account so you can create a Spotify app:

1. Open the [Spotify developer dashboard](https://developer.spotify.com/dashboard).
1. Select **Create an app**.
1. Enter an **App name**, like `n8n integration`.
1. Enter an **App description**.
1. Copy the **OAuth Redirect URL** from n8n and enter it as the **Redirect URI** in your Spotify app.
1. Check the box to agree to the Spotify Terms of Service and Branding Guidelines.
1. Select **Create**. The **App overview** page opens.
1. Copy the **Client ID** and enter it in your n8n credential.
1. Copy the **Client Secret** and enter it in your n8n credential.
1. Select **Connect my account** and follow the on-screen prompts to finish authorizing the credential.

Refer to [Spotify Apps](https://developer.spotify.com/documentation/web-api/concepts/apps) for more information.

---

## Hosting n8n on Google Cloud Run

**URL:** llms-txt#hosting-n8n-on-google-cloud-run

**Contents:**
- Before you begin: get a Google Cloud project
- Easy mode
- Durable mode
- Enable APIs and set env vars
- You may need to login first
- Setup your Postgres database
- Store sensitive data in Secret Manager
- Create a service account for Cloud Run
- Deploy the Cloud Run service
- Troubleshooting

This hosting guide shows you how to self-host n8n on Google Cloud Run, a serverless container runtime. If you're just getting started with n8n and don't need a production-grade deployment, you can go with the "easy mode" option below for deployment. Otherwise, if you intend to use this n8n deployment at-scale, refer to the "durable mode" instructions further down.

You can also enable access via OAuth to Google Workspace, such as Gmail and Drive, to use these services as n8n workflow tools. Instructions for granting n8n access to these services are at the end of of this documentation.

If you want to deploy to Google Kubernetes Engine (GKE) instead, you can refer to [these instructions](../google-kubernetes-engine/).

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

Latest and Next versions

n8n releases a new minor version most weeks. The `latest` version is for production use. `next` is the most recent release. You should treat `next` as a beta: it may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12).

Current `latest`: 1.118.1\
Current `next`: 1.119.0

## Before you begin: get a Google Cloud project

If you have not yet created a Google Cloud project, [do this first](https://developers.google.com/workspace/guides/create-project) (and ensure you have billing enabled on the project; even if your Cloud Run service runs for free you must have billing activated to deploy). Otherwise, navigate to the project where you want to deploy n8n.

This is the fastest way to deploy n8n on Cloud Run. For this deployment, n8n's data is in-memory so this is only recommended for demo purposes. **Anytime this Cloud Run service scales to zero or is redeployed, the n8n data will be lost.** Refer to the durable mode instructions below if you need a production-grade deployment.

If you have not yet created a Google Cloud project, [do this first](https://developers.google.com/workspace/guides/create-project) (and ensure you have billing enabled on the project; even if your Cloud Run service will run for free you must have billing enabled to activated to deploy). Otherwise, navigate to the project where you want to deploy n8n.

Open the Cloud Shell Terminal (on the Google Cloud console, either type "G" then "S" or click on the terminal icon on the upper right).

Once your session is open, you may need to run this command first to login (and follow the steps it asks you to complete):

You can also explicitly enable the Cloud Run API (even if you don't do this, it will ask if you want this enabled when you deploy):

(you can specify whichever region you prefer, instead of "us-west1")

Once the deployment finishes, open another tab to navigate to the Service URL. n8n may still be loading and you will see a "n8n is starting up. Please wait" message, but shortly thereafter you should see the n8n login screen.

Optional: If you want to keep this n8n service running for as long as possible to avoid data loss, you can also set manual scale to 1 to prevent it from autoscaling to 0.

This does not prevent data loss completely, such as whenever the Cloud Run service is re-deployed/updated. If you want truly persistant data, you should refer to the instructions below for how to attach a database.

The following instructions are intended for a more durable, production-grade deployment of n8n on Cloud Run. It includes resources such as a database for persistance and secret manager for sensitive data.

## Enable APIs and set env vars

Open the Cloud Shell Terminal (on the Google Cloud console, either type "G" then "S" or click on the terminal icon on the upper right) and run these commands in the terminal session:

You'll also want to set some environment variables for the remainder of these instructions:

## Setup your Postgres database

Run this command to create the Postgres DB instance (it will take a few minutes to complete; also ensure you update the root-password field with your own desired password):

Once complete, you can add the database that n8n will use:

Create the DB user for n8n (change the password value, of course):

You can save the password you set for this n8n-user to a file for the next step of saving the password in Secret Manager. Be sure to delete this file later.

## Store sensitive data in Secret Manager

While not required, it's absolutely recommended to store your sensitive data in Secrets Manager.

Create a secret for the database password (replace "/your/password/file" with the file you created above for the n8n-user password):

Create an encryption key (you can use your own, this example generates a random one):

Create a secret for this encryption key (replace "my-encryption-key" if you are supplying your own):

Now you can delete my-encryption-key and the database password files you created. These values are now securely stored in Secret Manager.

## Create a service account for Cloud Run

You want this Cloud Run service to be restricted to access only the resources it needs. The following commands create the service account and adds the permissions necessary to access secrets and the database:

## Deploy the Cloud Run service

Now you can deploy your n8n service:

Once the deployment finishes, open another tab to navigate to the Service URL. You should see the n8n login screen.

If you see a "Cannot GET /" screen this usually indicates that n8n is still starting up. You can refresh the page and it should eventually load.

## (Optional) Enabling Google Workspace services as n8n tools

If you want to use Google Workspace services (Gmail, Calendar, Drive, etc.) as tools in n8n, it's recommended to setup OAuth to access these services.

First ensure the respective APIs you want are enabled:

Re-deploy n8n on Cloud Run with the necessary OAuth callback URLs as environment variables:

Lastly, you must setup OAuth for these services. Visit `https://console.cloud.google.com/auth` and follow these steps:

1. Click "Get Started" if this button shows (when you have not yet setup OAuth in this Cloud project).
1. For "App Information", enter whichever "App Name" and "User Support Email" you prefer.
1. For "Audience", select "Internal" if you intend to only enable access to your user(s) within this same Google Workspace. Otherwise, you can select "External".
1. Enter "Contact Information".
1. If you selected "External", then click "Audience" and add any test users you need to grant access.
1. Click "Clients" > "Create client", select "Web application" for "Application type", enter your n8n service URL into "Authorized JavaScript origins", and "/rest/oauth2-credential/callback" into "Authorized redirect URIs" where your YOUR-N8N-URL is also the n8n service URL (e.g. `https://n8n-12345678.us-west1.run.app/rest/oauth2-credential/callback`). Make sure you download the created client's JSON file since it contains the client secret which you will not be able to see later in the Console.
1. Click "Data Access" and add the scopes you want n8n to have access for (e.g. to access Google Sheets, you need `https://googleapis.com/auth/drive.file` and `https://googleapis.com/auth/spreadsheets`)
1. Now you should be able to use these workspace services. You can test if it works by logging into n8n, add a Tool for the respective service and add its credentials using the information in the OAuth client JSON file from step 6.

**Examples:**

Example 1 (unknown):
```unknown
gcloud auth login
```

Example 2 (unknown):
```unknown
gcloud services enable run.googleapis.com
```

Example 3 (unknown):
```unknown
gcloud run deploy n8n \
    --image=n8nio/n8n \
    --region=us-west1 \
    --allow-unauthenticated \
    --port=5678 \
    --no-cpu-throttling \
    --memory=2Gi
```

Example 4 (unknown):
```unknown
gcloud run deploy n8n \
    --image=n8nio/n8n \
    --region=us-west1 \
    --allow-unauthenticated \
    --port=5678 \
    --no-cpu-throttling \
    --memory=2Gi \
    --scaling=1
```

---

## Hosting n8n on Amazon Web Services

**URL:** llms-txt#hosting-n8n-on-amazon-web-services

**Contents:**
- Hosting options
- Prerequisites
- Create a cluster
- Clone configuration repository
- Configure Postgres
  - Configure volume for persistent storage
  - Postgres environment variables
- Configure n8n
  - Create a volume for file storage
  - Pod resources

This hosting guide shows you how to self-host n8n with Amazon Web Services (AWS). It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

AWS offers several ways suitable for hosting n8n, including EC2 (virtual machines), and EKS (containers running with Kubernetes).

This guide uses [EKS](https://aws.amazon.com/eks/) as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

The steps in this guide use a mix of the AWS UI and [the eksctl CLI tool for EKS](https://eksctl.io).

While not mentioned in the documentation for eksctl, you also need to [install the AWS CLI tool](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), and [configure authentication of the tool](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

Latest and Next versions

n8n releases a new minor version most weeks. The `latest` version is for production use. `next` is the most recent release. You should treat `next` as a beta: it may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12).

Current `latest`: 1.118.1\
Current `next`: 1.119.0

Use the eksctl tool to create a cluster specifying a name and a region with the following command:

This can take a while to create the cluster.

Once the cluster is created, eksctl automatically sets the kubectl context to the cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-hosting). The following steps tell you what each file does, and what settings you need to change.

Clone the repository with the following command:

And change directory:

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. The default AWS storage class, [gp3](https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html#gp3-ebs-volume-type), is suitable for this purpose. This is defined in the `postgres-claim0-persistentvolumeclaim.yaml` manifest.

### Postgres environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with values of your own for user details and the database to use.

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

### Create a volume for file storage

While not essential for running n8n, using persistent volumes helps maintain files uploaded while using n8n and if you want to persist [manual n8n encryption keys](../../../configuration/environment-variables/deployment/) between restarts, which saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

[Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) lets you specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` file:

This defines a minimum of 250mb per container, a maximum of 500mb, and lets Kubernetes handle CPU. You can change these values to match your own needs. As a guide, here are the resources values for the n8n cloud offerings:

- **Start**: 320mb RAM, 10 millicore CPU burstable
- **Pro (10k executions)**: 640mb RAM, 20 millicore CPU burstable
- **Pro (50k executions)**: 1280mb RAM, 80 millicore CPU burstable

### Optional: Environment variables

You can configure n8n settings and behaviors using environment variables.

Create an `n8n-secret.yaml` file. Refer to [Environment variables](../../../configuration/environment-variables/) for n8n environment variables details.

The two deployment manifests (`n8n-deployment.yaml` and `postgres-deployment.yaml`) define the n8n and Postgres applications to Kubernetes.

The manifests define the following:

- Send the environment variables defined to each application pod
- Define the container image to use
- Set resource consumption limits
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define one instance of each pod. You should change this to meet your needs.

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively by default.

## Send to Kubernetes cluster

Send all the manifests to the cluster by running the following command in the `n8n-kubernetes-hosting` directory:

You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to a static address of the instance.

To find the address of the n8n service running on the instance:

1. Open the **Clusters** section of the **Amazon Elastic Kubernetes Service** page in the AWS console.
1. Select the name of the cluster to open its configuration page.
1. Select the **Resources** tab, then **Service and networking** > **Services**.
1. Select the **n8n** service and copy the **Load balancer URLs** value. Use this value suffixed with the n8n service port (5678) for DNS.

This guide uses HTTP connections for the services it defines, for example in `n8n-deployment.yaml`. However, if you click the **Load balancer URLs** value, EKS takes you to an "HTTPS" URL which results in an error. To solve this, when you open the n8n subdomain, make sure to use HTTP.

If you need to delete the setup, you can remove the resources created by the manifests with the following command:

- Learn more about [configuring](../../../configuration/environment-variables/) and [scaling](../../../scaling/overview/) n8n.
- Or explore using n8n: try the [Quickstarts](../../../../try-it-out/).

**Examples:**

Example 1 (unknown):
```unknown
eksctl create cluster --name n8n --region <your-aws-region>
```

Example 2 (unknown):
```unknown
git clone https://github.com/n8n-io/n8n-hosting.git
```

Example 3 (unknown):
```unknown
cd n8n-hosting/kubernetes
```

Example 4 (unknown):
```unknown
…
spec:
  storageClassName: gp3
  accessModes:
    - ReadWriteOnce
…
```

---

## Isolate n8n

**URL:** llms-txt#isolate-n8n

By default, a self-hosted n8n instance sends data to n8n's servers. It notifies users about available updates, workflow templates, and diagnostics.

To prevent your n8n instance from connecting to n8n's servers, set these environment variables to false:

Unset n8n's diagnostics configuration:

Refer to [Environment variables reference](../../environment-variables/deployment/) for more information on these variables.

**Examples:**

Example 1 (unknown):
```unknown
N8N_DIAGNOSTICS_ENABLED=false
N8N_VERSION_NOTIFICATIONS_ENABLED=false
N8N_TEMPLATES_ENABLED=false
```

Example 2 (unknown):
```unknown
EXTERNAL_FRONTEND_HOOKS_URLS=
N8N_DIAGNOSTICS_CONFIG_FRONTEND=
N8N_DIAGNOSTICS_CONFIG_BACKEND=
```

---

## Hosting n8n on DigitalOcean

**URL:** llms-txt#hosting-n8n-on-digitalocean

**Contents:**
- Create a Droplet
- Log in to your Droplet and create new user
- Clone configuration repository
- Default folders and files
  - Create Docker volumes
- Set up DNS
- Open ports
- Configure n8n
- The Docker Compose file
- Configure Caddy

This hosting guide shows you how to self-host n8n on a DigitalOcean droplet. It uses:

- [Caddy](https://caddyserver.com) (a reverse proxy) to allow access to the Droplet from the internet. Caddy will also automatically create and manage SSL / TLS certificates for your n8n instance.
- [Docker Compose](https://docs.docker.com/compose/) to create and define the application components and how they work together.

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

Latest and Next versions

n8n releases a new minor version most weeks. The `latest` version is for production use. `next` is the most recent release. You should treat `next` as a beta: it may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12).

Current `latest`: 1.118.1\
Current `next`: 1.119.0

1. [Log in](https://cloud.digitalocean.com/login) to DigitalOcean.
1. Select the project to host the Droplet, or [create a new project](https://docs.digitalocean.com/products/projects/how-to/create/).
1. In your project, select **Droplets** from the **Manage** menu.
1. [Create a new Droplet](https://docs.digitalocean.com/products/droplets/how-to/create/) using the [Docker image](https://marketplace.digitalocean.com/apps/docker) available on the **Marketplace** tab.

When creating the Droplet, DigitalOcean asks you to choose a plan. For most usage levels, a basic shared CPU plan is enough.

DigitalOcean lets you choose between SSH key and password-based authentication. SSH keys are considered more secure.

## Log in to your Droplet and create new user

The rest of this guide requires you to log in to the Droplet using a terminal with SSH. Refer to [How to Connect to Droplets with SSH](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/) for more information.

You should create a new user, to avoid working as the root user:

1. Create a new user:

1. Follow the prompts in the CLI to finish creating the user.

1. Grant the new user administrative privileges:

You can now run commands with superuser privileges by using `sudo` before the command.

1. Follow the steps to set up SSH for the new user: [Add Public Key Authentication](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04#step-four-add-public-key-authentication-recommended).

1. Log out of the droplet.

1. Log in using SSH as the new user.

## Clone configuration repository

Docker Compose, n8n, and Caddy require a series of folders and configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-docker-caddy) into the home folder of the logged-in user on your Droplet. The following steps will tell you which file to change and what changes to make.

Clone the repository with the following command:

And change directory to the root of the repository you cloned:

## Default folders and files

The host operating system (the DigitalOcean Droplet) copies the two folders you created to Docker containers to make them available to Docker. The two folders are:

- `caddy_config`: Holds the Caddy configuration files.
- `local_files`: A folder for files you upload or add using n8n.

### Create Docker volumes

To persist the Caddy cache between restarts and speed up start times, create [a Docker volume](https://docs.docker.com/storage/volumes/) that Docker reuses between restarts:

Create a Docker volume for the n8n data:

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the Droplet. The exact steps for this depend on your DNS provider, but typically you need to create a new "A" record for the n8n subdomain. DigitalOcean provide [An Introduction to DNS Terminology, Components, and Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts).

n8n runs as a web application, so the Droplet needs to allow incoming access to traffic on port 80 for non-secure traffic, and port 443 for secure traffic.

Open the following ports in the Droplet's firewall by running the following two commands:

n8n needs some environment variables set to pass to the application running in the Docker container. The example `.env` file contains placeholders you need to replace with values of your own.

Open the file with the following command:

The file contains inline comments to help you know what to change.

Refer to [Environment variables](../../../configuration/environment-variables/) for n8n environment variables details.

## The Docker Compose file

The Docker Compose file (`docker-compose.yml`) defines the services the application needs, in this case Caddy and n8n.

- The Caddy service definition defines the ports it uses and the local volumes to copy to the containers.
- The n8n service definition defines the ports it uses, the environment variables n8n needs to run (some defined in the `.env` file), and the volumes it needs to copy to the containers.

The Docker Compose file uses the environment variables set in the `.env` file, so you shouldn't need to change it's content, but to take a look, run the following command:

Caddy needs to know which domains it should serve, and which port to expose to the outside world. Edit the `Caddyfile` file in the `caddy_config` folder.

Change the placeholder domain to yours. If you followed the steps to name the subdomain n8n, your full domain is similar to `n8n.example.com`. The `n8n` in the `reverse_proxy` setting tells Caddy to use the service definition defined in the `docker-compose.yml` file:

If you were to use `automate.example.com`, your `Caddyfile` may look something like:

## Start Docker Compose

Start n8n and Caddy with the following command:

This may take a few minutes.

In your browser, open the URL formed of the subdomain and domain name defined earlier. Enter the user name and password defined earlier, and you should be able to access n8n.

## Stop n8n and Caddy

You can stop n8n and Caddy with the following command:

If you run n8n using a Docker Compose file, follow these steps to update n8n:

**Examples:**

Example 1 (unknown):
```unknown
adduser <username>
```

Example 2 (unknown):
```unknown
usermod -aG sudo <username>
```

Example 3 (unknown):
```unknown
git clone https://github.com/n8n-io/n8n-docker-caddy.git
```

Example 4 (unknown):
```unknown
cd n8n-docker-caddy
```

---

## Docker Compose

**URL:** llms-txt#docker-compose

n8n:
    environment:
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168
	  	- EXECUTIONS_DATA_PRUNE_MAX_COUNT=50000
```

If you run n8n using the default SQLite database, the disk space of any pruned data isn't automatically freed up but rather reused for future executions data. To free up this space configure the `DB_SQLITE_VACUUM_ON_STARTUP` [environment variable](../../configuration/environment-variables/database/#sqlite) or manually run the [VACUUM](https://www.sqlite.org/lang_vacuum.html) operation.

Binary data pruning operates on the active binary data mode. For example, if your instance stored data in S3, and you later switched to filesystem mode, n8n only prunes binary data in the filesystem. This may change in future.

---

## Cloud concurrency

**URL:** llms-txt#cloud-concurrency

**Contents:**
- Concurrency limits
- Details
- Comparison to queue mode

This document discusses concurrency in n8n Cloud. Read [self-hosted n8n concurrency control](../../hosting/scaling/concurrency-control/) to learn how concurrency works with self-hosted n8n instances.

Too many concurrent executions can cause performance degradation and unresponsiveness. To prevent this and improve instance stability, n8n sets concurrency limits for production executions in regular mode.

Any executions beyond the limits queue for later processing. These executions remain in the queue until concurrency capacity frees up, and are then processed in FIFO order.

## Concurrency limits

n8n limits the number of concurrent executions for Cloud instances according to their plan. Refer to [Pricing](https://n8n.io/pricing/) for details.

You can view the number of active executions and your plan's concurrency limit at the top of a project's or workflow's executions tab.

Some other details about concurrency to keep in mind:

- Concurrency control applies only to production executions: those started from a webhook or trigger node. It doesn't apply to any other kinds, such as manual executions, sub-workflow executions, or error executions.
- [Test evaluations](../../glossary/#evaluation-n8n) don't count towards concurrency limits. Your test evaluation concurrency limit is equal to, but separate from, your plan's regular concurrency limit.
- You can't retry queued executions. Cancelling or deleting a queued execution also removes it from the queue.
- On instance startup, n8n resumes queued executions up to the concurrency limit and re-enqueues the rest.

## Comparison to queue mode

Queue mode is available for Cloud Enterprise plans. To enable it, [contact n8n](https://n8n-community.typeform.com/to/y9X2YuGa).

Concurrency in queue mode is a separate mechanism from concurrency in regular mode. In queue mode, the concurrency settings determine how many jobs each worker can run in parallel. In regular mode, concurrency limits apply to the entire instance.

---

## Docker

**URL:** llms-txt#docker

docker run -it --rm \
 --name n8n \
 -p 5678:5678 \
 -e EXECUTIONS_DATA_PRUNE=true \
 -e EXECUTIONS_DATA_MAX_AGE=168 \
 docker.n8n.io/n8nio/n8n

**Examples:**

Example 1 (unknown):
```unknown

```

---

## Register the `docker` group membership with current session without changing your primary group

**URL:** llms-txt#register-the-`docker`-group-membership-with-current-session-without-changing-your-primary-group

**Contents:**
- 3. DNS setup
- 4. Create an `.env` file

exec sg docker newgrp

sudo usermod -aG docker <USER_TO_RUN_DOCKER>

mkdir n8n-compose
cd n8n-compose

**Examples:**

Example 1 (unknown):
```unknown
To grant access to a different user, type the following, substituting `<USER_TO_RUN_DOCKER>` with the appropriate username:
```

Example 2 (unknown):
```unknown
You will need to run `exec sg docker newgrp` from any of that user's existing sessions for it to access the new group permissions.

You can verify that your current session recognizes the `docker` group by typing:
```

Example 3 (unknown):
```unknown
## 3. DNS setup

To host n8n online or on a network, create a dedicated subdomain pointed at your server.

Add an A record to route the subdomain accordingly:

| Record type | Name                              | Destination                |
| ----------- | --------------------------------- | -------------------------- |
| A           | `n8n` (or your desired subdomain) | `<your_server_IP_address>` |

## 4. Create an `.env` file

Create a project directory to store your n8n environment configuration and Docker Compose files and navigate inside:
```

Example 4 (unknown):
```unknown
Inside the `n8n-compose` directory, create an `.env` file to customize your n8n instance's details. Change it to match your own information:
```

---

## Configure self-hosted n8n for user management

**URL:** llms-txt#configure-self-hosted-n8n-for-user-management

**Contents:**
- Setup
  - Step one: SMTP
  - Step two: In-app setup
  - Step three: Invite users

User management in n8n allows you to invite people to work in your n8n instance.

This document describes how to configure your n8n instance to support user management, and the steps to start inviting users.

Refer to the main [User management](../../../user-management/) guide for more information about usage, including:

- [Managing users](../../../user-management/manage-users/)
- [Account types](../../../user-management/account-types/)
- [Best practices](../../../user-management/best-practices/)

For LDAP setup information, refer to [LDAP](../../../user-management/ldap/).

For SAML setup information, refer to [SAML](../../../user-management/saml/).

Basic auth and JWT removed

n8n removed support for basic auth and JWT in version 1.0.

There are three stages to set up user management in n8n:

1. Configure your n8n instance to use your SMTP server.
1. Start n8n and follow the setup steps in the app.
1. Invite users.

n8n recommends setting up an SMTP server, for user invites and password resets.

Optional from 0.210.1

From version 0.210.1 onward, this step is optional. You can choose to manually copy and send invite links instead of setting up SMTP. Note that if you skip this step, users can't reset passwords.

Get the following information from your SMTP provider:

- Server name
- SMTP username
- SMTP password
- SMTP sender name

To set up SMTP with n8n, configure the SMTP environment variables for your n8n instance. For information on how to set environment variables, refer to [Configuration](../configuration-methods/)

| Variable                                    | Type    | Description                                                                                                                  | Required? |
| ------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- |
| `N8N_EMAIL_MODE`                            | string  | `smtp`                                                                                                                       | Required  |
| `N8N_SMTP_HOST`                             | string  | *your_SMTP_server_name*                                                                                                      | Required  |
| `N8N_SMTP_PORT`                             | number  | *your_SMTP_server_port* Default is `465`.                                                                                    | Optional  |
| `N8N_SMTP_USER`                             | string  | *your_SMTP_username*                                                                                                         | Optional  |
| `N8N_SMTP_PASS`                             | string  | *your_SMTP_password*                                                                                                         | Optional  |
| `N8N_SMTP_OAUTH_SERVICE_CLIENT`             | string  | *your_OAuth_service_client*                                                                                                  | Optional  |
| `N8N_SMTP_OAUTH_PRIVATE_KEY`                | string  | *your_OAuth_private_key*                                                                                                     | Optional  |
| `N8N_SMTP_SENDER`                           | string  | Sender email address. You can optionally include the sender name. Example with name: *N8N `<contact@n8n.com>`*               | Required  |
| `N8N_SMTP_SSL`                              | boolean | Whether to use SSL for SMTP (true) or not (false). Defaults to `true`.                                                       | Optional  |
| `N8N_UM_EMAIL_TEMPLATES_INVITE`             | string  | Full path to your HTML email template. This overrides the default template for invite emails.                                | Optional  |
| `N8N_UM_EMAIL_TEMPLATES_PWRESET`            | string  | Full path to your HTML email template. This overrides the default template for password reset emails.                        | Optional  |
| `N8N_UM_EMAIL_TEMPLATES_WORKFLOW_SHARED`    | String  | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template. | Optional  |
| `N8N_UM_EMAIL_TEMPLATES_CREDENTIALS_SHARED` | String  | Overrides the default HTML template for notifying users that a credential was shared. Provide the full path to the template. | Optional  |
| `N8N_UM_EMAIL_TEMPLATES_PROJECT_SHARED`     | String  | Overrides the default HTML template for notifying users that a project was shared. Provide the full path to the template.    | Optional  |

If your n8n instance is already running, you need to restart it to enable the new SMTP settings.

More configuration options

There are more configuration options available as environment variables. Refer to [Environment variables](../environment-variables/) for a list. These include options to disable tags, workflow templates, and the personalization survey, if you don't want your users to see them.

If you're not familiar with SMTP, this [blog post by SendGrid](https://sendgrid.com/blog/what-is-an-smtp-server/) offers a short introduction, while [Wikipedia's Simple Mail Transfer Protocol article](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) provides more detailed technical background.

### Step two: In-app setup

When you set up user management for the first time, you create an owner account.

1. Open n8n. The app displays a signup screen.
1. Enter your details. Your password must be at least eight characters, including at least one number and one capital letter.
1. Click **Next**. n8n logs you in with your new owner account.

### Step three: Invite users

You can now invite other people to your n8n instance.

1. Sign into your workspace with your owner account. (If you are in the Admin Panel open your **Workspace** from the Dashboard)
1. Click the three dots next to your user icon at the bottom left and click **Settings**. n8n opens your **Personal settings** page.
1. Click **Users** to go to the **Users** page.
1. Click **Invite**.
1. Enter the new user's email address.
1. Click **Invite user**. n8n sends an email with a link for the new user to join.

---

## Hosting n8n on Azure

**URL:** llms-txt#hosting-n8n-on-azure

**Contents:**
- Prerequisites
- Hosting options
- Open the Azure Kubernetes Service
- Create a cluster
- Set Kubectl context
- Clone configuration repository
- Configure Postgres
  - Configure volume for persistent storage
  - Postgres environment variables
- Configure n8n

This hosting guide shows you how to self-host n8n on Azure. It uses n8n with Postgres as a database backend using Kubernetes to manage the necessary resources and reverse proxy.

You need [The Azure command line tool](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

Latest and Next versions

n8n releases a new minor version most weeks. The `latest` version is for production use. `next` is the most recent release. You should treat `next` as a beta: it may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12).

Current `latest`: 1.118.1\
Current `next`: 1.119.0

Azure offers several ways suitable for hosting n8n, including Azure Container Instances (optimized for running containers), Linux Virtual Machines, and Azure Kubernetes Service (containers running with Kubernetes).

This guide uses the Azure Kubernetes Service (AKS) as the hosting option. Using Kubernetes requires some additional complexity and configuration, but is the best method for scaling n8n as demand changes.

The steps in this guide use a mix of the Azure UI and command line tool, but you can use either to accomplish most tasks.

## Open the Azure Kubernetes Service

From [the Azure portal](https://portal.azure.com/) select **Kubernetes services**.

From the Kubernetes services page, select **Create** > **Create a Kubernetes cluster**.

You can select any of the configuration options that suit your needs, then select **Create** when done.

## Set Kubectl context

The remainder of the steps in this guide require you to set the Azure instance as the Kubectl context. You can find the connection details for a cluster instance by opening its details page and then the **Connect** button. The resulting code snippets shows the steps to paste and run into a terminal to change your local Kubernetes settings to use the new cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-hosting). The following steps tell you which file configures what and what you need to change.

Clone the repository with the following command:

And change directory:

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Configure volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. The default storage class is suitable for this purpose and is defined in the `postgres-claim0-persistentvolumeclaim.yaml` manifest.

Specialized storage classes

If you have specialised or higher requirements for storage classes, [read more on the options Azure offers in the documentation](https://learn.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes).

### Postgres environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with your own values. Postgres will use these details when creating the database..

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

### Create a volume for file storage

While not essential for running n8n, using persistent volumes is required for:

- Using nodes that interact with files, such as the binary data node.
- If you want to persist [manual n8n encryption keys](../../../configuration/environment-variables/deployment/) between restarts. This saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

[Kubernetes lets you](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) optionally specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` file:

This defines a minimum of 250mb per container, a maximum of 500mb, and lets Kubernetes handle CPU. You can change these values to match your own needs. As a guide, here are the resources values for the n8n cloud offerings:

- **Start**: 320mb RAM, 10 millicore CPU burstable
- **Pro (10k executions)**: 640mb RAM, 20 millicore CPU burstable
- **Pro (50k executions)**: 1280mb RAM, 80 millicore CPU burstable

### Optional: Environment variables

You can configure n8n settings and behaviors using environment variables.

Create an `n8n-secret.yaml` file. Refer to [Environment variables](../../../configuration/environment-variables/) for n8n environment variables details.

The two deployment manifests (`n8n-deployment.yaml` and `postgres-deployment.yaml`) define the n8n and Postgres applications to Kubernetes.

The manifests define the following:

- Send the environment variables defined to each application pod
- Define the container image to use
- Set resource consumption limits with the `resources` object
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define one instance of each pod. You should change this to meet your needs.

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively.

## Send to Kubernetes cluster

Send all the manifests to the cluster with the following command:

You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the n8n service. Find the IP address of the n8n service from the **Services & ingresses** menu item of the cluster you want to use under the **External IP** column. You need to add the n8n port, "5678" to the URL.

Static IP addresses with AKS

[Read this tutorial](https://learn.microsoft.com/en-us/azure/aks/static-ip) for more details on how to use a static IP address with AKS.

Remove the resources created by the manifests with the following command:

- Learn more about [configuring](../../../configuration/environment-variables/) and [scaling](../../../scaling/overview/) n8n.
- Or explore using n8n: try the [Quickstarts](../../../../try-it-out/).

**Examples:**

Example 1 (unknown):
```unknown
git clone https://github.com/n8n-io/n8n-hosting.git
```

Example 2 (unknown):
```unknown
cd n8n-hosting/kubernetes
```

Example 3 (unknown):
```unknown
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

Example 4 (unknown):
```unknown
…
resources:
  requests:
    memory: "250Mi"
  limits:
    memory: "500Mi"
…
```

---

## Navigate to the directory containing your docker compose file

**URL:** llms-txt#navigate-to-the-directory-containing-your-docker-compose-file

cd </path/to/your/compose/file/directory>

---

## Hosting n8n on Hetzner cloud

**URL:** llms-txt#hosting-n8n-on-hetzner-cloud

**Contents:**
- Create a server
- Log in to your server
- Install Docker Compose
- Clone configuration repository
- Default folders and files
  - Create Docker volume
- Set up DNS
- Open ports
- Configure n8n
- The Docker Compose file

This hosting guide shows you how to self-host n8n on a Hetzner cloud server. It uses:

- [Caddy](https://caddyserver.com) (a reverse proxy) to allow access to the Server from the internet.
- [Docker Compose](https://docs.docker.com/compose/) to create and define the application components and how they work together.

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

Latest and Next versions

n8n releases a new minor version most weeks. The `latest` version is for production use. `next` is the most recent release. You should treat `next` as a beta: it may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12).

Current `latest`: 1.118.1\
Current `next`: 1.119.0

1. [Log in](https://console.hetzner.cloud/) to the Hetzner Cloud Console.
1. Select the project to host the server, or create a new project by selecting **+ NEW PROJECT**.
1. Select **+ CREATE SERVER** on the project tile you want to add it to.

You can change most of the settings to suit your needs, but as this guide uses Docker to run the application, under the **Image** section, select "Docker CE" from the **APPS** tab.

When creating the server, Hetzner asks you to choose a plan. For most usage levels, the CPX11 type is enough.

Hetzner lets you choose between SSH and password-based authentication. SSH is more secure. The rest of this guide assumes you are using SSH.

## Log in to your server

The rest of this guide requires you to log in to the server using a terminal with SSH. Refer to [Access with SSH/rsync/BorgBackup](https://docs.hetzner.com/robot/storage-box/access/access-ssh-rsync-borg) for more information. You can find the public IP in the listing of the servers in your project.

## Install Docker Compose

The Hetzner Docker app image doesn't have Docker compose installed. Install it with the following commands:

## Clone configuration repository

Docker Compose, n8n, and Caddy require a series of folders and configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-docker-caddy) into the root user folder of the server. The following steps will tell you which file to change and what changes to make.

Clone the repository with the following command:

And change directory to the root of the repository you cloned:

## Default folders and files

The host operating system (the server) copies the two folders you created to Docker containers to make them available to Docker. The two folders are:

- `caddy_config`: Holds the Caddy configuration files.
- `local_files`: A folder for files you upload or add using n8n.

### Create Docker volume

To persist the Caddy cache between restarts and speed up start times, create [a Docker volume](https://docs.docker.com/storage/volumes/) that Docker reuses between restarts:

Create a Docker volume for the n8n data:

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the server. The exact steps for this depend on your DNS provider, but typically you need to create a new "A" record for the n8n subdomain. DigitalOcean provide [An Introduction to DNS Terminology, Components, and Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts).

n8n runs as a web application, so the server needs to allow incoming access to traffic on port 80 for non-secure traffic, and port 443 for secure traffic.

Open the following ports in the server's firewall by running the following two commands:

n8n needs some environment variables set to pass to the application running in the Docker container. The example `.env` file contains placeholders you need to replace with values of your own.

Open the file with the following command:

The file contains inline comments to help you know what to change.

Refer to [Environment variables](../../../configuration/environment-variables/) for n8n environment variables details.

## The Docker Compose file

The Docker Compose file (`docker-compose.yml`) defines the services the application needs, in this case Caddy and n8n.

- The Caddy service definition defines the ports it uses and the local volumes to copy to the containers.
- The n8n service definition defines the ports it uses, the environment variables n8n needs to run (some defined in the `.env` file), and the volumes it needs to copy to the containers.

The Docker Compose file uses the environment variables set in the `.env` file, so you shouldn't need to change it's content, but to take a look, run the following command:

Caddy needs to know which domains it should serve, and which port to expose to the outside world. Edit the `Caddyfile` file in the `caddy_config` folder.

Change the placeholder subdomain to yours. If you followed the steps to name the subdomain n8n, your full domain is similar to `n8n.example.com`. The `n8n` in the `reverse_proxy` setting tells Caddy to use the service definition defined in the `docker-compose.yml` file:

## Start Docker Compose

Start n8n and Caddy with the following command:

This may take a few minutes.

In your browser, open the URL formed of the subdomain and domain name defined earlier. Enter the user name and password defined earlier, and you should be able to access n8n.

## Stop n8n and Caddy

You can stop n8n and Caddy with the following command:

If you run n8n using a Docker Compose file, follow these steps to update n8n:

**Examples:**

Example 1 (unknown):
```unknown
apt update && apt -y upgrade
apt install docker-compose-plugin
```

Example 2 (unknown):
```unknown
git clone https://github.com/n8n-io/n8n-docker-caddy.git
```

Example 3 (unknown):
```unknown
cd n8n-docker-caddy
```

Example 4 (unknown):
```unknown
docker volume create caddy_data
```

---

## Self-hosted AI Starter Kit

**URL:** llms-txt#self-hosted-ai-starter-kit

**Contents:**
- What’s included
- What you can build
- Get the kit

The Self-hosted AI Starter Kit is an open, docker compose template that bootstraps a fully featured Local AI and Low Code development environment.

Curated by [n8n](https://github.com/n8n-io), it combines the self-hosted n8n platform with a list of compatible AI products and components to get you started building self-hosted AI workflows.

✅ [**Self-hosted n8n**](../../): Low-code platform with over 400 integrations and advanced AI components.

✅ [**Ollama**](https://ollama.com/): Cross-platform LLM platform to install and run the latest local LLMs.

✅ [**Qdrant**](https://qdrant.tech/): Open-source, high performance vector store with a comprehensive API.

✅ [**PostgreSQL**](https://www.postgresql.org/): The workhorse of the Data Engineering world, handles large amounts of data safely.

## What you can build

⭐️ [AI Agents](../../../glossary/#ai-agent) that can schedule appointments

⭐️ Summaries of company PDFs without leaking data

⭐️ Smarter Slackbots for company communications and IT-ops

⭐️ Private, low-cost analyses of financial documents

Head to [the GitHub repository](https://github.com/n8n-io/self-hosted-ai-starter-kit) to clone the repo and get started!

n8n designed this kit to help you get started with self-hosted AI workflows. While it’s not fully optimized for production environments, it combines robust components that work well together for proof-of-concept projects. Customize it to meet your needs. Secure and harden it before using in production.

---

## Self-hosted concurrency control

**URL:** llms-txt#self-hosted-concurrency-control

**Contents:**
- Comparison to queue mode

Only for self-hosted n8n

This document is for self-hosted concurrency control. Read [Cloud concurrency](../../../manage-cloud/concurrency/) to learn how concurrency works with n8n Cloud accounts.

In regular mode, n8n doesn't limit how many production executions may run at the same time. This can lead to a scenario where too many concurrent executions thrash the event loop, causing performance degradation and unresponsiveness.

To prevent this, you can set a concurrency limit for production executions in regular mode. Use this to control how many production executions run concurrently, and queue up any concurrent production executions over the limit. These executions remain in the queue until concurrency capacity frees up, and are then processed in FIFO order.

Concurrency control is disabled by default. To enable it:

- Concurrency control applies only to production executions: those started from a webhook or [trigger](../../../glossary/#trigger-node-n8n) node. It doesn't apply to any other kinds, such as manual executions, sub-workflow executions, error executions, or started from CLI.

- You can't retry queued executions. Cancelling or deleting a queued execution also removes it from the queue.

- On instance startup, n8n resumes queued executions up to the concurrency limit and re-enqueues the rest.

- To monitor concurrency control, watch logs for executions being added to the queue and released. In a future version, n8n will show concurrency control in the UI.

When you enable concurrency control, you can view the number of active executions and the configured limit at the top of a project's or workflow's executions tab.

## Comparison to queue mode

In queue mode, you can control how many jobs a worker may run concurrently using the [`--concurrency` flag](../queue-mode/#configure-worker-concurrency).

Concurrency control in queue mode is a separate mechanism from concurrency control in regular mode, but the environment variable `N8N_CONCURRENCY_PRODUCTION_LIMIT` controls both of them. In queue mode, n8n takes the limit from this variable if set to a value other than `-1`, falling back to the `--concurrency` flag or its default.

**Examples:**

Example 1 (unknown):
```unknown
export N8N_CONCURRENCY_PRODUCTION_LIMIT=20
```

---

## CLI commands for n8n

**URL:** llms-txt#cli-commands-for-n8n

**Contents:**
- Running CLI commands
- Start a workflow
- Change the active status of a workflow
- Export entities
- Export workflows and credentials
  - Workflows
  - Credentials
- Import entities
- Import workflows and credentials
  - Workflows

n8n includes a CLI (command line interface), allowing you to perform actions using the CLI rather than the n8n editor. These include starting workflows, and exporting and importing workflows and credentials.

## Running CLI commands

You can use CLI commands with self-hosted n8n. Depending on how you choose to install n8n, there are differences in how to run the commands:

- npm: the `n8n` command is directly available. The documentation uses this in the examples below.

- Docker: the `n8n` command is available within your Docker container:

You can start workflows directly using the CLI.

Execute a saved workflow by its ID:

## Change the active status of a workflow

You can change the active status of a workflow using the CLI.

These commands operate on your n8n database. If you execute them while n8n is running, the changes don't take effect until you restart n8n.

Set the active status of a workflow by its ID to false:

Set the active status of a workflow by its ID to true:

Set the active status to false for all the workflows:

Set the active status to true for all the workflows:

You can export your database entities from n8n using the CLI. This tooling allows you to export all entity types from one database type, such as SQLite, and import them into another database type, such as Postgres.

| Flag                                | Description                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| --help                              | Help prompt.                                                                                   |
| --outputDir                         | Output directory path                                                                          |
| --includeExecutionHistoryDataTables | Include execution history data tables, these are excluded by default as they can be very large |

## Export workflows and credentials

You can export your workflows and credentials from n8n using the CLI.

| Flag        | Description                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| --help      | Help prompt.                                                                                |
| --all       | Exports all workflows/credentials.                                                          |
| --backup    | Sets --all --pretty --separate for backups. You can optionally set --output.                |
| --id        | The ID of the workflow to export.                                                           |
| --output    | Outputs file name or directory if using separate files.                                     |
| --pretty    | Formats the output in an easier to read fashion.                                            |
| --separate  | Exports one file per workflow (useful for versioning). Must set a directory using --output. |
| --decrypted | Exports the credentials in a plain text format.                                             |

Export all your workflows to the standard output (terminal):

Export a workflow by its ID and specify the output file name:

Export all workflows to a specific directory in a single file:

Export all the workflows to a specific directory using the `--backup` flag (details above):

Export all your credentials to the standard output (terminal):

Export credentials by their ID and specify the output file name:

Export all credentials to a specific directory in a single file:

Export all the credentials to a specific directory using the `--backup` flag (details above):

Export all the credentials in plain text format. You can use this to migrate from one installation to another that has a different secret key in the configuration file.

Sensitive information

All sensitive information is visible in the files.

You can import entities from a previous `export:entities` command using this command, it allows importing of entities into a database type that differs from the exported database type. Current supported database types include: SQLite, Postgres.

The database is expected to be empty prior to import, this can be forced with the `--truncateTables` parameter.

| Flag             | Description                                        |
| ---------------- | -------------------------------------------------- |
| --help           | Help prompt.                                       |
| --inputDir       | Input directory that holds output files for import |
| --truncateTables | Truncate tables before import                      |

## Import workflows and credentials

You can import your workflows and credentials from n8n using the CLI.

When exporting workflows and credentials, n8n also exports their IDs. If you have workflows and credentials with the same IDs in your existing database, they will be overwritten. To avoid this, delete or change the IDs before importing.

| Flag        | Description                                                                                |
| ----------- | ------------------------------------------------------------------------------------------ |
| --help      | Help prompt.                                                                               |
| --input     | Input file name or directory if you use --separate.                                        |
| --projectId | Import the workflow or credential to the specified project. Can't be used with `--userId`. |
| --separate  | Imports `*.json` files from directory provided by --input.                                 |
| --userId    | Import the workflow or credential to the specified user. Can't be used with `--projectId`. |

n8n limits workflow and credential names to 128 characters, but SQLite doesn't enforce size limits.

This might result in errors like **Data too long for column name** during the import process.

In this case, you can edit the names from the n8n interface and export again, or edit the JSON file directly before importing.

Import workflows from a specific file:

Import all the workflow files as JSON from the specified directory:

Import credentials from a specific file:

Import all the credentials files as JSON from the specified directory:

Clear your existing license from n8n's database and reset n8n to default features:

If your license includes [floating entitlements](../../glossary/#entitlement-n8n), running this command will also attempt to release them back to the pool, making them available for other instances.

Display information about the existing license:

You can reset user management using the n8n CLI. This returns user management to its pre-setup state. It removes all user accounts.

Use this if you forget your password, and don't have SMTP set up to do password resets by email.

### Disable MFA for a user

If a user loses their recovery codes you can disable MFA for a user with this command. The user will then be able to log back in to set up MFA again.

You can reset the LDAP settings using the command below.

## Uninstall community nodes and credentials

You can manage [community nodes](../../integrations/community-nodes/installation/) using the n8n CLI. For now, you can only uninstall community nodes and credentials, which is useful if a community node causes instability.

| Flag         | Description                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| --help       | Show CLI help.                                                                                                             |
| --credential | The credential type. Get this value by visiting the node's `<NODE>.credential.ts` file and getting the value of `name`.    |
| --package    | Package name of the community node.                                                                                        |
| --uninstall  | Uninstalls the node.                                                                                                       |
| --userId     | The ID of the user who owns the credential. On self-hosted, query the database. On cloud, query the API with your API key. |

Uninstall a community node by package name:

For example, to uninstall the [Evolution API community node](https://www.npmjs.com/package/n8n-nodes-evolution-api), type:

Uninstall a community node credential:

For example, to uninstall the [Evolution API community node credential](https://www.npmjs.com/package/n8n-nodes-evolution-api), visit the [repository](https://github.com/oriondesign2015/n8n-nodes-evolution-api) and navigate to the [`credentials.ts` file](https://github.com/oriondesign2015/n8n-nodes-evolution-api/blob/main/credentials/EvolutionApi.credentials.ts) to find the `name`:

You can run a [security audit](../securing/security-audit/) on your n8n instance, to detect common security issues.

**Examples:**

Example 1 (unknown):
```unknown
docker exec -u node -it <n8n-container-name> <n8n-cli-command>
```

Example 2 (unknown):
```unknown
n8n execute --id <ID>
```

Example 3 (unknown):
```unknown
n8n update:workflow --id=<ID> --active=false
```

Example 4 (unknown):
```unknown
n8n update:workflow --id=<ID> --active=true
```

---

## Environment variables overview

**URL:** llms-txt#environment-variables-overview

This section lists the environment variables that you can use to change n8n's configuration settings when self-hosting n8n.

File-based configuration

You can provide a [configuration file](../configuration-methods/) for n8n. You can also append `_FILE` to certain variables to provide their configuration in a separate file.

- [Binary data](/hosting/configuration/environment-variables/binary-data/)
- [Credentials](/hosting/configuration/environment-variables/credentials/)
- [Database](/hosting/configuration/environment-variables/database/)
- [Deployment](/hosting/configuration/environment-variables/deployment/)
- [Endpoints](/hosting/configuration/environment-variables/endpoints/)
- [Executions](/hosting/configuration/environment-variables/executions/)
- [External data storage](/hosting/configuration/environment-variables/external-data-storage/)
- [External hooks](/hosting/configuration/environment-variables/external-hooks/)
- [External secrets](/hosting/configuration/environment-variables/external-secrets/)
- [Insights](/hosting/configuration/environment-variables/insights/)
- [Logs](/hosting/configuration/environment-variables/logs/)
- [License](/hosting/configuration/environment-variables/licenses/)
- [Nodes](/hosting/configuration/environment-variables/nodes/)
- [Queue mode](/hosting/configuration/environment-variables/queue-mode/)
- [Security](/hosting/configuration/environment-variables/security/)
- [Source control](/hosting/configuration/environment-variables/source-control/)
- [Task runners](/hosting/configuration/environment-variables/task-runners/)
- [Timezone and localization](/hosting/configuration/environment-variables/timezone-localization/)
- [User management and 2FA](/hosting/configuration/environment-variables/user-management-smtp-2fa/)
- [Workflows](/hosting/configuration/environment-variables/workflows/)

---

## Hosting n8n on Google Kubernetes Engine

**URL:** llms-txt#hosting-n8n-on-google-kubernetes-engine

**Contents:**
- Prerequisites
- Create project
- Enable the Kubernetes Engine API
- Create a cluster
- Set Kubectl context
- Clone configuration repository
- Configure Postgres
  - Create a volume for persistent storage
  - Postgres environment variables
- Configure n8n

Google Cloud offers several options suitable for hosting n8n, including Cloud Run (optimized for running containers), Compute Engine (VMs), and Kubernetes Engine (containers running with Kubernetes).

This guide uses the Google Kubernetes Engine (GKE) as the hosting option. If you want to use Cloud Run, refer to [these instructions](../google-cloud-run/).

Most of the steps in this guide use the Google Cloud UI, but you can also use the [gcloud command line tool](https://cloud.google.com/sdk/gcloud/) instead to undertake all the steps.

- The [gcloud command line tool](https://cloud.google.com/sdk/gcloud/)
- The [gke-gcloud-auth-plugin](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke) (install the gcloud CLI first)

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

Latest and Next versions

n8n releases a new minor version most weeks. The `latest` version is for production use. `next` is the most recent release. You should treat `next` as a beta: it may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12).

Current `latest`: 1.118.1\
Current `next`: 1.119.0

GCP encourages you to create projects to logically organize resources and configuration. Create a new project for your n8n deployment from your Google Cloud Console: select the project dropdown menu and then the **NEW PROJECT** button. Then select the newly created project. As you follow the other steps in this guide, make sure you have the correct project selected.

## Enable the Kubernetes Engine API

GKE isn't enabled by default. Search for "Kubernetes" in the top search bar and select "Kubernetes Engine" from the results.

Select **ENABLE** to enable the Kubernetes Engine API for this project.

From the [GKE service page](https://console.cloud.google.com/kubernetes/list/overview), select **Clusters** > **CREATE**. Make sure you select the "Standard" cluster option, n8n doesn't work with an "Autopilot" cluster. You can leave the cluster configuration on defaults unless there's anything specifically you need to change, such as location.

## Set Kubectl context

The rest of the steps in this guide require you to set the GCP instance as the Kubectl context. You can find the connection details for a cluster instance by opening its details page and selecting **CONNECT**. The displayed code snippet shows a connection string for the gcloud CLI tool. Paste and run the code snippet in the gcloud CLI to change your local Kubernetes settings to use the new gcloud cluster.

## Clone configuration repository

Kubernetes and n8n require a series of configuration files. You can clone these from [this repository](https://github.com/n8n-io/n8n-hosting) locally. The following steps explain the file configuration and how to add your information.

Clone the repository with the following command:

And change directory:

## Configure Postgres

For larger scale n8n deployments, Postgres provides a more robust database backend than SQLite.

### Create a volume for persistent storage

To maintain data between pod restarts, the Postgres deployment needs a persistent volume. Running Postgres on GCP requires a specific Kubernetes Storage Class. You can read [this guide](https://cloud.google.com/architecture/deploying-highly-available-postgresql-with-gke) for specifics, but the `storage.yaml` manifest creates it for you. You may want to change the regions to create the storage in under the `allowedTopologies` > `matchedLabelExpressions` > `values` key. By default, they're set to `us-central`.

### Postgres environment variables

Postgres needs some environment variables set to pass to the application running in the containers.

The example `postgres-secret.yaml` file contains placeholders you need to replace with your own values. Postgres will use these details when creating the database..

The `postgres-deployment.yaml` manifest then uses the values from this manifest file to send to the application pods.

### Create a volume for file storage

While not essential for running n8n, using persistent volumes is required for:

- Using nodes that interact with files, such as the binary data node.
- If you want to persist [manual n8n encryption keys](../../../configuration/environment-variables/deployment/) between restarts. This saves a file containing the key into file storage during startup.

The `n8n-claim0-persistentvolumeclaim.yaml` manifest creates this, and the n8n Deployment mounts that claim in the `volumes` section of the `n8n-deployment.yaml` manifest.

[Kubernetes lets you](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) optionally specify the minimum resources application containers need and the limits they can run to. The example YAML files cloned above contain the following in the `resources` section of the `n8n-deployment.yaml` and `postgres-deployment.yaml` files:

This defines a minimum of 250mb per container, a maximum of 500mb, and lets Kubernetes handle CPU. You can change these values to match your own needs. As a guide, here are the resources values for the n8n cloud offerings:

- **Start**: 320mb RAM, 10 millicore CPU burstable
- **Pro (10k executions)**: 640mb RAM, 20 millicore CPU burstable
- **Pro (50k executions)**: 1280mb RAM, 80 millicore CPU burstable

### Optional: Environment variables

You can configure n8n settings and behaviors using environment variables.

Create an `n8n-secret.yaml` file. Refer to [Environment variables](../../../configuration/environment-variables/) for n8n environment variables details.

The two deployment manifests (`n8n-deployment.yaml` and `postgres-deployment.yaml`) define the n8n and Postgres applications to Kubernetes.

The manifests define the following:

- Send the environment variables defined to each application pod
- Define the container image to use
- Set resource consumption limits with the `resources` object
- The `volumes` defined earlier and `volumeMounts` to define the path in the container to mount volumes.
- Scaling and restart policies. The example manifests define one instance of each pod. You should change this to meet your needs.

The two service manifests (`postgres-service.yaml` and `n8n-service.yaml`) expose the services to the outside world using the Kubernetes load balancer using ports 5432 and 5678 respectively.

## Send to Kubernetes cluster

Send all the manifests to the cluster with the following command:

You may see an error message about not finding an "n8n" namespace as that resources isn't ready yet. You can run the same command again, or apply the namespace manifest first with the following command:

n8n typically operates on a subdomain. Create a DNS record with your provider for the subdomain and point it to the IP address of the n8n service. Find the IP address of the n8n service from the **Services & Ingress** menu item of the cluster you want to use under the **Endpoints** column.

[Read this GKE tutorial](https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip#configuring_your_domain_name_records) for more details on how reserved IP addresses work with GKE and Kubernetes resources.

Remove the resources created by the manifests with the following command:

- Learn more about [configuring](../../../configuration/environment-variables/) and [scaling](../../../scaling/overview/) n8n.
- Or explore using n8n: try the [Quickstarts](../../../../try-it-out/).

**Examples:**

Example 1 (unknown):
```unknown
git clone https://github.com/n8n-io/n8n-hosting.git
```

Example 2 (unknown):
```unknown
cd n8n-hosting/kubernetes
```

Example 3 (unknown):
```unknown
…
allowedTopologies:
  - matchLabelExpressions:
      - key: failure-domain.beta.kubernetes.io/zone
        values:
          - us-central1-b
          - us-central1-c
```

Example 4 (unknown):
```unknown
…
volumes:
  - name: n8n-claim0
    persistentVolumeClaim:
      claimName: n8n-claim0
…
```

---

## Hosting n8n on Heroku

**URL:** llms-txt#hosting-n8n-on-heroku

**Contents:**
- Use the deployment template to create a Heroku project
  - Configure environment variables
  - Deploy n8n
- Changing the deployment template
  - The Dockerfile
  - Heroku and exposing ports
  - Configuring Heroku
- Next steps

This hosting guide shows you how to self-host n8n on Heroku. It uses:

- [Docker Compose](https://docs.docker.com/compose/) to create and define the application components and how they work together.
- [Heroku's PostgreSQL service](https://devcenter.heroku.com/categories/heroku-postgres) to host n8n's data storage.
- A **Deploy to Heroku** button offering a one click, with minor configuration, deployment.

Self-hosting knowledge prerequisites

Self-hosting n8n requires technical knowledge, including:

- Setting up and configuring servers and containers
- Managing application resources and scaling
- Securing servers and applications
- Configuring n8n

n8n recommends self-hosting for expert users. Mistakes can lead to data loss, security issues, and downtime. If you aren't experienced at managing servers, n8n recommends [n8n Cloud](https://n8n.io/cloud/).

Latest and Next versions

n8n releases a new minor version most weeks. The `latest` version is for production use. `next` is the most recent release. You should treat `next` as a beta: it may be unstable. To report issues, use the [forum](https://community.n8n.io/c/questions/12).

Current `latest`: 1.118.1\
Current `next`: 1.119.0

## Use the deployment template to create a Heroku project

The quickest way to get started with deploying n8n to Heroku is using the **Deploy to Heroku** button:

This opens the **Create New App** page on Heroku. Set a name for the project, and choose the region to deploy the project to.

### Configure environment variables

Heroku pre-fills the configuration options defined in the `env` section of the `app.json` file, which also sets default values for the environment variables n8n uses.

You can change any of these values to suit your needs. You must change the following values:

- **N8N_ENCRYPTION_KEY**, which n8n uses to [encrypt user account details](../../../configuration/environment-variables/deployment/) before saving to the database.
- **WEBHOOK_URL** should match the application name you create to ensure that webhooks have the correct URL.

Select **Deploy app**.

After Heroku builds and deploys the app it provides links to **Manage App** or **View** the application.

Refer to the [Heroku documentation](https://devcenter.heroku.com/categories/networking-dns) to find out how to connect your domain to a Heroku application.

## Changing the deployment template

You can make changes to the deployment template by forking the [repository](https://github.com/n8n-io/n8n-heroku) and deploying from you fork.

By default the Dockerfile pulls the latest n8n image, if you want to use a different or fixed version, then update the image tag on the top line of the `Dockerfile`.

### Heroku and exposing ports

Heroku doesn't allow Docker-based applications to define an exposed port with the `EXPOSE` command. Instead, Heroku provides a `PORT` environment variable that it dynamically populates at application runtime. The `entrypoint.sh` file overrides the default Docker image command to instead set the port variable that Heroku provides. You can then access n8n on port 80 in a web browser.

Docker limitations with Heroku

[Read this guide](https://devcenter.heroku.com/articles/container-registry-and-runtime#unsupported-dockerfile-commands) for more details on the limitations of using Docker with Heroku.

### Configuring Heroku

The `heroku.yml` file defines the application you want to create on Heroku. It consists of two sections:

- `setup` > `addons` defines the Heroku addons to use. In this case, the PostgreSQL database addon.
- The `build` section defines how Heroku builds the application. In this case it uses the Docker buildpack to build a `web` service based on the supplied `Dockerfile`.

- Learn more about [configuring](../../../configuration/environment-variables/) and [scaling](../../../scaling/overview/) n8n.
- Or explore using n8n: try the [Quickstarts](../../../../try-it-out/).

---

## Deployment environment variables

**URL:** llms-txt#deployment-environment-variables

File-based configuration

You can add `_FILE` to individual variables to provide their configuration in a separate file. Refer to [Keeping sensitive data in separate files](../../configuration-methods/#keeping-sensitive-data-in-separate-files) for more details.

This page lists the deployment configuration options for your self-hosted n8n instance, including setting up access URLs, enabling templates, customizing encryption, and configuring server details.

Proxy variable priorities

The [`proxy-from-env`](https://www.npmjs.com/package/proxy-from-env) package that n8n uses to handle proxy environment variables (those ending with `_PROXY`) imposes a certain variable precedence. Notably, for proxy variables, lowercase versions (like `http_proxy`) have precedence over uppercase variants (for example `HTTP_PROXY`) when both are present.

To learn more about proxy environment variables, check the [environment variables section of the package details](https://www.npmjs.com/package/proxy-from-env#environment-variables).

| Variable                             | Type                         | Default                                                          | Description                                                                                                                                                                                                                                                                       |
| ------------------------------------ | ---------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HTTP_PROXY`                         | String                       | -                                                                | A URL to proxy unencrypted HTTP requests through. When set, n8n proxies all unencrypted HTTP traffic from nodes through the proxy URL.                                                                                                                                            |
| `HTTPS_PROXY`                        | String                       | -                                                                | A URL to proxy TLS/SSL encrypted HTTP requests through. When set, n8n proxies all TLS/SSL encrypted HTTP traffic from nodes through the proxy URL.                                                                                                                                |
| `ALL_PROXY`                          | String                       | -                                                                | A URL to proxy both unencrypted and encrypted HTTP requests through. When set, n8n uses this value when more specific variables (`HTTP_PROXY` or `HTTPS_PROXY`) aren't present.                                                                                                   |
| `NO_PROXY`                           | String                       | -                                                                | A comma-separated list of hostnames or URLs that should bypass the proxy. When using `HTTP_PROXY`, `HTTPS_PROXY`, or `ALL_PROXY`, n8n will connect directly to the URLs or hostnames defined here instead of using the proxy.                                                     |
| `N8N_EDITOR_BASE_URL`                | String                       | -                                                                | Public URL where users can access the editor. Also used for emails sent from n8n and the redirect URL for SAML based authentication.                                                                                                                                              |
| `N8N_CONFIG_FILES` (deprecated)      | String                       | -                                                                | Use to provide the path to a JSON configuration file. This option is deprecated and will be removed in a future version. Use `.env` files or `*_FILE` environment variables instead.                                                                                              |
| `N8N_DISABLE_UI`                     | Boolean                      | `false`                                                          | Set to `true` to disable the UI.                                                                                                                                                                                                                                                  |
| `N8N_PREVIEW_MODE`                   | Boolean                      | `false`                                                          | Set to `true` to run in preview mode.                                                                                                                                                                                                                                             |
| `N8N_TEMPLATES_ENABLED`              | Boolean                      | `false`                                                          | Enables [workflow templates](../../../../glossary/#template-n8n) (true) or disable (false).                                                                                                                                                                                       |
| `N8N_TEMPLATES_HOST`                 | String                       | `https://api.n8n.io`                                             | Change this if creating your own workflow template library. Note that to use your own workflow templates library, your API must provide the same endpoints and response structure as n8n's. Refer to [Workflow templates](../../../../workflows/templates/) for more information. |
| `N8N_ENCRYPTION_KEY`                 | String                       | Random key generated by n8n                                      | Provide a custom key used to encrypt credentials in the n8n database. By default n8n generates a random key on first launch.                                                                                                                                                      |
| `N8N_USER_FOLDER`                    | String                       | `user-folder`                                                    | Provide the path where n8n will create the `.n8n` folder. This directory stores user-specific data, such as database file and encryption key.                                                                                                                                     |
| `N8N_PATH`                           | String                       | `/`                                                              | The path n8n deploys to.                                                                                                                                                                                                                                                          |
| `N8N_HOST`                           | String                       | `localhost`                                                      | Host name n8n runs on.                                                                                                                                                                                                                                                            |
| `N8N_PORT`                           | Number                       | `5678`                                                           | The HTTP port n8n runs on.                                                                                                                                                                                                                                                        |
| `N8N_LISTEN_ADDRESS`                 | String                       | `::`                                                             | The IP address n8n should listen on.                                                                                                                                                                                                                                              |
| `N8N_PROTOCOL`                       | Enum string: `http`, `https` | `http`                                                           | The protocol used to reach n8n.                                                                                                                                                                                                                                                   |
| `N8N_SSL_KEY`                        | String                       | -                                                                | The SSL key for HTTPS protocol.                                                                                                                                                                                                                                                   |
| `N8N_SSL_CERT`                       | String                       | -                                                                | The SSL certificate for HTTPS protocol.                                                                                                                                                                                                                                           |
| `N8N_PERSONALIZATION_ENABLED`        | Boolean                      | `true`                                                           | Whether to ask users personalisation questions and then customise n8n accordingly.                                                                                                                                                                                                |
| `N8N_VERSION_NOTIFICATIONS_ENABLED`  | Boolean                      | `true`                                                           | When enabled, n8n sends notifications of new versions and security updates.                                                                                                                                                                                                       |
| `N8N_VERSION_NOTIFICATIONS_ENDPOINT` | String                       | `https://api.n8n.io/versions/`                                   | The endpoint to retrieve where version information.                                                                                                                                                                                                                               |
| `N8N_VERSION_NOTIFICATIONS_INFO_URL` | String                       | `https://docs.n8n.io/getting-started/installation/updating.html` | The URL displayed in the New Versions panel for more information.                                                                                                                                                                                                                 |
| `N8N_DIAGNOSTICS_ENABLED`            | Boolean                      | `true`                                                           | Whether to share selected, anonymous [telemetry](../../../../privacy-security/privacy/) with n8n. Note that if you set this to `false`, you can't enable Ask AI in the Code node.                                                                                                 |
| `N8N_DIAGNOSTICS_CONFIG_FRONTEND`    | String                       | `1zPn9bgWPzlQc0p8Gj1uiK6DOTn;https://telemetry.n8n.io`           | Telemetry configuration for the frontend.                                                                                                                                                                                                                                         |
| `N8N_DIAGNOSTICS_CONFIG_BACKEND`     | String                       | `1zPn7YoGC3ZXE9zLeTKLuQCB4F6;https://telemetry.n8n.io/v1/batch`  | Telemetry configuration for the backend.                                                                                                                                                                                                                                          |
| `N8N_PUSH_BACKEND`                   | String                       | `websocket`                                                      | Choose whether the n8n backend uses server-sent events (`sse`) or WebSockets (`websocket`) to send changes to the UI.                                                                                                                                                             |
| `VUE_APP_URL_BASE_API`               | String                       | `http://localhost:5678/`                                         | Used when building the `n8n-editor-ui` package manually to set how the frontend can reach the backend API. Refer to [Configure the Base URL](../../configuration-examples/base-url/).                                                                                             |
| `N8N_HIRING_BANNER_ENABLED`          | Boolean                      | `true`                                                           | Whether to show the n8n hiring banner in the console (true) or not (false).                                                                                                                                                                                                       |
| `N8N_PUBLIC_API_SWAGGERUI_DISABLED`  | Boolean                      | `false`                                                          | Whether the Swagger UI (API playground) is disabled (true) or not (false).                                                                                                                                                                                                        |
| `N8N_PUBLIC_API_DISABLED`            | Boolean                      | `false`                                                          | Whether to disable the public API (true) or not (false).                                                                                                                                                                                                                          |
| `N8N_PUBLIC_API_ENDPOINT`            | String                       | `api`                                                            | Path for the public API endpoints.                                                                                                                                                                                                                                                |
| `N8N_GRACEFUL_SHUTDOWN_TIMEOUT`      | Number                       | `30`                                                             | How long should the n8n process wait (in seconds) for components to shut down before exiting the process.                                                                                                                                                                         |
| `N8N_DEV_RELOAD`                     | Boolean                      | `false`                                                          | When working on the n8n source code, set this to `true` to automatically reload or restart the application when changes occur in the source code files.                                                                                                                           |
| `N8N_REINSTALL_MISSING_PACKAGES`     | Boolean                      | `false`                                                          | If set to `true`, n8n will automatically attempt to reinstall any missing packages.                                                                                                                                                                                               |
| `N8N_TUNNEL_SUBDOMAIN`               | String                       | -                                                                | Specifies the subdomain for the n8n tunnel. If not set, n8n generates a random subdomain.                                                                                                                                                                                         |
| `N8N_PROXY_HOPS`                     | Number                       | 0                                                                | Number of reverse-proxies n8n is running behind.                                                                                                                                                                                                                                  |

---

## Advanced AI

**URL:** llms-txt#advanced-ai

**Contents:**
- Related resources
  - Node types
  - Workflow templates
  - Chat trigger
  - Chatbot widget

Build AI functionality using n8n: from creating your own chat bot, to using AI to process documents and data from other sources.

This feature is available on Cloud and self-hosted n8n, in version 1.19.4 and above.

Work through the short tutorial to learn the basics of building AI workflows in n8n.

[Tutorial](intro-tutorial/)

- **Use a Starter Kit**

Try n8n's Self-hosted AI Starter Kit to quickly start building AI workflows.

[Self-hosted AI Starter Kit](../hosting/starter-kits/ai-starter-kit/)

- **Explore examples and concepts**

Browse examples and workflow templates to help you build. Includes explanations of important AI concepts.

[Examples](examples/introduction/)

- **How n8n uses LangChain**

Learn more about how n8n builds on LangChain.

[LangChain in n8n](langchain/overview/)

- **Browse AI templates**

Explore a wide range of AI workflow templates on the n8n website.

[AI workflows on n8n.io](https://n8n.io/workflows/?categories=25)

Related documentation and tools.

This feature uses [Cluster nodes](../integrations/builtin/cluster-nodes/): groups of [root](../integrations/builtin/cluster-nodes/root-nodes/) and [sub](../integrations/builtin/cluster-nodes/sub-nodes/) nodes that work together.

[Cluster nodes](../glossary/#cluster-node-n8n) are node groups that work together to provide functionality in an n8n workflow. Instead of using a single node, you use a [root node](../glossary/#root-node-n8n) and one or more [sub-nodes](../glossary/#sub-node-n8n) that extend the functionality of the node.

### Workflow templates

You can browse [workflow templates](../glossary/#template-n8n) in-app or on the n8n website [Workflows](https://n8n.io/workflows/?categories=25,26) page.

Refer to [Templates](../workflows/templates/) for information on accessing templates in-app.

Use the [n8n Chat Trigger](../integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/) to trigger a workflow based on chat interactions.

n8n provides a chatbot widget that you can use as a frontend for AI-powered chat workflows. Refer to the [@n8n/chat npm page](https://www.npmjs.com/package/@n8n/chat) for usage information.

---

## Update self-hosted n8n

**URL:** llms-txt#update-self-hosted-n8n

It's important to keep your n8n version up to date. This ensures you get the latest features and fixes.

Some tips when updating:

- Update frequently: this avoids having to jump multiple versions at once, reducing the risk of a disruptive update. Try to update at least once a month.
- Check the [Release notes](../../../release-notes/) for breaking changes.
- Use [Environments](../../../source-control-environments/) to create a test version of your instance. Test the update there first.

For instructions on how to update, refer to the documentation for your installation method:

- [Installed with npm](../npm/#updating)
- [Installed with Docker](../docker/#updating)

---
