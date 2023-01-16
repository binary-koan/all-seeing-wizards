import React, { useState } from "react"
import HelpButtons from "./HelpButtons"
import BackButton from "./home/BackButton"
import GameTitle from "./home/GameTitle"
import HomeLayout from "./home/HomeLayout"
import HostForm from "./home/HostForm"
import JoinForm from "./home/JoinForm"
import JoinHostOptions from "./home/JoinHostOptions"
import RejoinMessage from "./home/RejoinMessage"

// Very rudimentary check if this is a small screen
const IS_MOBILE = Math.min(window.innerWidth, window.innerHeight) < 600

export default function Home() {
  const [showingForm, setShowingForm] = useState<"host" | "join">()

  return (
    <HomeLayout banner={<RejoinMessage />}>
      {(IS_MOBILE || !showingForm) && <GameTitle />}

      {showingForm && <BackButton onClick={() => setShowingForm(undefined)}>Back</BackButton>}
      {!showingForm && !IS_MOBILE && (
        <JoinHostOptions
          onHost={() => setShowingForm("host")}
          onJoin={() => setShowingForm("join")}
        />
      )}

      {showingForm === "host" && <HostForm />}
      {(IS_MOBILE || showingForm === "join") && <JoinForm />}

      <HelpButtons />
    </HomeLayout>
  )
}
