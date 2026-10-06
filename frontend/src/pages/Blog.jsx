import React from 'react';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import BlogGrid from '../components/blog/BlogGrid';
import Reveal from '../components/common/Reveal';

const Blog = () => {
  const posts = [
    { id: '1', title: 'Deploying MERN Apps to Render & Vercel', slug: 'deploying-mern-apps', createdAt: '2026-10-01' }
  ];

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO title="Blog" description="Articles on MERN stack development, API design, and web deployment." />
        <Reveal direction="down">
          <SectionTitle subtitle="Insights & Tutorials" title="The Developer Blog" />
        </Reveal>
        <BlogGrid posts={posts} loading={false} />
      </div>
    </div>
  );
};

export default Blog;