// src/components/common/ErrorAlert.tsx
'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function ErrorAlert({ 
  message, 
  onClose, 
  autoClose = true,
  duration = 5000 
}: ErrorAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm flex-grow">{message}</p>
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="text-red-600 hover:text-red-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}