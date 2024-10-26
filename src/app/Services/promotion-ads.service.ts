import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionAdsService {
  private adsList: string[];
  constructor() {

    // static data, usually fetched from the backend.
    this.adsList = [
      'Big Discounts',
      'Sale up to 50%',
      'Check our white Friday offers',
      // '',
      'Special white Friday offers up to 70%',
    ];
  }

  // If there's no Observable and we want to return an adv at every specified time, we will use  
  // setInterval with return statement for the advs , completing and errors. But it's not a good idea
  // as the function will be terminated after the first return. So, we will use Observable.
  getScheduledAds(intervalInSeconds: number): Observable<string> {
    return new Observable<string>((observer) => {
      let counter = 0;

      let adsTimer = setInterval(() => {
        console.log('In interval');
        
        if (counter == this.adsList.length) 
          observer.complete();

        if (this.adsList[counter] == '') 
          observer.error('Error: Empty ad.'); // will stop the Observable

        observer.next(this.adsList[counter++]);
      }, intervalInSeconds * 1000);

      // Thus, the unsubscribe() function is not preemptively executed before the setInterval 
      // completes; rather, it is called as a response to certain actions 
      // (manual unsubscription, error, or completion).
      return {
        unsubscribe() {
          //Will be called:
          // 1- Error
          // 2- Complete
          // 3- unsubscribe()
          clearInterval(adsTimer);
          console.log('In Obs Unsubscribe...');
        }
      };

      // alternative syntax for unsubscribe()
      // return () => {
      //   clearInterval(adsTimer);
      //   console.log('In Obs Unsubscribe...');
      // };
    
    });
  }

}
