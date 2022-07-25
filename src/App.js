import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import {
  Routes,
  Route,
  createBrowserHistory
} from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="certificates" element={<h1>Certificates</h1>} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
