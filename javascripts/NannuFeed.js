/*
 *NannuFeed by Raghavendra Nayak Muddur
 *Released under MIT and GPL
 *Copyrights (c) 2011 Raghavendra Nayak Muddur
 *Version :1.1
 *documentation :http://www.firstamong.com/nannufeed
 *Support via twitter/mrnayak
 *Includes Timeago plugin released under MIT Licence
 *
 */
(function ($) {
    jQuery.fn.NannuFeed = function (options) {
        var settings = {
            'description':false,
            'timeago':true,
            'innerHTML':false,
            'count':5,
            'more':false,
            'errmsg':'Something Went wrong',
            'moretip':'Please add more tip'
        };
        return this.each(function () {
            var id = $(this);
            if (options) {
                $.extend(settings, options);
            }
            if (settings.innerHTML) {
                var links = id.text();
                var uid = id.attr('id');

            }
            else {
                var links = id.attr('link');
                var uid = id.attr('id');
            }
            var verified;
            var idea = $(this).attr('class');
            if (links == undefined)
                return false;
            google.feeds.lookupFeed(links, lookupDone);
            function lookupDone(result) {
                if (!result.error && result.url != null) {
                    verified = result.url;
                    furl = 'getrss.py?url=' + verified;
                    function getrss(data) {
                        var id = $('feed', data).length;
                        if (id == 1) {
                            var atom = $('feed', data).eq(0);
                            this.title = $(atom).children('title:first').text();
                            this.link = $(atom).children('link:first').attr('href');
                            this.desc = $(atom).children('subtitle:first').text();
                            this.updated = $(atom).children('updated:first').text();

                            this.items = new Array();
                            var id = this;
                            $('entry', data).each(function () {

                                var NannuFeed = new Array();
                                NannuFeed.title = $(this).children("title").text();
                                NannuFeed.link = $(this).children('link').attr('href');
                                NannuFeed.desc = $(this).children('content').text();
                                NannuFeed.updated = $(this).children('updated').text();
                                id.items.push(NannuFeed);
                            });
                        }
                        else {
                            var rss = $('channel', data).eq(0);
                            this.title = $(rss).children("title").text();
                            this.link = $(rss).children("link").text();
                            this.desc = $(rss).children("description").text();
                            this.updated = $(rss).children('lastBuildDate').text();
                            this.items = new Array();
                            var id = this;
                            $('item', data).each(function () {

                                var NannuFeed = new Array();
                                NannuFeed.title = $(this).children('title').text();
                                NannuFeed.link = $(this).children('link').text();
                                NannuFeed.desc = $(this).children('description').text();
                                NannuFeed.updated = $(this).children('pubDate').text();
                                id.items.push(NannuFeed);
                            });
                        }

                    }

                    $.ajax({
                        type:'GET',
                        url:furl,
                        dataType:"xml",
                        success:function (xml) {
                            var rss = new getrss(xml);
                            var main = '<div class="rss_feed_wrapper " id="Nannu">';
                            var feedtitle = rss.title;
                            var rsslink = rss.link;
                            for (var i = 0; i < settings.count; i++) {
                                var NannuFeedItem = rss.items[i];
                                var url = NannuFeedItem.link;
                                if (settings.timeago)
                                    var time = jQuery.timeago(NannuFeedItem.updated);
                                else
                                    var time = NannuFeedItem.updated
                                var title = NannuFeedItem.title;
                                var desc = NannuFeedItem.desc;

                                main +=
                                    '<div class="rss">' +
                                        '<div class="headlines">' +
                                        '<a href="' + url + '" target="_blank">' + title + '</a>' +
                                        '</div>' + '<div class="rssdate">' + time + '</div>';
                                if (settings.description) main += desc + '</div>'; else main += '</div>';
                            }
                            main += '</div>';
                            rss = '<div class="rssheader"  style="overflow:hidden">' +
                                '<a href="' + rsslink + '" target="_blank">' + feedtitle + '</a>' +
                                '</div>';
                            rss += main

                            if (settings.more)rss += settings.moretip;
                            id.html(rss);
                        }
                    });
                }
                else {
                    id.html(settings.errmsg);
                }
            }
        });
    };
})(jQuery);
/*
 * timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
 * @requires jQuery v1.2.3 or later
 *
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */

