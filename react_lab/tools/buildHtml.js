import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

fs.readFile('public/index.html', 'utf8', (err, makrup)=>{
  if(err){
    return console.log(err);
  }
  const $ = cheerio.load(markup);
  //since a separate spreadsheet is only untilized for the production build, need to dynamic
  $('head').prepend('<link rel="stylesheet" href="styles.css">');
  fs.writeFile('dist/index.html', $.html(), 'utf8', function(err){
    if (err) {
      return console.log(err);
    }
    console.log('index.html wrritten to /dist'.green);
  });
});
