const yargs = require('yargs');
const notes = require('./notes');

const NOTE_BUILDER = {
  title: {
    describe: 'Note title',
    demandOption: true,
    type: 'string',
  },
  body: {
    describe: 'Note body',
    demandOption: true,
    type: 'string',
  },
};

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: NOTE_BUILDER.title,
    body: NOTE_BUILDER.body,
  },
  handler: (argv) => notes.add(argv.title, argv.body),
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: NOTE_BUILDER.title,
  },
  handler: (argv) => notes.remove(argv.title),
});

yargs.command({
  command: 'list',
  describe: 'List notes',
  handler: () => notes.list(),
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: NOTE_BUILDER.title,
  },
  handler: (argv) => notes.read(argv.title),
});

yargs.parse();
