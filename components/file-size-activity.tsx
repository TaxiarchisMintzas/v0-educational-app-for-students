"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import StarFeedback from "@/components/star-feedback"

interface FileSizeActivityProps {
  onComplete: (stars: number) => void
}

export default function FileSizeActivity({ onComplete }: FileSizeActivityProps) {
  const [currentActivity, setCurrentActivity] = useState(1) // 1, 2, or 3
  const [completedActivities, setCompletedActivities] = useState(0)
  const [totalStars, setTotalStars] = useState(0)

  const handleActivityComplete = (stars: number) => {
    const newTotalStars = totalStars + stars
    setTotalStars(newTotalStars)
    setCompletedActivities((prev) => prev + 1)

    if (currentActivity < 3) {
      setCurrentActivity((prev) => prev + 1)
    } else {
      console.log("[v0] File size activity complete, total stars:", newTotalStars)
      onComplete(newTotalStars)
    }
  }

  return (
    <>
      {currentActivity === 1 && (
        <Activity1 onComplete={handleActivityComplete} progress={`${completedActivities + 1}/3`} />
      )}
      {currentActivity === 2 && (
        <Activity2 onComplete={handleActivityComplete} progress={`${completedActivities + 1}/3`} />
      )}
      {currentActivity === 3 && (
        <Activity3 onComplete={handleActivityComplete} progress={`${completedActivities + 1}/3`} />
      )}
    </>
  )
}

interface ActivityProps {
  onComplete: (stars: number) => void
  progress: string
}

