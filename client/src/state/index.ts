import { applyMiddleware, createStore } from "redux"
import io from "socket.io-client"

import reducer from "./reducer"
import socketReceiver from "./socketReceiver"
import socketSender from "./socketSender"

const socket = io("http://localhost:3000")

const sender = socketSender(socket)
const receiver = socketReceiver(socket)

const store = createStore(reducer, applyMiddleware(sender))
receiver.subscribe(store.dispatch)

export default store
