const fs = require("fs");
const chalk = require("chalk");

/**
 * Read note with title
 *
 * @param {*} title of note
 */
const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

/**
 * Add note
 *
 * @param {*} title of note
 * @param {*} body of note
 */
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

/**
 * Remove note
 *
 * @param {*} title of note
 */
const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  if (notes.length != notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

/**
 * List notes
 */
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));
  notes.forEach(note => {
    console.log(note.title);
  });
};

/**
 * Store notes to database
 *
 * @param {*} notes to store
 */
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes, undefined, 2);
  fs.writeFileSync("notes.json", dataJSON);
};

/**
 * Retrieve notes from database
 */
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  readNote: readNote,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
