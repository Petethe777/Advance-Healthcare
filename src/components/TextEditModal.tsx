import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, User, MapPin } from 'lucide-react';
import { useTextEdit } from '../context/TextEditContext';

interface TextEditModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  fieldId?: string;
  fieldLabel?: string;
  initialValue?: string;
}

export default function TextEditModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
  fieldId: propFieldId,
  fieldLabel: propFieldLabel,
  initialValue: propInitialValue
}: TextEditModalProps = {}) {
  const { 
    saveEdit, 
    author, 
    setAuthor, 
    activeModalField, 
    closeEditModal 
  } = useTextEdit();

  const isModalOpen = propIsOpen !== undefined ? propIsOpen : Boolean(activeModalField);
  const handleClose = propOnClose || closeEditModal;
  const currentFieldId = propFieldId || activeModalField?.id || '';
  const currentFieldLabel = propFieldLabel || activeModalField?.label || '';
  const currentInitialVal = propInitialValue !== undefined ? propInitialValue : (activeModalField?.value || '');

  const [textValue, setTextValue] = useState(currentInitialVal);
  const [authorName, setAuthorName] = useState(author);

  useEffect(() => {
    if (isModalOpen) {
      setTextValue(currentInitialVal);
      setAuthorName(author);
    }
  }, [isModalOpen, currentInitialVal, author]);

  if (!isModalOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedAuthor = authorName.trim() || 'Admin Editor';
    setAuthor(trimmedAuthor);
    
    await saveEdit(currentFieldId, textValue, currentFieldLabel, currentInitialVal);
    handleClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl relative z-10 overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative">
              <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase font-bold">
                Live Content Editor
              </span>
              <h3 className="text-lg font-bold font-sans mt-1">
                Editing: <span className="text-emerald-300 font-medium">{currentFieldLabel}</span>
              </h3>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSave} className="p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                Text Content
              </label>
              <textarea
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className="w-full min-h-[140px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-sans leading-relaxed"
                placeholder="Enter text value..."
                autoFocus
              />
            </div>

            {/* Editor Identity */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1 font-bold">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  Your Editor Identity
                </span>
                <p className="text-xs text-slate-500 leading-normal">
                  Identifies who modified this copy in the audit history.
                </p>
              </div>
              <div className="relative shrink-0 md:w-48">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="e.g. Peter"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Live Edit</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
