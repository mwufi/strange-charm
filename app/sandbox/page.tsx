'use client'

import { useState } from 'react'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { AgentCard } from '@/components/chat/AgentCard'
import { ToolUse } from '@/components/chat/ToolUse'
import { ReasoningChain } from '@/components/chat/ReasoningStep'
import BlurredBackground from '@/components/BlurredBackground'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const reasoningSteps = [
  { type: 'thinking' as const, content: 'Analyzing the user\'s request for book recommendations...' },
  { type: 'analysis' as const, content: 'The user is interested in historical transformation and system changes. I should search for books that cover revolutionary movements and societal shifts.' },
  { type: 'thinking' as const, content: 'Considering different historical periods and geographical regions to provide diverse perspectives...' },
  { type: 'conclusion' as const, content: 'I\'ll search for books about the Meiji Restoration, Civil War technology, and revolutionary movements to give a comprehensive view.' }
]

export default function SandboxPage() {
  const [agentStatus, setAgentStatus] = useState<'waiting' | 'thinking' | 'searching' | 'completed' | 'error'>('searching')
  const [toolStatus, setToolStatus] = useState<'pending' | 'running' | 'completed' | 'error'>('running')
  const [activeReasoningStep, setActiveReasoningStep] = useState(1)
  const [showReasoning, setShowReasoning] = useState(true)
  const [showToolUse, setShowToolUse] = useState(true)
  const [showAgentCards, setShowAgentCards] = useState(true)

  const bgSettings = {
    pattern: 'circles' as const,
    color: '#6366F1',
    opacity: 0.15
  }

  return (
    <div className="relative min-h-screen">
      <BlurredBackground {...bgSettings} />
      
      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Assistant Components Sandbox</h1>
          <p className="text-muted-foreground">
            Explore different visual components for AI assistants
          </p>
        </div>

        <div className="mb-6 p-4 bg-background/95 backdrop-blur rounded-lg border">
          <h2 className="text-lg font-semibold mb-3">Debug Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="reasoning"
                checked={showReasoning}
                onChange={(e) => setShowReasoning(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="reasoning" className="text-sm">Show Reasoning Steps</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="tools"
                checked={showToolUse}
                onChange={(e) => setShowToolUse(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="tools" className="text-sm">Show Tool Use</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agents"
                checked={showAgentCards}
                onChange={(e) => setShowAgentCards(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="agents" className="text-sm">Show Agent Cards</label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Agent Status</label>
              <Select value={agentStatus} onValueChange={(value: any) => setAgentStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="thinking">Thinking</SelectItem>
                  <SelectItem value="searching">Searching</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Tool Status</label>
              <Select value={toolStatus} onValueChange={(value: any) => setToolStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Active Reasoning Step</label>
              <Select value={activeReasoningStep.toString()} onValueChange={(value) => setActiveReasoningStep(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Step 1</SelectItem>
                  <SelectItem value="1">Step 2</SelectItem>
                  <SelectItem value="2">Step 3</SelectItem>
                  <SelectItem value="3">Step 4</SelectItem>
                  <SelectItem value="-1">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="combined" className="w-full">
          <TabsList>
            <TabsTrigger value="combined">Combined View</TabsTrigger>
            <TabsTrigger value="agents">Agent Cards</TabsTrigger>
            <TabsTrigger value="tools">Tool Use</TabsTrigger>
            <TabsTrigger value="reasoning">Reasoning</TabsTrigger>
          </TabsList>

          <TabsContent value="combined" className="space-y-4 mt-6">
            <div className="bg-background/95 backdrop-blur rounded-lg border overflow-hidden">
              <ChatMessage
                role="user"
                content="Find me the best books about historical transformations and system changes"
              />
              
              <div className="border-t">
                <ChatMessage
                  role="assistant"
                  content="I'll help you find books about historical transformations and system changes. Let me search for recommendations across different areas."
                />
              </div>

              {showReasoning && (
                <div className="px-6 py-4 border-t bg-muted/20">
                  <h3 className="text-sm font-medium mb-3">Reasoning Process</h3>
                  <ReasoningChain 
                    steps={reasoningSteps}
                    activeStep={activeReasoningStep}
                  />
                </div>
              )}

              {showAgentCards && (
                <div className="p-4 space-y-3 border-t">
                  <AgentCard
                    agentName="Historical Scholar"
                    status={agentStatus}
                    description="Searching for books about revolutionary movements and system changes"
                    progress={65}
                    searchQueries={[
                      "best books Meiji restoration Japan modernization history",
                      "civil war military technology innovation books history",
                      "books like Korea Impossible Country hidden history"
                    ]}
                    results={agentStatus === 'completed' ? "Found 15 highly relevant books across different historical periods and regions, including works on the Meiji Restoration, technological innovations during wars, and hidden histories of system changes." : undefined}
                  />
                </div>
              )}

              {showToolUse && (
                <div className="p-4 space-y-3 border-t">
                  <ToolUse
                    toolName="web_search"
                    status={toolStatus}
                    parameters={{
                      query: "best books Meiji restoration Japan modernization history",
                      num_results: 10
                    }}
                    result={toolStatus === 'completed' ? "1. 'The Making of Modern Japan' by Marius B. Jansen\n2. 'Emperor of Japan: Meiji and His World' by Donald Keene\n3. 'The Meiji Restoration' by W.G. Beasley" : undefined}
                    error={toolStatus === 'error' ? "Search API rate limit exceeded" : undefined}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="agents" className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold mb-3">Agent Card Examples</h3>
            
            <AgentCard
              agentName="Research Assistant"
              status="waiting"
              description="Ready to search for academic papers"
            />
            
            <AgentCard
              agentName="Code Analyzer"
              status="thinking"
              description="Analyzing repository structure and dependencies"
              progress={30}
            />
            
            <AgentCard
              agentName="Data Scientist"
              status="searching"
              description="Gathering datasets for analysis"
              progress={75}
              searchQueries={[
                "climate change temperature data 2020-2024",
                "global CO2 emissions by country dataset",
                "renewable energy adoption statistics"
              ]}
            />
            
            <AgentCard
              agentName="Market Analyst"
              status="completed"
              description="Completed market research analysis"
              results="Identified 3 key market trends: 1) Shift towards sustainable products, 2) Increased demand for AI solutions, 3) Growing interest in remote work tools"
            />
            
            <AgentCard
              agentName="Security Auditor"
              status="error"
              description="Failed to complete security scan"
              results="Error: Unable to access repository due to authentication failure"
            />
          </TabsContent>

          <TabsContent value="tools" className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold mb-3">Tool Use Examples</h3>
            
            <ToolUse
              toolName="code_interpreter"
              status="pending"
              parameters={{
                code: "import pandas as pd\ndf = pd.read_csv('data.csv')",
                language: "python"
              }}
            />
            
            <ToolUse
              toolName="web_search"
              status="running"
              parameters={{
                query: "latest AI developments 2024",
                num_results: 5
              }}
            />
            
            <ToolUse
              toolName="file_reader"
              status="completed"
              parameters={{
                path: "/documents/report.pdf",
                page_range: "1-5"
              }}
              result="Successfully extracted text from pages 1-5. The report discusses quarterly financial results with a 15% increase in revenue..."
            />
            
            <ToolUse
              toolName="database_query"
              status="error"
              parameters={{
                query: "SELECT * FROM users WHERE created_at > '2024-01-01'",
                database: "analytics"
              }}
              error="Connection timeout: Unable to reach database server"
            />
          </TabsContent>

          <TabsContent value="reasoning" className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Reasoning Chain Example</h3>
            
            <div className="bg-background/95 backdrop-blur rounded-lg border p-6">
              <ReasoningChain 
                steps={[
                  { type: 'thinking', content: 'Understanding the user\'s request for data analysis...' },
                  { type: 'analysis', content: 'The dataset contains 10,000 rows with 15 features. I need to check for missing values and outliers.' },
                  { type: 'warning', content: 'Found 234 missing values in the "income" column that need to be handled.' },
                  { type: 'thinking', content: 'Considering different imputation strategies: mean, median, or forward fill...' },
                  { type: 'analysis', content: 'Given the skewed distribution of income data, median imputation would be most appropriate.' },
                  { type: 'conclusion', content: 'Proceeded with median imputation and removed 12 extreme outliers. The cleaned dataset is now ready for analysis.' }
                ]}
                activeStep={activeReasoningStep}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}