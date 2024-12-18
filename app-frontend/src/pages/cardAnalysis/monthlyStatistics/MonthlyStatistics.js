import React from 'react';
import styled from 'styled-components';
import Piechart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Piechart';
import Barchart from '../../../pages/cardAnalysis/monthlyStatistics/chart/Barchart';

const barchart_data = [
  {
    bottle: '9월',
    식비: 1200,
    교통비: 1000,
    쇼핑: 1100,
    문화: 3000,
    전자제품: 1500,
  },
  {
    bottle: '10월',
    식비: 2200,
    교통비: 2000,
    쇼핑: 2100,
    문화: 10000,
    전자제품: 3500,
  },
  {
    bottle: '11월',
    식비: 3200,
    교통비: 3000,
    쇼핑: 3100,
    문화: 5000,
    전자제품: 10500,
  },
];

const piechart_data = [
  { id: '식비', value: 3 },
  { id: '교통비', value: 1 },
  { id: '쇼핑', value: 2 },
  { id: '문화', value: 8 },
  { id: '전자제품', value: 3 },
];

const Root = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MonthlyStatistics = () => {
  return (
    <Root>
      <Barchart data={barchart_data} />
      <Piechart data={piechart_data} />
    </Root>
  );
};

export default MonthlyStatistics;
