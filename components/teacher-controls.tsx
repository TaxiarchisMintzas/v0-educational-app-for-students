"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TeacherControlsProps {
  onReset: () => void
}

export default function TeacherControls({ onReset }: TeacherControlsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleReset = () => {
    onReset()
    setShowConfirm(false)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="sm"
          className="bg-muted/80 backdrop-blur-sm border-2 hover:bg-muted"
        >
          👨‍🏫 Λειτουργία Δασκάλου
        </Button>
      )}

      {isOpen && (
        <div className="bg-card border-4 border-primary/20 rounded-2xl p-4 shadow-2xl min-w-[250px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Έλεγχος Δασκάλου</h3>
            <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm" className="h-8 w-8 p-0">
              ✕
            </Button>
          </div>

          {!showConfirm ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Η λειτουργία δασκάλου επιτρέπει την επαναφορά της εφαρμογής στην αρχή για νέο μαθητή.
              </p>
              <Button onClick={() => setShowConfirm(true)} variant="outline" className="w-full border-2">
                🔄 Επαναφορά Εφαρμογής
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Είστε σίγουροι; Όλη η πρόοδος θα χαθεί.</p>
              <div className="flex gap-2">
                <Button
                  onClick={handleReset}
                  size="sm"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold border-2 border-red-700"
                >
                  Ναι
                </Button>
                <Button
                  onClick={() => setShowConfirm(false)}
                  size="sm"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-700"
                >
                  Όχι
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
