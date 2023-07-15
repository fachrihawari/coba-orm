import { env } from "bun";
import { Database as BunDatabase } from "bun:sqlite";
import { join } from 'node:path'
import { cwd } from "node:process";

export class Database {

  private static instance: BunDatabase | undefined

  static getInstance() {

    if (!Database.instance) {
      const dbPath = join(cwd(), env.DB_PATH)

      console.log("DB Loaded from:", dbPath)

      Database.instance = new BunDatabase(dbPath, { create: true })
    }

    return Database.instance

  }

}
