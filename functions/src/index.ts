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
        password: hashedPassword,
      });

      logger.info(`Password generated and updated for user ${userId}`);
    }

    return null;
  });

// exports.calculateCustomerAgeOnCreate = functions.firestore
//   .document('customers/{customerId}')
//   .onCreate(async (snap, context) => {
//     const customerId = context.params.customerId;
//     const customerData = snap.data();
//     const customerBirthdate =
//       customerData.birthdate as admin.firestore.Timestamp;
//     const customerBirthdateMapped = customerBirthdate.toDate();

//     logger.info(`The customer's id is: ${customerId}`);
//     logger.info(`The customer birthdate is: ${customerBirthdateMapped}`);

//     const today = new Date();

//     if (customerBirthdateMapped > today) {
//       logger.error('The date cannot be in the future');

//       return {
//         status: 400,
//         error: 'The date cannot be in the future',
//       };
//     }

//     // Age calculation
//     let age = today.getFullYear() - customerBirthdateMapped.getFullYear();
//     const monthDiff = today.getMonth() - customerBirthdateMapped.getMonth();
//     const dayDiff = today.getDate() - customerBirthdateMapped.getDate();

//     // Adjustment if the birthday has not yet passed in the current year
//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//       age--;
//     }

//     await admin.firestore().collection('customers').doc(customerId).update({
//       age: age,
//     });

//     logger.info(
//       `Age calculated successfully for customer with id: ${customerId}`,
//     );

//     return {
//       status: 200,
//       message: 'Age was successfully calculated and assigned.',
//     };
//   });

// exports.calculateCustomerAgeOnUpdate = functions.firestore
//   .document('customers/{customerId}')
//   .onUpdate(async (change, context) => {
//     const customerId = context.params.customerId;
//     const beforeData = change.before.data();
//     const afterData = change.after.data();

//     if (beforeData.birthdate !== afterData.birthdate) {
//       const customerBirthdate = afterData.birthdate;

//       let customerBirthdateMapped;
//       if (customerBirthdate && customerBirthdate.toDate) {
//         customerBirthdateMapped = customerBirthdate.toDate();
//       } else if (customerBirthdate instanceof Date) {
//         customerBirthdateMapped = customerBirthdate;
//       } else if (
//         typeof customerBirthdate === 'string' ||
//         customerBirthdate instanceof String
//       ) {
//         customerBirthdateMapped = new Date(String(customerBirthdate));
//       } else {
//         logger.error('Invalid birthdate format');
//         return {
//           status: 400,
//           error: 'Invalid birthdate format',
//         };
//       }

//       logger.info(`The customer's id is: ${customerId}`);
//       logger.info(
//         `The updated customer birthdate is: ${customerBirthdateMapped}`,
//       );

//       const today = new Date();

//       if (customerBirthdateMapped > today) {
//         logger.error('The date cannot be in the future');
//         return {
//           status: 400,
//           error: 'The date cannot be in the future',
//         };
//       }

//       let age = today.getFullYear() - customerBirthdateMapped.getFullYear();
//       const monthDiff = today.getMonth() - customerBirthdateMapped.getMonth();
//       const dayDiff = today.getDate() - customerBirthdateMapped.getDate();

//       if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//         age--;
//       }

//       await admin.firestore().collection('customers').doc(customerId).update({
//         age: age,
//       });

//       logger.info(
//         `Age calculated successfully for customer with id: ${customerId}`,
//       );

//       return {
//         status: 200,
//         message: 'Age was successfully calculated and assigned.',
//       };
//     }

//     return {};
//   });

async function calculateAndAssignAge(
  customerId: string,
  customerBirthdate: any,
) {
  let customerBirthdateMapped;
  if (customerBirthdate && customerBirthdate.toDate) {
    customerBirthdateMapped = customerBirthdate.toDate();
  } else if (customerBirthdate instanceof Date) {
    customerBirthdateMapped = customerBirthdate;
  } else if (
    typeof customerBirthdate === 'string' ||
    customerBirthdate instanceof String
  ) {
    customerBirthdateMapped = new Date(String(customerBirthdate));
  } else {
    logger.error('Invalid birthdate format');
    return {
      status: 400,
      error: 'Invalid birthdate format',
    };
  }

  logger.info(`The customer's id is: ${customerId}`);
  logger.info(`The customer birthdate is: ${customerBirthdateMapped}`);

  const today = new Date();

  if (customerBirthdateMapped > today) {
    logger.error('The date cannot be in the future');
    return {
      status: 400,
      error: 'The date cannot be in the future',
    };
  }

  // Age calculation
  let age = today.getFullYear() - customerBirthdateMapped.getFullYear();
  const monthDiff = today.getMonth() - customerBirthdateMapped.getMonth();
  const dayDiff = today.getDate() - customerBirthdateMapped.getDate();

  // Adjustment if the birthday has not yet passed in the current year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  await admin.firestore().collection('customers').doc(customerId).update({
    age: age,
  });

  logger.info(
    `Age calculated successfully for customer with id: ${customerId}`,
  );

  return {
    status: 200,
    message: 'Age was successfully calculated and assigned.',
  };
}

exports.calculateCustomerAgeOnCreate = functions.firestore
  .document('customers/{customerId}')
  .onCreate(async (snap, context) => {
    const customerId = context.params.customerId;
    const customerData = snap.data();
    const customerBirthdate = customerData.birthdate;
    return calculateAndAssignAge(customerId, customerBirthdate);
  });

exports.calculateCustomerAgeOnUpdate = functions.firestore
  .document('customers/{customerId}')
  .onUpdate(async (change, context) => {
    const customerId = context.params.customerId;
    const beforeData = change.before.data();
    const afterData = change.after.data();

    if (beforeData.birthdate !== afterData.birthdate) {
      const customerBirthdate = afterData.birthdate;
      return calculateAndAssignAge(customerId, customerBirthdate);
    }

    return {};
  });
