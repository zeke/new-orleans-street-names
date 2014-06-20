
"use strict";

var fs = require("fs");
var uniq = require("uniq");
var open = require("open");
var Handlebars = require("handlebars");
var data = require("./data.json");

function insensitive(s1, s2) {
  var s1lower = s1.toLowerCase();
  var s2lower = s2.toLowerCase();
  return s1lower > s2lower? 1 : (s1lower < s2lower? -1 : 0);
}

var names = data.results.collection1
  .map(function(street){ return street.street_name.replace(/ (blvd|st|ave|dr|road|place|court|alley)/i, ""); })
  .filter(function(name){ return name.length; })
  .sort(insensitive);

names = uniq(names);

var source = fs.readFileSync("template.hbs").toString();
var template = Handlebars.compile(source)
var index = __dirname + "/index.html"

fs.writeFileSync(index, template({names: names}));

open(index)
