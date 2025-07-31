'use client'

import { useState, useEffect } from 'react'
import { Theme, Select, Slider, Container, Box, Text, Heading, Button } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import BlurredBackground from '@/components/BlurredBackground'

export default function DevPage() {
  const [pattern, setPattern] = useState<'waves' | 'circles' | 'gradient'>('waves')
  const [color, setColor] = useState('#3B82F6')
  const [opacity, setOpacity] = useState(0.3)
  const [savedSettings, setSavedSettings] = useState({})

  useEffect(() => {
    const settings = localStorage.getItem('backgroundSettings')
    if (settings) {
      const parsed = JSON.parse(settings)
      setPattern(parsed.pattern || 'waves')
      setColor(parsed.color || '#3B82F6')
      setOpacity(parsed.opacity || 0.3)
      setSavedSettings(parsed)
    }
  }, [])

  const saveSettings = () => {
    const settings = { pattern, color, opacity }
    localStorage.setItem('backgroundSettings', JSON.stringify(settings))
    setSavedSettings(settings)
    alert('Settings saved! Refresh the home page to see changes.')
  }

  return (
    <Theme>
      <BlurredBackground pattern={pattern} color={color} opacity={opacity} />
      <div className="relative min-h-screen p-8">
        <Container size="2">
          <Box className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <Heading size="6" className="mb-6">Background Settings</Heading>
            
            <div className="space-y-6">
              <div>
                <Text as="label" size="2" weight="bold" className="block mb-2">
                  Pattern Type
                </Text>
                <Select.Root value={pattern} onValueChange={(value) => setPattern(value as any)}>
                  <Select.Trigger className="w-full" />
                  <Select.Content>
                    <Select.Item value="waves">Waves</Select.Item>
                    <Select.Item value="circles">Circles</Select.Item>
                    <Select.Item value="gradient">Gradient</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>

              <div>
                <Text as="label" size="2" weight="bold" className="block mb-2">
                  Color
                </Text>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 cursor-pointer rounded"
                />
              </div>

              <div>
                <Text as="label" size="2" weight="bold" className="block mb-2">
                  Opacity: {opacity.toFixed(2)}
                </Text>
                <Slider
                  value={[opacity]}
                  onValueChange={([value]) => setOpacity(value)}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div className="pt-4">
                <Button size="3" onClick={saveSettings} className="w-full">
                  Save Settings
                </Button>
              </div>

              {Object.keys(savedSettings).length > 0 && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <Text size="2" weight="bold">Current Saved Settings:</Text>
                  <pre className="text-sm mt-2">{JSON.stringify(savedSettings, null, 2)}</pre>
                </div>
              )}
            </div>
          </Box>
        </Container>
      </div>
    </Theme>
  )
}