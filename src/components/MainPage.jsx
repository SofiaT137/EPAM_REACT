import { useState, useContext } from "react";
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
import { SearchBox } from "./SearchBox/SearchBox";
import {Context} from "./Context";

export const MainPage = () => {

  const [open, setOpen] = useState(true);
  const {editPage, page, pageQty,certificates} = useContext(Context);

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
            onChange={(_, num) => editPage(num)}
          />
        )}
      </Stack>
      
    </Container>
  );
};
