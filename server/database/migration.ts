import { argv, write } from 'bun'
import { readdir } from 'node:fs/promises'
import { Database } from './database'

type MigrationFile = {
  up: () => string
  down: () => string
}

class Migration {
  private db = Database.getInstance()

  private migrationsPath = './database/migrations'

  boot() {
    const option = argv.slice(2).join(' ')
    if (option === '--up') this.run('up')
    else if (option === '--down') this.run('down')
    else if (option.includes('--create')) this.create(option)
    else console.error('Choose migration option: --up, --down, --create')
  }

  async run(direction: 'up' | 'down') {
    const files = await readdir(this.migrationsPath)
    files.sort()

    for (const file of files) {
      console.log('=====================================')
      console.log('Migrate', file)
      const migration: MigrationFile = await import('./migrations/' + file)
      console.log(migration[direction]())

      this.db.query(migration[direction]()).run()
    }
  }

  async create(option: string) {
    const name = option.replace('--create', '').trim()

    if (!name) {
      console.error('Migration name is required')
      return
    }

    const stub = `
export function up() {
  return \`
    // your sql query
    // example: create table your_table_name (id integer primary key, name text)
  \`
}

export function down() {
  return \`
    drop table if exists your_table_name;
  \`
}
    `

    const newMigrationName = Date.now().toString() + '_' + name + '.ts'
    const newMigrationPath = this.migrationsPath + '/' + newMigrationName
    await write(newMigrationPath, stub)
    console.log('New migration file', newMigrationPath, 'is created')
  }
}

const migration = new Migration()
migration.boot()
