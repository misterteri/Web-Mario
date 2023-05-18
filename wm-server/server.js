const express = require("express");
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

const app = express();
const port = process.env.PORT || 3000;

const firebaseConfig = {
  apiKey: "AIzaSyAuQHjFmkymCQcVjAWxYX1PCFwPOKrnuhw",
  authDomain: "web-mario-9af60.firebaseapp.com",
  databaseURL:
    "https://web-mario-9af60-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-mario-9af60",
  storageBucket: "web-mario-9af60.appspot.com",
  messagingSenderId: "588291058182",
  appId: "1:588291058182:web:6a01d00e83cf842f74b187",
};

firebase.initializeApp(firebaseConfig);

app.use(express.json());

// Define your API routes here to interact with Firebase services

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
