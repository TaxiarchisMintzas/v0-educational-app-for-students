"use client"

import { Button } from "@/components/ui/button"

interface CompletionScreenProps {
  totalStars: number
  onRestart: () => void
}

export default function CompletionScreen({ totalStars, onRestart }: CompletionScreenProps) {
  const maxStars = 9

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-success/20 via-secondary/20 to-accent/20">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="text-8xl mb-4 animate-bounce">🎉</div>

        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 text-balance">Συγχαρητήρια!</h1>

        <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-success">
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-relaxed text-balance">
            Οργάνωσες τέλεια τον υπολογιστή!
          </p>

          <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl p-8 mb-8 border-2 border-accent/30">
            <p className="text-xl md:text-2xl font-semibold text-muted-foreground mb-4">Κέρδισες:</p>
            <div className="flex justify-center gap-2 text-5xl mb-4">
              {Array.from({ length: maxStars }).map((_, i) => (
                <span key={i}>{i < totalStars ? "⭐" : "☆"}</span>
              ))}
            </div>
            <p className="text-3xl font-bold text-primary">
              {totalStars} / {maxStars} Αστέρια!
            </p>
          </div>

          <div className="space-y-4 text-left bg-secondary/20 rounded-2xl p-6 mb-8">
            <p className="text-lg md:text-xl leading-relaxed">✅ Έμαθες να οργανώνεις αρχεία σε φακέλους</p>
            <p className="text-lg md:text-xl leading-relaxed">✅ Κατανόησες τη δομή των φακέλων</p>
            <p className="text-lg md:text-xl leading-relaxed">✅ Έμαθες για τα μεγέθη αρχείων</p>
          </div>

          <Button
            onClick={onRestart}
            size="lg"
            className="text-xl md:text-2xl px-12 py-8 h-auto rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Ξεκίνα ξανά! 🔄
          </Button>
        </div>
      </div>
    </div>
  )
}
