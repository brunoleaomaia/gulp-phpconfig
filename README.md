# gulp-phpconfig
Gulp plugin to generate PHP configuration file. The plugin reads a JSON file (e.g. .configrc) and creates a PHP file, converting JSON properties to variables or constants. You can use this plugin to switch the config file between development and production environments.

## Usage

You can use just the filename as paramter or more options (See below).

```javascript
var gulp = require('gulp'),
    phpConfig = require("gulp-phpconfig");

gulp.task('phpconfig-prod', function () {
    //Filename
    return gulp.src("./.prodconfigrc")
      .pipe(phpConfig('config.php'))
      .pipe(gulp.dest('./dist/config/')); // ./dist/config/config.php
});

gulp.task('phpconfig-dev', function () {
    //Options
    return gulp.src('./.devconfigrc')
      .pipe(phpConfig({ filename: 'config.php', openTag: '<?php', closeTag: '' }))
      .pipe(gulp.dest('./dev/config/')); // ./dev/config/config.php
});
```

## Options

- `filename` (String)
	- The name of PHP file (Required);
- `openTag` (String)
	- The PHP open tag;
	- Default is `<?php`;
- `closeTag` (String)
	- The PHP close tag;
	- Default is `?>`;
- `define` (Boolean)
	- If `true` the plugin will use the PHP function `define();` to declare constants instead variables;
	- Default is `false`;
