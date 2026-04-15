import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const SchedulePage = () => {
  const scheduledPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: '🌮 Taco Tuesday special! 50% off all tacos today.',
      scheduled_for: '2024-03-26 18:00',
      restaurant: 'Casa Mexicana',
    },
    {
      id: 2,
      platform: 'Facebook',
      content: 'Join us this weekend for live music and great food! 🎵',
      scheduled_for: '2024-03-29 12:00',
      restaurant: 'The Grill House',
    },
    {
      id: 3,
      platform: 'Twitter',
      content: 'Happy Hour: 4-6 PM daily. Half-price appetizers! 🍹',
      scheduled_for: '2024-03-27 16:00',
      restaurant: 'Skyline Bar',
    },
    {
      id: 4,
      platform: 'Instagram',
      content: 'New dessert alert! Try our signature chocolate lava cake 🍫',
      scheduled_for: '2024-03-28 20:00',
      restaurant: 'Bella Italia',
    },
  ];

  const upcomingDays = [
    { day: 'Today', date: 'Mar 25', posts: 2 },
    { day: 'Tomorrow', date: 'Mar 26', posts: 3 },
    { day: 'Wed', date: 'Mar 27', posts: 1 },
    { day: 'Thu', date: 'Mar 28', posts: 4 },
    { day: 'Fri', date: 'Mar 29', posts: 2 },
    { day: 'Sat', date: 'Mar 30', posts: 0 },
    { day: 'Sun', date: 'Mar 31', posts: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Schedule</h1>
          <p className="text-gray-600">Plan and schedule your social media posts</p>
        </div>
        <Button>
          <Calendar className="w-5 h-5 mr-2" />
          Schedule New Post
        </Button>
      </div>

      {/* Week Overview */}
      <Card>
        <h2 className="text-lg font-semibold text-brand-navy mb-4">This Week</h2>
        <div className="grid grid-cols-7 gap-2">
          {upcomingDays.map((day, index) => (
            <div
              key={index}
              className={`text-center p-3 rounded-lg ${
                day.day === 'Today'
                  ? 'bg-brand-coral text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <p className="text-xs font-medium mb-1">{day.day}</p>
              <p className="text-sm mb-2">{day.date}</p>
              <div className="flex justify-center">
                {day.posts > 0 ? (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      day.day === 'Today'
                        ? 'bg-white bg-opacity-20'
                        : 'bg-brand-coral bg-opacity-10 text-brand-coral'
                    }`}
                  >
                    {day.posts} posts
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">No posts</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-brand-navy mb-4">Upcoming Posts</h2>
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <div
                key={post.id}
                className="border border-brand-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-brand-navy">{post.platform}</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Scheduled
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(post.scheduled_for).toLocaleString()}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2 line-clamp-2">{post.content}</p>
                <p className="text-xs text-gray-500">{post.restaurant}</p>
                <div className="flex space-x-2 mt-3 pt-3 border-t border-brand-border">
                  <Button variant="secondary" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-brand-navy mb-4">Calendar View</h2>
          <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Full calendar view coming soon</p>
              <Button variant="outline" size="sm" className="mt-4">
                View All Scheduled
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-brand-navy to-brand-coral text-white">
        <div className="flex items-start space-x-4">
          <CheckCircle className="w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Scheduling Tips</h3>
            <ul className="space-y-2 opacity-90 text-sm">
              <li>• Best posting times: 12-1 PM and 6-8 PM for restaurants</li>
              <li>• Schedule at least 3-4 posts per week for optimal engagement</li>
              <li>• Mix promotional content with engaging stories and behind-the-scenes</li>
              <li>• Use AI to generate caption variations for A/B testing</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SchedulePage;
