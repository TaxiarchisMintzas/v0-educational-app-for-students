"use client"

import type React from "react"

import { useState } from "react"

interface DropZoneProps {
  type: string
  label: string
  icon: string
  onDrop: (fileId: string, folderType: string) => void
  droppedCount: number
}

export default function DropZone({ type, label, icon, onDrop, droppedCount }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const fileId = e.dataTransfer.getData("fileId")
    if (fileId) {
      onDrop(fileId, type)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        bg-gradient-to-br from-accent/20 to-accent/10 
        border-4 border-dashed rounded-3xl p-6 md:p-8 
        min-h-[200px] md:min-h-[250px]
        flex flex-col items-center justify-center
        transition-all shadow-xl
        ${isDragOver ? "border-primary bg-primary/20 scale-105" : "border-accent/40"}
      `}
    >
      <div className="text-6xl md:text-7xl mb-4">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{label}</h3>
      {droppedCount > 0 && (
        <div className="bg-success text-white rounded-full px-4 py-2 font-bold text-lg mt-2">{droppedCount} ✓</div>
      )}
    </div>
  )
}
