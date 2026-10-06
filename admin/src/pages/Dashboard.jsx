import React, { useEffect, useState } from 'react';
import { Briefcase, Code2, FileText, Mail } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RecentMessages from '../components/dashboard/RecentMessages';
// import statsApi from '../lib/api/statsApi'; // Uncomment when your API is ready

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    blogs: 0,
    messages: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Replace this mock data with actual API calls once your backend is linked
        // const statsData = await statsApi.getStats();
        // const msgData = await statsApi.getRecentMessages();
        
        // Mock data for UI testing
        setTimeout(() => {
          setStats({ projects: 4, skills: 15, blogs: 2, messages: 5 });
          setRecentMessages([
            { id: 1, name: 'John Doe', subject: 'Freelance Inquiry', createdAt: new Date().toISOString() },
            { id: 2, name: 'Jane Smith', subject: 'Great Portfolio!', createdAt: new Date(Date.now() - 86400000).toISOString() }
          ]);
          setLoading(false);
        }, 800);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value={stats.projects} icon={Briefcase} colorClass="text-blue-600" bgClass="bg-blue-100" />
        <StatCard title="Skills Tracked" value={stats.skills} icon={Code2} colorClass="text-emerald-600" bgClass="bg-emerald-100" />
        <StatCard title="Published Blogs" value={stats.blogs} icon={FileText} colorClass="text-purple-600" bgClass="bg-purple-100" />
        <StatCard title="Unread Messages" value={stats.messages} icon={Mail} colorClass="text-amber-600" bgClass="bg-amber-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentMessages messages={recentMessages} loading={loading} />
        
        {/* Placeholder for future widgets (e.g., Quick Actions, Analytics) */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col items-center justify-center text-gray-400">
          <p>More widgets coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;