import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Checkbox,
  Typography,
  FormControl, InputLabel

} from "@mui/material";
import { useField, Field } from "formik";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
          },
        },
      },
    },
  },
});



export function HybridInput(props) {
  const [field, meta] = useField(props);
  const { setVal, onChange } = props
  return (
    <div style={{ marginBottom: "10px" }}>
      <ThemeProvider theme={theme}>
        <TextField
          {...field}
          {...props}
          fullWidth
          style={{ borderRadius: '9px' }}
          onChange={(e) => {
            setVal(field.name, e.target.value);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          error={meta.touched && meta.error ? true : false}
          helperText={meta.error && meta.touched ? meta.error : ""}
        />
      </ThemeProvider>
    </div>
  );
}

