import './globals.css';

import { SupabaseProvider } from '@/components/SupabaseProvider';



export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <html lang="en">

      <body className="min-h-screen bg-white">

        <SupabaseProvider>

          {children}

        </SupabaseProvider>

      </body>

    </html>

  );

} 


