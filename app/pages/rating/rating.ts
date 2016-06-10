import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Alert} from 'ionic-angular';
import {ConferenceListPage} from '../conference-list/conference-list';
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

  customerRating: string = "";
  talk: Talk;
  buttonActive: Array<boolean> = [true, true, true, true, true];
  
  private conferenceId: number;
  private talkId: number;
  private selectedStars = 5;

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
  
  starSelected(starId: number) {
    console.log("star clicked");
    this.selectedStars = starId + 1;
    for (var index = 0; index < this.buttonActive.length; index++) {
        if( index <= starId ) {
            this.buttonActive[index] = true;
        } else {
            this.buttonActive[index] = false;
        }
    }
  }

  rateTalk() {
    let starMessage = "Thanks for your rating with " + this.selectedStars + " stars";
    let customerInput = ""
    
    if( this.customerRating !== "" ) {
      customerInput = "Your Input: (" + this.customerRating + ")";
    }
    
    let alert = Alert.create({
      title: "Thanks for your rating",
      subTitle: starMessage +  " <br>" + customerInput,
      buttons: [{
        text: "Ok",
        handler: () => {
          this.nav.push(ConferenceListPage);
        }
      }]
    });
    this.nav.present(alert);
  }
}
