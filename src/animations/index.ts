import type { AnimationModule } from '../types';

import { AnswerBoard } from './family-feud/answer-board';
import { Attempts }    from './family-feud/attempts';
import { Strikes }     from './family-feud/strikes';
import { Feedback }    from './family-feud/feedback';

import { Score }       from './common/score';

import { Timer }       from './card-sharks/timer';
import { Controller }  from './card-sharks/controller';
import { InfoNote }    from './card-sharks/info-note';
import { Card }        from './card-sharks/card';

import { WrongFlash }       from './win-lose/wrong-flash';
import { ConfettiBurstAnim } from './win-lose/confetti-burst';

export const ANIMATIONS: AnimationModule[] = [
  // Family Feud
  AnswerBoard,
  Attempts,
  Strikes,
  Feedback,

  // Common (shared between Family Feud and Card Sharks)
  Score,

  // Card Sharks
  Timer,
  Controller,
  InfoNote,
  Card,

  // Win / Lose feedback
  WrongFlash,
  ConfettiBurstAnim,
];
