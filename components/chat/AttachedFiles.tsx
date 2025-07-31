'use client'

import { X, FileText, FileSpreadsheet, FileImage, File, FileCode, FileVideo, FileAudio, FileArchive } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AttachedFile {
  id: string
  file: File
}

interface AttachedFilesProps {
  files: AttachedFile[]
  onRemove: (id: string) => void
  position?: 'top' | 'bottom'
  className?: string
}

export function AttachedFiles({ 
  files, 
  onRemove, 
  position = 'bottom',
  className 
}: AttachedFilesProps) {
  if (files.length === 0) return null

  return (
    <div 
      className={cn(
        "w-full flex flex-row gap-2 px-3 whitespace-nowrap flex-wrap",
        "will-change-[mask-image]",
        "[mask-image:linear-gradient(to_right,transparent_0,black_8px,black_calc(100%-40px),transparent_100%)]",
        "@sm:[mask-image:none]",
        position === 'top' ? 'mt-3 mb-1' : 'mb-2 mt-1',
        className
      )}
    >
      {files.map((item) => (
        <FileChip
          key={item.id}
          file={item.file}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </div>
  )
}

interface FileChipProps {
  file: File
  onRemove: () => void
}

function FileChip({ file, onRemove }: FileChipProps) {
  const { icon: Icon, color } = getFileIcon(file)

  return (
    <div
      className={cn(
        "flex flex-row items-center text-sm transition-all ease-in-out gap-2",
        "relative group/chip cursor-pointer",
        "bg-muted/50 border border-border",
        "hover:bg-muted/80",
        "px-3 pr-1.5 rounded-xl h-12",
        "max-w-full"
      )}
    >
      <figure 
        className={cn(
          "grid aspect-square place-items-center",
          "bg-no-repeat bg-center shrink-0",
          "-ms-3 w-12 h-12"
        )}
      >
        <Icon className={cn("h-4 w-4", color)} />
      </figure>
      
      <span className="truncate max-w-[200px] sm:max-w-[250px] me-auto">
        {file.name}
      </span>
      
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        className={cn(
          "inline-flex items-center justify-center",
          "h-6 w-6 rounded-full ml-1 p-0.5 flex-shrink-0",
          "text-muted-foreground hover:text-foreground",
          "hover:bg-background/50",
          "transition-colors duration-100"
        )}
        type="button"
        aria-label="Remove file"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function getFileIcon(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || ''
  const mimeType = file.type.toLowerCase()

  // Excel/Spreadsheet files
  if (mimeType.includes('spreadsheet') || 
      ['xlsx', 'xls', 'csv', 'ods'].includes(extension)) {
    return { icon: FileSpreadsheet, color: 'text-green-600' }
  }

  // Image files
  if (mimeType.startsWith('image/') || 
      ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'].includes(extension)) {
    return { icon: FileImage, color: 'text-blue-600' }
  }

  // Video files
  if (mimeType.startsWith('video/') || 
      ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'].includes(extension)) {
    return { icon: FileVideo, color: 'text-purple-600' }
  }

  // Audio files
  if (mimeType.startsWith('audio/') || 
      ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a'].includes(extension)) {
    return { icon: FileAudio, color: 'text-pink-600' }
  }

  // Code files
  if (['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'swift', 'kt', 'scala', 'r', 'dart', 'lua', 'pl', 'sql', 'sh', 'ps1', 'yaml', 'yml', 'json', 'xml', 'html', 'css', 'scss', 'sass', 'less'].includes(extension)) {
    return { icon: FileCode, color: 'text-indigo-600' }
  }

  // Archive files
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'].includes(extension)) {
    return { icon: FileArchive, color: 'text-yellow-600' }
  }

  // Text/Document files
  if (mimeType.includes('text') || mimeType.includes('document') ||
      ['doc', 'docx', 'txt', 'pdf', 'md', 'rtf', 'odt'].includes(extension)) {
    return { icon: FileText, color: 'text-orange-600' }
  }

  // Default file icon
  return { icon: File, color: 'text-gray-600' }
}