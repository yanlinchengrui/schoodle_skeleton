"use strict";

const express = require('express');
const router = express.Router();

module.exports = (dataHelper) => {

  router.post("/", (req, res) => {
    const ifPidExists = dataHelper.getParticipantIdByEmail(req.body.email);
    ifPidExists.then((result) => {
      if (result) {
        req.session.participant_id = result.id;
        res.status(201).send(result.id.toString());
      } else {
        const newParticipantId = dataHelper.createParticipant(req.body.name, req.body.email);
        newParticipantId.then((id) => {
          req.session.participant_id = id[0];
          res.status(201).send(id[0].toString());
        });
      }
    });
  });

  router.post('/:id', (req, res) => {
    const ifPidExists = dataHelper.getParticipantIdByEmail(req.body.email);
    ifPidExists.then((result) => {
      if (result) {
        req.session.participant_id = result.id;
        res.status(201).send(result.id.toString());
      } else {
        const newParticipantId = dataHelper.createParticipant(req.body.name, req.body.email);
        newParticipantId.then((id) => {
          // res.status(201).send(id[0].toString());
          console.log(req.params.id)

          const eventID = dataHelper.getEventIdByUrl(req.params.id);
          eventID.then((eventIdRes) => {
            console.log(id[0], eventIdRes.id);
            const createVote = {
              user_id: id[0],
              event_id: eventIdRes.id
            }
            const eventVote = dataHelper.createEventVotes(createVote);
            eventVote.then(() => {
              console.log('vote', createVote);
              req.session.participant_id = id[0];
              res.redirect('back');
            });
          })

        });
      }
    });
  })

  return router;
}
