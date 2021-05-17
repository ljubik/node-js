const fs = require("fs");
const uid = require("uid");

const { promises: fsPromises } = fs;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const encoding = "utf8";

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, encoding);
    console.log(JSON.parse(data));
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, encoding);
    console.log(JSON.parse(data).find((x) => x.id === contactId));
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, encoding);
    const updatedData = JSON.parse(data).filter(
      (item) => item.id !== contactId
    );
    await fsPromises.writeFile(contactsPath, JSON.stringify(updatedData));
    console.log(updatedData);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fsPromises.readFile(contactsPath, encoding);
    const parsedData = JSON.parse(data);
    const updatedData = parsedData.push({
      id: uid(),
      name: name,
      email: email,
      phone: phone,
    });
    await fsPromises.writeFile(contactsPath, JSON.stringify(parsedData));
    console.log(parsedData);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
