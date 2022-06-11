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

app.get("/info", (req, res, next) => {
  Person.count()
    .then((count) => {
      res.send(
        `Phonebook has info for ${count} people <br/><br/> ${new Date().toString()}`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }
      res.json(person);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "missing name" });
  } else if (!req.body.number) {
    return res.status(400).json({ error: "missing number" });
  }

  Person.findOne({ name: req.body.name }).then((returnedPerson) => {
    if (returnedPerson) {
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
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => res.json(updatedPerson))
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
