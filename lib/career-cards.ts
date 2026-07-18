// Career WonderCards — powered by O*NET-shaped data, translated through BYDT.
//
// O*NET (the U.S. Department of Labor's occupational database) describes every
// career with a fixed taxonomy: 35 named skills and 5 "Job Zones" (how much
// preparation a career takes). We translate those 40 fixed things into BYDT
// language ONCE, here — and then every career in the dataset, whether the
// starter set below or the full ~900-occupation catalog produced by
// scripts/fetch-onet.mjs, flows through these translations automatically.
//
// The career description itself stays in "grown-up words" on purpose:
// the child translates it into their own words on the card they make.

import careersJson from "@/data/onet/careers.json";

export interface CareerRecord {
  code: string; // O*NET-SOC code, e.g. "19-2011.00"
  title: string;
  description: string; // O*NET's own words — shown as "in grown-up words"
  jobZone: number; // 1-5
  skills: string[]; // names from the 35-skill O*NET taxonomy, most important first
  cluster: string;
}

export interface SkillTranslation {
  kidName: string; // the power's name, in BYDT language
  meaning: string; // what it actually is
  tonight: string; // one way to start training it tonight, free
}

// The 35 O*NET skills, translated into trainable powers.
export const SKILL_POWERS: Record<string, SkillTranslation> = {
  "Reading Comprehension": {
    kidName: "Deep Reading",
    meaning: "Reading something and actually catching what it means, not just the words.",
    tonight: "Read one page of anything, then tell someone what it said without looking.",
  },
  "Active Listening": {
    kidName: "Whole-Body Listening",
    meaning: "Listening so well the other person feels understood.",
    tonight: "At dinner, ask one question and listen to the whole answer without planning yours.",
  },
  Writing: {
    kidName: "Putting It in Ink",
    meaning: "Getting what's in your head onto paper so someone else can catch it.",
    tonight: "Write three sentences about the best thing that happened today.",
  },
  Speaking: {
    kidName: "Saying It Clear",
    meaning: "Explaining things out loud so people actually get it.",
    tonight: "Explain how to make your favorite snack, out loud, step by step, to anyone who'll listen.",
  },
  Mathematics: {
    kidName: "Number Sense",
    meaning: "Using numbers to figure out real things.",
    tonight: "Estimate something (steps to your room, spoons in the drawer), then count to check.",
  },
  Science: {
    kidName: "Testing the World",
    meaning: "Asking the world a question and setting up a fair way to get the answer.",
    tonight: "Ask one 'I wonder' question, guess the answer, then find a way to check.",
  },
  "Critical Thinking": {
    kidName: "Thinking It Through",
    meaning: "Checking whether an idea actually holds up before you trust it.",
    tonight: "Pick one thing you heard today and ask: how would I know if that's true?",
  },
  "Active Learning": {
    kidName: "Learning on Purpose",
    meaning: "Grabbing new information and immediately putting it to work.",
    tonight: "Learn one new fact, then use it in a sentence to someone within the hour.",
  },
  "Learning Strategies": {
    kidName: "Learning How You Learn",
    meaning: "Noticing which way of practicing works best for you, and using it.",
    tonight: "Try learning the same small thing two ways (drawing it, saying it). Which stuck?",
  },
  Monitoring: {
    kidName: "Checking the Gauges",
    meaning: "Noticing how it's going — for you and your team — while it's still happening.",
    tonight: "Halfway through a chore or game, stop for ten seconds and ask: is this working?",
  },
  "Social Perceptiveness": {
    kidName: "Reading the Room",
    meaning: "Noticing how people feel, sometimes before they say it.",
    tonight: "Watch for one person who seems quieter than usual, and check on them kindly.",
  },
  Coordination: {
    kidName: "Moving Together",
    meaning: "Fitting your work in with other people's so the whole thing flows.",
    tonight: "Do one two-person job (dishes, folding) and match your rhythm to theirs.",
  },
  Persuasion: {
    kidName: "Making the Case",
    meaning: "Helping people see why an idea is worth a yes.",
    tonight: "Pick something small you want, and give your grown-up two honest reasons — not begging, reasons.",
  },
  Negotiation: {
    kidName: "Finding the Fair Deal",
    meaning: "Working out a trade where both sides feel okay about it.",
    tonight: "Next disagreement over the remote or a toy, propose a deal that gives both sides something.",
  },
  Instructing: {
    kidName: "Teaching It Forward",
    meaning: "Showing someone how to do a thing so they can do it without you.",
    tonight: "Teach someone one thing you're good at, then watch them do it solo.",
  },
  "Service Orientation": {
    kidName: "Looking for Ways to Help",
    meaning: "Spotting what someone needs before they have to ask.",
    tonight: "Find one thing that would help someone at home and do it without being asked.",
  },
  "Complex Problem Solving": {
    kidName: "Untangling Big Knots",
    meaning: "Taking a messy problem apart into pieces you can actually solve.",
    tonight: "Pick one annoying problem at home and list three different ways it could be fixed.",
  },
  "Operations Analysis": {
    kidName: "Figuring Out What's Needed",
    meaning: "Working out what a thing must do before you build it.",
    tonight: "Before your next build or drawing, write down three things it has to do to count as done.",
  },
  "Technology Design": {
    kidName: "Inventing the Tool",
    meaning: "Changing or creating tools so they work better for real people.",
    tonight: "Find one tool at home that's annoying to use and sketch how you'd fix it.",
  },
  "Equipment Selection": {
    kidName: "Picking the Right Tool",
    meaning: "Knowing which tool fits which job — before you start.",
    tonight: "For one task tonight, lay out everything you need first. Did you pick right?",
  },
  Installation: {
    kidName: "Setting Things Up",
    meaning: "Putting equipment together so it works the way it should.",
    tonight: "Set up something properly — a board game, a charging spot — following the right order.",
  },
  Programming: {
    kidName: "Teaching Machines",
    meaning: "Writing exact instructions a computer can follow.",
    tonight: "Write instructions for making toast SO exact that a robot couldn't mess it up. Have someone follow them literally.",
  },
  "Operations Monitoring": {
    kidName: "Watching the Dials",
    meaning: "Reading the signs a machine or process gives you while it runs.",
    tonight: "Watch something work (a dishwasher, a microwave, a game loading) and list every signal it gives you.",
  },
  "Operation and Control": {
    kidName: "Steady Hands on the Controls",
    meaning: "Running equipment smoothly, with small careful adjustments.",
    tonight: "Practice one smooth-control skill: pour water to an exact line without spilling, three times.",
  },
  "Equipment Maintenance": {
    kidName: "Keeping Things Ready",
    meaning: "Taking care of tools before they break, not after.",
    tonight: "Pick one thing you use daily (bike, pencil case, glove) and get it clean and ready.",
  },
  Troubleshooting: {
    kidName: "Finding What's Wrong",
    meaning: "Following the clues from 'it's broken' to 'here's exactly why.'",
    tonight: "Next time something won't work, make two guesses why before asking for help — then test them.",
  },
  Repairing: {
    kidName: "Making It Work Again",
    meaning: "Fixing what's broken with the right tools and patience.",
    tonight: "Fix one small broken thing (loose screw, torn page, stuck zipper) with a grown-up's ok.",
  },
  "Quality Control Analysis": {
    kidName: "The Careful Check",
    meaning: "Testing work against a standard to make sure it's actually good.",
    tonight: "After your next chore, inspect it like a judge: what grade does it honestly get?",
  },
  "Judgment and Decision Making": {
    kidName: "Weighing It Out",
    meaning: "Comparing what each choice costs and gives before you pick.",
    tonight: "For one real choice tonight, say out loud what you gain and lose with each option first.",
  },
  "Systems Analysis": {
    kidName: "Seeing How It All Connects",
    meaning: "Understanding how the parts of a thing affect each other.",
    tonight: "Pick something at home (dinner, laundry) and trace every step it takes from start to done.",
  },
  "Systems Evaluation": {
    kidName: "Judging the Machine",
    meaning: "Measuring whether a whole system is doing its real job — and what would make it better.",
    tonight: "Rate your morning routine 1-10 for 'gets me out the door calm.' What one change raises the score?",
  },
  "Time Management": {
    kidName: "Owning the Clock",
    meaning: "Spending your time on purpose instead of losing it.",
    tonight: "Guess how long your homework or chore will take, time it, and see how close you were.",
  },
  "Management of Financial Resources": {
    kidName: "Making Money Behave",
    meaning: "Deciding where money should go so it does the most good.",
    tonight: "Plan how you'd spend $20 to make the best Saturday for your whole family. Defend the plan.",
  },
  "Management of Material Resources": {
    kidName: "Commanding the Supplies",
    meaning: "Getting the right stuff to the right place at the right time.",
    tonight: "Pack everything you need for tomorrow, tonight — nothing missing, nothing extra.",
  },
  "Management of Personnel Resources": {
    kidName: "Leading the Crew",
    meaning: "Helping each person on a team do what they're best at.",
    tonight: "Next family or group task, suggest who does what — matched to what each person's good at.",
  },
};

