const fs = require('fs');
const chalk = require('chalk');
const _ = require('lodash');

const NOTES_PATH = './notes.json';

const successMsg = (msg) => {
  console.log(chalk.green.inverse(msg));
};

const failureMsg = (msg) => {
  console.log(chalk.red.inverse(msg));
};

const load = () => {
  try {
    const notesBuffer = fs.readFileSync(NOTES_PATH);
    const notesJSON = notesBuffer.toString();
    const notes = JSON.parse(notesJSON);

    return notes;
  } catch (error) {
    return [];
  }
};

const save = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync(NOTES_PATH, notesJSON);
};

const add = (title, body) => {
  const notes = load();

  const exists = _.some(notes, { title: title, body: body });

  if (!exists) {
    notes.push({ title, body });
    save(notes);
    successMsg('Note added!');
  } else {
    failureMsg('The note is already on the list!');
  }
};

const remove = (title) => {
  let notes = load();

  const notesToKeep = (notes = _.filter(notes, (note) => note.title === title));
  const removed = notes.length !== notesToKeep.length;

  if (removed) {
    save(notes);
    successMsg('Note removed!');
  } else {
    failureMsg('Note to remove not found!');
  }
};

const list = () => {
  const notes = load();

  if (!_.isEmpty(notes)) {
    console.log(chalk.inverse('Your notes'));
    notes.forEach((note) => {
      console.log(note.title);
    });
  } else {
    console.log('No notes!');
  }
};

const read = (title) => {
  const notes = load();

  const note = _.find(notes, (note) => note.title === title);

  if (!_.isEmpty(note)) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    failureMsg('Message not found!');
  }
};

module.exports = {
  add,
  remove,
  list,
  read,
};
