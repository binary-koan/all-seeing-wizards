import React from "react"
import BackButton from "./home/BackButton"
import GameTitle from "./home/GameTitle"
import HomeLayout from "./home/HomeLayout"
import HostForm from "./home/HostForm"
import JoinForm from "./home/JoinForm"
import JoinHostOptions from "./home/JoinHostOptions"
import RejoinMessage from "./home/RejoinMessage"

const IS_MOBILE = Math.min(window.innerWidth, window.innerHeight) < 600

export default class extends React.Component<{}, { showingForm: "host" | "join" }> {
  constructor(props: {}) {
    super(props)

    this.state = {
      showingForm: undefined
    }
  }

  public render() {
    return (
      <HomeLayout banner={<RejoinMessage />}>
        {this.gameTitle()}
        {this.backButton()}
        {this.joinHostOptions()}
        {this.hostForm()}
        {this.joinForm()}
      </HomeLayout>
    )
  }

  private gameTitle() {
    if (IS_MOBILE || !this.state.showingForm) {
      return <GameTitle />
    }
  }

  private backButton() {
    if (this.state.showingForm) {
      return <BackButton onClick={() => this.showForm(undefined)}>Back</BackButton>
    }
  }

  private joinHostOptions() {
    if (!this.state.showingForm && !IS_MOBILE) {
      return (
        <JoinHostOptions
          onHost={() => this.showForm("host")}
          onJoin={() => this.showForm("join")}
        />
      )
    }
  }

  private hostForm() {
    if (this.state.showingForm === "host") {
      return <HostForm />
    }
  }

  private joinForm() {
    if (IS_MOBILE || this.state.showingForm === "join") {
      return <JoinForm />
    }
  }

  private showForm(form: "host" | "join") {
    this.setState({ showingForm: form })
  }
}
