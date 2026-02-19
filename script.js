// Apni Firebase Config yahan paste karein
const firebaseConfig = {
  apiKey: "AIzaSyBOZBSMC9CMZNzcNdV_tb7JEAu2v5AZJ20",
  authDomain: "smart-home-7239a.firebaseapp.com",
  databaseURL: "https://smart-home-7239a-default-rtdb.firebaseio.com",
  projectId: "smart-home-7239a",
  storageBucket: "smart-home-7239a.firebasestorage.app",
  messagingSenderId: "844404908075",
  appId: "1:844404908075:web:e7d5d410248fd7c4198a6e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Sensors ka data read karna
database.ref('Sensors').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        document.getElementById('temp').innerText = data.Temp;
        document.getElementById('hum').innerText = data.Humidity;
        document.getElementById('dist').innerText = data.Distance;
    }
});

// Relay control logic
let currentStatus = 0;
database.ref('Controls/Light').on('value', (snapshot) => {
    currentStatus = snapshot.val();
    const btn = document.getElementById('lightBtn');
    if(currentStatus == 1) {
        btn.innerText = "ON";
        btn.className = "btn on";
    } else {
        btn.innerText = "OFF";
        btn.className = "btn off";
    }
});

function toggleLight() {
    const newStatus = currentStatus == 1 ? 0 : 1;
    database.ref('Controls').update({ Light: newStatus });
}