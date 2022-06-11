require("dotenv").config();

const Person = require("./models/person");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(express.static("build"));
app.use(express.json());
morgan.token("body", function (req, res) {
  return Object.keys(req.body).length === 0 ? "" : JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${
      persons.length
    } people <br/><br/> ${new Date().toString()}`
  );
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "missing name" });
  } else if (!req.body.number) {
    return res.status(400).json({ error: "missing number" });
  } else if (persons.some((p) => p.name === req.body.name)) {
    return res
      .status(400)
      .json({ error: `The name '${req.body.name}' already exists` });
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((_) => res.status(204).end())
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
