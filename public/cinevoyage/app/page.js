'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from '../components/ErrorBoundary';

const AppSelector = dynamic(() => import('../app_selector'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading CineVoyage...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <ErrorBoundary showDetails={true}>
      <AppSelector />
    </ErrorBoundary>
  )
}