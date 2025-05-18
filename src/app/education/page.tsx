'use client'
import { useState } from "react";
import Header from "@/components/ui/header";

export default function Education() {
    const [educations, setEducations] = useState([
        {
            schoolName: "",
            schoolLocation: "",
            degree: "",
            fieldOfStudy: "",
            graduationDate: ""
        }
    ]);

    function handleChange(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEducations(prev => prev.map((edu, i) =>
            i === idx ? { ...edu, [name]: value } : edu
        ));
    }

    function addEducation() {
        setEducations([
            ...educations,
            {
                schoolName: "",
                schoolLocation: "",
                degree: "",
                fieldOfStudy: "",
                graduationDate: ""
            }
        ]);
    }

    function handleNext() {
        localStorage.setItem("educations", JSON.stringify(educations));
    }

    return (
        <>
            <Header />
            <div className="w-full 2xl:w-[1240px] mx-auto p-4 md:p-6 lg:p-8 min-h-screen">
                <div className="max-w-full">
                    <p className="text-2xl md:text-3xl lg:text-[35px] font-bold">
                        Tell us about your education
                    </p>
                    <p className="text-xl md:text-2xl lg:text-[25px] text-gray-500">
                        Provide details about your educational background
                    </p>
                </div>
                {educations.map((edu, idx) => (
                    <div key={idx} className="w-full lg:w-[1000px] px-0 lg:px-10 mt-5 mb-10 border-b border-blue-100 pb-8">
                        <p className="text-blue-600 font-semibold">* indicates a required field</p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-6 md:mt-8 lg:mt-10">
                            <div className="w-full sm:w-1/2">
                                <p>School Name *</p>
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={edu.schoolName}
                                    onChange={e => handleChange(idx, e)}
                                    placeholder="eg. ABC University"
                                    className="h-[50px] rounded-md w-full border border-gray-500 px-3"
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <p>School Location *</p>
                                <input
                                    type="text"
                                    name="schoolLocation"
                                    value={edu.schoolLocation}
                                    onChange={e => handleChange(idx, e)}
                                    placeholder="Karachi, Pakistan"
                                    className="h-[50px] rounded-md w-full border border-gray-500 px-3"
                                />
                            </div>
                        </div>
                        <div className="mt-6 md:mt-8 lg:mt-10">
                            <div className="w-full sm:w-1/2">
                                <p>Degree *</p>
                                <input
                                    type="text"
                                    name="degree"
                                    value={edu.degree}
                                    onChange={e => handleChange(idx, e)}
                                    placeholder="eg. Matric / Inter / BS / MBA"
                                    className="h-[50px] rounded-md w-full border border-gray-500 px-3"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-6 md:mt-8 lg:mt-10">
                            <div className="w-full sm:w-1/2">
                                <p>Field of Study *</p>
                                <input
                                    type="text"
                                    name="fieldOfStudy"
                                    value={edu.fieldOfStudy}
                                    onChange={e => handleChange(idx, e)}
                                    placeholder="eg. Computer Science"
                                    className="h-[50px] rounded-md w-full border border-gray-500 px-3"
                                />
                            </div>
                            <div className="w-full sm:w-[400px]">
                                <p>Graduation Date / Expected Graduation Date</p>
                                <input
                                    type="month"
                                    name="graduationDate"
                                    value={edu.graduationDate}
                                    onChange={e => handleChange(idx, e)}
                                    className="w-full border rounded-md border-gray-500 h-[50px] px-2"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {/* Buttons */}
                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 lg:gap-12 pb-5">
                    <a href="/workhistory" className="w-full sm:w-auto">
                        <button className="w-full border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-6 md:px-8 lg:px-10 py-2 md:py-3 font-bold rounded-full">
                            Back
                        </button>
                    </a>
                    <button type="button" onClick={addEducation} className="w-full sm:w-auto border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-6 md:px-8 lg:px-10 py-2 md:py-3 font-bold rounded-full">
                        Add More Education
                    </button>
                    <a href="/skills" className="w-full sm:w-auto">
                        <button type="button" onClick={handleNext} className="w-full border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-6 md:px-8 lg:px-10 py-2 md:py-3 font-bold rounded-full">
                            Next: Skills
                        </button>
                    </a>
                </div>
            </div>
        </>
    );
}