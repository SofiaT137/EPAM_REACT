import { useState, useEffect } from "react";
import axios from "axios";
import {Container, Pagination, TextField, Stack, Link} from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
const BASE_URL = "http://localhost:8085/module2/gift_certificates/filter/?sortByCreationDate=desc";

export const MainPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  
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
    axios.get(BASE_URL + `&pageNumber=${page-1}`).then(
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

  return (
    <Container sx={{marginTop: 2}} maxWidth="md">
        <TextField sx={{m:1, backgroundColor: "white", borderRadius:"5px",border:"none"}}
        fullWidth
        label="Find a certificate"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        InputProps={{endAdornment: <SearchIcon />}}
       />   
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
                   <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" style={{fontSize:"12px"}} className="btn btn-primary">View</button>
                      <button type="button" style={{fontSize:"12px"}} className="btn btn-info">Edit</button>
                      <button type="button" style={{fontSize:"12px"}} className="btn btn-light">Delete</button>
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
          <Pagination sx={{display: "flex", justifyContent:"center", marginBlock:"20px"}}
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
    </Container>
    );
};
