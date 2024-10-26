import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription } from 'rxjs';
import { PromotionAdsService } from 'src/app/Services/promotion-ads.service';
import { StoreData } from 'src/app/ViewModels/store-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  name: string;
  storeDate: StoreData;
  isImageShown: boolean = true;
  // adsSubscription!: Subscription;
  adsSubscriptionList: Subscription[] = [];

  constructor(private promotionAdsService: PromotionAdsService) {
    this.name = 'Ahmed';

    this.storeDate = new StoreData(
      "Mustafa's Store",
      'https://picsum.photos/400/200',
      ['Cairo', 'Giza', 'Alex', 'Luxor']
    );
  }

  ngOnInit(): void {
    // A handler for receiving observable notifications implements the Observer interface.
    // It is an object that defines callback methods to handle the three types of notifications 
    // that an observable can send.
    let observer : Observer<string> = {
      next: (data: string) => {
        console.log(data);
      },
      error: (err: string) => {
        console.log(err);
      },
      complete: () => {
        console.log('Ads Finished!');
      }
    };

    // this.adsSubscription = this.promotionAdsService.getScheduledAds(3).subscribe(observer);

    let sub = this.promotionAdsService.getScheduledAds(2).subscribe(observer);
    this.adsSubscriptionList.push(sub);

    
  }

  ngOnDestroy(): void {
    // this.adsSubscription.unsubscribe();

    this.adsSubscriptionList.forEach((sub) => sub.unsubscribe());
  }

  toggleImage() {
    this.isImageShown = !this.isImageShown;
  }
}
