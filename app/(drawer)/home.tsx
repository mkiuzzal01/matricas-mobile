import AnalysisStep from '@/components/pages/AnalysisStep';
import InitialStep from '@/components/pages/initialStep';
import NotFound from '@/components/pages/NotFound';
import SearchStep from '@/components/pages/SearchStep';
import SummaryStep from '@/components/pages/SummaryStep';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';

export default function Home() {
  const { step } = useAppSelector((state) => state.survey);

  switch (step) {
    case 'initialView':
      return <InitialStep />;

    case 'search':
      return <SearchStep />;

    case 'analysis':
      return <AnalysisStep />;

    case 'summary':
      return <SummaryStep />;

    default:
      return <NotFound />;
  }
}
