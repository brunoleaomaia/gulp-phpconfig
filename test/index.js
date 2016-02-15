var vfs = require('vinyl-fs'),
  phpConfig = require('../'),
  through = require('through2'),
  should = require('should'),
  path = require('path'),
  fs = require('fs'),
  destination = './test/config';

require('mocha');

describe('gulp-phpconfig', function() {
  describe('Generating config file from ./test/.examplerc', function () {
    after(function(done) {
      console.log('AFTER');
      vfs.src(destination)
        .pipe(through.obj(function(file){
          fs.unlinkSync(file.history[0] + '/config.php');
          fs.rmdirSync(file.history[0]);
          done();
        }));
    });
    it('shoud generate file ./test/config.php', function (done) {
      var expected = '<?php\r\ndefine("DB_HOST", "127.0.0.1");\r\ndefine("DB_USER", "root");\r\ndefine("DB_PASSWORD", "root");\r\n?>';
      vfs.src('./test/.examplerc')
        .pipe(phpConfig({filename:'config.php', define: true }))
        .pipe(vfs.dest(destination))
        .pipe(through.obj(function(file){
          should.exist(file);
          should.exist(file.history[0]);
          should.exist(file.contents);
          path.basename(file.history[0]).should.equal('config.php');
          file.contents.toString().should.equal(expected);
          done();
        }));
    });
  });
});


