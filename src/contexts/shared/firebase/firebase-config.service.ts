import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseConfigService {
  private firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY'),
        // .replace(/\\n/g, '\n'),
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      }),
      databaseURL: this.configService.get<string>('FIRESTORE_EMULATOR_URL'),
    });

    admin.firestore().settings({
      host: this.configService.get<string>('FIRESTORE_EMULATOR_HOST'),
      ssl: this.configService.get<boolean>('FIRESTORE_SSL', false),
    });

    this.firestore = admin.firestore();
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firestore;
  }
}
