/*!
* phone-codes/phone-ru.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.0-91
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "../inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("../inputmask")) : factory(window.Inputmask);
}(function(Inputmask) {
    return Inputmask.extendAliases({
        phoneru: {
            alias: "abstractphone",
            keepStatic: 8,
            countrycode: "7",
            phoneCodes: [ {
                mask: "+7 (301) ###-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (3012) ##-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Улан-Удэ",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30130) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: [ "Нижнеангарск", "Северобайкальск" ],
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30131) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Баргузин",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30132) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Таксимо",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30133) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Бичура",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30134) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Петропавловка",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30135) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Сосново-Озёрское",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30136) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Заиграево",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30137) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Закаменск",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30138) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Кабанск",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30140) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Иволгинск",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30141) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Кижинга",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30142) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Кяхта",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30143) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Мухоршибирь",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30144) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Турунтаево",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30145) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Гусиноозёрск",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30146) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Тарбагатай",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30147) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Кырен",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30148) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Хоринск",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30149) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Курумкан",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30150) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Орлик",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (30153) #-##-##",
                cc: "RU",
                cd: "Russia",
                region: "Бурятия",
                city: "Багдарин",
                operator: "",
                desc: ""
            }, {
                mask: "+7 (9##)###-##-##",
                cc: "RU",
                cd: "Russia",
                type: "mobile"
            } ]
        }
    }), Inputmask;
});