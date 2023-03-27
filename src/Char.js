import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { year: 'Room', population: 60 },
  { year: 'Staff', population: 13 },
  { year: 'Food', population: 45 },
];

export default class Chartt extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.chartVals,
    };
  }

  render() {
    const { data: chartData } = this.state;

    // console.log(data);
    // console.log(this.props.chartVals);

    return (
        <div

        >

    <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title text="Amenitie Score" />
          <Animation />
          
        </Chart>
      </Paper>
      </div>

    );
  }
}
