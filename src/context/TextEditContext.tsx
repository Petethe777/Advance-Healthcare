import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc,
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  getDocs
} from 'firebase/firestore';

export interface EditHistoryRecord {
  id: string;
  fieldId: string;
  fieldLabel: string;
  oldValue: string;
  newValue: string;
  timestamp: any;
  author: string;
}

export interface TextEditContextType {
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  // Aliases for compatibility
  isEditorMode: boolean;
  setIsEditorMode: (mode: boolean) => void;
  toggleEditMode: () => void;
  edits: Record<string, string>;
  // Alias for backward compatibility
  overrides: Record<string, string>;
  history: EditHistoryRecord[];
  author: string;
  setAuthor: (name: string) => void;
  // Primary function requested by prompt
  saveEdit: (id: string, text: string, label?: string, oldValue?: string) => Promise<void>;
  resetEdit: (id: string) => Promise<void>;
  clearAllEdits: () => Promise<void>;
  exportEditsJSON: () => string;
  exportEditsTypeScript: () => string;
  downloadEditsFile: (format: 'json' | 'ts') => void;
  // Aliases for compatibility
  updateText: (id: string, label: string, newValue: string, oldValue: string) => Promise<void>;
  editorName: string;
  setEditorName: (name: string) => void;
  restoreVersion: (fieldId: string, label: string, targetValue: string, currentValue: string) => Promise<void>;
  openEditModal: (id: string, label: string, defaultText: string) => void;
  activeModalField: { id: string; label: string; value: string } | null;
  closeEditModal: () => void;
}

const TextEditContext = createContext<TextEditContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_EDITS = 'advance_health_live_edits_cache';
const LOCAL_STORAGE_KEY_AUTHOR = 'advance_health_live_editor_author';
const LOCAL_STORAGE_KEY_HISTORY = 'advance_health_live_history_cache';

export const parseFirestoreDate = (ts: any): Date => {
  if (!ts) return new Date();
  if (typeof ts.toDate === 'function') return ts.toDate();
  if (typeof ts.toMillis === 'function') return new Date(ts.toMillis());
  if (ts instanceof Date) return ts;
  if (typeof ts === 'number') return new Date(ts);
  if (typeof ts === 'string') {
    const d = new Date(ts);
    if (!isNaN(d.getTime())) return d;
  }
  if (typeof ts === 'object' && typeof ts.seconds === 'number') {
    return new Date(ts.seconds * 1000);
  }
  return new Date();
};

