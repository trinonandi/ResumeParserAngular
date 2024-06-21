import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Chat } from './chat';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  question: string | null = null;
  apiKey: string | null = null;
  markdownContent: string = "";
  initialMessage : string = "Hi I am an AI Resume expert and I can help you to analyze resume. Try asking me some questions related to a job description, technical and non technical skills, etc.";
  chatConversation: Chat[] = [{person: "bot", cssClass: "bot-message", response: this.initialMessage}];
  private subscription: Subscription = new Subscription;

  constructor(private httpService: HttpService, private router: Router, private location: Location) { }
  ngOnInit(): void {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.location.isCurrentPathEqualTo(event.url)) {
          // Detecting browser back button press
          console.log("Ending session");
          this.endSession();
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  adjustTextAreaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  sendMessage() {
    const query = this.question;
    console.log(this.apiKey);

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

  endSession() {
    console.log("Ending session");
    this.httpService.setParams("", null, false);
    this.router.navigate(["/"]);
  }

}
