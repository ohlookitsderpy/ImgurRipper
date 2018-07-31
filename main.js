const fs = require ("fs"),
    query = require('cli-interact').question,    
    query2 = require('cli-interact').getYesNo,
    exec = require('child_process').exec;

if(!fs.existsSync('./rips/')) {
    fs.mkdirSync('./rips/');
    console.log('[Ripper] Created /rips/ directory');
}

let answer = query('[Ripper] Imgur URL? ');
if (!answer) {
    process.exit();
}
let answer2 = query('[Ripper] Folder Name? ');
if (!answer2) {
    process.exit();
}
    
if(fs.existsSync(`./rips/${answer2}`)) {
   console.log('[Ripper] Error: This folder already exists');
   let answer3 = query2('[Ripper] Do you want to write to this folder anyway?');
   if (answer3 == false) { 
       process.exit(); 
 }
} else {
    console.log('[Ripper] Creating directory');
    fs.mkdirSync(`./rips/${answer2}`);
}
console.log('[Ripper] Downloading');

exec(`node ./ripper.js ${answer} ./rips/${answer2}`, function(error, stdout, stderr) {
    console.log(`[Ripper] Success: Saved to ./rips/${answer2}`);
});