function Activity1({ onComplete, progress }: ActivityProps) {
  const [selectedOrder, setSelectedOrder] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)

  const fileItems = [
    { id: "1", name: "Φωτογραφία.jpg", size: "medium", animal: "🐕", animalName: "Σκύλος (Μεσαίο)" },
    { id: "2", name: "Βίντεο.mp4", size: "large", animal: "🐘", animalName: "Ελέφαντας (Μεγάλο)" },
    { id: "3", name: "Κείμενο.txt", size: "small", animal: "🐜", animalName: "Μυρμήγκι (Μικρό)" },
  ]

  const correctOrder = ["3", "1", "2"]

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
    const stars = 1
    onComplete(stars)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-full text-lg font-bold mb-4">
            {progress}
          </div>
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
              <p className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">Μπράβο! Το βρήκες! 🎉</p>
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
              Συνέχεια! 🎊
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Activity2({ onComplete, progress }: ActivityProps) {
  const [draggedFile, setDraggedFile] = useState<string | null>(null)
  const [placements, setPlacements] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<Record<string, boolean>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [shuffledFiles, setShuffledFiles] = useState<any[]>([])
  const [shuffledUnits, setShuffledUnits] = useState<any[]>([])

  const files = [
    { id: "text", name: "Κείμενο.txt", icon: "📄", correctUnit: "KB" },
    { id: "song", name: "Τραγούδι.mp3", icon: "🎵", correctUnit: "MB" },
    { id: "video", name: "Βίντεο.mp4", icon: "🎬", correctUnit: "GB" },
  ]

  const units = [
    { id: "KB", name: "KB", description: "Kilobyte (Μικρό)" },
    { id: "MB", name: "MB", description: "Megabyte (Μεσαίο)" },
    { id: "GB", name: "GB", description: "Gigabyte (Μεγάλο)" },
  ]

  useEffect(() => {
    const shuffleArray = <T,>(array: T[]): T[] => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    setShuffledFiles(shuffleArray(files))
    setShuffledUnits(shuffleArray(units))
  }, [])

  const handleDragStart = (fileId: string) => {
    setDraggedFile(fileId)
  }

  const handleDrop = (unitId: string) => {
    if (!draggedFile) return

    const file = files.find((f) => f.id === draggedFile)
    if (!file) return

    const isCorrect = file.correctUnit === unitId

    setAttempts((prev) => prev + 1)
    setPlacements((prev) => ({ ...prev, [draggedFile]: unitId }))
    setFeedback((prev) => ({ ...prev, [draggedFile]: isCorrect }))
    setDraggedFile(null)

    // Check if all files are placed correctly
    const newPlacements = { ...placements, [draggedFile]: unitId }
    const allCorrect = files.every((f) => {
      const placement = newPlacements[f.id]
      return placement === f.correctUnit
    })

    if (allCorrect && Object.keys(newPlacements).length === files.length) {
      setIsComplete(true)
    }
  }

  const handleContinue = () => {
    const stars = 1
    onComplete(stars)
  }

  const handleReset = (fileId: string) => {
    const newPlacements = { ...placements }
    delete newPlacements[fileId]
    setPlacements(newPlacements)

    const newFeedback = { ...feedback }
    delete newFeedback[fileId]
    setFeedback(newFeedback)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-full text-lg font-bold mb-4">
            {progress}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 text-balance">
            Ταίριαξε τα αρχεία με τις μονάδες!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Σύρε κάθε αρχείο στη σωστή μονάδα μέτρησης
          </p>
        </div>

        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-primary/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {shuffledFiles.map((file) => {
              const isPlaced = placements[file.id]
              const isCorrectPlacement = feedback[file.id]

              return (
                <div
                  key={file.id}
                  draggable={!isPlaced || isCorrectPlacement === false}
                  onDragStart={() => handleDragStart(file.id)}
                  className={`
                    bg-gradient-to-br from-accent/20 to-accent/10 
                    border-4 rounded-3xl p-8 text-center cursor-move
                    hover:scale-105 transition-all shadow-xl
                    ${isPlaced ? "opacity-50" : "border-accent/40"}
                    ${isCorrectPlacement === true ? "border-success ring-4 ring-success/30" : ""}
                    ${isCorrectPlacement === false ? "border-error ring-4 ring-error/30" : ""}
                  `}
                >
                  <div className="text-7xl mb-4">{file.icon}</div>
                  <p className="text-xl font-bold text-foreground">{file.name}</p>
                  {isCorrectPlacement === true && <div className="mt-4 text-3xl">✔️</div>}
                  {isCorrectPlacement === false && (
                    <div className="mt-4">
                      <div className="text-3xl mb-2">❌</div>
                      <Button onClick={() => handleReset(file.id)} variant="outline" size="sm" className="rounded-xl">
                        Δοκίμασε ξανά
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shuffledUnits.map((unit) => (
              <div
                key={unit.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(unit.id)}
                className="bg-secondary/20 border-4 border-dashed border-secondary rounded-3xl p-8 text-center min-h-[200px] flex flex-col items-center justify-center hover:bg-secondary/30 transition-all"
              >
                <p className="text-4xl font-bold text-primary mb-2">{unit.name}</p>
                <p className="text-lg text-muted-foreground">{unit.description}</p>
              </div>
            ))}
          </div>

          {isComplete && (
            <div className="bg-success/10 border-4 border-success rounded-2xl p-6 mt-8">
              <p className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">Τέλεια! Όλα σωστά! 🎉</p>
              <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
                Τα κείμενα είναι KB, τα τραγούδια MB και τα βίντεο GB!
              </p>
            </div>
          )}
        </div>

        <StarFeedback correctCount={isComplete ? 1 : 0} total={1} />

        {isComplete && (
          <div className="text-center">
            <Button
              onClick={handleContinue}
              size="lg"
              className="text-xl md:text-2xl px-12 py-8 h-auto rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Συνέχεια! 🎊
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Activity3({ onComplete, progress }: ActivityProps) {
  const [selectedOrder, setSelectedOrder] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [shuffledUnits, setShuffledUnits] = useState<any[]>([])

  const units = [
    { id: "KB", name: "KB", description: "Kilobyte" },
    { id: "MB", name: "MB", description: "Megabyte" },
    { id: "GB", name: "GB", description: "Gigabyte" },
  ]

  const correctOrder = ["KB", "MB", "GB"]

  useEffect(() => {
    const shuffleArray = <T,>(array: T[]): T[] => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    setShuffledUnits(shuffleArray(units))
  }, [])

  const handleUnitClick = (unitId: string) => {
    if (isCorrect !== null) return

    if (selectedOrder.includes(unitId)) {
      setSelectedOrder(selectedOrder.filter((id) => id !== unitId))
    } else if (selectedOrder.length < 3) {
      setSelectedOrder([...selectedOrder, unitId])
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
    const stars = 1
    onComplete(stars)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-full text-lg font-bold mb-4">
            {progress}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 text-balance">Βάλε τις μονάδες σε σειρά!</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Ποια μονάδα είναι η μικρότερη και ποια η μεγαλύτερη;
          </p>
        </div>

        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-primary/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {shuffledUnits.map((unit) => {
              const orderNumber = selectedOrder.indexOf(unit.id) + 1
              return (
                <button
                  key={unit.id}
                  onClick={() => handleUnitClick(unit.id)}
                  disabled={isCorrect !== null}
                  className={`
                    relative bg-gradient-to-br from-secondary/30 to-secondary/10 
                    border-4 rounded-3xl p-12 
                    hover:scale-105 transition-all shadow-xl
                    ${selectedOrder.includes(unit.id) ? "border-primary ring-4 ring-primary/30" : "border-secondary/40"}
                    ${isCorrect === false && selectedOrder.includes(unit.id) ? "border-error ring-error/30" : ""}
                    ${isCorrect === true && selectedOrder.includes(unit.id) ? "border-success ring-success/30" : ""}
                  `}
                >
                  {orderNumber > 0 && (
                    <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      {orderNumber}
                    </div>
                  )}
                  <p className="text-6xl font-bold text-primary mb-3">{unit.name}</p>
                  <p className="text-xl text-muted-foreground">{unit.description}</p>
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
                Προσπάθησε ξανά! Θυμήσου: Kilo είναι χίλια, Mega είναι εκατομμύριο, Giga είναι δισεκατομμύριο! 🤔
              </p>
            </div>
          )}

          {isCorrect === true && (
            <div className="bg-success/10 border-4 border-success rounded-2xl p-6">
              <p className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
                Εξαιρετικά! Σωστή σειρά! 🎉
              </p>
              <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
                KB είναι η μικρότερη μονάδα, μετά το MB, και το GB είναι η μεγαλύτερη!
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
