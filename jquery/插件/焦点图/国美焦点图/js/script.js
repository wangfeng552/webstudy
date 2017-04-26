!function ()
{
    function e(e)
    {
        return document.getElementById(e)
    }
    var t = 
    {
        init : function (t)
        {
            this.areaImgLoad([["j-imgload-logo", 1], ["j-imgload-serives", 3], ["j-imgload-servicestab", 
            1], ["j-imgload-recomm", 6]]);
            if (document.getElementById("timelimit"))
            {
                var i = document.getElementById("timelimit");
                i.style.background = "url(" + i.getAttribute("gome-style") + ") no-repeat 0 0";
                i.removeAttribute("gome-style")
            }
            var s = this;
            if (this.getDiv().length == 0 || this.getLi().length == 0) {
                return
            }
            if (t) {
                this.speed = t.speed ? t.speed : 5e3
            }
            e("slide-list").onmouseover = function ()
            {
                clearInterval(s.t)
            };
            e("slide-list").onmouseout = function ()
            {
                s.animate()
            };
            e("Jslide").onmouseover = function ()
            {
                e("go_l").style.display = "block";
                e("go_r").style.display = "block";
            };
            e("Jslide").onmouseout = function ()
            {
                e("go_l").style.display = "";
                e("go_r").style.display = "";
            };
            this.screenType();
            this.imgLoad(0);
            this.defaultStatus();
            this.animate();
            this.setPos();
            this.control();
            this.bindEvent()
        },
        i : 0, t : null, speed : 5e3,
        screenType : function ()
        {
            var t = this;
            var i = t.getByClass("w1", e("slide-list"), "li");
            if (t.hasClass(document.body, "w990"))
            {
                for (var s = 0, a = i.length; s < a; s++)
                {
                    var l = i[s].getElementsByTagName("img");
                    if (l.length && l[0].getAttribute("min-src"))
                    {
                        l[0].setAttribute("data-src", l[0].getAttribute("min-src"));
                        l[0].removeAttribute("big-src");
                        l[0].removeAttribute("min-src")
                    }
                }
            }
            else
            {
                for (var s = 0, a = i.length; s < a; s++)
                {
                    var l = i[s].getElementsByTagName("img");
                    if (l.length && l[0].getAttribute("big-src")) {
                        l[0].setAttribute("data-src", l[0].getAttribute("big-src"))
                    }
                    l[0].removeAttribute("big-src");
                    l[0].removeAttribute("min-src")
                }
            }
        },
        getByClass : function (e, t, i)
        {
            var s = new RegExp("\\b" + e + "\\b");
            var a = [];
            var l = (t || document).getElementsByTagName(i || "*");
            for (var n = 0; n < l.length; n++) {
                if (s.test(l[n].className)) {
                    a.push(l[n])
                }
            }
            return a;
        },
        del : function (e)
        {
            if (e.parentNode) {
                e.parentNode.removeChild(e)
            }
        },
        hasClass : function (e, t)
        {
            function i(e, t)
            {
                for (var i = 0, s = t.length; i < s; i++) {
                    if (e === t[i]) {
                        return i;
                    }
                    return - 1;
                }
            }
            return i(t, (e.className || "").split(/\s+/)) > -1;
        },
        getLi : function ()
        {
            return e("slide-tab").getElementsByTagName("li");
        },
        getDiv : function ()
        {
            var t = this;
            return t.getByClass("slide-ul", e("slide-list"), "div");
        },
        setPos : function ()
        {
            var t = this, i = t.getByClass("item", e("slide-tab"), "div");
            for (var s = 0, a = i.length; s < a; s++)
            {
                var l = i[s].getElementsByTagName("a").length * 25;
                i[s].style.height = l + "px";
                i[s].style.top =- l + "px"
            }
        },
        animate : function (e)
        {
            var t = this, i = t.getLi(), s = t.getDiv();
            clearInterval(t.t);
            t.t = setInterval(function ()
            {
                t.i++;
                if (t.i >= i.length) {
                    t.i = 0
                }
                t.imgLoad(t.i);
                for (var e = 0, a = i.length; e < a; e++)
                {
                    i[e].className = "";
                    if (t.i == e && t.i != a - 1) {
                        i[e].className = "current"
                    }
                    else if (t.i == a - 1) {
                        i[a - 1].className = "last current"
                    }
                    else {
                        i[a - 1].className = "last";
                    }
                }
                for (var l = 0, n = s.length; l < n; l++) {
                    if (t.i == l) {
                        s[l].style.display = "block"
                    }
                    else {
                        s[l].style.display = "";
                    }
                }
                t.initialState(t.i)
            },
            t.speed)
        },
        initialState : function (e)
        {
            var t = this, i = t.getLi()[t.i].getElementsByTagName("a"), s = t.getDiv()[t.i].getElementsByTagName("li"), 
            a = t.getByClass("num", t.getLi()[t.i], "div")[0], l = t.getByClass("text", t.getLi()[t.i], 
            "div")[0], n = l.getElementsByTagName("span")[0];
            if (i.length > 1) {
                a.innerHTML = 1 + "/" + i.length
            }
            else {
                a.style.display = "none";
                n.className = "no-list"
            }
            for (var r = 0, o = i.length; r < o; r++) {
                if (r == 0) {
                    i[r].className = "cur"
                }
                else {
                    i[r].className = "";
                }
            }
            for (var g = 0, m = s.length; g < m; g++) {
                if (g == 0) {
                    s[g].style.display = "block"
                }
                else {
                    s[g].style.display = "";
                }
            }
        },
        defaultStatus : function ()
        {
            var e = this;
            slideLi = e.getLi();
            for (var t = 0, i = slideLi.length; t < i; t++)
            {
                var s = e.getByClass("item", slideLi[t], "div")[0], a = s.getElementsByTagName("a"), l = e.getByClass("num", 
                slideLi[t], "div")[0], n = e.getByClass("text", slideLi[t], "div")[0], r = n.getElementsByTagName("span")[0];
                if (a.length > 1) {
                    a[0].className = "cur";
                    l.innerHTML = 1 + "/" + a.length
                }
                else {
                    l.style.display = "none";
                    r.className = "no-list";
                }
            }
        },
        control : function ()
        {
            var t = this, i = e("go_l"), s = e("go_r"), a = t.getLi(), l = t.getDiv();
            i.onmouseover = function ()
            {
                clearInterval(t.t)
            };
            i.onmouseout = function ()
            {
                t.animate()
            };
            s.onmouseover = function ()
            {
                clearInterval(t.t)
            };
            s.onmouseout = function ()
            {
                t.animate()
            };
            i.onclick = function (e)
            {
                t.i--;
                if (t.i < 0) {
                    t.i = a.length - 1
                }
                t.imgLoad(t.i);
                t.initialState(t.i);
                for (var i = 0, s = a.length; i < s; i++)
                {
                    a[i].className = "";
                    if (t.i == i && t.i != s - 1) {
                        a[i].className = "current"
                    }
                    else if (t.i == s - 1) {
                        a[s - 1].className = "last current"
                    }
                    else {
                        a[s - 1].className = "last";
                    }
                }
                for (var n = 0, r = l.length; n < r; n++) {
                    if (t.i == n) {
                        l[n].style.display = "block"
                    }
                    else {
                        l[n].style.display = "";
                    }
                }
                t.preventDefault(e)
            };
            s.onclick = function (e)
            {
                t.i++;
                if (t.i > a.length - 1) {
                    t.i = 0
                }
                t.imgLoad(t.i);
                t.initialState(t.i);
                for (var i = 0, s = a.length; i < s; i++)
                {
                    a[i].className = "";
                    if (t.i == i && t.i != s - 1) {
                        a[i].className = "current"
                    }
                    else if (t.i == s - 1) {
                        a[s - 1].className = "last current"
                    }
                    else {
                        a[s - 1].className = "last";
                    }
                }
                for (var n = 0, r = l.length; n < r; n++) {
                    if (t.i == n) {
                        l[n].style.display = "block"
                    }
                    else {
                        l[n].style.display = "";
                    }
                }
                t.preventDefault(e)
            }
        },
        imgLoad : function (e)
        {
            var t = this, i = t.getDiv();
            if (i[e].getElementsByTagName("li").length > 0)
            {
                var s = i[e].getElementsByTagName("li")[0].getElementsByTagName("img");
                for (var e = 0, a = s.length; e < a; e++)
                {
                    if (s[e].getAttribute("data-src"))
                    {
                        s[e].setAttribute("src", s[e].getAttribute("data-src"));
                        s[e].removeAttribute("data-src")
                    }
                }
            }
        },
        preventDefault : function (e)
        {
            if (e && e.preventDefault) {
                e.preventDefault()
            }
            else {
                window.event.returnValue = false;
            }
        },
        getTarget : function (e)
        {
            return e.target || e.srcElement;
        },
        bindEvent : function ()
        {
            var e = this;
            var t = e.getLi(), i = null;
            for (var s = 0, a = t.length; s < a; s++)
            {
                !function (s)
                {
                    t[s].onmouseover = function (a)
                    {
                        clearInterval(e.t);
                        for (var l = 0, n = t.length; l < n; l++)
                        {
                            t[l].className = "";
                            if (s == l && s != n - 1) {
                                t[l].className = "current"
                            }
                            else if (s == n - 1) {
                                t[n - 1].className = "last current"
                            }
                            else {
                                t[n - 1].className = "last";
                            }
                        }
                        var r = e.getByClass("item", this, "div")[0], o = r.getElementsByTagName("a"), 
                        g = e.getByClass("num", this, "div")[0], m = e.getByClass("text", this, "div")[0], 
                        c = m.getElementsByTagName("span")[0], u = e.getDiv()[s].getElementsByTagName("li");
                        m.onmouseover = function ()
                        {
                            if (o.length > 1) {
                                g.innerHTML = 1 + "/" + o.length
                            }
                            else {
                                g.style.display = "none";
                                c.className = "no-list"
                            }
                            for (var e = 0, t = o.length; e < t; e++) {
                                if (e == 0) {
                                    o[e].className = "cur"
                                }
                                else {
                                    o[e].className = "";
                                }
                            }
                            for (var i = 0, s = u.length; i < s; i++) {
                                if (i == 0) {
                                    u[i].style.display = "block"
                                }
                                else {
                                    u[i].style.display = "";
                                }
                            }
                        };
                        if (o.length > 1) {
                            r.style.display = "block"
                        }
                        e.imgLoad(s);
                        for (var f = 0, v = o.length; f < v; f++)
                        {
                            !function (t)
                            {
                                o[t].onmouseover = function ()
                                {
                                    i = setTimeout(function ()
                                    {
                                        g.innerHTML = t + 1 + "/" + o.length;
                                        for (var e = 0, i = o.length; e < i; e++) {
                                            if (t == e) {
                                                o[e].className = "cur"
                                            }
                                            else {
                                                o[e].className = "";
                                            }
                                        }
                                        !function (e)
                                        {
                                            for (var i = 0, s = u.length; i < s; i++)
                                            {
                                                if (t == i) {
                                                    u[i].style.display = "block"
                                                }
                                                else {
                                                    u[i].style.display = ""
                                                }
                                                var a = u[e].getElementsByTagName("img");
                                                for (var l = 0, n = a.length; l < n; l++)
                                                {
                                                    if (a[l].getAttribute("data-src"))
                                                    {
                                                        a[l].setAttribute("src", a[l].getAttribute("data-src"));
                                                        a[l].removeAttribute("data-src")
                                                    }
                                                }
                                            }
                                        }
                                        (t)
                                    }, 100)
                                };
                                o[t].onmouseout = function ()
                                {
                                    clearTimeout(i)
                                };
                                o[t].onclick = function (t)
                                {
                                    e.preventDefault(t)
                                }
                            }
                            (f)
                        }
                        var d = e.getDiv();
                        for (var y = 0, h = d.length; y < h; y++) {
                            if (y == s) {
                                d[y].style.display = "block"
                            }
                            else {
                                d[y].style.display = "";
                            }
                        }
                        e.i = s;
                    };
                    t[s].onmouseout = function ()
                    {
                        e.animate();
                        e.getByClass("item", this, "div")[0].style.display = "";
                    }
                }
                (s)
            }
        },
        areaImgLoad : function (e)
        {
            if (e.length > 0)
            {
                for (var t = 0, i = e.length; t < i; t++)
                {
                    if (document.getElementById(e[t][0]))
                    {
                        if (document.getElementById(e[t][0]).getElementsByTagName("img").length > 0)
                        {
                            var s = document.getElementById(e[t][0]).getElementsByTagName("img");
                            if (s.length > 0)
                            {
                                for (var a = 0, l = e[t][1]; a < l; a++)
                                {
                                    if (s[a])
                                    {
                                        if (s[a].getAttribute("gome-src"))
                                        {
                                            s[a].setAttribute("src", s[a].getAttribute("gome-src"));
                                            s[a].removeAttribute("gome-src")
                                        }
                                        else
                                        {
                                            s[a].setAttribute("src", s[a].getAttribute("data-src"));
                                            s[a].removeAttribute("data-src")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    t.init({
        speed : 5e3
    })
}();