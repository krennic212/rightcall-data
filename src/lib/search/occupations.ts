export type OccupationDef = {
  category: string;
  label: string;
  keywords: string[];
  /** Also match the employer field (local shops: "Joe's Roofing", "City Florist"). */
  matchEmployer?: boolean;
};

export const OCCUPATIONS: OccupationDef[] = [
  { category: "dentist", label: "Dentist", keywords: [
      "dentist",
      "dentistry",
      "dental",
      "orthodontist",
      "orthodontic",
      "endodontist",
      "periodontist",
      "prosthodontist",
      "oral surgeon",
      "dds",
      "dmd",
    ], matchEmployer: true },
  { category: "chiropractor", label: "Chiropractor", keywords: ["chiropractor", "chiropractic"] },
  { category: "veterinarian", label: "Veterinarian", keywords: ["veterinarian", "veterinary", "vet"] },
  { category: "optometrist", label: "Optometrist", keywords: ["optometrist", "optometry"] },
  { category: "ophthalmologist", label: "Ophthalmologist", keywords: ["ophthalmologist"] },
  { category: "pharmacist", label: "Pharmacist", keywords: ["pharmacist", "pharmacy"] },
  { category: "psychologist", label: "Psychologist", keywords: ["psychologist"] },
  { category: "psychiatrist", label: "Psychiatrist", keywords: ["psychiatrist"] },
  { category: "pediatrician", label: "Pediatrician", keywords: ["pediatrician", "pediatric"] },
  { category: "dermatologist", label: "Dermatologist", keywords: ["dermatologist", "dermatology"] },
  { category: "anesthesiologist", label: "Anesthesiologist", keywords: ["anesthesiologist"] },
  { category: "cardiologist", label: "Cardiologist", keywords: ["cardiologist"] },
  { category: "oncologist", label: "Oncologist", keywords: ["oncologist"] },
  { category: "orthopedist", label: "Orthopedist", keywords: ["orthopedist", "orthopedic"] },
  { category: "radiologist", label: "Radiologist", keywords: ["radiologist"] },
  { category: "urologist", label: "Urologist", keywords: ["urologist"] },
  { category: "neurologist", label: "Neurologist", keywords: ["neurologist"] },
  { category: "obgyn", label: "OB-GYN", keywords: ["obgyn", "ob-gyn", "ob/gyn", "obstetrician", "gynecologist"] },
  { category: "podiatrist", label: "Podiatrist", keywords: ["podiatrist"] },
  {
    category: "physician",
    label: "Physician",
    keywords: ["physician", "doctor", "surgeon", "md", "family doctor", "family medicine"],
  },
  { category: "attorney", label: "Attorney", keywords: ["attorney", "lawyer", "counsel", "esquire", "esq", "litigator"], matchEmployer: true },
  { category: "realtor", label: "Realtor", keywords: ["real estate broker", "real estate agent", "realtor", "realty", "real estate"], matchEmployer: true },
  { category: "accountant", label: "Accountant", keywords: ["accountant", "cpa", "bookkeeper"], matchEmployer: true },
  { category: "financial_advisor", label: "Financial advisor", keywords: ["financial advisor", "financial planner"], matchEmployer: true },
  { category: "insurance", label: "Insurance agent", keywords: ["insurance agent", "insurance broker", "insurance"], matchEmployer: true },
  { category: "plumber", label: "Plumber", keywords: ["plumbing contractor", "master plumber", "plumber", "plumbing"], matchEmployer: true },
  { category: "electrician", label: "Electrician", keywords: ["electrical contractor", "master electrician", "electrician"], matchEmployer: true },
  { category: "hvac", label: "HVAC", keywords: ["hvac contractor", "hvac"], matchEmployer: true },
  { category: "architect", label: "Architect", keywords: ["architect"] },
  { category: "contractor", label: "Contractor", keywords: ["contractor", "general contractor"], matchEmployer: true },
  {
    category: "roofer",
    label: "Roofer",
    keywords: ["roofing contractor", "metal roofing", "roof contractor", "roof company", "roofer", "roofing"],
    matchEmployer: true,
  },
  {
    category: "carpenter",
    label: "Carpenter",
    keywords: ["carpenter", "carpentry", "cabinet maker", "cabinetmaker", "millwork"],
  },
  { category: "welder", label: "Welder", keywords: ["welder", "welding", "fabricator"] },
  {
    category: "mechanic",
    label: "Mechanic",
    keywords: [
      "automotive technician",
      "auto technician",
      "auto mechanic",
      "service technician",
      "auto tech",
      "mechanic",
    ],
    matchEmployer: true,
  },
  { category: "machinist", label: "Machinist", keywords: ["machinist"] },
  {
    category: "painter",
    label: "Painter",
    keywords: ["painter", "painting contractor", "house painter"],
    matchEmployer: true,
  },
  {
    category: "mason",
    label: "Mason",
    keywords: ["bricklayer", "masonry", "concrete contractor", "stone mason"],
  },
  { category: "drywall", label: "Drywall", keywords: ["drywall"], matchEmployer: true },
  {
    category: "flooring",
    label: "Flooring",
    keywords: ["flooring", "tile setter", "tilesetter", "carpet installer"],
    matchEmployer: true,
  },
  {
    category: "landscaper",
    label: "Landscaper",
    keywords: [
      "landscape contractor",
      "landscape design",
      "landscape designer",
      "lawn maintenance",
      "lawn mowing",
      "lawn service",
      "lawn care",
      "groundskeeper",
      "horticulturist",
      "landscaper",
      "landscaping",
      "irrigation",
      "sprinkler",
      "gardener",
      "grounds",
      "lawn",
    ],
    matchEmployer: true,
  },
  {
    category: "trucker",
    label: "Trucker",
    keywords: ["trucker", "truck driver", "truck owner", "trucking"],
  },
  {
    category: "farmer",
    label: "Farmer",
    keywords: ["farmer", "farming", "rancher", "ranch owner", "cattle rancher", "agriculture"],
  },
  { category: "logger", label: "Logger", keywords: ["logger", "logging"] },
  { category: "lineman", label: "Lineman", keywords: ["lineman", "lineworker", "line worker"] },
  {
    category: "oilfield",
    label: "Oilfield",
    keywords: ["oilfield", "roughneck", "toolpusher", "tool pusher"],
  },
  {
    category: "florist",
    label: "Florist",
    keywords: ["florist", "floral designer", "flower shop", "floral shop"],
    matchEmployer: true,
  },
  {
    category: "restaurant",
    label: "Restaurant",
    keywords: [
      "restaurant owner",
      "restaurateur",
      "restauranteur",
      "chef owner",
      "steakhouse",
      "barbecue",
      "bistro",
      "trattoria",
      "ristorante",
      "restaurant",
      "chef",
      "caterer",
      "catering",
      "pizzeria",
      "tavern",
      "bartender",
      "bar owner",
      "food truck",
      "coffee shop",
      "cafe owner",
      "ice cream",
      "donut shop",
      "doughnut",
      "diner",
    ],
    matchEmployer: true,
  },
  { category: "baker", label: "Baker", keywords: ["baker", "bakery", "pastry chef"] },
  {
    category: "barber",
    label: "Barber",
    keywords: ["barber", "hair stylist", "hairstylist", "cosmetologist", "beautician", "salon owner"],
  },
  {
    category: "auto_shop",
    label: "Auto shop",
    keywords: [
      "automotive repair",
      "auto repair",
      "car repair",
      "auto body",
      "body shop",
      "tire shop",
      "auto shop",
      "auto care",
      "car dealer",
      "auto dealer",
      "dealership",
      "auto group",
      "oil change",
      "transmission shop",
      "brake shop",
      "muffler shop",
      "european auto",
      "import auto",
      "auto garage",
    ],
    matchEmployer: true,
  },
  { category: "towing", label: "Towing", keywords: ["towing", "tow truck"], matchEmployer: true },
  {
    category: "pest",
    label: "Pest control",
    keywords: ["pest control", "exterminator", "exterminating"],
    matchEmployer: true,
  },
  { category: "locksmith", label: "Locksmith", keywords: ["locksmith"], matchEmployer: true },
  { category: "handyman", label: "Handyman", keywords: ["handyman", "handyman service"] },
  {
    category: "cleaner",
    label: "Cleaning service",
    keywords: ["janitorial", "cleaning service", "maid service", "house cleaner"],
    matchEmployer: true,
  },
  {
    category: "daycare",
    label: "Daycare",
    keywords: ["daycare", "day care", "child care", "childcare"],
    matchEmployer: true,
  },
  {
    category: "hotel",
    label: "Hotel owner",
    keywords: ["hotel owner", "motel owner", "innkeeper", "inn keeper"],
  },
  { category: "grocer", label: "Grocer", keywords: ["grocer", "grocery", "supermarket"] },
  { category: "butcher", label: "Butcher", keywords: ["butcher", "meat market"] },
  {
    category: "brewery",
    label: "Brewer",
    keywords: ["brewer", "brewery", "distiller", "distillery", "winery", "vintner"],
    matchEmployer: true,
  },
  { category: "photographer", label: "Photographer", keywords: ["photographer", "photography"] },
  {
    category: "funeral",
    label: "Funeral director",
    keywords: ["funeral director", "mortician", "undertaker", "funeral home"],
    matchEmployer: true,
  },
  {
    category: "pool",
    label: "Pool service",
    keywords: [
      "pool contractor",
      "pool technician",
      "swimming pool",
      "pool service",
      "pool cleaner",
      "pool builder",
      "pool company",
      "hot tub",
      "pool tech",
      "pool",
    ],
    matchEmployer: true,
  },
  {
    category: "tree",
    label: "Tree service",
    keywords: [
      "tree service",
      "tree removal",
      "tree trimming",
      "stump grinding",
      "tree surgeon",
      "tree care",
      "arborist",
    ],
    matchEmployer: true,
  },
  {
    category: "fence",
    label: "Fence contractor",
    keywords: ["fence contractor", "fencing contractor", "fence company", "fence installer", "fencing"],
    matchEmployer: true,
  },
  {
    category: "gutter",
    label: "Gutter",
    keywords: ["gutter installer", "rain gutter", "gutter company", "gutters", "gutter"],
    matchEmployer: true,
  },
  {
    category: "garage_door",
    label: "Garage door",
    keywords: ["garage door"],
    matchEmployer: true,
  },
  {
    category: "siding",
    label: "Siding",
    keywords: ["siding contractor", "vinyl siding", "siding"],
    matchEmployer: true,
  },
  {
    category: "window",
    label: "Windows",
    keywords: ["window installer", "replacement window", "window replacement", "window company"],
    matchEmployer: true,
  },
  {
    category: "solar",
    label: "Solar installer",
    keywords: ["solar installer", "solar contractor", "solar company", "solar"],
    matchEmployer: true,
  },
  {
    category: "paving",
    label: "Paving",
    keywords: ["paving contractor", "asphalt", "blacktop", "paving"],
    matchEmployer: true,
  },
  {
    category: "excavation",
    label: "Excavation",
    keywords: ["excavation", "excavator", "demolition", "grading contractor"],
    matchEmployer: true,
  },
  {
    category: "septic",
    label: "Septic",
    keywords: ["septic", "portable toilet", "porta potty"],
    matchEmployer: true,
  },
  {
    category: "restoration",
    label: "Restoration",
    keywords: ["water damage", "mold remediation", "fire restoration", "restoration contractor", "servpro"],
    matchEmployer: true,
  },
  {
    category: "junk",
    label: "Junk removal",
    keywords: ["junk removal", "junk hauling", "junk"],
    matchEmployer: true,
  },
  {
    category: "chimney",
    label: "Chimney",
    keywords: ["chimney sweep", "chimney"],
    matchEmployer: true,
  },
  {
    category: "pressure_wash",
    label: "Pressure washing",
    keywords: ["pressure washing", "power washing", "window washing", "pressure washer"],
    matchEmployer: true,
  },
  {
    category: "carpet_clean",
    label: "Carpet cleaning",
    keywords: ["carpet cleaning", "carpet cleaner", "chem-dry", "chemdry"],
    matchEmployer: true,
  },
  {
    category: "appliance",
    label: "Appliance repair",
    keywords: ["appliance repair", "appliance technician", "appliance"],
    matchEmployer: true,
  },
  {
    category: "glass",
    label: "Auto glass",
    keywords: ["auto glass", "windshield", "glazier"],
    matchEmployer: true,
  },
  {
    category: "countertop",
    label: "Countertops",
    keywords: ["countertop", "granite", "quartz", "marble"],
    matchEmployer: true,
  },
  {
    category: "upholstery",
    label: "Upholstery",
    keywords: ["upholstery", "upholsterer"],
    matchEmployer: true,
  },
  {
    category: "small_engine",
    label: "Small engine",
    keywords: ["small engine", "lawn mower repair", "outdoor power"],
    matchEmployer: true,
  },
  {
    category: "mover",
    label: "Mover",
    keywords: ["moving company", "movers", "mover"],
    matchEmployer: true,
  },
  {
    category: "storage",
    label: "Storage",
    keywords: ["self storage", "mini storage", "self-storage"],
    matchEmployer: true,
  },
  {
    category: "car_wash",
    label: "Car wash",
    keywords: ["car wash", "auto detailing", "mobile detailing", "detailer"],
    matchEmployer: true,
  },
  {
    category: "tutor",
    label: "Tutor",
    keywords: ["private tutor", "tutoring", "test prep", "mathnasium", "kumon", "tutor"],
    matchEmployer: true,
  },
  {
    category: "music_teacher",
    label: "Music teacher",
    keywords: ["piano teacher", "guitar teacher", "music teacher", "voice teacher", "violin teacher"],
    matchEmployer: true,
  },
  {
    category: "driving",
    label: "Driving school",
    keywords: ["driving school", "driving instructor"],
    matchEmployer: true,
  },
  {
    category: "gym",
    label: "Gym / trainer",
    keywords: [
      "personal trainer",
      "fitness trainer",
      "martial arts",
      "yoga studio",
      "gym owner",
      "crossfit",
      "pilates",
      "karate",
      "taekwondo",
      "jiu jitsu",
      "jiujitsu",
    ],
    matchEmployer: true,
  },
  {
    category: "pet",
    label: "Pet care",
    keywords: [
      "pet groomer",
      "dog groomer",
      "dog trainer",
      "pet boarding",
      "pet store",
      "dog walker",
      "pet sitter",
      "kennel",
    ],
    matchEmployer: true,
  },
  {
    category: "nail",
    label: "Nail salon",
    keywords: ["nail salon", "nail technician", "manicurist", "pedicurist", "esthetician"],
    matchEmployer: true,
  },
  {
    category: "massage",
    label: "Massage",
    keywords: ["massage therapist", "massage", "day spa"],
    matchEmployer: true,
  },
  {
    category: "tattoo",
    label: "Tattoo",
    keywords: ["tattoo artist", "tattoo shop", "tattoo studio", "tattoo"],
    matchEmployer: true,
  },
  {
    category: "dry_cleaner",
    label: "Dry cleaner",
    keywords: ["dry cleaner", "dry cleaning", "laundromat", "alterations", "tailor"],
    matchEmployer: true,
  },
  {
    category: "jeweler",
    label: "Jeweler",
    keywords: ["jeweler", "jewelry store", "watchmaker", "jewelry"],
    matchEmployer: true,
  },
  {
    category: "print",
    label: "Print / signs",
    keywords: ["print shop", "screen print", "embroidery", "sign shop", "sign company"],
    matchEmployer: true,
  },
  {
    category: "nursery",
    label: "Garden center",
    keywords: ["garden center", "plant nursery", "nursery owner"],
    matchEmployer: true,
  },
  {
    category: "furniture",
    label: "Furniture",
    keywords: ["furniture store", "mattress store", "furniture"],
    matchEmployer: true,
  },
  {
    category: "hardware",
    label: "Hardware store",
    keywords: ["hardware store", "lumber yard"],
    matchEmployer: true,
  },
  {
    category: "liquor",
    label: "Liquor store",
    keywords: ["liquor store", "wine shop", "package store"],
    matchEmployer: true,
  },
  {
    category: "boat",
    label: "Marine",
    keywords: ["boat repair", "marine mechanic", "marina"],
    matchEmployer: true,
  },
  {
    category: "security",
    label: "Security / alarms",
    keywords: ["alarm company", "security system", "alarm installer"],
    matchEmployer: true,
  },
  {
    category: "home_care",
    label: "Home care",
    keywords: ["home care", "caregiver", "home health"],
    matchEmployer: true,
  },
  {
    category: "wedding",
    label: "Events",
    keywords: ["wedding planner", "event planner", "party rental", "disc jockey"],
    matchEmployer: true,
  },
  {
    category: "gun",
    label: "Gun shop",
    keywords: ["gun shop", "gunsmith", "firearms dealer", "ffl"],
    matchEmployer: true,
  },
  {
    category: "acupuncture",
    label: "Acupuncturist",
    keywords: ["acupuncturist", "acupuncture"],
  },
];

