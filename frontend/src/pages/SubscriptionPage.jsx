import React, { useState } from 'react';
import { CreditCard, Check, Zap } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { formatCurrency } from '../hooks';

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('starter');

  const currentPlan = {
    name: 'Free',
    price: 0,
    credits: { total: 50, used: 32, remaining: 18 },
    renewDate: 'N/A',
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      credits: 50,
      features: [
        '50 AI credits/month',
        '1 restaurant',
        'Basic moodboards',
        'Email support',
        'Community access',
      ],
      popular: false,
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 12,
      period: 'month',
      credits: 200,
      features: [
        '200 AI credits/month',
        '3 restaurants',
        'Advanced moodboards',
        'Priority email support',
        'Social media scheduling',
        'Content generation',
      ],
      popular: true,
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: 29,
      period: 'month',
      credits: 600,
      features: [
        '600 AI credits/month',
        '10 restaurants',
        'Premium moodboards & logos',
        '24/7 priority support',
        'Advanced scheduling',
        'AI content generation',
        'Analytics dashboard',
        'Team collaboration',
      ],
      popular: false,
    },
    {
      id: 'business',
      name: 'Business',
      price: 79,
      period: 'month',
      credits: 2000,
      features: [
        '2000 AI credits/month',
        'Unlimited restaurants',
        'All branding tools',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'API access',
        'Advanced analytics',
      ],
      popular: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-navy mb-2">Subscription</h1>
        <p className="text-gray-600">Manage your plan and billing</p>
      </div>

      {/* Current Plan */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-brand-navy mb-2">Current Plan</h2>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-brand-coral">{currentPlan.name}</span>
              <span className="text-gray-500">Renews: {currentPlan.renewDate}</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 min-w-[200px]">
            <p className="text-sm text-gray-600 mb-2">Credits This Month</p>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-brand-navy">
                  {currentPlan.credits.remaining}
                </span>
                <span className="text-gray-500 text-sm"> / {currentPlan.credits.total}</span>
              </div>
              <Zap className="w-5 h-5 text-brand-coral" />
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-coral h-2 rounded-full transition-all"
                style={{
                  width: `${(currentPlan.credits.used / currentPlan.credits.total) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {currentPlan.credits.used} used this month
            </p>
          </div>
        </div>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-brand-navy mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                selectedPlan === plan.id ? 'ring-2 ring-brand-coral' : ''
              } ${plan.popular ? 'border-brand-coral border-2' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-coral text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-brand-navy mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-brand-navy">
                    {formatCurrency(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500 ml-1">/{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">{plan.credits} credits/month</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-brand-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={selectedPlan === plan.id ? 'primary' : 'secondary'}
                className="w-full"
              >
                {currentPlan.name === plan.name ? 'Current Plan' : 'Upgrade'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      {selectedPlan !== 'free' && selectedPlan !== currentPlan.name.toLowerCase() && (
        <Card className="bg-gradient-to-r from-brand-navy to-brand-coral text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Upgrade to {plans.find((p) => p.id === selectedPlan)?.name}
              </h3>
              <p className="opacity-90">
                Get {plans.find((p) => p.id === selectedPlan)?.credits} AI credits per month and
                unlock all premium features.
              </p>
            </div>
            <Button variant="secondary" className="flex-shrink-0">
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      )}

      {/* FAQ */}
      <Card>
        <h2 className="text-xl font-semibold text-brand-navy mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-brand-navy mb-2">When will I be charged?</h4>
            <p className="text-sm text-gray-600">
              You'll be charged immediately upon upgrading. Your subscription will automatically
              renew every month unless cancelled.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-brand-navy mb-2">Can I cancel anytime?</h4>
            <p className="text-sm text-gray-600">
              Yes, you can cancel your subscription at any time. You'll continue to have access
              until the end of your billing period.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-brand-navy mb-2">What happens to unused credits?</h4>
            <p className="text-sm text-gray-600">
              Unused credits reset at the end of each billing cycle. They don't roll over to the
              next month.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionPage;
