import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';



const size = {
  width: 400,
  height: 300,
};

const StyledText = styled('text')(({ theme }) => ({
    fill: '#ffff',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

interface PieChartWithCenterLabelProps {
  data: { name: string; value: number }[];
}

export default function PieChartWithCenterLabel({ data }: PieChartWithCenterLabelProps) {
  return (
    <PieChart series={[
      {
        data,
        innerRadius: 30,
        outerRadius: 150,
        paddingAngle: 5,
        cornerRadius: 5,
        startAngle: -45,
        endAngle: 225,
        cx: 150,
        cy: 150,
      }
    ]} {...size}>
    
    </PieChart>
  );
}