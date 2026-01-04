"use client"

import { Button } from "@/components/ui/button"

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 text-balance">Βάλε τάξη στον υπολογιστή!</h1>

        <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-primary/20">
          <div className="mb-8">
            <div className="text-8xl mb-4">💻</div>
          </div>

          <div className="bg-accent/20 rounded-2xl p-6 md:p-8 mb-8 border-2 border-accent/30">
            <p className="text-xl md:text-3xl font-semibold text-foreground leading-relaxed text-balance">
              Ο υπολογιστής μου είναι μπερδεμένος! Μπορείς να με βοηθήσεις;
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Βοήθησέ με να οργανώσω τα αρχεία και τους φακέλους μου!
          </p>

          <Button
            onClick={onStart}
            size="lg"
            className="text-xl md:text-2xl px-12 py-8 h-auto rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Ας ξεκινήσουμε! 🚀
          </Button>
        </div>
      </div>
    </div>
  )
}
