import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DownloadService } from '../_services/download.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  currentUser: any;

  constructor(private route: ActivatedRoute, private downloadService: DownloadService, private modalService: ModalService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(!this.currentUser) {
        this.downloadService.downloadFile(params.id).subscribe(result => {
          if(result.status == 404) {
            this.modalService.error("Errore 404", "Il file richiesto non è stato trovato.", true);
          }
          else {
            var binaryData = [];
            var decodedData = window.atob(result.fileContent);
            binaryData.push(decodedData);
            var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = result.fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            this.modalService.success("Download Avviato", "Grazie per aver scaricato!", true);
          }
        });
      }
      else {
        this.downloadService.downloadUserFile(this.currentUser.username, params.id).subscribe(result => {
          if(result.status == 404) {
            this.modalService.error("Errore 404", "Il file richiesto non è stato trovato.", true);
          }
          else {
            var binaryData = [];
            var decodedData = window.atob(result.fileContent);
            binaryData.push(decodedData);
            var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = result.fileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            this.modalService.success("Download Avviato", "Grazie per aver scaricato!", true);
          }
        });
      }
    });
  }
}
