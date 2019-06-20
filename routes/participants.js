"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dataHelper) => {

  router.post("/", (req, res) => {
    const newParticipantId = dataHelper.createParticipant(req.body.name, req.body.email);
    newParticipantId.then((id)=> {
      res.status(201).send(id[0].toString());
    })
  });

  return router;
}
