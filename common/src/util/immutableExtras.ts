import { Record } from "immutable"

type Constructable<T> = new (...args: any[]) => T

interface StaticallyTypedRecord<T> {
  get<K extends keyof T>(key: K): T[K]
  getIn(keys: Array<string | number>): any
  set(key: string, value: any): this
  setIn(keys: Array<string | number>, val: any): this
  toJS(): T
}

// tslint:disable-next-line:variable-name
export const RecordFactory = <T>(seed: T): Constructable<StaticallyTypedRecord<T>> => {
  return (Record(seed) as any) as Constructable<StaticallyTypedRecord<T>>
}

export interface ValueObject {
  equals(other: any): boolean
  hashCode(): number
}
