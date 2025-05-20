import dynamic from 'next/dynamic';

const EducationForm = dynamic(() => import('@/components/ui/educationForm'), {
  ssr: false,
});

export default function Page() {
  return <EducationForm />;
}
