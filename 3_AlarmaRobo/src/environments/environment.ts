// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBjiLR_vIfMVcnBF1NKGcE08kwZf9__Fkg",
    authDomain: "tpspps-df97e.firebaseapp.com",
    databaseURL: "https://tpspps-df97e-default-rtdb.firebaseio.com",
    projectId: "tpspps-df97e",
    storageBucket: "tpspps-df97e.appspot.com",
    messagingSenderId: "598658076037",
    appId: "1:598658076037:web:8310a6255ba287a52848ec"
  },
  perfiles: {
    admin: {
      email: "admin@mail.com",
      pass: "sarasa",
      rol: "Administrador"
    },
    tester: {
      email: "tester@mail.com",
      pass: "sarasa",
      rol: "Tester"
    },
    usuario: {
      email: "usuario@mail.com",
      pass: "sarasa",
      rol: "Usuario"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
