import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import {
    Box,
    Alert,
    Collapse,
  } from "@mui/material";

export const ErrorWindow = () => {
    const [open, setOpen] = useState(true);

    return (
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
    )
}