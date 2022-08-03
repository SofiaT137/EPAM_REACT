import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import useData from "./../../hooks/useData";

export const SearchBox = () => {

  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [forced, setForced] = useState(false);
  const [page, setPage] = useState(1);

  const [pageQty, certificates] = useData(query, page, forced);

  const onSearchChange = (event) => {setTitle(event.target.value)};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      getQuery(title);
    }
  };
  
  const getQuery = (input) => {
    setQuery("");
    setPage(1);
    setForced(false);
    var tagString = "";
    var nameString = "";
    var descriptionString = "";
    var array = input.split(" ");
    array.forEach((element) => {
      if (element.startsWith("#", 0)) {
        tagString += "&tagName=" + element.slice(1);
      } else {
        nameString += "&partName=" + element;
        // descriptionString+='&partDescription='+element;
      }
    });
    let finalQuery =
      tagString === ""
        ? nameString + descriptionString
        : tagString + nameString + descriptionString;
    return setQuery(finalQuery);
  };
  
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        sx={{
          m: 1,
          backgroundColor: "white",
          borderRadius: "5px",
          border: "none",
        }}
        fullWidth
        label="Find a certificate"
        value={title}
        onChange={onSearchChange}
        InputProps={{
          endAdornment: (
            <button
              type="submit"
              style={{ border: "none", backgroundColor: "white" }}
            >
              <SearchIcon />
            </button>
          ),
        }}
      />
    </form>
  );
};
