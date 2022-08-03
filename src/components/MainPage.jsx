import { useState } from "react";
import {
  Container,
  Pagination,
  Stack,
  Box,
  Alert,
  Collapse,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TableCustom from "./Table/Table";
import useData from "./../hooks/useData";
import { SearchBox } from "./SearchBox/SearchBox";

export const MainPage = () => {
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [forced, setForced] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);

  const [pageQty, certificates] = useData(query, page, forced);

  const editLogic = () => {

  }
  return (
    <Container
      sx={{ marginTop: 2, minHeight: "calc(100vh - 123px)" }}
      maxWidth="md"
    >
      <Box sx={{ width: "100%" }}>
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ m: 1, width: "100%" }}
          >
            Close me!
          </Alert>
        </Collapse>
      </Box>
      <SearchBox />
      <Stack spacing={3}>
        <TableCustom certificates={certificates} onEditClick = {editLogic} />
        {!!pageQty && (
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
            count={pageQty}
            page={page}
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            onChange={(_, num) => setPage(num)}
          />
        )}
      </Stack>
      
    </Container>
  );
};
