'use client';

import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import React from 'react';

type Props = {
  data: {
    date: string;
    amount: number;
  }[];
};

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

function Graph({ data }: Props) {
  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Initialize cumulative array
  const cumulativeSpend: { x: string; y: number }[] = [];
  let cumulativeSum = 0;

  data.forEach((transaction) => {
    cumulativeSum += transaction.amount;
    cumulativeSpend.push({
      x: transaction.date,
      y: cumulativeSum,
    });
  });

  return (
    <div className="p-3 bg-neutral-800 relative rounded-xl w-full max-h-[300px]">
      <div className="flex flex-col absolute left-6">
        <span className="text-base font-medium opacity-80">
          Current spend this month:
        </span>
        <span className="text-4xl font-bold">
          ${cumulativeSpend.pop()?.y.toFixed(2)}
        </span>
      </div>
      <XYChart
        height={300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="right" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries
          dataKey="Balance"
          data={cumulativeSpend}
          {...accessors}
        />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => (
            <div>
              <div
                style={{
                  color: colorScale(tooltipData.nearestDatum.key),
                }}
              >
                {tooltipData?.nearestDatum?.key}
              </div>
              {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}
              {', '}
              {accessors.yAccessor(tooltipData?.nearestDatum?.datum)}
            </div>
          )}
        />
      </XYChart>
    </div>
  );
}

export default Graph;
