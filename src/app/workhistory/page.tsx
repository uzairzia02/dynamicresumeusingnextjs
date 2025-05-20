import dynamic from 'next/dynamic';

const WorkHistoryPage = dynamic(() => import('@/components/ui/workHistory'), {
  ssr: false,
});

export default function Page() {
  return <WorkHistoryPage />;
}
