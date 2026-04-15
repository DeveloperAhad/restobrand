import React, { useState } from 'react';
import { BarChart3, TrendingUp, Palette, FileText, Users, CreditCard } from 'lucide-react';
import Card from '../components/Card';
import useAuthStore from '../store/authStore';

const DashboardPage = () => {
  const { user } = useAuthStore();
  
  const stats = [
    {
      name: 'Total Restaurants',
      value: '3',
      change: '+1 this month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Moodboards Created',
      value: '12',
      change: '+4 this week',
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Content Posts',
      value: '28',
      change: '+8 this week',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Credits Remaining',
      value: '450',
      change: 'of 500 monthly',
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentActivity = [
    { id: 1, action: 'Created moodboard', target: 'Summer Menu 2024', time: '2 hours ago' },
    { id: 2, action: 'Generated captions', target: 'Instagram Post #45', time: '5 hours ago' },
    { id: 3, action: 'Updated restaurant', target: 'Bella Italia', time: '1 day ago' },
    { id: 4, action: 'Scheduled post', target: 'Facebook - Weekend Special', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-brand-navy mb-2">
          Welcome back, {user?.first_name || 'User'}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your restaurants today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-brand-navy">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-brand-navy">Recent Activity</h2>
            <button className="text-sm text-brand-coral hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-brand-coral rounded-full"></div>
                  <div>
                    <p className="font-medium text-brand-navy">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.target}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-semibold text-brand-navy mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-brand-navy text-white rounded-lg hover:bg-opacity-90 transition-all">
              <span className="font-medium">Create Moodboard</span>
              <Palette className="w-5 h-5" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-brand-coral text-white rounded-lg hover:bg-opacity-90 transition-all">
              <span className="font-medium">Generate Content</span>
              <FileText className="w-5 h-5" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white border border-brand-border text-brand-navy rounded-lg hover:bg-gray-50 transition-all">
              <span className="font-medium">Add Restaurant</span>
              <Users className="w-5 h-5" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white border border-brand-border text-brand-navy rounded-lg hover:bg-gray-50 transition-all">
              <span className="font-medium">Upgrade Plan</span>
              <CreditCard className="w-5 h-5" />
            </button>
          </div>
        </Card>
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-brand-navy to-brand-coral text-white">
        <div className="flex items-start space-x-4">
          <TrendingUp className="w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Pro Tip</h3>
            <p className="opacity-90">
              Create consistent branding across all your restaurants by using moodboards as a reference. 
              Our AI can generate cohesive color palettes and visual elements that match your brand identity.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
