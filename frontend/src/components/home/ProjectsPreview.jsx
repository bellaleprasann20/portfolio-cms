import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { selectFeatured } from '../../utils/projects';
import Reveal from '../common/Reveal';
import SectionTitle from '../common/SectionTitle';
import ProjectGrid from '../projects/ProjectGrid';

const FEATURED_COUNT = 2;

const ProjectsPreview = () => {
  const { projects, loading } = useProjects();
  const featured = useMemo(() => selectFeatured(projects, FEATURED_COUNT), [projects]);

  return (
    <section aria-label="Featured projects" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
          <Reveal direction="right">
            <SectionTitle subtitle="Portfolio" title="Featured Work" />
          </Reveal>
          <Reveal direction="left">
            <Link
              to="/projects"
              className="mb-12 hidden items-center font-semibold text-blue-600 transition-colors hover:text-blue-800 md:inline-flex"
            >
              View All Projects <span className="ml-2 text-xl">&rarr;</span>
            </Link>
          </Reveal>
        </div>

        <ProjectGrid projects={featured} loading={loading} skeletonCount={FEATURED_COUNT} />

        <div className="mt-12 text-center md:hidden">
          <Link
            to="/projects"
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-50 px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-100"
          >
            View All Projects &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;