export const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  OCCUPATIONS.map((item) => [item.category, item.label]),
);

const OCC_BY_CATEGORY = new Map(OCCUPATIONS.map((item) => [item.category, item]));

const TRADE_FROM_OCC = new Set([
  "roofer",
  "carpenter",
  "welder",
  "mechanic",
  "machinist",
  "painter",
  "mason",
  "drywall",
  "flooring",
  "landscaper",
  "trucker",
  "farmer",
  "logger",
  "lineman",
  "oilfield",
  "florist",
  "restaurant",
  "baker",
  "barber",
  "auto_shop",
  "towing",
  "pest",
  "locksmith",
  "handyman",
  "cleaner",
  "daycare",
  "hotel",
  "grocer",
  "butcher",
  "brewery",
  "photographer",
  "funeral",
  "plumber",
  "electrician",
  "hvac",
  "contractor",
  "pool",
  "tree",
  "fence",
  "gutter",
  "garage_door",
  "siding",
  "window",
  "solar",
  "paving",
  "excavation",
  "septic",
  "restoration",
  "junk",
  "chimney",
  "pressure_wash",
  "carpet_clean",
  "appliance",
  "glass",
  "countertop",
  "upholstery",
  "small_engine",
  "mover",
  "storage",
  "car_wash",
  "tutor",
  "music_teacher",
  "driving",
  "gym",
  "pet",
  "nail",
  "massage",
  "tattoo",
  "dry_cleaner",
  "jeweler",
  "print",
  "nursery",
  "furniture",
  "hardware",
  "liquor",
  "boat",
  "security",
  "home_care",
  "wedding",
  "gun",
  "acupuncture",
]);

