"use strict";
var core_1 = require("@angular/core");
var fileReader_1 = require("../helpers/fileReader");
var talk_1 = require("./talk");
var TalkService = (function () {
    function TalkService() {
    }
    TalkService.prototype.getTalksForConference = function (conferenceId) {
        return new Promise(function (resolve, reject) {
            try {
                fileReader_1.FileReader.readJSON("/data/talksData.json")
                    .then(function (content) {
                    var json = content;
                    var allTalks = [];
                    for (var index = 0; index < json.data.length; index++) {
                        var conferenceParent = json.data[index];
                        if (conferenceParent.conferenceId === conferenceId) {
                            conferenceParent.talks.forEach(function (talk) {
                                allTalks.push(new talk_1.Talk(talk.id, talk.conferenceId, talk.imageUrl, talk.title, talk.description, talk.author));
                            });
                            break;
                        }
                    }
                    resolve(allTalks);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    TalkService.prototype.getTalk = function (conferenceId, talkId) {
        return new Promise(function (resolve, reject) {
            try {
                fileReader_1.FileReader.readJSON("/data/talksData.json")
                    .then(function (content) {
                    var json = content;
                    var talk;
                    for (var index = 0; index < json.data.length; index++) {
                        var conferenceParent = json.data[index];
                        if (conferenceParent.conferenceId === conferenceId) {
                            conferenceParent.talks.forEach(function (conferenceTalk) {
                                if (conferenceTalk.id === talkId) {
                                    talk = new talk_1.Talk(conferenceTalk.id, conferenceTalk.conferenceId, conferenceTalk.imageUrl, conferenceTalk.title, conferenceTalk.description, conferenceTalk.author);
                                }
                            });
                            break;
                        }
                    }
                    if (talk === undefined) {
                        reject();
                    }
                    resolve(talk);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    TalkService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TalkService);
    return TalkService;
}());
exports.TalkService = TalkService;
//# sourceMappingURL=talk.service.js.map