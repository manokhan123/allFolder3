const fs = require("fs");

// fs.writeFile('first.py','this is my first python file', ()=>{
//   console.log('file created')
// })

// fs.appendFile('first.py',' this is the tutorial of python',()=>{
//   console.log('file has been changed');
// })

// fs.rename("first.py", "second.py", () => {
//   console.log("file name has been chaged");
// });

// fs.unlink("first.py", () => {
//   console.log("File Deleted");
// });

fs.mkdir("software", () => {
  console.log("the folder software has been created");
});

fs.cp("second.py", "text.txt", () => {
  console.log("the file has been copied to another file");
});
