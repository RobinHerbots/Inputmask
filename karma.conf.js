// Karma configuration
// Generated on Thu Feb 10 2022 10:05:16 GMT+0100 (GMT+01:00)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",


        // frameworks to use
        // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
        frameworks: ["qunit"],


        // list of files / patterns to load in the browser
        files: [
            "node_modules/jquery/dist/jquery.js",
            "qunit/qunit.js"
        ],


        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
        reporters: ["progress", "BrowserStack"],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
        // global config of your BrowserStack account
        browserStack: {
            username: "BROWSERSTACK_USERNAME",
            accessKey: "BROWSERSTACK_ACCESS_KEY"
        },

        // define browsers
        customLaunchers: {
            bs_chrome96_win11: {
                base: "BrowserStack",
                browser: "chrome",
                browser_version: "96",
                os: "Windows",
                os_version: "11"
            },
            bs_chrome_win11: {
                base: "BrowserStack",
                browser: "chrome",
                os: "Windows",
                os_version: "11"
            },
            bs_chrome_mac_Monterey: {
                base: "BrowserStack",
                browser: "chrome",
                os: "OS X",
                os_version: "Monterey"
            },
            bs_firefox_win11: {
                base: "BrowserStack",
                browser: "firefox",
                os: "Windows",
                os_version: "11"
            },
            bs_edge_win11: {
                base: "BrowserStack",
                browser: "edge",
                os: "Windows",
                os_version: "11"
            },
            bs_safari_mac_Monterey: {
                base: "BrowserStack",
                browser: "safari",
                os: "OS X",
                os_version: "Monterey"
            },
            bs_opera_win11: {
                base: "BrowserStack",
                browser: "opera",
                os: "Windows",
                os_version: "11"
            },
            bs_yandex_win11: {
                base: "BrowserStack",
                browser: "yandex",
                os: "Windows",
                os_version: "11"
            },
            bs_ie_win10: {
                base: "BrowserStack",
                browser: "ie",
                browser_version: "11",
                os: "Windows",
                os_version: "10"
            },
            bs_chrome_pixel6: {
                base: "BrowserStack",
                device: "Google Pixel 6",
                browser: "chrome",
                os: "Android",
                os_version: "12.0",
                realMobile: true
            },
            bs_chrome_samsung_galaxy_S21: {
                base: "BrowserStack",
                device: "Samsung Galaxy S21",
                browser: "chrome",
                os: "Android",
                os_version: "11.0",
                realMobile: true
            },
            bs_iPhoneXS: {
                base: "BrowserStack",
                device: "iPhone XS",
                browser: "safari",
                os: "IOS",
                os_version: "15",
                realMobile: true
            },
        },
        browsers: [
            "Chrome",
            "bs_chrome_win11",
            "bs_chrome_mac_Monterey",
            "bs_firefox_win11",
            "bs_edge_win11",
            "bs_safari_mac_Monterey",
            "bs_opera_win11",
            // "bs_yandex_win11",
            "bs_ie_win10",
            "bs_chrome_pixel6",
            "bs_chrome_samsung_galaxy_S21",
            "bs_iPhoneXS"
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser instances should be started simultaneously
        concurrency: Infinity
    });
};
