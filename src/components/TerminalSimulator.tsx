import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, RefreshCw, Smartphone, Play, Check } from 'lucide-react';

interface TerminalSimulatorProps {
  onCommitTriggered?: (logMessage: string) => void;
  triggerEventId?: number; // External stimulus to fire an automated script sequence
}

export default function TerminalSimulator({ onCommitTriggered, triggerEventId }: TerminalSimulatorProps) {
  const [lines, setLines] = useState<string[]>([
    'show-off cli v2.0.4 - Transparency Engine Initialization Daemon',
    'Type "help" to list available commands.',
    ''
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Command handlers
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [...lines, `$ ${cmd}`];

    if (trimmed === 'help') {
      newLines.push(
        'Available CLI commands:',
        '  init        - Establish connection with the Show-Off server webhook.',
        '  status      - Display current webhook sync states and project binding.',
        '  commit      - Trigger a simulated git commit and sync a new dev log.',
        '  clear       - Clear the terminal screen.',
        '  help        - Display this menu.'
      );
    } else if (trimmed === 'clear') {
      setLines([]);
      setCurrentInput('');
      return;
    } else if (trimmed === 'init') {
      newLines.push(
        '✓ Project connection discovered via workspace configurations.',
        '✓ Linked with repository remote: "https://github.com/developer/show-off-workspace"',
        '✓ Established Webhook pipeline on channel: main',
        '✓ Transparency engine status: ACTIVE',
        'Show-Off setup complete. All further git pushes will propagate automatically.'
      );
    } else if (trimmed === 'status') {
      newLines.push(
        'Transparency Pipeline: ONLINE',
        'Linked Repository: nebula-os / main branch',
        'Webhook Endpoints:',
        '  - https://api.show-off.dev/webhooks/git-sync (V2)',
        'Active Contributors: 1,204',
        'Last Synchronized: Just now'
      );
    } else if (trimmed === 'commit' || trimmed.startsWith('commit ')) {
      // Automate commit sequence
      runAutomatedSequence(trimmed.substring(7) || 'feat: implement real-time log streaming');
      return;
    } else {
      newLines.push(`bash: command not found: ${trimmed}. Type "help" for a list of directives.`);
    }

    setLines(newLines);
    setCurrentInput('');
  };

  const runAutomatedSequence = (customText = 'feat: optimized memory allocation profile') => {
    if (isTyping) return;
    setIsTyping(true);

    const sequence = [
      { text: `$ git add . && git commit -m "${customText}" && git push`, delay: 100 },
      { text: 'Enumerating objects: 12, done.', delay: 800 },
      { text: 'Counting objects: 100% (12/12), done.', delay: 400 },
      { text: 'Delta compression using up to 10 threads', delay: 300 },
      { text: 'Compressing objects: 100% (8/8), done.', delay: 200 },
      { text: 'Writing objects: 100% (12/12), 2.45 KiB | 2.45 MiB/s, done.', delay: 450 },
      { text: 'Total 12 (delta 8), reused 0 (delta 0), pack-reused 0', delay: 200 },
      { text: 'To https://github.com/developer/nebula.git', delay: 100 },
      { text: '   6d0bfe4..fa38e91  main -> main', delay: 100 },
      { text: '--- SHOW-OFF MOMENTUM UPDATE ---', delay: 400, color: 'text-[#4edea3]' },
      { text: '✔ GitHub actions webhook captured event: WORKSPACE_PUSH', delay: 200, color: 'text-[#4edea3]' },
      { text: '✔ Extracted dev-log payload automatically.', delay: 200, color: 'text-[#4edea3]' },
      { text: `Public Dev-Log updated. Live dashboard refreshed at: show-off.dev/project/nebula`, delay: 350, color: 'text-[#4edea3]' }
    ];

    let currentTimeout = 0;
    sequence.forEach((line, idx) => {
      currentTimeout += line.delay;
      setTimeout(() => {
        setLines(prev => [...prev, line.text]);
        
        // At the end of the sequence, trigger parent callbacks so the simulated log appears in the app state
        if (idx === sequence.length - 1) {
          setIsTyping(false);
          if (onCommitTriggered) {
            onCommitTriggered(customText);
          }
        }
      }, currentTimeout);
    });
  };

  // Listen to external stimuli triggers (e.g. clicking "Git-Sync" in the dashboard)
  useEffect(() => {
    if (triggerEventId) {
      runAutomatedSequence();
    }
  }, [triggerEventId]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const copyCLICommand = () => {
    navigator.clipboard.writeText('npm i -g @show-off/cli && show-off init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Visual terminal container */}
      <div className="bg-[#060e20] rounded-xl border border-[#2d3449] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] font-mono text-xs">
        
        {/* Terminal Header Bar */}
        <div className="bg-[#171f33] px-4 py-2.5 border-b border-[#2d3449] flex justify-between items-center select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ffb4ab] border border-[#ffb4ab]/10" />
            <span className="w-3 h-3 rounded-full bg-[#ffb95f] border border-[#ffb95f]/10" />
            <span className="w-3 h-3 rounded-full bg-[#4edea3] border border-[#4edea3]/10" />
            <span className="text-[#bbcabf] font-mono text-[10px] ml-2 tracking-wider">bash — 80x24</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={copyCLICommand}
              className="p-1 rounded text-[#bbcabf] hover:text-[#4edea3] hover:bg-[#222a3d] transition-all"
              title="Copy connection CLI snippet"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
            <button 
              onClick={() => runAutomatedSequence()} 
              disabled={isTyping}
              className="p-1 rounded text-[#bbcabf] hover:text-[#4edea3] hover:bg-[#222a3d] transition-all disabled:opacity-40"
              title="Simulate repo commit hook"
            >
              <Play className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Output Screen */}
        <div className="p-6 h-80 overflow-y-auto space-y-1.5 flex flex-col justify-start select-text text-[#bbcabf] font-mono custom-scrollbar">
          
          {/* Initial default presentation line */}
          <div className="text-gray-500 text-[10px] pb-2 border-b border-[#2d3449]/40 mb-2 flex justify-between items-center">
            <span>SHOW-OFF CLI TRANSIT ENGINE ATTACHED</span>
            <span className="text-[#4edea3]/80 select-all font-bold">@show-off/cli@v2.0</span>
          </div>

          {lines.map((line, index) => {
            let colorClass = 'text-white';
            if (line.startsWith('$ ')) {
              colorClass = 'text-[#adc6ff] font-semibold';
            } else if (line.startsWith('✓') || line.startsWith('✔')) {
              colorClass = 'text-[#4edea3]';
            } else if (line.startsWith('---') || line.includes('Dev-Log updated')) {
              colorClass = 'text-[#4edea3] font-semibold tracking-widest';
            } else if (line.includes('ONLINE') || line.includes('ACTIVE')) {
              colorClass = 'text-[#4edea3] italic';
            } else if (line.startsWith('Type "help"')) {
              colorClass = 'text-gray-400';
            } else if (line.startsWith('bash:')) {
              colorClass = 'text-[#ffb4ab]';
            } else if (line.startsWith('   ') || line.startsWith('Delta')) {
              colorClass = 'text-gray-500';
            }

            return (
              <p key={index} className={`leading-relaxed text-[13px] ${colorClass}`}>
                {line}
              </p>
            );
          })}
          
          <div ref={terminalEndRef} />
        </div>

        {/* Input prompt line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentInput.trim()) {
              handleCommand(currentInput);
            }
          }}
          className="border-t border-[#2d3449] bg-[#0b1326] px-6 py-3 flex items-center gap-2"
        >
          <span className="text-[#adc6ff] font-bold font-mono text-[13px] select-none">$</span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            disabled={isTyping}
            className="flex-1 bg-transparent text-white focus:outline-none border-none p-0 font-mono text-[13px] select-text placeholder-[#bbcabf]/30 disabled:opacity-50"
            placeholder={isTyping ? 'Sync execution pipeline in progress...' : "Type 'help' OR 'commit' command..."}
          />
          {!isTyping && (
            <span className="w-1.5 h-4 bg-[#4edea3]/70 animate-pulse inline-block select-none" />
          )}
        </form>
      </div>

      {/* Copy-paste snippet banner */}
      <div className="mt-3 py-2 px-4 bg-[#171f33]/80 border border-[#2d3449]/80 rounded-lg flex items-center justify-between text-xs text-[#bbcabf] font-mono">
        <span className="truncate max-w-[80%] text-gray-400">
          $ <span className="text-[#4edea3]">npm i -g @show-off/cli && show-off init</span>
        </span>
        <button
          onClick={copyCLICommand}
          className="text-[#4edea3] hover:underline hover:text-[#4edea3]/80 font-semibold cursor-pointer shrink-0 ml-2"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