// The 5 O*NET Job Zones — "how you build toward it," translated.
export const BUILD_PATHS: Record<number, { label: string; meaning: string }> = {
  1: {
    label: "Jump-In Path",
    meaning: "You can start this one mostly by doing it. A little showing-how, then real work teaches you the rest.",
  },
  2: {
    label: "High School + Practice Path",
    meaning: "Finish high school, then learn on the job or in a short training. Effort counts more than fancy schooling here.",
  },
  3: {
    label: "Training Path",
    meaning: "After high school comes focused training — an apprenticeship, a certificate, or some college. You earn it by practicing the real skill.",
  },
  4: {
    label: "College Path",
    meaning: "This one usually takes a four-year college degree. That's not a wall — it's a long staircase, and you can start on the first step now.",
  },
  5: {
    label: "Deep-Study Path",
    meaning: "College plus more school after — like doctors, professors, and veterinarians. The longest path, walked by ordinary people who kept going.",
  },
};

// Career code -> Wonder Atlas dream slug. Careers with a hand-built town map
// in the Atlas link straight to it; everything else gets cluster-level
// near-you hints from NEAR_YOU below.
export const ATLAS_CROSSWALK: Record<string, string> = {
  "19-2011.00": "astronaut",
  "17-2011.00": "astronaut",
  "53-2011.00": "pilot",
  "19-2021.00": "pilot",
  "29-1131.00": "animal-doctor",
  "29-2056.00": "animal-doctor",
  "39-2011.00": "animal-doctor",
  "19-1023.00": "ocean-explorer",
  "19-1031.00": "ocean-explorer",
  "53-5021.00": "ocean-explorer",
  "35-1011.00": "chef",
  "47-2031.00": "builder",
  "17-2051.00": "builder",
  "17-1011.00": "builder",
  "49-3023.00": "builder",
  "49-9081.00": "builder",
};

