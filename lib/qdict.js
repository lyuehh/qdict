/*
 * qdict
 * http://github.com/lyuehh/qdict
 *
 * Copyright (c) 2013 lyueh
 * Licensed under the MIT license.
 */

var request = require('request');
var _ = require('underscore');

function qdict(word) {
    "use strict";

    if (!word) {
        console.log("Usage: qdict word");
        return;
    }

    var url = 'http://dict.qq.com/dict?q=' + word;

    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var obj;
            try {
                obj = JSON.parse(body);
            } catch(e) {
                console.log('Error ...');
                process.exit(1);
            }
            if (!obj.local) {
                console.log('nothing found ...');
                process.exit(0);
            }

            // 输入的单词
            console.log(obj.local[0].word);

            // 解释
            _.each(obj.local[0].des, function(i) {
                if (_.isString(i)) {
                    console.log(i);
                } else {
                    console.log(i.p + ' ' + i.d);
                }
            });

            // 英语单词的其他形式
            if (obj.local[0].mor) {
                console.log();
                _.each(obj.local[0].mor, function(i) {
                    console.log(i.c + ': ' + i.m);
                });
            }

            // 英语单词的例句
            if (obj.local[0].sen) {
                console.log();
                console.log('Example: ');
                _.each(obj.local[0].sen, function(i) {
                    console.log(i.p);
                    _.each(i.s, function(ii) {
                        console.log(ii.es);
                        console.log(ii.cs);
                    });
                });
            }

            // 汉语单词的百科
            /*
            if (obj.baike) {
                var baike = obj.baike[0];
                console.log(baike.title);
                console.log(baike.abs);
            }
            */
        }
    });
}
exports.qdict = qdict;
