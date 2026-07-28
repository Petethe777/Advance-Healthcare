import React, { useRef, useState, useEffect } from 'react';
import { useTextEdit } from '../context/TextEditContext';
import { Edit2, Check, X } from 'lucide-react';

export interface EditableTextProps {
  id: string;
  defaultText?: string;
  children?: React.ReactNode;
  label?: string;
  fieldLabel?: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'button' | 'a';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'button' | 'a';
  onClick?: (e: React.MouseEvent) => void;
  multiline?: boolean;
}

export default function EditableText({
  id,
  defaultText,
  children,
  label,
  fieldLabel,
  className = '',
  element,
  as,
  onClick,
  multiline = false,
  ...props
}: EditableTextProps) {
  const { isEditMode, edits, saveEdit, openEditModal } = useTextEdit();
  
  // Resolve default text string from children or defaultText prop
  const fallbackText = typeof children === 'string' ? children : (defaultText || '');
  const currentText = edits[id] !== undefined ? edits[id] : fallbackText;
  const itemLabel = label || fieldLabel || id;

  const Tag = (element || as || 'span') as React.ElementType;

  const [isEditingInline, setIsEditingInline] = useState(false);
  const [draftText, setDraftText] = useState(currentText);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraftText(currentText);
  }, [currentText]);

  useEffect(() => {
    if (isEditingInline && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditingInline]);

  if (!isEditMode) {
    return (
      <Tag className={className} onClick={onClick} {...props}>
        {currentText}
      </Tag>
    );
  }

  const handleStartInlineEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditingInline(true);
  };

  const handleCommitEdit = async () => {
    setIsEditingInline(false);
    const trimmed = draftText.trim();
    if (trimmed !== currentText) {
      await saveEdit(id, trimmed, itemLabel, currentText);
    }
  };

  const handleCancelEdit = () => {
    setDraftText(currentText);
    setIsEditingInline(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (!multiline || e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleCommitEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  if (isEditingInline) {
    const EditTag = (Tag === 'button' || Tag === 'a' ? 'span' : Tag) as React.ElementType;

    return (
      <EditTag
        className={`${className} relative inline-flex items-center gap-2 z-30 border-2 border-emerald-500 bg-white/95 text-slate-900 rounded-lg p-1.5 shadow-2xl ring-4 ring-emerald-500/20 max-w-full`}
        style={{
          fontSize: 'inherit',
          fontFamily: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
        }}
      >
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onBlur={handleCommitEdit}
            onKeyDown={handleKeyDown}
            className="w-full min-w-[200px] min-h-[70px] bg-transparent text-slate-900 focus:outline-none resize-y p-1"
            style={{
              fontSize: 'inherit',
              fontFamily: 'inherit',
              fontWeight: 'inherit',
              lineHeight: 'inherit',
              letterSpacing: 'inherit',
            }}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onBlur={handleCommitEdit}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-slate-900 focus:outline-none min-w-[120px] px-1"
            style={{
              fontSize: 'inherit',
              fontFamily: 'inherit',
              fontWeight: 'inherit',
              lineHeight: 'inherit',
              letterSpacing: 'inherit',
            }}
          />
        )}
        <span className="inline-flex items-center gap-1 shrink-0">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleCommitEdit}
            className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow cursor-pointer transition-colors"
            title="Save (Enter)"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleCancelEdit}
            className="p-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md shadow cursor-pointer transition-colors"
            title="Cancel (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      </EditTag>
    );
  }

  return (
    <Tag
      className={`${className} relative group cursor-pointer border border-dashed border-emerald-500/60 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-200 rounded px-1 -mx-1 inline-block`}
      onClick={handleStartInlineEdit}
      onDoubleClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openEditModal(id, itemLabel, currentText);
      }}
      title={`Click to edit inline | Double click for modal editor: ${itemLabel}`}
      {...props}
    >
      <span>{currentText}</span>
      <span className="absolute -top-2.5 -right-2 bg-emerald-600 text-white p-1 rounded-full shadow-md scale-90 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 z-20 pointer-events-none">
        <Edit2 className="w-2.5 h-2.5" />
      </span>
    </Tag>
  );
}
