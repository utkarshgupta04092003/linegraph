import React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

import { socialMediaData as data } from './demo-data/data-visualization';

const PREFIX = 'Demo';

const classes = {
  title: `${PREFIX}-title`,
  chart: `${PREFIX}-chart`,
};

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);

const StyledDiv = styled('div')(() => ({
  [`&.${classes.title}`]: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
}));

const Text = ({ text }) => {
  const [mainText, subText] = text.split('\\n');
  return (
    <StyledDiv className={classes.title}>
      <Typography component="h3" variant="h5">
        {mainText}
      </Typography>
      <Typography variant="subtitle1">{subText}</Typography>
    </StyledDiv>
  );
};

const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label {...props} sx={{ mb: 1, whiteSpace: 'nowrap' }} />
);
const Item = props => (
  <Legend.Item {...props} sx={{ flexDirection: 'column-reverse' }} />
);

const StyledChart = styled(Chart)(({ theme }) => ({
  [`&.${classes.chart}`]: {
    paddingRight: '30px',
    width: '100vw', // Set the width to 1000px or any other value you prefer
  },
}));

const Demo = () => {
  
  return (
    <Paper>
      <StyledChart data={data} className={classes.chart}>
        <ArgumentScale factory={scalePoint} />
        <ArgumentAxis showGrid={false} min={100} tickInterval={100} />
        <ValueAxis showGrid={false} min={100} tickInterval={100} />

          <LineSeries name="Facebook" valueField="facebook" argumentField="day" seriesComponent={Line}         
         width={500}
         height={300} />
        
        <LineSeries name="Instagram" valueField="instagram" argumentField="day" seriesComponent={Line}       
         width={500}
         height={300}/>

         

        <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
        {/* <Title text="Performance" textComponent={Text} /> */}
        {/* <Animation /> */}
      </StyledChart>
    </Paper>
  );
};

export default Demo;
