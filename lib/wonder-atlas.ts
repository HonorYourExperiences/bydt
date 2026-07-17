// Wonder Atlas — the connector between a child's dream and their own town.
// All data is curated and static on purpose: no accounts, no location tracking,
// no external services. The "where exactly" belongs to the family, not to us.

export type QuestRing = "tonight" | "around-town" | "big-day";

export interface Quest {
  title: string;
  description: string;
  where: string; // a kind of place nearly every town has — never a tracked location
  evidence: string; // what the child brings back — the marker
}

export interface Capability {
  name: string;
  meaning: string;
}

export interface Dream {
  slug: string;
  title: string;
  icon: string;
  oneLiner: string;
  translation: string[]; // what this dream actually is, in plain warm language
  capabilities: Capability[];
  outsideYourDoor: string; // something real to notice tonight, free, from home
  quests: Record<QuestRing, Quest[]>;
}

export const RING_LABELS: Record<QuestRing, { label: string; note: string }> = {
  tonight: {
    label: "Tonight",
    note: "Free. Right where you live. No permission slip bigger than a yes.",
  },
  "around-town": {
    label: "Around Town",
    note: "Places almost every town has. Your grown-up picks the exact spot with you.",
  },
  "big-day": {
    label: "A Big Day",
    note: "Worth asking for. Bring your mission card and make the case.",
  },
};

