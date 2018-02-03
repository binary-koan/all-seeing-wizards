import "./game_player.css"

import m from "mithril"
import times from "lodash/times"

import socket from "../util/socket"
import request from "../util/request"
import ConnectionState from "../components/connection_state"
import CardView from "../components/card_view"
import Player from "../concepts/player"

const TEMP_PLAYER_HP = 5;

export default function GamePlayer(vnode) {
  function connectToChannel() {
    vnode.state.socket = socket({
      params: { player_id: m.route.param("player_id") },
      channel: "GameChannel",
      on: {
        hand_updated(data) {
          if (data.player_id.toString() === m.route.param("player_id")) {
            vnode.state.player.updateHand(data.player_cards)
          }
        }
      }
    })
  }

  function oninit() {
    request(`/players/${m.route.param("player_id")}`).then(response => {
      vnode.state.player = new Player(response.player)
      connectToChannel()
    })
  }

  function onremove() {
    if (vnode.state.socket) {
      vnode.state.socket.disconnect()
    }
  }

  function gameStateView() {
    if (vnode.state.player.game.started) {
      return m(".player-game-state", "In Progress - Select actions to take")
    } else {
      return m(".player-game-state", "Waiting for players")
    }
  }

  function placedCardsView() {
    return times(TEMP_PLAYER_HP, index => {
      const playerCard = vnode.state.player.cardPlacedAt(index)

      if (playerCard) {
        return m(CardView, { playerCard })
      } else {
        return m(".player-placed-card")
      }
    })
  }

  function view() {
    if (vnode.state.player) {
      return [
        m(ConnectionState, { socket: vnode.state.socket }),
        m(".player-role", [
          m("p", vnode.state.player.character.name)
        ]),
        m(".player-info", [
          gameStateView(),
          m("h2", "Chosen"),
          m(".player-placed-cards", [
            placedCardsView(),
            m("button", "✓")
          ]),
          m("h2", "In Hand"),
          m(".player-hand", vnode.state.player.hand.map(playerCard =>
            m(CardView, {
              playerCard,
              disabled: playerCard.played_index != null && playerCard.played_index >= 0,
              onclick: () => vnode.state.player.placeCard(playerCard.id)
            })
          ))
        ])
      ]
    } else {
      m("p", "Loading ...")
    }
  }

  return { oninit, onremove, view }
}
