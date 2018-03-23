import { Record } from "immutable"

interface Constructable<T> {
  new (...args: any[]): T
}

interface StaticallyTypedRecord<T> {
  get<K extends keyof T>(key: K): T[K]
  getIn(keys: Array<string | number>): any
  set(key: string, value: any): this
  setIn(keys: Array<string | number>, val: any): this
  toJS(): T
}

export const RecordFactory = <T>(seed: T): Constructable<StaticallyTypedRecord<T>> => {
  return (Record(seed) as any) as Constructable<StaticallyTypedRecord<T>>
}

export interface ValueObject {
  equals(other: any): boolean
  hashCode(): number
}

// A subset of the ImmutableJS API which makes sense for game objects (which, for example, shouldn't have keys deleted)
// A (possibly) unfortunate side effect of this is the need for buildXXX functions which force-convert fromJS calls to the right interface
export interface ImmutableStateOperations<T> {
  set(key: string, value: any): this
  setIn(key: Iterable<string>, value: any): this
  update(key: string, updater: (value: any) => any): this
  updateIn(key: Iterable<string>, updater: (value: any) => any): this
}

export type ImmutableGameObject<T> = Readonly<T> & ImmutableStateOperations<T>
