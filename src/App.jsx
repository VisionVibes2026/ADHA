import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ArchiveProvider } from './context/ArchiveContext';
import AppShell from './components/common/AppShell';

import DashboardView from './pages/DashboardView';
import ArchiveView from './pages/ArchiveView';
import DocumentReaderView from './pages/DocumentReaderView';
import AISearchView from './pages/AISearchView';
import ResearchAssistantView from './pages/ResearchAssistantView';
import KnowledgeGraphView from './pages/KnowledgeGraphView';
import TimelineView from './pages/TimelineView';
import IngestionView from './pages/IngestionView';
import CuratorReviewView from './pages/CuratorReviewView';
import ConnectedInstitutionsView from './pages/ConnectedInstitutionsView';
import AnalyticsView from './pages/AnalyticsView';
import PreservationView from './pages/PreservationView';
import AdminPlaceholder from './pages/AdminPlaceholder';

export default function App() {
  return (
    <ArchiveProvider>
      <Router>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/archive" element={<ArchiveView />} />
            <Route path="/documents/:id" element={<DocumentReaderView />} />
            <Route path="/ai-search" element={<AISearchView />} />
            <Route path="/research-assistant" element={<ResearchAssistantView />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraphView />} />
            <Route path="/timeline" element={<TimelineView />} />
            <Route path="/ingestion" element={<IngestionView />} />
            <Route path="/review" element={<CuratorReviewView />} />
            <Route path="/institutions" element={<ConnectedInstitutionsView />} />
            <Route path="/analytics" element={<AnalyticsView />} />
            <Route path="/preservation" element={<PreservationView />} />
            <Route path="/users" element={<AdminPlaceholder title="Users & Roles Registry" description="Manage archivist credentials and permissions" />} />
            <Route path="/settings" element={<AdminPlaceholder title="System Settings" description="Repository parameters, API tokens, and backup schedules" />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppShell>
      </Router>
    </ArchiveProvider>
  );
}
