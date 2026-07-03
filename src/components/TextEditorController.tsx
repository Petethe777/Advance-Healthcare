import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  History, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  RotateCcw, 
  User, 
  Eye, 
  Clock, 
  Globe, 
  Check, 
  ChevronRight,
  Database
} from 'lucide-react';
import { useTextEditor } from '../context/TextEditorContext';
import { EditHistoryItem } from '../types';

export default function TextEditorController() {
  const { 
    isEditorMode, 
    setIsEditorMode, 
    history, 
    overrides, 
    editorName, 
    setEditorName, 
    restoreVersion 
  } = useTextEditor();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  // Simple relative time formatter
  const formatRelativeTime = (timestamp: any): string => {
    if (!timestamp) return 'Just now';
    
    try {
      // Handle Firestore Timestamp or standard Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      
      if (isNaN(date.getTime())) return 'Recently';

      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 10) return 'Just now';
      if (diffSecs < 60) return `${diffSecs}s ago`;
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch (e) {
      return 'Recently';
    }
  };

  const handleRestore = async (item: EditHistoryItem) => {
    setRestoringId(item.id);
    
    // Find what the current value of this field is in overrides
    // (if not overridden, we assume the newValue that was there, or old)
    const currentVal = overrides[item.fieldId] !== undefined ? overrides[item.fieldId] : item.newValue;

    try {
      // Revert the field to its oldValue from this history log
      await restoreVersion(item.fieldId, item.fieldLabel, item.oldValue, currentVal);
    } catch (err) {
      console.error('Failed to restore:', err);
    } finally {
      setTimeout(() => setRestoringId(null), 800);
    }
  };

  return (
    <>
      {/* Floating Mode Toggle Trigger - only visible when not in Editor Mode */}
      {!isEditorMode && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditorMode(true)}
          className="fixed bottom-6 left-6 z-40 bg-slate-900 border border-slate-800 text-white pl-4 pr-5 py-3 rounded-full flex items-center gap-2.5 shadow-xl hover:shadow-teal-500/10 hover:border-slate-700 transition-all cursor-pointer font-sans"
          id="editor-mode-toggle-trigger"
        >
          <Settings className="w-4 h-4 text-teal-400 animate-spin-slow" />
          <span className="text-xs font-bold uppercase tracking-wider">Editor Panel</span>
        </motion.button>
      )}

      {/* Editor Control Bar (Anchored at Bottom of Screen when Editor Mode is active) */}
      <AnimatePresence>
        {isEditorMode && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 text-white z-40 px-6 py-4.5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Left Section: Status indicator */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500"></span>
              </span>
              <div>
                <p className="text-[10px] font-mono text-teal-400 tracking-wider uppercase font-bold">
                  Advance Health Cloud Workspace
                </p>
                <h4 className="text-xs font-bold text-slate-100 font-sans">
                  Editor Mode: <span className="text-teal-400">ACTIVE</span>
                </h4>
              </div>
            </div>

            {/* Middle Section: Live Author Sync */}
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl max-w-xs w-full">
              <Globe className="w-4 h-4 text-teal-500 animate-pulse shrink-0" />
              <div className="flex-grow space-y-0.5">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  Local Editor Region/Name
                </span>
                <input
                  type="text"
                  value={editorName}
                  onChange={(e) => setEditorName(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-xs text-white font-medium focus:outline-none placeholder-slate-600 focus:ring-0"
                  placeholder="e.g. Miami Client"
                />
              </div>
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>

            {/* Right Section: Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => setIsHistoryOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-white rounded-xl transition-all font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <History className="w-4 h-4 text-violet-400 shrink-0" />
                <span>History Logs</span>
                {history.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-teal-500/25 border border-teal-500/30 text-teal-300 font-mono text-[9px] font-bold">
                    {history.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsEditorMode(false)}
                className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl shadow-lg shadow-teal-600/10 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <Eye className="w-4 h-4 shrink-0" />
                <span>Exit Editor</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out Real-Time History Drawer Sidebar */}
      <AnimatePresence>
        {isHistoryOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Background Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            {/* Slide Drawer Content */}
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-full bg-slate-950 border-l border-slate-800 text-white flex flex-col justify-between shadow-2xl relative"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-850 bg-slate-900/40 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.05),transparent_40%)]" />
                  <button
                    onClick={() => setIsHistoryOpen(false)}
                    className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <span className="text-[10px] font-mono text-violet-400 tracking-widest uppercase font-bold flex items-center gap-1">
                      <Database className="w-3.5 h-3.5 shrink-0 text-violet-400 animate-pulse" />
                      GLOBAL AUDIT REGISTRY
                    </span>
                    <h3 className="text-base font-bold font-sans mt-1">
                      Collaborative History Logs
                    </h3>
                    <p className="text-[11px] text-slate-400 font-sans mt-1 leading-normal">
                      Track changes in real-time between Durban and Miami. Revert any edit instantly.
                    </p>
                  </div>
                </div>

                {/* List Container */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                      <div className="p-4 bg-slate-900 border border-slate-850 rounded-2xl text-slate-500">
                        <History className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-300">No edits recorded yet</h4>
                        <p className="text-xs text-slate-500 leading-normal max-w-[240px] mx-auto">
                          Once you or other users edit page headings, paragraphs, or buttons, logs will stream here.
                        </p>
                      </div>
                    </div>
                  ) : (
                    history.map((item) => {
                      const isRestoring = restoringId === item.id;
                      // Check if current value of this override matches item's newValue
                      // (If it does, it's the currently active value)
                      const isCurrentActive = overrides[item.fieldId] === item.newValue || 
                        (overrides[item.fieldId] === undefined && item.newValue === item.oldValue);

                      return (
                        <div 
                          key={item.id}
                          className={`bg-slate-900/60 border rounded-2xl p-4.5 space-y-3 relative group transition-all ${
                            isCurrentActive 
                              ? 'border-teal-500/30 bg-teal-950/5' 
                              : 'border-slate-850 hover:border-slate-800'
                          }`}
                        >
                          {/* Badge indicators */}
                          <div className="flex items-center justify-between gap-2 border-b border-slate-850/60 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono text-slate-400 tracking-wider truncate max-w-[150px] font-semibold block uppercase">
                                {item.fieldLabel}
                              </span>
                              {isCurrentActive && (
                                <span className="text-[8px] font-mono bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded-md border border-teal-500/25 font-bold uppercase">
                                  Current
                                </span>
                              )}
                            </div>
                            <span className="text-[9px] text-slate-500 font-mono flex items-center gap-1 shrink-0">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {formatRelativeTime(item.timestamp)}
                            </span>
                          </div>

                          {/* Author details */}
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-violet-400" />
                              Modified by: <span className="text-slate-100 font-bold">{item.author}</span>
                            </span>
                          </div>

                          {/* Delta view */}
                          <div className="space-y-1.5 bg-slate-950/80 border border-slate-850/60 p-3 rounded-xl text-[11px] font-sans leading-relaxed">
                            <div className="space-y-0.5">
                              <span className="text-[8px] font-mono text-rose-400 font-bold uppercase tracking-wider block">Was:</span>
                              <p className="text-slate-400 line-through truncate max-h-12 overflow-hidden break-words">{item.oldValue || <span className="italic text-slate-600">[empty]</span>}</p>
                            </div>
                            <div className="space-y-0.5 border-t border-slate-850 pt-1.5">
                              <span className="text-[8px] font-mono text-teal-400 font-bold uppercase tracking-wider block">Is now:</span>
                              <p className="text-slate-200 font-medium break-words">{item.newValue || <span className="italic text-slate-600">[empty]</span>}</p>
                            </div>
                          </div>

                          {/* Revert Trigger action */}
                          <div className="flex justify-end pt-1">
                            {isCurrentActive ? (
                              <div className="flex items-center gap-1 text-[10px] text-teal-400 font-mono font-bold uppercase">
                                <Check className="w-3.5 h-3.5 text-teal-400" />
                                <span>Active State</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleRestore(item)}
                                disabled={isRestoring}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                              >
                                <RotateCcw className={`w-3 h-3 text-violet-400 shrink-0 ${isRestoring ? 'animate-spin' : ''}`} />
                                <span>{isRestoring ? 'Restoring...' : 'Restore This'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-850 text-center bg-slate-900/20 text-[10px] text-slate-500 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
                  <span>Hillcrest</span>
                  <span>&bull;</span>
                  <span>Durban</span>
                  <span>&bull;</span>
                  <span>Miami</span>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
