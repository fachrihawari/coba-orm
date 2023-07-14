import { Database as BunDatabase } from "bun:sqlite";
import { join } from "node:path";

export class Database {
  private static instance: BunDatabase | undefined
  static getInstance() {
    if (!Database.instance) {
      const dbPath = join(import.meta.dir, "..", "database", "restaurants.sqlite")
      console.log("DB Loaded from:", dbPath)
      Database.instance = new BunDatabase(dbPath, { create: true })
    }
    return Database.instance
  }
} 
