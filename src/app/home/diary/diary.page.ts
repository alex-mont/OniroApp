import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { GoogleChartComponent } from 'angular-google-charts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService, Respons } from 'src/app/services/authentication/authentication.service';
import { ChartsService } from 'src/app/services/charts.service';
import { Router } from '@angular/router';

export interface Data {
  _id: Date;
  preview: Preview;
}

export interface Preview {
  apnea_events: number;
  avg_hr: number;
  avg_spo2: number;
  type: string;
}

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {
  private url = 'http://' + environment.serverIp + '/user/my_recordings';
  array: object[] = [];
  preview: Data[] = [];

  @ViewChild('chart')
  chart: GoogleChartComponent;

  constructor(
    private authService: AuthenticationService,
    private charts: ChartsService,
    private http: HttpClient,
    private menuCtrl: MenuController,
    private router: Router
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.menuCtrl.close();
    this.authService.token.then(token => {
      this.http.get<Respons>(
        this.url,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        }
      ).subscribe(res => {
        console.log(res);
        this.preview = res['payload'];
      });
    });
  }

  onclick(id: string) {
    const date = id.toString().substr(0, 10);
    this.charts.dataId = id;
    this.charts.currentDate = date;
    this.router.navigate(['/home/diary/diary-detail']);
  }

}
