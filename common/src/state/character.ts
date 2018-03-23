import { RecordFactory } from "../util/immutableExtras"

interface ICharacter {
  name: string
  type: string
}

const character = RecordFactory<ICharacter>({
  name: "",
  type: ""
})

export class Character extends character implements ICharacter {
  public readonly type: string
  public readonly name: string

  constructor(config: ICharacter) {
    super(config)
  }
}
