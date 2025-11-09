# Ollama - Customization

**Pages:** 1

---

## FROM llama3.2:latest

**URL:** llms-txt#from-llama3.2:latest

**Contents:**
- Instructions
  - FROM (Required)
  - PARAMETER
  - TEMPLATE
  - SYSTEM
  - ADAPTER
  - LICENSE
  - MESSAGE
- Notes

FROM /Users/pdevine/.ollama/models/blobs/sha256-00e1317cbf74d901080d7100f57580ba8dd8de57203072dc6f668324ba545f29
TEMPLATE """{{ if .System }}<|start_header_id|>system<|end_header_id|>

{{ .System }}<|eot_id|>{{ end }}{{ if .Prompt }}<|start_header_id|>user<|end_header_id|>

{{ .Prompt }}<|eot_id|>{{ end }}<|start_header_id|>assistant<|end_header_id|>

{{ .Response }}<|eot_id|>"""
PARAMETER stop "<|start_header_id|>"
PARAMETER stop "<|end_header_id|>"
PARAMETER stop "<|eot_id|>"
PARAMETER stop "<|reserved_special_token"

FROM <model name>:<tag>

FROM <model directory>

FROM ./ollama-model.gguf

PARAMETER <parameter> <parametervalue>

TEMPLATE """{{ if .System }}<|im_start|>system
{{ .System }}<|im_end|>
{{ end }}{{ if .Prompt }}<|im_start|>user
{{ .Prompt }}<|im_end|>
{{ end }}<|im_start|>assistant
"""

SYSTEM """<system message>"""

ADAPTER <path to safetensor adapter>

ADAPTER ./ollama-lora.gguf

LICENSE """
<license text>
"""

MESSAGE <role> <message>

MESSAGE user Is Toronto in Canada?
MESSAGE assistant yes
MESSAGE user Is Sacramento in Canada?
MESSAGE assistant no
MESSAGE user Is Ontario in Canada?
MESSAGE assistant yes
```

* the **`Modelfile` is not case sensitive**. In the examples, uppercase instructions are used to make it easier to distinguish it from arguments.
* Instructions can be in any order. In the examples, the `FROM` instruction is first to keep it easily readable.

[1]: https://ollama.com/library

**Examples:**

Example 1 (unknown):
```unknown
## Instructions

### FROM (Required)

The `FROM` instruction defines the base model to use when creating a model.
```

Example 2 (unknown):
```unknown
#### Build from existing model
```

Example 3 (unknown):
```unknown
<Card title="Base Models" href="https://github.com/ollama/ollama#model-library">
  A list of available base models
</Card>

<Card title="Base Models" href="https://ollama.com/library">
  Additional models can be found at
</Card>

#### Build from a Safetensors model
```

Example 4 (unknown):
```unknown
The model directory should contain the Safetensors weights for a supported architecture.

Currently supported model architectures:

* Llama (including Llama 2, Llama 3, Llama 3.1, and Llama 3.2)
* Mistral (including Mistral 1, Mistral 2, and Mixtral)
* Gemma (including Gemma 1 and Gemma 2)
* Phi3

#### Build from a GGUF file
```

---
