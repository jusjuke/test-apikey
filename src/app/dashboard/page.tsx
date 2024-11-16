"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from '@/components/SupabaseProvider';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useToastStore } from '@/stores/toastStore';
import { Toast } from '@/components/Toast';
import { CurrentPlan, CreateKeyModal, EditKeyModal } from '@/components/dashboard';
import { ApiKeyTable } from '@/components/dashboard/ApiKeyTable';

export default function Dashboard() {
  const router = useRouter();
  const { isConnected } = useSupabase();
  const { fetchApiKeys, isLoading } = useDashboardStore();
  const { message, type, isVisible, hideToast } = useToastStore();

  useEffect(() => {
    if (isConnected) {
      fetchApiKeys().catch(console.error);
    }
  }, [isConnected, fetchApiKeys]);

  if (!isConnected || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Pages</span>
          <span>/</span>
          <span>Overview</span>
        </div>

        <h1 className="text-3xl font-semibold text-gray-900">Overview</h1>

        <CurrentPlan />
        <ApiKeyTable />
        <CreateKeyModal />
        <EditKeyModal />
        
        <Toast 
          message={message}
          type={type}
          isVisible={isVisible}
          onClose={hideToast}
        />
      </div>
    </div>
  );
}