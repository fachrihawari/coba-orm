import { Database } from "~/database/Database";

export class Model {
  protected db = Database.getInstance()
  constructor(private table: string) {}
  findAll() {
    const query = this.db.query(`SELECT * FROM ${this.table}`)
    const result = query.all()
    return result
  }
}


