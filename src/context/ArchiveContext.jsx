import React, { createContext, useContext, useState } from 'react';
import { ARCHIVE_RECORDS, PENDING_REVIEW_QUEUE } from '../data/mockRecords';

const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const [records, setRecords] = useState(ARCHIVE_RECORDS);
  const [reviewQueue, setReviewQueue] = useState(PENDING_REVIEW_QUEUE);
  const [selectedLanguage, setSelectedLanguage] = useState('English / हिन्दी / தமிழ் / मराठी');
  const [selectedRepository, setSelectedRepository] = useState('National Archives & Memorial Repository');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedType, setSelectedType] = useState('All Artifacts');
  const [selectedSpan, setSelectedSpan] = useState('1916 – 1956');
  const [selectedScript, setSelectedScript] = useState('All Scripts');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid' | 'timeline'

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
        setViewMode
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => useContext(ArchiveContext);
