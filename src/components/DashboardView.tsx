import React, { useState } from 'react';
import { Project, DevLog } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Settings, FileText, CheckCircle, RefreshCw, Layers, Sliders, ChevronDown, Trash, Code, Terminal, Sparkles, Send, Eye, ShieldCheck, Link2, GitFork, ArrowUpRight } from 'lucide-react';

interface DashboardViewProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  onCommitTriggered: (message: string) => void;
  triggerTerminalCommit: (message: string) => void;
  addNotification: (message: string) => void;
}

export default function DashboardView({
  projects,
  setProjects,
  onCommitTriggered,
  triggerTerminalCommit,
  addNotification
}: DashboardViewProps) {
  const [selectedDashboardProjectId, setSelectedDashboardProjectId] = useState<string>(projects[0]?.id || '');
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showNewLogModal, setShowNewLogModal] = useState(false);

  // Add Project States
  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjLink, setNewProjLink] = useState('');
  const [newProjStatus, setNewProjStatus] = useState<Project['status']>('beta');
  const [newProjTags, setNewProjTags] = useState<string>('React, TypeScript, Tailwind');
  const [newProjProgress, setNewProjProgress] = useState(50);
  const [newProjVersion, setNewProjVersion] = useState('v1.0.0-alpha');

  // Add Log States
  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogContent, setNewLogContent] = useState('');
  const [newLogType, setNewLogType] = useState<DevLog['type']>('feat');

  // Find active project in workspace
  const activeProject = projects.find(p => p.id === selectedDashboardProjectId) || projects[0];

  // Quick technical templates to easily generate developer logs
  const MICRO_TEMPLATES = [
    {
      title: 'Optimize memory allocation profile',
      type: 'perf' as const,
      content: 'Refactored internal voxel buffer references to compress memory overhead. Reduced allocations per state frame, resulting in 15% lower heap usage under steady state simulation. Double-checked garbage collection pauses and flattened arrays inline.'
    },
    {
      title: 'Setup GitHub Actions release pipelines',
      type: 'chore' as const,
      content: 'Configured a unified build pipeline in .github/workflows/deploy.yml. Integrates unit matrix testing across multiple Node runtimes, outputs static web builds, and deploys directly to public pages hosting channels upon major releases.'
    },
    {
      title: 'Solve race condition during initialization',
      type: 'fix' as const,
      content: 'Resolved a state loading lock inside the viewport container logic. Added defensive promise wrappers to guarantee that context settings are completely prepared and stored before dispatching render requests.'
    },
    {
      title: 'Refactored layout layout grid modules',
      type: 'refactor' as const,
      content: 'Transposed old explicit offset calculations to standard Tailwind fluid templates. Removed complex resize handlers and centralized layout bounds directly inside standard mobile drawers and grid panels.'
    }
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const newId = newProjName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tagsArray = newProjTags.split(',').map(t => t.trim()).filter(Boolean);

    const newProject: Project = {
      id: newId,
      name: newProjName,
      description: newProjDesc || 'An open transparency project tracking builder benchmarks and logs.',
      link: newProjLink || 'https://show-off.dev',
      status: newProjStatus,
      version: newProjVersion || 'v1.0.0',
      tags: tagsArray.length > 0 ? tagsArray : ['Web'],
      followersCount: 0,
      isFollowing: false,
      progress: newProjProgress,
      lastUpdated: new Date().toISOString(),
      momentumPoints: [10, 20, 30, 40, 50, 60, 70],
      integrations: {
        githubActions: true,
        githubPages: false,
        webhookActive: true
      },
      author: {
        name: 'Alex Rivera',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWtwYt2_SjL7LAWFVFiXLrk8nOUIeNxwEMTbWZBs0yiUorDtFgLeC37Q-peFeVfCAcImtwTv-QAuSiJiiT0sc4pnoEjXK1_-zoFKF5VcGbaPA_YZ-dDLJEpaxjXj12mI_3KDzLB6mkT4DqJqj8UGYLtjKNq63qrEThzR0jxHFgstuyXBEIiFEQsaqsUF83h8ql_5tF9MYah3mRKvPZonHz-mjic2slmOT0B0NB54KY2y1OJe0EJyE-DpdXN67cm_cwQyj1r0A0hkxI',
        handle: 'alex_rivera_synthia'
      },
      devLogs: []
    };

    setProjects(prev => [...prev, newProject]);
    setSelectedDashboardProjectId(newId);
    setShowAddProjectModal(false);
    
    // Clear forms
    setNewProjName('');
    setNewProjDesc('');
    setNewProjLink('');
    setNewProjTags('React, TypeScript, Tailwind');
    setNewProjProgress(50);
    setNewProjVersion('v1.0.0-alpha');

    addNotification(`Created new transparency dashboard: "${newProject.name}"!`);
  };

  const handleCreateDevLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle.trim() || !newLogContent.trim() || !activeProject) return;

    const newLog: DevLog = {
      id: `m-log-${Date.now()}`,
      projectId: activeProject.id,
      title: newLogTitle,
      content: newLogContent,
      timestamp: new Date().toISOString(),
      type: newLogType,
      authorName: activeProject.author.name,
      authorAvatar: activeProject.author.avatarUrl,
      commitSha: `commit-${Math.random().toString(16).substring(2, 9)}`
    };

    // Update Project state with log
    setProjects(prev => prev.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          devLogs: [newLog, ...p.devLogs],
          lastUpdated: new Date().toISOString()
        };
      }
      return p;
    }));

    setShowNewLogModal(false);
    setNewLogTitle('');
    setNewLogContent('');

    addNotification(`Manually posted devlog on "${activeProject.name}": "${newLog.title}"`);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project dashboard from Show-Off? All logs will be deleted.')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
      const remaining = projects.filter(p => p.id !== projectId);
      if (remaining.length > 0) {
        setSelectedDashboardProjectId(remaining[0].id);
      } else {
        setSelectedDashboardProjectId('');
      }
      addNotification(`Deleted project dashboard: "${projectId}"`);
    }
  };

  const applyLogTemplate = (temp: typeof MICRO_TEMPLATES[0]) => {
    setNewLogTitle(temp.title);
    setNewLogType(temp.type);
    setNewLogContent(temp.content);
  };

  const toggleIntegration = (key: 'githubActions' | 'githubPages' | 'webhookActive') => {
    if (!activeProject) return;
    setProjects(prev => prev.map(p => {
      if (p.id === activeProject.id) {
        return {
          ...p,
          integrations: {
            ...p.integrations,
            [key]: !p.integrations[key]
          }
        };
      }
      return p;
    }));
    addNotification(`Toggled integration "${key}" on project "${activeProject.name}"`);
  };

  const updateProgressState = (val: number) => {
    if (!activeProject) return;
    setProjects(prev => prev.map(p => {
      if (p.id === activeProject.id) {
        return { ...p, progress: val };
      }
      return p;
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
      
      {/* Left Sidebar (4 cols): Dashboard control listing */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Workspace select block */}
        <div className="bg-[#131b2e] border border-[#2d3449] p-5 rounded-xl space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-gray-400 font-bold uppercase tracking-wider">
              Workspaces ({projects.length})
            </span>
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4edea3]/10 hover:bg-[#4edea3] text-[#4edea3] hover:text-[#003824] rounded-md font-mono text-[10px] tracking-wider uppercase font-bold border border-[#4edea3]/30 transition-all cursor-pointer"
              id="create-new-project-btn"
            >
              <Plus className="w-3.5 h-3.5" /> NEW ENGINE
            </button>
          </div>

          <div className="space-y-1.5">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedDashboardProjectId(p.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                  selectedDashboardProjectId === p.id
                    ? 'bg-[#4edea3]/10 border-[#4edea3]/40 text-[#4edea3]'
                    : 'bg-[#0b1326] border-[#2d3449] text-[#bbcabf] hover:border-[#bbcabf]/50'
                }`}
                id={`workspace-btn-${p.id}`}
              >
                <div className="space-y-1 truncate max-w-[80%]">
                  <p className="font-sans text-xs font-bold leading-tight truncate">{p.name}</p>
                  <p className="font-mono text-[9px] text-gray-500 truncate">VCS Pipeline: {p.version}</p>
                </div>
                <span className="font-mono text-[10px] bg-[#171f33] border border-[#2d3449] px-1.5 py-0.5 rounded">
                  {p.progress}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Global Dashboard quick info */}
        <div className="bg-[#131b2e] border border-[#2d3449] p-5 rounded-xl space-y-4 shadow-lg">
          <span className="font-mono text-xs text-gray-400 font-bold uppercase tracking-wider block">
            WORKSPACE INSIGHTS
          </span>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-[#0b1326] border border-[#2d3449] p-3 rounded-lg">
              <p className="text-white font-sans text-xl font-black">
                {projects.reduce((acc, p) => acc + p.devLogs.length, 0)}
              </p>
              <p className="font-mono text-[9px] text-gray-500 uppercase">Synchronized Logs</p>
            </div>
            <div className="bg-[#0b1326] border border-[#2d3449] p-3 rounded-lg">
              <p className="text-[#4edea3] font-sans text-xl font-black">
                {(projects.reduce((acc, p) => acc + p.followersCount, 0) / 1000).toFixed(1)}k
              </p>
              <p className="font-mono text-[9px] text-gray-500 uppercase">Subscribed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (8 cols): Project Management Cockpit */}
      <div className="lg:col-span-8 space-y-6">
        {activeProject ? (
          <div className="space-y-6">
            
            {/* Active Workspace Header and description edit sliders */}
            <div className="bg-[#131b2e] border border-[#2d3449] p-6 rounded-xl space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#2d3449]/40 pb-4">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#4edea3] bg-[#4edea3]/10 border border-[#4edea3]/20 px-2 py-0.5 rounded tracking-widest font-bold uppercase">
                    ACTIVE PROJECT WORKSPACE
                  </span>
                  <h3 className="font-sans text-2xl font-black text-white">{activeProject.name}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowNewLogModal(true)}
                    className="px-4 py-2 bg-[#4edea3] text-[#003824] hover:brightness-105 rounded-lg font-mono text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                    id="trigger-add-devlog-btn"
                  >
                    <Plus className="w-4 h-4 text-[#003824]" /> Write Dev-Log
                  </button>
                  <button
                    onClick={() => handleDeleteProject(activeProject.id)}
                    className="p-2 bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20 hover:bg-[#ffb4ab]/20 rounded-lg cursor-pointer"
                    title="Delete Project Workspace"
                    id="delete-project-btn"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Editable Slider for project progress (Satisfies progress edit request) */}
              <div className="bg-[#0b1326] p-4 rounded-lg border border-[#2d3449] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-xs text-gray-400 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-[#4edea3]" /> Progress Calibration Slider:
                  </span>
                  <span className="font-mono text-xs text-[#4edea3] font-bold">
                    {activeProject.progress}% Ready
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={activeProject.progress}
                  onChange={(e) => updateProgressState(Number(e.target.value))}
                  className="w-full tracking-bar accent-[#4edea3] h-1.5 bg-[#171f33] rounded-lg border-none focus:outline-none"
                  id="progress-range-slider"
                />
                <p className="text-[10px] text-gray-500 font-mono">
                  Drag slider to alter real-time progress. Changes are saved instantly!
                </p>
              </div>

              {/* GitHub Hook simulation controllers (Git-Driven updates) */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                  Git VCS webhook simulator
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Commiter buttons */}
                  <div className="bg-[#0b1326] border border-[#2d3449] p-4 rounded-lg flex flex-col justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-sans text-xs font-bold text-white flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-[#4edea3]" /> Interactive Commit Simulator
                      </p>
                      <p className="text-[11px] text-gray-500 leading-normal">
                        Simulate checking in a feature on your local system to test the git webhook ingestion pipeline.
                      </p>
                    </div>
                    <button
                      onClick={() => triggerTerminalCommit('feat: implement performance monitoring telemetry')}
                      className="w-full py-2.5 bg-[#4edea3]/10 hover:bg-[#4edea3] text-[#4edea3] hover:text-[#003824] text-center rounded font-mono text-[10px] font-bold uppercase border border-[#4edea3]/30 tracking-wider transition-all cursor-pointer"
                      id="simulate-git-commit-btn"
                    >
                      PUSH SIMULATED REPO COMMIT
                    </button>
                  </div>

                  {/* Settings togglers */}
                  <div className="bg-[#0b1326] border border-[#2d3449] p-4 rounded-lg space-y-2.5 text-xs">
                    <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-[#171f33]/40">
                      <span className="font-mono text-gray-300">GitHub Webhook Active</span>
                      <input
                        type="checkbox"
                        checked={activeProject.integrations.webhookActive}
                        onChange={() => toggleIntegration('webhookActive')}
                        className="accent-[#4edea3] rounded text-[#003824] border-[#2d3449] focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-[#171f33]/40">
                      <span className="font-mono text-gray-300">GitHub Actions CI Pipeline</span>
                      <input
                        type="checkbox"
                        checked={activeProject.integrations.githubActions}
                        onChange={() => toggleIntegration('githubActions')}
                        className="accent-[#4edea3] rounded text-[#003824] border-[#2d3449] focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-[#171f33]/40">
                      <span className="font-mono text-gray-300">GitHub Pages auto-deploy</span>
                      <input
                        type="checkbox"
                        checked={activeProject.integrations.githubPages}
                        onChange={() => toggleIntegration('githubPages')}
                        className="accent-[#4edea3] rounded text-[#003824] border-[#2d3449] focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                      />
                    </label>
                  </div>

                </div>
              </div>

            </div>

            {/* Micro logging list */}
            <div className="bg-[#131b2e] border border-[#2d3449] p-6 rounded-xl space-y-4 shadow-xl">
              <span className="font-mono text-xs text-gray-400 font-bold uppercase tracking-wider block">
                LOG STREAM IN WORKSPACE ({activeProject.devLogs.length})
              </span>

              {activeProject.devLogs.length === 0 ? (
                <div className="p-10 border border-dashed border-[#2d3449] rounded-lg text-center font-mono text-xs text-gray-500">
                  No logs in this workspace yet. Write one above to get started!
                </div>
              ) : (
                <div className="space-y-3">
                  {activeProject.devLogs.map((log) => (
                    <div key={log.id} className="p-3 bg-[#0b1326] border border-[#2d3449] rounded-lg flex justify-between items-center text-xs gap-4">
                      <div className="space-y-1 truncate">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-[#4edea3]/10 text-[#4edea3] rounded text-[9px] uppercase font-mono font-bold">
                            {log.type}
                          </span>
                          <p className="font-sans text-xs font-bold text-white truncate max-w-[300px]">
                            {log.title}
                          </p>
                        </div>
                        <p className="text-[10px] text-gray-500 font-mono">
                          Synchronized: {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      
                      <div className="shrink-0 flex items-center gap-2 font-mono text-[10px] text-gray-400">
                        {log.commitSha && (
                          <span className="bg-[#171f33] px-2 py-0.5 rounded border border-[#2d3449]">
                            {log.commitSha}
                          </span>
                        )}
                        <span className="text-[#4edea3] uppercase text-[9px] font-bold">SAVED</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="p-20 bg-[#131b2e] rounded-xl border border-[#2d3449] text-center">
            <Layers className="w-10 h-10 text-gray-400 mx-auto opacity-30 mb-2" />
            <p className="text-white font-mono text-sm">Create a project workspace to begin showcasing.</p>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/*               MODAL: ADD NEW PROJECT WORKSPACE          */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showAddProjectModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddProjectModal(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#131b2e] border border-[#2d3449] rounded-xl shadow-2xl p-6 z-50 text-xs text-[#bbcabf] overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center border-b border-[#2d3449] pb-3 mb-4">
                <span className="font-mono text-sm text-white font-bold tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4.5 h-4.5 text-[#4edea3]" /> CREATE WORKSPACE ENGINE
                </span>
                <button
                  onClick={() => setShowAddProjectModal(false)}
                  className="text-[#bbcabf] hover:text-white font-mono text-xs border border-[#2d3449] px-2 py-0.5 rounded"
                >
                  ESC
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-gray-400 block uppercase">Project Name:</label>
                  <input
                    type="text"
                    required
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    placeholder="e.g., Nova Compiler, Aurora SDK"
                    className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none focus:border-[#4edea3]"
                    id="new-project-name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] text-gray-400 block uppercase">Version Target:</label>
                    <input
                      type="text"
                      value={newProjVersion}
                      onChange={(e) => setNewProjVersion(e.target.value)}
                      placeholder="e.g., v1.0.0-alpha"
                      className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none focus:border-[#4edea3]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] text-gray-400 block uppercase">Lifecycle Status:</label>
                    <select
                      value={newProjStatus}
                      onChange={(e) => setNewProjStatus(e.target.value as Project['status'])}
                      className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none focus:border-[#4edea3]"
                    >
                      <option value="alpha">Alpha Testing</option>
                      <option value="beta">Beta Testing</option>
                      <option value="active">Active Shipping</option>
                      <option value="stable">Production Stable</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-gray-400 block uppercase">Project Link:</label>
                  <input
                    type="url"
                    value={newProjLink}
                    onChange={(e) => setNewProjLink(e.target.value)}
                    placeholder="e.g., https://nova.show-off.dev"
                    className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none focus:border-[#4edea3]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-gray-400 block uppercase">Description:</label>
                  <textarea
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    placeholder="Briefly state goals, target audience, and progress tracks..."
                    className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none h-20 focus:border-[#4edea3]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-gray-400 block uppercase">Tech Tags (comma separated):</label>
                  <input
                    type="text"
                    value={newProjTags}
                    onChange={(e) => setNewProjTags(e.target.value)}
                    placeholder="e.g., React, Go, WebAssembly"
                    className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none focus:border-[#4edea3]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-gray-400 block uppercase flex justify-between">
                    <span>Initial progress:</span>
                    <span className="text-[#4edea3] font-bold">{newProjProgress}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newProjProgress}
                    onChange={(e) => setNewProjProgress(Number(e.target.value))}
                    className="w-full accent-[#4edea3] h-1.5 bg-[#0b1326]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#4edea3] text-[#003824] hover:brightness-105 rounded font-mono font-bold uppercase text-[11px] tracking-wider cursor-pointer"
                    id="submit-new-project-btn"
                  >
                    DEPLOY TRANSBOARD ENGINE
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/*                MODAL: WRITE DEVICE LOG                   */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showNewLogModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNewLogModal(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#131b2e] border border-[#2d3449] rounded-xl shadow-2xl p-6 z-50 text-xs text-[#bbcabf] overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center border-b border-[#2d3449] pb-3 mb-4">
                <span className="font-mono text-sm text-white font-bold tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4.5 h-4.5 text-[#4edea3]" /> PUBLISH COMMIT DEV-LOG
                </span>
                <button
                  onClick={() => setShowNewLogModal(false)}
                  className="text-[#bbcabf] hover:text-white font-mono text-xs border border-[#2d3449] px-2 py-0.5 rounded"
                >
                  ESC
                </button>
              </div>

              {/* Technical quick template assist */}
              <div className="mb-4 bg-[#0b1326] p-3 rounded-lg border border-[#2d3449]">
                <p className="font-mono text-[10px] text-gray-400 mb-2 font-bold uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#4edea3]" /> Dev-Log Assistant Templates:
                </p>
                <div className="flex flex-wrap gap-2">
                  {MICRO_TEMPLATES.map((temp, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => applyLogTemplate(temp)}
                      className="text-[10px] font-mono px-2 py-1 bg-[#171f33] border border-[#2d3449] text-[#bbcabf] hover:border-[#4edea3] rounded text-left truncate cursor-pointer transition-all hover:scale-105"
                      title={temp.content}
                    >
                      {temp.title.split(' ').slice(0, 3).join(' ')}...
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleCreateDevLog} className="space-y-4">
                <div className="grid grid-cols-3 gap-3 items-end">
                  <div className="col-span-2 space-y-1.5">
                    <label className="font-mono text-[10px] text-gray-400 block uppercase">Log Title:</label>
                    <input
                      type="text"
                      required
                      value={newLogTitle}
                      onChange={(e) => setNewLogTitle(e.target.value)}
                      placeholder="e.g., Optimized memory lookup maps"
                      className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none focus:border-[#4edea3]"
                      id="new-log-title"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-gray-400 block uppercase">Log Category:</label>
                    <select
                      value={newLogType}
                      onChange={(e) => setNewLogType(e.target.value as DevLog['type'])}
                      className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none focus:border-[#4edea3]"
                    >
                      <option value="feat">Feature</option>
                      <option value="fix">Patch</option>
                      <option value="perf">Performance</option>
                      <option value="refactor">Refactor</option>
                      <option value="docs">Docs</option>
                      <option value="chore">Chore</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-gray-400 block uppercase">Markdown / Plain Log Content:</label>
                  <textarea
                    required
                    value={newLogContent}
                    onChange={(e) => setNewLogContent(e.target.value)}
                    placeholder="Describe implementation details, milestones, constraints. Bullet points are highly encouraged..."
                    className="w-full bg-[#0b1326] border border-[#2d3449] px-3 py-2 rounded text-white focus:outline-none h-32 focus:border-[#4edea3]"
                    id="new-log-content"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewLogModal(false)}
                    className="w-1/3 py-2.5 bg-transparent border border-[#2d3449] hover:bg-white/5 rounded font-mono text-xs uppercase text-[#bbcabf] font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-[#4edea3] text-[#003824] hover:brightness-105 rounded font-mono font-bold uppercase text-xs tracking-wider cursor-pointer"
                    id="submit-new-log-btn"
                  >
                    PUBLISH TO PUBLIC FEED
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
