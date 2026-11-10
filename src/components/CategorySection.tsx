import type { Category, Weapon } from "../types";
import { WeaponRow } from "./WeaponRow";

interface CategorySectionProps {
  category: Category;
  visible: Weapon[];
  owned: Set<string>;
  onToggle: (id: string, value: boolean) => void;
}

export function CategorySection({ category, visible, owned, onToggle }: CategorySectionProps) {
  const have = category.weapons.filter((w) => owned.has(w.id)).length;
  return (
    <section id={category.id} className="mt-6.5">
      <h2 className="mb-2 flex items-baseline gap-2.5 font-display text-[26px] leading-none font-bold">
        {category.label}
        <small className="font-body text-[15px] font-medium text-muted">
          {have} of {category.weapons.length}
        </small>
      </h2>
      <ul className="grid gap-px border border-line bg-line lg:grid-cols-2 lg:[&>li:last-child:nth-child(odd)]:col-span-2">
        {visible.map((w) => (
          <WeaponRow key={w.id} weapon={w} checked={owned.has(w.id)} onToggle={onToggle} />
        ))}
      </ul>
    </section>
  );
}
