import type { CatalogEntry } from '../types';
import type { ComponentModule } from './types';
import { createComponentCard } from './ComponentCard';
import { Button, Tag, Toggle, TabsItem, Checkbox, Dots } from './ui/controls';
import {
  MenuItem, GameTypeTag, AvatarPicture, UserAvatar, AvatarLabel, UnlockedCounter,
  SelectionRadio, InputMessages, StrikeBox, Attempt, RewardTypeIcon, PlayerThumbnail,
} from './ui/identity';

export const COMPONENTS: ComponentModule[] = [
  // Controls
  Button, Toggle, Checkbox, SelectionRadio,
  // Navigation
  MenuItem, TabsItem, Dots,
  // Identity
  AvatarPicture, UserAvatar, AvatarLabel, RewardTypeIcon, UnlockedCounter,
  // Content
  Tag, GameTypeTag, PlayerThumbnail,
  // Feedback / game
  InputMessages, Attempt, StrikeBox,
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
