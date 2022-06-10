const mongoose = require("mongoose");
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const name = args[1];
const number = args[2];
const url = `mongodb+srv://16guitar:${args[0]}@cluster0.1i94l.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    if (name && number) {
      const person = new Person({
        name,
        number,
      });
      return person
        .save()
        .then(() => console.log(`added ${name} number ${number} to phonebook`));
    } else {
      console.log("phonebook");
      return Person.find({}).then((people) =>
        people.forEach((p) => console.log(`${p.name} ${p.number}`))
      );
    }
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
