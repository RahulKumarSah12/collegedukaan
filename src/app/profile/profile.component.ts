import { Component, OnInit } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  constructor(private router: Router, private myService: SignupCreateAccountService) {}
  ngOnInit(): void {
    this.onClick();
  }
  userEmail = localStorage.getItem('userEmail');
  products: any[] = [];

  onClick() {
    const email = localStorage.getItem('userEmail');

    if (email) {
      this.myService.getallMyProducts({ email }).subscribe(
        async (res: any) => {
          console.log("Rahul");
          console.log(res);
          console.log(res.allMyProducts);
        },
        (err: any) => {
          console.error('Error fetching products', err);
          return of([]);
        }
      );
    }
  }


  goBack(): void {
    this.router.navigate(['main-page']); 
  }
}
