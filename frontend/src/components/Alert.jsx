import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

const Alert = ({ type = 'info', title, message, onClose }) => {
  const variants = {
    success: {
      icon: CheckCircle,
      bgClass: 'bg-green-50',
      borderClass: 'border-green-200',
      textClass: 'text-green-800',
      iconClass: 'text-green-500',
    },
    error: {
      icon: XCircle,
      bgClass: 'bg-red-50',
      borderClass: 'border-red-200',
      textClass: 'text-red-800',
      iconClass: 'text-red-500',
    },
    warning: {
      icon: AlertCircle,
      bgClass: 'bg-yellow-50',
      borderClass: 'border-yellow-200',
      textClass: 'text-yellow-800',
      iconClass: 'text-yellow-500',
    },
    info: {
      icon: Info,
      bgClass: 'bg-blue-50',
      borderClass: 'border-blue-200',
      textClass: 'text-blue-800',
      iconClass: 'text-blue-500',
    },
  };

  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div className={`${variant.bgClass} border ${variant.borderClass} rounded-lg p-4`}>
      <div className="flex items-start">
        <Icon className={`w-5 h-5 ${variant.iconClass} mr-3 mt-0.5`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-medium ${variant.textClass} mb-1`}>{title}</h4>
          )}
          {message && (
            <p className={`text-sm ${variant.textClass} opacity-90`}>{message}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-4 ${variant.textClass} hover:opacity-75`}
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
