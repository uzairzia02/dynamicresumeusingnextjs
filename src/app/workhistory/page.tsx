"use client"
import { useState } from "react";
import Header from "@/components/ui/header";
import Link from "next/link";

export default function WorkHistory() {
  const [experiences, setExperiences] = useState([
    {
      jobTitle: "",
      employer: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  ]);

  function handleChange(idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setExperiences(prev => prev.map((exp, i) =>
      i === idx ? { ...exp, [name]: value } : exp
    ));
  }

  function addExperience() {
    setExperiences([
      ...experiences,
      {
        jobTitle: "",
        employer: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ]);
  }

  function handleNext() {
        if (typeof window !== "undefined") {
            localStorage.setItem("work", JSON.stringify(experiences[0]));
            // For multiple experiences, use: localStorage.setItem("workExperiences", JSON.stringify(experiences));
        }
    }

  return (
    <>
      <Header />
      <div className="w-full 2xl:w-[1240px] mx-auto p-4 md:p-6 lg:p-8 min-h-screen">
        <div className="max-w-full">
          <p className="text-2xl md:text-3xl lg:text-[35px] font-bold">
            Tell us about your most recent job
          </p>
          <p className="text-xl md:text-2xl lg:text-[25px] text-gray-500">
            Start from the latest first
          </p>
        </div>

        {experiences.map((exp, idx) => (
          <div key={idx} className="w-full lg:w-[1000px] px-0 lg:px-10 mt-5 mb-10 border-b border-blue-100 pb-8">
            <p className="text-blue-600 font-semibold">* indicates a required field</p>
            {/* Job Title and Employer */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-6 md:mt-8 lg:mt-10">
              <div className="w-full sm:w-1/2">
                <p>Job Title *</p>
                <input
                  type="text"
                  name="jobTitle"
                  value={exp.jobTitle}
                  onChange={e => handleChange(idx, e)}
                  placeholder="eg. HR Manager"
                  className="h-[50px] rounded-md w-full border border-gray-500 px-3"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <p>Employer *</p>
                <input
                  type="text"
                  name="employer"
                  value={exp.employer}
                  onChange={e => handleChange(idx, e)}
                  placeholder="ABC Company"
                  className="h-[50px] rounded-md w-full border border-gray-500 px-3"
                />
              </div>
            </div>
            {/* Job Location */}
            <div className="mt-6 md:mt-8 lg:mt-10">
              <div className="w-full sm:w-1/2">
                <p>Job Location *</p>
                <input
                  type="text"
                  name="location"
                  value={exp.location}
                  onChange={e => handleChange(idx, e)}
                  placeholder="eg. Karachi, Pakistan"
                  className="h-[50px] rounded-md w-full border border-gray-500 px-3"
                />
              </div>
            </div>
            {/* Date Fields */}
            <div className="flex flex-col sm:flex-row sm:w-[450px] gap-4 justify-between mt-6 md:mt-8 lg:mt-10">
              <div className="w-full sm:w-[200px]">
                <p>Start Date</p>
                <input
                  type="month"
                  name="startDate"
                  value={exp.startDate}
                  onChange={e => handleChange(idx, e)}
                  className="w-full border rounded-md border-gray-500 h-[50px] px-2"
                />
              </div>
              <div className="w-full sm:w-[200px]">
                <p>End Date</p>
                <input
                  type="month"
                  name="endDate"
                  value={exp.endDate}
                  onChange={e => handleChange(idx, e)}
                  className="w-full border rounded-md border-gray-500 h-[50px] px-2"
                />
              </div>
            </div>
            {/* Job Description */}
            <div className="mt-5">
              <p className="font-bold text-lg md:text-xl lg:text-[20px]">Job Description</p>
              <textarea
                name="description"
                value={exp.description}
                onChange={e => handleChange(idx, e)}
                rows={12}
                className="w-full lg:w-[800px] border border-gray-500 rounded-md p-3 mt-2"
              ></textarea>
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 lg:gap-12 pb-5">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-6 md:px-8 lg:px-10 py-2 md:py-3 font-bold rounded-full">
              Back
            </button>
          </Link>
          <button type="button" onClick={addExperience} className="w-full sm:w-auto border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-6 md:px-8 lg:px-10 py-2 md:py-3 font-bold rounded-full">
            Add More Experience
          </button>
          <Link href="/education" className="w-full sm:w-auto">
            <button type="button" onClick={handleNext} className="w-full border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-6 md:px-8 lg:px-10 py-2 md:py-3 font-bold rounded-full">
              Next: Education
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
