import { env } from 'bun'
import { Database as BunDatabase } from 'bun:sqlite'

export class Database {
  private static instance: BunDatabase | undefined

  static getInstance() {
    if (!Database.instance) {
      const dbName = (env.NODE_ENV || 'development') + '.sqlite'
      const dbPath = './database/' + dbName
      Database.instance = new BunDatabase(dbPath, { create: true })
    }

    return Database.instance
  }
}
