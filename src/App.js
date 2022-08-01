import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LoginPage} from './components/LoginPage';
import { MainPage } from './components/MainPage';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="certificates" element={<MainPage />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
