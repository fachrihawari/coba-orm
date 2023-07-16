export function up() {
  return `
    create table if not exists users (
      id integer primary key autoincrement,
      email text unique not null,
      password text not null,
      role text not null default "user"
    );
  `
}

export function down() {
  return `
    drop table if exists users;
  `
}
