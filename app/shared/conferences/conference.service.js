"use strict";
var core_1 = require("@angular/core");
var fileReader_1 = require("../helpers/fileReader");
var conference_1 = require("./conference");
var ConferenceService = (function () {
    function ConferenceService() {
    }
    ConferenceService.prototype.getAllConferences = function () {
        return new Promise(function (resolve, reject) {
            try {
                fileReader_1.FileReader.readJSON("/data/conferencesData.json")
                    .then(function (content) {
                    var json = content;
                    var allConferences = [];
                    json.data.forEach(function (element) {
                        allConferences.push(new conference_1.Conference(element.id, element.imageUrl, element.title, element.description));
                    });
                    resolve(allConferences);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
    ConferenceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ConferenceService);
    return ConferenceService;
}());
exports.ConferenceService = ConferenceService;
//# sourceMappingURL=conference.service.js.map