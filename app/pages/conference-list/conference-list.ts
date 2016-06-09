import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ConferenceService} from "../../shared/conferences/conference.service";
import {Conference} from "../../shared/conferences/conference";
import {TalkListPage} from "../talk-list/talk-list";

/*
  Generated class for the ConferenceListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  providers: [ConferenceService],
  templateUrl: 'build/pages/conference-list/conference-list.html',
})
export class ConferenceListPage implements OnInit{
  
  conferenceList: Array<Conference> = [];
  
  constructor(public nav: NavController, private conferenceService: ConferenceService) {}
  
  ngOnInit() {
    this.conferenceService.getAllConferences().subscribe(
      data => {
        data.forEach(element => {
          let conference = new Conference(element.id, element.imageUrl, element.title, element.description);
          this.conferenceList.push(conference)
        });
      },
      error => console.log(error)
    );
  }
  
  showTalks(conference: Conference) {
    this.nav.push(TalkListPage, {
      conferenceId: conference.id
    });
  }
  
  getImageSrcForItem(item: Conference): String {
        if(item.imageUrl !== "") {
            return item.imageUrl;
        }
        return "images/default_placeholder_image.png";
  }
}
