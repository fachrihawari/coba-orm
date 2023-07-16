import { readdir } from 'node:fs/promises'
import { Database } from './database/Database'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { Command } from 'commander'

const db = Database.getInstance()

type MigrationFile = {
  up: () => string,
  down: () => string,
}

async function migrate(direction: 'up' | 'down') {
  const migrationsDir = join(cwd(), './database/migrations')

  const files = await readdir(migrationsDir)
  files.sort()

  for (const file of files) {
    console.log('=====================================')
    console.log("Migrate", file)
    const migration: MigrationFile = await import(migrationsDir + '/' + file)
    console.log(migration[direction]())

    db.query(migration[direction]()).run()
  }
}

const program = new Command()

program
  .name('cli.ts')
  .description('CLI to run app task')

program.command('migrate')
  .description('Run the database migrations')
  .option('--up')
  .option('--down')
  .action((opts) => {
    if (opts.up) migrate('up')
    else if (opts.down) migrate('down')
    else console.error("choose either --up or --down")
  });

program.parse();
