"use strict";

const express = require('express');
const router = express.Router();
const moment = require('moment');

const generateRandomString = () => Math.random().toString(36).substr(2, 8);

const dividesDatesAndTransferToObject = (dates) => {
  const rezObj = {};
  const rez = dates.split(',').map(date => moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD'));
  rez.forEach((res, i) => rezObj[`date_${i + 1}`] = res);
  return rezObj;
}

module.exports = (dataHelper) => {
  // create new participants in database
  router.post("/", (req, res) => {

    console.log(req.body);

    const mockRez = {
      host_id: req.body.host_id,
      event_name: req.body.event_name,
      event_url: generateRandomString(),
      votes_to_win: req.body.votes_to_win,
      description: req.body.description,
      ...dividesDatesAndTransferToObject(req.body.dates)
    }

    const eventId = dataHelper.createEvent(mockRez);
    eventId.then(eventAndHostID => {
      const createVote = {
        user_id: eventAndHostID[0].host_id,
        event_id: eventAndHostID[0].id
      }
      const vote = {
        user_id: eventAndHostID[0].host_id,
        event_id: eventAndHostID[0].id,
        event_url: eventAndHostID[0].event_url
      }
      const eventVote = dataHelper.createEventVotes(createVote);
      eventVote.then(() => {
        console.log('vote', vote);
        res.status(201).send(vote);
      });
    });
  });
  // update participants selected votes in database
  router.post("/:id", (req, res) => {

    const pidPromise = dataHelper.getParticipantIdByEmail(req.body.email);
    const eidPromise = dataHelper.getEventIdByUrl(req.params.id);

    Promise.all([pidPromise, eidPromise]).then((result) => {
      console.log(result[0].id, result[1].id);
      dataHelper.updateEventVotes(result[0].id, result[1].id, req.body.dates)
        .then(res.send("updated"));
    });
  });
  // retrieve all participants going to event
  router.get("/:id", (req, res) => {
    const voteDetailsPromise = dataHelper.getVoteDetails(req.params.id);
    voteDetailsPromise.then((result) => {
      console.log(result);
      // res.status(200).send(result);
      let templateVars = {
        event_name: "Party Time",
        name: "Phil",
        description: "we boutta party",
        dates: {
          date_1: "June 21",
          date_2: "June 22",
          date_3: "June 24",
          date_4: "June 25"
        },
        email: "email@email.com",
        votes_to_win: 3
      }
      templateVars.dateList = Object.values(templateVars.dates);
      res.render('event', templateVars)
    });
  });


  return router;

}
