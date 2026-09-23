import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  FileText, 
  Image as ImageIcon, 
  Volume2, 
  Users, 
  ArrowRight,
  Sparkles,
  GitFork,
  Clock,
  BookOpen
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';

// Import local assets
import heroPortrait from '../assets/hero_portrait.png';
import thumbArchiveBooks from '../assets/thumb_archive_books.png';
import thumbKnowledgeGraph from '../assets/thumb_knowledge_graph.png';
import thumbTimelineNodes from '../assets/thumb_timeline_nodes.png';
import thumbAiAssistant from '../assets/thumb_ai_assistant.png';
import collectionAssembly from '../assets/collection_assembly.png';
import collectionSocialJustice from '../assets/collection_social_justice.png';
import collectionRarePhoto from '../assets/collection_rare_photo.png';
import collectionLetters from '../assets/collection_letters.png';

export default function DashboardView() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useArchive();

  return (
    <div className="space-y-6 pb-12 font-sans bg-[#F9F7F5] min-h-screen -m-6 p-6">
      
      {/* Top Header Bar inside Dashboard View */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pb-1">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate('/ai-search');
            }}
            placeholder="Search documents, people, events..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-2xs"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="p-2 text-slate-600 hover:bg-slate-200/60 rounded-full relative transition-colors bg-white border border-slate-200">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1 border border-white"></span>
          </button>
          
          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#12243E] text-white font-bold text-xs flex items-center justify-center font-mono shadow-2xs">
            SK
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="bg-[#F3EDE6] border border-[#E3D9CD] rounded-2xl overflow-hidden relative shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-6 p-8 lg:p-10 space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Preserve.<br />
                Connect.<br />
                Inspire.
              </h1>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-xs font-mono font-bold tracking-widest text-[#12243E] uppercase">
                AMBEDKAR DIGITAL HERITAGE ARCHIVE
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed font-sans max-w-md">
                Explore the life, writings, speeches and legacy of Dr. B. R. Ambedkar through an intelligent, interactive and inclusive digital archive.
              </p>
            </div>
          </div>

          {/* Right Hero Portrait & Calligraphy Quote */}
          <div className="lg:col-span-6 relative flex items-center justify-end min-h-[280px]">
            {/* Ambedkar Hero Image */}
            <div className="relative w-full h-72 sm:h-80 overflow-hidden flex justify-end">
              <img 
                src={heroPortrait} 
                alt="Dr. B. R. Ambedkar Archival Portrait" 
                className="h-full object-contain object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F3EDE6] via-transparent to-transparent"></div>
            </div>

            {/* Handwritten Script Quote Overlay */}
            <div className="absolute top-6 right-8 text-right max-w-xs font-serif italic text-slate-800 space-y-1 select-none pointer-events-none hidden sm:block">
              <p className="text-lg text-slate-900 font-serif leading-snug tracking-wide">
                “Life should be great rather than long”
              </p>
              <p className="text-xs font-sans not-italic font-bold text-slate-700">
                B. R. Ambedkar
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Metrics Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Documents */}
        <div 
          onClick={() => navigate('/archive')}
          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 leading-tight">5,428</p>
            <p className="text-xs font-bold text-slate-800">Documents</p>
            <p className="text-[11px] text-slate-500 font-sans">Writings, letters, manuscripts</p>
          </div>
        </div>

        {/* Metric 2: Images */}
        <div 
          onClick={() => navigate('/archive?type=Photograph')}
          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 leading-tight">1,236</p>
            <p className="text-xs font-bold text-slate-800">Images</p>
            <p className="text-[11px] text-slate-500 font-sans">Photographs, scans, artifacts</p>
          </div>
        </div>

        {/* Metric 3: Audio/Video */}
        <div 
          onClick={() => navigate('/archive?type=Audio')}
          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 leading-tight">423</p>
            <p className="text-xs font-bold text-slate-800">Audio/Video</p>
            <p className="text-[11px] text-slate-500 font-sans">Speeches, debates, recordings</p>
          </div>
        </div>

        {/* Metric 4: Historical Entities */}
        <div 
          onClick={() => navigate('/knowledge-graph')}
          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-slate-900 leading-tight">312</p>
            <p className="text-xs font-bold text-slate-800">Historical Entities</p>
            <p className="text-[11px] text-slate-500 font-sans">People, events, organizations</p>
          </div>
        </div>
      </div>

      {/* Section 1: Explore the Archive */}
      <div className="space-y-3 pt-2">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">Explore the Archive</h2>
            <p className="text-xs text-slate-600 mt-0.5">Discover Dr. Ambedkar's work through multiple ways</p>
          </div>
          <Link to="/archive" className="text-xs font-bold text-[#12243E] hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Archive */}
          <div 
            onClick={() => navigate('/archive')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="h-32 overflow-hidden bg-slate-100">
              <img 
                src={thumbArchiveBooks} 
                alt="Archive Collections" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-sm">Archive</h3>
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">Browse collections of writings, speeches and more.</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#12243E] text-white flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Knowledge Graph */}
          <div 
            onClick={() => navigate('/knowledge-graph')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="h-32 overflow-hidden bg-slate-900">
              <img 
                src={thumbKnowledgeGraph} 
                alt="Knowledge Graph" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-sm">Knowledge Graph</h3>
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">Explore connections between people, events and ideas.</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#12243E] text-white flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Interactive Timeline */}
          <div 
            onClick={() => navigate('/timeline')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="h-32 overflow-hidden bg-amber-50">
              <img 
                src={thumbTimelineNodes} 
                alt="Interactive Timeline" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-sm">Interactive Timeline</h3>
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">Journey through history chronologically.</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#12243E] text-white flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 4: AI Research Assistant */}
          <div 
            onClick={() => navigate('/research-assistant')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="h-32 overflow-hidden bg-slate-100">
              <img 
                src={thumbAiAssistant} 
                alt="AI Research Assistant" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-sm">AI Research Assistant</h3>
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">Ask questions and get source-backed answers.</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#12243E] text-white flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Featured Collections */}
      <div className="space-y-3 pt-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">Featured Collections</h2>
            <p className="text-xs text-slate-600 mt-0.5">Curated collections for deeper exploration</p>
          </div>
          <Link to="/archive" className="text-xs font-bold text-[#12243E] hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Collection 1: Writings & Speeches */}
          <div 
            onClick={() => navigate('/documents/ADHA-DOC-001')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="h-28 overflow-hidden bg-slate-100">
              <img 
                src={thumbArchiveBooks} 
                alt="Writings & Speeches" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-0.5">
              <h3 className="font-serif font-bold text-slate-900 text-xs">Writings & Speeches</h3>
              <p className="text-[11px] text-slate-500 font-sans">Books, articles and essays</p>
            </div>
          </div>

          {/* Collection 2: Constituent Assembly */}
          <div 
            onClick={() => navigate('/archive?type=Parliamentary')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="h-28 overflow-hidden bg-slate-100">
              <img 
                src={collectionAssembly} 
                alt="Constituent Assembly" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-0.5">
              <h3 className="font-serif font-bold text-slate-900 text-xs">Constituent Assembly</h3>
              <p className="text-[11px] text-slate-500 font-sans">Debates and interventions</p>
            </div>
          </div>

          {/* Collection 3: Social Justice */}
          <div 
            onClick={() => navigate('/documents/ADHA-DOC-001')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="h-28 overflow-hidden bg-slate-100">
              <img 
                src={collectionSocialJustice} 
                alt="Social Justice" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-0.5">
              <h3 className="font-serif font-bold text-slate-900 text-xs">Social Justice</h3>
              <p className="text-[11px] text-slate-500 font-sans">Caste, equality and rights</p>
            </div>
          </div>

          {/* Collection 4: Rare Photographs */}
          <div 
            onClick={() => navigate('/archive?type=Photograph')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="h-28 overflow-hidden bg-slate-100">
              <img 
                src={collectionRarePhoto} 
                alt="Rare Photographs" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-0.5">
              <h3 className="font-serif font-bold text-slate-900 text-xs">Rare Photographs</h3>
              <p className="text-[11px] text-slate-500 font-sans">Historical moments</p>
            </div>
          </div>

          {/* Collection 5: Letters & Correspondence */}
          <div 
            onClick={() => navigate('/archive?type=Letters')}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="h-28 overflow-hidden bg-slate-100">
              <img 
                src={collectionLetters} 
                alt="Letters & Correspondence" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-0.5">
              <h3 className="font-serif font-bold text-slate-900 text-xs">Letters & Correspondence</h3>
              <p className="text-[11px] text-slate-500 font-sans">Personal and official letters</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
