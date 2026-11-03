// Representative CSS viewport widths for layout review, not device dimensions
// or a ranking of traffic/market share. Breakpoint checks are kept separately.
export const viewportGroups = [
  { label: 'Phones and compact windows', widths: [320, 360, 375, 390, 393, 402, 412, 414, 428, 430, 440, 480] },
  { label: 'Tablets and small windows', widths: [600, 744, 768, 800, 810, 820, 834, 912, 960, 1024] },
  { label: 'Laptops and desktops', widths: [1152, 1280, 1366, 1440, 1536, 1600, 1920] },
  { label: 'Wide displays', widths: [2048, 2560, 3440, 3840] },
  { label: 'Modern8-bits breakpoint checks', widths: [671, 672, 1055, 1056] },
] as const
