import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private currentId: string;
  private currentCf: string = null;
  private currentDateToPrint: string;

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
  ) {}

  set cf(cf: string) {
    this.currentCf = cf;
  }

  set dataId(id: string) {
    console.log("SET");
    console.log(id);
    this.currentId = id;
    console.log(this.currentId);
  }

  get dataId() {
    return this.currentId;
  }

  set currentDate(date: string) {
    this.currentDateToPrint = date;
  }

  get currentDate() {
    return this.currentDateToPrint;
  }

  get data() {
    let url: string;
    if (this.currentCf) {
      url = `http://${environment.serverIp}/user/my_recordings?id=${this.currentId}&cf=${this.currentCf}`;
    } else {
      url = `http://${environment.serverIp}/user/my_recordings?id=${this.currentId}`;
    }

    return this.auth.token.then(token => {
      return this.http.get(
        url,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          })
        }
      ).toPromise();
    });

  }

}
