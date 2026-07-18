const fs = require("fs");

// writeFile()
// fs.writeFile("demo1.txt", "This is a sample text. My name is arman hossain. I am 30 years old", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfull");
//   }
// });

// appendFile
// fs.appendFile("demo1.txt", "This is a sample text. My name is arman hossain. I am 30 years old", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfull");
//   }
// });

// readFile()
// fs.readFile("demo1.txt", 'utf-8', (data, err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("success");
//   }
// });

// rename
// fs.rename("demo1.txt","demo2.txt" , (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("success");
//   }
// });

// delete
// fs.unlink("demo2.txt", (err) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("success");
//     }
// })

// exist
fs.exists("demo2.txt", (result) => {
    if(result) {
        console.log("Found");
    } else {
        console.log("Not Found");
    }
})