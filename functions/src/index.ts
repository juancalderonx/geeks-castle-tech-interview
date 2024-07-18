import * as logger from 'firebase-functions/logger';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';

admin.initializeApp();

exports.generatePasswordOnCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const userData = snap.data();

    if (!userData.password) {
      const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

      let password = '';

      for (let i = 0, n = charset.length; i < 12; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await admin.firestore().collection('users').doc(userId).update({
        password: hashedPassword, // test
      });

      logger.info(`Password generated and updated for user ${userId}`);
    }
  });
