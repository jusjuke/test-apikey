'use client';

import React from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useToastStore } from '@/stores/toastStore';
import { TableActions } from '@/components/dashboard/TableActions';

export function ApiKeyTable() {
  const { 
    apiKeys, 
    setEditingKey, 
    deleteApiKey,
    visibleKeys,
    toggleKeyVisibility 
  } = useDashboardStore();
  const { showToast } = useToastStore();

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
      .then(() => showToast('API key copied to clipboard'))
      .catch(() => showToast('Failed to copy API key', 'error'));
  };

  const maskApiKey = (key: string, isVisible: boolean) => {
    if (isVisible) return key;
    return `${key.slice(0, 5)}${'*'.repeat(key.length - 5)}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">NAME</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">USAGE</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">KEY</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((key) => (
            <tr key={key.id} className="border-b border-gray-200">
              <td className="py-3 px-4 text-sm">{key.name}</td>
              <td className="py-3 px-4 text-sm">{key.usage}</td>
              <td className="py-3 px-4 text-sm font-mono">
                {maskApiKey(key.key, visibleKeys[key.id] || false)}
              </td>
              <td className="py-3 px-4">
                <TableActions
                  keyId={key.id}
                  keyName={key.name}
                  keyValue={key.key}
                  isVisible={visibleKeys[key.id] || false}
                  onToggleVisibility={() => toggleKeyVisibility(key.id)}
                  onCopy={() => handleCopy(key.key)}
                  onEdit={() => setEditingKey(key.id, key.name, key.key)}
                  onDelete={() => deleteApiKey(key.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 