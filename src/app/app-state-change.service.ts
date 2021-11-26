import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateChangeService {

  userOptions = [{ user: 'Joyse', profileImg: '/assets/image/user1.jpg' }, { user: 'Sam', profileImg: '/assets/image/user2.jpg' }, { user: 'Russell', profileImg: '/assets/image/user3.jpg' }]
  chatRoomOptions = ['General Channel', 'Technology Channel', 'Business Channel'];

  selectedUser!: string;
  selectedChatRoom!: string;

  userChangeEvent = new EventEmitter<any>();
  chatRoomChangeEvent = new EventEmitter<any>();
  chatMessageRefreshEvent = new EventEmitter<any>();
  chatMessagePreloadEvent = new EventEmitter<any>();
  chatMessageSendEvent = new EventEmitter<any>();
  socketConnentChangeEvent = new EventEmitter<any>();

  constructor() { }
}
