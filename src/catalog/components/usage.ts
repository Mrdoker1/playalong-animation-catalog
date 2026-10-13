/**
 * Where each component is actually used, counted from the Figma file on
 * 2026-10-13 by resolving every instance on the `❐ Design` page back to its
 * component set — 5,088 instances in all.
 *
 * This is the half a component's own node cannot tell you. A control looks
 * reasonable in isolation and only its callers say whether it is load-bearing,
 * show-specific, or dead.
 */
export type Usage = {
  /** How many top-level frames hold at least one instance. */
  count: number;
  /** Up to ten of them, in the order the page returns. */
  frames: string[];
  /** One line on what that usage means, where it is not obvious. */
  note?: string;
};

export const USAGE: Record<string, Usage> = {
  // ---- chrome: on nearly every screen
  'c-icons': { count: 140, frames: ['Homepage', 'Player', 'Match Game', 'Family Feud', 'Account', 'Leaderboard', 'Login', 'Sign Up'],
    note: 'The most-used component in the file by a wide margin.' },
  'c-button': { count: 114, frames: ['Homepage', 'Error - Too many attempts', 'Details', 'Account', 'Login', 'Sign Up', 'Leaderboard'] },
  'c-logo': { count: 72, frames: ['Menu Expanded First Item Focus', 'Legal', 'Splash Screen', 'Account', 'Login', 'Sign Up'] },
  'c-menu-item': { count: 60, frames: ['Overlay', 'Homepage', 'Keep Playing Rail', 'Loading Page Content', 'Legal', 'Account'] },
  'c-menu': { count: 45, frames: ['Overlay', 'Homepage - Played Rail Card', 'Homepage - Prime Time Card', 'Keep Playing Rail', 'Loading Page Content', 'Magic Remote Menu Item Focus', 'Legal', 'Account'],
    note: 'The collapsed rail is on 45 frames; the expanded menu on 14; the Overlay node on 2.' },
  'c-subtract': { count: 46, frames: ['Overlay', 'Homepage', 'Keep Playing Rail', 'Loading Page Content', 'Magic Remote Menu Item Focus'],
    note: 'It travels with the collapsed rail — the mark at the top of it.' },

  // ---- browse
  'c-rail-h': { count: 22, frames: ['Homepage - Played Rail Card', 'Homepage - Prime Time Card', 'Homepage - Prime Time on hero rail', 'Keep Playing Rail', 'Firts rail Item Focus', 'Mid rail Item Focus', 'Magic Remote Rail Item Focus'] },
  'c-section-trending': { count: 17, frames: ['Homepage - Played Rail Card', 'Homepage - Prime Time Card', 'Keep Playing Rail', 'Menu Expanded First Item Focus', 'Magic Remote Rail Item Focus'] },
  'c-game-type-tags-row': { count: 22, frames: ['Homepage - Played Rail Card', 'Homepage - Prime Time Card', 'Keep Playing Rail', 'Mid rail Item Focus', 'Details'] },
  'c-game-type-tag': { count: 24, frames: ['Homepage', 'Keep Playing Rail', 'Details', 'Magic Remote Rail Item Focus'] },
  'c-tag': { count: 33, frames: ['Homepage', 'Keep Playing Rail', 'Details', 'Leaderboard', 'Magic Remote Rail Item Focus'] },
  'c-dots': { count: 14, frames: ['Homepage', 'Keep Playing Rail', 'Menu Expanded First Item Focus'] },
  'c-search-item': { count: 2, frames: ['Frame 2608967', 'With Prime Time Card'],
    note: 'Search is two frames, and neither is named for it.' },
  'c-search-item-image': { count: 2, frames: ['Frame 2608967', 'With Prime Time Card'] },
  'c-tabs': { count: 21, frames: ['Details', 'Login- 6', 'Login- 12', 'Session expired', 'Sign Up - 14', 'IDEA'] },
  'c-tabs-item': { count: 22, frames: ['Details', 'Login- 6', 'Session expired', 'Sign Up - 14'] },

  // ---- player
  'c-video-player-buttons': { count: 7, frames: ['Player - Default', 'Player - Rewind', 'Player - Pause', 'Player - Thumbnail', 'Player - Loading', 'Player - Toggle Focus'] },
  'c-toggle': { count: 7, frames: ['Player - Default', 'Player - Rewind', 'Player - Pause', 'Player - Thumbnail', 'Player - Loading', 'Player - Toggle Focus'],
    note: 'Every use is in the player. It is the play-along switch, not a settings control.' },
  'c-player-thumbnail': { count: 2, frames: ['Player - Rewind', 'Player - Thumbnail'] },

  // ---- the game layer, by show
  'c-box-content': { count: 58, frames: ['The 1% Club', 'Match Game', 'Family Feud', 'Card Sharks'],
    note: 'The game layer\'s workhorse — every show uses it.' },
  'c-score-box': { count: 37, frames: ['Match Game', 'The 1% Club - Notification', 'Family Feud', 'Card Sharks'] },
  'c-game-keyboard': { count: 23, frames: ['The 1% Club - Enter Answer', 'The 1% Club - Typing', 'The 1% Club - Digit Input', 'The 1% Club - Letters with Digits', 'The 1% Club - Coordinate Input', 'The 1% Club - Multiselect', 'Match Game', 'Family Feud - Enter Answer'],
    note: 'Its six kinds exist because The 1% Club asks six different ways.' },
  'c-answer-box': { count: 21, frames: ['The 1% Club - Enter Answer', 'The 1% Club - Typing', 'The 1% Club - Submited', 'Match Game', 'Family Feud'] },
  'c-answer-option': { count: 23, frames: ['Match Game - 26', 'Match Game - Celebrity Panel', 'Family Feud - Enter Answer', 'Family Feud - Voice', 'Family Feud - Processing Answer'] },
  'c-status-box': { count: 14, frames: ['The 1% Club - Round Complete!', 'The 1% Club - You Right', 'The 1% Club - Incorrect!', 'Part 1 - Round Complete', 'Fast Money - You Win', 'Fast Money - You Lose', 'Family Feud - Round Complete'] },
  'c-answer-options': { count: 17, frames: ['Family Feud - Enter Answer', 'Family Feud - Voice', 'Family Feud - Processing Answer', 'Part 1 - Fast Money', 'Part 2 - Fast Money', 'Fast Money - You Win'],
    note: 'Family Feud only. It is the survey board.' },
  'c-attempts-box': { count: 11, frames: ['Family Feud - Enter Answer', 'Family Feud - Voice', 'Family Feud - Round Complete', 'Family Feud - Round Lost', 'Family Feud - Round Won'],
    note: 'Family Feud only.' },
  'c-attempt': { count: 9, frames: ['Family Feud - Enter Answer', 'Family Feud - Voice', 'Family Feud - Round Complete', 'Family Feud - Round Lost'] },
  'c-strike-box': { count: 5, frames: ['Family Feud - Enter Answer', 'Family Feud - Voice', 'Family Feud - Processing Answer', 'Family Feud - Keyboard Focus'],
    note: 'Family Feud only — three strikes is that show\'s rule.' },
  'c-higher-lower': { count: 11, frames: ['Card Sharks - 1'], note: 'Card Sharks only, on all eleven of its frames.' },
  'c-card-sharks-question': { count: 11, frames: ['Card Sharks - 1'], note: 'Card Sharks only.' },
  'c-card-box': { count: 5, frames: ['Card Sharks - 4', 'Card Sharks - 5', 'Card Sharks - 9', 'Card Sharks - 10', 'Card Sharks - 11'] },
  'c-hl-note': { count: 3, frames: ['Match Game - 3', 'Card Sharks - 1', 'Card Sharks - 4'],
    note: 'Shown once per game, to teach the remote.' },
  'c-higher-lower-button': { count: 16, frames: ['Match Game - 3', 'Match Game - 10', 'Card Sharks - 1', 'Card Sharks - 2'] },
  'c-keys': { count: 18, frames: ['Match Game - 3', 'Match Game - 10', 'Card Sharks - 1', 'Card Sharks - 7'] },
  'c-notification': { count: 1, frames: ['The 1% Club - Notification - 1'],
    note: 'One frame in the whole file.' },
  'c-stacked-answer': { count: 2, frames: ['Stacked - Final - 1', 'Stacked - Final - 2'] },
  'c-mic': { count: 2, frames: ['Family Feud - Voice - 1', 'Sign Up - 15 - React Native'],
    note: 'Both halves of voice input: answering a question, and dictating an email address.' },

  // ---- identity, rewards, progression
  'c-avatar-tile': { count: 9, frames: ['Progression screen', 'Account - 13', 'Account - 14', 'Account - 18', 'Account - 19', 'Account - 20', 'Account - 21', 'Account - 22 - Avatar with Frame', 'Account - 23'],
    note: 'The avatar picker lives in Account; the Progression screen shows the one that was picked.' },
  'c-avatar-picture': { count: 16, frames: ['Account - 8', 'Account - 9', 'Account - 15', 'Leaderboard - 23', 'Leaderboard - 29'] },
  'c-user-avatar': { count: 16, frames: ['Account - 8', 'Account - 9', 'Account - 15', 'Leaderboard - 23', 'Leaderboard - 29'] },
  'c-reward': { count: 7, frames: ['Leaderboard - 40', 'Leaderboard - 41', 'Leaderboard - 42', 'Leaderboard - 43', 'Leaderboard - 44 - Avatars - Sign In', 'Leaderboard - 45 - Frames with Radio Button', 'Pending - Roku - 1'],
    note: 'Every one of those frames is the Trophy Cabinet. They are named Leaderboard, which is a different, post-MVP feature.' },
  'c-trophies-thumb': { count: 3, frames: ['Leaderboard - 43', 'Leaderboard - 44 - Avatars - Sign In', 'Leaderboard - 45 - Frames with Radio Button'] },
  'c-unlocked-counter': { count: 8, frames: ['Leaderboard - 40', 'Leaderboard - 41', 'Leaderboard - 42', 'Leaderboard - 43', 'Leaderboard - 44', 'Leaderboard - 45', 'Pending - Roku - 1'] },
  'c-selection-radio': { count: 3, frames: ['Leaderboard - 42', 'Leaderboard - 44 - Avatars - First Selected', 'Leaderboard - 45 - Frames with Radio Button'] },
  'c-reward-type-icon': { count: 4, frames: ['Progression screen', 'Progression screen / Last Reward - In Progress', 'Pending - Roku - 1', 'Leaderboard - 44 - Avatars - Sign In'] },
  'c-avatar-label': { count: 4, frames: ['Progression screen', 'Progression screen / Last Reward - In Progress', 'Pending - Roku - 1', 'Leaderboard - 44 - Avatars - Sign In'] },
  'c-reward-track': { count: 3, frames: ['Progression screen', 'Progression screen / Last Reward - In Progress', 'IDEA'] },
  'c-reward-track-first': { count: 1, frames: ['Progression screen'] },
  'c-loading': { count: 1, frames: ['My Progression - Unauthorised - 6'],
    note: 'One frame, and it is the guest\'s progression screen.' },

  // ---- auth
  'c-input': { count: 24, frames: ['Login- 6', 'Login- 12', 'Login- 7', 'Login- 8 - React Native', 'Login- 1 - Roku', 'Session expired - 1', 'Sign Up - 11 (with links)', 'Sign Up - 12', 'Sign Up - Roku - 1', 'Sign Up - Processing'],
    note: 'TV only. The browser screens use Input (Web), which is a different control.' },
  'c-keyboard': { count: 9, frames: ['Sign Up - 15 - React Native', 'Login- 8 - React Native', 'Reset Pass - 3', 'Account - 9', 'Frame 2608966', 'Frame 2608967'] },
  'c-checkbox-message': { count: 2, frames: ['Login- 12', 'Sign Up - Roku - 1 (without links)'],
    note: 'Both uses are Show Password, and one of them is the Roku sign-up.' },
  'c-checkbox': { count: 2, frames: ['Login- 12', 'Sign Up - Roku - 1 (without links)'],
    note: 'Only ever inside Checkbox Message — it is never used on its own.' },
  'c-input-messages': { count: 6, frames: ['Login- 7', 'Sign Up - 12', 'Login- 8 - React Native', 'Account - 15', 'Account - 16', 'Roku - Too many attempts'] },
  'c-input-web': { count: 19, frames: ['Login - 1', 'Login - 2', 'Sign In - Error - 1', 'Sign Up - 1', 'Sign Up - 17', 'Sign Up - 19', 'Sign Up - 20', 'Sign Up - Error - 1', 'Forgot password - Error - 1', 'Loading - 1'],
    note: 'The browser flow, which is a separate set of frames from the TV one.' },
  'c-input-field-web': { count: 19, frames: ['Login - 1', 'Login - 2', 'Sign Up - 1', 'Sign Up - 17', 'Forgot password - Error - 1'] },

  // ---- used nowhere
  'c-reward-unlocked': { count: 0, frames: [],
    note: 'Not placed on any frame. The celebration the whole Spotlight loop builds to exists only as a component.' },
  'c-confetti': { count: 0, frames: [], note: 'Not placed on any frame — the other half of a moment that has no screen.' },
  'c-rail-v': { count: 0, frames: [], note: 'Not placed on any frame. Every rail in the file is horizontal.' },
  'c-section-watch-more': { count: 0, frames: [], note: 'Not placed on any frame — it holds the vertical cards, which are also unused.' },
  'c-logo-text': { count: 0, frames: [], note: 'Not placed on any frame. The plain Logo is on 72.' },
  'c-score-row': { count: 0, frames: [], note: 'Not placed on any frame. Leaderboards are post-MVP, and this is ahead of them.' },
};
