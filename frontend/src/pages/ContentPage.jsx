import React from 'react';
import { FileText, Image, Hash } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const ContentPage = () => {
  const posts = [
    {
      id: 1,
      platform: 'Instagram',
      content: '🍝 Fresh pasta made daily! Come taste the authentic Italian flavors at Bella Italia. #ItalianFood #FreshPasta',
      status: 'published',
      scheduled_for: '2024-03-20 18:00',
      engagement: { likes: 245, comments: 32, shares: 18 },
    },
    {
      id: 2,
      platform: 'Facebook',
      content: 'Weekend Special: Buy one pizza, get one free! Valid Saturday & Sunday only. 🍕',
      status: 'scheduled',
      scheduled_for: '2024-03-23 12:00',
      engagement: null,
    },
    {
      id: 3,
      platform: 'Twitter',
      content: 'New menu alert! 🎉 Try our chef\'s special dishes this week. Reserve your table now!',
      status: 'draft',
      scheduled_for: null,
      engagement: null,
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      published: 'badge-success',
      scheduled: 'badge-info',
      draft: 'badge-warning',
    };
    return badges[status] || 'badge-info';
  };

  const getPlatformIcon = (platform) => {
    return <Image className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Content</h1>
          <p className="text-gray-600">Create and manage social media content with AI</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <Hash className="w-5 h-5 mr-2" />
            Generate Hashtags
          </Button>
          <Button>
            <FileText className="w-5 h-5 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Published Posts</p>
              <p className="text-2xl font-bold text-brand-navy">28</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-brand-navy">12</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Image className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Engagement</p>
              <p className="text-2xl font-bold text-brand-navy">5.2K</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Hash className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Posts List */}
      <Card>
        <h2 className="text-lg font-semibold text-brand-navy mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-brand-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-brand-navy bg-opacity-10 p-2 rounded-lg">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div>
                    <h3 className="font-medium text-brand-navy">{post.platform}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(post.status)}`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                {post.scheduled_for && (
                  <p className="text-sm text-gray-500">
                    {new Date(post.scheduled_for).toLocaleString()}
                  </p>
                )}
              </div>

              <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>

              {post.engagement && (
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>❤️ {post.engagement.likes}</span>
                  <span>💬 {post.engagement.comments}</span>
                  <span>🔄 {post.engagement.shares}</span>
                </div>
              )}

              <div className="flex space-x-2 mt-4 pt-4 border-t border-brand-border">
                <Button variant="secondary" size="sm">
                  Edit
                </Button>
                {post.status === 'draft' && (
                  <Button size="sm">Schedule</Button>
                )}
                <Button variant="ghost" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Content Generator Section */}
      <Card className="bg-gradient-to-r from-brand-navy to-brand-coral text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">AI Content Generator</h3>
            <p className="opacity-90">
              Generate engaging captions, hashtags, and post ideas in seconds using AI.
              Save time and maintain consistent branding across all platforms.
            </p>
          </div>
          <Button variant="secondary" className="flex-shrink-0">
            <FileText className="w-5 h-5 mr-2" />
            Try AI Generator
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContentPage;
