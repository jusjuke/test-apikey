'use client';



import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { supabase } from '@/lib/supabase';

import { SupabaseClient } from '@supabase/supabase-js';



interface SupabaseContextType {

    supabase: SupabaseClient;

    isConnected: boolean;

}



const SupabaseContext = createContext<SupabaseContextType>({

    supabase,

    isConnected: false

});



export function SupabaseProvider({ children }: { children: ReactNode }) {

    const [isConnected, setIsConnected] = useState(false);



    useEffect(() => {

        const checkConnection = async () => {

            try {

                // 테이블 존재 여부 확인

                const { data, error } = await supabase

                    .from('api_keys')

                    .select('id')

                    .limit(1);

                

                if (error) {

                    console.error('Supabase connection error:', error.message);

                    setIsConnected(false);

                    return;

                }

                

                setIsConnected(true);

                console.log('Supabase connected successfully');

            } catch (error) {

                console.error('Supabase connection error:', error);

                setIsConnected(false);

            }

        };



        checkConnection();



        // Supabase 실시간 연결 상태 모니터링

        const {

            data: { subscription },

        } = supabase.auth.onAuthStateChange((event, session) => {

            if (event === 'SIGNED_IN') {

                setIsConnected(true);

            }

            if (event === 'SIGNED_OUT') {

                setIsConnected(false);

            }

        });



        return () => {

            subscription.unsubscribe();

        };

    }, []);



    return (

        <SupabaseContext.Provider value={{ supabase, isConnected }}>

            {children}

        </SupabaseContext.Provider>

    );

}



export function useSupabase() {

    const context = useContext(SupabaseContext);

    if (!context) {

        throw new Error('useSupabase must be used within a SupabaseProvider');

    }

    return context;

} 


