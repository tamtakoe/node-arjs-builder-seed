require.config({
    baseUrl: '/',
    paths: {
        app: 'admin/app',
        angular: 'vendor/angular/angular',
        angularLocale: 'vendor/angular-i18n/angular-locale_ru',
        angularResource: 'vendor/angular-resource/angular-resource',
        uiRouter: 'vendor/angular-ui-router/release/angular-ui-router'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularLocale: ['angular'],
        angularResource: ['angular'],
        uiRouter: ['angular']
    },
    deps: ['admin/bootstrap']
});
