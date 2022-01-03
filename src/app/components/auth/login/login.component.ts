import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser;
  username : string;
  password: string;
  roles: string[] = [];
  msgError: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void{
    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.signin(this.loginUser).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
        this.toastr.success('Bienvenido '+data.username, 'Ok!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      },
      err => {
        this.isLogged = false;
        console.log("error: ",err);
       // this.msgError = err.error.message;
       this.toastr.error('Error', 'Fail!',{
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
        
      }
    );
  }

}
