import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Talk} from "./talk";

@Injectable()
export class TalkService {

    private talkData = "data/talksData.json";

    constructor(private http: Http) {}

    getTalksForConference(conferenceId: number) {
        return this.http.get(this.talkData)
            .map(response => {
                let body = response.json();
                for (var index = 0; index < body.data.length; index++) {
                    var element = body.data[index];
                    if(element.conferenceId === conferenceId) {
                        return element.talks;
                    }
                }
                return [];
            })
            .catch(this.handleError);
    }
    
    getTalk(conferenceId: number, talkId: number) {
        return this.http.get(this.talkData)
            .map(response => {
                let body = response.json();
                let talk: Talk
                for (var index = 0; index < body.data.length; index++) {
                    var element = body.data[index];
                    if(element.conferenceId === conferenceId) {
                        for (var talkIndex = 0; talkIndex < element.talks.length; talkIndex++) {
                            var talkElement = element.talks[talkIndex];
                            if(talkElement.id === talkId) {
                                talk = new Talk(talkElement.id, talkElement.conferenceId, talkElement.imageUrl, talkElement.title, talkElement.description, talkElement.author);
                            }
                        }
                    }
                }
                return talk;
            })
            .catch(this.handleError);
    }
    
    private handleError(error: any) {
        return Observable.throw(error.message);
    }
}