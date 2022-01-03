import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLogged= false;
  name: string;
  username: string;
  email: string;
  password: string;
  newUser: NewUser;
  error: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

  onRegister(): void{
    const newUser = new NewUser(this.name, this.username, this.email, this.password);
    this.authService.signup(newUser).subscribe(
      data =>{
        this.toastr.success('Bienvenido '+data.username, 'Ok!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);
      },
      err =>{
        this.error = err.error.message;
        
        this.toastr.error(this.error, 'Ok!',{
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    );
  }

}
