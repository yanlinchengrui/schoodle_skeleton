"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {

  router.post("/", (req, res) => {
    const ifPidExists = dataHelper.getParticipantIdByEmail(req.body.email);
    ifPidExists.then((result) => {
      if(result) {
        res.status(201).send(result.id.toString());
      } else {
        const newParticipantId = dataHelper.createParticipant(req.body.name, req.body.email);
        newParticipantId.then((id)=> {
          res.status(201).send(id[0].toString());
        });
      }
    });
  });

  return router;
}
