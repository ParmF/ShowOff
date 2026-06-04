import React, { useState } from 'react';
import { Project, DevLog } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpRight, Github, Heart, MessageSquare, Rocket, Calendar, GitCommit, CheckCircle2, Cloud, Sparkles, Filter, ChevronLeft, Layers, Wrench, FileCode, Check } from 'lucide-react';

interface ExploreViewProps {
  projects: Project[];
  onFollowToggle: (projectId: string) => void;
}

export default function ExploreView({ projects, onFollowToggle }: ExploreViewProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'followers' | 'updates' | 'progress'>('followers');

  // Find selected project
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  // Get all unique tags from active projects
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  // Filter and sort projects
  const filteredProjects = projects
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? p.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'followers') return b.followersCount - a.followersCount;
      if (sortBy === 'progress') return b.progress - a.progress;
      // updates (recent first)
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });

  const getLogTypeBadge = (type: DevLog['type']) => {
    switch (type) {
      case 'feat':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider">feature</span>;
      case 'fix':
        return <span className="bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider">patch</span>;
      case 'perf':
        return <span className="bg-[#adc6ff]/10 text-[#adc6ff] border border-[#adc6ff]/20 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider">perf</span>;
      case 'refactor':
        return <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider">refactor</span>;
      case 'docs':
        return <span className="bg-[#ffb95f]/10 text-[#ffb95f] border border-[#ffb95f]/20 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider">docs</span>;
      default:
        return <span className="bg-gray-500/10 text-gray-400 border border-gray-500/30 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider">chore</span>;
    }
  };

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        {!selectedProjectId ? (
          /* ==================================== */
          /*         EXPLORE DISCOVER FEED        */
          /* ==================================== */
          <motion.div
            key="discover-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Search & Filter Bar */}
            <div className="bg-[#131b2e] border border-[#2d3449] rounded-xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Field */}
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#bbcabf]/55" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search transparency dashboards, tech tags..."
                    className="w-full bg-[#0b1326] border border-[#2d3449] pl-10 pr-4 py-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-[#4edea3]/60 transition-all font-sans"
                    id="project-search-input"
                  />
                </div>

                {/* Sorters and Quick Stats */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <span className="text-xs text-[#bbcabf] font-mono flex items-center gap-1.5 shrink-0">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#4edea3]" /> Sort:
                  </span>
                  <div className="flex bg-[#0b1326] border border-[#2d3449] rounded-lg p-0.5">
                    <button
                      onClick={() => setSortBy('followers')}
                      className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                        sortBy === 'followers' ? 'bg-[#4edea3] text-[#003824] font-semibold' : 'text-[#bbcabf] hover:text-white'
                      }`}
                    >
                      POPULARITY
                    </button>
                    <button
                      onClick={() => setSortBy('updates')}
                      className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                        sortBy === 'updates' ? 'bg-[#4edea3] text-[#003824] font-semibold' : 'text-[#bbcabf] hover:text-white'
                      }`}
                    >
                      RECENT UPDATES
                    </button>
                    <button
                      onClick={() => setSortBy('progress')}
                      className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                        sortBy === 'progress' ? 'bg-[#4edea3] text-[#003824] font-semibold' : 'text-[#bbcabf] hover:text-white'
                      }`}
                    >
                      PROGRESS %
                    </button>
                  </div>
                </div>
              </div>

              {/* Tag filtering pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#2d3449]/40 items-center">
                <span className="text-xs text-gray-500 font-mono flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" /> Tags:
                </span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                    !selectedTag 
                      ? 'bg-[#4edea3]/15 text-[#4edea3] border-[#4edea3]/40 font-bold' 
                      : 'bg-[#171f33] text-[#bbcabf] border-[#2d3449] hover:border-white'
                  }`}
                >
                  All Tech
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                      tag === selectedTag 
                        ? 'bg-[#4edea3]/15 text-[#4edea3] border-[#4edea3]/40 font-bold' 
                        : 'bg-[#171f33] text-[#bbcabf] border-[#2d3449] hover:border-[#86948a]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboards Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full bg-[#131b2e] border border-[#2d3449] py-16 text-center rounded-xl">
                  <Sparkles className="w-8 h-8 text-[#4edea3] mx-auto opacity-30 mb-2" />
                  <p className="text-[#bbcabf] font-mono text-sm leading-relaxed">No matching transparency dashboards found.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedTag(null); }}
                    className="mt-4 text-xs font-mono text-[#4edea3] hover:underline cursor-pointer"
                  >
                    Reset Filter Queries
                  </button>
                </div>
              ) : (
                filteredProjects.map((project) => {
                  const isFeatured = project.id === 'nebula-engine';
                  return (
                    <motion.div
                      layout
                      key={project.id}
                      className={`bg-[#131b2e] border ${
                        isFeatured ? 'border-[#4edea3]/30 md:col-span-2' : 'border-[#2d3449]'
                      } rounded-xl p-6 flex flex-col gap-5 hover:border-[#4edea3]/50 transition-all duration-300 relative group overflow-hidden shadow-lg`}
                      id={`project-card-${project.id}`}
                    >
                      {/* Featured Glowing tag badge */}
                      {isFeatured && (
                        <div className="absolute top-0 right-0 bg-[#4edea3]/10 border-b border-l border-[#4edea3]/30 px-3 py-1 rounded-bl text-[9px] font-mono font-bold tracking-widest text-[#4edea3]">
                          FEATURED WORKSPACE
                        </div>
                      )}

                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                            {project.version} • {project.status.toUpperCase()}
                          </span>
                          <h3 className="font-sans text-xl font-bold text-[#4edea3] leading-snug group-hover:text-white transition-colors">
                            {project.name}
                          </h3>
                        </div>
                        <span className="text-xs bg-[#171f33] text-gray-400 border border-[#2d3449] px-2 py-0.5 rounded font-mono">
                          {project.progress}% Complete
                        </span>
                      </div>

                      {/* Display image for Featured representation (Nebula Engine) */}
                      {project.coverImage && (
                        <div className="h-44 md:h-56 rounded-lg bg-[#0b1326] border border-[#2d3449] overflow-hidden relative">
                          <img
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src={project.coverImage}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <span className="font-mono text-[11px] text-white">Live visualization canvas enabled</span>
                          </div>
                        </div>
                      )}

                      <p className="text-[#bbcabf] font-sans text-xs leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technical tag list */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 bg-[#171f33] border border-[#2d3449]/70 rounded font-mono text-[11px] text-gray-300">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Bottom Footer details */}
                      <div className="pt-4 border-t border-[#2d3449]/40 mt-auto flex justify-between items-center text-xs">
                        {/* Profile segment */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#171f33] overflow-hidden border border-[#2d3449]">
                            <img alt={project.author.name} src={project.author.avatarUrl} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-mono text-[10px] font-semibold text-white truncate max-w-[120px]">
                              {project.author.name}
                            </p>
                          </div>
                        </div>

                        {/* Open Dashboard buttons */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onFollowToggle(project.id)}
                            className={`flex items-center gap-1 font-mono text-[10px] tracking-wider font-bold p-1 rounded hover:bg-[#171f33] transition-colors cursor-pointer ${
                              project.isFollowing ? 'text-[#4edea3]' : 'text-[#86948a] hover:text-white'
                            }`}
                            id={`follow-project-${project.id}`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${project.isFollowing ? 'fill-[#4edea3]' : ''}`} />
                            {(project.followersCount / 1000).toFixed(1)}k
                          </button>

                          <button
                            onClick={() => setSelectedProjectId(project.id)}
                            className="bg-[#4edea3]/10 hover:bg-[#4edea3] text-[#4edea3] hover:text-[#003824] px-3.5 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase font-bold border border-[#4edea3]/30 transition-all flex items-center gap-1.5 cursor-pointer"
                            id={`open-dashboard-${project.id}`}
                          >
                            Dashboard <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        ) : (
          /* ==================================== */
          /*       PROJECT DASHBOARD DETAIL VIEW  */
          /* ==================================== */
          <motion.div
            key="dashboard-detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header / Nav-back banner block */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <button
                onClick={() => setSelectedProjectId(null)}
                className="flex items-center gap-1 text-[#bbcabf] hover:text-[#4edea3] font-mono text-xs tracking-wider uppercase cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Explore
              </button>

              <div className="inline-flex items-center gap-3">
                {selectedProject?.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171f33] border border-[#2d3449] hover:border-white rounded-lg text-xs font-mono text-white transition-all"
                  >
                    <Github className="w-4 h-4" /> Repository
                  </a>
                )}
                <button
                  onClick={() => onFollowToggle(selectedProject!.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                    selectedProject?.isFollowing
                      ? 'bg-[#4edea3]/10 text-[#4edea3] border-[#4edea3]/30 hover:bg-[#4edea3]/15'
                      : 'bg-transparent text-[#bbcabf] border-[#2d3449] hover:border-white'
                  }`}
                  id="detail-follow-btn"
                >
                  <Heart className={`w-4 h-4 ${selectedProject?.isFollowing ? 'fill-[#4edea3]' : ''}`} />
                  {selectedProject?.isFollowing ? 'Following workspace' : 'Follow workspace'}
                </button>
              </div>
            </div>

            {/* Profile banner & Stats header row */}
            <div className="bg-[#131b2e] border border-[#2d3449] rounded-xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-[#4edea3]/5 blur-[70px] pointer-events-none translate-x-[-50%] translate-y-[-50%]" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 items-start">
                <div className="md:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-[#4edea3] bg-[#4edea3]/10 border border-[#4edea3]/20 px-2.5 py-0.5 rounded font-bold uppercase">
                      {selectedProject?.status}
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      Version: {selectedProject?.version}
                    </span>
                    <span className="font-mono text-xs text-gray-500">•</span>
                    <span className="font-mono text-xs text-gray-500">
                      Sync: Active
                    </span>
                  </div>
                  <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-white">
                    {selectedProject?.name}
                  </h2>
                  <p className="text-[#bbcabf] font-sans text-sm leading-relaxed max-w-3xl">
                    {selectedProject?.description}
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {selectedProject?.tags.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#0b1326] border border-[#2d3449] rounded-md font-mono text-xs text-[#bbcabf]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 bg-[#0b1326] border border-[#2d3449] p-5 rounded-lg space-y-4">
                  <div className="flex justify-between items-center pb-2.5 border-b border-[#2d3449]">
                    <span className="font-mono text-xs text-gray-500">FOLLOWERS</span>
                    <span className="font-mono text-xs text-[#4edea3] font-bold">
                      {selectedProject?.followersCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-[#2d3449]">
                    <span className="font-mono text-xs text-gray-500">TOTAL LOGS</span>
                    <span className="font-mono text-xs text-white">
                      {selectedProject?.devLogs.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-gray-500">OWNER PROFILE</span>
                    <div className="flex items-center gap-1.5 text-right">
                      <span className="font-mono text-[11px] text-[#4edea3]">@{selectedProject?.author.handle}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main grid columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (8 cols): Dev logs timeline */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#2d3449] pb-4 mb-2">
                  <h3 className="font-sans text-lg font-bold text-white flex items-center gap-2">
                    <GitCommit className="w-5 h-5 text-[#4edea3]" /> Commit Dev-Logs
                  </h3>
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest bg-[#171f33] border border-[#2d3449] px-2 py-0.5 rounded">
                    Chronological Log Stream
                  </span>
                </div>

                {selectedProject && selectedProject.devLogs.length === 0 ? (
                  <div className="p-12 text-center bg-[#131b2e] rounded-xl border border-[#2d3449]">
                    <MessageSquare className="w-8 h-8 text-gray-500 mx-auto opacity-30 mb-2" />
                    <p className="text-[#bbcabf] font-mono text-xs">No dev logs published for this project yet.</p>
                  </div>
                ) : (
                  <div className="relative pl-6 md:pl-8 border-l border-[#2d3449] space-y-8 py-2 ml-3">
                    {selectedProject?.devLogs.map((log) => (
                      <div key={log.id} className="relative group">
                        
                        {/* Timeline point selector */}
                        <div className="absolute left-[-31px] md:left-[-39px] top-1 w-4 h-4 rounded-full bg-[#0b1326] border border-[#4edea3]/40 flex items-center justify-center pointer-events-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] group-hover:shadow-[0_0_8px_#4edea3] transition-all" />
                        </div>

                        {/* Timeline log card */}
                        <div className="bg-[#131b2e] border border-[#2d3449] hover:border-[#4edea3]/20 p-5 rounded-xl transition-all space-y-4">
                          <div className="flex flex-wrap md:flex-nowrap justify-between gap-2.5 items-start">
                            <div className="space-y-1.5">
                              <div className="flex flex-wrap items-center gap-2">
                                {getLogTypeBadge(log.type)}
                                {log.commitSha && (
                                  <span className="font-mono text-[10px] bg-[#0b1326] border border-[#2d3449] text-gray-400 px-2 py-0.5 rounded flex items-center gap-1 select-all">
                                    <GitCommit className="w-3 h-3 text-[#4edea3]" /> {log.commitSha}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-sans text-base font-bold text-white group-hover:text-[#4edea3] transition-colors leading-snug">
                                {log.title}
                              </h4>
                            </div>

                            <span className="font-mono text-[10px] text-gray-400 bg-[#0b1326] border border-[#2d3449] px-2 py-1 rounded shrink-0">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                              {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          <p className="text-[#bbcabf] font-sans text-xs [word-break:break-word] leading-relaxed whitespace-pre-line">
                            {log.content}
                          </p>

                          <div className="pt-2 border-t border-[#2d3449]/40 flex items-center justify-between text-[11px] text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full overflow-hidden bg-[#171f33] border border-[#2d3449]">
                                <img src={log.authorAvatar} alt={log.authorName} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-mono text-[11px] text-[#bbcabf]">{log.authorName}</span>
                            </div>
                            <span className="font-mono text-xs text-gray-500 text-right uppercase">git verified</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column (4 cols): Momentum & Status integrations */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Project Progress Slider indicator */}
                <div className="bg-[#131b2e] border border-[#2d3449] p-5 rounded-xl space-y-3 shadow">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-xs text-gray-400">PROJECT STAGE</span>
                    <span className="font-mono text-xs text-[#4edea3] font-bold">
                      {selectedProject?.progress}% Complete
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#0b1326] rounded-full overflow-hidden p-0.5 border border-[#2d3449]">
                    <div 
                      className="h-full bg-gradient-to-r from-[#10b981] to-[#4edea3] rounded-full transition-all duration-1000"
                      style={{ width: `${selectedProject?.progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 font-mono italic leading-tight">
                    Next milestone: Release validation builds after active telemetry metrics.
                  </p>
                </div>

                {/* Dev Momentum Bar Graphic representation */}
                <div className="bg-[#131b2e] border border-[#2d3449] p-5 rounded-xl space-y-3.5 shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <ClockSpinner className="w-3.5 h-3.5 text-[#4edea3] animate-spin" style={{ animationDuration: '6s' }} /> Pipeline Momentum
                    </span>
                  </div>
                  <div className="h-20 bg-[#0b1326] border border-[#2d3449] rounded p-2 flex items-end gap-1.5 justify-between">
                    {selectedProject?.momentumPoints.map((pt, i) => (
                      <div key={i} className="flex-1 bg-[#4edea3]/10 hover:bg-[#4edea3]/20 rounded-t-sm h-full flex flex-col justify-end group/bar">
                        <div 
                          className="w-full bg-[#4edea3] rounded-t-sm group-hover/bar:bg-[#4edea3]/85 transition-all"
                          style={{ height: `${pt}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-gray-500">
                    <span>7 DAYS AGO</span>
                    <span>TODAY</span>
                  </div>
                </div>

                {/* Integrations panel */}
                <div className="bg-[#131b2e] border border-[#2d3449] p-5 rounded-xl space-y-4 shadow">
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Cloud className="w-3.5 h-3.5 text-[#adc6ff]" /> VCS Live integrations
                  </span>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-[#0b1326] border border-[#2d3449] rounded-lg">
                      <span className="font-mono text-gray-300">GitHub Webhook stream</span>
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                        selectedProject?.integrations.webhookActive 
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30' 
                          : 'bg-gray-400/10 text-gray-400 border border-gray-400/20'
                      }`}>
                        {selectedProject?.integrations.webhookActive ? 'CONNECTED' : 'INACTIVE'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-[#0b1326] border border-[#2d3449] rounded-lg">
                      <span className="font-mono text-gray-300">GitHub Actions CI/CD</span>
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                        selectedProject?.integrations.githubActions 
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30' 
                          : 'bg-gray-400/10 text-gray-400 border border-gray-400/20'
                      }`}>
                        {selectedProject?.integrations.githubActions ? 'ACTIVE' : 'OFFLINE'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-[#0b1326] border border-[#2d3449] rounded-lg">
                      <span className="font-mono text-gray-300">GitHub Pages deployer</span>
                      <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                        selectedProject?.integrations.githubPages 
                          ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30' 
                          : 'bg-gray-400/10 text-gray-400 border border-gray-400/20'
                      }`}>
                        {selectedProject?.integrations.githubPages ? 'DEPLOYED' : 'NOT LINKED'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Inline minimalist clock spinner icon
function ClockSpinner({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg 
      className={className} 
      style={style}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
