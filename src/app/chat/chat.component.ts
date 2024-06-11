import { Component } from '@angular/core';
import { Chat } from './chat';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  question: string | null = null;
  chatConversation: Chat[] = [];

  constructor(private httpService: HttpService) { }

  sendMessage() {
    const query = this.question;

    if (query) {
      //add human message
      const humanMessage: Chat = { person: "you", response: query, cssClass: "human-message" }
      this.chatConversation.push(humanMessage)
      let botMessage: Chat | undefined = { person: "bot", cssClass: "bot-message", response: null }
      this.chatConversation.push(botMessage)
      this.question = null;
      //send query to backend and add gpt resopnse message
      this.httpService.sendQuery(query).subscribe(data => {
        botMessage = this.chatConversation.pop();
        if (botMessage) {
          botMessage.response = data;
          this.chatConversation.push(botMessage)
        }
      }, (error) => {
        botMessage = this.chatConversation.pop();
        if (botMessage) {
          botMessage.response = error.message;
          this.chatConversation.push(botMessage)
        }
      });
    }

  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

}
