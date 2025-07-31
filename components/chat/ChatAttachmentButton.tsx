'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Paperclip } from 'lucide-react'

interface ChatAttachmentButtonProps {
  onAttach: (files: File[]) => void
  disabled?: boolean
}

export function ChatAttachmentButton({ onAttach, disabled }: ChatAttachmentButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onAttach(files)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
      >
        <Paperclip className="h-4 w-4" />
        <span className="sr-only">Attach files</span>
      </Button>
    </>
  )
}