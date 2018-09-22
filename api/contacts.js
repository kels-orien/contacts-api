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
  if (!req.params.productId) {
    res.status(500).send("ID field is required.");
  } else {
    inventoryDB.findOne({ _id: req.params.productId }, function(err, product) {
      res.send(product);
    });
  }
});

// post contact
app.post("/contact", function(req, res) {
  var newProduct = req.body;

  inventoryDB.insert(newProduct, function(err, product) {
    if (err) res.status(500).send(err);
    else res.send(product);
  });
});

//delete contact using contact id
app.delete("/contact/:contactId", function(req, res) {
  inventoryDB.remove({ _id: req.params.productId }, function(err, numRemoved) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// Updates contact
app.put("/contact", function(req, res) {
  var productId = req.body._id;

  inventoryDB.update({ _id: productId }, req.body, {}, function(
    err,
    numReplaced,
    product
  ) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});
