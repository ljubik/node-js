const actions = require("./contacts.js");
const express = require("express");
// const PORT = 3000;
const dotenv = require("dotenv");

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3003;

app.listenerCount(PORT,() => {
  console.log(`server run in ${PORT}`)
})


const ExportData = 123; //testing exports
module.exports = ExportData; //from export

// index.js
const argv = require("yargs").argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      actions.listContacts();
      break;

    case "get":
      actions.getContactById(id);
      break;

    case "add":
      actions.addContact(name, email, phone);
      break;

    case "remove":
      actions.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
