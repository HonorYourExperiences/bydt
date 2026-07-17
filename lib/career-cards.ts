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

export const CAREERS: CareerRecord[] = careersJson as CareerRecord[];

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
