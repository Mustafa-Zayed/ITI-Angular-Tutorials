import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Component directive
  templateUrl: './app.component.html',
  // template: `<h1>Hello World</h1>`, // if the html of component is is small and not worth putting it in another separate file.
  styleUrls: ['./app.component.scss']
  // styles: ['h1 {color: red}']
})
export class AppComponent {
  public title = 'CourseDemo';

  sayHello(){
    return `sayHello ${this.title}`;
  }
}
