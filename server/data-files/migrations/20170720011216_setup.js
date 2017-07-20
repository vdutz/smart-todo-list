
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('items', function(table){
      table.increments('id');
      table.string('name');
      table.string('category');
      table.float('rating');
      table.string('description');
      table.string('picture');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('items');
  ])
};
