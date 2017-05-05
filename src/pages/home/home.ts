import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import {
	GoogleMaps,
	GoogleMap,
	GoogleMapsEvent,
	LatLng,
	CameraPosition,
	MarkerOptions,
	Marker
} from '@ionic-native/google-maps';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	map: GoogleMap;

	constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController) {
		platform.ready().then(() => {
			this.loadMap();
		});
	}

	loadMap() {

		let location = new LatLng(-34.9290, 138.6010);

		this.map = new GoogleMap('map', {
			'backgroundColor': 'white',
			'controls': {
				'compass': true,
				'myLocationButton': true,
				'indoorPicker': true,
				'zoom': true
			},
			'gestures': {
				'scroll': true,
				'tilt': true,
				'rotate': true,
				'zoom': true
			},
			'camera': {
				'latLng': location,
				'tilt': 30,
				'zoom': 15,
				'bearing': 50
			}
		});
		let selfMap = this.map
		let self = this
		this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
			selfMap.addMarker({
				position: location,
				title: 'Markert de prueba',
				markerClick: function () {
					self.showConfirm()
				}
			})
			console.log('Map is ready!');
		});

	}

	showConfirm() {
		let confirm = this.alertCtrl.create({
			title: 'Nueva Solicitud',
			message: `<div><legend><center></center></legend>'
						<div>
						<h3>Juan Romero</h3>
						<ion-item>
							<ion-range [(ngModel)]="brightness">
								<ion-icon range-left small name="sunny"></ion-icon>
								<ion-icon range-right name="sunny"></ion-icon>
							</ion-range>
						</ion-item>
						<p>Comprar en Restaurant</p>
					</div>
					<legend></legend>
					<p>Detalles de la compra(price)</p>
					<p>Dirección de entrega</p>
					<p>Datos</p>
					<ion-grid>
						<ion-row>
							<ion-col col-6>
								<button ion-button color="light">RECHAZAR</button>
							</ion-col>
							<ion-col col-6>
								<button ion-button>Aceptar</button>
							</ion-col>
						</ion-row>
					</ion-grid></div>`,
			buttons: [
				{
					text: 'RECHAZAR',
					handler: () => {
						console.log('Disagree clicked');
					}
				},
				{
					text: 'ACEPTAR',
					handler: () => {
						console.log('Agree clicked');
					}
				}
			]
		});
		confirm.present();
	}
}
