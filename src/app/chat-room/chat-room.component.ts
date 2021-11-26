import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateChangeService } from '../app-state-change.service';
import { SocketIoService } from '../socket-io.service';
import { Message } from '../type-lib';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})

export class ChatRoomComponent implements OnInit, OnDestroy {

  @HostListener('window:unload', ['$event'])
  unloadHandler() {
    if (this.inputMessage && this.inputMessage.length > 0) {
      localStorage.setItem('cacheMessage', this.inputMessage);
    }
  };

  @ViewChild('chatRoomConversation') chatRoomConversation!: ElementRef;

  selectedRoom!: string;
  selectedUser!: string;
  inputMessage!: string;

  socketConnectionStatus: boolean = false;

  messageArr: Array<Message> = [];
  
  socketConnection: Subscription;
  socketConnectionChange: Subscription;
  subChatRoomChange: Subscription;
  subUserChange: Subscription;

  constructor(private appStateChangeService: AppStateChangeService,
    private socketIoService: SocketIoService) {
    this.subChatRoomChange = this.appStateChangeService.chatRoomChangeEvent.subscribe(() => {
      this.selectedRoom = this.appStateChangeService.selectedChatRoom;
      this.messageArr = [];
    });

    this.subUserChange = this.appStateChangeService.userChangeEvent.subscribe(() => {
      this.selectedUser = this.appStateChangeService.selectedUser;
    });

    this.socketConnection = this.socketIoService.getMessages()
      .subscribe(message => {
        if (this.selectedRoom === message.room) {
          this.messageArr.push(message);
          this.scrollToBottom(50);
        }
      });
    this.socketConnectionChange = this.appStateChangeService.socketConnentChangeEvent.subscribe((status: boolean) => {
      this.socketConnectionStatus = status;
    });


    this.messageArr = [];
  }

  ngOnInit(): void {
    if (localStorage.getItem('cacheMessage')) {
      this.inputMessage = localStorage.getItem('cacheMessage')!;
      localStorage.removeItem('cacheMessage');
    }
  }

  ngOnDestroy(): void {
    this.subChatRoomChange.unsubscribe();
    this.subUserChange.unsubscribe();
    this.socketConnection.unsubscribe();
  }

  sendMessage() {
    this.socketIoService.sendMessage({ user: this.selectedUser, room: this.selectedRoom, text: this.inputMessage, datetime: Date.now() });
    this.inputMessage = '';
  }

  getUserImg(user: string | undefined) {
    return this.appStateChangeService.userOptions.find(element => element.user === user)?.profileImg;
  }

  scrollToBottom(milliSec: number) {
    let that = this;
    setTimeout(function () { that.chatRoomConversation.nativeElement.scrollTop = that.chatRoomConversation.nativeElement.scrollHeight; }, milliSec);
  }
}
