import type { CatalogEntry } from '../types';
import type { ComponentModule } from './types';
import { createComponentCard } from './ComponentCard';
import { Button, Tag, Toggle, TabsItem, Checkbox, Dots } from './ui/controls';

export const COMPONENTS: ComponentModule[] = [
  Button, Toggle, Checkbox,      // Controls
  TabsItem, Dots,                // Navigation
  Tag,                           // Content
];

export const COMPONENT_ENTRIES: CatalogEntry[] = COMPONENTS.map((c) => ({
  id: c.id,
  title: c.title,
  kind: 'component',
  section: 'Components',
  badge: { text: c.group, tone: 'ready' },
  open: (host) => {
    host.innerHTML = '';
    host.appendChild(createComponentCard(c));
    return () => { /* static */ };
  },
}));
