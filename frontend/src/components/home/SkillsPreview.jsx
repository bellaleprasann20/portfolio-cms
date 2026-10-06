import { Link } from 'react-router-dom';
import { useSkills } from '../../hooks/useSkills';
import { categoryStyle } from '../../utils/skills';
import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle';
import SkillIcon from '../skills/SkillIcon';

const PREVIEW_COUNT = 6;

// Shown if the CMS has no skills yet or the API can't be reached, so the section is never empty.
const FALLBACK_SKILLS = [
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'node', name: 'Node.js', category: 'Backend' },
  { id: 'express', name: 'Express', category: 'Backend' },
  { id: 'mongodb', name: 'MongoDB', category: 'Database' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend' },
  { id: 'python', name: 'Python', category: 'Languages' },
];

function PreviewCard({ skill }) {
  const style = categoryStyle(skill.category);

  return (
    <div
      className={`flex h-full flex-col items-center gap-3 rounded-2xl border p-6 text-center shadow-sm transition duration-200 hover:shadow-md motion-safe:hover:-translate-y-1 ${style}`}
    >
      <SkillIcon name={skill.name} icon={skill.icon} size="lg" />
      <div>
        <p className="font-semibold text-slate-900">{skill.name}</p>
        {skill.category && <p className="mt-0.5 text-xs font-medium">{skill.category}</p>}
      </div>
    </div>
  );
}

const SkillsPreview = () => {
 const { skills, total, loading, error } = useSkills({ limit: PREVIEW_COUNT });

  // Safely extract the array, handling cases where the backend returns an object like { items: [...] } or { data: [...] }
  const safeSkills = Array.isArray(skills) ? skills : (skills?.items || skills?.data || []);
  
  const usingFallback = !loading && (error || safeSkills.length === 0);
  const visible = usingFallback ? FALLBACK_SKILLS : safeSkills;
  const hasMore = !usingFallback && (total || 0) > visible.length;

  return (
    <section aria-label="Top skills" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <SectionTitle subtitle="My Tech Stack" title="Tools I Use Everyday" alignment="center" />
        </Reveal>

        <ul
          role="list"
          aria-busy={loading}
          className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {loading ? (
            <>
              <li className="sr-only" role="status">
                Loading skills
              </li>
              {Array.from({ length: PREVIEW_COUNT }, (_, index) => (
                <li key={index} aria-hidden="true">
                  <div className="h-[9.5rem] animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
                </li>
              ))}
            </>
          ) : (
            visible.map((skill, index) => (
              <li key={skill.id ?? skill.name}>
                <Reveal direction="up" delay={index * 0.08} className="h-full">
                  <PreviewCard skill={skill} />
                </Reveal>
              </li>
            ))
          )}
        </ul>

        <Reveal direction="up" delay={0.3}>
          <div className="text-center">
            <Link
              to="/skills"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium text-slate-700 ring-1 ring-slate-300 transition-colors hover:text-blue-700 hover:ring-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {hasMore ? `View all ${total} skills and tools` : 'View all skills and tools'}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SkillsPreview;