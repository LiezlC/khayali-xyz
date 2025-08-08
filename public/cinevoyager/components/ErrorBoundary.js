'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CineVoyage Error Boundary:', error, errorInfo);
    
    // Check if it's the browser extension React conflict
    if (error.message && error.message.includes('createRoot')) {
      console.warn('Browser extension React conflict detected. Attempting recovery...');
      // Try to reload after a short delay
      setTimeout(() => {
        if (this.state.hasError) {
          window.location.reload();
        }
      }, 2000);
    }
    
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const isExtensionConflict = this.state.error?.message?.includes('createRoot') || 
                                 this.state.error?.stack?.includes('chrome-extension://');
      
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
          <div className="max-w-lg mx-auto bg-gray-800 rounded-lg p-8 text-center">
            <div className="text-red-400 text-6xl mb-4">
              {isExtensionConflict ? '🔌' : '⚠️'}
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              {isExtensionConflict ? 'Browser Extension Conflict' : 'Something went wrong'}
            </h1>
            <p className="text-gray-300 mb-6">
              {isExtensionConflict 
                ? 'A browser extension is interfering with CineVoyage. Try disabling extensions or using an incognito window.'
                : 'The app encountered an error. This might be caused by a browser extension conflict.'
              }
            </p>
            
            {isExtensionConflict && (
              <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
                <h3 className="text-yellow-400 font-semibold mb-2">Quick fixes:</h3>
                <ul className="text-sm text-yellow-200 text-left space-y-1">
                  <li>• Open in incognito/private mode</li>
                  <li>• Disable browser extensions temporarily</li>
                  <li>• Try a different browser</li>
                  <li>• Clear browser cache and cookies</li>
                </ul>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Reload Page
              </button>
              {isExtensionConflict && (
                <button
                  onClick={() => window.open(window.location.href, '_blank')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Open in New Tab
                </button>
              )}
            </div>
            
            {this.props.showDetails && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-gray-400 cursor-pointer">
                  Technical Details
                </summary>
                <pre className="text-xs text-gray-500 mt-2 overflow-auto max-h-32">
                  {this.state.error.toString()}
                  {this.state.errorInfo && `\n\nComponent Stack:${this.state.errorInfo.componentStack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;