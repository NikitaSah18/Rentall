import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessageDto } from '../models/ChatMessageDto';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket: WebSocket | null = null;
  private chatMessagesSubject = new Subject<ChatMessageDto[]>();
  chatMessages$ = this.chatMessagesSubject.asObservable();

  constructor() {}

  public openWebSocket() {
    // Simulate WebSocket connection (since server endpoint doesn't exist)
    this.webSocket = new WebSocket('ws://localhost:8080'); // Adjust if necessary

    this.webSocket.onopen = (event) => {
      console.log('WebSocket connection opened:', event);
    };

    this.webSocket.onmessage = (event) => {
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
      this.webSocket.send(JSON.stringify(chatMessageDto));
    } else {
      console.error('WebSocket is not open');
    }
  }

  public closeWebSocket() {
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = null;
    }
  }
}
