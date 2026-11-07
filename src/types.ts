export type Source = "base" | "pl" | "bonus";

export type CategoryId =
  | "pistols"
  | "revolvers"
  | "smgs"
  | "rifles"
  | "lmgs"
  | "shotguns"
  | "snipers"
  | "katanas"
  | "melee"
  | "grenades";

export interface Weapon {
  /** Stable id used as the localStorage key. Don't change once published. */
  id: string;
  name: string;
  /** Weapon class as shown in game, e.g. "Power pistol". */
  type: string;
  source: Source;
  /** Short note on how to get it. */
  how: string;
  /** True if it must be crafted from a spec. */
  crafted?: boolean;
  /** Set when the weapon is missable or locked to a route/ending. */
  missable?: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  weapons: Weapon[];
}

export type StatusFilter = "all" | "missing" | "have";
export type SourceFilter = "any" | Source | "crafted" | "missable";
