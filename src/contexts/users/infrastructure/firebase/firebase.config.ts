import * as admin from 'firebase-admin';

// TODO: Convertir a config service
admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail:
      'firebase-adminsdk-lieuw@geeks-test-64c32.iam.gserviceaccount.com',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYICpLa7LIuwBp\nQZgeSAcIGJbVZ9g2dTmtb5zhhC1+jn3IMPk79pUkVWvsYUOSAmDVPx9VGI+d4Pvt\nBxG2btEBoTmYvXo/LF1jwBDHBIuosllUdJcfR/SO1/6XZ918izMLDYG3EXVyaS85\n1FXrW+l0yL/lR+3RuKh2MkzcxEjYT7NmIkAVB9QbF3xsQb0j7cSN0s7GR7vrLKac\nLlzHd45uxSeY1fheGIkD3eFXF+e4cKmmU4WqwugbxiDxa0bYQH0UtAtdA0yVt9eO\nYIF2zjGwVWxilFyoAhwJQAzxuO+VZlG8+8INUl4SmpVnzXh2uHKwW6CVj2UJv/B+\nO1CGPndXAgMBAAECggEAAesh7WqRyiNFmY44t2UMJad9u3pASUuIKy5FqbhrhHWS\nk4Q+mGl/LwKexk/htMUv6HCP2hhhs0mDk9UrfYP/QciBO/JjyMkr8laZP5FIm5uI\nMd74iu3y4RxLOyiVq/zra1/Du4XOV9+It298l+fEVXM0rFUQZD0ybq8qtfwJuSSf\nMXM//U0v4IYtvvvc37SWGxTP9eWBECwzycuLflEMbnJL4wmba1jBdY3xlBLZ6QvS\nvD4AdGOjWw470vNkxrDONIswle+hemMYDajf5RDSof4UYzxQU0TymCTOxHog7k9v\nzsYLcZ9aIvx14c2anuRYByd84AIFRyWM5yviDB2kLQKBgQDKKzLOL67B1lq4+bEA\nkLoe8cXYF/Vp7BXfUVf6MDIEybHE8d/6GEhqhdVDHKCBeNd3ucallnYXwtrQ6dbF\nPFcyspMm2RpGfpPi13zNp37qxO16QtVDGoGFnnsn9tYRifNhu5GpqbKV5JQ6DriQ\n/lnSyvoqYoOWRZuHk40FXpXDIwKBgQDAocldl4xu0Lj2gRbl53ab9KleiLL4vJFK\n7r3TiLNrIxG7wPseCQy7vn1ZTk/B9pUUyck2r3N0mrYTG8z2qiJQn/RAASIK4sWo\nmD9eVxAu+NBdgY/Ye0xIpOAt1eeKvl1fwadbPb6FU3koAR6vQO/q2ojxyXUH3IKO\nK/KGAYCoPQKBgFIymieG75DULHLE4piOP35RYtVneFqmqIXxtsl8SvnzX5npld1D\nfj4BSCJPQ1sg3MpK+F9e+4jRqtICIVZ0ICf2vymuX6aF1G8Imi+riEi/5KYvAjKU\nVlETjJNFIuhipFf6QVEwM/IJy9KHJbeeErtH18rf3wx8JK5M6atjN5TtAoGAJqMM\nuZoBD+ULhF3mEtz3PFa5df2jMCLaXZY/OuOLYSzajLcrZx3XkPynNbdwZe4ofs/u\nbOqKFNRHOtPzq3H6igNbQU843cgYbzWCWFDMLS+401h+WqR4a4WudWMXGwwNvHwi\nLjnXMfTJM03uMqaquId2ulB3Ccmf4hZMgbZhcN0CgYBcykIhdkk5i6gUgcR5euPK\nZE45TPju5wuY0kUb3/qvxee2kZSmVkUDWXMEUFzkVi5WVzj9alcpViTApRZEzq5o\nA7TUdtfTzFG8RWmq3OndpEIDPo4uofyMLVzmP8pmql8yrhXdtga0D40CcDuJUSMR\n9tzIu8V+okr3tT+iS0H+SQ==\n-----END PRIVATE KEY-----\n',
    projectId: 'geeks-test-64c32',
  }),
  databaseURL: 'http://localhost:8080',
});

admin.firestore().settings({
  host: 'localhost:8080',
  ssl: false,
});

export const firestore = admin.firestore();
