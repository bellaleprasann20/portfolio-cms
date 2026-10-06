import Reveal from '../common/Reveal';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({
  projects = [],
  loading = false,
  skeletonCount = 4,
  emptyMessage = 'Projects are on their way. Please check back soon.',
}) => {
  if (loading) {
    return (
      <div aria-busy="true">
        <p className="sr-only" role="status">
          Loading projects
        </p>
        <div aria-hidden="true" className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Array.from({ length: skeletonCount }, (_, index) => (
            <div key={index} className="h-[28rem] animate-pulse rounded-3xl border border-slate-200 bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return <p className="py-12 text-center text-slate-500">{emptyMessage}</p>;
  }

  return (
    <ul role="list" className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {projects.map((project, index) => (
        <li key={project.id ?? project.slug}>
          <Reveal direction="up" delay={(index % 2) * 0.15} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
};

export default ProjectGrid;