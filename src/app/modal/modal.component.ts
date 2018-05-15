import { Component, OnInit } from '@angular/core';

import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  message: any;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.getMessage().subscribe(message => { this.message = message; });
  }
}
