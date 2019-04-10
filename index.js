const needle = require('needle');
const fs = require('fs');



const E = process.env;
const FILE = 'count.log';
const TARGET = E['TARGET'];



async function main() {
  var exists = fs.existsSync(FILE);
  var count = exists? parseInt(fs.readFileSync(FILE, 'utf8'), 10):0;
  fs.writeFileSync(FILE, (++count).toString());
  var data = {time: new Date(), count};
  console.log('COUNTERSERVICE', data);
  if(!TARGET) return;
  await needle('post', TARGET, data, {json: true});
  console.log('POST', TARGET, data);
}
main();
