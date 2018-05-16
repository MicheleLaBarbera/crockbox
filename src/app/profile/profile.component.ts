import { Component, OnInit } from '@angular/core';

import { FileService } from '../_services/file.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  userFiles: any;

  constructor(private fileService: FileService, private modalService: ModalService) {
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
}
