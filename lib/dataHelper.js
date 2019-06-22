"use strict"

const moment = require('moment');


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
    updateEventVotes: (user_id, event_id, date) => {
      for(const key in date) {
        if(!date[key]) {
          date[key] = db.raw('DEFAULT');
        }
      }
      console.log(event_id);
      return db('participant_event_votes')
        .where('event_id', event_id)
        .andWhere('user_id', user_id)
        .update(date)
        .then((result)=> {
          return db.select('events.votes_to_win','date_1', 'date_2', 'date_3', 'date_4','date_5')
          .from('participant_event_votes')
          .leftJoin('events', 'event_id' , '=', 'events.id')
          .where('event_id', event_id)
          .count('selected_date_1 AS count1') 
          .count('selected_date_2 AS count2')
          .count('selected_date_3 AS count3')
          .count('selected_date_4 AS count4')
          .count('selected_date_5 AS count5')
          .groupBy('events.votes_to_win','date_1', 'date_2', 'date_3', 'date_4','date_5')
          .then ((result) => {
            console.log('count selected date columns:', result);
            let winDate = "";
              if (result[0].count1 >= result[0].votes_to_win) {
                winDate += `${moment(result[0].date_1).format("MMMM Do")}`
              } if(result[0].count2 >= result[0].votes_to_win){
                winDate +=`, ${moment(result[0].date_2).format("MMMM Do")}` 
              } if(result[0].count3 >= result[0].votes_to_win){
                winDate += `, ${moment(result[0].date_3).format("MMMM Do")}`
              } if(result[0].count4 >= result[0].votes_to_win){
                winDate +=`, ${moment(result[0].date_4).format("MMMM Do")}`
              } if(result[0].count5 >= result[0].votes_to_win){
                winDate +=`, ${moment(result[0].date_5).format("MMMM Do")}`
              }
              if(winDate){
                console.log('winDate:', winDate);
                console.log('eventId:', event_id);
                return db('events')
                .where('id', event_id)
                .update({chosen_date: winDate});
                // .then(() => {
                //   return
                // })
              } else {
                return Promise.resolve('winDate not settled yet');
              }
          }) 
        }).catch((error) => {
          console.log(error);
        })
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
                .where('event_url', url)
                .orderBy('participant_event_votes.id', 'ASC');
    },
    checkParticipantVote: (objPidEid) => {
      return db.select('id')
                .from('participant_event_votes')
                .where('user_id', objPidEid.user_id)
                .andWhere('event_id', objPidEid.event_id)
                .first();

    }

  }
}