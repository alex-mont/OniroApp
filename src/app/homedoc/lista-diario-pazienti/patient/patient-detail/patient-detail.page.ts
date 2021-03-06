/**
 * This is the page associated to the daily information of the patient about his sleep.
 * It contains all the information recorded during the night.
 */
import { Component, OnInit } from '@angular/core';
import { ChartsService, Aggregate, ApneaEvent } from 'src/app/services/charts.service';
import { Bevanda } from 'src/app/home/add-abitudini/bevanda.model';
import { ControllerService } from 'src/app/services/controllerService.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

import 'hammerjs';
import { ApneaPopoverComponent } from './apnea-popover/apnea-popover.component';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.page.html',
  styleUrls: ['./patient-detail.page.scss'],
})
export class PatientDetailPage implements OnInit {
  cf: string;
  date: string;

  isLoaded = false;
  currentDate: string;
  aggregate: Aggregate;
  caffe: Bevanda;
  drink: Bevanda;
  cena: string;
  sport: string;

  charts: Array<{
    title: string;
    type: string;
    data: Array<Array<string | number | {}>>;
    roles: Array<{
      type: string;
      role: string;
      index?: number;
    }>;
    columnNames?: Array<string>;
    options?: {};
  }> = [];

  constructor(
    private alertCtrl: AlertController,
    private chartsService: ChartsService,
    private controllerService: ControllerService,
    private network: Network,
    private popoverCtrl: PopoverController,
    private router: Router
  ) { }

  ngOnInit() { }

  /**
   * This method is called every time the page is shown.
   * It allows to retrieve all the information about the data recorded during the night.
   * It also allows to plot some charts to better evaluate the events occured in the night.
   */
  ionViewWillEnter() {
    if (this.network.type === this.network.Connection.NONE) {
      this.alertCtrl.create({
        header: 'Error',
        message: 'È necessaria una connessione a internet per accedere a questa funzione',
        buttons: [{
          text: 'Ok',
          handler: () => { this.router.navigate(['/homedoc']); }
        }]
      }).then(alert => { alert.present(); });
    } else {
      if (!this.chartsService.dataId) {
        this.router.navigate(['/homedoc']);
      }
      this.cf = this.chartsService.cf;
      this.date = this.chartsService.dataId.toString().substr(0, 10);
      this.controllerService.onCreateLoadingCtrl();
      this.chartsService.aggregate.subscribe(data => { this.aggregate = data });
      this.chartsService.caffe.subscribe(data => { this.caffe = data });
      this.chartsService.cena.subscribe(data => { this.cena = data });
      this.chartsService.drink.subscribe(data => { this.drink = data });
      this.chartsService.sport.subscribe(data => { this.sport = data });
      this.chartsService.charts.then(charts => {
        this.charts = charts;
        this.controllerService.onDismissLoaderCtrl();
        if (this.charts.length === 0) {
          this.alertCtrl
            .create({
              header: 'Error',
              message: 'Si è verificato un errore',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.router.navigate(['/home']);
                  }
                }
              ]
            })
            .then(alert => {
              alert.present();
            });
        }
      });
      this.isLoaded = true;
    }
  }

  /**
   * This method is called when the patient keeps pressed the apnoea event.
   * It allows to show the PopOver with all the information of the event.
   * @param events The information about the apnoea event: duration and time.
   */
  onPress(events: ApneaEvent[]) {
    this.popoverCtrl.create({
      component: ApneaPopoverComponent,
      componentProps: {
        'events': events
      }
    }).then(popover => {
      popover.present();
    });
  }

  /**
   * This method allows to close the PopOver once it is released.
   */
  onRelease() {
    this.popoverCtrl.dismiss();
  }
}
