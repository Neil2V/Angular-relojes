import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8081/auth/'

  constructor(
    private http : HttpClient
  ) { }

  public signin(loginUser: LoginUser): Observable<JwtDto>{
    return this.http.post<JwtDto>(this.authUrl+'login', loginUser);
  }

  public signup(newUser: NewUser): Observable<any>{
    return this.http.post<any>(this.authUrl+'new', newUser);
  }

}
