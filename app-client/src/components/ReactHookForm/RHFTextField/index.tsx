import { useTheme } from "@mui/material";
import { tokens } from "../../../context/ThemeContext";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

// Define the prop types for the RHFTextField component
interface RHFTextFieldProps {
  name: string;
  control: any;
  label: string;
  variant: any;
  type?: string; // Thêm thuộc tính type
}

const RHFTextField: React.FC<RHFTextFieldProps> = ({ name, control, label, variant, type = "text" }) => { // Giá trị mặc định cho type là "text"
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant={variant}
          type={type} // Truyền thuộc tính type vào TextField
          sx={{ gridColumn: "span 2" }}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

export default RHFTextField;
