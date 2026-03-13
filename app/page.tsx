import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Modules } from "@/components/landing/modules"
import { Workflow } from "@/components/landing/workflow"
import { ChatPreview } from "@/components/landing/chat-preview"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Modules />
      <Workflow />
      <ChatPreview />
      <CTA />
      <Footer />
    </main>
  )
}
