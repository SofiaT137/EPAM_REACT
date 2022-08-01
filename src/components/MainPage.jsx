import { useState, useEffect } from "react";
import axios from "axios";
import {Container, Pagination, TextField, Stack} from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { ModalWindowDelete } from "./ModalWindowDelete";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { useRef } from "react";
const BASE_URL = "http://localhost:8085/module2/gift_certificates/filter/?sortByCreationDate=desc";

export const MainPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [title, setTitle] = useState(''); 
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [changeId, setChangeId] = useState('');
  const certificateIdRef = useRef();
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  useEffect(() => {
    let URL = query === '' ? BASE_URL + `&pageNumber=${page-1}`: BASE_URL + `${query}&pageNumber=${page-1}`
    axios.get(URL).then(
      ({data}) => {
      setCertificates(data.content)
      setPageQty(data.totalPages) 
      if(data.totalPages < page) {
        setPage(1);
      }
    })
  },[query, page])

  const getTagsName = (tags) => {
      let finalString = '';
      tags.forEach(tag => {
        finalString += tag.name+' '
      });
      return finalString;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title) {
      getQuery(title);
    }
  }

    const getQuery = (input) => {
    setQuery('');
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
    console.log(finalQuery)
      return setQuery(finalQuery);
  }

  const areUSureDelete = (choose) => {
    if(choose){
      setCertificates(certificates.filter(c => c.id !== certificateIdRef.current))
    }else {
      console.log('else')
    }
  }

  const deleteLogic = (id) => {
    setModalActive(true);
    setChangeId(id);
    certificateIdRef.current = id;
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
                   <StyledTableCell align="center">{certificate.createDate}</StyledTableCell>
                   <StyledTableCell align="center">{getTagsName(certificate.tags)}</StyledTableCell>
                   <StyledTableCell align="center">{certificate.price}</StyledTableCell>
                   <StyledTableCell align="center">
                   <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" style={{fontSize:"12px"}} className="btn btn-primary">View</button>
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
        <ModalWindowDelete active={modalActive} setActive={setModalActive} certificateId={changeId} onDialog={areUSureDelete} />
     </Container>
    );
};
