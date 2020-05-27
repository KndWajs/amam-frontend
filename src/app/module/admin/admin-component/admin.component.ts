import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private readonly adminService: AdminService,
    private readonly alertService: AlertService) { }

  ngOnInit() {
  }

  getLogs() {
    this.adminService.getLogs()
      .subscribe(
        (data: Blob) => {
          const file = new Blob([data], { type: 'application/log' });
          const fileURL = URL.createObjectURL(file);

          // window.open(fileURL);
          const a = document.createElement('a');
          a.href = fileURL;
          a.target = '_blank';
          a.download = 'amam_log_' + formatDate(new Date(), 'yyyy-MM-dd_HH:mm:ss', 'en') + '.txt';
          document.body.appendChild(a);
          a.click();
        },
        (error) => {
          this.alertService.createErrorMessageForHttpResponseWithTitle(
            error,
            'Get logs'
          );
        }
      );
  }

}
