import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ProductsPreview } from "@/components/sections/services-preview"
import { AboutPreview } from "@/components/sections/about-preview"
import { ClientsSection } from "@/components/sections/clients-section"
import { PartnersTicker } from "@/components/sections/partners-ticker"
import { NewsTicker } from "@/components/sections/news-ticker"

export default function HomePage() {
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main>
        <HeroSection />
        <ProductsPreview />
        <PartnersTicker />
        <AboutPreview />
        <ClientsSection />
        <NewsTicker />
      </main>
      <Footer />
    </div>
  )
}
