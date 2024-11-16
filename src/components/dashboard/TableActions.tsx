'use client';

import React from 'react';
import { 
  EyeIcon, 
  EyeOffIcon, 
  CopyIcon, 
  EditIcon, 
  TrashIcon 
} from '@/components/icons';

interface TableActionsProps {
  keyId: string;
  keyName: string;
  keyValue: string;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TableActions({
  isVisible,
  onToggleVisibility,
  onCopy,
  onEdit,
  onDelete
}: TableActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {onToggleVisibility && (
        <button
          onClick={onToggleVisibility}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label={isVisible ? "Hide API key" : "Show API key"}
        >
          {isVisible ? (
            <EyeIcon className="w-4 h-4" />
          ) : (
            <EyeOffIcon className="w-4 h-4" />
          )}
        </button>
      )}
      <button
        onClick={onCopy}
        className="p-2 text-gray-500 hover:text-gray-700"
        aria-label="Copy API key"
      >
        <CopyIcon className="w-4 h-4" />
      </button>
      <button
        onClick={onEdit}
        className="p-2 text-gray-500 hover:text-gray-700"
        aria-label="Edit API key"
      >
        <EditIcon className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-gray-500 hover:text-gray-700"
        aria-label="Delete API key"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
} 