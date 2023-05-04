import { Injectable } from '@angular/core';
import {Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from '@angular/fire/auth';
import {signOut} from '@angular/fire/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  async register ({email, password}) {
    try{
      const user=createUserWithEmailAndPassword(this.auth,email,password);
      return user;
    }catch(e){
      return null;
    }
  }

  async login ({email, password}) {
    try{
      const user=signInWithEmailAndPassword(this.auth,email,password);
      localStorage.setItem('email',email)
      return user;
    }catch(e){
      localStorage.removeItem('email')
      return null;
    }
  }

  logout (){
    return signOut(this.auth); 
  }
}
