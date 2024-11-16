'use client';

import React from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useToastStore } from '@/stores/toastStore';
import { Popup, PopupFooter, PopupButton } from '@/components/popup';
import { EyeIcon, EyeOffIcon, CopyIcon, EditIcon, TrashIcon } from '@/components/icons';

// CurrentPlan Component
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

// CreateKeyModal Component
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

// EditKeyModal Component
export function EditKeyModal() {
  const { 
    editingKeyId, 
    editKeyName, 
    editKeyValue,
    setEditingKey,
    resetEditState,
    updateApiKey 
  } = useDashboardStore();
  const { showToast } = useToastStore();

  const handleSaveEdit = async () => {
    if (!editKeyName.trim() || !editKeyValue.trim() || !editingKeyId) return;

    try {
      await updateApiKey(editingKeyId, editKeyName, editKeyValue);
      showToast('API key updated successfully');
      resetEditState();
    } catch (error: any) {
      showToast(error.message || 'Failed to update API key', 'error');
    }
  };

  return (
    <Popup
      isOpen={!!editingKeyId}
      onClose={resetEditState}
      title="Edit API Key"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="editKeyName" className="block text-sm font-medium text-gray-700 mb-1">
            API Key Name
          </label>
          <input
            id="editKeyName"
            type="text"
            value={editKeyName}
            onChange={(e) => setEditingKey(editingKeyId, e.target.value, editKeyValue)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="editKeyValue" className="block text-sm font-medium text-gray-700 mb-1">
            API Key Value
          </label>
          <input
            id="editKeyValue"
            type="text"
            value={editKeyValue}
            onChange={(e) => setEditingKey(editingKeyId, editKeyName, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <PopupFooter>
          <PopupButton onClick={resetEditState}>
            Cancel
          </PopupButton>
          <PopupButton
            onClick={handleSaveEdit}
            variant="primary"
            disabled={!editKeyName.trim() || !editKeyValue.trim()}
          >
            Save
          </PopupButton>
        </PopupFooter>
      </div>
    </Popup>
  );
} 