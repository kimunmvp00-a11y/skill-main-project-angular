const admin = require("firebase-admin");
const data = require("./habilidades.js");
const serviceAccount = require("../../../../skill-main-angular-firebase-adminsdk-fbsvc-262150f498.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importData() {
    const batch = db.batch();

    data.forEach((item) => {
        const docRef = db.collection("skills").doc(); // Auto-ID
        batch.set(docRef, item);
    });

    await batch.commit();
    console.log("✅ Datos importados correctamente");
}

importData().catch(console.error);