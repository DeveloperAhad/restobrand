import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, ChefHat } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Alert from '../components/Alert';

const RestaurantsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Mock data - will be replaced with API calls
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Bella Italia',
      cuisine: 'Italian',
      location: 'New York, NY',
      status: 'active',
      created_at: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sakura Sushi',
      cuisine: 'Japanese',
      location: 'Los Angeles, CA',
      status: 'active',
      created_at: '2024-02-20',
    },
    {
      id: 3,
      name: 'Le Petit Bistro',
      cuisine: 'French',
      location: 'Chicago, IL',
      status: 'inactive',
      created_at: '2024-03-10',
    },
  ]);

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRestaurant = () => {
    setSelectedRestaurant(null);
    setIsModalOpen(true);
  };

  const handleEditRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleDeleteRestaurant = (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      setRestaurants(restaurants.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Restaurants</h1>
          <p className="text-gray-600">Manage your restaurant locations and branding</p>
        </div>
        <Button onClick={handleAddRestaurant}>
          <Plus className="w-5 h-5 mr-2" />
          Add Restaurant
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants by name or cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-brand-navy"
          />
        </div>
      </Card>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} hoverable className="group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-brand-coral bg-opacity-10 rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-brand-coral" />
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  restaurant.status === 'active'
                    ? 'badge-success'
                    : 'badge-danger'
                }`}
              >
                {restaurant.status}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-brand-navy mb-2">
              {restaurant.name}
            </h3>
            <p className="text-gray-600 mb-1">{restaurant.cuisine}</p>
            <p className="text-sm text-gray-500 mb-4">{restaurant.location}</p>

            <div className="flex items-center space-x-2 pt-4 border-t border-brand-border">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleEditRestaurant(restaurant)}
                className="flex-1"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteRestaurant(restaurant.id)}
              >
                <Trash2 className="w-4 h-4 text-brand-danger" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <Card className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-navy mb-2">
            No restaurants found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Get started by adding your first restaurant'}
          </p>
          {!searchTerm && (
            <Button onClick={handleAddRestaurant}>
              <Plus className="w-5 h-5 mr-2" />
              Add Restaurant
            </Button>
          )}
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
        size="md"
      >
        <form className="space-y-4">
          <Input
            label="Restaurant Name"
            placeholder="e.g., Bella Italia"
            defaultValue={selectedRestaurant?.name}
          />
          <Input
            label="Cuisine Type"
            placeholder="e.g., Italian, Japanese, French"
            defaultValue={selectedRestaurant?.cuisine}
          />
          <Input
            label="Location"
            placeholder="e.g., New York, NY"
            defaultValue={selectedRestaurant?.location}
          />
          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {selectedRestaurant ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RestaurantsPage;
