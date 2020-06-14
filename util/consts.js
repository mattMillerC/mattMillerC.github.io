export const 
  HASH_PART_SEP = ",",
  HASH_LIST_SEP = "_",
  HASH_START = "#",
  STR_EMPTY = "",
  STR_VOID_LINK = "javascript:void(0)",
  STR_SLUG_DASH = "-",
  STR_APOSTROPHE = "\u2019",
  ID_SEARCH_BAR = "filter-search-input-group",
  ID_RESET_BUTTON = "reset",
  TYP_STRING = "string",
  TYP_NUMBER = "number",
  TYP_OBJECT = "object",
  ELE_SPAN = "span",
  ELE_UL = "ul",
  ELE_LI = "li",
  ELE_A = "a",
  ELE_P = "p",
  ELE_DIV = "div",
  ELE_BUTTON = "button",
  ELE_INPUT = "input",
  EVNT_MOUSEOVER = "mouseover",
  EVNT_MOUSEOUT = "mouseout",
  EVNT_MOUSELEAVE = "mouseleave",
  EVNT_MOUSEENTER = "mouseenter",
  EVNT_CLICK = "click",
  ATB_ID = "id",
  ATB_CLASS = "class",
  ATB_TITLE = "title",
  ATB_VALUE = "value",
  ATB_HREF = "href",
  ATB_STYLE = "style",
  ATB_CHECKED = "checked",
  ATB_TYPE = "type",
  ATB_ONCLICK = "onclick",
  STL_DISPLAY_INITIAL = "display: initial",
  STL_DISPLAY_NONE = "display: none",
  FLTR_ID = "filterId",
  CLSS_NON_STANDARD_SOURCE = "spicy-sauce",
  CLSS_SUBCLASS_FEATURE = "subclass-feature",
  ATB_DATA_LIST_SEP = "||",
  ATB_DATA_PART_SEP = "::",
  ATB_DATA_SC = "data-subclass",
  ATB_DATA_SRC = "data-source",
  STR_CANTRIP = "Cantrip",
  STR_NONE = "None",
  RNG_SPECIAL = "special",
  RNG_POINT = "point",
  RNG_LINE = "line",
  RNG_CUBE = "cube",
  RNG_CONE = "cone",
  RNG_RADIUS = "radius",
  RNG_SPHERE = "sphere",
  RNG_HEMISPHERE = "hemisphere",
  RNG_SELF = "self",
  RNG_SIGHT = "sight",
  RNG_UNLIMITED = "unlimited",
  RNG_UNLIMITED_SAME_PLANE = "plane",
  RNG_TOUCH = "touch",
  UNT_FEET = "feet",
  UNT_MILES = "miles",
  ABIL_STR = "Strength",
  ABIL_DEX = "Dexterity",
  ABIL_CON = "Constitution",
  ABIL_INT = "Intelligence",
  ABIL_WIS = "Wisdom",
  ABIL_CHA = "Charisma",
  ABIL_CH_ANY = "Choose Any",

  // Parser stuff
  LEVEL_TO_XP_EASY = [0, 25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400, 1600, 2000, 2100, 2400, 2800],
  LEVEL_TO_XP_MEDIUM = [0, 50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500, 2800, 3200, 3900, 4100, 4900, 5700],
  LEVEL_TO_XP_HARD = [0, 75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800, 4300, 4800, 5900, 6300, 7300, 8500],
  LEVEL_TO_XP_DEADLY = [0, 100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100, 5700, 6400, 7200, 8800, 9500, 10900, 12700],
  TP_ABERRATION = "aberration",
  TP_BEAST = "beast",
  TP_CELESTIAL = "celestial",
  TP_CONSTRUCT = "construct",
  TP_DRAGON = "dragon",
  TP_ELEMENTAL = "elemental",
  TP_FEY = "fey",
  TP_FIEND = "fiend",
  TP_GIANT = "giant",
  TP_HUMANOID = "humanoid",
  TP_MONSTROSITY = "monstrosity",
  TP_OOZE = "ooze",
  TP_PLANT = "plant",
  TP_UNDEAD = "undead",
  SZ_FINE = "F",
  SZ_DIMINUTIVE = "D",
  SZ_TINY = "T",
  SZ_SMALL = "S",
  SZ_MEDIUM = "M",
  SZ_LARGE = "L",
  SZ_HUGE = "H",
  SZ_GARGANTUAN = "G",
  SZ_COLOSSAL = "C",
  SZ_VARIES = "V",
  SRC_CoS = "CoS",
  SRC_DMG = "DMG",
  SRC_EEPC = "EEPC",
  SRC_EET = "EET",
  SRC_HotDQ = "HotDQ",
  SRC_LMoP = "LMoP",
  SRC_MM = "MM",
  SRC_OotA = "OotA",
  SRC_PHB = "PHB",
  SRC_PotA = "PotA",
  SRC_RoT = "RoT",
  SRC_RoTOS = "RoTOS",
  SRC_SCAG = "SCAG",
  SRC_SKT = "SKT",
  SRC_ToA = "ToA",
  SRC_ToD = "ToD",
  SRC_TTP = "TTP",
  SRC_TYP = "TftYP",
  SRC_VGM = "VGM",
  SRC_XGE = "XGE",
  SRC_OGA = "OGA",
  SRC_MOT = "MOT",
  SRC_GGR = "GGR",
  SRC_AI = "AI",
  SRC_BGDIA = "BGDIA",
  SRC_GoS = "GoS",
  SRC_EGW = "EGW",
  SRC_ERLW = "ERLW",
  SRC_ALCoS = "ALCurseOfStrahd",
  SRC_ALEE = "ALElementalEvil",
  SRC_ALRoD = "ALRageOfDemons",
  SRC_MTF = "MTF",
  SRC_PS_PREFIX = "PS",
  SRC_PSA = SRC_PS_PREFIX + "A",
  SRC_PSI = SRC_PS_PREFIX + "I",
  SRC_PSK = SRC_PS_PREFIX + "K",
  SRC_PSZ = SRC_PS_PREFIX + "Z",
  SRC_PSX = SRC_PS_PREFIX + "X",
  SRC_UA_PREFIX = "UA",
  SRC_UAA = SRC_UA_PREFIX + "Artificer",
  SRC_UAEAG = SRC_UA_PREFIX + "EladrinAndGith",
  SRC_UAEBB = SRC_UA_PREFIX + "Eberron",
  SRC_UAFFR = SRC_UA_PREFIX + "FeatsForRaces",
  SRC_UAFFS = SRC_UA_PREFIX + "FeatsForSkills",
  SRC_UAFO = SRC_UA_PREFIX + "FiendishOptions",
  SRC_UAFT = SRC_UA_PREFIX + "Feats",
  SRC_UAGH = SRC_UA_PREFIX + "GothicHeroes",
  SRC_UAMDM = SRC_UA_PREFIX + "ModernMagic",
  SRC_UASSP = SRC_UA_PREFIX + "StarterSpells",
  SRC_UATMC = SRC_UA_PREFIX + "TheMysticClass",
  SRC_UATOBM = SRC_UA_PREFIX + "ThatOldBlackMagic",
  SRC_UATRR = SRC_UA_PREFIX + "TheRangerRevised",
  SRC_UAWA = SRC_UA_PREFIX + "WaterborneAdventures",
  SRC_UAVR = SRC_UA_PREFIX + "VariantRules",
  SRC_UALDR = SRC_UA_PREFIX + "LightDarkUnderdark",
  SRC_UARAR = SRC_UA_PREFIX + "RangerAndRogue",
  SRC_UAATOSC = SRC_UA_PREFIX + "ATrioOfSubclasses",
  SRC_UABPP = SRC_UA_PREFIX + "BarbarianPrimalPaths",
  SRC_UARSC = SRC_UA_PREFIX + "RevisedSubclasses",
  SRC_UAKOO = SRC_UA_PREFIX + "KitsOfOld",
  SRC_UABBC = SRC_UA_PREFIX + "BardBardColleges",
  SRC_UACDD = SRC_UA_PREFIX + "ClericDivineDomains",
  SRC_UAD = SRC_UA_PREFIX + "Druid",
  SRC_UARCO = SRC_UA_PREFIX + "RevisedClassOptions",
  SRC_UAF = SRC_UA_PREFIX + "Fighter",
  SRC_UAM = SRC_UA_PREFIX + "Monk",
  SRC_UAP = SRC_UA_PREFIX + "Paladin",
  SRC_UAMC = SRC_UA_PREFIX + "ModifyingClasses",
  SRC_UAS = SRC_UA_PREFIX + "Sorcerer",
  SRC_UAWAW = SRC_UA_PREFIX + "WarlockAndWizard",
  SRC_UATF = SRC_UA_PREFIX + "TheFaithful",
  SRC_UAWR = SRC_UA_PREFIX + "WizardRevisited",
  SRC_UAESR = SRC_UA_PREFIX + "ElfSubraces",
  SRC_UAFRW = SRC_UA_PREFIX + "FighterRogueWizard",
  SRC_UA2POR = SRC_UA_PREFIX + "2020PsionicOptionsRevisited",
  SRC_3PP_SUFFIX = " 3pp",
  SRC_BOLS_3PP = "BoLS" + SRC_3PP_SUFFIX,
  SRC_ToB_3PP = "ToB" + SRC_3PP_SUFFIX,
  AL_PREFIX = "Adventurers League: ",
  AL_PREFIX_SHORT = "AL: ",
  PS_PREFIX = "Plane Shift: ",
  PS_PREFIX_SHORT = "PS: ",
  UA_PREFIX = "Unearthed Arcana: ",
  UA_PREFIX_SHORT = "UA: ",
  PP3_SUFFIX = " (3pp)";