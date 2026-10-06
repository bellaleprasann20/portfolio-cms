import SkillIcon from './SkillIcon';
import { categoryStyle } from '../../utils/skills';

/**
 * One skill. `showLevel` adds a proficiency bar from the CMS `level` (0-100); off by default.
 * Render it inside a <li>; SkillList does this.
 */
const SkillCard = ({ name, icon, category, level, showLevel = false }) => {
  const hasLevel = showLevel && Number.isFinite(level);
  const percent = hasLevel ? Math.min(100, Math.max(0, Math.round(level))) : 0;

  return (
    <div className="group flex h-full items-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
      <div
        className={`mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${categoryStyle(category)}`}
      >
        <SkillIcon name={name} icon={icon} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="break-words font-medium text-slate-800 transition-colors group-hover:text-blue-700">{name}</p>
        {hasLevel && (
          <div
            role="meter"
            aria-label={`${name} proficiency`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
          >
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${percent}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;