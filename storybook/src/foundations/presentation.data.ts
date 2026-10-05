// Figma Presentation definitions, manually synchronized on 5 October 2026.
import type { VariableDefinition } from './variables.data'

export const presentationVariables: VariableDefinition[] = [
  {
    "name": "presentation/font/display",
    "type": "STRING",
    "collection": "Presentation",
    "description": "Presentation family; keep typography size, weight, line height, hierarchy and content unchanged. Appearance is independent.",
    "values": [
      {
        "mode": "Default",
        "value": "Space Grotesk",
        "reference": null
      },
      {
        "mode": "Low-fidelity",
        "value": "IBM Plex Sans",
        "reference": null
      }
    ]
  },
  {
    "name": "presentation/font/interface",
    "type": "STRING",
    "collection": "Presentation",
    "description": "Presentation family; keep typography size, weight, line height, hierarchy and content unchanged. Appearance is independent.",
    "values": [
      {
        "mode": "Default",
        "value": "IBM Plex Sans",
        "reference": null
      },
      {
        "mode": "Low-fidelity",
        "value": "IBM Plex Sans",
        "reference": null
      }
    ]
  },
  {
    "name": "presentation/font/detail",
    "type": "STRING",
    "collection": "Presentation",
    "description": "Presentation family; keep typography size, weight, line height, hierarchy and content unchanged. Appearance is independent.",
    "values": [
      {
        "mode": "Default",
        "value": "IBM Plex Mono",
        "reference": null
      },
      {
        "mode": "Low-fidelity",
        "value": "IBM Plex Sans",
        "reference": null
      }
    ]
  },
  {
    "name": "presentation/radius/card",
    "type": "FLOAT",
    "collection": "Presentation",
    "description": "Card geometry: default rounded; low-fidelity crisp. Keep spacing and structure unchanged.",
    "values": [
      {
        "mode": "Default",
        "value": "8px",
        "reference": "radius/medium"
      },
      {
        "mode": "Low-fidelity",
        "value": "0px",
        "reference": "radius/none"
      }
    ]
  },
  {
    "name": "presentation/status/error",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Feedback fill: semantic colour in Default, neutral primary in Low-fidelity. Pair with on-error and an explicit status label.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#B4233A",
        "reference": "status/error"
      },
      {
        "mode": "Default · Dark",
        "value": "#54212A",
        "reference": "status/error"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#000000",
        "reference": "action/primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#FFFFFF",
        "reference": "action/primary"
      }
    ]
  },
  {
    "name": "presentation/status/on-error",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Foreground paired with presentation/status/error. Always communicate status in words.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#FFFFFF",
        "reference": "status/on-error"
      },
      {
        "mode": "Default · Dark",
        "value": "#FFD6DC",
        "reference": "status/on-error"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#FFFFFF",
        "reference": "action/on-primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#000000",
        "reference": "action/on-primary"
      }
    ]
  },
  {
    "name": "presentation/status/error/text",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Inline feedback text; low-fidelity uses neutral text. Keep the Error/Success/Info label.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#B4233A",
        "reference": "status/error/text"
      },
      {
        "mode": "Default · Dark",
        "value": "#FFD6DC",
        "reference": "status/error/text"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#000000",
        "reference": "text/primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#FFFFFF",
        "reference": "text/primary"
      }
    ]
  },
  {
    "name": "presentation/status/success",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Feedback fill: semantic colour in Default, neutral primary in Low-fidelity. Pair with on-success and an explicit status label.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#1B5E36",
        "reference": "status/success"
      },
      {
        "mode": "Default · Dark",
        "value": "#173D2A",
        "reference": "status/success"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#000000",
        "reference": "action/primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#FFFFFF",
        "reference": "action/primary"
      }
    ]
  },
  {
    "name": "presentation/status/on-success",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Foreground paired with presentation/status/success. Always communicate status in words.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#FFFFFF",
        "reference": "status/on-success"
      },
      {
        "mode": "Default · Dark",
        "value": "#A6EEC0",
        "reference": "status/on-success"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#FFFFFF",
        "reference": "action/on-primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#000000",
        "reference": "action/on-primary"
      }
    ]
  },
  {
    "name": "presentation/status/success/text",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Inline feedback text; low-fidelity uses neutral text. Keep the Error/Success/Info label.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#1B5E36",
        "reference": "status/success/text"
      },
      {
        "mode": "Default · Dark",
        "value": "#A6EEC0",
        "reference": "status/success/text"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#000000",
        "reference": "text/primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#FFFFFF",
        "reference": "text/primary"
      }
    ]
  },
  {
    "name": "presentation/status/info",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Feedback fill: semantic colour in Default, neutral primary in Low-fidelity. Pair with on-info and an explicit status label.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#0B57D0",
        "reference": "status/info"
      },
      {
        "mode": "Default · Dark",
        "value": "#17365C",
        "reference": "status/info"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#000000",
        "reference": "action/primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#FFFFFF",
        "reference": "action/primary"
      }
    ]
  },
  {
    "name": "presentation/status/on-info",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Foreground paired with presentation/status/info. Always communicate status in words.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#FFFFFF",
        "reference": "status/on-info"
      },
      {
        "mode": "Default · Dark",
        "value": "#CFE2FF",
        "reference": "status/on-info"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#FFFFFF",
        "reference": "action/on-primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#000000",
        "reference": "action/on-primary"
      }
    ]
  },
  {
    "name": "presentation/status/info/text",
    "type": "COLOR",
    "collection": "Presentation",
    "description": "Inline feedback text; low-fidelity uses neutral text. Keep the Error/Success/Info label.",
    "values": [
      {
        "mode": "Default · Light",
        "value": "#0B57D0",
        "reference": "status/info/text"
      },
      {
        "mode": "Default · Dark",
        "value": "#CFE2FF",
        "reference": "status/info/text"
      },
      {
        "mode": "Low-fidelity · Light",
        "value": "#000000",
        "reference": "text/primary"
      },
      {
        "mode": "Low-fidelity · Dark",
        "value": "#FFFFFF",
        "reference": "text/primary"
      }
    ]
  }
]
