import './globals.css';

import { SupabaseProvider } from '@/components/SupabaseProvider';
import { SessionProvider } from "next-auth/react"



export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <html lang="en">

      <body className="min-h-screen bg-white">

        <SupabaseProvider>

          <SessionProvider>{children}</SessionProvider>

        </SupabaseProvider>

      </body>

    </html>

  );

} 


