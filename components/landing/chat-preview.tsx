"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Bot, User, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const demoConversation = [
  {
    role: "user",
    content: "Show CO attainment for Database Management Systems",
  },
  {
    role: "assistant",
    content: "Here's the CO attainment for DBMS (CS302):\n\n• CO1: 68% (Level 2) - Understand database concepts\n• CO2: 74% (Level 3) - Apply SQL queries\n• CO3: 71% (Level 2) - Design ER diagrams\n• CO4: 82% (Level 3) - Evaluate normalization\n\nOverall course attainment: 73.75%",
  },
  {
    role: "user",
    content: "Which CO needs improvement?",
  },
  {
    role: "assistant",
    content: "CO1 (Understanding database concepts) has the lowest attainment at 68%.\n\nRecommendations:\n1. Add more conceptual questions in formative assessments\n2. Include visual learning materials for theoretical topics\n3. Conduct remedial sessions on DBMS fundamentals",
  },
]

export function ChatPreview() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (visibleMessages < demoConversation.length) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages((prev) => prev + 1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [visibleMessages])

  return (
    <section className="relative py-32 overflow-hidden bg-muted/20">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                AI Assistant
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              Ask Anything About{" "}
              <span className="text-primary">Your Data</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground text-pretty max-w-xl mx-auto lg:mx-0">
              Our AI chatbot understands natural language queries. Ask about attainment levels, 
              get recommendations, generate reports, and more — all through simple conversation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-background border border-border">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Available 24/7</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-background border border-border">
                <Bot className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Powered by LangChain</span>
              </div>
            </div>
          </div>

          {/* Chat Interface Preview */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-50" />
              
              {/* Chat window */}
              <div className="relative bg-background rounded-2xl border border-border shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-foreground">EduAttain Assistant</span>
                    <span className="block text-xs text-muted-foreground">Always ready to help</span>
                  </div>
                  <div className="ml-auto flex h-2 w-2 rounded-full bg-green-500" />
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-5 flex flex-col gap-4">
                  {demoConversation.slice(0, visibleMessages).map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        )}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex gap-3 animate-in fade-in duration-200">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border bg-muted/30">
                  <div className="flex items-center gap-3 rounded-xl bg-background border border-border px-4 py-3">
                    <input
                      type="text"
                      placeholder="Ask about your OBE data..."
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      disabled
                    />
                    <Button size="sm" className="h-8 w-8 p-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
