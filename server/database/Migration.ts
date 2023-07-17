import { argv } from 'bun'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { Database } from './Database'

const db = Database.getInstance()

type MigrationFile = {
  up: () => string
  down: () => string
}

export async function migration(direction: 'up' | 'down') {
  const migrationsDir = join(cwd(), './database/migrations')

  const files = await readdir(migrationsDir)
  files.sort()

  for (const file of files) {
    console.log('=====================================')
    console.log('Migrate', file)
    const migration: MigrationFile = await import(migrationsDir + '/' + file)
    console.log(migration[direction]())

    db.query(migration[direction]()).run()
  }
}

const option = argv.slice(2).toString() as '--up' | '--down' | ''

if (option === '--up') migration('up')
else if (option === '--down') migration('down')
else console.error('Choose migration direction: --up or --down')
