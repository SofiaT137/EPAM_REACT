import { useState, useEffect } from "react";
import axios from "axios";
import {Container, Pagination, TextField, Stack, duration} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { ModalWindowDelete } from "././ModalWindow/ModalWindowDelete";
import { ModalWindowItem } from "././ModalWindow/ModalWindowItem";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { useRef } from "react";
import StyledTableCell from './StyleTable/StyledTableCell'; 
import StyledTableRow from './StyleTable/StyledTableRow'; 
const BASE_URL = "http://localhost:8085/module2/gift_certificates/";


export const MainPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [title, setTitle] = useState(''); 
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDuration, setItemDuration] = useState('');
  const [itemCreatedDate, setItemCreatedDate] = useState('');
  const [itemLastModifyedDate, setItemLastModifyedDate] = useState('');
  const [itemTags, setItemTags] = useState('');
  const certificateIdRef = useRef();

  const viewLogic = (id,name,description,price,duration,createdDate,lastModifyedDate,tags) => {
    setModalView(true);
    setItemId(id);
    setItemName(name);
    setItemDescription(description);
    setItemPrice(price);
    setItemDuration(duration);
    setItemCreatedDate(createdDate);
    setItemLastModifyedDate(lastModifyedDate);
    setItemTags(getTagsName(tags));    
  }
 
  const deleteLogic = (id) => {
    setModalDelete(true);
    setItemId(id);
    certificateIdRef.current = id;
  }

  useEffect(() => { 
    URL = BASE_URL + `filter/?sortByCreationDate=desc${query}&pageNumber=${page-1}`;
    axios.get(URL).then(
      ({data}) => {
      setCertificates(data.content)
      setPageQty(data.totalPages)  
      if(data.totalPages < page) {
        setPage(1);
      }
    })
  },[query, page])


  const handleSubmit = (e) => {
    e.preventDefault();
    if(title) {
      getQuery(title);
    }
  }

    const getQuery = (input) => {
    setQuery('')
    setPage(1)
    var tagString = ''
    var nameString = ''
    var descriptionString = ''
    var array = input.split(' ');
      array.forEach(element => {
      if(element.startsWith("#",0)){
        tagString+='&tagName='+element.slice(1);
      }else{
        nameString+='&partName='+element;
        // descriptionString+='&partDescription='+element;
      }
    });    
    let finalQuery = tagString === '' ? nameString+descriptionString:tagString+nameString+descriptionString;
    return setQuery(finalQuery);
  }

  const areUSureDelete = (choose) => {
    const headers = { 
      'Authorization': 'Bearer_' + localStorage.getItem('token'),
    };
    if(choose){
      setCertificates(certificates.filter(c => c.id !== certificateIdRef.current))
      const element = document.querySelector('#delete-request-error-handling .status');
      axios.delete(BASE_URL + certificateIdRef.current, {headers})
      .then(response => console.log(response.status))
      .catch(error => {
        element.parentElement.innerHTML = `Error: ${error.message}`;
        console.error('There was an error!', error);
    });
      setModalDelete(false);      
      setQuery(query);
      setPage(page);
    }else {
      setModalDelete(false);
    }
  }

  const closeWindow = (choose) => {
    if(!choose){
      setModalView(false);
    }
  }

  const convertDate = (dateToConvert) => {
    var date = new Date(dateToConvert);
    return date.toLocaleString();
  }

  const getTagsName = (tags) => {
    let finalString = '';
    tags.forEach(tag => {
      finalString += tag.name+' '
    });
    return finalString;
}

  return (
    <Container sx={{marginTop: 2, minHeight:"calc(100vh - 123px)"}} maxWidth="md">
      <form noValidate autoComplete="off" onSubmit={handleSubmit} >
        <TextField sx={{m:1, backgroundColor: "white", borderRadius:"5px",border:"none"}}
        fullWidth
        label="Find a certificate"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        InputProps={{endAdornment: 
            <button type="submit"
            style={{border:"none", backgroundColor:"white"}}>
           <SearchIcon />
           </button>
           }}
       />   
       </form>
    <Stack spacing={3}>
      {
           <TableContainer sx={{m:1}} component={Paper}>
           <Table sx={{ minWidth: 650 }} aria-label="customized table">
             <TableHead>
               <TableRow>
                 <StyledTableCell>Title</StyledTableCell>
                 <StyledTableCell align="center">Create date</StyledTableCell>
                 <StyledTableCell align="center">Tags</StyledTableCell>
                 <StyledTableCell align="center">Duration</StyledTableCell>
                 <StyledTableCell align="center">Price</StyledTableCell>                 
                 <StyledTableCell align="center">Actions</StyledTableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {certificates.map((certificate) => (
                 <StyledTableRow key={certificate.giftCertificateName}>
                   <StyledTableCell component="th" scope="certificates">
                     {certificate.giftCertificateName}
                   </StyledTableCell>
                   <StyledTableCell align="center">{convertDate(certificate.createDate)}</StyledTableCell>
                   <StyledTableCell align="center">{getTagsName(certificate.tags)}</StyledTableCell>
                   <StyledTableCell align="center">{certificate.duration}</StyledTableCell>
                   <StyledTableCell align="center">{certificate.price}</StyledTableCell>
                   <StyledTableCell align="center">
                   <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" style={{fontSize:"12px"}} className="btn btn-primary"
                      onClick = {() => viewLogic(certificate.id, certificate.giftCertificateName,
                      certificate.description,certificate.price, certificate.duration,certificate.createDate,
                      certificate.lastUpdateDate, certificate.tags)}>View</button>
                      <button type="button" style={{fontSize:"12px"}} className="btn btn-info">Edit</button>
                      <button type="button" style={{fontSize:"12px"}} className="btn btn-light" 
                      onClick = {() => deleteLogic(certificate.id)}>Delete</button>
                    </div>
                   </StyledTableCell>
                 </StyledTableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
         
      }
      {
        !!pageQty && (
          <Pagination sx={{display: "flex", justifyContent:"center", marginBottom:"20px"}}
          count={pageQty}
          page={page}
          showFirstButton
          showLastButton
          variant="outlined" shape="rounded"
          onChange={(_,num) => setPage(num)}
          />
        )
      }
        </Stack>
        <ModalWindowDelete active={modalDelete} setActive={setModalDelete} certificateId={itemId} onDialog={areUSureDelete} />
        <ModalWindowItem active={modalView} setActive={setModalView} 
        id={itemId} name={itemName} description={itemDescription} price={itemPrice} duration={itemDuration}
        createdDate={convertDate(itemCreatedDate)} lastModifyedDate={convertDate(itemLastModifyedDate)} tags={itemTags} onClose={closeWindow} />
     </Container>
    );
};
