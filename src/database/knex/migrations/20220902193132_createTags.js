exports.up = knex => knex.schema.createTable('tags', table => {
  table.increments('id');
  table.text('name');
  table.integer('note_id').references('id').inTable('Movies').onDelete('CASCADE');
  table.integer('note_user').references('user').inTable('Users');
});


exports.down = knex => knex.schema.dropTable('tags');
