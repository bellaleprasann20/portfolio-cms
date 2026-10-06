import { useId, useMemo } from 'react';
import Reveal from '../common/Reveal';
import { groupByCategory } from '../../utils/skills';
import SkillCard from './SkillCard';

const COLUMNS = 4; // widest layout; stagger by column so cards far down a long list don't wait seconds

function SkillListSkeleton() {
  return (
    <div className="space-y-16" aria-busy="true">
      <p className="sr-only" role="status">
        Loading skills
      </p>
      {[0, 1].map((group) => (
        <div key={group} aria-hidden="true">
          <div className="mb-6 h-8 w-48 animate-pulse rounded bg-slate-100" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-[4.75rem] animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const SkillList = ({
  skills = [],
  loading = false,
  showLevel = false,
  emptyMessage = 'Skills are being updated. Please check back soon.',
}) => {
  const baseId = useId();
  const groups = useMemo(() => groupByCategory(skills), [skills]);

  if (loading) return <SkillListSkeleton />;

  if (groups.length === 0) {
    return <p className="py-12 text-center text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-16">
      {groups.map(({ key, category, skills: items }, groupIndex) => {
        const headingId = `${baseId}-${groupIndex}`;
        return (
          <div key={key} role="group" aria-labelledby={headingId}>
            <Reveal direction="up" delay={0.1}>
              <div className="mb-6 flex items-center gap-6">
                <h3 id={headingId} className="text-2xl font-bold text-slate-900">
                  {category}
                </h3>
                <div aria-hidden="true" className="h-px flex-grow bg-slate-200" />
              </div>
            </Reveal>

            <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((skill, index) => (
                <li key={skill.id ?? skill._id ?? skill.name}>
                  <Reveal direction="up" delay={0.1 + (index % COLUMNS) * 0.06} className="h-full">
                    <SkillCard
                      name={skill.name}
                      icon={skill.icon}
                      category={category}
                      level={skill.level}
                      showLevel={showLevel}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default SkillList;