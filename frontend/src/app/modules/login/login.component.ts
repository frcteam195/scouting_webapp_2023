import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Access } from '../../access';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string = "";
  pass: string = "";


  apiAccess: Access[] = [];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { 


    
  }

  ngOnInit(): void {
  }



  clickLogin(user: string, pass: string) {

    this.apiService.getUserAccess(user,pass);

  }

  clickLogout() {

    localStorage.setItem('alliance', '0');

  }


}
