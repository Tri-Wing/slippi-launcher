import { colors } from "@common/colors";
import type { ButtonProps } from "@mui/material/Button";
import MatButton from "@mui/material/Button";

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <MatButton
      variant="contained"
      color="inherit"
      sx={{
        color: colors.bluegrayDarker,
        fontWeight: 500,
        fontSize: 12,
        "& .MuiButton-startIcon": {
          color: colors.bluegrayLighter,
        },
      }}
      {...rest}
    >
      {children}
    </MatButton>
  );
};
