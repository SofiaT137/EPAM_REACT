import { useState, useEffect } from "react";
import axios from "axios";

const useData = (query, page, forced) => {    

    const [pageQty, setPageQty] = useState(0);
    const [certificates, setCertificates] = useState([]);

    const BASE_URL = "http://localhost:8085/module2/gift_certificates/";

    useEffect(() => {     
        URL = BASE_URL + `filter/?sortByCreationDate=desc${query}&pageNumber=${page-1}`;
        axios.get(URL).then(
          ({data}) => {
          setCertificates(data.content)
          setPageQty(data.totalPages)
         
        })
      },[query, page, forced])

      return [pageQty, certificates];
}

export default useData;