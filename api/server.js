const express = require("express");

const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());

server.post("/accounts", (req, res) => {
    db("accounts")
        .insert(req.body)
        .then(account => {
            res.status(201).json(account);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "failed to create account" })
        })
});

server.delete("/accounts/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .del()
        .then(account => {
            if (account) {
                res.status(200).json({ data: account })
            } else {
                res.status(500).json({ message: "error deleting account" })
            }
        })
});