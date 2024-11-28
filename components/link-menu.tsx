"use client"

import { Button } from "@/components/ui/button"
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { ShareDialog } from './share-dialog'

interface LinkMenuProps {
  username?: string
  profileImage?: string
}

export function LinkMenu({ username = "Hana Mengesha", profileImage = "/placeholder.svg" }: LinkMenuProps) {
  const [showShareDialog, setShowShareDialog] = useState(false)

  return (
    <>
      <Button
        className="absolute top-2 right-2 hover:bg-white/10"
        onClick={() => setShowShareDialog(true)}
      >
        <MoreHorizontal className="w-4 h-4" />
        <span className="sr-only">Share</span>
      </Button>

      <ShareDialog 
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        username={username}
        profileImage={profileImage}
      />
    </>
  )
}

