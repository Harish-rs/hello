const fs = require("fs");

// const quote = "Hello, bangalore!";
// //const [, , n] = process.argv;
// for (var i = 0; i < 5; i++) {
//   fs.writeFile(`./backup/text-${i}.html`, quote, (err) => {
//     console.log(`Writing backup text-${i}.html`);
//   });
// }

// fs.readFile("./backup/text-0.htm", "utf-8", (err, data) => {
//   if (err) {
//     console.log(`Error reading backup text-0.html`);
//   }
//   console.log(data);
// });

// fs.appendFile(`./backup/text-1.html`, quote, (err) => {
//   console.log(`append done`);
// });

// var filesNo;
// fs.readdir("./backup", (err, data) => {
//   if (err) {
//     console.log(`Error reading backup`);
//   }
//   filesNo = data.length;
//   console.log(filesNo);
// });

// for (var i = 0; i < 4; i++) {
//   // console.log(i);
//   fs.unlink(`./backup/text-${i}.html`, (err) => {
//     console.log(i);
//     if (err) {
//       console.log(`Error deleting backup`);
//     }
//     console.log(`Deleted backup text-${i}.html`);
//   });
// }

fs.readdir("./backup", (err, files) => {
  if (err) {
    console.log(`Error reading backup`);
  }
  console.log(files);

  for (let file of files) {
    console.log(`./backup/${file}`);
    fs.unlink(`./backup/${file}`, (err) => {
      if (err) {
        console.log(`Error deleting backup`);
      }
      console.log(`Deleted backup ${file}`);
    });
  }
});

//   fs.unlink(`./backup/text-${i}.html`, (err) => {
//     console.log(i);
//     if (err) {
//       console.log(`Error deleting backup`);
//     }
//     console.log(`Deleted backup text-${i}.html`);
//   });
