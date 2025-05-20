'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/ui/header';
import Link from 'next/link';

export default function SkillsPage() {
  const [skills, setSkills] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const savedSkills = localStorage.getItem('skills');
    const savedSummary = localStorage.getItem('summary');
    if (savedSkills) setSkills(savedSkills);
    if (savedSummary) setSummary(savedSummary);
  }, []);

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSkills(e.target.value);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value);
  };

  const handleNext = () => {
    localStorage.setItem('skills', skills);
    localStorage.setItem('summary', summary);
  };

  return (
    <>
      <Header />
      <div className="w-full 2xl:w-[1240px] mx-auto p-4 md:p-6 lg:p-8 min-h-screen">
        <div className="max-w-full">
          <p className="text-2xl md:text-3xl lg:text-[35px] font-bold">
            What skills would you like to highlight?
          </p>
          <p className="text-xl md:text-2xl lg:text-[25px] text-gray-500">
            Write your best Skills first
          </p>

          <div className="mt-5">
            <p className="font-bold text-lg md:text-xl lg:text-[20px]">
              Add Skills here
            </p>
            <textarea
              rows={10}
              value={skills}
              onChange={handleSkillsChange}
              className="w-full lg:w-[800px] border border-gray-500 rounded-md p-3 mt-2 test-justify "
            />
          </div>
          <div className="mt-5">
            <p className="font-bold text-lg md:text-xl lg:text-[20px]">
              Add Professional Summary here
            </p>
            <textarea
              rows={10}
              value={summary}
              onChange={handleSummaryChange}
              className="w-full lg:w-[800px] border border-gray-500 rounded-md p-3 mt-2 text-justify "
            />
          </div>
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 lg:gap-12 pb-5">
          <Link href="/education" className="w-full sm:w-auto">
            <button className="w-full border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-6 md:px-8 lg:px-10 py-2 md:py-3 font-bold rounded-full">
              Back
            </button>
          </Link>
          <Link href="/summary" className="w-full sm:w-auto">
            <button
              type="button"
              onClick={handleNext}
              className="w-full border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-6 md:px-8 lg:px-10 py-2 md:py-3 font-bold rounded-full"
            >
              Next: Preview
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
