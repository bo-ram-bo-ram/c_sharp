'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components';
import StockChartItem from './stock-chart-item';
import { ChartType, StockChartAPIResponse, useStockWebSocket } from '../model';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/src/shared/services';
import { dummyStockData } from '../model/stock.mock';
const StockChartContainer = ({ stockCode }: { stockCode: string }) => {
  const queryClient = useQueryClient();
  const { subscribe } = useStockWebSocket();

  useEffect(() => {
    return subscribe();
  }, [subscribe]);

  const { data: stockData } = useQuery<StockChartAPIResponse[]>({
    queryKey: QUERY_KEYS.stock(stockCode),
    queryFn: () => queryClient.getQueryData(QUERY_KEYS.stock(stockCode)),
  });

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel
        defaultSize={65}
        minSize={20}
        maxSize={80}
        className="flex items-center justify-center bg-gray-200"
      >
        <StockChartItem
          data={dummyStockData}
          type={ChartType.Candlestick}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={35}
        minSize={20}
        maxSize={80}
        className="flex items-center justify-center bg-gray-300"
      >
        <StockChartItem
          data={dummyStockData}
          type={ChartType.Histogram}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default StockChartContainer;
