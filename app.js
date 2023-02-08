const yargs = require("yargs");
const contacts = require("./contact.js");

// add/create data menggunakan yargs
yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      describe: "Contact Name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "contact email",
      demandOption: false,
      type: "string",
    },
    mobile: {
      describe: "mobile phone number",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // memanggil fungsi saveContact dari file contacs
    contacts.saveContact(argv.name, argv.email, argv.mobile);
    // console.log(contact);
  },
});

yargs.command({
  command: "detail",
  describe: "showing detail contact",
  builder: {
    name: {
      describe: "Contact Name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detail(argv.name);
  },
});

yargs.command({
  command: "list",
  describe: "showing all contact data",
  handler() {
    contacts.list();
  },
});

yargs.parse();
