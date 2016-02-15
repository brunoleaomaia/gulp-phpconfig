var vfs = require('vinyl-fs'),
    phpConfig = require('../'),
    through = require('through2'),
    options = {
        filename: 'config.php',
        openTag: '<?php',
        closeTag: '',
        define: false //Set true to use define(); instead $variables
    };

vfs.src('./.configrc')
    .pipe(phpConfig(options))
    .pipe(vfs.dest('./config/'));