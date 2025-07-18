import { Component, OnInit } from '@angular/core';
import moduleData from '../../assets/module-data.json';

@Component({
  selector: 'app-config-cards',
  templateUrl: './config-cards.component.html',
  styleUrls: ['./config-cards.component.scss']
})
export class ConfigCardsComponent implements OnInit {
  modules = moduleData;
  constructor() { }

  ngOnInit(): void {
  }

}
