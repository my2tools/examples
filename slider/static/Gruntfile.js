/**
 * Description: Gruntfile.js
 * Author: crossjs <liwenfu@crossjs.com>
 * Date: 2014-11-17 16:57:40
 */

module.exports = function(grunt) {

  'use strict';

  // 显示任务执行时间
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    pkg: pkg,

    server: {
      // 开发环境
      develop: {
        options: {
          // 指向上级目录
          base: '..'
        }
      },
      // 仿真线上环境
      release: {
        options: {
          base: '..',
          release: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      app: ['app/**/*.js'],
      mod: ['mod/**/*.js']
    },

    jsdoc: {
      app: {
        src: ['app/**/*.js'],
        options: {
          destination: 'doc/app'
        }
      },
      mod: {
        src: ['mod/**/*.js'],
        options: {
          destination: 'doc/mod'
        }
      }
    },

    exec: {
      'spm-build': 'spm build'
    },

    sass: {
      themes: {
        options: {
          // nested, compact, compressed, expanded
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'themes/scss',
          src: ['**/*.scss'],
          dest: 'themes/css',
          ext: '.css'
        }]
      }
    },

    uglify: {
      options: {
        // remove HH:MM:ss
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyymmdd") %> */\n',
        beautify: {
          'ascii_only': true
        },
        compress: {
          'global_defs': {
            'DEBUG': false
          },
          'dead_code': true
        }
      },
      config: {
        files: {
          'lib/config.js': 'lib/config.js'
        }
      }
    },

    clean: {
      themes: {
        src: ['themes/default/css']
      }
    }

  });

  grunt.registerTask('build-themes', ['clean', 'sass']);
  grunt.registerTask('build-app', ['exec']);
  grunt.registerTask('build-lib', ['uglify']);

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['build-themes', 'build-app', 'build-lib']);
  grunt.registerTask('doc', ['jsdoc']);

  grunt.registerTask('develop', ['server:develop']);
  grunt.registerTask('release', ['server:release']);

  grunt.registerTask('default', ['test', 'build', 'doc']);

};
