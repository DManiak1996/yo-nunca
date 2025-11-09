# Ollama - Getting Started

**Pages:** 3

---

## Quickstart

**URL:** llms-txt#quickstart

**Contents:**
- Run a model

Source: https://docs.ollama.com/quickstart

This quickstart will walk your through running your first model with Ollama. To get started, download Ollama on macOS, Windows or Linux.

<a href="https://ollama.com/download" target="_blank" className="inline-block px-6 py-2 bg-black rounded-full dark:bg-neutral-700 text-white font-normal border-none">
  Download Ollama
</a>

<Tabs>
  <Tab title="CLI">
    Open a terminal and run the command:

Lastly, chat with the model:

<Tab title="Python">
    Start by downloading a model:

Then install Ollama's Python library:

Lastly, chat with the model:

<Tab title="JavaScript">
    Start by downloading a model:

Then install the Ollama JavaScript library:

Lastly, chat with the model:

See a full list of available models [here](https://ollama.com/models).

**Examples:**

Example 1 (unknown):
```unknown
ollama run gemma3
```

Example 2 (unknown):
```unknown
ollama pull gemma3
```

Example 3 (unknown):
```unknown
</Tab>

  <Tab title="Python">
    Start by downloading a model:
```

Example 4 (unknown):
```unknown
Then install Ollama's Python library:
```

---

## Goose

**URL:** llms-txt#goose

**Contents:**
- Goose Desktop
  - Usage with Ollama
  - Connecting to ollama.com
- Goose CLI
  - Usage with Ollama
  - Connecting to ollama.com

Source: https://docs.ollama.com/integrations/goose

Install [Goose](https://block.github.io/goose/docs/getting-started/installation/) Desktop.

### Usage with Ollama

1. In Goose, open **Settings** → **Configure Provider**.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-settings.png?fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=ba9aaea6b535f03456dbafb0ba48018b" alt="Goose settings Panel" width="75%" data-og-width="1300" data-og-height="732" data-path="images/goose-settings.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-settings.png?w=280&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=63e0cc6d307d8a6c1b7ba8bb7b1b2532 280w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-settings.png?w=560&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=bf90aaf22a8f6307d99597964433603c 560w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-settings.png?w=840&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=4fd50ee906a26ecde5f49575bcad1700 840w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-settings.png?w=1100&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=01abb63a474ea8a2e47fe1b4ee7bd752 1100w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-settings.png?w=1650&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=7188a96a903d03fe68004faeb743156c 1650w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-settings.png?w=2500&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=92e96516a86f243a182939145d5536eb 2500w" />
</div>

2. Find **Ollama**, click **Configure**
3. Confirm **API Host** is `http://localhost:11434` and click Submit

### Connecting to ollama.com

1. Create an [API key](https://ollama.com/settings/keys) on ollama.com and save it in your `.env`
2. In Goose, set **API Host** to `https://ollama.com`

Install [Goose](https://block.github.io/goose/docs/getting-started/installation/) CLI

### Usage with Ollama

1. Run `goose configure`
2. Select **Configure Providers** and select **Ollama**

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-cli.png?fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=3f34e0d16cbdf89858115b8c64d6dc08" alt="Goose CLI" width="50%" data-og-width="650" data-og-height="546" data-path="images/goose-cli.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-cli.png?w=280&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=d869883c3d68749aa534907cab2fcd5a 280w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-cli.png?w=560&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=b6e2eb41567eb401582c42b2289e2a98 560w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-cli.png?w=840&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=35c249c4cf90b3697d44e756d728d47c 840w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-cli.png?w=1100&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=957ef7e49a7b852a8995a4a7a04aea2d 1100w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-cli.png?w=1650&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=ebfa2bca9b17e3183d79c9534b24f3bf 1650w, https://mintcdn.com/ollama-9269c548/Qrfd4TFdx51mx0J_/images/goose-cli.png?w=2500&fit=max&auto=format&n=Qrfd4TFdx51mx0J_&q=85&s=b6ce0d3e1b9d07f3e28935767b0cf5e1 2500w" />
</div>

3. Enter model name (e.g `qwen3`)

### Connecting to ollama.com

1. Create an [API key](https://ollama.com/settings/keys) on ollama.com and save it in your `.env`
2. Run `goose configure`
3. Select **Configure Providers** and select **Ollama**
4. Update **OLLAMA\_HOST** to `https://ollama.com`

---

## Introduction

**URL:** llms-txt#introduction

**Contents:**
- Get started
- Base URL
- Example request
- Libraries
- Versioning

Source: https://docs.ollama.com/api/index

Ollama's API allows you to run and interact with models programatically.

If you're just getting started, follow the [quickstart](/quickstart) documentation to get up and running with Ollama's API.

After installation, Ollama's API is served by default at:

For running cloud models on **ollama.com**, the same API is available with the following base URL:

Once Ollama is running, its API is automatically available and can be accessed via `curl`:

Ollama has official libraries for Python and JavaScript:

* [Python](https://github.com/ollama/ollama-python)
* [JavaScript](https://github.com/ollama/ollama-js)

Several community-maintained libraries are available for Ollama. For a full list, see the [Ollama GitHub repository](https://github.com/ollama/ollama?tab=readme-ov-file#libraries-1).

Ollama's API isn't strictly versioned, but the API is expected to be stable and backwards compatible. Deprecations are rare and will be announced in the [release notes](https://github.com/ollama/ollama/releases).

**Examples:**

Example 1 (unknown):
```unknown
http://localhost:11434/api
```

Example 2 (unknown):
```unknown
https://ollama.com/api
```

---
