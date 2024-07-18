import * as admin from 'firebase-admin';

// TODO: Convertir a config service
admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: 'your_client_email',
    privateKey: 'your_private_key',
    projectId: 'your_project_id',
  }),
  databaseURL: 'http://localhost:8080', // Esto es correcto para la URL de la base de datos
});

admin.firestore().settings({
  host: 'localhost:8080',
  ssl: false,
});

export const firestore = admin.firestore();
