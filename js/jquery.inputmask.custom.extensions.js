$.extend($.inputmask.defaults.aliases, {

    'h:s t': {
        mask: "h:s t",
        regex: {
            hrspre: new RegExp("[012]"), //hours pre
            hrs24: new RegExp("2[0-9]|1[3-9]"),
            hrs: new RegExp("[01][0-9]|2[0-3]"), //hours
            ampmpre: new RegExp("[apAP]"),
            ampm: new RegExp("^[a|p|A|P][m|M]")
        },
        separator: ':',
        transform : function(buffer, position, element, opts){
            return element.replace(/[\.\-\:]/gi,opts.separator[opts.separator.length - 1]);
        },
        definitions: {
            'h': { //val1 ~ hours
                validator: function(chrs, buffer, pos, strict, opts) {
                    var isValid = opts.regex.hrs.test(chrs);
                    if (!strict && !isValid) {
                        if (chrs.charAt(1) == opts.separator[opts.separator.length - 1] || "-.:".indexOf(chrs.charAt(1)) != -1 ) {
                            isValid = opts.regex.hrs.test("0" + chrs.charAt(0));
                            if (isValid) {
                                buffer[pos - 1] = "0";
                                buffer[pos] = chrs.charAt(0);
                                pos++;
                                return { "pos": pos };
                            }
                        }
                    }

                    if ( isValid && opts.regex.hrs24.test(chrs) ) {

                        var tmp = parseInt(chrs,10);

                        if ( tmp == 24 ) {
                            buffer[pos+5] = "a";
                            buffer[pos+6] = "m";
                        } else {
                            buffer[pos+5] = "p";
                            buffer[pos+6] = "m";
                        }

                        tmp = tmp - 12;

                        if ( tmp < 10 ) {
                            buffer[pos] = tmp.toString();
                            buffer[pos-1] = "0";
                        } else {
                            buffer[pos] = tmp.toString().charAt(1);
                            buffer[pos-1] = tmp.toString().charAt(0);
                        }

                        return { "pos": pos, "c" : buffer[pos] };
                    }

                    return isValid;
                },
                cardinality: 2,
                prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                    var isValid = opts.regex.hrspre.test(chrs);
                    if (!strict && !isValid) {
                        isValid = opts.regex.hrs.test("0" + chrs);
                        if (isValid) {
                            buffer[pos] = "0";
                            pos++;
                            return { "pos": pos };
                        }
                    }
                    return isValid;
                }, cardinality: 1}]
            },
            't': { //val1 ~ hours
                validator: function(chrs, buffer, pos, strict, opts) {
                    var isValid = opts.regex.ampm.test(chrs);
                    if (!strict && !isValid) {
                        isValid = opts.regex.ampm.test(chrs+'m');
                        if (isValid) {
                            buffer[pos - 1] = chrs.charAt(0);
                            buffer[pos] = "m";
                            pos++;
                            return pos;
                        }
                    }
                    return isValid;
                },
                casing: "lower",
                cardinality: 2,
                prevalidator: [{ validator: function(chrs, buffer, pos, strict, opts) {
                    var isValid = opts.regex.ampmpre.test(chrs);
                    if (isValid) {
                        isValid = opts.regex.ampm.test(chrs+"m");
                        if (isValid) {
                            buffer[pos] = chrs;
                            buffer[pos+1] = 'm';
                            return pos;
                        }
                    }
                    return isValid;
                }, cardinality: 1}]
            }
        },
        insertMode: false,
        autoUnmask: false
    },

    'url' : {
        mask: "ir",
        placeholder: "",
        separator: "",
        defaultPrefix: "http://",
        regex: {
            urlpre1: new RegExp("[fh]"),
            urlpre2: new RegExp("(ft|ht)"),
            urlpre3: new RegExp("(ftp|htt)"),
            urlpre4: new RegExp("(ftp:|http|ftps)"),
            urlpre5: new RegExp("(ftp:/|ftps:|http:|https)"),
            urlpre6: new RegExp("(ftp://|ftps:/|http:/|https:)"),
            urlpre7: new RegExp("(ftp://|ftps://|http://|https:/)"),
            urlpre8: new RegExp("(ftp://|ftps://|http://|https://)")
        },
        definitions: {
            'i': {
                validator: function(chrs, buffer, pos, strict, opts) {
                    return true;
                },
                cardinality: 8,
                prevalidator: (function(){
                    var result = [], prefixLimit = 8;
                    for( var i=0; i < prefixLimit; i++ ) {
                        result[i] = (function(){
                            var j = i;
                            return { validator: function(chrs, buffer, pos, strict, opts) {
                                if ( opts.regex["urlpre"+(j+1)] ) {
                                    var tmp = chrs, k;
                                    if ( ( ( j + 1 ) - chrs.length ) > 0 ) {
                                        tmp = buffer.join('').substring(0,( ( j + 1 ) - chrs.length )) + "" + tmp;
                                    }
                                    var isValid = opts.regex["urlpre"+(j+1)].test(tmp);
                                    if (!strict && !isValid) {
                                        pos = pos-j;
                                        for (k=0;k<opts.defaultPrefix.length;k++){
                                            buffer[pos] = opts.defaultPrefix[k];pos++;
                                        }
                                        for (k=0; k<tmp.length-1;k++) {
                                            buffer[pos] = tmp[k];pos++;
                                        }
                                        return { "pos": pos };
                                    }
                                    return isValid;
                                } else {
                                    return false;
                                }
                            }, cardinality: j};
                        })();
                    }
                    return result;
                })()
            },
            'r': {
                validator: function(chrs, buffer, pos, strict, opts) {
                    return true;
                },
                cardinality: 2000
            }
        },
        insertMode: false,
        autoUnmask: false
    }
});