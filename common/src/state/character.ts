import { RecordFactory } from "../util/immutableExtras"

interface ICharacter {
  id: string
  name: string
  type: string
}

const character = RecordFactory<ICharacter>({
  id: "",
  name: "",
  type: ""
})

export class Character extends character implements ICharacter {
  public readonly id: string
  public readonly type: string
  public readonly name: string

  constructor(config: ICharacter) {
    super(config)
  }
}
