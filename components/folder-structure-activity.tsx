"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import StarFeedback from "@/components/star-feedback"

interface FolderStructureActivityProps {
  onComplete: (stars: number) => void
}

export default function FolderStructureActivity({ onComplete }: FolderStructureActivityProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const handleFolderClick = (folder: string) => {
    setSelectedFolder(folder)
    const correct = folder === "Πληροφορική"
    setIsCorrect(correct)
    setAttempts((prev) => prev + 1)

    if (!correct) {
      setTimeout(() => {
        setSelectedFolder(null)
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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 text-balance">
            Κατανόησε τη δομή των φακέλων!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Σε ποιον φάκελο θα βάλουμε το αρχείο «εργασία.doc»;
          </p>
        </div>

        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-primary/20 mb-8">
          <div className="mb-8 text-center">
            <div className="inline-block bg-accent/20 rounded-2xl px-6 py-4 border-2 border-accent/40">
              <div className="text-5xl mb-2">📄</div>
              <p className="text-xl font-bold text-foreground">εργασία.doc</p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📁</div>
              <div className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleFolderClick("Σχολείο")}
                  disabled={isCorrect === true}
                  className={`w-full text-xl md:text-2xl h-auto py-6 rounded-2xl font-bold border-4 ${
                    selectedFolder === "Σχολείο" && isCorrect === false
                      ? "border-error bg-error/10"
                      : "border-primary/30 hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  Σχολείο
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 ml-8 md:ml-16">
              <div className="text-3xl">📁</div>
              <div className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleFolderClick("Μαθήματα")}
                  disabled={isCorrect === true}
                  className={`w-full text-xl md:text-2xl h-auto py-6 rounded-2xl font-bold border-4 ${
                    selectedFolder === "Μαθήματα" && isCorrect === false
                      ? "border-error bg-error/10"
                      : "border-primary/30 hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  Μαθήματα
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 ml-16 md:ml-32">
              <div className="text-3xl">📁</div>
              <div className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleFolderClick("Πληροφορική")}
                  disabled={isCorrect === true}
                  className={`w-full text-xl md:text-2xl h-auto py-6 rounded-2xl font-bold border-4 ${
                    selectedFolder === "Πληροφορική" && isCorrect === true
                      ? "border-success bg-success/10"
                      : "border-primary/30 hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  Πληροφορική
                </Button>
              </div>
            </div>
          </div>

          {isCorrect === false && (
            <div className="bg-error/10 border-4 border-error rounded-2xl p-6 mb-6">
              <p className="text-xl md:text-2xl font-bold text-center text-foreground">
                Προσπάθησε ξανά! Κοίτα προσεκτικά τη δομή των φακέλων. 🤔
              </p>
            </div>
          )}

          {isCorrect === true && (
            <div className="bg-success/10 border-4 border-success rounded-2xl p-6 mb-6">
              <p className="text-2xl md:text-3xl font-bold text-center text-foreground">
                Μπράβο! Βρήκες το σωστό φάκελο! 🎉
              </p>
              <p className="text-lg md:text-xl text-center text-muted-foreground mt-4 leading-relaxed">
                Η εργασία ανήκει στο μάθημα της Πληροφορικής, που βρίσκεται μέσα στον φάκελο Μαθήματα, που είναι μέσα
                στον φάκελο Σχολείο!
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
              Συνέχεια στην επόμενη δραστηριότητα! →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
