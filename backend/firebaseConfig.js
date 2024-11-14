import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

const serviceAccount = JSON.parse(
  readFileSync(path.resolve('serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db };
