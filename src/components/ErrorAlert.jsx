import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Copy, Check } from 'lucide-react';

export function ErrorAlert({ error, onClose, autoClose = true, duration = 8000 }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (autoClose && error) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, autoClose, duration, onClose]);

  const copyError = async () => {
    try {
      await navigator.clipboard?.writeText(error);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = error;
      document.body?.appendChild(textArea);
      textArea?.select();
      document.execCommand('copy');
      document.body?.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md w-full bg-red-50 border border-red-200 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-red-800 mb-1">
              Error
            </h3>
            <p className="text-sm text-red-700 break-words">
              {error}
            </p>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={copyError}
              className="text-red-400 hover:text-red-600 transition-colors"
              title="Copy error message"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="text-red-400 hover:text-red-600 transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar for auto-close */}
      {autoClose && (
        <div className="h-1 bg-red-200 rounded-b-lg overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all ease-linear"
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}