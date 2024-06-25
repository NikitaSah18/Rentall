import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessageDto } from '../models/ChatMessageDto';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private webSocket: WebSocket | null = null;
  private chatMessagesSubject = new Subject<ChatMessageDto[]>();
  chatMessages$ = this.chatMessagesSubject.asObservable();

  constructor() {}

  public openWebSocket() {
    if (this.webSocket) {
      console.warn('WebSocket is already open');
      return;
    }

    console.log('Opening WebSocket connection...');
    this.webSocket = new WebSocket('ws://localhost:8080/login');

    this.webSocket.onopen = (event) => {
      console.log('WebSocket connection opened:', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('Message received from WebSocket:', event.data);
      const chatMessageDto = JSON.parse(event.data) as ChatMessageDto;
      this.chatMessagesSubject.next([chatMessageDto]);
    };

    this.webSocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      this.webSocket = null;
    };

    this.webSocket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    if (this.webSocket) {
      if (this.webSocket.readyState === WebSocket.OPEN) {
        console.log('Sending message through WebSocket:', chatMessageDto);
        this.webSocket.send(JSON.stringify(chatMessageDto));
      } else {
        console.error('WebSocket is not open. ReadyState:', this.webSocket.readyState);
      }
    } else {
      console.error('WebSocket is not open');
    }
  }

  public closeWebSocket() {
    if (this.webSocket) {
      console.log('Closing WebSocket connection...');
      this.webSocket.close();
      this.webSocket = null;
    } else {
      console.warn('WebSocket is already closed or was never opened');
    }
  }

  ngOnDestroy() {
    this.closeWebSocket();
  }
}
