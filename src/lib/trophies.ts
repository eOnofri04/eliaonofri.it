// The trophies hidden around the site (see src/scripts/eggs.ts).
// `hint` is shown while a trophy is locked, `desc` once it is earned.
// Order here is the order in the tracker (opened with ? or h, or from the footer).

export type Tier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Trophy {
  id: string;
  title: string;
  tier: Tier;
  hint: string;
  desc: string;
}

// PlayStation values, used for the completion percentage
export const TIER_POINTS: Record<Tier, number> = { bronze: 15, silver: 30, gold: 90, platinum: 300 };

// Visitor levels, by the share of trophy points earned (percent); the last needs them all.
export const LEVELS: [number, string][] = [
  [0, 'Prospective Student'],
  [5, 'Undergraduate'],
  [12, 'M.Sc. Student'],
  [22, 'Ph.D. Candidate'],
  [35, 'Doctor'],
  [50, 'Postdoc'],
  [65, 'Assistant Professor'],
  [80, 'Associate Professor'],
  [100, 'Full Professor'],
];
export const levelOf = (pct: number) => {
  let i = 0;
  while (i + 1 < LEVELS.length && pct >= LEVELS[i + 1][0]) i++;
  return { n: i + 1, title: LEVELS[i][1] };
};

// the sections that count for "Explorer"
export const SECTIONS = ['/', '/research', '/publications', '/teaching', '/gallery', '/software', '/statistics', '/cv'];

export const TROPHIES: Trophy[] = [
  { id: 'explorer', tier: 'silver', title: 'Explorer',
    hint: 'Visit every section of the site.',
    desc: 'Visited every section of the site.' },
  { id: 'bilingual', tier: 'bronze', title: 'Parli italiano?',
    hint: 'Some pages also speak another language.',
    desc: 'Read a page in Italian.' },
  { id: 'lost', tier: 'bronze', title: 'Off the Map',
    hint: 'Wander somewhere that does not exist.',
    desc: 'Found the page that is not there.' },
  { id: 'cryptanalyst', tier: 'silver', title: 'Cryptanalyst',
    hint: 'Break a cipher without pressing the button.',
    desc: 'Decrypted the not-found message by hand.' },
  { id: 'encore', tier: 'bronze', title: 'Encore',
    hint: 'Some gears sing, if you let them.',
    desc: 'Heard the gears click into place.' },
  { id: 'initiative', tier: 'bronze', title: 'Roll for Initiative',
    hint: 'Among the papers, a die is waiting.',
    desc: 'Rolled the d20 on the Publications page.' },
  { id: 'nat1', tier: 'bronze', title: 'Critical Fail',
    hint: 'Roll the worst number there is.',
    desc: 'Rolled a natural 1.' },
  { id: 'nat20', tier: 'silver', title: 'Critical Success',
    hint: 'Roll the best number there is.',
    desc: 'Rolled a natural 20.' },
  { id: 'knight', tier: 'gold', title: 'Knight\'s Tour',
    hint: 'On the collaboration network, the centre moves like a chess piece (N).',
    desc: 'Led the knight over all 64 squares.' },
  { id: 'mate', tier: 'gold', title: 'Mate in Two',
    hint: 'On the CV page, a knight is waiting for an opponent.',
    desc: 'Solved the mate-in-two puzzle on the CV page.' },
  { id: 'ensemble', tier: 'silver', title: 'Ensemble',
    hint: 'With the sound on, the collaboration network can be played. Try a chord.',
    desc: 'Played a chord on the collaboration network.' },
  { id: 'seabed', tier: 'bronze', title: 'Seabed',
    hint: 'Dive to the bottom of a long page.',
    desc: 'Reached the seabed of a long page.' },
  { id: 'safety', tier: 'silver', title: 'Safety Stop',
    hint: 'Coming back up is part of the dive.',
    desc: 'Made a safety stop at 5 m on the way up.' },
  { id: 'exif', tier: 'bronze', title: 'Pixel Peeper',
    hint: 'Photographs carry metadata; so do these figures (i).',
    desc: 'Read the EXIF data of a gallery piece.' },
  { id: 'curator', tier: 'gold', title: 'Curator',
    hint: 'Take a closer look at every piece in the gallery.',
    desc: 'Opened every piece in the gallery.' },
  { id: 'bonfire', tier: 'bronze', title: 'Bonfire Lit',
    hint: 'Rest a while, down at the very bottom.',
    desc: 'Rested at the campfire in the footer.' },
  { id: 'tinkerer', tier: 'bronze', title: 'Tinkerer',
    hint: 'Lift the hood of your browser.',
    desc: 'Called tinker() from the developer console.' },
  { id: 'sudo', tier: 'bronze', title: 'Not in the Sudoers File',
    hint: 'Ask the console for superuser powers.',
    desc: 'Tried sudo() in the console. The incident has been reported.' },
  { id: 'daylight', tier: 'bronze', title: 'Let There Be Light',
    hint: 'Not everyone works in the dark.',
    desc: 'Switched the site to the light theme.' },
  { id: 'stars', tier: 'bronze', title: 'A riveder le stelle',
    hint: 'Come back after dark, with the lights off.',
    desc: '«E quindi uscimmo a riveder le stelle» (Inferno XXXIV, 139): saw the night sky on the home page.' },
  { id: 'konami', tier: 'silver', title: 'Up, Up, Down, Down',
    hint: 'An old cheat code still works here; on a phone, swipe it.',
    desc: 'Entered the Konami code.' },
  { id: 'platinum', tier: 'platinum', title: 'Completionist',
    hint: 'Earn every other trophy.',
    desc: 'Earned every trophy on the site.' },
];
