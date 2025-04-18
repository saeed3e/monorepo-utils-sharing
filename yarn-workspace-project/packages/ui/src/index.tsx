import React from 'react';
import { truncateText } from 'utils';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}) => {
  const baseClasses = 'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

interface CardProps {
  title: string;
  description: string;
  maxDescriptionLength?: number;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  maxDescriptionLength = 100,
  footer
}) => {
  const truncatedDescription = truncateText(description, maxDescriptionLength);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{truncatedDescription}</p>
      </div>
      {footer && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const typeConfig = {
    info: {
      containerClass: 'bg-blue-50 border-blue-200',
      textClass: 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-500" />
    },
    success: {
      containerClass: 'bg-green-50 border-green-200',
      textClass: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    warning: {
      containerClass: 'bg-yellow-50 border-yellow-200',
      textClass: 'text-yellow-800',
      icon: <AlertCircle className="w-5 h-5 text-yellow-500" />
    },
    error: {
      containerClass: 'bg-red-50 border-red-200',
      textClass: 'text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />
    }
  };
  
  const { containerClass, textClass, icon } = typeConfig[type];
  
  return (
    <div className={`rounded-md border px-4 py-3 ${containerClass}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div className={`text-sm ${textClass}`}>
          {message}
        </div>
      </div>
    </div>
  );
};