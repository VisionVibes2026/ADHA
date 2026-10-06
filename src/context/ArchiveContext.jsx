import React, { createContext, useContext, useState, useEffect } from 'react';
import { ARCHIVE_RECORDS, PENDING_REVIEW_QUEUE } from '../data/mockRecords';

const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const [records, setRecords] = useState(ARCHIVE_RECORDS);
  const [reviewQueue, setReviewQueue] = useState(PENDING_REVIEW_QUEUE);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedRepository, setSelectedRepository] = useState('National Archives & Memorial Repository');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedType, setSelectedType] = useState('All Artifacts');
  const [selectedSpan, setSelectedSpan] = useState('1916 – 1956');
  const [selectedScript, setSelectedScript] = useState('All Scripts');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid' | 'timeline'
  
  // Theme management: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('adha-theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('adha-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'OCR Ingestion Pipeline Completed',
      desc: 'Batch #2041 "Annihilation of Caste annotations" processed 42 folios.',
      time: '12m ago',
      unread: true,
      type: 'success'
    },
    {
      id: 'notif-2',
      title: 'Curator Sign-off Requested',
      desc: 'Speech Record DOC-V3 awaiting Chief Curator cryptographic sign-off.',
      time: '1h ago',
      unread: true,
      type: 'warning'
    },
    {
      id: 'notif-3',
      title: 'Rare Photograph Metadata Conflict',
      desc: 'Location tag mismatch between Bombay and Pune archive index.',
      time: '3h ago',
      unread: true,
      type: 'danger'
    }
  ]);

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Command Palette State (⌘K or /)
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Approve a review item
  const handleApproveReview = (id) => {
    setReviewQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item));
  };

  // Sign off a review item
  const handleSignOffReview = (id) => {
    setReviewQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'Signed Off' } : item));
  };

  return (
    <ArchiveContext.Provider
      value={{
        records,
        setRecords,
        reviewQueue,
        handleApproveReview,
        handleSignOffReview,
        selectedLanguage,
        setSelectedLanguage,
        selectedRepository,
        setSelectedRepository,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        selectedType,
        setSelectedType,
        selectedSpan,
        setSelectedSpan,
        selectedScript,
        setSelectedScript,
        verifiedOnly,
        setVerifiedOnly,
        viewMode,
        setViewMode,
        theme,
        setTheme,
        toggleTheme,
        notifications,
        setNotifications,
        markAllNotificationsRead,
        isCommandOpen,
        setIsCommandOpen
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => useContext(ArchiveContext);
