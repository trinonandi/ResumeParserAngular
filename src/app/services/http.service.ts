import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = "http://127.0.0.1:5000"
  markdownContent: string = "";
  apiKey: string | null = null;
  isChat: boolean = false;

  constructor(private httpClient: HttpClient) { }

  sendResumeToParse(file: File) {
    const url = `${this.baseUrl}/upload`
    const formData = new FormData()
    formData.append('pdfFile', file)

    return this.httpClient.post(url, formData, {
      responseType: 'text'
    })
  }

  sendQuery(query: string) {
    const url = `${this.baseUrl}/chat`
    const requestObj = {
      apiKey: this.apiKey,
      context: this.markdownContent,
      query: query
    }
    console.log(JSON.stringify(requestObj))
    return this.httpClient.post(url, requestObj, {
      responseType: 'text'
    })
  }

  setParams(markdown: string, apiKey: string | null, isChat: boolean) {
    this.apiKey = apiKey;
    this.markdownContent = markdown;
    this.isChat = isChat;
  }
  getIsChat() {
    return this.isChat;
  }

}
