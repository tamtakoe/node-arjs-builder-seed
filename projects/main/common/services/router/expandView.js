define([

    'app'

], function(app) {
    'use strict';

    app.provider('expandView', function(config) {
        return {
            expand: expandView,
            $get:   function() {
                return expandView;
            }
        };

        function expandView(stateConfig) {
            if (typeof stateConfig === 'string') {
                stateConfig = { view: stateConfig };
            }

            if (typeof stateConfig.view === 'string') {
                var viewOptions = convertViewPathToControllerAndTemplate(stateConfig.view);
                delete stateConfig.view;

                angular.extend(stateConfig, viewOptions);
            }

            return stateConfig;
        }

        function convertViewPathToControllerAndTemplate(view) {
            var viewPathParts = view.split('/');
            var stateConfig = {};
            var viewPath;

            // Controller name
            if (viewPathParts[1] === 'components') {
                //"/main/modulename/components/componentname/views/viewname/controller.js" -> "ModulenameComponentnameViewname"
                stateConfig.controller = viewPathParts.map(function(part) {
                    if (part !== 'components') {
                        return part[0].toUpperCase() + part.slice(1);
                    }
                }).join('');

                viewPathParts.splice(3, 0, 'views');
            } else {
                //"/main/modulename/views/viewname/controller.js" -> "ModulenameViewname"
                stateConfig.controller = viewPathParts.map(function(part) {
                    return part[0].toUpperCase() + part.slice(1);
                }).join('');

                viewPathParts.splice(1, 0, 'views');
            }

            viewPath = viewPathParts.join('/');

            // Template URL
            // "modulename/viewname" -> "/main/modulename/views/viewname/template.html"
            stateConfig.templateUrl = '/' + config.project + '/' + viewPath + '/template.html';

            // Controller URL
            stateConfig.controllerUrl = viewPath + '/controller';

            return stateConfig;
        }
    });
});