declare module "mongo-unit" {
  export interface MongoUnitOptions {
    /** preferable mongo db port, default: 27017 */
    port?: number

    /** name of test db, default: test */
    dbName?: string

    /** db path, default: <node_modules/mongo-unit>\.mongo-unit */
    dbpath?: string

    /** enable debug informaton for mongodb-prebuilt, default: false */
    verbose?: boolean
  }

  /**
   * It starts mongod on one of available port and returns Promise with URL to connect to this db
   * opts is optional params, you can specify some command line params for mongod
   * (more about it in documentation for mongodb-prebuilt)
   */
  export function start(opts?: MongoUnitOptions): Promise<string>

  /**
   * It stops mongod process
   */
  export function stop(): undefined

  /**
   * Syncronius API returns URL to connect to test db, if test DB is not started it thows an Exception
   */
  export function getUrl(): string

  /**
   * Inserts given data (like below) DB collections, returns Promise.
   */
  export function load(data: any): Promise<undefined>

  /**
   * Clear collections based on given data (data format is the same), returns Promise.
   */
  export function clear(data: any): Promise<undefined>

  /**
   * Drops test DB, returns Promise.
   */
  export function drop(): Promise<undefined>

  /**
   * helper function, load db data into mongo (url)
   */
  export function initDb(url: string, data: any): Promise<undefined>

  /**
   * helper function, clear all db data from mongo (url)
   */
  export function dropDb(url: string): Promise<undefined>
}
