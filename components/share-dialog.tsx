"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import Image from "next/image"
import { X, Link, Copy } from 'lucide-react'
import { useState } from "react"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  username: string
  profileImage: string
}

const socialMedias = [
  { name: 'Copy', icon: Copy, link: '' },
  { name: 'X', icon: '/icons/x-icon.svg', link: 'https://twitter.com/intent/tweet?url=' },
  { name: 'Facebook', icon: '/icons/facebook-icon.svg', link: 'https://www.facebook.com/sharer/sharer.php?u=' },
  { name: 'WhatsApp', icon: '/icons/whatsapp-icon.svg', link: 'https://api.whatsapp.com/send?text=' },
  { name: 'LinkedIn', icon: '/icons/linkedin-icon.svg', link: 'https://www.linkedin.com/sharing/share-offsite/?url=' },
  { name: 'Messenger', icon: '/icons/messenger-icon.svg', link: 'https://www.facebook.com/dialog/send?link=' },
  { name: 'Snapchat', icon: '/icons/snapchat-icon.svg', link: 'https://www.snapchat.com/scan?attachmentUrl=' },
  { name: 'Email', icon: '/icons/email-icon.svg', link: 'mailto:?body=' },
  { name: 'SMS', icon: '/icons/sms-icon.svg', link: 'sms:?body=' },
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
                  <platform.icon className="h-6 w-6" />
                )}
                <span className="text-xs">{platform.name}</span>
              </Button>
            ))}
          </div>
          <ScrollArea />
        </ScrollArea>

        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Join {username} on Linktree</h3>
          <p className="text-sm text-muted-foreground mb-4">
          Create your free Linktree today
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">Sign up free</Button>
            <Button variant="outline" className="flex-1">
              Find out more
            </Button>
          </div>
        </div>

        <Button variant="link" className="w-full text-muted-foreground mt-4">
        
        </Button>
      </DialogContent>
    </Dialog>
  )
}

