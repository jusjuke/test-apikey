'use client';

import React from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useToastStore } from '@/stores/toastStore';
import { Popup, PopupFooter, PopupButton } from '@/components/popup';

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