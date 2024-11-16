import { create } from 'zustand';

type ToastType = 'success' | 'error';

type ToastState = {
  message: string;
  type: ToastType;
  isVisible: boolean;
};

type ToastActions = {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
};

const initialState: ToastState = {
  message: '',
  type: 'success',
  isVisible: false,
};

export const useToastStore = create<ToastState & ToastActions>()((set) => ({
  ...initialState,
  
  showToast: (message: string, type: ToastType = 'success') => 
    set({ message, type, isVisible: true }),
  hideToast: () => set({ isVisible: false })
})); 