import { applyMiddleware, createStore } from "redux"
import io from "socket.io-client"

import applyStateChange from "../actions/applyStateChange"

import socketReceiver from "./socketReceiver"
import socketSender from "./socketSender"

const socket = io("http://localhost:3000")

const sender = socketSender(socket)
const receiver = socketReceiver(socket)

const store = createStore(applyStateChange, applyMiddleware(sender))
receiver.subscribe(store.dispatch)

export default store
