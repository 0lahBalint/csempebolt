import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideFirebaseApp(() => initializeApp({ projectId: "csempebolt-8bf48", appId: "1:959055716669:web:9a9a6b77c026209739e554", storageBucket: "csempebolt-8bf48.firebasestorage.app", apiKey: "AIzaSyB1Mkccs3uVAgz_HtSCuuE4nGHcNQ3udms", authDomain: "csempebolt-8bf48.firebaseapp.com", messagingSenderId: "959055716669", measurementId: "G-H2Y65F8LG2" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
};