export function isTradeCategory(category: string): boolean {
  return TRADE_FROM_OCC.has(category);
}

const KEYWORD_INDEX: { keyword: string; category: string }[] = OCCUPATIONS.flatMap((item) =>
  item.keywords.map((keyword) => ({ keyword, category: item.category })),
).sort((a, b) => b.keyword.length - a.keyword.length);

const JOB_STOP = new Set([
  "the",
  "and",
  "for",
  "with",
  "near",
  "job",
  "jobs",
  "self",
  "employed",
  "owner",
  "practice",
  "professional",
  "professionals",
  "conservative",
  "republican",
  "liberal",
  "progressive",
  "democrat",
  "democratic",
  "gop",
  "maga",
  "mixed",
  "split",
  "bipartisan",
]);

const GENERIC_OCC =
  /^(?:owner|co-?owner|owner(?:\s*\/\s*|\s+)operator|business owner|small business owner|self(?:[-\s]employed)?|self|president|ceo|manager|general manager|proprietor|operator|entrepreneur|partner)$/i;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Whole-word / phrase match so "florist" does not hit "attorney", and "vet" does not hit "veteran". */
function keywordIn(text: string, keyword: string): boolean {
  const escaped = escapeRegExp(keyword.toLowerCase());
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:es|s)?(?=$|[^a-z0-9])`).test(text);
}

function wordPrefixIn(haystack: string, token: string): boolean {
  const escaped = escapeRegExp(token.toLowerCase());
  return new RegExp(`(?:^|[^a-z0-9])${escaped}`).test(haystack);
}

export function tokenizeJob(job: string): string[] {
  return job
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, " ")
    .split(/[\s/-]+/)
    .filter((token) => token.length >= 3 && !JOB_STOP.has(token));
}

export function matchOccupation(text: string): { category: string; matched: string } | null {
  const lower = text.toLowerCase();
  for (const entry of KEYWORD_INDEX) {
    if (keywordIn(lower, entry.keyword)) {
      return { category: entry.category, matched: entry.keyword };
    }
  }
  return null;
}

function stems(token: string): string[] {
  const out = new Set<string>([token]);
  if (token.endsWith("ies") && token.length > 5) out.add(`${token.slice(0, -3)}y`);
  if (token.endsWith("es") && token.length > 4) out.add(token.slice(0, -2));
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 3) out.add(token.slice(0, -1));
  return [...out];
}

/** Last token is the job head: "wedding florist" → florist. */
export function occupationTextMatches(occupation: string, tokens: string[]): boolean {
  if (tokens.length === 0) return false;
  const head = tokens[tokens.length - 1];
  if (!head) return false;
  const hay = occupation.toLowerCase();
  return stems(head).some((stem) => wordPrefixIn(hay, stem));
}

const AUTO_CATEGORIES = new Set(["auto_shop", "mechanic"]);

const CAR_BRANDS = new Set([
  "bmw",
  "mini",
  "honda",
  "acura",
  "toyota",
  "lexus",
  "ford",
  "lincoln",
  "chevy",
  "chevrolet",
  "gmc",
  "cadillac",
  "buick",
  "dodge",
  "ram",
  "jeep",
  "chrysler",
  "mercedes",
  "benz",
  "audi",
  "volkswagen",
  "vw",
  "porsche",
  "nissan",
  "infiniti",
  "hyundai",
  "kia",
  "genesis",
  "subaru",
  "mazda",
  "volvo",
  "jaguar",
  "tesla",
  "rivian",
  "lucid",
  "mitsubishi",
  "suzuki",
  "harley",
  "yamaha",
  "kawasaki",
  "polaris",
  "ferrari",
  "lamborghini",
  "maserati",
  "bentley",
]);

const SERVICE_HINTS = new Set([
  "repair",
  "repairs",
  "service",
  "shop",
  "garage",
  "mechanic",
  "tech",
  "technician",
  "dealer",
  "dealership",
  "motors",
  "automotive",
  "auto",
]);

const NOT_AUTO =
  /\b(aircraft|airlines?|airframe|avionics|air medical|helicopter|rotor mechanic|ap mechanic|a\s*&\s*p|elevator mechanic|baggage mechanic|bike mart|bicycle|cycle shop|commuteair|yulista)\b/i;

export function interpretJobQuery(query: string): {
  category: string | null;
  matched: string | null;
  brands: string[];
} {
  const occ = matchOccupation(query);
  const tokens = tokenizeJob(query);
  const brands = tokens.filter((token) => CAR_BRANDS.has(token));
  if (occ) return { category: occ.category, matched: occ.matched, brands };
  if (brands.length === 0) return { category: null, matched: null, brands };
  const wantsService = tokens.some((token) => SERVICE_HINTS.has(token));
  if (wantsService || tokens.length === brands.length) {
    return { category: "auto_shop", matched: query.trim() || "auto shop", brands };
  }
  return { category: null, matched: null, brands };
}

function hayHasBrand(row: { o: string; e: string }, brands: string[]): boolean {
  if (brands.length === 0) return true;
  const hay = `${row.e} ${row.o}`.toLowerCase();
  return brands.every((brand) => keywordIn(hay, brand));
}

function isNonAutoMechanic(row: { o: string; e: string }): boolean {
  return NOT_AUTO.test(`${row.o} ${row.e}`);
}

const CORPORATE_EMPLOYER =
  /\b(airlines?|airways|air lines|jetblue|air medical|hospital|health system|medical center|healthcare system|university|community college|school district|public schools|national bank|credit union|federal reserve|bank n\.?a\.?|city of|county of|state of|department of|u\.?s\.? (?:army|navy|air force|government)|walmart|exxon|chevron|conocophillips|lockheed|boeing|northrop|google|microsoft corporation|amazon\.com)\b/i;

const CORPORATE_FUNCTION =
  /\b(corporate real estate|(?:evp|svp|vp|vice president|director|manager|counsel),?\s+(?:of\s+)?real estate)\b/i;

export function isCorporateEmployer(employer: string): boolean {
  if (!CORPORATE_EMPLOYER.test(employer)) return false;
  if (matchOccupation(employer)) return false;
  return true;
}

export function classifyJob(occupation: string, employer = ""): { category: string; matched: string } | null {
  const empHit = employer ? matchOccupation(employer) : null;
  if (isCorporateEmployer(employer)) {
    return empHit;
  }
  if (empHit) return empHit;
  const occHit = matchOccupation(occupation);
  if (occHit && CORPORATE_FUNCTION.test(occupation)) return null;
  if (occHit) return occHit;
  if (!employer || (occupation.trim() && !GENERIC_OCC.test(occupation.trim()))) return null;
  return null;
}

function autoRelated(category: string | null | undefined): boolean {
  return Boolean(category && AUTO_CATEGORIES.has(category));
}

export function donorMatchesJob(
  row: { cat: string; o: string; e: string },
  parsed: { category: string | null; jobTokens: string[]; jobBrands?: string[] },
): boolean {
  const brands = parsed.jobBrands ?? [];
  if (parsed.category) {
    const live = classifyJob(row.o, row.e);
    const got = live?.category ?? (isCorporateEmployer(row.e) ? null : row.cat);
    if (autoRelated(parsed.category) && isNonAutoMechanic(row)) return false;
    const catOk =
      live?.category === parsed.category ||
      (autoRelated(parsed.category) && autoRelated(got)) ||
      (got === parsed.category && !isCorporateEmployer(row.e));
    if (brands.length > 0) {
      if (hayHasBrand(row, brands) && (catOk || GENERIC_OCC.test(row.o.trim()) || autoRelated(got))) {
        return true;
      }
      return Boolean(catOk);
    }
    return Boolean(catOk);
  }
  if (brands.length > 0 && hayHasBrand(row, brands)) {
    const live = classifyJob(row.o, row.e);
    if (isNonAutoMechanic(row)) return false;
    return autoRelated(live?.category ?? row.cat) || GENERIC_OCC.test(row.o.trim());
  }
  if (parsed.jobTokens.length === 0) return false;
  if (isCorporateEmployer(row.e)) return false;
  return occupationTextMatches(row.o, parsed.jobTokens);
}
