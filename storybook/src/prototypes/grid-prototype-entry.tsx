import { createRoot } from 'react-dom/client'
import { GridWebsiteCanvas, GridWebsiteMockup } from './grid-prototype'

createRoot(document.getElementById('root')!).render(
  new URLSearchParams(location.search).has('canvas') ? <GridWebsiteCanvas /> : <GridWebsiteMockup />,
)
