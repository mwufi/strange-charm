'use client'

import { useState, useEffect } from 'react'
import { Theme, Box, Container } from '@radix-ui/themes'
import BlurredBackground from '@/components/BlurredBackground'
import { ChatInput } from '@/components/chat/ChatInput'

export default function Home() {
  const [bgSettings, setBgSettings] = useState({
    pattern: 'waves' as 'waves' | 'circles' | 'gradient',
    color: '#3B82F6',
    opacity: 0.3
  })
  const [attachmentPosition, setAttachmentPosition] = useState<'top' | 'bottom'>('top')

  useEffect(() => {
    const settings = localStorage.getItem('backgroundSettings')
    if (settings) {
      setBgSettings(JSON.parse(settings))
    }
  }, [])

  const handleSubmit = (message: string, options?: any) => {
    console.log('Message:', message)
    console.log('Options:', options)
  }

  return (
    <Theme>
      <BlurredBackground {...bgSettings} />
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <Container size="3" className="w-full max-w-4xl">
          <Box className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-800">
              Ask anything...
            </h1>
          </Box>
          <ChatInput 
            onSubmit={handleSubmit}
            placeholder="Ask anything..."
            className="w-full"
            attachmentPosition={attachmentPosition}
          />
        </Container>
      </div>
    </Theme>
  )
}