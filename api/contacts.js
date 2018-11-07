import express from "express";
import bodyParser from "body-parser";
import Datastore from "nedb";

const app = express();
app.use(bodyParser.json());

module.exports = app;

var inventoryDB = new Datastore({
  filename: "./databases/contacts.db",
  autoload: true
});

// GET all contacts
app.get("/contacts", function(req, res) {
  inventoryDB.find({}, function(err, docs) {
    console.log("sending contacts");
    res.send(docs);
  });
});

// GET a contact by _id
app.get("/contact/:contactId", function(req, res) {
  if (!req.params.contactId) {
    res.status(500).send("ID field is required.");
  } else {
    inventoryDB.findOne({ _id: req.params.contactId }, function(err, contact) {
      res.send(contact);
    });
  }
});

// post contact
app.post("/contact", function(req, res) {
  var newContact = req.body;

  inventoryDB.insert(newContact, function(err, contact) {
    if (err) res.status(500).send(err);
    else res.send(contact);
  });
});

//delete contact using contact id
app.delete("/contact/:contactId", function(req, res) {
  inventoryDB.remove({ _id: req.params.contactId }, function(err, numRemoved) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// Updates contact
app.patch("/contact", function(req, res) {
  var contactId = req.body._id;

  inventoryDB.update({ _id: contactId }, req.body, {}, function(
    err,
    numReplaced
  ) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});
