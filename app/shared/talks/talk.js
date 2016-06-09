"use strict";
var Talk = (function () {
    function Talk(id, conferenceId, imageUrl, title, description, author) {
        this.id = id;
        this.conferenceId = conferenceId;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
        this.author = author;
    }
    return Talk;
}());
exports.Talk = Talk;
//# sourceMappingURL=talk.js.map