(function (d) {
    d.timeago = function (g) {
        if (g instanceof Date) {
            return a(g)
        } else {
            if (typeof g === "string") {
                return a(d.timeago.parse(g))
            } else {
                return a(d.timeago.datetime(g))
            }
        }
    };
    var f = d.timeago;
    d.extend(d.timeago, {settings:{refreshMillis:60000, allowFuture:false, strings:{prefixAgo:null, prefixFromNow:null, suffixAgo:"ago", suffixFromNow:"from now", seconds:"less than a minute", minute:"about a minute", minutes:"%d minutes", hour:"about an hour", hours:"about %d hours", day:"a day", days:"%d days", month:"about a month", months:"%d months", year:"about a year", years:"%d years", numbers:[]}}, inWords:function (l) {
        var m = this.settings.strings;
        var i = m.prefixAgo;
        var q = m.suffixAgo;
        if (this.settings.allowFuture) {
            if (l < 0) {
                i = m.prefixFromNow;
                q = m.suffixFromNow
            }
            l = Math.abs(l)
        }
        var o = l / 1000;
        var g = o / 60;
        var n = g / 60;
        var p = n / 24;
        var j = p / 365;

        function h(r, t) {
            var s = d.isFunction(r) ? r(t, l) : r;
            var u = (m.numbers && m.numbers[t]) || t;
            return s.replace(/%d/i, u)
        }

        var k = o < 45 && h(m.seconds, Math.round(o)) || o < 90 && h(m.minute, 1) || g < 45 && h(m.minutes, Math.round(g)) || g < 90 && h(m.hour, 1) || n < 24 && h(m.hours, Math.round(n)) || n < 48 && h(m.day, 1) || p < 30 && h(m.days, Math.floor(p)) || p < 60 && h(m.month, 1) || p < 365 && h(m.months, Math.floor(p / 30)) || j < 2 && h(m.year, 1) || h(m.years, Math.floor(j));
        return d.trim([i, k, q].join(" "))
    }, parse:function (h) {
        var g = d.trim(h);
        g = g.replace(/\.\d\d\d+/, "");
        g = g.replace(/-/, "/").replace(/-/, "/");
        g = g.replace(/T/, " ").replace(/Z/, " UTC");
        g = g.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
        return new Date(g)
    }, datetime:function (h) {
        var i = d(h).get(0).tagName.toLowerCase() === "time";
        var g = i ? d(h).attr("datetime") : d(h).attr("title");
        return f.parse(g)
    }});
    d.fn.timeago = function () {
        var h = this;
        h.each(c);
        var g = f.settings;
        if (g.refreshMillis > 0) {
            setInterval(function () {
                h.each(c)
            }, g.refreshMillis)
        }
        return h
    };
    function c() {
        var g = b(this);
        if (!isNaN(g.datetime)) {
            d(this).text(a(g.datetime))
        }
        return this
    }

    function b(g) {
        g = d(g);
        if (!g.data("timeago")) {
            g.data("timeago", {datetime:f.datetime(g)});
            var h = d.trim(g.text());
            if (h.length > 0) {
                g.attr("title", h)
            }
        }
        return g.data("timeago")
    }

    function a(g) {
        return f.inWords(e(g))
    }

    function e(g) {
        return(new Date().getTime() - g.getTime())
    }

    document.createElement("abbr");
    document.createElement("time")
}(jQuery));
(function ($) {
    $.fn.editable = function (target, options) {
        if ("disable" == target) {
            $(this).data("disabled.editable", true);
            return
        }
        if ("enable" == target) {
            $(this).data("disabled.editable", false);
            return
        }
        if ("destroy" == target) {
            $(this).unbind($(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");
            return
        }
        var settings = $.extend({}, $.fn.editable.defaults, {target:target}, options);
        var plugin = $.editable.types[settings.type].plugin || function () {
        };
        var submit = $.editable.types[settings.type].submit || function () {
        };
        var buttons = $.editable.types[settings.type].buttons || $.editable.types.defaults.buttons;
        var content = $.editable.types[settings.type].content || $.editable.types.defaults.content;
        var element = $.editable.types[settings.type].element || $.editable.types.defaults.element;
        var reset = $.editable.types[settings.type].reset || $.editable.types.defaults.reset;
        var callback = settings.callback || function () {
        };
        var onedit = settings.onedit || function () {
        };
        var onsubmit = settings.onsubmit || function () {
        };
        var onreset = settings.onreset || function () {
        };
        var onerror = settings.onerror || reset;
        if (settings.tooltip) {
            $(this).attr("title", settings.tooltip)
        }
        settings.autowidth = "auto" == settings.width;
        settings.autoheight = "auto" == settings.height;
        return this.each(function () {
            var self = this;
            var savedwidth = $(self).width();
            var savedheight = $(self).height();
            $(this).data("event.editable", settings.event);
            if (!$.trim($(this).html())) {
                $(this).html(settings.placeholder)
            }
            $(this).bind(settings.event, function (e) {
                if (true === $(this).data("disabled.editable")) {
                    return
                }
                if (self.editing) {
                    return
                }
                if (false === onedit.apply(this, [settings, self])) {
                    return
                }
                e.preventDefault();
                e.stopPropagation();
                if (settings.tooltip) {
                    $(self).removeAttr("title")
                }
                if (0 == $(self).width()) {
                    settings.width = savedwidth;
                    settings.height = savedheight
                } else {
                    if (settings.width != "none") {
                        settings.width = settings.autowidth ? $(self).width() : settings.width
                    }
                    if (settings.height != "none") {
                        settings.height = settings.autoheight ? $(self).height() : settings.height
                    }
                }
                if ($(this).html().toLowerCase().replace(/(;|")/g, "") == settings.placeholder.toLowerCase().replace(/(;|")/g, "")) {
                    $(this).html("")
                }
                self.editing = true;
                self.revert = $(self).html();
                $(self).html("");
                var form = $("<form />");
                if (settings.cssclass) {
                    if ("inherit" == settings.cssclass) {
                        form.attr("class", $(self).attr("class"))
                    } else {
                        form.attr("class", settings.cssclass)
                    }
                }
                if (settings.style) {
                    if ("inherit" == settings.style) {
                        form.attr("style", $(self).attr("style"));
                        form.css("display", $(self).css("display"))
                    } else {
                        form.attr("style", settings.style)
                    }
                }
                var input = element.apply(form, [settings, self]);
                var input_content;
                if (settings.loadurl) {
                    var t = setTimeout(function () {
                        input.disabled = true;
                        content.apply(form, [settings.loadtext, settings, self])
                    }, 100);
                    var loaddata = {};
                    loaddata[settings.id] = self.id;
                    if ($.isFunction(settings.loaddata)) {
                        $.extend(loaddata, settings.loaddata.apply(self, [self.revert, settings]))
                    } else {
                        $.extend(loaddata, settings.loaddata)
                    }
                    $.ajax({type:settings.loadtype, url:settings.loadurl, data:loaddata, async:false, success:function (result) {
                        window.clearTimeout(t);
                        input_content = result;
                        input.disabled = false
                    }})
                } else {
                    if (settings.data) {
                        input_content = settings.data;
                        if ($.isFunction(settings.data)) {
                            input_content = settings.data.apply(self, [self.revert, settings])
                        }
                    } else {
                        input_content = self.revert
                    }
                }
                content.apply(form, [input_content, settings, self]);
                input.attr("name", settings.name);
                buttons.apply(form, [settings, self]);
                $(self).append(form);
                plugin.apply(form, [settings, self]);
                $(":input:visible:enabled:first", form).focus();
                if (settings.select) {
                    input.select()
                }
                input.keydown(function (e) {
                    if (e.keyCode == 27) {
                        e.preventDefault();
                        reset.apply(form, [settings, self])
                    }
                });
                var t;
                if ("cancel" == settings.onblur) {
                    input.blur(function (e) {
                        t = setTimeout(function () {
                            reset.apply(form, [settings, self])
                        }, 500)
                    })
                } else {
                    if ("submit" == settings.onblur) {
                        input.blur(function (e) {
                            t = setTimeout(function () {
                                form.submit()
                            }, 200)
                        })
                    } else {
                        if ($.isFunction(settings.onblur)) {
                            input.blur(function (e) {
                                settings.onblur.apply(self, [input.val(), settings])
                            })
                        } else {
                            input.blur(function (e) {
                            })
                        }
                    }
                }
                form.submit(function (e) {
                    if (t) {
                        clearTimeout(t)
                    }
                    e.preventDefault();
                    if (false !== onsubmit.apply(form, [settings, self])) {
                        if (false !== submit.apply(form, [settings, self])) {
                            if ($.isFunction(settings.target)) {
                                var str = settings.target.apply(self, [input.val(), settings]);
                                $(self).html(str);
                                self.editing = false;
                                callback.apply(self, [self.innerHTML, settings]);
                                if (!$.trim($(self).html())) {
                                    $(self).html(settings.placeholder)
                                }
                            } else {
                                var submitdata = {};
                                submitdata[settings.name] = input.val();
                                submitdata[settings.id] = self.id;
                                if ($.isFunction(settings.submitdata)) {
                                    $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings]))
                                } else {
                                    $.extend(submitdata, settings.submitdata)
                                }
                                if ("PUT" == settings.method) {
                                    submitdata._method = "put"
                                }
                                $(self).html(settings.indicator);
                                var ajaxoptions = {type:"POST", data:submitdata, dataType:"html", url:settings.target, success:function (result, status) {
                                    if (ajaxoptions.dataType == "html") {
                                        $(self).html(result)
                                    }
                                    self.editing = false;
                                    callback.apply(self, [result, settings]);
                                    if (!$.trim($(self).html())) {
                                        $(self).html(settings.placeholder)
                                    }
                                }, error:function (xhr, status, error) {
                                    onerror.apply(form, [settings, self, xhr])
                                }};
                                $.extend(ajaxoptions, settings.ajaxoptions);
                                $.ajax(ajaxoptions)
                            }
                        }
                    }
                    $(self).attr("title", settings.tooltip);
                    return false
                })
            });
            this.reset = function (form) {
                if (this.editing) {
                    if (false !== onreset.apply(form, [settings, self])) {
                        $(self).html(self.revert);
                        self.editing = false;
                        if (!$.trim($(self).html())) {
                            $(self).html(settings.placeholder)
                        }
                        if (settings.tooltip) {
                            $(self).attr("title", settings.tooltip)
                        }
                    }
                }
            }
        })
    };
    $.editable = {types:{defaults:{element:function (settings, original) {
        var input = $('<input type="hidden"></input>');
        $(this).append(input);
        return(input)
    }, content:function (string, settings, original) {
        $(":input:first", this).val(string)
    }, reset:function (settings, original) {
        original.reset(this)
    }, buttons:function (settings, original) {
        var form = this;
        if (settings.submit) {
            if (settings.submit.match(/>$/)) {
                var submit = $(settings.submit).click(function () {
                    if (submit.attr("type") != "submit") {
                        form.submit()
                    }
                })
            } else {
                var submit = $('<button type="submit" />');
                submit.html(settings.submit)
            }
            $(this).append(submit)
        }
        if (settings.cancel) {
            if (settings.cancel.match(/>$/)) {
                var cancel = $(settings.cancel)
            } else {
                var cancel = $('<button type="cancel" />');
                cancel.html(settings.cancel)
            }
            $(this).append(cancel);
            $(cancel).click(function (event) {
                if ($.isFunction($.editable.types[settings.type].reset)) {
                    var reset = $.editable.types[settings.type].reset
                } else {
                    var reset = $.editable.types.defaults.reset
                }
                reset.apply(form, [settings, original]);
                return false
            })
        }
    }}, text:{element:function (settings, original) {
        var input = $("<input />");
        if (settings.width != "none") {
            input.width(settings.width)
        }
        if (settings.height != "none") {
            input.height(settings.height)
        }
        input.attr("autocomplete", "off");
        $(this).append(input);
        return(input)
    }}, textarea:{element:function (settings, original) {
        var textarea = $("<textarea />");
        if (settings.rows) {
            textarea.attr("rows", settings.rows)
        } else {
            if (settings.height != "none") {
                textarea.height(settings.height)
            }
        }
        if (settings.cols) {
            textarea.attr("cols", settings.cols)
        } else {
            if (settings.width != "none") {
                textarea.width(settings.width)
            }
        }
        $(this).append(textarea);
        return(textarea)
    }}, select:{element:function (settings, original) {
        var select = $("<select />");
        $(this).append(select);
        return(select)
    }, content:function (data, settings, original) {
        if (String == data.constructor) {
            eval("var json = " + data)
        } else {
            var json = data
        }
        for (var key in json) {
            if (!json.hasOwnProperty(key)) {
                continue
            }
            if ("selected" == key) {
                continue
            }
            var option = $("<option />").val(key).append(json[key]);
            $("select", this).append(option)
        }
        $("select", this).children().each(function () {
            if ($(this).val() == json.selected || $(this).text() == $.trim(original.revert)) {
                $(this).attr("selected", "selected")
            }
        })
    }}}, addInputType:function (name, input) {
        $.editable.types[name] = input
    }};
    $.fn.editable.defaults = {name:"value", id:"id", type:"text", width:"auto", height:"auto", event:"click.editable", onblur:"cancel", loadtype:"GET", loadtext:"Loading...", placeholder:"Click to edit", loaddata:{}, submitdata:{}, ajaxoptions:{}}
})(jQuery);