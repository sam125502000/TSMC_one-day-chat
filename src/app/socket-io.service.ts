import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { Message, sendMessageResult } from './type-lib';
import { AppStateChangeService } from './app-state-change.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = 'http://localhost:5566';
  
  private socket!: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(private appStateChangeService: AppStateChangeService,
    private toastrService: ToastrService) {
    this.socket = io(this.url, { withCredentials: false });
    this.socket.on('disconnect', () => {
      this.appStateChangeService.socketConnentChangeEvent.emit(false);
    });
    this.socket.on('connection', () => {
      this.appStateChangeService.socketConnentChangeEvent.emit(true);
    });
  }

  sendMessage(message: Message) {
    this.socket.emit('message:client', message, (result: sendMessageResult) => {
      console.log(result.status);
      if (result.error) {
        console.log(result.error);
        this.toastrService.error(result.error, 'SendMessageError');
      }
    });
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message:server', (message: Message) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      }
    })
  }
}
