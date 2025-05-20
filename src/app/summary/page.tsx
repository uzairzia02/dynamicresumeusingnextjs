import dynamic from 'next/dynamic';

const SummaryPage = dynamic(() => import('@/components/ui/summaryPage'), {
  ssr: false,
});

export default function Page() {
  return <SummaryPage />;
}
