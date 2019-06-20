
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('participants').del()
    .then(() => knex('events').del())
    .then(() => knex('participant_event_votes').del())
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('participants')
          .insert([
            {name: 'Peter', email: 'peter@lighthouse.com'},
            {name: 'Phil', email: 'phil@lighthouse.com'},
            {name: 'Govind', email: 'govind@lighthouse.com'}
        ]),
        knex('events')
          .insert([{host_id: 1, event_name: 'Peter""s Party!', event_url: 'random website', votes_to_win: 2, description: 'Party time', date_1: '2019-04-02', date_2: '2019-04-03', date_3: '2019-04-04', date_4: '2019-04-05', date_5: '2019-04-06', chosen_date: '2019-04-05'}, {host_id: 2, event_name: 'Phil""s Party!', event_url: 'random website 1', votes_to_win: 2, description: 'More party time', date_1: '2019-05-02', date_2: '2019-05-03', date_3: '2019-05-04', date_4: '2019-05-05', date_5: '2019-05-06', chosen_date: '2019-05-05'},
          {host_id: 3, event_name: 'Govind""s Party!', event_url: 'random website 2', votes_to_win: 2, description: 'The most party time', date_1: '2019-06-02', date_2: '2019-06-03', date_3: '2019-06-04', date_4: '2019-06-05', date_5: '2019-06-06', chosen_date: '2019-06-05'}
        ]),
        knex('participant_event_votes')
          .insert([{user_id: 1, event_id: 1, selected_date_1: '2019-04-02', selected_date_3: '2019-04-04', selected_date_4: '2019-04-05', selected_date_5: '2019-04-06'},
            {user_id: 2, event_id: 2, selected_date_1: '2019-05-02', selected_date_2: '2019-05-04', selected_date_4: '2019-05-05'},
            {user_id: 3, event_id: 3, selected_date_1: '2019-06-02', selected_date_2: '2019-06-03', selected_date_3: '2019-06-04', selected_date_4: '2019-06-05', selected_date_5: '2019-06-06'}
        ])
      ]);
    });
};
