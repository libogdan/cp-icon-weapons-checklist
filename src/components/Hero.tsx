import type { Category } from "../types";

interface HeroProps {
  categories: Category[];
  owned: Set<string>;
  total: number;
}

export function Hero({ categories, owned, total }: HeroProps) {
  const have = categories.reduce((n, c) => n + c.weapons.filter((w) => owned.has(w.id)).length, 0);
  const pct = total ? Math.round((have / total) * 100) : 0;

  return (
    <header className="clip-hero mt-4 bg-yellow px-5 pt-5 pb-8 text-black">
      <h1 className="font-display text-[clamp(26px,5vw,36px)] leading-tight font-bold">
        Cyberpunk 2077 iconic weapons
      </h1>
      <p className="mt-1.5 max-w-[52ch] text-[15px]">
        Tick off every iconic you’ve collected. Progress saves in this browser automatically.
      </p>

      <div className="mt-3.5 flex flex-wrap items-baseline gap-3">
        <b className="font-display text-[clamp(68px,15vw,128px)] leading-[0.85] font-bold tracking-tight">{have}</b>
        <span className="font-display text-[clamp(22px,4vw,30px)] font-semibold">/ {total} collected</span>
        <em className="ml-auto border-2 border-black px-2.5 py-1 font-display text-lg font-semibold not-italic">
          {pct}%
        </em>
      </div>

      <div className="mt-4 flex h-4 gap-[3px]" aria-hidden="true">
        {categories.map((c) => {
          const h = c.weapons.filter((w) => owned.has(w.id)).length;
          return (
            <button
              key={c.id}
              type="button"
              tabIndex={-1}
              title={`${c.label}: ${h} of ${c.weapons.length}`}
              onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}
              className="relative min-w-1.5 cursor-pointer border-2 border-black"
              style={{ flex: c.weapons.length }}
            >
              <i
                className="absolute inset-y-0 left-0 bg-black transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: `${(h / c.weapons.length) * 100}%` }}
              />
            </button>
          );
        })}
      </div>
    </header>
  );
}
