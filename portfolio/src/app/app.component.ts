import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  // This is an ugly hack to reroute from 404.html to index.html and keep the /path
  // This is due to github pages and angular routing not getting the relative/absolute url thing.
  // I'd rather do someway else, but I didn't get any of the other suggested methods to work.
  // Hence, we live in hack-ville, south-eastern corner of the hellscape that is webdev.
  // https://medium.com/swlh/how-to-host-your-angular-reactjs-vuejs-spa-on-github-pages-2d9ab102ac7b
  constructor(private router: Router) {
    let path = localStorage.getItem('path');
    if(path) {
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }
  }    
}
