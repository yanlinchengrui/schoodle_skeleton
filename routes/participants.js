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

      const eventID = dataHelper.getEventIdByUrl(req.params.id);
      eventID.then((eventIdRes) => {

        const createVote = {
          user_id: 0,
          event_id: eventIdRes.id
        }

        if (result) {
          createVote.user_id = result.id;
          // res.status(201).send(result.id.toString());

          const checkParticipantVote = dataHelper.checkParticipantVote(createVote);
          checkParticipantVote.then((resultVote) => {

            req.session.participant_id = result.id;
            
            if(resultVote) {
              res.redirect('back');
            } else {
              const eventVote = dataHelper.createEventVotes(createVote);
              eventVote.then(() => {
                console.log('vote', createVote);
                //res.status(201).send(createVote.user_id);
                res.redirect('back');
              });
            }
          })
        } else {
          const newParticipantId = dataHelper.createParticipant(req.body.name, req.body.email);
          newParticipantId.then((id) => {
            req.session.participant_id = id[0];
            createVote.user_id = id[0];
            // res.status(201).send(id[0].toString());
            const eventVote = dataHelper.createEventVotes(createVote);
            eventVote.then(() => {
              console.log('vote', createVote);
              //res.status(201).send(createVote.user_id);
              res.redirect('back');
            });
          });
        }

      });

    });
  });

  return router;
}
