const fs = require('fs');
const rls = require('readline-sync');
const nodemailer = require('node-mailer');
var filler;
readFiller();
runtime();
function runtime() {
  console.log("NodeC3");
  console.log("\r\n");
  console.log("1. Create");
  console.log("2. Email");
  console.log("3. DEBUG");
  console.log("4. Exit");
  var opt = rls.question("");
  switch(opt) {
    case "1":
      createCard();
      break;
    case "2":
      sendMail();
      break;
    case "3":
      //Used for debugging purposes(to be removed in release copy)
      readFiller();
      break;
    case "4":
      process.exit(0);
      break;
  }
}
function cls() {
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
}
function readFiller() {
  fs.readFile("filler.txt", function read(err, data) {
    if(err) {throw err;}
    var comp = String(data);
    filler = comp;
  });
}
function createCard() {
  cls();
   var to = rls.question("Recipient?: ");
   var from = rls.question("From?: ");
   var gift = rls.question("Gift?: ");
   final = "Thank you, " + to + " for the " + gift + "! " + filler + " From: " + from;
   runtime();
}
function sendMail() {
  var recp = rls.question("To?: ");
  var rtx = final;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodemailserver@gmail.com',
      pass: ''
    }
  });

  var mailOptions = {
    from: 'nodemailserver@gmail.com',
    to: recp,
    subject: 'Node Automated Emailer',
    text: rtx
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent!');
    }
  });
}
