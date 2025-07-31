'use client'

import { useState, useEffect } from 'react'
import { Theme, Box, Container } from '@radix-ui/themes'
import BlurredBackground from '@/components/BlurredBackground'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [query, setQuery] = useState('')
  const [bgSettings, setBgSettings] = useState({
    pattern: 'waves' as 'waves' | 'circles' | 'gradient',
    color: '#3B82F6',
    opacity: 0.3
  })

  useEffect(() => {
    const settings = localStorage.getItem('backgroundSettings')
    if (settings) {
      setBgSettings(JSON.parse(settings))
    }
  }, [])

  return (
    <Theme>
      <BlurredBackground {...bgSettings} />
      <div className="relative min-h-screen flex items-center justify-center">
        <Container size="1" className="px-4">
          <Box className="text-center">
            <h1 className="text-4xl font-semibold mb-8 text-gray-800">
              Ask anything...
            </h1>
            <div className="max-w-2xl mx-auto">
              <Input placeholder="Ask anything..." />
            </div>
          </Box>
        </Container>
      </div>
    </Theme>
  )
}