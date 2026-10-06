import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import Reveal from '../common/Reveal';
import { formatDate } from '../../utils/helpers';

const BlogDetails = ({ post }) => {
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <Reveal direction="down" delay={0.1}>
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
        </Link>
      </Reveal>

      <header className="mb-12">
        <Reveal direction="up" delay={0.2}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="flex flex-wrap items-center justify-between pb-8 border-b border-slate-200">
            <div className="flex items-center space-x-6 text-sm text-slate-500 font-medium">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                {formatDate(post.createdAt || new Date().toISOString(), false)}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-slate-400" />
                {readTime} min read
              </span>
            </div>
            
            <button 
              onClick={handleShare}
              className="mt-4 sm:mt-0 flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
              title="Share Article"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </button>
          </div>
        </Reveal>
      </header>

      <Reveal direction="up" delay={0.4}>
        <div className="prose prose-lg prose-slate prose-blue max-w-none prose-headings:font-bold prose-a:font-semibold">
          {/* If the CMS saves raw Markdown, you might want to use a package like 'react-markdown' here. */}
          {/* Assuming raw text or HTML for now: */}
          <div 
            className="whitespace-pre-wrap leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={post.content.includes('<') ? { __html: post.content } : undefined}
          >
            {!post.content.includes('<') && post.content}
          </div>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.5}>
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex bg-slate-50 rounded-2xl p-6 items-center border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mr-6 shrink-0">
              PB
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">Prasann Bellale</h4>
              <p className="text-slate-600 text-sm mt-1">
                Full Stack MERN Developer. I write about web development, engineering challenges, and my journey into applied AI.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  );
};

export default BlogDetails;