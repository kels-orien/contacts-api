import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./api/contacts"));

app.get("/", function(req, res) {
  res.send(" Contacts Server running.");
});

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:5000`)
);
