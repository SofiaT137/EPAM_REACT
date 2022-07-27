import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
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
        <Route path="login" element={<LoginForm />} />
        <Route path="certificates" element={<MainPage />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
