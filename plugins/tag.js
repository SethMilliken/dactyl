/* use strict */

XML.prettyPrinting = false;
XML.ignoreWhitespace = false;

var INFO =
<plugin name="tags" version="1.0"
        href="http://araxia.net/"
        summary="Tag Management"
        xmlns={NS}>
    <author email="seth_pentadactyl@araxia.net">Seth Milliken</author>
    <license href="http://opensource.org/licenses/mit-license.php">MIT</license>
    <project name="Pentadactyl" min-version="1.0"/>
    <p>
        Hacking up some tag management shit for pentadactyl.
    </p>
</plugin>

function isBookmarked() {
    return bmsvc().isBookmarked(uri());
};

//TODO: add pentadactyl tag completion
//TODO: handle comma-separated lists
//TODO: handle single tag
function add(taglist) {
    // Tag the URI
    if (!isBookmarked()) {
        bmsvc().insertBookmark(bmsvc().toolbarFolder, uri(), bmsvc().DEFAULT_INDEX, "Mozilla");
    }
    tagssvc().tagURI(uri(), taglist);
};

function remove(taglist) {
    // Remove tags from a URI
    tagssvc().untagURI(uri(), taglist);
};

function list() {
    var tagssvc = Cc["@mozilla.org/browser/tagging-service;1"].getService(Ci.nsITaggingService);
    // Get an array of tags for a URI
    var myTags = tagssvc().getTagsForURI(uri(), {});
    return myTags;
};

function uri() {
    // Create a URI to tag
    var myURI = ios().newURI(content.location.href, null, null);
    return myURI;
};

var IOS = null;
function ios() {
    if (IOS === null) {
        IOS = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    }
    return IOS;
};

var TAGS = null;
function tagssvc() {
    if (TAGS === null) {
        TAGS = Cc["@mozilla.org/browser/tagging-service;1"].getService(Ci.nsITaggingService);
    }
    return TAGS;
};

var BOOKMARKS = null;
function bmsvc() {
    if (BOOKMARKS === null) {
        BOOKMARKS = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Components.interfaces.nsINavBookmarksService);
    }
    return BOOKMARKS;
};

/*

// Get an array of URIs for a tag
var taggedURIs = tagssvc.getURIsForTag("mozilla");

// Get an array of all tags
var arrayOfAllTags = tagssvc.allTags;

*/
/* vim:se sts=4 sw=4 et: */
