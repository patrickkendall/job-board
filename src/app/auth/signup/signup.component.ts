import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false;

  constructor() { }

  onLogin(form: any) {
    console.log(form.value);
  }

  ngOnInit(): void {
  }


}
