import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Send, ShieldCheck, CheckCircle2, ArrowUpRight, History, Info } from 'lucide-react';

export default function ResearchAssistantView() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'What was Dr. Ambedkar\'s doctrine on state socialism and how was it incorporated into States and Minorities?'
    },
    {
      id: 2,
      sender: 'ai',
      text: 'Dr. B. R. Ambedkar articulated his doctrine of State Socialism in his 1947 memorandum "States and Minorities", submitted to the Constituent Assembly Advisory Committee. He argued that political democracy cannot succeed without economic democracy. To prevent key industries and agricultural land from becoming tools of economic exploitation, he proposed that key industries must be owned and run by the State, and land should be nationalized and leased to collective agricultural units.',
      citations: [
        { title: 'States and Minorities Memorandum (1947)', page: 'Leaf 14 / P14', accession: 'ADHA-DOC-1947-SM-0014', institution: 'Dr. Ambedkar National Memorial' },
        { title: 'Constituent Assembly Debates (Vol. VII)', page: 'Page 0104', accession: 'ADHA-CAD-1948-NOV04', institution: 'Parliament of India Digital Library' }
      ],
      hash: 'SHA256: 4e5c718a...0d9c8b7a'
    }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Based on verified primary sources in the ADHA repository: Dr. Ambedkar stated in the Constituent Assembly on 25th November 1949 that "on the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality."`,
        citations: [
          { title: 'Final Address on the Third Reading of the Draft Constitution', page: 'Vol. XI, p. 972', accession: 'ADHA-CAD-1949-NOV25', institution: 'Parliament of India Digital Library' }
        ],
        hash: 'SHA256: b7a8c9d0...ef123456'
      };
      setMessages(prev => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-serif font-bold text-adha-navy">AI Archival Research Assistant</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Answers are strictly cited against verified repository manuscripts. Unsupported claims are not generated.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-bold px-3 py-1.5 rounded-xs flex items-center gap-1.5 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Grounded RAG Active</span>
        </div>
      </div>

      {/* 3-Column Layout: History | Evidence+Chat | Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        
        {/* LEFT: Research Threads (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xs p-3 space-y-2 min-h-[600px]">
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 text-[10px] font-mono font-bold text-slate-700 uppercase">
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>Threads</span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="p-2 bg-adha-navy text-white font-medium rounded-xs cursor-pointer">
              <p className="font-serif font-bold truncate text-[11px]">State Socialism & Rights</p>
              <p className="text-[9px] text-slate-300 font-mono mt-0.5">Today • 2 sources</p>
            </div>
            <div className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xs cursor-pointer transition-colors">
              <p className="font-serif font-bold truncate text-[11px]">Poona Pact (1932)</p>
              <p className="text-[9px] text-slate-500 font-mono mt-0.5">Yesterday • 5 sources</p>
            </div>
            <div className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xs cursor-pointer transition-colors">
              <p className="font-serif font-bold truncate text-[11px]">Problem of the Rupee</p>
              <p className="text-[9px] text-slate-500 font-mono mt-0.5">Sep 18 • 2 sources</p>
            </div>
          </div>
        </div>

        {/* CENTER: Chat + Evidence (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xs flex flex-col justify-between min-h-[600px]">
          {/* Messages */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[480px]">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                {msg.sender === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-adha-navy text-white p-3 rounded-xs rounded-br-none text-xs max-w-[80%] font-medium">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* AI disclaimer label */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <Info className="w-3 h-3" />
                      <span>AI-assisted synthesis — verify against cited sources</span>
                    </div>
                    {/* AI answer — visually subordinate */}
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xs rounded-bl-none text-xs text-slate-700 leading-relaxed max-w-[90%]">
                      {msg.text}
                    </div>

                    {/* Evidence block — primary visual weight */}
                    {msg.citations && (
                      <div className="border border-adha-navy/20 bg-white rounded-xs p-3 space-y-2 max-w-[90%]">
                        <p className="font-bold text-adha-navy text-[10px] font-mono uppercase">Archival Evidence</p>
                        {msg.citations.map((c, i) => (
                          <div key={i} className="flex justify-between items-center text-[11px] text-slate-800 bg-slate-50 p-2 rounded-xs border border-slate-200">
                            <div>
                              <p className="font-serif font-bold text-slate-900">{c.title}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{c.page} • {c.accession}</p>
                              <p className="text-[9px] text-slate-400 font-mono">{c.institution}</p>
                            </div>
                            <button 
                              onClick={() => navigate('/documents/ADHA-DOC-1947-SM-0014')}
                              className="text-[10px] font-mono text-adha-teal hover:underline font-bold flex items-center gap-1 shrink-0 ml-2"
                            >
                              View <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <p className="text-[9px] text-slate-400 text-right font-mono">{msg.hash}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a historical question grounded in verified ADHA manuscripts..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xs px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-adha-navy"
            />
            <button 
              onClick={handleSend}
              className="antd-btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
            >
              Ask <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT: Source Panel (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xs p-4 space-y-3 min-h-[600px]">
          <div className="border-b border-slate-100 pb-2">
            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">EVIDENCE & PROVENANCE</p>
            <h3 className="font-serif font-bold text-sm text-adha-navy">Verified Archival Sources</h3>
          </div>

          <div className="bg-slate-50 p-3 rounded-xs border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Citation Grounding Active</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-sans text-[11px]">
              All answers are deterministically tied to verified manuscript hashes. Unsupported claims trigger fallback:
            </p>
            <div className="bg-amber-50 text-amber-900 p-2 rounded-xs text-[10px] font-mono border border-amber-200">
              "No sufficient verified archival evidence was found in the indexed collection."
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-mono text-slate-500 uppercase font-bold">ACTIVE SOURCE DOCUMENT</p>
            <div className="archival-scan-bg h-28 rounded-xs border border-slate-300 p-2 flex items-center justify-center">
              <div className="bg-amber-50 border border-amber-900/30 p-2 text-[8px] font-serif text-amber-950 w-full h-full flex flex-col justify-between">
                <p className="font-bold border-b border-amber-900/20 pb-0.5">States & Minorities (1947)</p>
                <p className="italic text-[8px]">Fundamental Rights & State Socialism</p>
                <p className="font-mono text-[7px] text-slate-600">Leaf 14 / P14 • ADHA-DOC-1947-SM-0014</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
