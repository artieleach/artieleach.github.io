currEngine = 0;
//Engine list -- Use a link that includes the beginning of his query request at the end
engines=[
    {name:"Google", url:"https://www.google.it/search?q="},
    {name:"Google Images", url:"https://www.google.com/search?&tbm=isch&q="},
    {name:"DuckDuckGo", url:"https://duckduckgo.com/?q="},
    {name:"Wikipedia", url:"https://en.wikipedia.org/w/index.php?search="},
    {name:"GitHub", url:"https://github.com/search?utf8=✓&q="},
    {name:"ArchWiki", url:"https://wiki.archlinux.org/index.php?search="}
];
//Update clock every 1/2 sec.
function startTime() {
    var e = new Date,
        t = [, "it's", "right after", "about", "o'clock", "quarter", "to", "past", "half", "sharp", "a"],
        n = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"],
        i = [0, e.getMinutes(), e.getHours()],
        r = [];
    i[0] = i[1] % 7.5, r[0] = t[1], r.push(0 === i[0] ? t[0] : i[0] === parseInt(i[0]) ? t[2] : t[3]), r.push(i[1] > 53 ? [n[(i[2] + 1) % 12], t[4]] : i[1] > 37 ? [t[10], t[5], t[6], n[(i[2] + 1) % 12]] : i[1] > 23 ? [t[8], n[i[2] % 12]] : i[1] > 7 ? [t[10], t[5], t[7], n[i[2] % 12]] : i[1] > 0 ? [n[i[2] % 12], t[4]] : [n[i[2] % 12], t[4], t[9]]), i = checkTime(i), document.getElementById("clock").innerHTML = r.toString().replace(/,/gi, " "), setTimeout(startTime, 6e5)
}

function weekDayToString(e) {
    switch (e) {
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thursday";
        case 5:
            return "friday";
        case 6:
            return "saturday";
        case 0:
            return "sunday";
        default:
            return "Error: weekDay number " + today.getDay()
    }
}

function monthToString(e) {
    switch (e) {
        case 0:
            return "jan";
        case 1:
            return "feb";
        case 2:
            return "mar";
        case 3:
            return "apr";
        case 4:
            return "may";
        case 5:
            return "jun";
        case 6:
            return "jul";
        case 7:
            return "aug";
        case 8:
            return "sep";
        case 9:
            return "oct";
        case 10:
            return "nov";
        case 11:
            return "dec";
        default:
            return "Error in month conversion, number=" + e
    }
}

function dayToString(e) {
    switch (e) {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        case 4:
            return "fourth";
        case 5:
            return "fifth";
        case 6:
            return "sixth";
        case 7:
            return "seventh";
        case 8:
            return "eighth";
        case 9:
            return "ninth";
        case 10:
            return "tenth";
        case 11:
            return "eleventh";
        case 12:
            return "twelfth";
        case 13:
            return "thirteenth";
        case 14:
            return "fourteenth";
        case 15:
            return "fifteenth";
        case 16:
            return "sixteenth";
        case 17:
            return "seventeenth";
        case 18:
            return "eighteenth";
        case 19:
            return "nineteenth";
        case 20:
            return "twentieth";
        case 21:
            return "twenty first";
        case 22:
            return "twenty second";
        case 23:
            return "twenty third";
        case 24:
            return "twenty forth";
        case 25:
            return "twenty fifth";
        case 26:
            return "twenty sixth";
        case 27:
            return "twenty seventh";
        case 28:
            return "twenty eighth";
        case 29:
            return "twenty ninth";
        case 30:
            return "thirtieth";
        case 31:
            return "thirty first"
    }
}

function writeDate() {
    var e = new Date,
        t = (e.getMonth(), e.getDay()),
        n = e.getDate();
    e.getFullYear(), document.getElementById("weekday").innerHTML = weekDayToString(t) + ", the " + dayToString(n), setTimeout(startTime, 6e3)
}

function checkTime(e) {
    return e < 10 && (e = "0" + e), e
}

function changeEngine(e) {
    e < engines.length && $("#dropdown-btn").html(engines[e].name), currEngine = e, setDefaultEngine(e, 30)
}

function generateEngines() {
    for (var e = 0; e < engines.length; e++) $("#engine-list").html($("#engine-list").html() + '<a class="dropdown-item" href="#" onclick="changeEngine(' + e + ')">' + engines[e].name + "</a>")
}

function setDefaultEngine(e, t) {
    var n = new Date;
    n.setTime(n.getTime() + 24 * t * 60 * 60 * 1e3);
    var i = "expires=" + n.toUTCString();
    document.cookie = "defaultEngine=" + e + ";" + i + ";path=/"
}

function getDefaultEngine() {
    for (var e = "defaultEngine=", t = decodeURIComponent(document.cookie).split(";"), n = 0; n < t.length; n++) {
        for (var i = t[n];
            " " == i.charAt(0);) i = i.substring(1);
        if (0 == i.indexOf(e)) return i.substring(e.length, i.length)
    }
    return ""
}

function newSearch() {
    window.open(engines[currEngine].url + document.getElementById("field").value, "_self")
}
currEngine = 0, engines = [{
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q="
}, {
    name: "Google Images",
    url: "https://www.google.com/search?&tbm=isch&q="
}, {
    name: "Wikipedia",
    url: "https://en.wikipedia.org/w/index.php?search="
}, {
    name: "GitHub",
    url: "https://github.com/search?utf8=✓&q="
}, {
    name: "StackOverflow",
    url: "https://stackoverflow.com/search?q="
}], $(document).ready(function() {
    $("dropdown-toggle").dropdown(), startTime(), writeDate(), generateEngines();
    var e = getDefaultEngine();
    changeEngine("" == e ? 0 : e), document.getElementById("search-bar").addEventListener("keydown", function(e) {
        13 == e.keyCode && newSearch()
    }, !1), document.getElementById("field").focus()
});
