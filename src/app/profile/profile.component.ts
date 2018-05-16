import { Component, OnInit, ViewChild } from '@angular/core';

import { FileService } from '../_services/file.service';
import { ModalService } from '../_services/modal.service';
import { UploadService } from '../_services/upload.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  userFiles: any;

  @ViewChild('file') file;
  public files: Set<File> = new Set();

  constructor(private uploadService: UploadService, private fileService: FileService, private modalService: ModalService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.fileService.getFiles(this.currentUser.username).subscribe(result => {
      this.userFiles = result;
    });
  }

  showLink(name, id) {
    this.modalService.success("Link: " + name, "http://localhost:4200/download/" + id);
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
              this.modalService.success("Upload Completato: " + fileName + "." + fileExtension, "http://localhost:4200/download/" + result.id);
              this.fileService.getFiles(this.currentUser.username).subscribe(result => {
                this.userFiles = result;
              });
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

  toggleState(file: any) {
    //console.log(!file.is_link_generated);
    var value = (file.is_link_generated == 0) ? 1 : 0;
    this.fileService.toggleState(this.currentUser.username, file.id, value).subscribe(result => {
      if(result.status == 200) {
        file.is_link_generated = value;
      }
    });
  }
}
