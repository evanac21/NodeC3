/*
    Christmas Card Creator (Node Version)
    A re-written version of the original: https://github.com/evanac21/CCC

    Created by Evan Carter
*/
const fs = require('fs');
const rls = require('readline-sync');
var nodemailer = require('nodemailer');
var filler = fs.readFileSync("filler.txt").toString();
runtime();
function runtime() {
  //Main Function
  console.log("NodeC3");
  console.log("\r\n");
  console.log("1. Create");
  console.log("2. Email");
  console.log("3. View current")
  console.log("4. DEBUG");
  console.log("5. Exit");
  var opt = rls.question("");
  switch(opt) {
    case "1":
      createCard();
      break;
    case "2":
      sendMail();
      break;
    case "3":
      cls();
      console.log("Current:  " + final);
      runtime();
      break;
    case "4":
      //Used for debugging purposes(to be removed in release copy)
      console.log(filler);
      break;
    case "5":
      process.exit(0);
      break;
  }
}
function cls() {
  //Clears Screen
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
    console.log('\r\n');
  }
}
function createCard() {
  //Prompt that creates card
  cls();
   var to = rls.question("Recipient?: ");
   var from = rls.question("From?: ");
   var gift = rls.question("Gift?: ");
   final = "Thank you, " + to + " for the " + gift + "! " + filler + " From: " + from;
   runtime();
}
function sendMail() {
  //Sends mail to a given recipient
  cls();
  var recp = rls.question("To?: ");
  var rtx = final;
  var pswd = rls.question("Pass?: ");
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodemailserver@gmail.com',
      pass: pswd
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
