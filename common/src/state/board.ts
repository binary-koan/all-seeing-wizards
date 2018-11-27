import { List } from "immutable"
import { RecordFactory } from "../util/immutableExtras"
import { BoardObject } from "./boardObject"
import { BoardTile } from "./boardTile"
import { BoardZone } from "./boardZone"
import { DirectionalPoint } from "./directionalPoint"
import { Point } from "./point"

interface IBoard {
  tiles: List<BoardTile>
  objects: List<BoardObject>
  zones: List<BoardZone>
  hauntingZoneIndexes: List<number>
  hauntedZoneIndexes: List<number>
}

const board = RecordFactory<IBoard>({
  tiles: List(),
  objects: List(),
  zones: List(),
  hauntingZoneIndexes: List(),
  hauntedZoneIndexes: List()
})

export class Board extends board implements IBoard {
  public readonly tiles: List<BoardTile>
  public readonly objects: List<BoardObject>
  public readonly zones: List<BoardZone>
  public readonly hauntingZoneIndexes: List<number>
  public readonly hauntedZoneIndexes: List<number>

  private _width: number
  private _height: number

  constructor(config: IBoard) {
    super(config)
  }

  public tileAt(point: Point | DirectionalPoint) {
    return this.tiles.find(tile => tile.position.x === point.x && tile.position.y === point.y)
  }

  public get width(): number {
    return (this._width = this._width || this.tiles.maxBy(tile => tile.position.x).position.x + 1)
  }

  public get height(): number {
    return (this._height = this._height || this.tiles.maxBy(tile => tile.position.y).position.y + 1)
  }

  public get hauntingZones() {
    return this.zones.filter((_, index) => this.hauntingZoneIndexes.includes(index))
  }

  public get hauntedZones() {
    return this.zones.filter((_, index) => this.hauntedZoneIndexes.includes(index))
  }

  public setHauntingZones(zones: List<BoardZone>) {
    return this.set("hauntingZoneIndexes", zones.map(zone => this.zones.indexOf(zone)))
  }

  public setHauntedZones(zones: List<BoardZone>) {
    return this.set("hauntedZoneIndexes", zones.map(zone => this.zones.indexOf(zone)))
  }

  public get zonesAnticlockwise(): List<BoardZone> {
    const topZones = this.zones.filter(zone => zone.y === 0).sortBy(zone => -zone.x)
    const bottomZones = this.zones.filter(zone => zone.y > 0).sortBy(zone => zone.x)

    return topZones.concat(bottomZones).toList()
  }
}
