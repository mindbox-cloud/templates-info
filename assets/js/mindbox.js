var keywords = ["if", "else", "endif", "end if", "for", "of", "end", "OR", "AND", "NOT"];
	hljs.registerLanguage("mindbox-templates", function (b) {
  var a = "foreach|0 var|0 if|0 in|0 else|0 model|0 using|0 false|0true|0 null|0 int|0 for|0 double|0 decimal|0 float|0 string|0 new|0";
  return { k: a, c: [{ cN: "built_in", b: keywords.join("|") }, { cN: "comment", b: "@[*]", e: "[*]@" }, { cN: "start", b: /[@][?\\w]*/, i: /[@][{*]/ }, { cN: "string", b: '"((?!@))', e: '"', i: "\\n" }, { b: "<", e: ">", i: "</?", sL: "xml", c: [{ b: '"@', e: '"', sL: "mindbox-templates" }] }] }
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function htmlEncode(value){
  // Create a in-memory div, set its inner text (which jQuery automatically encodes)
  // Then grab the encoded contents back out. The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

$(function() {
	$("[data-template]").each(function(index, item) {
		var html = $(item).html();
		var tabsCount = html.search(/\S|$/) - 1;
		var tabs = "";
		for (var i = 0; i < tabsCount; i++)
			tabs += "\t";

		html = html
			.replaceAll(tabs, "")
			.replaceAll("\t", "  ")
			.trim();

		html = htmlEncode(html);

		html = html
			.replaceAll("&amp;gt;", "&gt;") 
			.replaceAll("&amp;lt;", "&lt;");

		$(item).html("<pre><code class='mindbox-templates'>" + html + "</code></pre>");
		$(item).removeAttr("data-template")
	});

	hljs.initHighlightingOnLoad();
});
