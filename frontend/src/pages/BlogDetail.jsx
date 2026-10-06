import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import BlogDetails from '../components/blog/BlogDetails';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = { title: 'Deploying MERN Apps', content: 'Article body here...', createdAt: '2026-10-01' };

  if (!post) return <Navigate to="/not-found" />;

  return (
    <div className="min-h-screen bg-white">
      <SEO title={post.title} />
      <BlogDetails post={post} />
    </div>
  );
};

export default BlogDetail;