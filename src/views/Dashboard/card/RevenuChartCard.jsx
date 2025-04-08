import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// ==============================|| REVENUE CHART CARD ||============================== //

const RevenuChartCard = ({ chartData }) => {
  const theme = useTheme();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card>
      <CardHeader
        title={
          <Typography t="div" className="card-header">
            Total Storage
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
          <Grid item xs={12} sm={7} md={12}>
            <Chart {...chartData} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RevenuChartCard.propTypes = {
  chartData: PropTypes.object
};

export default RevenuChartCard;
