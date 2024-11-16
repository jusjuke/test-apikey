import { create } from 'zustand';
import { ApiKey } from '@/types/api-key';
import { supabase } from '@/lib/supabase';

type DashboardState = {
  apiKeys: ApiKey[];
  isCreating: boolean;
  newKeyName: string;
  visibleKeys: { [key: string]: boolean };
  editingKeyId: string | null;
  editKeyName: string;
  editKeyValue: string;
  isLoading: boolean;
};

type DashboardActions = {
  setApiKeys: (apiKeys: ApiKey[]) => void;
  setIsCreating: (isCreating: boolean) => void;
  setNewKeyName: (name: string) => void;
  toggleKeyVisibility: (id: string) => void;
  setEditingKey: (id: string | null, name?: string, value?: string) => void;
  resetEditState: () => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchApiKeys: () => Promise<void>;
  createApiKey: (name: string) => Promise<void>;
  updateApiKey: (id: string, name: string, key: string) => Promise<void>;
  deleteApiKey: (id: string) => Promise<void>;
};

export const useDashboardStore = create<DashboardState & DashboardActions>((set, get) => ({
  // State
  apiKeys: [],
  isCreating: false,
  newKeyName: '',
  visibleKeys: {},
  editingKeyId: null,
  editKeyName: '',
  editKeyValue: '',
  isLoading: true,

  // Actions
  setApiKeys: (apiKeys) => set({ apiKeys }),
  setIsCreating: (isCreating) => set({ isCreating }),
  setNewKeyName: (newKeyName) => set({ newKeyName }),
  toggleKeyVisibility: (id) => 
    set((state) => ({
      visibleKeys: {
        ...state.visibleKeys,
        [id]: !state.visibleKeys[id]
      }
    })),
  setEditingKey: (id, name = '', value = '') => 
    set({ editingKeyId: id, editKeyName: name, editKeyValue: value }),
  resetEditState: () => 
    set({ editingKeyId: null, editKeyName: '', editKeyValue: '' }),
  setIsLoading: (isLoading) => set({ isLoading }),

  // API Actions
  fetchApiKeys: async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ apiKeys: data || [], isLoading: false });
    } catch (error: any) {
      console.error('Error fetching API keys:', error.message || error);
      set({ isLoading: false });
      throw error;
    }
  },

  createApiKey: async (name: string) => {
    try {
      const newKey = {
        name,
        key: `tvly-${Math.random().toString(36).substring(2, 30)}`,
        usage: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('api_keys')
        .insert([newKey])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        set((state) => ({
          apiKeys: [...state.apiKeys, data],
          newKeyName: '',
          isCreating: false
        }));
      }
    } catch (error: any) {
      console.error('Error creating API key:', error.message || error);
      throw error;
    }
  },

  updateApiKey: async (id: string, name: string, key: string) => {
    try {
      const updates = {
        name,
        key,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('api_keys')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        apiKeys: state.apiKeys.map(key =>
          key.id === id ? { ...key, ...updates } : key
        ),
        editingKeyId: null,
        editKeyName: '',
        editKeyValue: ''
      }));
    } catch (error: any) {
      console.error('Error updating API key:', error.message || error);
      throw error;
    }
  },

  deleteApiKey: async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        apiKeys: state.apiKeys.filter(key => key.id !== id)
      }));
    } catch (error: any) {
      console.error('Error deleting API key:', error.message || error);
      throw error;
    }
  }
})); 