/**
 * Where each component sits on the Figma file's `▣ Library` page.
 *
 * The component card already links to the component's *definition* on
 * `❖ Components`. That is the right place to edit it and the wrong place to
 * look at it: the definition is a bare variant set on a grey canvas, while the
 * Library sheet is where the team reads the component — grouped by section,
 * labelled, next to its neighbours. So the card carries both.
 *
 * Resolved on 2026-10-14 by walking every section of the Library page and
 * matching each instance's main component against the node the catalog already
 * records. Not hand-written, and not guessed:
 *
 *   54 of 64 have a node of their own on the sheet.
 *    7 appear only INSIDE another instance -- `inside` names which, and the
 *      link goes to that container, because an override id is not addressable
 *      from a URL.
 *    3 are not on the sheet at all: Menu, Stacked - Answer and Stacked -
 *      Option. Those get no Library link, which is the honest answer and also
 *      a gap worth closing in the file.
 *
 * Keyed by the same `figma` id the component module carries.
 */
export type LibraryPlace = {
  /** Node id on the Library page, as a URL wants it. */
  node: string;
  /** The Library section it is filed under. */
  section: string;
  /** Set when the component has no node of its own and this is its container. */
  inside?: string;
};

export const LIBRARY: Record<string, LibraryPlace> = {
  // Game UI
  '2565:2733': { node: '2878:15366', section: 'Game UI' },
  '2565:2734': { node: '3192:14090', section: 'Game UI' },
  '2565:2735': { node: '3192:14123', section: 'Game UI' },
  '2565:2732': { node: '3192:14045', section: 'Game UI' },
  '2565:2667': { node: '3192:14158', section: 'Game UI' },
  '2565:2728': { node: '3192:14192', section: 'Game UI' },
  '3750:15695': { node: '4411:15796', section: 'Game UI' },
  '3608:15061': { node: '3192:14090', section: 'Game UI', inside: 'Answer Box' },
  '4689:5985': { node: '3192:14124', section: 'Game UI', inside: 'Score Box' },
  '4709:5407': { node: '3192:14158', section: 'Game UI', inside: 'Attempts Box' },
  '3750:15653': { node: '4411:15796', section: 'Game UI', inside: 'Higher/Lower Note' },

  // Inputs
  '276:2415': { node: '1020:7865', section: 'Inputs' },
  '701:11494': { node: '1209:8378', section: 'Inputs' },
  '1209:8405': { node: '1209:8435', section: 'Inputs' },

  // Icons & Tags
  '629:1861': { node: '1020:8001', section: 'Icons & Tags' },
  '1021:8565': { node: '1021:8751', section: 'Icons & Tags' },

  // Menu
  '772:6953': { node: '772:7076', section: 'Menu', inside: 'Collapsed Menu' },
  '933:7845': { node: '772:7076', section: 'Menu', inside: 'Collapsed Menu' },
  '933:7815': { node: '772:7041', section: 'Menu', inside: 'Expanded Menu' },

  // React Native Keyboard
  '7605:8146': { node: '7605:25389', section: 'React Native Keyboard' },

  // Asset Card
  '629:5141': { node: '1021:9121', section: 'Asset Card' },
  '629:4401': { node: '1021:9207', section: 'Asset Card' },

  // Forms
  '7233:9283': { node: '13976:19040', section: 'Forms' },
  '7909:8736': { node: '13976:19203', section: 'Forms' },
  '10432:15331': { node: '13976:19225', section: 'Forms' },
  '10432:15304': { node: '13976:19248', section: 'Forms' },
  '13305:21383': { node: '13976:19265', section: 'Forms' },
  '867:1808': { node: '13976:19275', section: 'Forms' },
  '596:2669': { node: '13976:19286', section: 'Forms' },

  // Identity
  '10331:31709': { node: '13977:19040', section: 'Identity' },
  '8717:11254': { node: '13977:19101', section: 'Identity' },
  '8408:16678': { node: '13977:19123', section: 'Identity' },
  '13312:22296': { node: '13977:19148', section: 'Identity' },
  '13502:18861': { node: '13977:19161', section: 'Identity' },

  // Rewards
  '13301:20807': { node: '13977:19166', section: 'Rewards' },
  '12458:37894': { node: '13977:19328', section: 'Rewards' },
  '11643:15569': { node: '13977:19357', section: 'Rewards' },
  '13550:43488': { node: '13977:19376', section: 'Rewards' },
  '13550:42728': { node: '13977:19386', section: 'Rewards' },

  // Web
  '9849:13692': { node: '13977:19394', section: 'Web' },
  '9849:13731': { node: '13977:19422', section: 'Web' },

  // Browse & Player
  '8837:11368': { node: '13978:19345', section: 'Browse & Player' },
  '13914:21052': { node: '13978:19435', section: 'Browse & Player' },
  '5022:9521': { node: '13978:19445', section: 'Browse & Player' },
  '473:2980': { node: '13978:19496', section: 'Browse & Player' },
  '5623:18110': { node: '13978:19543', section: 'Browse & Player' },
  '2878:15039': { node: '13978:19574', section: 'Browse & Player' },
  '629:4537': { node: '13978:19581', section: 'Browse & Player' },
  '629:5321': { node: '13978:19632', section: 'Browse & Player' },
  '933:7743': { node: '13978:19764', section: 'Browse & Player' },

  // Game UI — additions
  '3752:15760': { node: '13978:19788', section: 'Game UI — additions' },
  '3749:15334': { node: '13978:19807', section: 'Game UI — additions' },
  '3752:30765': { node: '13978:19888', section: 'Game UI — additions' },
  '3752:30723': { node: '13978:19955', section: 'Game UI — additions' },
  '2565:2663': { node: '13978:19974', section: 'Game UI — additions' },
  '6933:11901': { node: '13978:20018', section: 'Game UI — additions' },
  '9437:15313': { node: '13978:20044', section: 'Game UI — additions' },
  '2565:2660': { node: '13978:20056', section: 'Game UI — additions' },

  // The two sections the sheet itself flags
  '11643:38235': { node: '13978:20065', section: 'Confetti — artwork, not tokenised' },
  '11643:39611': { node: '13978:20671', section: 'Under review — components that may not be components' },
  '13523:20837': { node: '13978:20693', section: 'Under review — components that may not be components' },
};
