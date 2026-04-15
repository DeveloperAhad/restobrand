import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-navy mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <h2 className="text-xl font-semibold text-brand-navy mb-6">Profile Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" placeholder="John" defaultValue="John" />
            <Input label="Last Name" placeholder="Doe" defaultValue="Doe" />
          </div>
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            defaultValue="john@example.com"
          />
          <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
          <div className="pt-4">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>

      {/* Password Change */}
      <Card>
        <h2 className="text-xl font-semibold text-brand-navy mb-6">Change Password</h2>
        <form className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            helperText="At least 8 characters"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
          />
          <div className="pt-4">
            <Button type="submit" variant="secondary">Update Password</Button>
          </div>
        </form>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-xl font-semibold text-brand-navy mb-6">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            { id: 'email_posts', label: 'Email when posts are published', defaultChecked: true },
            { id: 'email_reports', label: 'Weekly analytics reports', defaultChecked: true },
            { id: 'email_credits', label: 'Low credit alerts', defaultChecked: true },
            { id: 'browser_push', label: 'Browser push notifications', defaultChecked: false },
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between py-3 border-b border-brand-border last:border-0">
              <label htmlFor={setting.id} className="text-gray-700 cursor-pointer flex-1">
                {setting.label}
              </label>
              <input
                type="checkbox"
                id={setting.id}
                defaultChecked={setting.defaultChecked}
                className="w-5 h-5 text-brand-coral border-brand-border rounded focus:ring-brand-coral"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-brand-danger">
        <h2 className="text-xl font-semibold text-brand-danger mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="danger">Delete Account</Button>
      </Card>
    </div>
  );
};

export default SettingsPage;
