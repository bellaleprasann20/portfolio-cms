import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const MAX_TAGS = 5;

export function ProjectImage({ src, className = '', fallbackText = 'No image available' }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-slate-100 text-sm font-medium text-slate-400 ${className}`}>
        {fallbackText}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/** Takes a normalized project (see utils/projects.js). Used on the home page and the projects page. */
const ProjectCard = ({ project }) => {
  const { slug, title, summary, image, tags, githubUrl, liveUrl } = project;
  const href = `/projects/${slug}`;
  const shownTags = tags.slice(0, MAX_TAGS);
  const hiddenTags = tags.length - shownTags.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl motion-reduce:transform-none">
      {/* Clicking the picture opens the project. Hidden from keyboard/screen readers: the title link is the real one. */}
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block h-56 w-full overflow-hidden border-b border-slate-100 bg-slate-100 sm:h-64"
      >
        <ProjectImage src={image} className="transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
      </Link>

      <div className="flex-grow p-8">
        <h3 className="mb-3 text-2xl font-bold text-slate-900">
          <Link
            to={href}
            className="transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {title}
          </Link>
        </h3>
        <p className="mb-6 line-clamp-3 leading-relaxed text-slate-600">{summary}</p>
        {tags.length > 0 && (
          <ul role="list" className="flex flex-wrap gap-2">
            {shownTags.map((tag, index) => (
              <li
                key={`${tag}-${index}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                {tag}
              </li>
            ))}
            {hiddenTags > 0 && (
              <li className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                +{hiddenTags}
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 bg-white px-8 py-5">
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Source code for ${title} (opens in a new tab)`}
            className="-ml-2 flex items-center rounded-lg p-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <FaGithub className="mr-2 h-5 w-5" aria-hidden="true" /> Source Code
          </a>
        ) : (
          <span />
        )}

        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${title} (opens in a new tab)`}
            className="-mr-2 flex items-center rounded-lg p-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
          >
            Live Demo <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <Link
            to={href}
            aria-label={`View details of ${title}`}
            className="-mr-2 rounded-lg p-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800"
          >
            View details &rarr;
          </Link>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;