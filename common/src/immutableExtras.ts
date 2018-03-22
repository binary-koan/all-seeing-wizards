import { Record } from "immutable"

interface Constructable<T> {
  new (...args: any[]): T
}

interface StaticallyTypedRecord<T> extends Constructable<T> {
  get<K extends keyof T>(key: K): T[K]
  set<K extends keyof T, V extends T[K]>(key: K, value: V)
  withMutations(cb: (r: StaticallyTypedRecord<T>) => StaticallyTypedRecord<T>)
  setIn<K1 extends keyof T, V extends T[K1]>(keys: [K1], val: V)
  setIn<K1 extends keyof T, K2 extends keyof T[K1], V extends T[K1][K2]>(keys: [K1, K2], val: V)
  setIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    V extends T[K1][K2][K3]
  >(
    keys: [K1, K2, K3],
    val: V
  )
  toJS(): T
}

export const RecordFactory = <T>(seed: T): StaticallyTypedRecord<T> => {
  return (Record(seed) as any) as StaticallyTypedRecord<T>
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
