"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import StarFeedback from "@/components/star-feedback"
import DraggableFile from "@/components/draggable-file"
import DropZone from "@/components/drop-zone"

interface FileItem {
  id: string
  name: string
  type: "image" | "document" | "music" | "video"
  icon: string
}

const files: FileItem[] = [
  { id: "1", name: "Φωτογραφία.jpg", type: "image", icon: "🖼️" },
  { id: "2", name: "Εργασία.doc", type: "document", icon: "📄" },
  { id: "3", name: "Τραγούδι.mp3", type: "music", icon: "🎵" },
  { id: "4", name: "Βίντεο.mp4", type: "video", icon: "🎬" },
  { id: "5", name: "Εικόνα2.png", type: "image", icon: "🖼️" },
  { id: "6", name: "Κείμενο.txt", type: "document", icon: "📄" },
]

interface DragDropActivityProps {
  onComplete: (stars: number) => void
}

export default function DragDropActivity({ onComplete }: DragDropActivityProps) {
  const [droppedFiles, setDroppedFiles] = useState<Record<string, string[]>>({
    image: [],
    document: [],
    music: [],
    video: [],
  })
  const [feedback, setFeedback] = useState<Record<string, boolean | null>>({})
  const [availableFiles, setAvailableFiles] = useState<FileItem[]>([])

  useEffect(() => {
    const shuffleArray = <T,>(array: T[]): T[] => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }
    setAvailableFiles(shuffleArray(files))
  }, [])

  const handleDrop = (fileId: string, folderType: string) => {
    const file = availableFiles.find((f) => f.id === fileId)
    if (!file) return

    const isCorrect = file.type === folderType
    setFeedback((prev) => ({ ...prev, [fileId]: isCorrect }))

    if (isCorrect) {
      setDroppedFiles((prev) => ({
        ...prev,
        [folderType]: [...prev[folderType], fileId],
      }))
      setAvailableFiles((prev) => prev.filter((f) => f.id !== fileId))
    }
  }

  const correctCount = Object.values(droppedFiles).flat().length
  const allCorrect = correctCount === files.length

  const handleFinish = () => {
    const stars = correctCount >= 6 ? 3 : correctCount >= 4 ? 2 : 1
    onComplete(stars)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 text-balance">
            Βάλε κάθε αρχείο στον σωστό φάκελο!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">Σύρε τα αρχεία στους φακέλους που ταιριάζουν</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <DropZone
            type="image"
            label="Εικόνες"
            icon="🖼️"
            onDrop={handleDrop}
            droppedCount={droppedFiles.image.length}
          />
          <DropZone
            type="document"
            label="Έγγραφα"
            icon="📄"
            onDrop={handleDrop}
            droppedCount={droppedFiles.document.length}
          />
          <DropZone
            type="music"
            label="Μουσική"
            icon="🎵"
            onDrop={handleDrop}
            droppedCount={droppedFiles.music.length}
          />
          <DropZone
            type="video"
            label="Βίντεο"
            icon="🎬"
            onDrop={handleDrop}
            droppedCount={droppedFiles.video.length}
          />
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-xl border-2 border-primary/20 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Αρχεία προς οργάνωση:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {availableFiles.map((file) => (
              <DraggableFile key={file.id} file={file} feedback={feedback[file.id]} />
            ))}
          </div>
          {availableFiles.length === 0 && (
            <p className="text-center text-2xl text-success font-bold py-8">Μπράβο! Όλα τα αρχεία οργανώθηκαν! 🎉</p>
          )}
        </div>

        <StarFeedback correctCount={correctCount} total={files.length} />

        {allCorrect && (
          <div className="text-center">
            <Button
              onClick={handleFinish}
              size="lg"
              className="text-xl md:text-2xl px-12 py-8 h-auto rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Συνέχεια στην επόμενη δραστηριότητα! →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
