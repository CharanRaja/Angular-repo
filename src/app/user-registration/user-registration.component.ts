import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  userFormGroup: FormGroup;
  fileInfo: string;
  submitted: boolean = false;

  constructor(private _formBuilder: FormBuilder, private router: Router) {
    this.userFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email_id: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      mobile: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      file: ['']
    });
    this.userFormGroup.get('confirmPassword').valueChanges.subscribe((data: any) => {
      if (this.userFormGroup.get('password').value !== data && this.userFormGroup.get('password').value !== '') {
        this.userFormGroup.controls.confirmPassword.setErrors({ 'passwordMatch': true });
      } else if (this.userFormGroup.get('password').value === '') {
        this.userFormGroup.controls.confirmPassword.setErrors({ 'passwordNotMatch': true });
      }
    })
  }
  ngOnInit() {
  }

  get f() { return this.userFormGroup.controls; }

  onSubmit() {
    console.log(this.userFormGroup.value);
    this.submitted = true;
    if (this.userFormGroup.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userFormGroup.value, null, 4));
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userFormGroup.patchValue({
      file: file
    });
    this.userFormGroup.get('file').updateValueAndValidity();
    this.fileInfo = (event.target as HTMLInputElement).files[0].name;
  }

  back() {
    this.router.navigate([`/login`]);
  }

}
