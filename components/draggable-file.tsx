"use client"

import type React from "react"

interface FileItem {
  id: string
  name: string
  type: string
  icon: string
}

interface DraggableFileProps {
  file: FileItem
  feedback: boolean | null | undefined
}

export default function DraggableFile({ file, feedback }: DraggableFileProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("fileId", file.id)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement
    target.style.opacity = "0.5"
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement
    target.style.opacity = "1"
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`
        bg-card border-4 rounded-2xl p-4 cursor-move touch-none
        hover:scale-105 transition-all shadow-lg
        ${feedback === true ? "border-success bg-success/10" : ""}
        ${feedback === false ? "border-error bg-error/10 animate-shake" : ""}
        ${feedback === null ? "border-primary/30" : ""}
      `}
    >
      <div className="text-5xl mb-2 text-center">{file.icon}</div>
      <p className="text-sm md:text-base font-semibold text-center text-foreground break-words">{file.name}</p>
      {feedback === true && <div className="text-center text-2xl mt-2">✅</div>}
      {feedback === false && <div className="text-center text-2xl mt-2">❌</div>}
    </div>
  )
}
