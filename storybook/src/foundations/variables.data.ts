// Figma definitions synchronized manually; Presentation added on 2026-10-05.
import { presentationVariables } from './presentation.data'
export interface VariableDefinition {
  name: string
  type: 'COLOR' | 'FLOAT' | 'STRING'
  collection: string
  description: string
  values: { mode: string; value: string; reference: string | null }[]
}

export const variables: VariableDefinition[] = [
  {
    "name": "gray/0",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": null
      }
    ]
  },
  {
    "name": "gray/100",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#EEEEEE",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#EEEEEE",
        "reference": null
      }
    ]
  },
  {
    "name": "gray/200",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#D6D6D6",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#D6D6D6",
        "reference": null
      }
    ]
  },
  {
    "name": "gray/400",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#A3A3A3",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#A3A3A3",
        "reference": null
      }
    ]
  },
  {
    "name": "gray/600",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#666666",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#666666",
        "reference": null
      }
    ]
  },
  {
    "name": "gray/800",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#292929",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#292929",
        "reference": null
      }
    ]
  },
  {
    "name": "gray/1000",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#000000",
        "reference": null
      }
    ]
  },
  {
    "name": "brand/primary",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive. Fixed black brand value for the first release. Consume action/primary for controls: its dark appearance uses white. This is not a user-customization input.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#000000",
        "reference": null
      }
    ]
  },
  {
    "name": "gray/50",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#F7F7F7",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#F7F7F7",
        "reference": null
      }
    ]
  },
  {
    "name": "gray/950",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#111111",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#111111",
        "reference": null
      }
    ]
  },
  {
    "name": "red/100",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFD6DC",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#FFD6DC",
        "reference": null
      }
    ]
  },
  {
    "name": "red/700",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#B4233A",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#B4233A",
        "reference": null
      }
    ]
  },
  {
    "name": "red/950",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#54212A",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#54212A",
        "reference": null
      }
    ]
  },
  {
    "name": "green/100",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#A6EEC0",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#A6EEC0",
        "reference": null
      }
    ]
  },
  {
    "name": "green/700",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#1B5E36",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#1B5E36",
        "reference": null
      }
    ]
  },
  {
    "name": "green/950",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#173D2A",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#173D2A",
        "reference": null
      }
    ]
  },
  {
    "name": "blue/100",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#CFE2FF",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#CFE2FF",
        "reference": null
      }
    ]
  },
  {
    "name": "blue/700",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#0B57D0",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#0B57D0",
        "reference": null
      }
    ]
  },
  {
    "name": "blue/950",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#17365C",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#17365C",
        "reference": null
      }
    ]
  },
  {
    "name": "neutral/50",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#F3F3F3",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#F3F3F3",
        "reference": null
      }
    ]
  },
  {
    "name": "neutral/150",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#E0E1E3",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#E0E1E3",
        "reference": null
      }
    ]
  },
  {
    "name": "neutral/750",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#3A3B3D",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#3A3B3D",
        "reference": null
      }
    ]
  },
  {
    "name": "neutral/800",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#333333",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#333333",
        "reference": null
      }
    ]
  },
  {
    "name": "neutral/950",
    "type": "COLOR",
    "collection": "Color",
    "description": "Primitive palette colour. Stable across appearances; selected existing status or neutral container value. Components consume semantic roles instead of this raw colour. Numeric shade names identify this authored palette, not a contrast guarantee.",
    "values": [
      {
        "mode": "Light",
        "value": "#171717",
        "reference": null
      },
      {
        "mode": "Dark",
        "value": "#171717",
        "reference": null
      }
    ]
  },
  {
    "name": "text/primary",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Main readable content, headings, and control labels on neutral canvas, surface, or raised backgrounds. Do not use as the foreground of filled actions or status containers; use their paired on-* role.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "gray/1000"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "gray/0"
      }
    ]
  },
  {
    "name": "action/on-primary",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Text and icons on action/primary only. Light: gray/0; dark: gray/1000. Do not place directly on the page canvas.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#000000",
        "reference": "gray/1000"
      }
    ]
  },
  {
    "name": "border/strong",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic border. Emphasized outlines and boundaries that need clear separation from neutral surfaces. Does not indicate keyboard focus or error by itself.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "gray/1000"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "gray/0"
      }
    ]
  },
  {
    "name": "action/disabled/background",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic disabled-control background. Pair with action/disabled/on-background and an actual disabled interaction state. Do not apply additional opacity without checking the resulting appearance.",
    "values": [
      {
        "mode": "Light",
        "value": "#EEEEEE",
        "reference": "gray/100"
      },
      {
        "mode": "Dark",
        "value": "#292929",
        "reference": "gray/800"
      }
    ]
  },
  {
    "name": "action/disabled/on-background",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic disabled-control foreground. Text and icons on action/disabled/background. Not for active supporting text. Current Figma picker scopes need review if unavailable for text binding.",
    "values": [
      {
        "mode": "Light",
        "value": "#666666",
        "reference": "gray/600"
      },
      {
        "mode": "Dark",
        "value": "#A3A3A3",
        "reference": "gray/400"
      }
    ]
  },
  {
    "name": "chip/neutral/background",
    "type": "COLOR",
    "collection": "Color",
    "description": "Component background. Neutral Chip fill, references background/subtle. Pair with chip/neutral/foreground. Renamed from chip/outline/grey; existing Figma bindings retain their variable ID.",
    "values": [
      {
        "mode": "Light",
        "value": "#E0E1E3",
        "reference": "background/subtle"
      },
      {
        "mode": "Dark",
        "value": "#3A3B3D",
        "reference": "background/subtle"
      }
    ]
  },
  {
    "name": "chip/strong/background",
    "type": "COLOR",
    "collection": "Color",
    "description": "Component background. Strong Chip fill, references background/contrast. Pair with chip/strong/foreground. Renamed from chip/contained/dark; values and IDs are preserved.",
    "values": [
      {
        "mode": "Light",
        "value": "#333333",
        "reference": "background/contrast"
      },
      {
        "mode": "Dark",
        "value": "#F3F3F3",
        "reference": "background/contrast"
      }
    ]
  },
  {
    "name": "chip/strong/foreground",
    "type": "COLOR",
    "collection": "Color",
    "description": "Component foreground. Strong Chip labels and icons, references text/on-contrast. Renamed from chip/dark; values and IDs are preserved.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "text/on-contrast"
      },
      {
        "mode": "Dark",
        "value": "#171717",
        "reference": "text/on-contrast"
      }
    ]
  },
  {
    "name": "chip/outline/background",
    "type": "COLOR",
    "collection": "Color",
    "description": "Component background. Outlined Chip fill, references background/outlined. Its stroke uses border/strong and foreground uses text/primary. Renamed from chip/outline/outline; values and IDs are preserved.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "background/outlined"
      },
      {
        "mode": "Dark",
        "value": "#111111",
        "reference": "background/outlined"
      }
    ]
  },
  {
    "name": "background/card",
    "type": "COLOR",
    "collection": "Color",
    "description": "Existing Card background role. Light: gray/0; dark: gray/800. Use with text/primary or text/secondary and border/card. Retain for current Card bindings; consolidation with background/raised is pending.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#292929",
        "reference": "gray/800"
      }
    ]
  },
  {
    "name": "border/card",
    "type": "COLOR",
    "collection": "Color",
    "description": "Existing Card outline role. Light: gray/200; dark: gray/600. Retain for current Card bindings; do not assume it equals border/default in dark appearance.",
    "values": [
      {
        "mode": "Light",
        "value": "#D6D6D6",
        "reference": "gray/200"
      },
      {
        "mode": "Dark",
        "value": "#666666",
        "reference": "gray/600"
      }
    ]
  },
  {
    "name": "text/secondary",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Supporting content on neutral canvas, surface, or raised backgrounds. Remains readable and does not mean disabled. Do not reuse for borders merely because values match.",
    "values": [
      {
        "mode": "Light",
        "value": "#666666",
        "reference": "gray/600"
      },
      {
        "mode": "Dark",
        "value": "#D6D6D6",
        "reference": "gray/200"
      }
    ]
  },
  {
    "name": "background/canvas",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. Base page background. Use text/primary or text/secondary for content; light resolves to gray/0, dark to gray/1000.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#000000",
        "reference": "gray/1000"
      }
    ]
  },
  {
    "name": "background/surface",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. Subtle sections and inset areas on the canvas. Light: gray/50; dark: gray/950. Pair with semantic text roles, not action/on-primary.",
    "values": [
      {
        "mode": "Light",
        "value": "#F7F7F7",
        "reference": "gray/50"
      },
      {
        "mode": "Dark",
        "value": "#111111",
        "reference": "gray/950"
      }
    ]
  },
  {
    "name": "background/raised",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. Raised containers above the base surface. Light: gray/0; dark: gray/800. Pair with text/primary or text/secondary. Elevation is not an interaction state.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#292929",
        "reference": "gray/800"
      }
    ]
  },
  {
    "name": "text/muted",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Lower-emphasis metadata and supplementary content on neutral surfaces. Not a disabled state. Check contrast on the actual surface, especially gray/800 in dark appearance; use text/secondary if stronger contrast is needed.",
    "values": [
      {
        "mode": "Light",
        "value": "#666666",
        "reference": "gray/600"
      },
      {
        "mode": "Dark",
        "value": "#A3A3A3",
        "reference": "gray/400"
      }
    ]
  },
  {
    "name": "border/default",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic border. Quiet separators and decorative container outlines. Not sufficient by itself to identify every interactive control or focus state; use border/strong or border/focus as appropriate.",
    "values": [
      {
        "mode": "Light",
        "value": "#D6D6D6",
        "reference": "gray/200"
      },
      {
        "mode": "Dark",
        "value": "#292929",
        "reference": "gray/800"
      }
    ]
  },
  {
    "name": "icon/primary",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Meaningful icons on neutral canvas, surface, or raised backgrounds. Icons inside filled actions or status containers use the corresponding on-* foreground. Provide labels or accessible names for actionable icons.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "gray/1000"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "gray/0"
      }
    ]
  },
  {
    "name": "action/primary",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. Highest-priority filled action. Pair text and icons with action/on-primary. Light: brand/primary; dark: gray/0. This is the base action fill, not a definition of hover or pressed behaviour.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "brand/primary"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "gray/0"
      }
    ]
  },
  {
    "name": "action/secondary",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. Secondary filled action where that treatment is deliberately used. Pair with action/on-secondary. Current values match primary actions; distinguish priority through treatment and layout, not assumed colour differences.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "gray/1000"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "gray/0"
      }
    ]
  },
  {
    "name": "action/on-secondary",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Text and icons on action/secondary. Do not infer usage on transparent or outlined controls from this role.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#000000",
        "reference": "gray/1000"
      }
    ]
  },
  {
    "name": "action/primary-container",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. Lower-emphasis action container. Pair with action/on-primary-container. Light: gray/50; dark: gray/800. Not a generic text, icon, or hover colour.",
    "values": [
      {
        "mode": "Light",
        "value": "#F7F7F7",
        "reference": "gray/50"
      },
      {
        "mode": "Dark",
        "value": "#292929",
        "reference": "gray/800"
      }
    ]
  },
  {
    "name": "action/on-primary-container",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Text and icons on action/primary-container. Light: gray/1000; dark: gray/0. Use only with the paired container or after checking the actual surface.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "gray/1000"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "gray/0"
      }
    ]
  },
  {
    "name": "border/focus",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic focus indicator. Visible keyboard-focus outline against neutral surfaces. Light: brand/primary; dark: gray/0. Keep separation from filled controls and check adjacent surfaces; do not substitute for ordinary borders.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "brand/primary"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "gray/0"
      }
    ]
  },
  {
    "name": "status/error",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status background. error container fill paired with status/on-error. Include a readable label or icon cue. Never use this subdued dark fill as inline text; use status/error/text.",
    "values": [
      {
        "mode": "Light",
        "value": "#B4233A",
        "reference": "red/700"
      },
      {
        "mode": "Dark",
        "value": "#54212A",
        "reference": "red/950"
      }
    ]
  },
  {
    "name": "status/on-error",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status foreground. Text and icons on status/error. This pair describes a filled message, not arbitrary page text.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#FFD6DC",
        "reference": "red/100"
      }
    ]
  },
  {
    "name": "status/success",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status background. success container fill paired with status/on-success. Include a readable label or icon cue. Never use this subdued dark fill as inline text; use status/success/text.",
    "values": [
      {
        "mode": "Light",
        "value": "#1B5E36",
        "reference": "green/700"
      },
      {
        "mode": "Dark",
        "value": "#173D2A",
        "reference": "green/950"
      }
    ]
  },
  {
    "name": "status/info",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status background. info container fill paired with status/on-info. Include a readable label or icon cue. Never use this subdued dark fill as inline text; use status/info/text.",
    "values": [
      {
        "mode": "Light",
        "value": "#0B57D0",
        "reference": "blue/700"
      },
      {
        "mode": "Dark",
        "value": "#17365C",
        "reference": "blue/950"
      }
    ]
  },
  {
    "name": "status/on-success",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status foreground. Text and icons on status/success. This pair describes a filled message, not arbitrary page text.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#A6EEC0",
        "reference": "green/100"
      }
    ]
  },
  {
    "name": "status/on-info",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status foreground. Text and icons on status/info. This pair describes a filled message, not arbitrary page text.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#CFE2FF",
        "reference": "blue/100"
      }
    ]
  },
  {
    "name": "background/subtle",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. Low-emphasis neutral containers, including neutral Chips. Pair with text/primary. Distinct from page surface layers; preserves existing Chip fill values.",
    "values": [
      {
        "mode": "Light",
        "value": "#E0E1E3",
        "reference": "neutral/150"
      },
      {
        "mode": "Dark",
        "value": "#3A3B3D",
        "reference": "neutral/750"
      }
    ]
  },
  {
    "name": "background/contrast",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. High-emphasis neutral containers. Pair with text/on-contrast; not a keyboard-focus or status colour.",
    "values": [
      {
        "mode": "Light",
        "value": "#333333",
        "reference": "neutral/800"
      },
      {
        "mode": "Dark",
        "value": "#F3F3F3",
        "reference": "neutral/50"
      }
    ]
  },
  {
    "name": "text/on-contrast",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Text and icons on background/contrast. Use the paired fill, not arbitrary neutral surfaces.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#171717",
        "reference": "neutral/950"
      }
    ]
  },
  {
    "name": "background/outlined",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic background. Neutral fill inside outlined containers. Pair with text/primary and border/strong; independent of outline stroke colour.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "gray/0"
      },
      {
        "mode": "Dark",
        "value": "#111111",
        "reference": "gray/950"
      }
    ]
  },
  {
    "name": "chip/neutral/foreground",
    "type": "COLOR",
    "collection": "Color",
    "description": "Component foreground. Neutral Chip labels and icons on chip/neutral/background. References text/primary.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "text/primary"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "text/primary"
      }
    ]
  },
  {
    "name": "action/primary/hover",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic action background. Pointer hover for primary filled actions. Retain action/on-primary foreground; do not use as selected or disabled state.",
    "values": [
      {
        "mode": "Light",
        "value": "#292929",
        "reference": "gray/800"
      },
      {
        "mode": "Dark",
        "value": "#EEEEEE",
        "reference": "gray/100"
      }
    ]
  },
  {
    "name": "action/primary/pressed",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic action background. Transient pressed feedback for primary filled actions. Retain action/on-primary foreground; not persistent selection.",
    "values": [
      {
        "mode": "Light",
        "value": "#111111",
        "reference": "gray/950"
      },
      {
        "mode": "Dark",
        "value": "#D6D6D6",
        "reference": "gray/200"
      }
    ]
  },
  {
    "name": "action/subtle/hover",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic action background. Hover fill for outlined and ghost actions on neutral surfaces. Pair with text/primary; preserve outlined borders where present.",
    "values": [
      {
        "mode": "Light",
        "value": "#EEEEEE",
        "reference": "gray/100"
      },
      {
        "mode": "Dark",
        "value": "#292929",
        "reference": "gray/800"
      }
    ]
  },
  {
    "name": "action/subtle/pressed",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic action background. Pressed fill for outlined and ghost actions. Pair with text/primary. Pressed feedback ends when activation ends.",
    "values": [
      {
        "mode": "Light",
        "value": "#D6D6D6",
        "reference": "gray/200"
      },
      {
        "mode": "Dark",
        "value": "#666666",
        "reference": "gray/600"
      }
    ]
  },
  {
    "name": "action/selected",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic action background. Persistent selected or checked control fill, including checked Checkbox. Pair with action/on-selected and a non-colour cue such as a check mark.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "action/primary"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "action/primary"
      }
    ]
  },
  {
    "name": "action/on-selected",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic foreground. Check marks, text, and icons on action/selected. Selection also needs appropriate state semantics.",
    "values": [
      {
        "mode": "Light",
        "value": "#FFFFFF",
        "reference": "action/on-primary"
      },
      {
        "mode": "Dark",
        "value": "#000000",
        "reference": "action/on-primary"
      }
    ]
  },
  {
    "name": "border/selected",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic border. Outline of selected controls on neutral surfaces. Keep selection distinct from keyboard focus; focus uses border/focus.",
    "values": [
      {
        "mode": "Light",
        "value": "#000000",
        "reference": "action/selected"
      },
      {
        "mode": "Dark",
        "value": "#FFFFFF",
        "reference": "action/selected"
      }
    ]
  },
  {
    "name": "status/error/text",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status foreground. Inline error text, meaningful icons, or error indicators on neutral canvas, surface, or raised backgrounds. Do not pair it as foreground on status/error; use status/on-error there. Include explicit status wording.",
    "values": [
      {
        "mode": "Light",
        "value": "#B4233A",
        "reference": "red/700"
      },
      {
        "mode": "Dark",
        "value": "#FFD6DC",
        "reference": "red/100"
      }
    ]
  },
  {
    "name": "status/success/text",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status foreground. Inline success text, meaningful icons, or error indicators on neutral canvas, surface, or raised backgrounds. Do not pair it as foreground on status/success; use status/on-success there. Include explicit status wording.",
    "values": [
      {
        "mode": "Light",
        "value": "#1B5E36",
        "reference": "green/700"
      },
      {
        "mode": "Dark",
        "value": "#A6EEC0",
        "reference": "green/100"
      }
    ]
  },
  {
    "name": "status/info/text",
    "type": "COLOR",
    "collection": "Color",
    "description": "Semantic status foreground. Inline info text, meaningful icons, or error indicators on neutral canvas, surface, or raised backgrounds. Do not pair it as foreground on status/info; use status/on-info there. Include explicit status wording.",
    "values": [
      {
        "mode": "Light",
        "value": "#0B57D0",
        "reference": "blue/700"
      },
      {
        "mode": "Dark",
        "value": "#CFE2FF",
        "reference": "blue/100"
      }
    ]
  },
  {
    "name": "space/1",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared spacing: 4px. Names use multiples of 4px; Figma and CSS match. Use for padding, gaps, and layout rhythm.",
    "values": [
      {
        "mode": "Default",
        "value": "4px",
        "reference": null
      }
    ]
  },
  {
    "name": "space/2",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared spacing: 8px. Names use multiples of 4px; Figma and CSS match. Use for padding, gaps, and layout rhythm.",
    "values": [
      {
        "mode": "Default",
        "value": "8px",
        "reference": null
      }
    ]
  },
  {
    "name": "space/3",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared spacing: 12px. Names use multiples of 4px; Figma and CSS match. Use for padding, gaps, and layout rhythm.",
    "values": [
      {
        "mode": "Default",
        "value": "12px",
        "reference": null
      }
    ]
  },
  {
    "name": "space/4",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared spacing: 16px. Names use multiples of 4px; Figma and CSS match. Use for padding, gaps, and layout rhythm.",
    "values": [
      {
        "mode": "Default",
        "value": "16px",
        "reference": null
      }
    ]
  },
  {
    "name": "space/6",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared spacing: 24px. Names use multiples of 4px; Figma and CSS match. Use for padding, gaps, and layout rhythm.",
    "values": [
      {
        "mode": "Default",
        "value": "24px",
        "reference": null
      }
    ]
  },
  {
    "name": "space/8",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared spacing: 32px. Names use multiples of 4px; Figma and CSS match. Use for padding, gaps, and layout rhythm.",
    "values": [
      {
        "mode": "Default",
        "value": "32px",
        "reference": null
      }
    ]
  },
  {
    "name": "space/12",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared spacing: 48px. Names use multiples of 4px; Figma and CSS match. Use for padding, gaps, and layout rhythm.",
    "values": [
      {
        "mode": "Default",
        "value": "48px",
        "reference": null
      }
    ]
  },
  {
    "name": "space/20",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared spacing: 80px. Names use multiples of 4px; Figma and CSS match. Use for padding, gaps, and layout rhythm.",
    "values": [
      {
        "mode": "Default",
        "value": "80px",
        "reference": null
      }
    ]
  },
  {
    "name": "radius/small",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared corner radius. Figma/CSS names and values agree. Choose by shape intent; radius/none is the crisp default.",
    "values": [
      {
        "mode": "Default",
        "value": "4px",
        "reference": "space/1"
      }
    ]
  },
  {
    "name": "radius/medium",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared corner radius. Figma/CSS names and values agree. Choose by shape intent; radius/none is the crisp default.",
    "values": [
      {
        "mode": "Default",
        "value": "8px",
        "reference": "space/2"
      }
    ]
  },
  {
    "name": "radius/lg",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared corner radius. Figma/CSS names and values agree. Choose by shape intent; radius/none is the crisp default.",
    "values": [
      {
        "mode": "Default",
        "value": "12px",
        "reference": "space/3"
      }
    ]
  },
  {
    "name": "radius/full",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared corner radius. Figma/CSS names and values agree. Choose by shape intent; radius/none is the crisp default.",
    "values": [
      {
        "mode": "Default",
        "value": "9999px",
        "reference": null
      }
    ]
  },
  {
    "name": "radius/none",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Shared corner radius. Figma/CSS names and values agree. Choose by shape intent; radius/none is the crisp default.",
    "values": [
      {
        "mode": "Default",
        "value": "0px",
        "reference": null
      }
    ]
  },
  {
    "name": "stroke/hairline",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Primitive stroke width. 1px for quiet borders and separators. Colour comes from a border role. Focus and pixel emphasis may need different widths.",
    "values": [
      {
        "mode": "Default",
        "value": "1px",
        "reference": null
      }
    ]
  },
  {
    "name": "button/height/sm",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Authored visible button height: 32px. CSS matches. Compact sizes require adequate target spacing; use large 48px controls for touch-heavy interfaces.",
    "values": [
      {
        "mode": "Default",
        "value": "32px",
        "reference": null
      }
    ]
  },
  {
    "name": "button/height/md",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Authored visible button height: 40px. CSS matches. Compact sizes require adequate target spacing; use large 48px controls for touch-heavy interfaces.",
    "values": [
      {
        "mode": "Default",
        "value": "40px",
        "reference": null
      }
    ]
  },
  {
    "name": "button/height/lg",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Authored visible button height: 48px. CSS matches. Compact sizes require adequate target spacing; use large 48px controls for touch-heavy interfaces.",
    "values": [
      {
        "mode": "Default",
        "value": "48px",
        "reference": null
      }
    ]
  },
  {
    "name": "stroke/pixel",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Pixel emphasis and focus outlines, in px.",
    "values": [
      {
        "mode": "Default",
        "value": "2px",
        "reference": null
      }
    ]
  },
  {
    "name": "input/height/sm",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Text Field small visible input height, in px.",
    "values": [
      {
        "mode": "Default",
        "value": "36px",
        "reference": null
      }
    ]
  },
  {
    "name": "input/height/md",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Text Field medium visible input height; code Input uses this supported size.",
    "values": [
      {
        "mode": "Default",
        "value": "44px",
        "reference": null
      }
    ]
  },
  {
    "name": "input/height/lg",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Text Field large visible input height, in px.",
    "values": [
      {
        "mode": "Default",
        "value": "52px",
        "reference": null
      }
    ]
  },
  {
    "name": "checkbox/size/sm",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Small checkbox box size, in px.",
    "values": [
      {
        "mode": "Default",
        "value": "18px",
        "reference": null
      }
    ]
  },
  {
    "name": "checkbox/size/md",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Medium checkbox box size; code Checkbox uses this supported size.",
    "values": [
      {
        "mode": "Default",
        "value": "20px",
        "reference": null
      }
    ]
  },
  {
    "name": "layout/breakpoint/medium",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Medium viewport starts at 672px. CSS media queries use this literal; custom properties cannot be used directly in media query conditions.",
    "values": [
      {
        "mode": "Default",
        "value": "672px",
        "reference": null
      }
    ]
  },
  {
    "name": "layout/breakpoint/large",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Large viewport starts at 1056px. CSS media queries use this literal.",
    "values": [
      {
        "mode": "Default",
        "value": "1056px",
        "reference": null
      }
    ]
  },
  {
    "name": "layout/gutter/small",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Small viewport outer gutter, in px.",
    "values": [
      {
        "mode": "Default",
        "value": "16px",
        "reference": null
      }
    ]
  },
  {
    "name": "layout/gutter/medium",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Medium viewport outer gutter, in px.",
    "values": [
      {
        "mode": "Default",
        "value": "24px",
        "reference": null
      }
    ]
  },
  {
    "name": "layout/gutter/large",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Large viewport outer gutter, in px.",
    "values": [
      {
        "mode": "Default",
        "value": "32px",
        "reference": null
      }
    ]
  },
  {
    "name": "layout/content/max",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Maximum ordinary content width, in px.",
    "values": [
      {
        "mode": "Default",
        "value": "1440px",
        "reference": null
      }
    ]
  },
  {
    "name": "motion/duration/fast-01",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Duration in milliseconds; CSS adds ms. Respect reduced-motion preference.",
    "values": [
      {
        "mode": "Default",
        "value": "70ms",
        "reference": null
      }
    ]
  },
  {
    "name": "motion/duration/fast-02",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Duration in milliseconds; CSS adds ms. Respect reduced-motion preference.",
    "values": [
      {
        "mode": "Default",
        "value": "110ms",
        "reference": null
      }
    ]
  },
  {
    "name": "motion/duration/moderate-01",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Duration in milliseconds; CSS adds ms. Respect reduced-motion preference.",
    "values": [
      {
        "mode": "Default",
        "value": "150ms",
        "reference": null
      }
    ]
  },
  {
    "name": "motion/duration/moderate-02",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Duration in milliseconds; CSS adds ms. Respect reduced-motion preference.",
    "values": [
      {
        "mode": "Default",
        "value": "240ms",
        "reference": null
      }
    ]
  },
  {
    "name": "motion/duration/slow-01",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Duration in milliseconds; CSS adds ms. Respect reduced-motion preference.",
    "values": [
      {
        "mode": "Default",
        "value": "400ms",
        "reference": null
      }
    ]
  },
  {
    "name": "motion/duration/slow-02",
    "type": "FLOAT",
    "collection": "Spacing & Radius",
    "description": "Duration in milliseconds; CSS adds ms. Respect reduced-motion preference.",
    "values": [
      {
        "mode": "Default",
        "value": "700ms",
        "reference": null
      }
    ]
  },
{
  "name": "input/padding-inline/md",
  "type": "FLOAT",
  "collection": "Spacing & Radius",
  "description": "Authored medium Text Field optical horizontal inset in px. Component-specific exception to the shared 4px spacing scale; CSS Input uses the same definition.",
  "values": [
    {
      "mode": "Default",
      "value": "14px",
      "reference": null
    }
  ]
},
{
  "name": "input/gap/md",
  "type": "FLOAT",
  "collection": "Spacing & Radius",
  "description": "Authored medium Text Field optical label/supporting-copy gap in px. Component-specific exception to the shared 4px spacing scale; CSS Input uses the same definition.",
  "values": [
    {
      "mode": "Default",
      "value": "6px",
      "reference": null
    }
  ]
},
  ...presentationVariables,
]