// Cluster -> kinds of places nearly every town has where this world shows
// itself. Curated once per cluster, so every career in the catalog gets a
// local layer automatically — same scaling move as the skill translations.
// Kinds of places only, never tracked locations: the family picks the spot.
export const NEAR_YOU: Record<string, string[]> = {
  "Sky, Sea & Space": [
    "The darkest safe sky your grown-up knows — a park or field away from streetlights.",
    "A small local airfield fence, a riverbank, or a harbor — anywhere machines meet sky or water.",
    "The library's space, flight, and weather shelves. A library card is the cheapest ticket there is.",
  ],
  "Animals & Nature": [
    "An animal shelter's public hours, a feed store, or a vet clinic's waiting room with your grown-up.",
    "The nearest creek, pond, park, or trail — wild things live closer than you think.",
    "A nature center, a farmers market's animal folks, or the library's field guides to your own state.",
  ],
  "Building & Making": [
    "A hardware store's lumber and tool aisles — builders in disguise work there.",
    "Any bridge, construction fence, or building site you can watch from a safe public spot.",
    "A maker space, repair shop, or the library's how-it's-made shelf.",
  ],
  "Helping & Healing": [
    "A fire station's open house, a blood drive, or a first-aid class your grown-up signs up for.",
    "Your school nurse, your own doctor's office — helpers love a kid with real questions.",
    "The library's people-who-help shelf, or volunteering somewhere kind with your family.",
  ],
  "Rescue & Protection": [
    "A fire or police station open house — most towns hold them, and they love young visitors.",
    "A community safety day, parade, or emergency vehicle up close at a town event.",
    "The library's shelf on brave work, and a family talk about what to do when things go wrong.",
  ],
  "Art & Story": [
    "A local gallery, mural, theater, or open mic — art is hiding all over your town.",
    "The library, which is a free museum of every story ever told.",
    "A community class, choir, or school production — the door into making, not just watching.",
  ],
  "Teaching & Story": [
    "Your own school, seen with new eyes: teachers are doing a craft, and you can study it.",
    "The library's story hours and the librarians who run them.",
    "A museum docent, a coach, a scout leader — notice how the good ones make you want to learn.",
  ],
  "Food & Growing": [
    "A farmers market — farmers and bakers are the friendliest teachers in town.",
    "Your own kitchen, plus a grocery store walked slowly, aisle by aisle, like a lab.",
    "A community garden, an orchard, or the library's cookbook shelf from around the world.",
  ],
  "Computers & Invention": [
    "The library — many lend laptops, run coding clubs, or host maker hours.",
    "A school robotics or coding club, or a family friend who works with computers.",
    "Any machine at home you're allowed to study: what does it do, and how would you make it better?",
  ],
  "Science & Discovery": [
    "A science center, planetarium, or university open house within a big-day drive.",
    "Your backyard, a puddle, the night sky — real science starts with free things.",
    "The library's true-books shelves, and a grown-up who'll say 'let's find out' with you.",
  ],
  "Leading & Planning": [
    "A town council meeting, a school board night, or any place grown-ups decide things together.",
    "A team, club, or family project you could help organize this month.",
    "The library's biographies of people who built things bigger than themselves.",
  ],
  "Business & Money": [
    "A local shop whose owner will tell you how it really works — most will, if you ask kindly.",
    "A lemonade stand, bake sale, or yard sale of your own, run like you mean it.",
    "The bank with your grown-up, and the library's shelf on how money works.",
  ],
  "Law & Fairness": [
    "A courthouse's public gallery with your grown-up — real decisions, made out loud.",
    "A school debate, student council, or anywhere rules get made and argued fairly.",
    "The library's shelf on rights, rules, and the people who fought to make things fair.",
  ],
  "People & Service": [
    "Anywhere in town where someone makes your day better — notice the craft in it.",
    "A volunteer afternoon with your family: a food pantry, a park cleanup, a visit that matters.",
    "The library, the rec center, the front desks of your town — service is everywhere once you look.",
  ],
  "Wide World of Work": [
    "The library — start at the front desk and say what you're curious about.",
    "Someone your family knows who does work like this. Most people love being asked about their craft.",
    "Your own town, walked slowly: this work is happening closer than you think.",
  ],
};

export const CAREERS: CareerRecord[] = careersJson as CareerRecord[];

export function careersForDream(dreamSlug: string): CareerRecord[] {
  return CAREERS.filter((c) => ATLAS_CROSSWALK[c.code] === dreamSlug);
}

export function getCareer(code: string): CareerRecord | undefined {
  return CAREERS.find((c) => c.code === code);
}

// O*NET-SOC codes contain dots; keep URLs clean.
export function careerSlug(code: string): string {
  return code.replace(".", "-");
}

export function careerFromSlug(slug: string): CareerRecord | undefined {
  return getCareer(slug.replace(/-(\d{2})$/, ".$1"));
}
