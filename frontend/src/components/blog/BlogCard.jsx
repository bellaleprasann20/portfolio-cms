import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { generateSlug, formatDate } from '../../utils/helpers';

const BlogCard = ({ post }) => {
  const slug = post.slug || generateSlug(post.title);
  
  // Rough estimate for reading time (assuming ~200 words per minute)
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
      <div className="flex items-center text-xs text-slate-500 font-medium mb-4 space-x-4">
        <span className="flex items-center">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          {formatDate(post.createdAt || new Date().toISOString())}
        </span>
        <span className="flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          {readTime} min read
        </span>
      </div>

      <Link to={`/blog/${slug}`} className="block flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt || (post.content ? post.content.substring(0, 120) + '...' : '')}
        </p>
      </Link>

      <div className="pt-4 border-t border-slate-100 mt-auto">
        <Link 
          to={`/blog/${slug}`} 
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Read Article <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;