import { Component, OnInit } from '@angular/core';
import { StoreData } from 'src/app/ViewModels/store-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name: string;
  storeDate: StoreData;
  isImageShown: boolean = true;

  constructor() {
    this.name = 'Ahmed';

    this.storeDate = new StoreData(
      "Mustafa's Store",
      'https://picsum.photos/400/200',
      ['Cairo', 'Giza', 'Alex', 'Luxor']
    );
  }

  toggleImage() {
    this.isImageShown = !this.isImageShown
  }

  ngOnInit(): void {}
}
