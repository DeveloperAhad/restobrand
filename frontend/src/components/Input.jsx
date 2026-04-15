import React from 'react';

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-brand-navy mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-coral focus:border-transparent transition-all duration-200 ${
          error
            ? 'border-brand-danger focus:ring-brand-danger'
            : 'border-brand-border'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-brand-danger">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
