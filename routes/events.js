"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => { 

  router.get("/", (req, res) => {
      res.send('Get /');
  });

  router.get("/:id", (req, res) => {
      res.send(`Get /${req.params.id}`);
  });

  router.post("/", (req, res) =>{
      res.send('Post /');
  });

  return router;

}
