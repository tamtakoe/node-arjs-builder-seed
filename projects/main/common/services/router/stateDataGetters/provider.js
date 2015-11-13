define([

    'app'

], function(app) {
    "use strict";

    app.provider('routerStateDataGetters', function($stateProvider) {
        return {
            decorateState: decorateState,
            $get: function($rootScope, $injector, $state, $stateParams, $stateData) {
                return {
                    addGetDataOnRouteHandler: function() {
                        $rootScope.stateData = $stateData;
                        $rootScope.$on('$stateChangeSuccess', getDataOnStateChangeHandler($rootScope, $injector, $state, $stateParams, $stateData));
                    }
                };
            }
        };

        function decorateState() {
            $stateProvider.decorator('data', function(state) {
                state.data = state.data || {};

                if (state.parent && state.parent.data) {
                    state.data = _.merge({}, state.parent.data, state.data);
                }

                state.self.data = state.data;

                return state.data;
            });
        }

        function getDataOnStateChangeHandler($rootScope, $injector, $state, $stateParams, $stateData) {
            return function getStateData() {
                if ($state.current.name !== '') {
                    var locals = angular.extend({}, $state.$current.locals.globals, { $stateParams: $stateParams });

                    $state.$current.data = $state.$current.data || {};

                    setData($rootScope, $stateData, $injector, $state.$current.data, locals);
                }
            };
        }

        function setData($rootScope, $stateData, $injector, data, locals) {
            var localsForInvoke = angular.extend(locals, {$getData: dateGetter($injector, $stateData, data, locals)});

            clearData($stateData);
            invoke($injector, data, $stateData, localsForInvoke);

            $rootScope.$broadcast('$stateData:change', $stateData);
        }

        function clearData($stateData) {
            angular.forEach($stateData, function(value, key) {
                delete $stateData[key];
            });
        }

        function invoke($injector, getData, setData, locals) {
            angular.forEach(getData, function(value, key) {
                if (setData[key] === undefined) {
                    if (_.isFunction(value) || _.isArray(value)) {
                        setData[key] = $injector.invoke(value, null, locals);
                    } else if (_.isPlainObject(value)) {
                        setData[key] = {};

                        invoke($injector, value, setData[key], locals);
                    } else {
                        setData[key] = value;
                    }
                } else if (_.isPlainObject(value)) {
                    invoke($injector, value, setData[key], locals);
                }
            });
        }

        function dateGetter($injector, stateData, data, locals) {
            return function(paramName) {
                var localData = _.clone(data);

                var path = paramName.split('.');
                var property;

                while(path.length) {
                    property = path.shift();

                    if (localData[property] === undefined) {
                        if (path.length) {
                            throw new Error("Can't get data for path '" + paramName + "'");
                        } else {
                            return undefined;
                        }
                    }

                    if (_.isPlainObject(localData[property])) {
                        // TODO Implement getting object of data
                        if (path.length === 0) {
                            throw new Error("Get data object by path '" + paramName + "' not implemented yet");
                        }

                        if (stateData[property] === undefined) {
                            stateData[property] = {};
                        }

                        stateData = stateData[property];
                        localData = localData[property];
                    } else {
                        if (stateData[property] === undefined) {
                            if (_.isFunction(localData[property])) {
                                stateData[property] = $injector.invoke(localData[property], null, locals);
                            } else {
                                stateData[property] = localData[property];
                            }
                        }

                        if (path.length) {
                            throw new Error("Can't get data for path '" + paramName + "'");
                        }

                        return stateData[property];
                    }
                }
            }
        }
    });
});