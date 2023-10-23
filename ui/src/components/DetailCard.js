import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

export function DetailCard({ title, subtitle }) {
  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item xs={12} sx={{ padding: "5px" }}>
          <Box lineHeight={1}>
            <Typography variant="caption">{title}</Typography>
          </Box>
          <Box lineHeight={1}>
            <Typography variant="subtitle1">{subtitle} </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
