"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import Image from "next/image"
import { X, Link, Copy, Instagram, ShoppingCart } from 'lucide-react'
import { useState } from "react"

// Import the TikTok icon as it's not available in Lucide
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  username: string
  profileImage: string
}

const socialMedias = [
  { name: 'Copy', icon: Copy, link: '' },
  { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/' },
  { name: 'TikTok', icon: TikTokIcon, link: 'https://www.tiktok.com/@' },
  { name: 'Amazon', icon: ShoppingCart, link: 'https://www.amazon.com/shop/' },
  { name: 'X', icon: '/icons/x-icon.svg', link: 'https://twitter.com/intent/tweet?url=' },
  { name: 'Facebook', icon: '/icons/facebook-icon.svg', link: 'https://www.facebook.com/sharer/sharer.php?u=' },
  { name: 'WhatsApp', icon: '/icons/whatsapp-icon.svg', link: 'https://api.whatsapp.com/send?text=' },
  { name: 'LinkedIn', icon: '/icons/linkedin-icon.svg', link: 'https://www.linkedin.com/sharing/share-offsite/?url=' },
  { name: 'Email', icon: '/icons/email-icon.svg', link: 'mailto:?body=' },
]

export function ShareDialog({ open, onOpenChange, username, profileImage }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://linktr.ee/${username}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    if (platform === 'Copy') {
      handleCopy()
    } else {
      const socialMedia = socialMedias.find(sm => sm.name === platform)
      if (socialMedia) {
        window.open(socialMedia.link + encodeURIComponent(url), '_blank')
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Share Linktree</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="bg-zinc-800 rounded-lg p-4 text-white text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3">
            <Image
              src={profileImage}
              alt={username}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <h2 className="text-xl font-bold mb-1">{username.toUpperCase()}</h2>
          <p className="text-zinc-400">@{username.toLowerCase()}</p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {socialMedias.map((platform) => (
              <Button
                key={platform.name}
                variant="outline"
                size="icon"
                className="h-20 w-20 flex-col space-y-2"
                onClick={() => handleShare(platform.name)}
              >
                {typeof platform.icon === 'string' ? (
                  <Image src={platform.icon} alt={platform.name} width={24} height={24} />
                ) : (
                  platform.icon === TikTokIcon ? (
                    <TikTokIcon />
                  ) : (
                    <platform.icon className="h-6 w-6" />
                  )
                )}
                <span className="text-xs">{platform.name}</span>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Join {username} on Linktree</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get your own free Linktree. The only link in bio trusted by 50M+ people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">Sign up free</Button>
            <Button variant="outline" className="flex-1">
              Find out more
            </Button>
          </div>
        </div>

        <Button variant="link" className="w-full text-muted-foreground mt-4">
          Report Linktree
        </Button>
      </DialogContent>
    </Dialog>
  )
}

