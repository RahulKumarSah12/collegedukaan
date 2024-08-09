import { Component } from '@angular/core';
import { loadTranslations } from '@angular/localize';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  onClick(){
    const email = localStorage.getItem('userEmail');
  }
}
