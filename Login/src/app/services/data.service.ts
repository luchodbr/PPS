import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usuarioTest: Usuario = { 
    id : 0,
    email: 'pepito@mail.com', 
    pass: 'Secreta'
  }; 
  private usuarios: Usuario[] = [];
  private static idUsuario = 0;

  constructor(private storage: Storage, private firebaseAuth: AngularFireAuth) 
  {
    this.cargarUsuarios();
  }

  login(usuario: Usuario)
  {
    // return this.test(usuario);
    console.log(usuario);
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.signInWithEmailAndPassword(usuario.email, usuario.pass)
                        .then(response => resolve(response),error => reject(error));
    });
  }

  registrar(usuario: Usuario)
  {
    return new Promise<any>((resolve,reject) => {
      this.firebaseAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass)
                        .then(response => resolve(response), error => reject(error));
    });

  }

  async cargarUsuarios()
  {
    const usuarios = await this.storage.get('usuarios');
    
    if(usuarios)
    {
      this.usuarios = usuarios;
      console.log("Se cargan usuarios", this.usuarios);
    }

  }

  gerUserDetail()
  {
    return this.firebaseAuth.currentUser;
  }

  test(usuario: Usuario)
  {
    return usuario.email == this.usuarioTest.email && usuario.pass == this.usuarioTest.pass;    
  }
}
