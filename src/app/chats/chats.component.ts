import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ChatMessageDto } from '../models/ChatMessageDto';
import { WebSocketService } from '../service/web-socket.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  imports:[CommonModule,ReactiveFormsModule,FormsModule],
  standalone:true
})
export class ChatComponent implements OnInit, OnDestroy {
  chatMessages: ChatMessageDto[] = [];

  constructor(public webSocketService: WebSocketService, private authService: AuthService) {}

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.webSocketService.chatMessages$.subscribe(messages => {
      this.chatMessages = messages;
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const chatMessageDto = new ChatMessageDto(currentUser, sendForm.value.message);
      this.webSocketService.sendMessage(chatMessageDto);
      sendForm.controls['message'].reset();
    } else {
      console.error('User is not logged in');
    }
  }
}
