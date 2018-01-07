import "./home.css"

import m from "mithril"
import request from "../util/request"

export default function Home(vnode) {
  function createGame() {
    request("/games", { method: "POST" }).then(response => {
      m.route.set(`/games/${response.game.id}/host/${response.host.id}`)
    }).catch(e => {
      vnode.state.error = e.message
    })
  }

  function joinGame() {
    const gameId = prompt("Game ID")
    request(`/games/${gameId}/sessions`, { method: "POST" }).then(response => {
      m.route.set(`/games/${response.player.game_id}/play/${response.player.id}`)
    }).catch(e => {
      vnode.state.error = e.message
    })
  }

  function view() {
    if (vnode.state.error) {
      return [
        m("p", "Uh oh, an unexpected error occurred. Reload the page and try again?"),
        m("p", `Details: ${vnode.state.error}`)
      ]
    } else {
      return m(".home-buttons", [
        m("img.logo", { alt: "All-Seeing Wizards", src: "logo.svg" }),
        m("button", { onclick: createGame }, "Create Game"),
        m("button", { onclick: joinGame }, "Join Game")
      ])
    }
  }

  return { view }
}
