import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import GitHubCard from '../components/common/GitHubCard';
import Reveal from '../components/common/Reveal';
import ProjectGrid from '../components/projects/ProjectGrid';
import { useProjects } from '../hooks/useProjects';

const Projects = () => {
  const { projects, loading } = useProjects();

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SEO title="Projects" description="Explore my latest full-stack MERN and FastAPI projects and technical architecture." />

        <Reveal direction="down">
          <SectionTitle subtitle="Portfolio" title="All Projects" />
        </Reveal>

        <ProjectGrid projects={projects} loading={loading} />

        <GitHubCard />
      </div>
    </div>
  );
};

export default Projects;