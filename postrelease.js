var fs = require('fs');
var webpackConfig = require('./webpack.config.js');
var packageConfig = require('./package.json');
var path = require('path');
var entry = webpackConfig.entry;

packageConfig.version = packageConfig.version.replace(/(\.)(\d+)$/g, function(a,b,c){return b+(c/1)});

var version = packageConfig.version + '_' + (new Date()).getTime();
Object.keys(entry).forEach(key=>{
  var entryFile = (entry[key] + '.html').replace(path.sep + 'app', '');

  fs.readFile(entryFile, 'utf8', (err, content)=>{
    if(err) throw err;
    content = content.replace(/"><\/script>/g, `?version=${version}"></script>`);
    content = content.replace(/<\/head>/g, `\t<script>window.__version__ = '${version}';</script>\n</head>`)
    entryFile = entryFile.replace('src', 'dist');
    fs.writeFile(entryFile, content, 'utf8', err=>{
      if(err) throw err;
      console.log('write file successful ', entryFile);
    });
  });
});


var versionFile = path.join('./dist', '__version__');
fs.writeFileSync(versionFile, version);
console.log('write file successful ', versionFile);
