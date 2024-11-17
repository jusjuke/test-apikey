"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Toast } from '@/components/Toast';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    isVisible: boolean;
    type: 'success' | 'error';
  }>({
    message: '',
    isVisible: false,
    type: 'success'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      setToast({
        message: response.ok ? 'Valid API Key' : 'API Key Invalid',
        isVisible: true,
        type: response.ok ? 'success' : 'error'
      });
    } catch (error) {
      setToast({
        message: 'API Key Invalid',
        isVisible: true,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 bg-white">
        <div className="p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Pages</span>
              <span>/</span>
              <span>API Playground</span>
            </div>

            <h1 className="text-3xl font-semibold text-gray-900">API Playground</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="apiKey"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your API key"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
              >
                {isLoading ? 'Validating...' : 'Validate API Key'}
              </button>
            </form>

            <Toast 
              message={toast.message}
              type={toast.type}
              isVisible={toast.isVisible}
              onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 