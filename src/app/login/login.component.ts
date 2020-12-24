import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  submitted: boolean = false;
  constructor(private router: Router, private _formBuilder: FormBuilder) {
    this.loginFormGroup = this._formBuilder.group({
      email_id: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  get f() { return this.loginFormGroup.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.router.navigate([`/user-list`]);
  }

  UserRegister() {
    this.router.navigate([`/user-registration`]);
  }

}
