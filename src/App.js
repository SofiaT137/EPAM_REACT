import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LoginPage} from './components/LoginPage';
import { MainPage } from './components/MainPage';
import { Context } from './components/Context';
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [pageQty, setPageQty] = useState(0);
  const [certificates, setCertificates] = useState([]);    
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [forced, setForced] = useState(false);
  const [error, setError] = useState('');

  const BASE_URL = "http://localhost:8085/module2/gift_certificates/";

  useEffect(() => {     
    URL = BASE_URL + `filter/?sortByCreationDate=desc${query}&pageNumber=${page-1}`;
    axios.get(URL).then(
      ({data}) => {
      setCertificates(data.content)
      setPageQty(data.totalPages)
    })
    .catch(error  => {
      editError(error)
    });
  },[query, page, forced])

  const editPage = (page) => {
    setPage(page);
  }

  const editForced = (forced) => {
    setForced(forced);
  }

  const editQuery = (query) => {
    setQuery(query);
  }
  
  const editError = (error) => {
    setError(error);
  }

  return (
    <div>
      <Context.Provider value={{
        editForced,editPage,editQuery,editError,error,page, forced, query,pageQty,certificates
      }}>
      <Header />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="certificates" element={<MainPage />} />
        </Routes>
      <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
