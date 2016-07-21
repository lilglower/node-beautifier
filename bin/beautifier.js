#!/usr/bin/env node

var beautify = require("../lib/beautify"),
    nopt = require("nopt"),
    fs = require("fs"),
    opt = {
        outfile: Boolean
    },
    parsed = nopt();

function die(b) {
    console.warn(b);
    console.warn("Usage: " + process.argv[1] + " file.{js,css,html} ...");
    process.exit(1)
}

function beautifyFile(b) {
    var c = b.split(".");
    fs.readFile(b, function(b, a) {
        if (b) console.error(b);
        else {
            239 === a[0] && (187 === a[1] && 191 === a[2]) && (a = a.slice(3));
            a = a.toString("utf8");
            switch (c[c.length - 1]) {
                case "js":
                    beauty = beautify.js_beautify;
                    break;
                case "json":
                    beauty = beautify.js_beautify;
                    break;
                case "css":
                    beauty = beautify.css_beautify;
                    break;
                case "html":
                    beauty = beautify.html_beautify;
                    break;
                default:
                    die("invalid file format")
            }
            parsed.outfile ? fs.writeFile(c[0] + ".b." + c[c.length - 1], beauty(a), function(a) {
                a && console.error(a)
            }) : console.log(beauty(a))
        }
    })
}
parsed.argv.remain.length || die("No files specified.");
parsed.argv.remain.forEach(beautifyFile);
