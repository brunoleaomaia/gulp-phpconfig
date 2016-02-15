var through = require('through2'),
    path = require('path');

module.exports = function(opts) {
    opts = opts || {};
    function generate(file, enc, cb) {
        if (file.isStream()) return cb(new Error('gulp-phpconfig: Streaming is not supported'));
        try {
            var str = file.contents.toString(enc || 'utf8'),
              json = JSON.parse(str),
              filename = path.basename(file.history[0]),
              filepath = path.dirname(file.history[0]),
              php = [opts.openTag || '<?php'];

            for (prop in json) {
              php.push((opts.define)?'define("'+prop+'", '+JSON.stringify(json[prop])+ ');':'$'+prop+' = '+JSON.stringify(json[prop])+ ';');
            }

            if (typeof opts.closeTag !== 'undefined') {
              php.push(opts.closeTag);
            } else {
              php.push('?>');
            }

            file.contents = new Buffer(php.join('\r\n'));

            if (typeof opts === 'string') {
                filename = opts;
            } else if (opts && opts.filename && typeof opts.filename === 'string') {
                filename = opts.filename;
            }
            file.history[0] = filepath + '/' + filename;
            cb(null, file);
        } catch (e) {
            return cb(e);
        }
    }
    return through.obj(generate);
};