import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  Typography,
  TableFooter,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "./style";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import {
  generateHighchartsData,
  sortAndMapData,
  totalMeatConsumptionByPeriod,
  grandTotal,
  getAnimalName,
} from "./helper";

const Home = () => {
  const [foodComsumptionData, setFoodComsumptionData] = useState([]);
  const [animalName, setAnimalName] = useState([]);

  useEffect(() => {
    fetch("/api/food-consumption.json")
      .then((res) => res.json())
      .then((res) => {
        setFoodComsumptionData(sortAndMapData(res.data.foodConsumption.daily));
        setAnimalName(getAnimalName(res.data.foodConsumption.daily));
      });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <Box component={Paper}>
          <Box p={3}>
            <Grid style={{ overflowX: "auto" }}>
              <Typography variant="h6" gutterBottom>
                Food Consumption
              </Typography>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">PERIOD</StyledTableCell>
                    {foodComsumptionData &&
                      foodComsumptionData[0] &&
                      foodComsumptionData[0].meatConsumption.map((an, idx) => (
                        <StyledTableCell key={idx} align="center">
                          {an.animal}
                        </StyledTableCell>
                      ))}
                    <StyledTableCell align="center">TOTAL</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {foodComsumptionData &&
                    foodComsumptionData.map((consum, idx) => (
                      <StyledTableRow key={idx}>
                        <StyledTableCell align="center">
                          {consum.period}
                        </StyledTableCell>
                        {animalName.map((el, i) => (
                          <StyledTableCell key={i} align="right">
                            {consum.meatConsumption[i]
                              ? consum.meatConsumption[i].meat
                              : 0}
                          </StyledTableCell>
                        ))}
                        <StyledTableCell align="right">
                          {totalMeatConsumptionByPeriod(consum.meatConsumption)}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <StyledTableRow>
                    <StyledTableCell colSpan={8}>GRAND TOTAL</StyledTableCell>
                    <StyledTableCell align="right">
                      {grandTotal(foodComsumptionData)}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableFooter>
              </Table>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <Box component={Paper}>
          <Box p={3}>
            <HighchartsReact
              highcharts={Highcharts}
              options={generateHighchartsData(foodComsumptionData, animalName)}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
