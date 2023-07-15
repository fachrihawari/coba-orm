import { Database } from "~/database/Database";

type Options = {
  where?: string
}

type FindOptions = {
  includeAttrs?: string[],
  excludeAttrs?: string[],
} & Options

type DeleteOptions = Options

export class Model<T extends Object> {

  protected db = Database.getInstance()

  protected table: string = ""

  protected attributes: string[] = []

  /**
   * Build attributes want to retrive
   */
  private buildAttributes(options: FindOptions) {
    let attributes = [...this.attributes]

    if (options.includeAttrs) {
      attributes = [...options.includeAttrs]
    }

    if (options.excludeAttrs) {
      const excludeAttrs = [...options.excludeAttrs]
      attributes = attributes.filter(c => !excludeAttrs.includes(c))
    }

    return attributes
  }

  /**
   * Build where clause
   */
  private buildConditions(options: FindOptions) {
    return options.where ? ' where ' + options.where : ''
  }

  /**
   * Log executed query
   */
  private log(query: string) {
    console.log("SQL Query:", query)
  }

  /**
   * Build default find
   */
  private find(options: FindOptions = {}) {
    const attributes = this.buildAttributes(options)

    let sqlQuery = `SELECT ${attributes.join(', ')} FROM ${this.table}`

    sqlQuery += this.buildConditions(options)

    const statement = this.db.query(sqlQuery)

    this.log(statement.toString())

    return statement
  }

  /**
   * Retrive all data
   */
  findAll(options: FindOptions = {}) {
    const statement = this.find(options)

    return statement.all() as T[]
  }

  /**
   * Retrive single data
   */
  findOne(options: FindOptions = {}) {
    const statement = this.find(options)

    return statement.get() as T
  }

  /**
   * Retrive single data by id
   */
  findById(id: number | string, options: FindOptions = {}) {
    const findOptions = { ...options, where: `id = ${id}` }

    return this.findOne(findOptions)
  }

  /**
   * Create a record
   */
  create(record: T) {
    const insertedAttributes = Object.keys(record)
    const insertedValues = Object.values(record)
    const insertedParams = insertedAttributes.map((_, i) => `?${i + 1}`)

    const sqlQuery = `INSERT INTO ${this.table} (${insertedAttributes.join(', ')}) VALUES (${insertedParams.join(', ')})`

    const statement = this.db.prepare(sqlQuery)

    this.log(sqlQuery)

    statement.run(...insertedValues)
  }

  /**
   * Delete records
   */
  delete(options: DeleteOptions) {
    let sqlQuery = `DELETE FROM ${this.table}`

    sqlQuery += this.buildConditions(options)

    const statement = this.db.query(sqlQuery)

    statement.run()
  }

}
