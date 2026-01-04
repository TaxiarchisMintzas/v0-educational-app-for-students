interface StarFeedbackProps {
  correctCount: number
  total: number
}

export default function StarFeedback({ correctCount, total }: StarFeedbackProps) {
  const percentage = (correctCount / total) * 100
  let stars = 0

  if (percentage === 100) stars = 3
  else if (percentage >= 66) stars = 2
  else if (percentage >= 33) stars = 1

  return (
    <div className="text-center mb-8">
      <div className="inline-block bg-accent/20 rounded-2xl px-8 py-4 border-2 border-accent/30">
        <p className="text-lg md:text-xl font-semibold text-muted-foreground mb-2">
          Πρόοδος: {correctCount} / {total}
        </p>
        <div className="flex justify-center gap-2 text-4xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i}>{i < stars ? "⭐" : "☆"}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
