import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Instagram, ShoppingCart, Trees, MoreVertical } from 'lucide-react'

// Import the TikTok icon as it's not available in Lucide
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

export default function Page() {
  const profileImage = "/assets/images/profile.jpg";
  
  return (
    <main className="min-h-screen px-4 py-8 content-wrapper">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
            <Image
              src={profileImage}
              alt="Hanna Nate profile photo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            HANNA NATE <Sparkles className="w-4 h-4" />
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Interior designer, Home, Fashion, & Beauty!
          </p>
          
          <div className="flex gap-6 mt-4">
            <a href="#" className="hover:opacity-80 text-black">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:opacity-80 text-black">
              <TikTokIcon />
            </a>
            <a href="#" className="hover:opacity-80 text-black">
              <ShoppingCart className="w-6 h-6" />
            </a>
          </div>
        </div>

        <Card className="mb-4 overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={profileImage}
              alt="Fashion and lifestyle photo of Hanna"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 hover:bg-black/10"
            >
              <MoreVertical className="w-4 h-4 text-white" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          {[
            "Shop my LTK",
            "Instagram",
            "TikTok",
            "Hanna Interiors | INTERIOR DESIGNER"
          ].map((text) => (
            <Button
              key={text}
              variant="secondary"
              className="w-full bg-white/80 hover:bg-white/90 text-black justify-between group relative backdrop-blur-sm"
            >
              <span>{text}</span>
              <MoreVertical className="w-4 h-4 opacity-70" />
            </Button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Trees className="w-4 h-4 mr-2" />
            Join hannanate on Linktree
          </Button>
        </div>
      </div>
    </main>
  )
}

