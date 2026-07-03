import React from 'react';
import { useTextEditor } from '../context/TextEditorContext';
import { Edit2 } from 'lucide-react';

interface EditableTextProps {
  id: string;
  defaultText: string;
  label: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'a';
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export default function EditableText({
  id,
  defaultText,
  label,
  className = '',
  as: Tag = 'span',
  onClick,
  ...props
}: EditableTextProps) {
  const { isEditorMode, overrides, openEditModal } = useTextEditor();
  
  // Use overridden text if it exists, otherwise fall back to defaultText
  const text = overrides[id] !== undefined ? overrides[id] : defaultText;

  if (!isEditorMode) {
    return (
      <Tag className={className} onClick={onClick} {...props}>
        {text}
      </Tag>
    );
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openEditModal(id, label, defaultText);
  };

  return (
    <Tag
      className={`${className} relative group cursor-pointer border border-dashed border-teal-500/30 hover:border-teal-500 hover:bg-teal-500/5 transition-all duration-200 rounded px-1 -mx-1 inline-block`}
      onClick={handleEditClick}
      title={`Click to edit: ${label}`}
      {...props}
    >
      <span>{text}</span>
      <span className="absolute -top-3 -right-2.5 bg-teal-600 text-white p-1 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform duration-200 z-20 pointer-events-none">
        <Edit2 className="w-2.5 h-2.5" />
      </span>
    </Tag>
  );
}
