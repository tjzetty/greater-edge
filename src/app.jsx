import Router from "preact-router";
import { render } from "preact";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

import Header from "./components/header";
import Home from "./components/home";
import Footer from "./components/footer";

import "./app.css";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const perf = getPerformance(app);

export function App() {
  return (
    <div className="is-preload homepage">
      <div id="page-wrapper">
        <Header />
        <Home />
        <Footer />
      </div>
    </div>
  );
}
