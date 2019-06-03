import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import { Component, OnInit } from '@angular/core';
import { BluetoothService } from 'src/app/services/bluetooth/bluetooth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SelectDeviceComponent } from './select-device/select-device.component';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  isConnected = 'NOT YET';
  message = 'NO DATA YET';
  i = 0;

  constructor(
    private bluetooth: BluetoothSerial,
    private bluetoothService: BluetoothService,
    private modal: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.deviceSelection();
    /*
    this.bluetoothService.isEnabled().then(
      success => {
        if(!this.bluetoothService.device) {
          this.deviceSelection();
        }
      },
      error => {
        this.bluetooth.enable().then(
          success => {

          },
          error => {
            this.router.navigateByUrl('/home');
          }
        )
      }
    )
    
    this.bluetooth.connect('00:18:E4:40:00:06')
      .subscribe(
        success => {
          this.isConnected = "SUCCESSFULLY CONNECTED";
          this.bluetooth
            .subscribe('\n')
            .subscribe(
              success => {
                this.message = success;
                this.i++;
              },
              error => {
                this.message = error;
              }
            );
        },
        error => {
          this.isConnected = error;
        }
      );
      */
  }

  private deviceSelection() {
    this.modal.create({component: SelectDeviceComponent}).then(modal => {
      modal.present();
    })
  }

}