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
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    
    private handleError(error: any) {
        return Observable.throw(error.message);
    }
}