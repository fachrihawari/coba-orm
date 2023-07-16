export function up() {
  return `
    create table if not exists categories (
      id integer primary key autoincrement,
      name text not null
    );
  `
}

export function down() {
  return `
    drop table if exists categories;
  `
}
