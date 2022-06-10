require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

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
  res.json(persons);
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

app.post("/api/persons", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "missing name" });
  } else if (!req.body.number) {
    return res.status(400).json({ error: "missing number" });
  } else if (persons.some((p) => p.name === req.body.name)) {
    return res
      .status(400)
      .json({ error: `The name '${req.body.name}' already exists` });
  }

  const person = {
    name: req.body.name,
    number: req.body.number,
    id: Math.floor(Math.random() * 1000),
  };
  persons.push(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
