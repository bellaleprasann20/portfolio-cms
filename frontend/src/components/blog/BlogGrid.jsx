import React from 'react';
import BlogCard from './BlogCard';
import Reveal from '../common/Reveal';
import Loader from '../common/Loader';

const BlogGrid = ({ posts = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader size="lg" />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-slate-500 text-lg font-medium">No articles published yet.</p>
        <p className="text-slate-400 mt-2 text-sm">I'm currently writing some new content. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <Reveal 
          key={post._id || post.id} 
          direction="up" 
          delay={index * 0.15}
        >
          <BlogCard post={post} />
        </Reveal>
      ))}
    </div>
  );
};

export default BlogGrid;