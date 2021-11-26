import { Component, OnInit } from '@angular/core';
import { AppStateChangeService } from '../app-state-change.service';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  chatRoomOptions!: Array<string>;
  
  selectedChatRoom!: string;

  constructor(private appStateChangeService: AppStateChangeService) { }

  ngOnInit(): void {
    this.chatRoomOptions = this.appStateChangeService.chatRoomOptions;
    this.selectedChatRoom = this.chatRoomOptions[0];
    this.onSelect(this.selectedChatRoom);
  }

  onSelect(chatRoom: string) {
    this.selectedChatRoom = chatRoom;
    this.appStateChangeService.selectedChatRoom = this.selectedChatRoom;
    this.appStateChangeService.chatRoomChangeEvent.emit();
  }
}
