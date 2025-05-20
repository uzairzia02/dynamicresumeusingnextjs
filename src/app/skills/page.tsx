import dynamic from 'next/dynamic';

const SkillsPage = dynamic(() => import('@/components/ui/SkillsPage'), {
  ssr: false,
});

export default function Page() {
  return <SkillsPage />;
}
