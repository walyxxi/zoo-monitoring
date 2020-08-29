import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { generateHighchartsData } from "./helper";

const FoodConsumption = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box component={Paper}>
          <Box p={3}>
            <HighchartsReact
              highcharts={Highcharts}
              options={generateHighchartsData()}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FoodConsumption;
