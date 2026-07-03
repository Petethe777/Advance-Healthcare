import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { EditHistoryItem } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface TextEditorContextType {
  isEditorMode: boolean;
  setIsEditorMode: (val: boolean) => void;
  overrides: Record<string, string>;
  history: EditHistoryItem[];
  editorName: string;
  setEditorName: (val: string) => void;
  updateText: (id: string, label: string, newValue: string, oldValue: string) => Promise<void>;
  restoreVersion: (fieldId: string, label: string, targetValue: string, currentValue: string) => Promise<void>;
  openEditModal: (id: string, label: string, defaultText: string) => void;
}

const TextEditorContext = createContext<TextEditorContextType | undefined>(undefined);

export function useTextEditor() {
  const context = useContext(TextEditorContext);
  if (!context) {
    throw new Error('useTextEditor must be used within a TextEditorProvider');
  }
  return context;
}

interface TextEditorProviderProps {
  children: ReactNode;
  onOpenEditModal: (id: string, label: string, currentValue: string) => void;
}

export function TextEditorProvider({ children, onOpenEditModal }: TextEditorProviderProps) {
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<EditHistoryItem[]>([]);
  const [editorName, setEditorNameState] = useState<string>(() => {
    return localStorage.getItem('advance_health_editor_name') || 'Miami Client';
  });

  const setEditorName = (name: string) => {
    setEditorNameState(name);
    localStorage.setItem('advance_health_editor_name', name);
  };

  // Real-time listener for current text overrides
  useEffect(() => {
    const overridesCol = collection(db, 'text_overrides');
    const unsubscribe = onSnapshot(overridesCol, (snapshot) => {
      const newOverrides: Record<string, string> = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data && typeof data.value === 'string') {
          newOverrides[doc.id] = data.value;
        }
      });
      setOverrides(newOverrides);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'text_overrides');
    });

    return () => unsubscribe();
  }, []);

  // Real-time listener for edit history logs (limit to 100 to avoid performance bloat)
  useEffect(() => {
    const historyCol = collection(db, 'edit_history');
    const q = query(historyCol, orderBy('timestamp', 'desc'), limit(100));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newHistory: EditHistoryItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        newHistory.push({
          id: doc.id,
          fieldId: data.fieldId || '',
          fieldLabel: data.fieldLabel || '',
          oldValue: data.oldValue || '',
          newValue: data.newValue || '',
          timestamp: data.timestamp,
          author: data.author || 'Anonymous',
        });
      });
      setHistory(newHistory);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'edit_history');
    });

    return () => unsubscribe();
  }, []);

  // Function to save text override and write to history
  const updateText = async (id: string, label: string, newValue: string, oldValue: string) => {
    if (newValue === oldValue) return; // No change

    try {
      // 1. Update/set current override
      const overrideDocRef = doc(db, 'text_overrides', id);
      await setDoc(overrideDocRef, {
        value: newValue,
        fieldLabel: label,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `text_overrides/${id}`);
    }

    try {
      // 2. Add log to edit_history
      const historyColRef = collection(db, 'edit_history');
      await addDoc(historyColRef, {
        fieldId: id,
        fieldLabel: label,
        oldValue: oldValue,
        newValue: newValue,
        author: editorName,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'edit_history');
    }
  };

  // Function to restore a version from history
  const restoreVersion = async (fieldId: string, label: string, targetValue: string, currentValue: string) => {
    try {
      // 1. Update current override in DB
      const overrideDocRef = doc(db, 'text_overrides', fieldId);
      await setDoc(overrideDocRef, {
        value: targetValue,
        fieldLabel: label,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `text_overrides/${fieldId}`);
    }

    try {
      // 2. Log restoration event
      const historyColRef = collection(db, 'edit_history');
      await addDoc(historyColRef, {
        fieldId: fieldId,
        fieldLabel: label,
        oldValue: currentValue,
        newValue: targetValue,
        author: `${editorName} (Restored)`,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'edit_history');
    }
  };

  const openEditModal = (id: string, label: string, defaultText: string) => {
    // Retrieve latest override value or fall back to default
    const currentValue = overrides[id] !== undefined ? overrides[id] : defaultText;
    onOpenEditModal(id, label, currentValue);
  };

  return (
    <TextEditorContext.Provider value={{
      isEditorMode,
      setIsEditorMode,
      overrides,
      history,
      editorName,
      setEditorName,
      updateText,
      restoreVersion,
      openEditModal
    }}>
      {children}
    </TextEditorContext.Provider>
  );
}
