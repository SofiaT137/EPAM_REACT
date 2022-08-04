import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useContext } from "react";
import {Context} from "./../Context";


export const SearchBox = () => {

  const [title, setTitle] = useState("");

  const {editForced, editPage, editQuery} = useContext(Context);

  const onSearchChange = (event) => {setTitle(event.target.value)};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      getQuery(title);
    }
  };
  
  const getQuery = (input) => {
    editQuery("");
    editPage(1);
    editForced(false);
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
    return editQuery(finalQuery);
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
