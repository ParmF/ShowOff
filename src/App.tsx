import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TerminalSimulator from './components/TerminalSimulator';
import ExploreView from './components/ExploreView';
import DashboardView from './components/DashboardView';
import { INITIAL_PROJECTS, INITIAL_TESTIMONIALS } from './initialData';
import { Project, DevLog } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Heart, ShieldCheck, Flame, GitBranch, Terminal, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<'explore' | 'dashboard'>('explore');
  const [projects, setProjects] = useState<Project[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [triggerEventCount, setTriggerEventCount] = useState(0);

  // Load from local storage or fit standard templates
  useEffect(() => {
    const saved = localStorage.getItem('show_off_projects_v2');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        setProjects(INITIAL_PROJECTS);
      }
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem('show_off_projects_v2', JSON.stringify(INITIAL_PROJECTS));
    }
  }, []);

  // Sync back to local storage
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('show_off_projects_v2', JSON.stringify(projects));
    }
  }, [projects]);

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev].slice(0, 15));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleFollowToggle = (projectId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const following = !p.isFollowing;
        const diff = following ? 1 : -1;
        const msg = following 
          ? `You subscribed to workspace: "${p.name}". You will receive critical build timeline events.`
          : `Unfollowed workspace: "${p.name}".`;
        
        addNotification(msg);
        return {
          ...p,
          isFollowing: following,
          followersCount: p.followersCount + diff
        };
      }
      return p;
    }));
  };

  // Triggers automated bash command animation
  const handleTriggerTerminalCommit = (customMessage?: string) => {
    setTriggerEventCount(prev => prev + 1);
    addNotification(`Instructed Terminal Simulator to sync commit...`);
  };

  // Called when the Terminal finishes its simulation successfully
  const handleTerminalCommitCompleted = (commitMessage: string) => {
    // We add a new devlog entry to the featured Nebula project (or active dashboard project)
    const targetId = 'nebula-engine';
    const targetProject = projects.find(p => p.id === targetId) || projects[0];
    
    if (!targetProject) return;

    const newLog: DevLog = {
      id: `term-log-${Date.now()}`,
      projectId: targetProject.id,
      title: commitMessage.split('\n')[0],
      content: 'Ingested automatically via Git Push Webhook. Checked metrics integrity, matched build requirements, and published direct momentum outputs on live transparency feeds.',
      timestamp: new Date().toISOString(),
      type: 'feat',
      authorName: targetProject.author.name,
      authorAvatar: targetProject.author.avatarUrl,
      commitSha: '6d0bfe4'
    };

    setProjects(prev => prev.map(p => {
      if (p.id === targetProject.id) {
        return {
          ...p,
          devLogs: [newLog, ...p.devLogs],
          lastUpdated: new Date().toISOString()
        };
      }
      return p;
    }));

    addNotification(`[VCS Sync] Ingested log: "${newLog.title}" on workspace "${targetProject.name}"`);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans flex flex-col justify-between selection:bg-[#4edea3] selection:text-[#003824]">
      
      {/* Dynamic Header Toolbar */}
      <Header
        currentView={currentView}
        setView={setView}
        notifications={notifications}
        clearNotifications={clearNotifications}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'explore' ? (
            /* ======================================================== */
            /*                      EXPLORE MODE VIEW                   */
            /* ======================================================== */
            <motion.div
              key="explore-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero Banner Section */}
              <Hero 
                onStartBuilding={() => setView('dashboard')}
                activeContributors={1204}
                globalReach={94}
              />

              {/* Git Driven Updates interactive CLI */}
              <section className="py-20 bg-[#060e20] border-y border-[#2d3449]">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                  <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#adc6ff]/10 text-[#adc6ff] border border-[#adc6ff]/20 rounded-full text-[10px] font-mono tracking-wider font-bold">
                      <GitBranch className="w-3 h-3" /> PIPELINE AUTO-TRANSITION
                    </div>
                    <h2 className="font-sans text-3xl font-extrabold text-white tracking-tight">
                      Git-Driven Updates
                    </h2>
                    <p className="text-[#bbcabf] font-sans text-sm max-w-xl mx-auto">
                      Your terminal is your control center. Sync every commit automatically to your public profile with absolute zero friction.
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <TerminalSimulator 
                      onCommitTriggered={handleTerminalCommitCompleted}
                      triggerEventId={triggerEventCount}
                    />
                  </div>
                </div>
              </section>

              {/* Main Discover Panels: Bento Grid Project Transboards */}
              <section className="py-24 max-w-7xl mx-auto px-4 md:px-10">
                <div className="text-center mb-16 space-y-3">
                  <h2 className="font-sans text-3xl font-extrabold text-white tracking-tight">
                    Public Transparency Dashboards
                  </h2>
                  <p className="text-[#bbcabf] font-sans text-sm max-w-2xl mx-auto">
                    Inspect actual production values, click through historical chronologies, and subscribe to active technical streams.
                  </p>
                </div>

                <ExploreView 
                  projects={projects}
                  onFollowToggle={handleFollowToggle}
                />
              </section>

              {/* Testimonials */}
              <section className="py-20 bg-[#060e20] border-t border-[#2d3449]">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                  <h2 className="font-sans text-2xl font-extrabold text-white text-center mb-12">
                    Community Driven Builders
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {INITIAL_TESTIMONIALS.map((t) => (
                      <div 
                        key={t.id} 
                        className="bg-[#131b2e] border border-[#2d3449] p-6 rounded-xl relative hover:border-[#4edea3]/20 transition-all group"
                      >
                        <span className="font-sans text-5xl text-[#4edea3] absolute top-4 right-6 opacity-10 pointer-events-none font-black">
                          ”
                        </span>
                        <p className="font-sans text-xs line-clamp-4 leading-relaxed mb-6 text-[#dae2fd]">
                          {t.quote}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden border border-[#2d3449]">
                            <img alt={t.authorName} className="w-full h-full object-cover" src={t.avatarUrl} />
                          </div>
                          <div>
                            <p className="font-sans text-xs font-bold text-white leading-none">{t.authorName}</p>
                            <p className="font-mono text-[9px] text-[#bbcabf] mt-1">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Action Call Banner */}
              <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
                <div className="relative bg-[#171f33] border border-[#2d3449] py-16 px-6 rounded-2xl overflow-hidden text-center shadow-2xl">
                  {/* Grid decoration */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4edea3 1.5px, transparent 0)', backgroundImageSize: '24px 24px' }} />
                  <h2 className="font-sans text-3xl font-extrabold text-white mb-4">Ready to ship in public?</h2>
                  <p className="text-[#bbcabf] font-sans text-sm max-w-lg mx-auto mb-8">
                    Join over 25,000 builders who use Show-Off to build momentum and trust through technical transparency.
                  </p>
                  <button
                    onClick={() => setView('dashboard')}
                    className="px-8 py-3.5 bg-[#4edea3] text-[#003824] font-mono text-xs font-bold uppercase tracking-wider rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_4px_14px_rgba(78,222,163,0.25)] cursor-pointer"
                  >
                    Start Building For Free
                  </button>
                </div>
              </section>
            </motion.div>
          ) : (
            /* ======================================================== */
            /*                     DASHBOARD WORKSPACE VIEW             */
            /* ======================================================== */
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-12 max-w-7xl mx-auto px-4 md:px-10 space-y-10"
            >
              {/* Header Titles */}
              <div className="border-b border-[#2d3449] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h1 className="font-sans text-3xl font-extrabold text-white">
                    Builder Workspace Studio
                  </h1>
                  <p className="text-[#bbcabf] font-sans text-xs">
                    Manually post status logs, slide project development stages, and dispatch mock repo webhook updates.
                  </p>
                </div>
                
                <button
                  onClick={() => setView('explore')}
                  className="px-4 py-2 bg-transparent border border-[#2d3449] hover:bg-[#171f33] text-white font-mono text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" /> View Public Dashboards
                </button>
              </div>

              {/* Main builder dual control column */}
              <DashboardView 
                projects={projects}
                setProjects={setProjects}
                onCommitTriggered={handleTerminalCommitCompleted}
                triggerTerminalCommit={handleTriggerTerminalCommit}
                addNotification={addNotification}
              />

              {/* Dedicated Terminal display inside Dashboard to inspect simulation outputs when triggered */}
              <div className="bg-[#131b2e] border border-[#2d3449] p-6 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-[#4edea3]" /> Active Pipeline Output Streams
                  </span>
                  <span className="font-mono text-[9px] text-[#4edea3] uppercase bg-[#4edea3]/10 border border-[#4edea3]/20 px-2 py-0.5 rounded">
                    sync agent: stable
                  </span>
                </div>
                <div className="max-w-3xl">
                  <TerminalSimulator 
                    onCommitTriggered={handleTerminalCommitCompleted}
                    triggerEventId={triggerEventCount}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Styled Responsive Footer */}
      <footer className="w-full bg-[#060e20] border-t border-[#2d3449]">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-10 max-w-7xl mx-auto gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="font-mono text-xs font-bold text-[#bbcabf] tracking-widest uppercase">
              SHOW-OFF
            </span>
            <span className="hidden md:inline text-gray-500">•</span>
            <span className="font-mono text-[11px] text-gray-500">
              © 2026 Show-Off. Built in Public by Innovative Builders.
            </span>
          </div>

          <div className="flex gap-6 text-xs text-[#bbcabf] font-mono">
            <a href="#github" className="hover:text-[#4edea3] transition-colors hover:underline">GitHub</a>
            <a href="#twitter" className="hover:text-[#4edea3] transition-colors hover:underline">Twitter</a>
            <a href="#opensource" className="hover:text-[#4edea3] transition-colors hover:underline">Open Source</a>
            <a href="#docs" className="hover:text-[#4edea3] transition-colors hover:underline">Docs</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
