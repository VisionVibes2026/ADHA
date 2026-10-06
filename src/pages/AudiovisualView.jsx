import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  Video, 
  Film, 
  Clock, 
  Globe, 
  Download, 
  Share2, 
  Sparkles, 
  Search,
  Filter,
  Maximize2,
  FastForward,
  RotateCcw,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import collectionAssembly from '../assets/collection_assembly.png';
import collectionSocialJustice from '../assets/collection_social_justice.png';
import collectionRarePhoto from '../assets/collection_rare_photo.png';
import collectionLetters from '../assets/collection_letters.png';

export default function AudiovisualView() {
  const [filterType, setFilterType] = useState('All');
  const [activeMedia, setActiveMedia] = useState({
    id: 'AV-001',
    title: 'BBC World Service Interview: Democracy in Independent India',
    date: '1956',
    duration: '04:18',
    format: 'Historical Radio Recording',
    source: 'British Broadcasting Corporation (BBC) Radio Archives / AIR National Sound Library',
    narrator: 'Dr. B. R. Ambedkar (Speaking to BBC London Correspondent)',
    language: 'English',
    description: 'Dr. Ambedkar discusses the vital necessity of social equality as the bedrock of constitutional democracy and the dangers of hero-worship in Indian politics.',
    transcript: [
      { time: '00:00', text: 'Interviewer: Dr. Ambedkar, looking back over the last decade of Indian Independence, how do you see democracy taking root?' },
      { time: '00:32', text: 'Dr. Ambedkar: Democracy is not merely a form of Government. It is primarily a mode of associated living, of conjoint communicated experience.' },
      { time: '01:15', text: 'Dr. Ambedkar: It is essentially an attitude of respect and reverence towards fellow men. Without social democracy, political democracy is built on sand.' },
      { time: '02:05', text: 'Dr. Ambedkar: In India, Bhakti or hero-worship plays a part in its politics unequalled in magnitude by the part it plays in the politics of any other country.' },
      { time: '03:10', text: 'Dr. Ambedkar: Bhakti in religion may be a road to the salvation of the soul. But in politics, Bhakti or hero-worship is a sure road to degradation and eventual dictatorship.' }
    ]
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [selectedLanguageTrack, setSelectedLanguageTrack] = useState('English');
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Stop Web Speech API audio on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlayToggle = () => {
    if (!('speechSynthesis' in window)) {
      alert('Browser audio synthesis engine unavailable.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const fullText = activeMedia.transcript.map(t => t.text).join(' ');
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = playbackSpeed;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const MEDIA_ARCHIVE = [
    {
      id: 'AV-001',
      title: 'BBC World Service Interview: Democracy in Independent India',
      type: 'Radio Speech',
      year: '1956',
      duration: '04:18',
      thumbnail: collectionLetters,
      source: 'BBC Radio Archives / AIR Central Archives',
      language: 'English',
      verified: true
    },
    {
      id: 'AV-002',
      title: 'Constituent Assembly Final Address: Life of Contradictions',
      type: 'Assembly Speech',
      year: '1949',
      duration: '05:42',
      thumbnail: collectionAssembly,
      source: 'Parliament of India Sound Archives',
      language: 'English',
      verified: true
    },
    {
      id: 'AV-003',
      title: 'Mahad Satyagraha Water Rights Declaration (Marathi)',
      type: 'Oral History',
      year: '1927',
      duration: '03:50',
      thumbnail: collectionSocialJustice,
      source: 'Maharashtra State Archives Sound Pool',
      language: 'Marathi',
      verified: true
    },
    {
      id: 'AV-004',
      title: 'Documentary Reel: Making of the Constitution of India',
      type: 'Documentary',
      year: '1950',
      duration: '18:30',
      thumbnail: collectionRarePhoto,
      source: 'Films Division of India Archive',
      language: 'English / Hindi',
      verified: true
    },
    {
      id: 'AV-005',
      title: 'Columbia University Oral History Interview with Dr. Ambedkar',
      type: 'Interview',
      year: '1930s',
      duration: '07:15',
      thumbnail: collectionLetters,
      source: 'Columbia University Rare Book & Manuscript Library',
      language: 'English',
      verified: true
    },
    {
      id: 'AV-006',
      title: 'Historic Conversion Address at Deekshabhoomi, Nagpur',
      type: 'Radio Speech',
      year: '1956',
      duration: '12:20',
      thumbnail: collectionSocialJustice,
      source: 'All India Radio Nagpur Transcription Library',
      language: 'Marathi',
      verified: true
    }
  ];

  const filteredMedia = MEDIA_ARCHIVE.filter(item => {
    if (filterType === 'All') return true;
    return item.type.toLowerCase().includes(filterType.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#23324E]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              Audio-Visual Archival System & Multimedia Knowledge Platform
            </h1>
            <span className="badge-teal font-mono text-[11px]">
              AIR & BBC Master Audio
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Digitized historic radio broadcasts, parliamentary sound recordings, oral history interviews, and documentary film reels of Dr. B. R. Ambedkar.
          </p>
        </div>

        {/* Media filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Speech', 'Documentary', 'Interview', 'Oral History'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === t
                  ? 'bg-[#123B63] dark:bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#151F32] border border-slate-200 dark:border-[#23324E] text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Master Audio Player & Synchronized Transcript */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Player & Waveform Visualizer (7 cols) */}
        <div className="lg:col-span-7 saas-card p-6 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="badge-primary font-mono text-[10px]">
                  {activeMedia.format} • {activeMedia.date}
                </span>
                <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white mt-1.5 leading-snug">
                  {activeMedia.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Speaker: <strong className="text-slate-700 dark:text-slate-200">{activeMedia.narrator}</strong>
                </p>
              </div>

              {/* Language Track Selector */}
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-[#0E1726] border border-slate-200 dark:border-[#23324E] px-2.5 py-1 rounded-lg text-xs">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedLanguageTrack}
                  onChange={(e) => setSelectedLanguageTrack(e.target.value)}
                  className="bg-transparent text-slate-700 dark:text-slate-200 font-medium outline-none cursor-pointer text-xs"
                >
                  <option value="English">English Audio</option>
                  <option value="Marathi">मराठी (Marathi Dub)</option>
                  <option value="Hindi">हिन्दी (Hindi Dub)</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              {activeMedia.description}
            </p>
          </div>

          {/* Interactive Animated Waveform & Scrubber */}
          <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-4 shadow-inner border border-slate-800">
            
            {/* Visualizer bars */}
            <div className="flex items-center justify-between gap-1 h-14 px-2">
              {Array.from({ length: 48 }).map((_, i) => {
                const heightPercent = isPlaying 
                  ? Math.sin((i + Date.now() / 200) * 0.5) * 40 + 50 
                  : ((i * 17) % 60) + 20;
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-75 ${
                      i < 18 ? 'bg-amber-400' : 'bg-slate-700'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                );
              })}
            </div>

            {/* Time Slider */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: isPlaying ? '45%' : '20%' }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{isPlaying ? '01:54' : '00:45'}</span>
                <span>{activeMedia.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPlaybackSpeed(s => s === 1.0 ? 1.25 : s === 1.25 ? 1.5 : 1.0)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono font-bold text-slate-300 transition-colors"
                >
                  {playbackSpeed}x Speed
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePlayToggle}
                  className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Volume2 className="w-4 h-4" />
                <span className="font-mono text-[11px]">Lossless 48kHz</span>
              </div>
            </div>

          </div>

          {/* Source Attribution */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Archival Source: <strong>{activeMedia.source}</strong></span>
            <span className="badge-success font-mono text-[10px]">Restored Mono</span>
          </div>

        </div>

        {/* Right: Synchronized Interactive Transcript (5 cols) */}
        <div className="lg:col-span-5 saas-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-adha-navy dark:text-blue-400" />
                <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                  Synchronized Archival Transcript
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Time-coded</span>
            </div>

            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-1">
              {activeMedia.transcript.map((line, idx) => (
                <div 
                  key={idx}
                  onClick={handlePlayToggle}
                  className={`p-3 rounded-xl cursor-pointer text-xs transition-colors ${
                    idx === 1 
                      ? 'bg-blue-50 dark:bg-[#1A2A46] border border-blue-200 dark:border-blue-900/60 text-slate-900 dark:text-white' 
                      : 'hover:bg-slate-50 dark:hover:bg-[#15233A] text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold text-adha-navy dark:text-blue-400 block mb-0.5">
                    [{line.time}]
                  </span>
                  <p className="leading-relaxed">{line.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Click any paragraph to play audio</span>
            <button 
              onClick={() => {
                const text = activeMedia.transcript.map(t => `[${t.time}] ${t.text}`).join('\n');
                navigator.clipboard.writeText(text);
                alert('Transcript copied to clipboard!');
              }}
              className="text-xs font-semibold text-adha-navy dark:text-blue-400 hover:underline"
            >
              Export Transcript
            </button>
          </div>
        </div>

      </div>

      {/* Media Catalog Grid */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
          Explore Archival Sound & Film Recordings ({filteredMedia.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMedia.map(item => (
            <div 
              key={item.id}
              onClick={() => setActiveMedia(prev => ({
                ...prev,
                id: item.id,
                title: item.title,
                date: item.year,
                duration: item.duration,
                source: item.source,
                language: item.language
              }))}
              className="saas-card-interactive overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-40 overflow-hidden bg-slate-900 relative">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/70 text-white backdrop-blur-sm border border-white/20">
                    {item.duration}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-500/30">
                      {item.type}
                    </span>
                    <span className="text-[10px] font-mono text-white">
                      {item.year}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {item.source}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] font-mono">{item.language}</span>
                <span className="font-semibold text-adha-navy dark:text-blue-400 group-hover:underline flex items-center gap-1">
                  Play Recording →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
