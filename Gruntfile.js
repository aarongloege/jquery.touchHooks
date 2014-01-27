module.exports = function(grunt) {
    'use strict';
    
    var tag = grunt.option('tag');

    // If tag is not defined, use the current tag (found in package.json)
    if (!tag) {
        tag = grunt.file.readJSON('package.json').version;
    }

    // -- Plugins --------------------------------------------------------------

    // Intelligently autoloads `grunt-*` plugins from the package dependencies.
    require('load-grunt-tasks')(grunt);

    // -- Configuration --------------------------------------------------------

    grunt.initConfig({

        // Watch for file changes
        watch: {
            scripts: {
                files: [
                    './jquery.touchHooks.js',
                    './Gruntfile.js'
                ],
                tasks: ['build']
            }
        },

        // Compress plugin
        uglify: {
            minify: {
                files: {
                    './jquery.touchHooks.min.js': ['./jquery.touchHooks.js']
                }
            }
        },

        // commit new version
        gitcommit: {
            publish: {
                options: {
                    message: 'Version bump to v' + tag
                },
                src: ['*', '!node_modules']
            }
        },

        // tag new version
        gittag: {
            publish: {
                options: {
                    tag: tag
                }
            }
        },

        // push changes (including tags) to origin
        gitpush: {
            publish: {
                options: {
                    remote: 'origin',
                    tags: true
                }
            }
        },

        // Update json files with the tag
        modify_json: {
            options: {
                fields: {
                    version: tag
                }
            },
            plugin: {
                src: 'touchHooks.jquery.json'
            },
            package: {
                src:  'package.json'
            }
        }

    });

    // -- Tasks ----------------------------------------------------------------

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['uglify']);

    grunt.registerTask('publish', ['build', 'modify_json', 'gitcommit:publish', 'gittag:publish', 'gitpush:publish']);

};
