export const elevationRoles = [
  { id: 'base', name: 'Base', description: 'The page and its ordinary content. Use spacing or a border to group static cards.', use: 'Pages, reading surfaces, static cards', shadow: 'None' },
  { id: 'sunken', name: 'Sunken', description: 'A background well placed on Base, with components inside it. It reads as recessed without adding a shadow.', use: 'Board columns, grouped work areas, background wells', shadow: 'None' },
  { id: 'raised', name: 'Raised', description: 'A small lift for a movable card or one focal section. Keep the surface and shadow together.', use: 'Movable cards, a single emphasized panel', shadow: 'Small, soft shadow' },
  { id: 'overlay', name: 'Overlay', description: 'A surface that temporarily sits over other content. Keep a clear edge in both appearances.', use: 'Menus, popovers, dialogs, dragged cards', shadow: 'Larger, soft shadow' },
] as const

export const elevationScenarios = {
  card: { name: 'Static card', role: 'base', explanation: 'Static cards stay flat. A border and spacing are enough to group content.' },
  well: { name: 'Sunken background well', role: 'sunken', explanation: 'Sunken sits on Base and acts as a recessed background for its child components. Use it for a board column or grouped work area, without a shadow. Keep Sunken off Raised and Overlay surfaces.' },
  movable: { name: 'Movable card', role: 'raised', explanation: 'A movable card uses Raised at rest. Use an explicit drag handle; a shadow alone does not explain that it can move.' },
  menu: { name: 'Menu or popover', role: 'overlay', explanation: 'A menu floats above its trigger and surrounding content. Use Overlay without a page scrim.' },
  dialog: { name: 'Modal dialog', role: 'overlay', explanation: 'A modal uses Overlay with a scrim behind it. It has the same visual elevation as a menu, but a different stacking position and interaction behavior.' },
  dragged: { name: 'Card while dragging', role: 'overlay', explanation: 'A card uses Overlay only while it is being dragged, then returns to its resting role. Keep a visible insertion target and support keyboard movement.' },
  sticky: { name: 'Sticky header', role: 'base', explanation: 'Sticky content can sit above a page while staying visually flat. A separator identifies its edge; sticky positioning does not require a stronger shadow.' },
} as const

export const elevationLayers = [
  ['content', '0', 'Page content and background wells', 'Base, Sunken, or Raised'],
  ['sticky', '100', 'Sticky navigation and headers', 'Usually Base'],
  ['floating', '200', 'Page menus, floating tools, dragged cards', 'Overlay'],
  ['scrim', '300', 'Backdrop behind a modal', 'Scrim only'],
  ['modal', '400', 'Modal dialog or modal sheet', 'Overlay'],
  ['feedback', '500', 'Transient application feedback', 'Overlay'],
  ['tooltip', '600', 'Tooltip for the active layer', 'Overlay'],
] as const

export const elevationRecipe = `/* tokens.css includes the elevation extension. */
<div className="m8-elevation-surface" data-elevation="raised">
  Movable content
</div>

/* Place the well on Base; its children sit inside it. */
<div className="m8-elevation-surface" data-elevation="sunken">
  <Card title="Task details">Grouped content</Card>
</div>

/* For an existing surface, apply the pair together. */
.popover {
  background: var(--m8-elevation-surface-overlay);
  color: var(--m8-text-primary);
  border: 1px solid var(--m8-elevation-border);
  box-shadow: var(--m8-elevation-shadow-overlay);
  z-index: var(--m8-layer-floating);
}
[data-presentation='low-fidelity'] .popover {
  box-shadow: none;
  border-color: var(--m8-border-strong);
}`
