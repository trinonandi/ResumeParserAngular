// @ts-ignore
import { Component, ChangeEvent } from '@angular/core';
import { HttpService } from "../services/http.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.css']
})

export class UploadPdfComponent {
  selectedFile: File | null = null;
  markdownContent: string = "";
  parsing: boolean = false;
  editable: boolean = false;
  apiKey: string | null = null;

  constructor(private httpService: HttpService, private router: Router) { }

  onFileSelected(event: any) {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];
      if (this.isValidPdf(file)) {
        this.selectedFile = file;
      } else {
        console.error("Please select a PDF file.");
      }
    }
  }

  upload() {
    if (this.selectedFile) {
      this.parsing = true
      this.httpService.sendResumeToParse(this.selectedFile).subscribe((data) => {
        this.markdownContent = data;
        this.parsing = false;
      }, (error) => {
        this.markdownContent = ""
        this.parsing = false;
      })
    }
  }

  discardFile() {
    this.selectedFile = null;
    this.markdownContent = "";
  }
  private isValidPdf(file: File): boolean {
    return file.type === 'application/pdf';
  }

  onFileDropped(files: Array<any>) {
    const file: File = files[0]
    if (this.isValidPdf(file)) {
      this.selectedFile = file;
    } else {
      console.error("Please select a PDF file.");
    }
  }

  submitContent() {
    if (this.apiKey !== null && this.apiKey.length > 0) {

    }
  }

  setContentEdiatable() {
    this.editable = true;
  }

  saveEditedContent() {
    this.editable = false;
  }

  startChat() {
    this.httpService.setParams(this.removeMarkdown(this.markdownContent), this.apiKey, true);
    this.markdownContent = "";
    this.apiKey = null;
    this.router.navigate(['chat']);
  }

  removeMarkdown(text: string): string {
    if (!text) return text;
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  }
}
