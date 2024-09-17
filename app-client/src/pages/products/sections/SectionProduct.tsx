import React, { useEffect } from "react";
import { ProductFormInput } from "../../../types/GlobalTypes";
import * as zodValidator from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import endpoints from "../../../helpers/Endpoints";
import { Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import RHFTextField from "../../../components/ReactHookForm/RHFTextField";
import { ProductService } from "../../../pages-services/productService"; // Import ProductService

// Instantiate ProductService
const productService = new ProductService(endpoints.PRODUCT.v1);

// Validation schema using Zod
const validationSchema = zodValidator.object({
  name: zodValidator.string().min(1, "Please enter the product name"),
  price: zodValidator.coerce.number().positive("Price must be a positive number"),
  stock: zodValidator.coerce.number().positive("Stock must be a positive number"),
  categoryId: zodValidator.coerce.number().positive("Category ID must be valid"),
  description: zodValidator.string().optional(),
  imageURL: zodValidator.string().url("Please enter a valid URL").optional(),
});

export function SectionProduct() {
  const params = useParams();
  const redirect = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      categoryId: 0,
      description: "",
      imageURL: "",
    },
  });

  // Fetch product details if there's an ID (Edit mode)
  useEffect(() => {
    if (params.id) {
      const fetchProduct = async () => {
        try {
          const product = await productService.getProduct(Number(params.id));
          setValue("name", product.name);
          setValue("price", product.price);
          setValue("stock", product.stock);
          setValue("categoryId", product.categoryId);
          setValue("description", product.description || "");
          setValue("imageURL", product.imageURL || "");
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProduct();
    }
  }, [params.id, setValue]);

  // Handle form submission
  const onSubmit = async (data: ProductFormInput) => {
    try {
      const formattedData = {
        ...data,
        description: data.description ?? "", // Bảo đảm rằng description không là undefined
      };
  
      if (params.id) {
        await productService.editProduct(Number(params.id), formattedData);
      } else {
        await productService.createProduct(formattedData);
      }
      redirect("/products");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box m="20px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <RHFTextField
            name={"name"}
            label={"Product Name"}
            control={control}
            variant="filled"
          />
          <RHFTextField
            name={"price"}
            label={"Price"}
            control={control}
            variant="filled"
            type="number"
          />
          <RHFTextField
            name={"stock"}
            label={"Stock"}
            control={control}
            variant="filled"
            type="number"
          />
          <RHFTextField
            name={"categoryId"}
            label={"Category ID"}
            control={control}
            variant="filled"
          />
          <RHFTextField
            name={"description"}
            label={"Description"}
            control={control}
            variant="filled"
          />
          <RHFTextField
            name={"imageURL"}
            label={"Image URL"}
            control={control}
            variant="filled"
          />
        </Box>
        <Box display="flex" justifyContent="start" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            CONFIRM
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default SectionProduct;
