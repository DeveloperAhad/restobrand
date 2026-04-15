import React, { useState } from 'react';
import { Palette, Sparkles, Download, Share2, Heart } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

const BrandingPage = () => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [formData, setFormData] = useState({
    restaurant_name: '',
    cuisine_type: '',
    style_preference: '',
    description: '',
  });

  const moodboards = [
    {
      id: 1,
      name: 'Summer Menu 2024',
      style: 'Modern Minimalist',
      colors: ['#E94560', '#1A1A2E', '#F7F6F4', '#FFFFFF'],
      created_at: '2024-03-15',
      likes: 12,
    },
    {
      id: 2,
      name: 'Italian Classics',
      style: 'Rustic Traditional',
      colors: ['#BA7517', '#1D9E75', '#378ADD', '#E5E5E5'],
      created_at: '2024-03-10',
      likes: 8,
    },
    {
      id: 3,
      name: 'Asian Fusion',
      style: 'Contemporary Bold',
      colors: ['#E94560', '#1A1A2E', '#BA7517', '#F7F6F4'],
      created_at: '2024-03-05',
      likes: 15,
    },
  ];

  const styleOptions = [
    { id: 'modern', name: 'Modern Minimalist', description: 'Clean lines, simple shapes' },
    { id: 'rustic', name: 'Rustic Traditional', description: 'Warm, earthy, classic' },
    { id: 'contemporary', name: 'Contemporary Bold', description: 'Vibrant, dynamic, eye-catching' },
    { id: 'elegant', name: 'Elegant Luxury', description: 'Sophisticated, refined, premium' },
    { id: 'casual', name: 'Casual Friendly', description: 'Approachable, warm, inviting' },
    { id: 'industrial', name: 'Industrial Chic', description: 'Urban, edgy, modern' },
  ];

  const handleGenerate = () => {
    setIsGenerateModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call the API to generate moodboard
    console.log('Generating moodboard:', formData);
    setIsGenerateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Branding</h1>
          <p className="text-gray-600">Create stunning visual identities for your restaurants</p>
        </div>
        <Button onClick={handleGenerate}>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Moodboard
        </Button>
      </div>

      {/* Style Options Quick Select */}
      <Card>
        <h2 className="text-lg font-semibold text-brand-navy mb-4">Choose a Style</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {styleOptions.map((style) => (
            <button
              key={style.id}
              onClick={() => {
                setSelectedStyle(style.id);
                setFormData({ ...formData, style_preference: style.name });
                setIsGenerateModalOpen(true);
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedStyle === style.id
                  ? 'border-brand-coral bg-brand-coral bg-opacity-10'
                  : 'border-brand-border hover:border-brand-coral'
              }`}
            >
              <Palette className="w-6 h-6 text-brand-coral mx-auto mb-2" />
              <p className="text-sm font-medium text-brand-navy">{style.name}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Moodboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moodboards.map((moodboard) => (
          <Card key={moodboard.id} hoverable className="group">
            {/* Color Preview */}
            <div className="h-32 rounded-lg mb-4 overflow-hidden flex">
              {moodboard.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 h-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <h3 className="text-xl font-semibold text-brand-navy mb-2">
              {moodboard.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{moodboard.style}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-brand-coral" />
                <span className="text-sm text-gray-600">{moodboard.likes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Generate Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate AI Moodboard"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Restaurant Name"
            placeholder="e.g., Bella Italia"
            value={formData.restaurant_name}
            onChange={(e) =>
              setFormData({ ...formData, restaurant_name: e.target.value })
            }
            required
          />
          <Input
            label="Cuisine Type"
            placeholder="e.g., Italian, Japanese, French"
            value={formData.cuisine_type}
            onChange={(e) =>
              setFormData({ ...formData, cuisine_type: e.target.value })
            }
            required
          />
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">
              Style Preference
            </label>
            <select
              value={formData.style_preference}
              onChange={(e) =>
                setFormData({ ...formData, style_preference: e.target.value })
              }
              className="w-full px-4 py-3 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-coral"
              required
            >
              <option value="">Select a style</option>
              {styleOptions.map((style) => (
                <option key={style.id} value={style.name}>
                  {style.name} - {style.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">
              Additional Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe any specific elements, moods, or inspirations..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsGenerateModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              <Sparkles className="w-5 h-5 mr-2" />
              Generate with AI
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BrandingPage;
