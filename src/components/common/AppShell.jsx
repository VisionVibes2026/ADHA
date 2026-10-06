import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import GovHeaderStrip from './GovHeaderStrip';
import CommandPalette from './CommandPalette';

export default function AppShell({ children }) {
  const location = useLocation();
  const isKiosk = location.pathname === '/kiosk';

  if (isKiosk) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#0B1120] overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Global Command Palette (⌘K) */}
      <CommandPalette />

      {/* Modern Enterprise Sidebar */}
      <Sidebar />

      {/* Main App Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Official National Archival Telemetry & Gov Identity Strip */}
        <GovHeaderStrip />
        
        {/* Glassmorphic TopBar */}
        <TopBar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1520px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
