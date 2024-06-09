import { Component } from '@angular/core';
import { Chat } from './response';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  question: string | null = null;
  chatConversation: Chat[] = [];

  sendMessage() {
    const queary = this.question;

    if (queary)
      console.log(queary);
    //add human message
    const humanMessage: Chat = { person: "you", response: queary, cssClass: "human-message" }
    this.chatConversation.push(humanMessage)
    this.question = null;
    //send query to backend and add gpt resopnse message
    const botMessage: Chat = { person: "bot", response: queary, cssClass: "bot-message" }
    this.chatConversation.push(botMessage)
  }

}
