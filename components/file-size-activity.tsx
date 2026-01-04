"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import StarFeedback from "@/components/star-feedback"

interface FileItem {
  id: string
  name: string
  size: "small" | "medium" | "large"
  animal: string
  animalName: string
}

const fileItems: FileItem[] = [
  { id: "1", name: "Φωτογραφία.jpg", size: "medium", animal: "🐕", animalName: "Σκύλος" },
  { id: "2", name: "Βίντεο.mp4", size: "large", animal: "🐘", animalName: "Ελέφαντας" },
  { id: "3", name: "Κείμενο.txt", size: "small", animal: "🐜", animalName: "Μυρμήγκι" },
]

interface FileSizeActivityProps {
  onComplete: (stars: number) => void
}

export default function FileSizeActivity({ onComplete }: FileSizeActivityProps) {
  const [selectedOrder, setSelectedOrder] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const correctOrder = ["3", "1", "2"] // small, medium, large

  const handleFileClick = (fileId: string) => {
    if (isCorrect !== null) return

    if (selectedOrder.includes(fileId)) {
      setSelectedOrder(selectedOrder.filter((id) => id !== fileId))
    } else if (selectedOrder.length < 3) {
      setSelectedOrder([...selectedOrder, fileId])
    }
  }

  const handleCheck = () => {
    const correct = JSON.stringify(selectedOrder) === JSON.stringify(correctOrder)
    setIsCorrect(correct)
    setAttempts((prev) => prev + 1)

    if (!correct) {
      setTimeout(() => {
        setSelectedOrder([])
        setIsCorrect(null)
      }, 2000)
    }
  }

  const handleContinue = () => {
    const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1
    onComplete(stars)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 text-balance">
            Κατανόησε τα μεγέθη αρχείων!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Βάλε τα αρχεία σε σειρά από το μικρότερο στο μεγαλύτερο
          </p>
        </div>

        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-primary/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {fileItems.map((file) => {
              const orderNumber = selectedOrder.indexOf(file.id) + 1
              return (
                <button
                  key={file.id}
                  onClick={() => handleFileClick(file.id)}
                  disabled={isCorrect !== null}
                  className={`
                    relative bg-gradient-to-br from-accent/20 to-accent/10 
                    border-4 rounded-3xl p-8 
                    hover:scale-105 transition-all shadow-xl
                    ${selectedOrder.includes(file.id) ? "border-primary ring-4 ring-primary/30" : "border-accent/40"}
                    ${isCorrect === false && selectedOrder.includes(file.id) ? "border-error ring-error/30" : ""}
                    ${isCorrect === true && selectedOrder.includes(file.id) ? "border-success ring-success/30" : ""}
                  `}
                >
                  {orderNumber > 0 && (
                    <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      {orderNumber}
                    </div>
                  )}
                  <div className="text-7xl mb-4">{file.animal}</div>
                  <p className="text-xl font-bold text-foreground mb-2">{file.animalName}</p>
                  <div className="bg-card rounded-xl p-3 mt-4">
                    <p className="text-sm md:text-base font-semibold text-muted-foreground">{file.name}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {selectedOrder.length === 3 && isCorrect === null && (
            <div className="text-center">
              <Button
                onClick={handleCheck}
                size="lg"
                className="text-xl md:text-2xl px-12 py-6 h-auto rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Έλεγχος απάντησης
              </Button>
            </div>
          )}

          {isCorrect === false && (
            <div className="bg-error/10 border-4 border-error rounded-2xl p-6">
              <p className="text-xl md:text-2xl font-bold text-center text-foreground">
                Προσπάθησε ξανά! Σκέψου: ποιο ζώο είναι το μικρότερο; 🤔
              </p>
            </div>
          )}

          {isCorrect === true && (
            <div className="bg-success/10 border-4 border-success rounded-2xl p-6">
              <p className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">Τέλεια! Σωστή σειρά! 🎉</p>
              <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
                Τα αρχεία κειμένου είναι μικρά (μυρμήγκι), οι εικόνες μεσαίες (σκύλος) και τα βίντεο μεγάλα (ελέφαντας)!
              </p>
            </div>
          )}
        </div>

        <StarFeedback correctCount={isCorrect ? 1 : 0} total={1} />

        {isCorrect && (
          <div className="text-center">
            <Button
              onClick={handleContinue}
              size="lg"
              className="text-xl md:text-2xl px-12 py-8 h-auto rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Ολοκλήρωση! 🎊
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
