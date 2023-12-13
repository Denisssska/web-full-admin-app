import { Link } from 'react-router-dom';

import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

import './chartBox.scss';

type Props = {
  color: string;
  icon: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
};
const ChartBox: React.FC<Props> = props => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="user" />
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link style={{ color: props.color }} to={'/'}>
          View All
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                position={{ x: 10, y: 70 }}
                labelStyle={{ display: 'none' }}
                contentStyle={{ background: 'transparent', border: 'none' }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span className="percentage" style={{ color: props.percentage < 0 ? 'tomato' : 'limegreen' }}>
            {props.percentage}
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};
export default ChartBox;
