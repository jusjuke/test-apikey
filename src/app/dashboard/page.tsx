"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from '@/components/SupabaseProvider';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useToastStore } from '@/stores/toastStore';
import { Toast } from '@/components/Toast';
import Sidebar from '@/components/Sidebar';
import { CurrentPlan, CreateKeyModal, EditKeyModal } from '@/components/dashboard';
import { ApiKeyTable } from '@/components/dashboard/ApiKeyTable';
import { Popup } from '@/components/popup';

export default function Dashboard() {
  const router = useRouter();
  const { isConnected } = useSupabase();
  const { fetchApiKeys, isLoading } = useDashboardStore();
  const { message, type, isVisible, hideToast } = useToastStore();
  const [isPopupVisible, setPopupVisible] = useState(false);

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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 bg-white">
        <div className="p-8">
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

            <Popup 
              isOpen={isPopupVisible} 
              onClose={() => setPopupVisible(false)}
              title="API Key Validation"
            >
              <div className="px-6 py-4">
                <p className="text-sm text-red-600">
                  Invalid API Key. Please check your credentials.
                </p>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}