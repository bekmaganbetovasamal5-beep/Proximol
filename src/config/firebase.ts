import admin from 'firebase-admin';

// Check if Firebase Admin SDK is already initialized
if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export const firebaseAdmin = admin;
export const messaging = admin.messaging();