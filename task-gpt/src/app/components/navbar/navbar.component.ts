import { Component, OnInit } from '@angular/core';
import { getAuth, User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userEmail: string | null = null;

constructor(){

}

ngOnInit(): void {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (user !== null) {
    this.userEmail = user.email;
  }
}

}
