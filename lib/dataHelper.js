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
              .returning(['id', 'host_id', 'event_url']);
    },
    createEventVotes: (newEventVote) => {
      return db('participant_event_votes')
              .insert(newEventVote);
    },
    updateEventVotes: (event_id, user_id, date) => {
      return db('participant_event_votes')
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
    getVoteDetails: (url) => {
      return db.select('*')
          .from('participants')
          .leftJoin('participant_event_votes', 'participants.id', '=', 'user_id')
          .leftJoin('events', 'events.id', '=', 'event_id')
          .where('event_url', url);
    }
  }
}