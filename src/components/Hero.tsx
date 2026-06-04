import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Users, Globe, Flame, HelpCircle, X, ChevronRight, Check } from 'lucide-react';

interface HeroProps {
  onStartBuilding: () => void;
  activeContributors: number;
  globalReach: number;
}

export default function Hero({ onStartBuilding, activeContributors, globalReach }: HeroProps) {
  const [showDocs, setShowDocs] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 md:px-10 max-w-7xl mx-auto overflow-hidden">
      {/* Radiant Glow Spots in the background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#10b981]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0566d9]/5 blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#4edea3]/20">
            <span className={`w-2 h-2 rounded-full bg-[#4edea3] transition-all duration-1000 ${
              pulse ? 'shadow-[0_0_12px_#4edea3] scale-110' : 'shadow-[0_0_4px_#4edea3] scale-90'
            }`} />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-[#4edea3] uppercase">
              V2.0 STABLE DEPLOYED
            </span>
          </div>

          <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Build in Public <span className="text-[#4edea3] italic font-semibold">with Confidence.</span>
          </h1>

          <p className="text-[#bbcabf] font-sans text-base leading-relaxed max-w-xl">
            The open-source transparency platform for modern builders. Track momentum, share dev-logs, and show your work to the world with automated progress reporting.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <button
              onClick={onStartBuilding}
              className="px-8 py-3 bg-[#4edea3] text-[#003824] font-mono text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#4edea3]/90 transition-all active:scale-95 shadow-[0_4px_14px_rgba(78,222,163,0.2)] hover:shadow-[0_4px_20px_rgba(78,222,163,0.35)] cursor-pointer"
              id="hero-start-building-btn"
            >
              Start Building
            </button>
            <button
              onClick={() => setShowDocs(true)}
              className="px-8 py-3 bg-transparent border border-[#86948a] text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#222a3d] hover:border-white transition-all cursor-pointer"
              id="hero-view-docs-btn"
            >
              View Documentation
            </button>
          </div>
        </div>

        {/* Right Side: Analytics Visualization Card */}
        <div className="lg:col-span-5 relative w-full">
          <div 
            className="relative w-full bg-[#131b2e] border border-[#2d3449] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)] group transition-all duration-300 hover:border-[#4edea3]/40"
            onMouseEnter={() => setHoveredMetric('card')}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            {/* Terminal Top Window Deck */}
            <div className="absolute top-0 w-full h-8 bg-[#2d3449] flex items-center px-4 gap-2 border-b border-[#2d3449]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab] opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb95f] opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3] opacity-80" />
              <span className="ml-auto font-mono text-[10px] text-[#bbcabf] opacity-60 flex items-center gap-1">
                <Terminal className="w-3 h-3" /> show-off-analytics.sh
              </span>
            </div>

            {/* Terminal Frame Content */}
            <div className="p-6 pt-12 flex flex-col gap-6">
              
              {/* Telemetry Visual Graph Bars */}
              <div className="h-28 w-full bg-[#0b1326] rounded border border-[#3c4a42]/60 flex items-end p-3 gap-2 justify-between">
                {[35, 55, 75, 100, 85, 60, 40].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group/bar">
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-700 ease-out ${
                        hoveredMetric === 'card'
                          ? 'bg-[#4edea3]'
                          : 'bg-[#4edea3]/30 hover:bg-[#4edea3]/85'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                    <div className="h-1" />
                    <span className="text-[8px] font-mono opacity-30 text-[#bbcabf]">D{i+1}</span>
                  </div>
                ))}
              </div>

              {/* Data Values Container */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#2d3449] pb-2">
                  <span className="font-mono text-xs text-[#bbcabf] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#4edea3]" /> Active Contributors
                  </span>
                  <span className="font-mono text-xs text-[#4edea3] font-semibold">
                    {activeContributors.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#2d3449] pb-2">
                  <span className="font-mono text-xs text-[#bbcabf] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#adc6ff]" /> Global Reach
                  </span>
                  <span className="font-mono text-xs text-[#adc6ff] font-semibold">
                    {globalReach}%
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#2d3449] pb-2">
                  <span className="font-mono text-xs text-[#bbcabf] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#ffb95f]" /> Sync Engine Health
                  </span>
                  <span className="font-mono text-xs text-emerald-400 font-semibold animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over interactive Documentation Screen Drawer */}
      <AnimatePresence>
        {showDocs && (
          <>
            {/* Backdrop layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDocs(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Sidebar drawer containing styled developer docs */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#131b2e] border-l border-[#2d3449] shadow-2xl p-6 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#2d3449] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#4edea3]" />
                  <span className="font-mono text-sm font-semibold text-white tracking-widest">SHOW-OFF DOCS</span>
                </div>
                <button 
                  onClick={() => setShowDocs(false)}
                  className="p-1 rounded-lg text-[#bbcabf] hover:text-white bg-[#171f33] border border-[#2d3449]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Doc Details */}
              <div className="space-y-6 text-xs text-[#bbcabf] leading-relaxed">
                <section className="space-y-2">
                  <h3 className="font-mono text-white text-sm font-bold flex items-center gap-1 border-b border-[#2d3449] pb-1">
                    <span className="text-[#4edea3]">01.</span> Overview
                  </h3>
                  <p>
                    Show-Off is a developer transparency engine. It integrates into your repository pipeline to format git commits, benchmarks, and pull requests into visually comprehensive user-facing timelines.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-mono text-white text-sm font-bold flex items-center gap-1 border-b border-[#2d3449] pb-1">
                    <span className="text-[#4edea3]">02.</span> Git-Driven Pipeline
                  </h3>
                  <p>
                    Our transparency engine matches terminal activity using a webhook hook on your primary VCS stream.
                  </p>
                  <div className="p-3 bg-[#0b1326] border border-[#2d3449] rounded-lg font-mono text-[11px] text-[#4edea3]">
                    $ npm i -g @show-off/cli<br />
                    $ show-off init --project="nebula"
                  </div>
                </section>

                <section className="space-y-2">
                  <h3 className="font-mono text-white text-sm font-bold flex items-center gap-1 border-b border-[#2d3449] pb-1">
                    <span className="text-[#4edea3]">03.</span> Webhook Metadata
                  </h3>
                  <p>
                    Each commit message with custom directives is automatically parsed:
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc break-all">
                    <li><code className="text-[#adc6ff] font-semibold">[feat]</code> - Triggers a momentum upgrade.</li>
                    <li><code className="text-[#ffb95f] font-semibold">[fix]</code> - Appends a patch logger.</li>
                    <li><code className="text-[#4edea3] font-semibold">[perf]</code> - Triggers optimization charts.</li>
                  </ul>
                </section>

                <section className="space-y-2 bg-[#171f33] p-4 rounded-lg border border-[#2d3449]">
                  <p className="font-bold text-white mb-1 flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#4edea3]" /> Instant Transparency Guarantee
                  </p>
                  <p className="text-[11px]">
                    No more writing manuals. When you push, your investors, users, and peers see beautiful dashboard updates instantly. Let your work speak for itself!
                  </p>
                </section>
              </div>

              <div className="mt-8 pt-4 border-t border-[#2d3449]">
                <button
                  onClick={() => {
                    setShowDocs(false);
                    onStartBuilding();
                  }}
                  className="w-full py-2.5 bg-[#4edea3] text-[#003824] rounded-lg font-mono font-bold uppercase text-center tracking-wider hover:brightness-105 transition-all text-xs flex items-center justify-center gap-1"
                >
                  Create Your Dashboard <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
