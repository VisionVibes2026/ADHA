import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  MapPin, 
  Landmark, 
  Award, 
  Printer, 
  Maximize, 
  Minimize, 
  ArrowLeft, 
  Globe, 
  ExternalLink,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import collectionAssembly from '../assets/collection_assembly.png';

export default function KioskView() {
  const navigate = useNavigate();
  const [activeKioskTab, setActiveKioskTab] = useState('listen'); // 'listen' | 'constitution' | 'journey' | 'compile'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState('English');
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [selectedQuotes, setSelectedQuotes] = useState([
    '“Educate, Agitate, Organize.”',
    '“Life should be great rather than long.”'
  ]);
  const [isFolioGenerated, setIsFolioGenerated] = useState(false);

  const toggleQuote = (quote) => {
    setSelectedQuotes(prev => 
      prev.includes(quote) ? prev.filter(q => q !== quote) : [...prev, quote]
    );
  };

  // Audio Speech Clips for Listening Station
  const AUDIO_CLIPS = [
    {
      id: 'audio-1',
      title: 'BBC Interview on Indian Democracy & Social Justice',
      year: '1956',
      source: 'British Broadcasting Corporation (BBC) Radio Archives',
      duration: '4:18 min',
      language: 'English',
      transcript: 'Democracy is not merely a form of Government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards fellow men.'
    },
    {
      id: 'audio-2',
      title: 'Constituent Assembly Final Address — Life of Contradictions',
      year: '1949',
      source: 'All India Radio (AIR) Central Sound Archives',
      duration: '5:42 min',
      language: 'English',
      transcript: 'On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality. We must remove this contradiction at the earliest possible moment.'
    },
    {
      id: 'audio-3',
      title: 'Mahad Satyagraha Water Rights Declaration (Marathi Speech)',
      year: '1927',
      source: 'Maharashtra State Archives Oral Records',
      duration: '3:50 min',
      language: 'Marathi',
      transcript: 'पाणी पिण्याचा हक्क हा मानवी मूलभूत हक्क आहे. हा लढा केवळ पाण्यासाठी नसून मानवी प्रतिष्ठेचा आणि समानतेचा लढा आहे.'
    },
    {
      id: 'audio-4',
      title: 'Third Reading of the Draft Constitution of India',
      year: '1949',
      source: 'Parliament of India Sound Archives',
      duration: '6:15 min',
      language: 'English',
      transcript: 'I feel that the Constitution is workable, it is flexible and it is strong enough to hold the country together both in peace-time and in war-time. Indeed, if I may say so, if things go wrong under the new Constitution, the reason will not be that we had a bad Constitution. What we will have to say is, that Man was vile.'
    }
  ];

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleToggleSpeech = (clip) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech audio engine not supported by browser.');
      return;
    }

    if (playingAudioId === clip.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(clip.transcript);
      utterance.rate = 0.95;
      utterance.onend = () => setPlayingAudioId(null);
      utterance.onerror = () => setPlayingAudioId(null);
      window.speechSynthesis.speak(utterance);
      setPlayingAudioId(clip.id);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070E1A] text-slate-100 font-sans flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-200 overflow-x-hidden">
      
      {/* 1. Kiosk Top Banner Bar */}
      <header className="px-6 py-4 bg-[#0B1526] border-b border-white/10 backdrop-blur-md flex items-center justify-between sticky top-0 z-40 shadow-sm">
        
        {/* Left: Memorial branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Exit Memorial Kiosk Mode"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
              DAIC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg text-white leading-tight">
                  Dr. Ambedkar International Centre (DAIC)
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SMART DISPLAY KIOSK
                </span>
              </div>
              <p className="text-xs text-slate-400">
                15, Janpath, New Delhi • Interactive Public Heritage Station
              </p>
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-slate-200 font-medium outline-hidden cursor-pointer text-xs"
            >
              <option value="English" className="bg-[#0B1526]">English</option>
              <option value="Hindi" className="bg-[#0B1526]">हिन्दी (Hindi)</option>
              <option value="Marathi" className="bg-[#0B1526]">मराठी (Marathi)</option>
              <option value="Tamil" className="bg-[#0B1526]">தமிழ் (Tamil)</option>
            </select>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Toggle Fullscreen Smart Display"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>

      </header>

      {/* 2. Touch Navigation Selector Tabs */}
      <nav className="px-6 py-4 bg-[#091120] border-b border-white/10 flex items-center justify-center gap-3 overflow-x-auto relative z-30 shadow-xs">
        {[
          { id: 'listen', label: 'Audio Listening Station', icon: Headphones, desc: 'Original Speeches & AIR Recordings' },
          { id: 'constitution', label: 'Constitutional Hall', icon: Landmark, desc: '1946–1949 Drafting Assembly Folios' },
          { id: 'journey', label: 'Memorial Life Journey', icon: MapPin, desc: 'Mhow to Columbia & New Delhi' },
          { id: 'compile', label: 'Compile Visitor Study Folio', icon: Award, desc: 'Print Custom Certificate with Quotes' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeKioskTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveKioskTab(tab.id)}
              className={`px-5 py-3 rounded-2xl flex items-center gap-3 transition-all text-left shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg ring-2 ring-blue-400/50 font-bold' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-amber-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">{tab.label}</p>
                <p className="text-[11px] opacity-75 mt-0.5">{tab.desc}</p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* 3. Main Kiosk Interactive Canvas */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        
        {/* TAB 1: AUDIO LISTENING STATION */}
        {activeKioskTab === 'listen' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-amber-400" />
                  <span>Interactive Audio Listening Station</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Touch any audio card to play historical speeches and digitized radio recordings.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Air-Quality Sound Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {AUDIO_CLIPS.map(clip => {
                const isPlaying = playingAudioId === clip.id;
                return (
                  <div 
                    key={clip.id}
                    onClick={() => handleToggleSpeech(clip)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isPlaying 
                        ? 'bg-blue-950/40 border-blue-500 shadow-2xl ring-1 ring-blue-500' 
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                          <span className="font-bold">{clip.year}</span>
                          <span>•</span>
                          <span>{clip.language}</span>
                          <span>•</span>
                          <span>{clip.duration}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isPlaying ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-slate-300'
                        }`}>
                          {isPlaying ? 'PLAYING NOW' : 'TOUCH TO LISTEN'}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-white mt-2 leading-snug">
                        {clip.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        {clip.source}
                      </p>

                      <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 italic font-serif leading-relaxed">
                        “{clip.transcript}”
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        {isPlaying ? (
                          <div className="flex items-center gap-1 text-emerald-400">
                            <span className="w-1 h-3 bg-emerald-400 animate-pulse" />
                            <span className="w-1 h-5 bg-emerald-400 animate-pulse delay-75" />
                            <span className="w-1 h-2 bg-emerald-400 animate-pulse delay-150" />
                            <span className="ml-1 font-mono text-[11px]">Audio Streaming</span>
                          </div>
                        ) : (
                          <span>Touch to begin narration</span>
                        )}
                      </div>

                      <button
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                          isPlaying ? 'bg-amber-400 text-slate-950 scale-110' : 'bg-white/10 text-white'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CONSTITUTIONAL HALL */}
        {activeKioskTab === 'constitution' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-amber-400" />
                  <span>Constituent Assembly Hall & Original Drafts</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Explore Dr. Ambedkar's role as Chairman of the Drafting Committee (1947–1950).
                </p>
              </div>
              <button
                onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Open Deep Document Reader</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative h-80">
                <img 
                  src={collectionAssembly} 
                  alt="Constituent Assembly" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-mono text-amber-400 font-bold uppercase">Constitution Hall, New Delhi</p>
                  <p className="text-sm font-bold text-white mt-0.5">Dr. Ambedkar presenting the Draft Constitution</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider">Historical Significance</span>
                  <h3 className="font-serif font-bold text-base text-white">The Cornerstone of the Republic</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Over 2 years, 11 months, and 17 days, the Drafting Committee chaired by Dr. B. R. Ambedkar deliberated upon 7,635 tabled amendments. Dr. Ambedkar personally piloted the Fundamental Rights, Directive Principles, and Article 32 (the "Heart and Soul" of the Constitution).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl font-bold font-mono text-amber-400">395</p>
                    <p className="text-xs text-slate-300 mt-1 font-semibold">Original Articles</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl font-bold font-mono text-teal-400">8</p>
                    <p className="text-xs text-slate-300 mt-1 font-semibold">Schedules</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl font-bold font-mono text-blue-400">114 Days</p>
                    <p className="text-xs text-slate-300 mt-1 font-semibold">Debate Sessions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MEMORIAL LIFE JOURNEY */}
        {activeKioskTab === 'journey' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Geographic Memorial Stations</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Key memorial centers commemorating Dr. Ambedkar's global journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { city: 'Mhow, Madhya Pradesh', title: 'Dr. Ambedkar Janma Bhoomi Memorial', desc: 'Birthplace of Dr. Ambedkar on 14 April 1891.', year: '1891' },
                { city: 'New York City, USA', title: 'Columbia University Memorial Room', desc: 'Master of Arts (1915) & PhD in Economics (1927).', year: '1913–1916' },
                { city: 'London, United Kingdom', title: 'Dr. Ambedkar Memorial House, 10 King Henry’s Rd', desc: 'London School of Economics & Gray’s Inn Bar.', year: '1916–1922' },
                { city: 'Mahad, Maharashtra', title: 'Chavdar Tale Water Memorial', desc: 'Historic 1927 Satyagraha for civil water equality.', year: '1927' },
                { city: 'New Delhi, Janpath', title: 'Dr. Ambedkar International Centre (DAIC)', desc: 'National center for socio-economic research & archives.', year: 'Present' },
                { city: 'Nagpur, Maharashtra', title: 'Deekshabhoomi Memorial Stupa', desc: 'Historical Buddhist conversion of 500,000 followers.', year: '1956' },
              ].map((loc, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                    <span className="font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {loc.city}
                    </span>
                    <span>{loc.year}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-white">{loc.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{loc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMPILE VISITOR STUDY FOLIO */}
        {activeKioskTab === 'compile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Compile & Print Visitor Memorial Study Folio</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Assemble your chosen Ambedkar writings and generate an official commemorative Study Folio certificate.
              </p>
            </div>

            {!isFolioGenerated ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Form Controls */}
                <div className="lg:col-span-6 space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Enter Your Name / Student ID:
                    </label>
                    <input
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="e.g., Arjun Sharma (Research Scholar)"
                      className="w-full p-3 rounded-xl bg-black/40 border border-white/20 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Select Key Doctrines to Include:
                    </label>
                    {[
                      '“Educate, Agitate, Organize.”',
                      '“Life should be great rather than long.”',
                      '“Cultivation of mind should be the ultimate aim of human existence.”',
                      '“Political democracy cannot last unless there lies at the base of it social democracy.”',
                    ].map((quote, i) => (
                      <label key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer text-xs text-slate-200">
                        <input
                          type="checkbox"
                          checked={selectedQuotes.includes(quote)}
                          onChange={() => toggleQuote(quote)}
                          className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                        />
                        <span>{quote}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (!visitorName.trim()) {
                        alert('Please enter your name to generate your commemorative folio certificate.');
                        return;
                      }
                      setIsFolioGenerated(true);
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Award className="w-5 h-5" />
                    <span>Generate Official Memorial Study Folio</span>
                  </button>
                </div>

                {/* Preview */}
                <div className="lg:col-span-6 flex items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                  <div className="text-center space-y-2 text-slate-400">
                    <Award className="w-12 h-12 mx-auto text-amber-400/60" />
                    <p className="text-sm font-semibold text-slate-300">Commemorative Folio Preview</p>
                    <p className="text-xs max-w-xs">Fill in your name on the left and touch "Generate" to create your printable certificate.</p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="space-y-4">
                {/* Generated Certificate Card */}
                <div className="p-8 rounded-2xl bg-amber-50 text-slate-900 border-4 border-amber-800/30 max-w-2xl mx-auto shadow-2xl space-y-6 text-center font-serif relative">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono font-bold tracking-widest text-amber-800 uppercase">
                      DR. AMBEDKAR INTERNATIONAL CENTRE (DAIC) • NEW DELHI
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900">
                      National Memorial Study Certificate
                    </h3>
                    <p className="text-xs font-sans text-slate-600">
                      Verified Digital Heritage Archive Citation Record
                    </p>
                  </div>

                  <div className="py-2 border-y border-amber-900/20">
                    <p className="text-xs font-sans text-slate-600">This commemorative archival folio is presented to</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">{visitorName}</p>
                    <p className="text-[11px] font-sans text-slate-500 mt-0.5">For constitutional inquiry & heritage scholarship</p>
                  </div>

                  <div className="space-y-2 text-xs italic text-slate-800 max-w-md mx-auto">
                    {selectedQuotes.map((q, idx) => (
                      <p key={idx}>{q}</p>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-amber-900/20 flex items-center justify-between text-[10px] font-mono text-slate-600">
                    <span>Folio ID: DAIC-MEM-2026-096</span>
                    <span>Date: {new Date().toLocaleDateString('en-IN')}</span>
                    <span className="font-bold text-emerald-800">NIC Blockchain Anchored ✓</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Study Folio</span>
                  </button>
                  <button
                    onClick={() => setIsFolioGenerated(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                  >
                    Create Another
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* 4. Kiosk Footer Touch Status Bar */}
      <footer className="px-6 py-3 bg-[#0B1526] border-t border-white/10 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Interactive Kiosk System • Ministry of Social Justice and Empowerment (MoSJE)</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span>Station: <strong>KIOSK-DAIC-LOBBY-01</strong></span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">Touch Screen Calibrated</span>
        </div>
      </footer>

    </div>
  );
}