export const formatFullDateTime = (ts: any): string => {
  const date = parseFirestoreDate(ts);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatRelativeTime = (ts: any): string => {
  if (!ts) return 'Just now';
  const date = parseFirestoreDate(ts);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (isNaN(diffMs) || diffMs < 0) return 'Just now';
  
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 10) return 'Just now';
  if (diffSecs < 60) return `${diffSecs}s ago`;
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return `Yesterday at ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  if (diffDays < 7) return `${diffDays}d ago (${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })})`;
  return formatFullDateTime(ts);
};

export function useTextEdit(): TextEditContextType {
  const context = useContext(TextEditContext);
  if (!context) {
    throw new Error('useTextEdit must be used within a TextEditProvider');
  }
  return context;
}

// Alias for backwards compatibility
export const useTextEditor = useTextEdit;

interface TextEditProviderProps {
  children: ReactNode;
  onOpenEditModal?: (id: string, label: string, currentValue: string) => void;
}

export function TextEditProvider({ children, onOpenEditModal }: TextEditProviderProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [edits, setEdits] = useState<Record<string, string>>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_EDITS);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });

  const [history, setHistory] = useState<EditHistoryRecord[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [author, setAuthorState] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_AUTHOR) || 'Admin Editor';
  });

  const [activeModalField, setActiveModalField] = useState<{ id: string; label: string; value: string } | null>(null);

  const setAuthor = (name: string) => {
    setAuthorState(name);
    localStorage.setItem(LOCAL_STORAGE_KEY_AUTHOR, name);
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  // 1. Real-time Firebase Firestore listener for active edits map
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const overridesCol = collection(db, 'text_overrides');
      unsubscribe = onSnapshot(overridesCol, (snapshot) => {
        const liveEdits: Record<string, string> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data && typeof data.value === 'string') {
            liveEdits[docSnap.id] = data.value;
          }
        });
        setEdits(liveEdits);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY_EDITS, JSON.stringify(liveEdits));
        } catch (e) {
          console.warn('LocalStorage save failed', e);
        }
      }, (error) => {
        console.warn('Firestore offline/fallback mode for text_overrides:', error.message);
      });
    } catch (err) {
      console.warn('Firebase sync failed, using localStorage fallback', err);
    }

    return () => unsubscribe();
  }, []);

  // 2. Real-time Firebase Firestore listener for history log
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const historyCol = collection(db, 'edit_history');
      
      unsubscribe = onSnapshot(historyCol, (snapshot) => {
        const logs: EditHistoryRecord[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data) {
            logs.push({
              id: docSnap.id,
              fieldId: data.fieldId || docSnap.id,
              fieldLabel: data.fieldLabel || data.fieldId || 'Content Item',
              oldValue: data.oldValue || '',
              newValue: data.newValue || '',
              timestamp: data.timestamp,
              author: data.author || 'Anonymous',
            });
          }
        });

        // Client-side sort by timestamp descending (newest first)
        logs.sort((a, b) => parseFirestoreDate(b.timestamp).getTime() - parseFirestoreDate(a.timestamp).getTime());

        setHistory(logs);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(logs));
        } catch (e) {
          console.warn('LocalStorage save history failed', e);
        }
      }, (error) => {
        console.warn('Firestore offline/fallback mode for edit_history:', error.message);
      });
    } catch (err) {
      console.warn('Firebase history listener error', err);
    }

    return () => unsubscribe();
  }, []);

  // Primary function: saveEdit
  const saveEdit = async (id: string, text: string, label?: string, oldValue?: string) => {
    const rawLabel = label || id;
    const fieldLabel = rawLabel.length > 500 ? rawLabel.slice(0, 500) : rawLabel;
    const currentOldValue = oldValue !== undefined ? oldValue : (edits[id] || '');
    if (text === currentOldValue) return;

    // Local state immediate update
    const updatedEdits = { ...edits, [id]: text };
    setEdits(updatedEdits);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_EDITS, JSON.stringify(updatedEdits));
    } catch (e) {
      console.warn('LocalStorage update failed', e);
    }

    // Firestore Sync
    try {
      const docRef = doc(db, 'text_overrides', id);
      await setDoc(docRef, {
        value: text,
        fieldLabel: fieldLabel,
        lastUpdated: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore setDoc failed, kept in local storage:', err);
    }

    // Write audit trail item
    try {
      const historyCol = collection(db, 'edit_history');
      await addDoc(historyCol, {
        fieldId: id,
        fieldLabel: fieldLabel,
        oldValue: currentOldValue,
        newValue: text,
        author: author || 'Admin Editor',
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore history write failed:', err);
    }
  };

  // Reset a single text override back to default
  const resetEdit = async (id: string) => {
    const updatedEdits = { ...edits };
    delete updatedEdits[id];
    setEdits(updatedEdits);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_EDITS, JSON.stringify(updatedEdits));
    } catch (e) {
      console.warn('LocalStorage error on reset', e);
    }

    try {
      const docRef = doc(db, 'text_overrides', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Firestore deleteDoc failed:', err);
    }
  };

  // Clear all edits back to hardcoded defaults
  const clearAllEdits = async () => {
    setEdits({});
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_EDITS);
    } catch (e) {
      console.warn('LocalStorage clear failed', e);
    }

    try {
      const overridesCol = collection(db, 'text_overrides');
      const snapshot = await getDocs(overridesCol);
      const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, 'text_overrides', d.id)));
      await Promise.all(deletePromises);
    } catch (err) {
      console.warn('Firestore batch clear failed:', err);
    }
  };

  // Export as JSON string
  const exportEditsJSON = (): string => {
    return JSON.stringify(edits, null, 2);
  };

  // Export as TypeScript file code
  const exportEditsTypeScript = (): string => {
    return `// Exported Live Content Edits (${new Date().toISOString()})\nexport const SITE_TEXT_OVERRIDES: Record<string, string> = ${JSON.stringify(edits, null, 2)};\n`;
  };

  // Trigger file download
  const downloadEditsFile = (format: 'json' | 'ts') => {
    const content = format === 'json' ? exportEditsJSON() : exportEditsTypeScript();
    const mime = format === 'json' ? 'application/json' : 'text/typescript';
    const filename = `site_edits_${new Date().toISOString().slice(0, 10)}.${format}`;
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Compatibility aliases
  const updateText = async (id: string, label: string, newValue: string, oldValue: string) => {
    await saveEdit(id, newValue, label, oldValue);
  };

  const restoreVersion = async (fieldId: string, label: string, targetValue: string, currentValue: string) => {
    await saveEdit(fieldId, targetValue, label, currentValue);
  };

  const openEditModal = (id: string, label: string, defaultText: string) => {
    const val = edits[id] !== undefined ? edits[id] : defaultText;
    setActiveModalField({ id, label, value: val });
    if (onOpenEditModal) {
      onOpenEditModal(id, label, val);
    }
  };

  const closeEditModal = () => {
    setActiveModalField(null);
  };

  return (
    <TextEditContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        isEditorMode: isEditMode,
        toggleEditMode,
        edits,
        overrides: edits,
        history,
        author,
        setAuthor,
        saveEdit,
        resetEdit,
        clearAllEdits,
        exportEditsJSON,
        exportEditsTypeScript,
        downloadEditsFile,
        updateText,
        editorName: author,
        setEditorName: setAuthor,
        restoreVersion,
        openEditModal,
        activeModalField,
        closeEditModal,
      }}
    >
      {children}
    </TextEditContext.Provider>
  );
}

// Alias for compatibility
export const TextEditorProvider = TextEditProvider;
