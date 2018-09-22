import { List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { CardEffect } from "./cardEffect"

interface ICard {
  id: string
  name: string
  tagline?: string
  effects: List<CardEffect>
}

const card = RecordFactory<ICard>({
  id: "",
  name: "",
  effects: List()
})

export class Card extends card implements ICard {
  public readonly id: string
  public readonly name: string
  public readonly tagline: string
  public readonly effects: List<CardEffect>

  constructor(config: ICard) {
    super(config)
  }
}
