import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SlidersHorizontal, 
  Eye, 
  EyeOff, 
  Search, 
  History, 
  Download, 
  Copy, 
  Trash2, 
  X, 
  RotateCcw, 
  User, 
  Check, 
  FileCode, 
  FileJson, 
  Sparkles,
  ChevronDown,
  Clock,
  Layers
} from 'lucide-react';
import { useTextEdit } from '../context/TextEditContext';

export default function EditorControlPanel() {
  const { 
    isEditMode, 
    setIsEditMode, 
    toggleEditMode,
    edits, 
    history, 
    author, 
    setAuthor, 
    resetEdit, 
    clearAllEdits, 
    exportEditsJSON, 
    exportEditsTypeScript, 
    downloadEditsFile,
    saveEdit
  } = useTextEdit();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'edits' | 'history' | 'export'>('edits');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedFormat, setCopiedFormat] = useState<'json' | 'ts' | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(author);

  // Global Keyboard Shortcut: Ctrl + Alt + E or Cmd + Alt + E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        toggleEditMode();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleEditMode]);

  useEffect(() => {
    setEditingAuthor(author);
  }, [author]);

  const activeEditsCount = Object.keys(edits).length;

  const handleCopy = (format: 'json' | 'ts') => {
    const text = format === 'json' ? exportEditsJSON() : exportEditsTypeScript();
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleSaveAuthor = () => {
    if (editingAuthor.trim()) {
      setAuthor(editingAuthor.trim());
    }
  };

  const filteredEdits = Object.entries(edits).filter(([key, val]) => 
    key.toLowerCase().includes(searchQuery.toLowerCase()) || 
    val.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimeAgo = (ts: any) => {
    if (!ts) return 'Just now';
    try {
      const date = ts.toDate ? ts.toDate() : new Date(ts);
      const diffSecs = Math.floor((Date.now() - date.getTime()) / 1000);
      if (diffSecs < 10) return 'Just now';
      if (diffSecs < 60) return `${diffSecs}s ago`;
      if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
      if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
      return `${Math.floor(diffSecs / 86400)}d ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <>
      {/* Floating Lower-Left Trigger Button */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 font-sans">
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(prev => !prev)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl border transition-all duration-300 cursor-pointer ${
            isEditMode 
              ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-500/20 shadow-emerald-900/30' 
              : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800 shadow-slate-950/40'
          }`}
          id="editor-control-panel-trigger"
        >
          <SlidersHorizontal className={`w-4 h-4 ${isEditMode ? 'animate-spin-slow text-white' : 'text-emerald-400'}`} />
          <span className="text-xs font-bold uppercase tracking-wider">Live CMS</span>
          {activeEditsCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/20 text-white">
              {activeEditsCount}
            </span>
          )}
        </motion.button>

        {/* Quick Mode Toggle Switch Button */}
        <button
          onClick={toggleEditMode}
          className={`px-3 py-3 rounded-full border transition-all cursor-pointer ${
            isEditMode
              ? 'bg-emerald-500 text-white border-emerald-400 hover:bg-emerald-600'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
          }`}
          title={isEditMode ? 'Disable Visual Edit Mode' : 'Enable Visual Edit Mode'}
        >
          {isEditMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Slide-Up Lower-Left Control Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 left-6 z-50 w-[92vw] max-w-md bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] font-sans"
            id="editor-control-panel-drawer"
          >
            {/* Header */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">Live Content Editor</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Real-time CMS &amp; Multi-device Sync</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Switch & Author Identity Banner */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isEditMode ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className="text-xs font-semibold text-slate-200">
                    Visual Edit Mode: <strong className={isEditMode ? 'text-emerald-400' : 'text-slate-400'}>{isEditMode ? 'ENABLED' : 'DISABLED'}</strong>
                  </span>
                </div>
                <button
                  onClick={toggleEditMode}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isEditMode 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isEditMode ? 'Turn Off' : 'Turn On'}
                </button>
              </div>

              {/* Editor Identity */}
              <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
                <User className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider shrink-0">Editor:</span>
                <input
                  type="text"
                  value={editingAuthor}
                  onChange={(e) => setEditingAuthor(e.target.value)}
                  onBlur={handleSaveAuthor}
                  className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none w-full border-b border-transparent focus:border-emerald-500/50 px-1"
                  placeholder="e.g. Peter"
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs">
              <button
                onClick={() => setActiveTab('edits')}
                className={`flex-1 py-2.5 text-center font-bold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'edits' 
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Edits ({activeEditsCount})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-2.5 text-center font-bold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'history' 
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                History ({history.length})
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`flex-1 py-2.5 text-center font-bold tracking-wider uppercase transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'export' 
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5' 
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Export
              </button>
            </div>

            {/* Tab 1: Active Edits */}
            {activeTab === 'edits' && (
              <div className="p-4 space-y-3 flex-1 overflow-y-auto min-h-[220px]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search active overrides..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {filteredEdits.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs space-y-1">
                    <Layers className="w-8 h-8 mx-auto opacity-30 text-slate-400" />
                    <p>{searchQuery ? 'No matching overrides found.' : 'No text overrides created yet.'}</p>
                    <p className="text-[10px] text-slate-600">Turn on Edit Mode and click any outlined text to edit!</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {filteredEdits.map(([key, val]) => (
                      <div key={key} className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 space-y-1.5 group hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-md truncate max-w-[180px]">
                            {key}
                          </span>
                          <button
                            onClick={() => resetEdit(key)}
                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-950/50 rounded transition-colors cursor-pointer"
                            title="Reset this field to default"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-200 font-medium line-clamp-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/40">
                          "{val}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeEditsCount > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    {!showClearConfirm ? (
                      <button
                        onClick={() => setShowClearConfirm(true)}
                        className="w-full py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All Edits ({activeEditsCount})</span>
                      </button>
                    ) : (
                      <div className="bg-rose-950/90 border border-rose-800 p-2.5 rounded-2xl space-y-2 text-center">
                        <p className="text-xs font-semibold text-rose-200">Reset all text fields back to hardcoded defaults?</p>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setShowClearConfirm(false)}
                            className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-700 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              await clearAllEdits();
                              setShowClearConfirm(false);
                            }}
                            className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 cursor-pointer"
                          >
                            Yes, Reset All
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Audit History */}
            {activeTab === 'history' && (
              <div className="p-4 space-y-2.5 flex-1 overflow-y-auto min-h-[220px] max-h-[340px]">
                {history.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs space-y-1">
                    <History className="w-8 h-8 mx-auto opacity-30 text-slate-400" />
                    <p>No audit trail logs recorded yet.</p>
                  </div>
                ) : (
                  history.map((log) => (
                    <div key={log.id} className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-mono text-emerald-400 font-bold">{log.fieldLabel || log.fieldId}</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(log.timestamp)}
                        </span>
                      </div>
                      <div className="text-slate-200 font-medium">
                        <span className="text-slate-500 line-through mr-1.5 font-normal">"{log.oldValue}"</span>
                        <span className="text-emerald-300">"{log.newValue}"</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                        <span>By: <strong className="text-slate-300">{log.author}</strong></span>
                        <button
                          onClick={() => saveEdit(log.fieldId, log.oldValue, log.fieldLabel, log.newValue)}
                          className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" /> Restore Previous
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Export Tools */}
            {activeTab === 'export' && (
              <div className="p-4 space-y-4 flex-1 overflow-y-auto text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                    <FileJson className="w-4 h-4 text-emerald-400" />
                    JSON Format
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Export raw active edits as key-value JSON mapping.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleCopy('json')}
                      className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedFormat === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFormat === 'json' ? 'Copied!' : 'Copy JSON'}</span>
                    </button>
                    <button
                      onClick={() => downloadEditsFile('json')}
                      className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    TypeScript Constant
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Export ready-to-commit TypeScript dictionary code.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleCopy('ts')}
                      className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedFormat === 'ts' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFormat === 'ts' ? 'Copied!' : 'Copy TS Code'}</span>
                    </button>
                    <button
                      onClick={() => downloadEditsFile('ts')}
                      className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/60 text-[11px] text-slate-400 space-y-1">
                  <p className="font-mono text-emerald-400 uppercase font-bold text-[10px]">Developer Tip:</p>
                  <p>You can commit the exported edits directly into your source code or sync them live using the built-in Firebase Firestore backend.</p>
                </div>
              </div>
            )}

            {/* Footer status */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between items-center font-mono">
              <span>Shortcut: <kbd className="bg-slate-800 text-slate-300 px-1 py-0.5 rounded">Ctrl+Alt+E</kbd></span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Firebase Live Sync Active
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
