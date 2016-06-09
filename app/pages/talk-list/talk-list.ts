import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TalkService} from "../../shared/talks/talk.service";
import {Talk} from "../../shared/talks/talk";

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
  
  constructor(public nav: NavController, private taskService: TalkService) {}
  
  ngOnInit() {
    this.taskService.getTalksForConference(0).subscribe(
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
    console.log("to rating");
  }
}
