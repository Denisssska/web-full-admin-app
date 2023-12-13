import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';

import './barChartBox.scss';

type BarChartBoxType = {
  color: string;
  title: string;
  dataKey: string;
  chartData: object[];
};
const BarChartBox: React.FC<BarChartBoxType> = ({ color, chartData, dataKey, title }) => {
  return (
    <div className="barChartBox">
      <h1>{title}</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart width={150} height={40} data={chartData}>
            <Tooltip
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
              contentStyle={{ background: '2a3447', borderRadius: '5px' }}
            />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default BarChartBox;
