import { Component, OnInit, ViewChild } from '@angular/core';

import { UploadService } from '../_services/upload.service';
import { ModalService } from '../_services/modal.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;
  @ViewChild('file') file;
  public files: Set<File> = new Set();

  constructor(private uploadService: UploadService, private modalService: ModalService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  onUploadAnon() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
        var fileNameArray = files[key].name.split(".");
        var fileExtension = fileNameArray[fileNameArray.length - 1];
        var fileName = files[key].name.substring(0, files[key].name.length - (fileExtension.length + 1));

        this.fileReaderObs(files[key]).subscribe(fileContent => {
          this.uploadService.uploadAnon(fileName, fileExtension, fileContent, files[key].size).subscribe(result => {
            if(result.status === 200) {
              this.modalService.success("Upload Completato", "http://localhost:4200/download/" + result.id);
            }
            else {
              console.log("Failed");
            }
          });
        });
      }
    }
  }

  onUploadUser() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
        var fileNameArray = files[key].name.split(".");
        var fileExtension = fileNameArray[fileNameArray.length - 1];
        var fileName = files[key].name.substring(0, files[key].name.length - (fileExtension.length + 1));

        this.fileReaderObs(files[key]).subscribe(fileContent => {
          this.uploadService.uploadUser(this.currentUser.username, fileName, fileExtension, fileContent, files[key].size).subscribe(result => {
            if(result.status === 200) {
              this.modalService.success("Upload Completato", "http://localhost:4200/download/" + result.id);
            }
            else {
              console.log("Failed");
            }
          });
        });
      }
    }
  }

  private fileReaderObs(file : File)  {
    let reader = new FileReader();
    let fileReaderObs = Observable.create((observer: any) => {
      reader.onload = function() {
        observer.next(btoa(reader.result));
        observer.complete();
      }
    })
    reader.readAsBinaryString(file);
    return fileReaderObs;
  }

  addFiles() {
    this.file.nativeElement.click();
  }
}
