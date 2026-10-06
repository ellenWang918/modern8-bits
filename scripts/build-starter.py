"""Package the current local library into a standalone React consumer."""
import json
from pathlib import Path
import shutil
import tempfile
import zipfile

root = Path(__file__).resolve().parents[1]
storybook = root / 'storybook'
public = storybook / 'public'
public.mkdir(exist_ok=True)

def version(name):
    return json.loads((storybook / 'node_modules' / name / 'package.json').read_text(encoding='utf-8'))['version']

with tempfile.TemporaryDirectory(prefix='modern8-starter-') as folder:
    target = Path(folder)
    for section in ['components', 'styles', 'patterns']:
        shutil.copytree(storybook / 'src' / section, target / 'src' / section, ignore=shutil.ignore_patterns('*.stories.tsx', '*.test.*'))
    shutil.copyfile(root / 'USAGE.md', target / 'USAGE.md')
    package = {'name': 'modern8-bits-starter', 'private': True, 'version': '0.1.0', 'type': 'module', 'scripts': {'dev': 'vite', 'build': 'tsc --noEmit && vite build', 'preview': 'vite preview'}, 'dependencies': {name: version(name) for name in ['react', 'react-dom']}, 'devDependencies': {name: version(name) for name in ['vite', '@vitejs/plugin-react', 'typescript', '@types/react', '@types/react-dom']}}
    (target / 'package.json').write_text(json.dumps(package, indent=2), encoding='utf-8')
    (target / 'tsconfig.json').write_text(json.dumps({'compilerOptions': {'target': 'ES2022', 'lib': ['ES2022', 'DOM', 'DOM.Iterable'], 'module': 'ESNext', 'moduleResolution': 'bundler', 'jsx': 'react-jsx', 'strict': True, 'skipLibCheck': True, 'esModuleInterop': True}, 'include': ['src']}), encoding='utf-8')
    (target / 'vite.config.ts').write_text("import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nexport default defineConfig({ plugins: [react()] })\n", encoding='utf-8')
    (target / 'index.html').write_text('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Modern8-bits starter</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>', encoding='utf-8')
    (target / 'src' / 'main.tsx').write_text("import { createRoot } from 'react-dom/client'\nimport { App } from './App'\nimport './styles/tokens.css'\nimport './styles/global.css'\nimport './styles/presentation.css'\ncreateRoot(document.getElementById('root')!).render(<App />)\n", encoding='utf-8')
    (target / 'src' / 'App.tsx').write_text('''import { useState } from 'react'
import { Card, Input } from './components'
import { CategorySelection } from './patterns/CategorySelection'
export function App() {
  const [presentation, setPresentation] = useState('default')
  const [theme, setTheme] = useState('light')
  return <main data-theme={theme} data-presentation={presentation} style={{minHeight:'100vh',background:'var(--m8-background-canvas)',color:'var(--m8-text-primary)',padding:'var(--m8-layout-gutter)',fontFamily:'var(--m8-presentation-font-interface)'}}>
    <div style={{maxWidth:720,margin:'auto',display:'grid',gap:24}}>
      <h1 style={{fontFamily:'var(--m8-presentation-font-display)'}}>Start with Modern8-bits</h1>
      <label>Presentation <select value={presentation} onChange={event=>setPresentation(event.target.value)}><option value="default">Default</option><option value="low-fidelity">Low-fidelity</option></select></label>
      <label>Appearance <select value={theme} onChange={event=>setTheme(event.target.value)}><option value="light">Light</option><option value="dark">Dark</option></select></label>
      <Card title="Your first form"><Input label="Project name" hint="Change modes: your entry stays in place." /></Card>
      <CategorySelection />
    </div>
  </main>
}
''', encoding='utf-8')
    (target / 'README.md').write_text('# Modern8-bits starter\n\nUse Node.js 22 or newer. Run `npm install`, then `npm run dev`. Choose presentation and appearance in the UI. Read USAGE.md before extending the app. Run `npm run build` before sharing. Fonts load from Google Fonts with system fallbacks. The examples have no backend or persistent storage.\n', encoding='utf-8')
    archive = public / 'modern8-bits-starter.zip'
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as output:
        for file in sorted(target.rglob('*')):
            if file.is_file():
                output.write(file, file.relative_to(target))
shutil.copyfile(root / 'USAGE.md', public / 'USAGE.md')
print(f'Created {archive.name} from current source')
