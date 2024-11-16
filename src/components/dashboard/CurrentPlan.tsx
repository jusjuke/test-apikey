'use client';

import React from 'react';

export function CurrentPlan() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200 p-8">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-600">CURRENT PLAN</p>
          <h2 className="text-4xl font-bold text-gray-900">Researcher</h2>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">API Limit</span>
              <span className="inline-flex items-center justify-center rounded-full bg-white/20 w-4 h-4 text-xs">?</span>
            </div>
            <div className="w-full bg-black/10 rounded-full h-2">
              <div className="bg-white/40 h-2 rounded-full" style={{ width: "0%" }}></div>
            </div>
            <p className="text-sm text-gray-600">0/1,000 Requests</p>
          </div>
        </div>
        <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
          Manage Plan
        </button>
      </div>
    </div>
  );
} 