export const DREAMS: Dream[] = [
  {
    slug: "astronaut",
    title: "Astronaut",
    icon: "✧",
    oneLiner: "An explorer who trains body, mind, and courage to visit the sky.",
    translation: [
      "An astronaut is not someone who was born in a rocket. An astronaut is a person who got very good at noticing, checking, practicing, and staying calm — and then kept going until the sky said yes.",
      "Which means the training does not start at a space center. It starts wherever you are, the first night you look up on purpose.",
    ],
    capabilities: [
      { name: "Steady curiosity", meaning: "You keep asking what something is until you actually find out." },
      { name: "Brave patience", meaning: "You can wait, practice, and try again without quitting on yourself." },
      { name: "Careful checking", meaning: "You look twice, measure, and make sure — because it matters." },
      { name: "Crew thinking", meaning: "You help your team breathe easy. Nobody flies alone." },
    ],
    outsideYourDoor:
      "The same sky astronauts study is over your house tonight. The Moon changes shape on a schedule you can catch in about a week of looking. In winter evenings look for Orion's three-star belt; in summer, the bright Summer Triangle. No telescope required — astronauts started with their eyes too.",
    quests: {
      tonight: [
        {
          title: "Start a Moon log",
          description:
            "Same window, same time, four nights. Draw the Moon's shape each night and write one word for the weather. You are now collecting real sky data, which is a real astronaut habit.",
          where: "A window or the front step, with a grown-up nearby",
          evidence: "Four dated Moon drawings",
        },
        {
          title: "Build mission control",
          description:
            "Set up a countdown station: a checklist of five steps for something you do every day (getting ready counts). Run the checklist out loud like a launch. Astronauts trust checklists with their lives.",
          where: "Your room",
          evidence: "One written checklist, run at least twice",
        },
      ],
      "around-town": [
        {
          title: "Library launch pass",
          description:
            "A library card is the cheapest ticket to space there is. Ask the librarian for one true book about astronauts and one about the Moon or stars. Read the true parts out loud to someone.",
          where: "Your public library",
          evidence: "Two facts you didn't know last week, written down",
        },
        {
          title: "Find the darkest safe sky",
          description:
            "With your grown-up, pick the spot in town with the fewest lights — a park, a field, a backyard away from streetlamps. Count how many more stars you can see there than from your door.",
          where: "A park or open field your grown-up chooses",
          evidence: "Two star counts: bright spot vs. dark spot",
        },
      ],
      "big-day": [
        {
          title: "Planetarium or science center day",
          description:
            "Many towns are within reach of a planetarium, a university observatory night, or a science center. Ask your grown-up to help you find the nearest one and pick a date. Bring your Moon log to show you already started.",
          where: "The nearest planetarium, observatory, or science center",
          evidence: "A ticket stub or program, taped into your log",
        },
      ],
    },
  },
  {
    slug: "pilot",
    title: "Pilot",
    icon: "✈",
    oneLiner: "A person the sky trusts, because they practiced until it could.",
    translation: [
      "A pilot is somebody who understands two things deeply: how air holds things up, and how to stay calm and exact when it counts. Both of those can be practiced starting today, with paper.",
      "Every real pilot was once a kid watching something fly and wondering why. The wondering is the first flight lesson.",
    ],
    capabilities: [
      { name: "Exactness", meaning: "Small careful changes — a bent wing tip, a checked dial — change everything." },
      { name: "Calm in the moment", meaning: "You breathe, look at what's true, and do the next right step." },
      { name: "Learning from tests", meaning: "A crash isn't a failure. It's data. You adjust and fly again." },
      { name: "Respect for rules", meaning: "Good rules are how everybody gets home. Pilots love them." },
    ],
    outsideYourDoor:
      "Look up on a clear day and find a contrail — that white line is a jet, probably seven miles up, and you can often see whether the wind up there matches the wind on your street. Watch which way birds take off: into the wind, every time. That's the same rule runways use.",
    quests: {
      tonight: [
        {
          title: "Test flight program",
          description:
            "Fold one paper airplane. Fly it five times from the same spot and mark where it lands each time. Change ONE thing (a fold, a bend, a throw angle). Five more flights. Did your change help? That's flight testing — the real kind.",
          where: "A hallway or the yard",
          evidence: "A landing map with 10 marked landings",
        },
      ],
      "around-town": [
        {
          title: "Airfield fence day",
          description:
            "Many towns have a small municipal airfield where you can safely watch takeoffs from outside the fence with your grown-up. Watch three takeoffs. Notice: which direction? How long a run? Wind sock pointing where?",
          where: "A small local airfield, from the public side",
          evidence: "Three takeoff observations, written or drawn",
        },
        {
          title: "Library flight school",
          description:
            "Ask the librarian for a book on how planes actually fly. Find the word 'lift' and be able to explain it to someone using your hand out a car window (with the window rule your grown-up sets).",
          where: "Your public library",
          evidence: "Your own one-sentence explanation of lift",
        },
      ],
      "big-day": [
        {
          title: "Aviation museum or airshow",
          description:
            "Ask your grown-up to help you find the nearest aviation museum, or watch for an airshow or fly-in pancake breakfast — small airfields host them more often than people think. Bring your landing map.",
          where: "An aviation museum or local airshow",
          evidence: "The name of one aircraft you met in person",
        },
      ],
    },
  },
  {
    slug: "ocean-explorer",
    title: "Ocean Explorer",
    icon: "≈",
    oneLiner: "A student of the biggest wild place on Earth — starting from any creek.",
    translation: [
      "An ocean explorer is a person who studies water and the life in it — and here is the secret: every creek, pond, and rain puddle is connected to the ocean and plays by many of the same rules.",
      "You do not need a coast to begin. You need eyes, patience, and the nearest water your grown-up says is safe.",
    ],
    capabilities: [
      { name: "Quiet watching", meaning: "Wild things show themselves to kids who can hold still." },
      { name: "Field notes", meaning: "Explorers write down what they see, so the seeing counts twice." },
      { name: "Gentle hands", meaning: "You study living things without harming them. That's the explorer's law." },
      { name: "Connected thinking", meaning: "You see how a creek becomes a river becomes the sea." },
    ],
    outsideYourDoor:
      "After the next rain, follow (with permission) where the water in your street wants to go. It's heading to a creek, which is heading to a river, which is heading to the sea. You live upstream of the ocean — which makes you part of its watershed crew already.",
    quests: {
      tonight: [
        {
          title: "Puddle expedition",
          description:
            "After rain, study one puddle for ten whole minutes. What floats, what sinks, what lands on it, what drinks from it? Draw the puddle and label three discoveries. Small water, real science.",
          where: "A puddle near home, grown-up in sight",
          evidence: "One labeled puddle map",
        },
      ],
      "around-town": [
        {
          title: "Creek census",
          description:
            "With your grown-up, visit the nearest safe creek, pond, or lake edge. Sit quietly for ten minutes and count every living thing you notice — bugs, birds, fish shadows, snails. Quiet counts double.",
          where: "A creek, pond, or lake your grown-up picks",
          evidence: "A count of living things, with your best drawing of one",
        },
        {
          title: "Library deep dive",
          description:
            "Ask the librarian for one book about the deep sea and one about the rivers or lakes of your own state. Find one animal that lives near you and one that lives deeper than sunlight goes.",
          where: "Your public library",
          evidence: "Two animals: your neighbor and your deep-sea opposite",
        },
      ],
      "big-day": [
        {
          title: "Aquarium or nature center day",
          description:
            "Ask your grown-up to help you find the nearest aquarium, nature center, or state park with water programs. Rangers and aquarists love real questions — bring two from your creek census.",
          where: "An aquarium, nature center, or state park",
          evidence: "One answer from a real ranger or aquarist, written down",
        },
      ],
    },
  },
  {
    slug: "animal-doctor",
    title: "Animal Doctor",
    icon: "◈",
    oneLiner: "A protector who learned exactly how to help because they cared enough to study.",
    translation: [
      "A veterinarian is a person whose kindness got organized. Loving animals is the start — vets turned that love into careful knowledge: how to notice pain, how to be gentle and exact, how to stay calm so the animal can be calm.",
      "The noticing and the gentleness can be practiced now, on every animal you're lucky enough to meet.",
    ],
    capabilities: [
      { name: "Organized kindness", meaning: "Caring plus knowledge equals actual help." },
      { name: "Reading without words", meaning: "Animals tell you how they feel. You learn their language." },
      { name: "Gentle exactness", meaning: "Soft hands and careful steps, especially when it's hard." },
      { name: "Steady in yuck", meaning: "Real care isn't always cute. You help anyway." },
    ],
    outsideYourDoor:
      "There is a patient waiting outside right now: any bird, squirrel, or bug you can see. Watch one animal for five minutes and ask a vet's first question — 'what is normal for this animal?' You can't spot sick until you know well.",
    quests: {
      tonight: [
        {
          title: "Patient rounds",
          description:
            "Pick one animal you can watch (pet, yard bird, even an ant). Observe for ten minutes and fill out a chart: How does it move? Eat? Rest? What would look different if it felt bad? That chart is a real vet skill called baseline observation.",
          where: "Home or the yard",
          evidence: "One patient chart with four observations",
        },
      ],
      "around-town": [
        {
          title: "Library vet school",
          description:
            "Ask the librarian for a book about how vets work and a field guide to animals of your state. Learn the five animals you're most likely to meet in your own neighborhood.",
          where: "Your public library",
          evidence: "Your top-five neighborhood animal list",
        },
        {
          title: "Shelter or feed store visit",
          description:
            "With your grown-up, visit an animal shelter's public hours or a local feed/pet supply store. Ask one worker: 'What do people get wrong about caring for animals?' Workers know things books don't.",
          where: "An animal shelter or pet supply store, with your grown-up",
          evidence: "One thing people get wrong, in your own words",
        },
      ],
      "big-day": [
        {
          title: "Ask a real vet",
          description:
            "Next time your family's pet (or a relative's or friend's) has a checkup, ask your grown-up if you can come and ask the vet two prepared questions. Vets remember the kids who ask real ones.",
          where: "A veterinary clinic, during a real appointment",
          evidence: "Two questions asked, two answers written down",
        },
      ],
    },
  },
  {
    slug: "chef",
    title: "Chef",
    icon: "❋",
    oneLiner: "A maker whose builds you can eat — part scientist, part artist, part gift-giver.",
    translation: [
      "A chef is a builder who works in flavor. Every dish is a small invention: you plan it, build it, test it, and then — the best part — you hand it to someone and watch their face.",
      "Chef training starts in your own kitchen, tonight, with whatever is already in it.",
    ],
    capabilities: [
      { name: "Mise en place", meaning: "French for 'everything in its place.' Ready before you start — chefs live by it." },
      { name: "Taste and adjust", meaning: "You test, notice what's missing, and fix it. Cooking is honest feedback." },
      { name: "Clean as you go", meaning: "Real chefs leave the station better than they found it." },
      { name: "Feeding people", meaning: "The point isn't the plate. It's the person across from it." },
    ],
    outsideYourDoor:
      "Your kitchen is already a working lab. Tonight, watch water do its three tricks: ice, liquid, steam. Every chef technique — boiling, steaming, chilling — is built on water's moods. You have the same tool the great kitchens have.",
    quests: {
      tonight: [
        {
          title: "The one-snack build",
          description:
            "With permission, build one snack start to finish: plan it on paper, set out everything first (mise en place!), build it, clean your station, then serve it to someone like it matters. Because it does.",
          where: "Your kitchen, with a grown-up's yes",
          evidence: "Your written plan, plus the eater's one-word review",
        },
      ],
      "around-town": [
        {
          title: "Farmers market recon",
          description:
            "If your town has a farmers market (most do, some weeks of the year), walk it with your grown-up. Find one vegetable you can't name and ask the farmer what it is and how they'd cook it. Farmers are chefs' favorite teachers.",
          where: "A farmers market or produce section",
          evidence: "The mystery vegetable's name and the farmer's tip",
        },
        {
          title: "Library cookbook checkout",
          description:
            "Libraries have shelves of cookbooks — free. Pick one from a country you've never visited. Choose one recipe you could imagine making, and read it twice like a builder reads plans.",
          where: "Your public library",
          evidence: "One recipe, chosen and read twice",
        },
      ],
      "big-day": [
        {
          title: "Cook the checked-out recipe",
          description:
            "Ask your grown-up to plan a cooking day for the recipe you chose: shop the ingredients together, prep together, cook it, and serve it to the family. Take a photo of the finished dish for your log.",
          where: "Your kitchen, as a planned family build",
          evidence: "The finished dish, photographed or drawn",
        },
      ],
    },
  },
  {
    slug: "builder",
    title: "Builder",
    icon: "⌂",
    oneLiner: "A person who can look at nothing and see something — then make it stand up.",
    translation: [
      "A builder or engineer is someone who makes ideas hold weight. Not just imagining a bridge — making one that doesn't fall down. The gap between imagining and standing-up is where all the fun lives.",
      "Every tower you stack, test, and fix is the same loop real engineers run: design, build, test, learn, again.",
    ],
    capabilities: [
      { name: "Seeing structure", meaning: "You start noticing what holds things up, everywhere you look." },
      { name: "Test and learn", meaning: "You push on your own work to find the weak spot before the world does." },
      { name: "Material sense", meaning: "You learn what paper, wood, brick, and tape each want to do." },
      { name: "Finish strength", meaning: "You push through the boring middle to the standing-up end." },
    ],
    outsideYourDoor:
      "Every building on your street is answering the same question: what holds me up? Walk one block and find three different answers — walls, posts, arches, triangles. Triangles hide everywhere once you start looking. Builders never stop seeing them.",
    quests: {
      tonight: [
        {
          title: "The paper tower test",
          description:
            "Ten sheets of paper, one hand of tape: build the tallest tower that can hold a cup on top for ten seconds. When it falls — and it should, at least once — find the exact spot that failed and fix only that.",
          where: "Any table",
          evidence: "Final height, and the story of what failed first",
        },
      ],
      "around-town": [
        {
          title: "Bridge hunt",
          description:
            "With your grown-up, find any bridge in town — road, rail, or footbridge. Stand where it's safe and figure out: where does the weight go? Draw the bones of it, not the looks of it.",
          where: "A bridge or overpass, from a safe spot",
          evidence: "One drawing of a bridge's bones",
        },
        {
          title: "Hardware store field trip",
          description:
            "Walk a hardware store's lumber and fastener aisles with your grown-up. Pick the one tool you'd most want to master, and ask a worker what it's really for. Hardware store workers are builders in disguise.",
          where: "A hardware store",
          evidence: "Your chosen tool and its true purpose",
        },
      ],
      "big-day": [
        {
          title: "Build something that stays",
          description:
            "Ask your grown-up to pick a real small build you can do together — a birdhouse, a shelf, a garden box. Plan it on paper first like a real job. Build it. Put your name and the date somewhere on it.",
          where: "Home, garage, or a maker space if your town has one",
          evidence: "A real built thing with your name and date on it",
        },
      ],
    },
  },
];

export function getDream(slug: string): Dream | undefined {
  return DREAMS.find((d) => d.slug === slug);
}
