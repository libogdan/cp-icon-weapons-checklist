import type { Category, SourceFilter, StatusFilter } from "../types";

const STATUS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "missing", label: "Missing" },
  { value: "have", label: "Collected" },
];

const SOURCES: { value: SourceFilter; label: string }[] = [
  { value: "any", label: "Any source" },
  { value: "base", label: "Base game" },
  { value: "pl", label: "Phantom Liberty" },
  { value: "bonus", label: "Bonus / promo" },
  { value: "crafted", label: "Crafted" },
  { value: "missable", label: "Missable / route-locked" },
];

interface ToolbarProps {
  query: string;
  onQuery: (q: string) => void;
  status: StatusFilter;
  onStatus: (s: StatusFilter) => void;
  source: SourceFilter;
  onSource: (s: SourceFilter) => void;
  categories: Category[];
  owned: Set<string>;
}

export function Toolbar({ query, onQuery, status, onStatus, source, onSource, categories, owned }: ToolbarProps) {
  return (
    <div className="sticky top-[env(safe-area-inset-top,0px)] z-10 border-b border-line bg-bg pt-3 pb-2.5">
      <div className="flex flex-wrap gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search weapon, quest or place"
          aria-label="Search"
          className="min-w-0 flex-[1_1_220px] rounded-sm border border-line bg-surface px-3 py-2.5"
        />
        <div role="group" aria-label="Show" className="flex border border-line bg-surface">
          {STATUS.map((s) => (
            <button
              key={s.value}
              type="button"
              aria-pressed={status === s.value}
              onClick={() => onStatus(s.value)}
              className="cursor-pointer px-3 py-2 font-semibold aria-pressed:bg-text aria-pressed:text-bg"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label="Filter by source" className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
        {SOURCES.map((s) => (
          <button
            key={s.value}
            type="button"
            aria-pressed={source === s.value}
            onClick={() => onSource(s.value)}
            className="flex-none cursor-pointer rounded-sm border border-line bg-chip px-2.5 py-1 text-sm font-medium whitespace-nowrap aria-pressed:border-cyan aria-pressed:bg-cyan-soft aria-pressed:text-cyan"
          >
            {s.label}
          </button>
        ))}
      </div>

      <nav aria-label="Weapon classes" className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto">
        {categories.map((c) => {
          const h = c.weapons.filter((w) => owned.has(w.id)).length;
          const done = h === c.weapons.length;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`flex-none border-b-2 border-transparent px-2 py-1.5 font-display text-[15px] font-semibold hover:border-line hover:text-text ${done ? "text-cyan" : "text-muted"}`}
            >
              {c.label} {h}/{c.weapons.length}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
