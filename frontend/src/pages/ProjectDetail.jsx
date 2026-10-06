import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import Reveal from '../components/common/Reveal';
import ProjectCard, { ProjectImage } from '../components/projects/ProjectCard';
import { useProject, useProjects } from '../hooks/useProjects';
import { paragraphs } from '../utils/projects';

function Message({ title, children }) {
  return (
    <div className="min-h-screen bg-slate-50 py-32">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <SEO title={title} />
        <h1 className="mb-4 text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mb-8 text-slate-600">{children}</p>
        <Link to="/projects" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back to all projects
        </Link>
      </div>
    </div>
  );
}

const ProjectDetail = () => {
  // The slug comes from the URL (/projects/:slug) and nowhere else. No guessing, no "first project" fallback.
  const { slug } = useParams();
  const { project, status } = useProject(slug);
  const { projects } = useProjects();

  // React reuses this page when only the URL changes, so reset the scroll position ourselves.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const others = useMemo(() => projects.filter((item) => item.slug !== slug).slice(0, 2), [projects, slug]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 py-20" aria-busy="true">
        <p className="sr-only" role="status">
          Loading project
        </p>
        <div aria-hidden="true" className="mx-auto max-w-4xl animate-pulse space-y-6 px-4">
          <div className="h-10 w-2/3 rounded bg-slate-200" />
          <div className="h-80 rounded-3xl bg-slate-200" />
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (status === 'notfound') {
    return <Message title="Project not found">We couldn&rsquo;t find a project called &ldquo;{slug}&rdquo;.</Message>;
  }
  if (status === 'error' || !project) {
    return <Message title="Couldn't load this project">Something went wrong while loading it. Please try again in a moment.</Message>;
  }

  const { title, summary, description, image, images, tags, githubUrl, liveUrl } = project;
  const gallery = images.filter((src) => src !== image);

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SEO title={title} description={summary} image={image ?? undefined} path={`/projects/${project.slug}`} />

        <Link to="/projects" className="mb-8 inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> All projects
        </Link>

        <Reveal direction="up">
          <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">{title}</h1>

          {tags.length > 0 && (
            <ul role="list" aria-label="Technologies used" className="mb-6 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <li
                  key={`${tag}-${index}`}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {(liveUrl || githubUrl) && (
            <div className="mb-10 flex flex-wrap gap-3">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Live Demo <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
                >
                  <FaGithub className="mr-2 h-5 w-5" aria-hidden="true" /> Source Code
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <div className="mb-10 h-64 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 sm:h-96">
            <ProjectImage src={image} />
          </div>
        </Reveal>

        <div className="space-y-4 text-lg leading-relaxed text-slate-700">
          {paragraphs(description).map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        {gallery.length > 0 && (
          <ul role="list" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gallery.map((src, index) => (
              <li key={src} className="h-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img src={src} alt={`${title} screenshot ${index + 1}`} loading="lazy" className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        )}
      </article>

      {others.length > 0 && (
        <section aria-label="More projects" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">More projects</h2>
          <ul role="list" className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {others.map((item) => (
              <li key={item.slug}>
                <ProjectCard project={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;