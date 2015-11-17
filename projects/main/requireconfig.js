require.config({
    baseUrl: '/',
    config: {
        moment: {
            noGlobal: false
        }
    },
    paths: {
        app: 'main/app',
        angular: 'vendor/angular/angular',
        angularLocale: 'vendor/angular-i18n/angular-locale_ru',
        angularResource: 'vendor/angular-resource/angular-resource',
        uiRouter: 'vendor/angular-ui-router/release/angular-ui-router',
        angularBootstrap: 'compiled/main/vendor/angularBootstrap',
        angularStrap: 'compiled/main/vendor/angularStrap'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularLocale: ['angular'],
        angularResource: ['angular'],
        uiRouter: ['angular'],
        angularBootstrap: ['angular'],
        angularStrap: ['angular']
    },

    deps: ['main/bootstrap']
});
