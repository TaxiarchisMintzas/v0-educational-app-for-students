"use client"

import { useState } from "react"
import IntroScreen from "@/components/intro-screen"
import DragDropActivity from "@/components/drag-drop-activity"
import FolderStructureActivity from "@/components/folder-structure-activity"
import FileSizeActivity from "@/components/file-size-activity"
import CompletionScreen from "@/components/completion-screen"
import TeacherControls from "@/components/teacher-controls"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<"intro" | "dragdrop" | "folder" | "filesize" | "completion">(
    "intro",
  )
  const [totalStars, setTotalStars] = useState(0)
  const [activityStars, setActivityStars] = useState({
    dragdrop: 0,
    folder: 0,
    filesize: 0,
  })

  const resetApp = () => {
    setCurrentScreen("intro")
    setTotalStars(0)
    setActivityStars({ dragdrop: 0, folder: 0, filesize: 0 })
  }

  const handleActivityComplete = (activity: "dragdrop" | "folder" | "filesize", stars: number) => {
    setActivityStars((prev) => ({ ...prev, [activity]: stars }))
    setTotalStars((prev) => prev + stars)

    if (activity === "dragdrop") {
      setCurrentScreen("folder")
    } else if (activity === "folder") {
      setCurrentScreen("filesize")
    } else if (activity === "filesize") {
      setCurrentScreen("completion")
    }
  }

  return (
    <main className="min-h-screen relative">
      <TeacherControls onReset={resetApp} />

      {currentScreen === "intro" && <IntroScreen onStart={() => setCurrentScreen("dragdrop")} />}

      {currentScreen === "dragdrop" && (
        <DragDropActivity onComplete={(stars) => handleActivityComplete("dragdrop", stars)} />
      )}

      {currentScreen === "folder" && (
        <FolderStructureActivity onComplete={(stars) => handleActivityComplete("folder", stars)} />
      )}

      {currentScreen === "filesize" && (
        <FileSizeActivity onComplete={(stars) => handleActivityComplete("filesize", stars)} />
      )}

      {currentScreen === "completion" && <CompletionScreen totalStars={totalStars} onRestart={resetApp} />}
    </main>
  )
}
