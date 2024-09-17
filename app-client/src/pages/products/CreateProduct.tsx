
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import SectionProduct from "./sections/SectionProduct";

export function CreateProduct() {
  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a new product" />
      <SectionProduct/>
    </Box>
  );
}

export default CreateProduct;