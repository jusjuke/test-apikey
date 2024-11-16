'use client';

import React from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useToastStore } from '@/stores/toastStore';
import { Popup, PopupFooter, PopupButton } from '@/components/popup';

export function CreateKeyModal() {
  const { 
    isCreating, 
    newKeyName, 
    setIsCreating, 
    setNewKeyName, 
    createApiKey 
  } = useDashboardStore();
  const { showToast } = useToastStore();

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;

    try {
      await createApiKey(newKeyName);
      showToast('New API key created successfully');
    } catch (error: any) {
      showToast(error.message || 'Failed to create API key', 'error');
    }
  };

  return (
    <Popup
      isOpen={isCreating}
      onClose={() => setIsCreating(false)}
      title="Create New API Key"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
            API Key Name
          </label>
          <input
            id="keyName"
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Enter key name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <PopupFooter>
          <PopupButton onClick={() => setIsCreating(false)}>
            Cancel
          </PopupButton>
          <PopupButton
            onClick={handleCreateKey}
            variant="primary"
            disabled={!newKeyName.trim()}
          >
            Create
          </PopupButton>
        </PopupFooter>
      </div>
    </Popup>
  );
} 