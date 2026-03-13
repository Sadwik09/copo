"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ChevronRight, 
  Send,
  Bot,
  User,
  Sparkles,
  MessageSquare,
  Lightbulb,
  HelpCircle,
  BarChart3,
  Target,
  Loader2,
  RefreshCw,
  Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  { icon: <Target className="h-4 w-4" />, text: "What is the overall CO attainment for CS301?" },
  { icon: <BarChart3 className="h-4 w-4" />, text: "Explain the CO-PO mapping process" },
  { icon: <Lightbulb className="h-4 w-4" />, text: "How can I improve low CO attainment?" },
  { icon: <HelpCircle className="h-4 w-4" />, text: "What is Bloom's Taxonomy?" },
]

const mockResponses: Record<string, string> = {
  "attainment": "Based on the current data, the overall CO attainment for CS301 (Data Structures and Algorithms) is **77.18%**. Here's the breakdown:\n\n- CO1: 78.5% (Above threshold)\n- CO2: 82.3% (Above threshold)\n- CO3: 65.2% (Below threshold)\n- CO4: 71.8% (Above threshold)\n- CO5: 88.1% (Above threshold)\n- CO6: 74.6% (Above threshold)\n\n**Recommendation:** CO3 needs attention. Consider reviewing the teaching methodology for topics mapped to CO3 or providing additional practice problems.",
  "mapping": "The **CO-PO mapping process** involves establishing relationships between Course Outcomes (COs) and Program Outcomes (POs). Here's how it works:\n\n1. **Identify COs**: Define specific, measurable learning outcomes for each course.\n\n2. **Map to POs**: For each CO, determine which POs it addresses using a correlation scale:\n   - 3 = High correlation\n   - 2 = Medium correlation\n   - 1 = Low correlation\n   - 0 = No correlation\n\n3. **Calculate Attainment**: PO attainment is computed using the formula:\n   `PO Attainment = Σ(CO Attainment × Correlation Level) / Σ(Correlation Levels)`\n\nThis ensures that each PO's attainment reflects the weighted contribution of all mapped COs.",
  "improve": "Here are strategies to **improve low CO attainment**:\n\n1. **Identify Root Causes**\n   - Analyze question-wise performance\n   - Review Bloom's level distribution\n   - Check if teaching aligns with CO expectations\n\n2. **Teaching Interventions**\n   - Provide additional tutorials on weak topics\n   - Use varied teaching methods (visual, practical)\n   - Increase practice problems and assessments\n\n3. **Assessment Improvements**\n   - Ensure question clarity and proper CO mapping\n   - Balance Bloom's levels appropriately\n   - Consider formative assessments\n\n4. **Student Support**\n   - Identify struggling students early\n   - Provide remedial sessions\n   - Encourage peer learning",
  "bloom": "**Bloom's Taxonomy** is a hierarchical classification of cognitive learning levels:\n\n1. **Remember (L1)** - Recall facts and basic concepts\n   - Keywords: define, list, name, recall\n\n2. **Understand (L2)** - Explain ideas or concepts\n   - Keywords: describe, explain, summarize\n\n3. **Apply (L3)** - Use information in new situations\n   - Keywords: apply, demonstrate, solve\n\n4. **Analyze (L4)** - Draw connections among ideas\n   - Keywords: analyze, compare, examine\n\n5. **Evaluate (L5)** - Justify decisions or course of action\n   - Keywords: evaluate, argue, critique\n\n6. **Create (L6)** - Produce new or original work\n   - Keywords: design, create, develop\n\nIn OBE, questions are mapped to these levels to ensure balanced assessment coverage.",
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your OBE Assistant. I can help you with:\n\n- Understanding CO, PO, and PSO attainment\n- Explaining OBE concepts and calculations\n- Providing recommendations for improvement\n- Answering questions about Bloom's Taxonomy\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    if (lowerQuestion.includes("attainment") && lowerQuestion.includes("cs301")) {
      return mockResponses.attainment
    }
    if (lowerQuestion.includes("mapping") || lowerQuestion.includes("co-po")) {
      return mockResponses.mapping
    }
    if (lowerQuestion.includes("improve") || lowerQuestion.includes("low")) {
      return mockResponses.improve
    }
    if (lowerQuestion.includes("bloom")) {
      return mockResponses.bloom
    }
    return "I understand you're asking about OBE concepts. Could you please provide more specific details about what you'd like to know? I can help with:\n\n- Course Outcome (CO) attainment calculations\n- Program Outcome (PO) mapping and analysis\n- Bloom's Taxonomy and question classification\n- Improvement recommendations based on attainment data"
  }

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const response = generateResponse(inputValue)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleSuggestionClick = (text: string) => {
    setInputValue(text)
  }

  const clearChat = () => {
    setMessages([{
      id: "1",
      role: "assistant",
      content: "Hello! I'm your OBE Assistant. I can help you with:\n\n- Understanding CO, PO, and PSO attainment\n- Explaining OBE concepts and calculations\n- Providing recommendations for improvement\n- Answering questions about Bloom's Taxonomy\n\nHow can I assist you today?",
      timestamp: new Date()
    }])
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <div className="relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">AI Assistant</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">OBE AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Get help with OBE concepts and attainment analysis</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={clearChat} className="rounded-xl gap-2">
              <Trash2 className="h-4 w-4" />
              Clear Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col px-6 pb-6 min-h-0">
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Messages */}
          <div className="flex-1 flex flex-col rounded-2xl border bg-card overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                    message.role === "assistant" 
                      ? "bg-primary/10" 
                      : "bg-muted"
                  )}>
                    {message.role === "assistant" 
                      ? <Bot className="h-5 w-5 text-primary" />
                      : <User className="h-5 w-5 text-muted-foreground" />
                    }
                  </div>
                  <div className={cn(
                    "flex-1 max-w-[80%]",
                    message.role === "user" && "text-right"
                  )}>
                    <div className={cn(
                      "inline-block p-4 rounded-2xl",
                      message.role === "assistant" 
                        ? "bg-muted/50 text-left" 
                        : "bg-primary text-primary-foreground text-left"
                    )}>
                      <div className="prose prose-sm max-w-none">
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={cn(
                            "mb-2 last:mb-0",
                            message.role === "user" && "text-primary-foreground"
                          )}>
                            {line.startsWith('**') && line.endsWith('**') 
                              ? <strong>{line.slice(2, -2)}</strong>
                              : line.includes('**') 
                                ? line.split('**').map((part, j) => 
                                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                  )
                                : line
                            }
                          </p>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 p-4 rounded-2xl bg-muted/50">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 p-4 border-t bg-muted/30">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-3"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about OBE, attainment, or any concept..."
                  className="flex-1 rounded-xl bg-background"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="rounded-xl gap-2 px-6"
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 space-y-4 hidden xl:block">
            {/* Suggested Questions */}
            <div className="p-4 rounded-2xl border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Suggested Questions</h3>
              </div>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question.text)}
                    className="w-full p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left text-sm flex items-start gap-3"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0">
                      {question.icon}
                    </div>
                    <span className="text-muted-foreground">{question.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="p-4 rounded-2xl border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold">Quick Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Ask about specific courses by mentioning their code
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Request explanations for OBE concepts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Get improvement suggestions based on data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Learn about Bloom's Taxonomy levels
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
