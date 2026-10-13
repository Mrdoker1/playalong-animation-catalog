import type { CatalogEntry } from '../types';
import type { ComponentModule } from './types';
import { createComponentCard } from './ComponentCard';
import { Button, Tag, Toggle, TabsItem, Checkbox, Dots, IconSet } from './ui/controls';
import {
  MenuItem, GameTypeTag, AvatarPicture, UserAvatar, AvatarLabel, UnlockedCounter,
  SelectionRadio, InputMessages, StrikeBox, Attempt, RewardTypeIcon, PlayerThumbnail,
} from './ui/identity';
import {
  BoxContent, ScoreBox, StatusBox, Keys, HigherLowerButton, CardBox,
  AnswerOption, VideoPlayerButtons,
} from './ui/game';

export const COMPONENTS: ComponentModule[] = [
  // Controls
  Button, Toggle, Checkbox, SelectionRadio,
  // Navigation
  MenuItem, TabsItem, Dots,
  // Identity
  AvatarPicture, UserAvatar, AvatarLabel, RewardTypeIcon, UnlockedCounter,
  // Content
  IconSet, Tag, GameTypeTag, PlayerThumbnail, VideoPlayerButtons,
  // Feedback
  InputMessages,
  // Game
  BoxContent, ScoreBox, StatusBox, Keys, HigherLowerButton, CardBox, AnswerOption, Attempt, StrikeBox,
];

export const COMPONENT_ENTRIES: CatalogEntry[] = COMPONENTS.map((c) => ({
  id: c.id,
  title: c.title,
  kind: 'component',
  section: 'Components',
  badge: { text: c.group, tone: 'ready' },
  open: (host) => {
    host.innerHTML = '';
    const card = createComponentCard(c) as HTMLElement & { __destroy?: () => void };
    host.appendChild(card);
    return () => card.__destroy?.();
  },
}));
