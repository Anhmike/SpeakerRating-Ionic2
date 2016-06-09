import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TalkService} from "../../shared/talks/talk.service";
import {Talk} from "../../shared/talks/talk";

/*
  Generated class for the RatingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  providers: [TalkService],
  templateUrl: 'build/pages/rating/rating.html',
})
export class RatingPage implements OnInit {

  talk: Talk;

  private conferenceId: number;
  private talkId: number;

  constructor(public nav: NavController, params: NavParams, private talkService: TalkService) {
    this.conferenceId = params.get("conferenceId"); 
    this.talkId = params.get("talkId")
  }

  ngOnInit() {
    this.talkService.getTalk(this.conferenceId, this.talkId).subscribe(
      data => this.talk = data,
      error => console.log(error)
    );
  }

  getImageSrcForItem(imageUrl: string): string {
        if(imageUrl !== "") {
            return imageUrl;
        }
        return "images/default_placeholder_image.png";
  }

  rateTalk() {
    console.log("rate talk" + this.talk.author);
  }
}
