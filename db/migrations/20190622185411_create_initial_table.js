

exports.up = function(knex, Promise) {
  return Promise.all ([
    knex.schema.createTable('participants', function(table) {
      table.increments('id');
      table.string('name');
      table.string('email');
    }),
    knex.schema.createTable('events', function(table) {
      table.increments('id');
      table.integer('host_id');
      table.string('event_name');
      table.string('event_url');
      table.integer('votes_to_win');
      table.string('description');
      table.date('date_1');
      table.date('date_2');
      table.date('date_3');
      table.date('date_4');
      table.date('date_5');
      table.string('chosen_date');
    }),
    knex.schema.createTable('participant_event_votes', function(table) {
      table.increments('id');
      table.integer('user_id');
      table.integer('event_id');
      table.date('selected_date_1');
      table.date('selected_date_2');
      table.date('selected_date_3');
      table.date('selected_date_4');
      table.date('selected_date_5');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('participants'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('participant_event_votes')
  ]);
};
