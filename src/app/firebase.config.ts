import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { environments } from "@environments/environments";


const firebaseProviderFrom: EnvironmentProviders =
importProvidersFrom(
  provideFirebaseApp(() =>
    initializeApp(
      environments.firebase
    ),
  ),
  provideFirestore(() => getFirestore())
);
export { firebaseProviderFrom }

