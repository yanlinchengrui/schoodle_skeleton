"use strict"

module.exports = function makeDataHelper(db) {
  return {
    createParticipant: (name, email) => {
      return db('participants')
              .insert({
                name,
                email
              })
              .returning('id');
    },
    createEvent: (newEvent) => {
      return db('events')
              .insert(newEvent)
              .returning(['id', 'host_id']);
    },
    createEventVotes: (newEventVote) => {
      return db('participant_event_votes')
              .insert(newEventVote);
    },
    updateEventVotes: (event_id, user_id, date) => {
      db('participant_event_votes')
        .where('event_id', event_id)
        .andWhere('user_id', user_id)
        .update(date);
    },
    getParticipantIdByEmail: (email) => {
      return db('participants').select('id').where('email', email).first();
    },
    getEventIdByUrl: (url) => {
      return db('events').select('id').where('event_url', url).first();
    },
  }
}