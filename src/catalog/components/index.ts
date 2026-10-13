import type { CatalogEntry } from '../types';
import type { ComponentModule } from './types';
import { createComponentCard } from './ComponentCard';
import {
  Button, Tag, Toggle, TabsItem, Checkbox, Dots, IconSet,
  Input, InputWeb, Keyboard, CheckboxMessage, Mic,
} from './ui/controls';
import {
  MenuItem, GameTypeTag, AvatarPicture, UserAvatar, AvatarLabel, UnlockedCounter,
  SelectionRadio, InputMessages, StrikeBox, Attempt, RewardTypeIcon, PlayerThumbnail,
} from './ui/identity';
import {
  CollapsedMenu, ExpandedMenu, MenuOverlay, Tabs, GameTypeTagsRow,
} from './ui/navigation';
import {
  Logo, LogoWithText, Subtract, Confetti, TrophiesThumbnail, InputFieldWeb,
  AnswerBox, AttemptsBox, AnswerOptionsList, CardSharksQuestion, GameKeyboard,
  RewardUnlockedContainer, LoadingState,
} from './ui/brand';
import {
  Reward, AvatarTile, RewardTrack, RewardTrackFirst,
} from './ui/rewards';
import {
  HorizontalRailCard, VerticalRailCard, SearchListItem, SearchListItemImage,
  SectionTrending, SectionWatchMore,
} from './ui/rails';
import {
  BoxContent, ScoreBox, StatusBox, Keys, HigherLowerButton, CardBox,
  AnswerOption, VideoPlayerButtons,
  StackedAnswer, HigherLowerNote, HigherLower, ScoreTableRow, NotificationMessage,
} from './ui/game';

export const COMPONENTS: ComponentModule[] = [
  // Controls
  Button, Input, InputWeb, InputFieldWeb, Keyboard, Toggle, Checkbox, CheckboxMessage, SelectionRadio,
  // Navigation
  MenuItem, CollapsedMenu, ExpandedMenu, MenuOverlay, TabsItem, Tabs, Dots,
  // Identity
  AvatarPicture, AvatarTile, UserAvatar, AvatarLabel, RewardTypeIcon, UnlockedCounter,
  Reward, RewardTrackFirst, RewardTrack, TrophiesThumbnail, RewardUnlockedContainer,
  // Content
  IconSet, Tag, GameTypeTag, GameTypeTagsRow, PlayerThumbnail, VideoPlayerButtons,
  HorizontalRailCard, VerticalRailCard, SearchListItem, SearchListItemImage,
  SectionTrending, SectionWatchMore, Logo, LogoWithText, Subtract,
  // Feedback
  InputMessages, Mic, NotificationMessage, Confetti, LoadingState,
  // Game
  BoxContent, ScoreBox, StatusBox, Keys, HigherLowerButton, HigherLower, HigherLowerNote,
  CardBox, AnswerOption, AnswerOptionsList, AnswerBox, AttemptsBox, GameKeyboard,
  CardSharksQuestion, StackedAnswer, Attempt, StrikeBox, ScoreTableRow,
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
