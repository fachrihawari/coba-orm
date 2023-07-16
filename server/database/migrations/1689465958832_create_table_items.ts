export function up() {
  return `
    create table if not exists items (
      id integer primary key autoincrement,
      name text not null,
      description text not null,
      price integer not null,
      img_url text text not null,
      author_id integer not null,
      category_id integer not null,
      foreign key (author_id) references users (id)
        on update cascade
        on delete cascade,
      foreign key (category_id) references categories (id)
        on update cascade
        on delete cascade
    );
  `
}

export function down() {
  return `
    drop table if exists items;
  `
}
