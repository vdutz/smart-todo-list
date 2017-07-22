exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('items', function(table){
      table.increments('id');
      table.string('name');
      table.string('category');
      table.string('rating');
      table.string('description');
      table.string('picture');
    }),
    knex.schema.createTable('users', function(table){
      table.increments('id');
      table.string('username');
      table.string('email');
      table.string('password');
      table.string('session_id')
    }),
    knex.schema.createTable('users_items', function(table){
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.integer('item_id');
      table.foreign('item_id').references('items.id');
      table.string('complete_status');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_items'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('users')
  ])
};
