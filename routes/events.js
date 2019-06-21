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
          .then((result) => res.send("updated " + result)).catch((error) => res.status(500).send('server error: ' + error));
    });
  });
  // retrieve all participants going to event
  router.get("/:id", (req, res) => {
    const voteDetailsPromise = dataHelper.getVoteDetails(req.params.id);
    voteDetailsPromise.then((result) => {
      let templateVars = result;
      let datething = result[0];
      let options = { month: 'short', day: 'numeric'}
      let dateArr = [
        datething.date_1, datething.date_2, datething.date_3, datething.date_4, datething.date_5
      ];
      let dateDisplay = [];
      for (let i = 0; i < dateArr.length; i++) {
        if (dateArr[i]) {
          dateDisplay.push(dateArr[i].toLocaleDateString('en-US', options))
        }
      }

      templateVars.dateList = dateDisplay
      // res.status(201).send(result);            // REMOVE
      res.render('event', {templateVars: templateVars, dates: dateDisplay})
    });
  });


  return router;

}
