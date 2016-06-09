import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Conference} from "./conference";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ConferenceService {

    private conferenceData = "data/conferencesData.json";
    
    constructor(private http: Http) {}

    getAllConferences() {
        return this.http.get(this.conferenceData)
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