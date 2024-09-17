import { useEffect, useState } from "react";
import { CategoryFilterProps, CategoryFormInput, ICategory, ProductFilterProps, ProductFormInput } from "../../../types/GlobalTypes";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import RHFTextField from "../../../components/ReactHookForm/RHFTextField";

export function FilterProducts({ defaultValues, onFilter }: ProductFilterProps) {

   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<ProductFormInput>({
      defaultValues: defaultValues
   });

   const onSubmit = async (data: ProductFormInput) => {
      onFilter(data);
   };

   return (
      <Box>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Box
               display="grid"
               //gap="30px"
               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
               <RHFTextField
                  name={"name"}
                  label={"Name"}
                  control={control}
                  variant="filled"
               />

            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
               <Button type="submit" color="secondary" variant="contained">
                  SEARCH
               </Button>
            </Box>
         </form>
      </Box>

   );
}

export default FilterProducts;
