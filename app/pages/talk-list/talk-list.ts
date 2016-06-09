import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TalkService} from "../../shared/talks/talk.service";
import {Talk} from "../../shared/talks/talk";
import {RatingPage} from "../rating/rating";

/*
  Generated class for the TalkListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  providers: [TalkService],
  templateUrl: 'build/pages/talk-list/talk-list.html',
})
export class TalkListPage implements OnInit {
  
  taskList: Array<Talk> = [];
  private conferenceId: number;
  
  constructor(public nav: NavController, private taskService: TalkService, params: NavParams) {
    this.conferenceId = params.get("conferenceId");
  }
  
  ngOnInit() {
    this.taskService.getTalksForConference(this.conferenceId).subscribe(
      data => {
        data.forEach(element => {
          this.taskList.push(new Talk(element.id, element.conferenceId, element.imageUrl, element.title, element.description, element.author));
        })
      },
      error => console.log(error)
    );
  }
  
  getImageSrcForItem(item: Talk): String {
        if(item.imageUrl !== "") {
            return item.imageUrl;
        }
        return "images/default_placeholder_image.png";
  }
  
  rateTalk(talk: Talk) {
    this.nav.push( RatingPage, {
      conferenceId: talk.conferenceId,
      talkId: talk.id
    })
  }
}
