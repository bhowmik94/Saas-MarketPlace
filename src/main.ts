import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseApp = initializeApp(environment.firebase);
const auth = getAuth(firebaseApp);

// Wait for Firebase to initialize
getAuth().onAuthStateChanged(() => {
  // Now bootstrapping the app
  bootstrapApplication(AppComponent, {
    providers: [
      ...appConfig.providers,
      provideFirebaseApp(() => firebaseApp),
      provideAuth(() => auth),
      // other providers
    ],
  });
});
