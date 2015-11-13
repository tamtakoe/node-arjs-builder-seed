define([

    'templayed'

],  function(templayed) {
    "use strict";

    lib.hidePreloader();

    var browsers = {
        chrome: {
            name: "Google Chrome",
            url: "http://www.google.com/chrome/"
        },
        safari: {
            name: "Apple Safari",
            url: "http://www.apple.com/safari/"
        },
        firefox: {
            name: "Mozilla Firefox",
            url: "http://www.getfirefox.com/"
        },
        explorer: {
            name: "Internet Explorer",
            url: "http://www.getie.com/"
        },
        opera: {
            name: "Opera",
            url: "http://www.opera.com/"
        }
    };

    var translations = {
        en: {
            title: 'Site is not compatible with your browser',
            goToSite: 'Go to site of',
            otherPopularBrowser: 'Other popular browsers:',
            downloadAndInstall: 'Download and install',
            lastYourBrowserVersion: 'last version of your browser',
            lastPopularBrowserVersion: 'last version of popular browser',
            goToSiteForcibly: 'Go to site anyway'
        },
        de: {
            title: 'Site ist nicht mit Ihrem Browser kompatibel',
            goToSite: 'Site',
            otherPopularBrowser: 'Es gibt andere populäre Browser:',
            downloadAndInstall: 'Laden und installieren',
            lastYourBrowserVersion: 'die neueste Version Ihres Browsers',
            lastPopularBrowserVersion: 'die neueste Version des beliebten Browser',
            goToSiteForcibly: 'Besuchen Sie die Website trotzdem'
        },
        ru: {
            title: 'Сайт не поддерживается браузером',
            goToSite: 'Перейти на сайт',
            otherPopularBrowser: 'Другие популярные браузеры:',
            downloadAndInstall: 'Скачайте и установите',
            lastYourBrowserVersion: 'последнюю версию вашего браузера',
            lastPopularBrowserVersion: 'последнюю версию популярного браузера',
            goToSiteForcibly: 'Перейти на сайт всё-равно'
        }
    };

    var browserKey = lib.browser.info[0].toLowerCase();
    var isBrowserDetect = !!browsers[browserKey];

    browserKey = isBrowserDetect ? browserKey : 'chrome' ;

    var currentBrowser = browsers[browserKey];
    var otherBrowsers = [];

    for (var key in browsers) {
        if (browsers.hasOwnProperty(key) && key !== browserKey) {
            otherBrowsers.push(browsers[key]);
        }
    }

    var currentTranslation = translations[lib.systemLocale];

    var strings = {
        title: currentTranslation.title,
        goToSite: currentTranslation.goToSite,
        otherPopularBrowser: currentTranslation.otherPopularBrowser,
        downloadAndInstall: currentTranslation.downloadAndInstall,
        goToSiteForcibly: currentTranslation.goToSiteForcibly,
        lastBrowserVersion: isBrowserDetect ? currentTranslation.lastYourBrowserVersion : currentTranslation.lastPopularBrowserVersion,
        mainBrowser: currentBrowser || browsers.chrome,
        otherBrowsers: otherBrowsers,
        compatibleUrl: location.href + '#compatible=1'
    };

    lib.appendElems(['/old-browser/common/template.html'], 'link', {rel: 'import'}, document.getElementById('body'), templayed, strings);
});