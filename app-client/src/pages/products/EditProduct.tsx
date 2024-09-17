
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import SectionProduct from "./sections/SectionProduct";

export function EditProduct() {
  return (
    <Box m="20px">
      <Header title="EDIT Product" subtitle="Edit the data of product" />
      <SectionProduct />
    </Box>
  );
}

export default EditProduct;