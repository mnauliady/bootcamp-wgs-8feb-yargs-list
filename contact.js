const fs = require("fs");
const path = "./data";
const pathFile = "./data/contacts.json";
const validator = require("validator");

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// mengecek apakah folder data sudah ada
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
  console.log("Success create folder");
}

// mengecek file contacts.json apakah sudah ada
if (!fs.existsSync(pathFile)) {
  fs.writeFileSync(pathFile, "[]", "utf-8");
  console.log("Success create file");
}

const input = (data) => {
  return new Promise(function (resolve, reject) {
    readline.question(data, (ans) => {
      // console.log(ans);
      resolve(ans);
    });
  });
};

// fungsi untuk menambahkan data ke dalam file json
const saveContact = (name, email, mobile) => {
  const myObj = { name, email, mobile };
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const myData = JSON.parse(file);

  // cek data nama duplikat
  const cek = myData.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

  // jika nama duplikat
  if (cek) {
    console.log("Nama sudah ada");
    return false;
  }

  // validasi format nomor hp
  if (!validator.isMobilePhone(mobile, "id-ID")) {
    console.log("Format telephone tidak sesuai");
    return false;
  }

  // jika memasukkan field email
  if (email) {
    // validasi format email
    if (!validator.isEmail(email)) {
      console.log("Format email tidak sesuai");
      return false;
    }
  }

  // push data ke dalam file
  myData.push(myObj);
  const content = JSON.stringify(myData);
  fs.writeFileSync("./data/contacts.json", content);
};

// fungsi menampilkan detail dari contact
const detail = (name) => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const myData = JSON.parse(file);

  // mencari/mengecek nama yang diinput ada dalam file json
  // const cek = myData.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
  const cek = myData.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

  // jika nama ditemukan, tampilkan nama, email dan nomor hp
  if (cek) {
    console.log(`${cek.name}`);
    if (cek.email) {
      console.log(`${cek.email}`);
    }
    console.log(`${cek.mobile}`);
  } else {
    // jika nama tidak ditemukan
    console.log("Nama tidak ditemukan");
  }
};

// menampilkan seluruh data
const list = () => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const myData = JSON.parse(file);

  // variabel iterasi untuk nomor
  let i = 1;
  console.log("Contact List :");

  // looping untuk manampilkan data selama data ada
  myData.forEach((contact) => {
    console.log(`${i++}. ${contact.name} - ${contact.mobile}`);
  });
};

// export modul
module.exports = { input, saveContact, detail, list };
