// import { BarChartBox, BigChartBox, ChartBox, PieChartBox, TopBox } from '../../components';
import { lazy } from 'react';

import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from '../../data';

import './home.scss';

const BarChartBox = lazy(() => import('../../components/barChartBox/BarChartBox.tsx'));
const BigChartBox = lazy(() => import('../../components/bigChartBox/BigChartBox.tsx'));
const ChartBox = lazy(() => import('../../components/chartBox/ChartBox.tsx'));
const PieChartBox = lazy(() => import('../../components/pieChartBox/PieChartBox.tsx'));
const TopBox = lazy(() => import('../../components/topBox/TopBox.tsx'));

const AsyncHome = () => {

  return (
     <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );

};
export default AsyncHome;
