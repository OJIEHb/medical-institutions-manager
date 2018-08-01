import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from '../../../../node_modules/rxjs/operators';
import { of } from '../../../../node_modules/rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  error = null;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  login() {
    this.authService
      .login(this.loginFormGroup.value)
      .pipe(catchError(error => {
        this.error = error;
        console.log(error);
        return of(null);
      }))
      .subscribe((res) => {
        if (res)
          this.router.navigate(['/'])
      })
  }
}
