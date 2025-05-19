'use client'
import { useState, useEffect } from "react";
import Header from "@/components/ui/header";
import Image from "next/image";

// Types for work and education
interface WorkExperience {
  jobTitle: string;
  employer: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}
interface Education {
  schoolName: string;
  schoolLocation: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
}

export default function Summary() {
  // State for all fields
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    image: null,
  });
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState("");
  const [summary, setSummary] = useState("");
  const [editSection, setEditSection] = useState("");
  const [personalEdit, setPersonalEdit] = useState({ ...personal });
  const [workEdit, setWorkEdit] = useState<WorkExperience[]>([]);
  const [educationEdit, setEducationEdit] = useState<Education[]>([]);
  const [skillsEdit, setSkillsEdit] = useState("");
  const [summaryEdit, setSummaryEdit] = useState("");

  // Load data from localStorage on mount
  useEffect(() => {
    const personalData = localStorage.getItem("personal");
    const workData = localStorage.getItem("workExperiences");
    const workSingle = localStorage.getItem("work");
    const educationsData = localStorage.getItem("educations");
    const skillsData = localStorage.getItem("skills");
    const summaryData = localStorage.getItem("summary");
    if (personalData) {
      const parsed = JSON.parse(personalData);
      // If image is a File object, convert to data URL for display
      if (parsed.image && typeof parsed.image === 'object' && parsed.image instanceof File) {
        const reader = new FileReader();
        reader.onload = function(e) {
          setPersonal({ ...parsed, image: e.target?.result });
        };
        reader.readAsDataURL(parsed.image);
      } else {
        setPersonal(parsed);
      }
    }
    // Always prefer workExperiences array if present, otherwise fallback to work
    if (workData) setWorkExperiences(JSON.parse(workData));
    else if (workSingle) setWorkExperiences([JSON.parse(workSingle)]);
    if (educationsData) setEducations(JSON.parse(educationsData));
    if (skillsData) setSkills(skillsData);
    if (summaryData) setSummary(summaryData);
  }, []);

  // Handlers for editing and saving
  const handleEdit = (section: string) => {
    setEditSection(section);
    if (section === "personal") setPersonalEdit({ ...personal });
    if (section === "work") setWorkEdit([...workExperiences]);
    if (section === "education") setEducationEdit([...educations]);
    if (section === "skills") setSkillsEdit(skills);
    if (section === "summary") setSummaryEdit(summary);
  };

  const handleSave = (section: string) => {
    if (section === "personal") {
      setPersonal({ ...personalEdit });
      localStorage.setItem("personal", JSON.stringify(personalEdit));
    }
    if (section === "work") {
      setWorkExperiences([...workEdit]);
      localStorage.setItem("workExperiences", JSON.stringify(workEdit));
    }
    if (section === "education") {
      setEducations([...educationEdit]);
      localStorage.setItem("educations", JSON.stringify(educationEdit));
    }
    if (section === "skills") {
      setSkills(skillsEdit);
      localStorage.setItem("skills", skillsEdit);
    }
    if (section === "summary") {
      setSummary(summaryEdit);
      localStorage.setItem("summary", summaryEdit);
    }
    setEditSection("");
  };

  // Handlers for input changes
  const handleWorkChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = workEdit.map((exp, i) =>
      i === idx ? { ...exp, [e.target.name]: e.target.value } : exp
    );
    setWorkEdit(updated);
  };
  const handleEducationChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = educationEdit.map((edu, i) =>
      i === idx ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setEducationEdit(updated);
  };

  return (
    <>
      <Header />
      <div className="w-full max-w-3xl mx-auto p-4 md:p-10 min-h-screen bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-2xl mt-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-blue-700 tracking-tight drop-shadow-lg">Resume Preview</h1>
        {/* Personal Details */}
        <section className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-2"></span>Personal Details
            </h2>
            {editSection !== "personal" ? (
              <button className="text-blue-600 underline" onClick={() => handleEdit("personal")}>Edit</button>
            ) : (
              <button className="text-green-600 underline" onClick={() => handleSave("personal")}>Save</button>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {personal.image && typeof personal.image === 'string' && (
              <Image src={personal.image} alt="Profile" className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow-md mb-4 md:mb-0" />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-lg w-full">
              <div><b>Name:</b> {personal.firstName} {personal.lastName}</div>
              <div><b>City:</b> {personal.city}</div>
              <div><b>Postal Code:</b> {personal.postalCode}</div>
              <div><b>Country:</b> {personal.country}</div>
              <div><b>Phone:</b> {personal.phone}</div>
              <div><b>Email:</b> {personal.email}</div>
            </div>
          </div>
        </section>

        {/* Work History */}
        <section className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-2"></span>Work History
            </h2>
            {editSection !== "work" ? (
              <button className="text-blue-600 underline" onClick={() => handleEdit("work")}>Edit</button>
            ) : (
              <button className="text-green-600 underline" onClick={() => handleSave("work")}>Save</button>
            )}
          </div>
          {editSection === "work" ? (
            <div className="space-y-6">
              {workEdit.map((work, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <div className="font-semibold text-lg text-blue-700">
                    <input name="jobTitle" value={work.jobTitle} onChange={e => handleWorkChange(idx, e)} className="border rounded px-2 mr-2" placeholder="Job Title" /> at <input name="employer" value={work.employer} onChange={e => handleWorkChange(idx, e)} className="border rounded px-2 ml-2" placeholder="Employer" />
                  </div>
                  <div className="text-gray-700"><input name="location" value={work.location} onChange={e => handleWorkChange(idx, e)} className="border rounded px-2" placeholder="Location" /></div>
                  <div className="text-gray-700">
                    <input name="startDate" value={work.startDate} onChange={e => handleWorkChange(idx, e)} className="border rounded px-2 mr-2" placeholder="Start Date" type="month" /> - <input name="endDate" value={work.endDate} onChange={e => handleWorkChange(idx, e)} className="border rounded px-2 ml-2" placeholder="End Date" type="month" />
                  </div>
                  <div className="text-gray-700 mt-2">
                    <textarea name="description" value={work.description} onChange={e => handleWorkChange(idx, e)} className="border rounded px-2 w-full" placeholder="Description" />
                  </div>
                </div>
              ))}
            </div>
          ) : workExperiences.length === 0 ? (
            <div className="text-gray-500">No work experience added.</div>
          ) : (
            <div className="space-y-6">
              {workExperiences.map((work, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <div className="font-semibold text-lg text-blue-700">{work.jobTitle} at {work.employer}</div>
                  <div className="text-gray-700">{work.location}</div>
                  <div className="text-gray-700">{work.startDate} - {work.endDate}</div>
                  <div className="text-gray-700 mt-2">{work.description}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Education */}
        <section className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-2"></span>Education
            </h2>
            {editSection !== "education" ? (
              <button className="text-blue-600 underline" onClick={() => handleEdit("education")}>Edit</button>
            ) : (
              <button className="text-green-600 underline" onClick={() => handleSave("education")}>Save</button>
            )}
          </div>
          {editSection === "education" ? (
            <div className="space-y-6">
              {educationEdit.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <div className="font-semibold text-lg text-blue-700">
                    <input name="degree" value={edu.degree} onChange={e => handleEducationChange(idx, e)} className="border rounded px-2 mr-2" placeholder="Degree" /> in <input name="fieldOfStudy" value={edu.fieldOfStudy} onChange={e => handleEducationChange(idx, e)} className="border rounded px-2 ml-2" placeholder="Field of Study" />
                  </div>
                  <div className="text-gray-700">
                    <input name="schoolName" value={edu.schoolName} onChange={e => handleEducationChange(idx, e)} className="border rounded px-2 mr-2" placeholder="School Name" />, <input name="schoolLocation" value={edu.schoolLocation} onChange={e => handleEducationChange(idx, e)} className="border rounded px-2 ml-2" placeholder="School Location" />
                  </div>
                  <div className="text-gray-700">Graduation: <input name="graduationDate" value={edu.graduationDate} onChange={e => handleEducationChange(idx, e)} className="border rounded px-2" placeholder="Graduation Date" type="month" /></div>
                </div>
              ))}
            </div>
          ) : educations.length === 0 ? (
            <div className="text-gray-500">No education added.</div>
          ) : (
            <div className="space-y-6">
              {educations.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-blue-100 bg-blue-50">
                  <div className="font-semibold text-lg text-blue-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-gray-700">{edu.schoolName}, {edu.schoolLocation}</div>
                  <div className="text-gray-700">Graduation: {edu.graduationDate}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Skills */}
        <section className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-2"></span>Skills
            </h2>
            {editSection !== "skills" ? (
              <button className="text-blue-600 underline" onClick={() => handleEdit("skills")}>Edit</button>
            ) : (
              <button className="text-green-600 underline" onClick={() => handleSave("skills")}>Save</button>
            )}
          </div>
          {editSection === "skills" ? (
            <textarea value={skillsEdit} onChange={e => setSkillsEdit(e.target.value)} className="border rounded px-2 w-full" rows={3} />
          ) : (
            <div className="text-gray-700 text-lg">{skills}</div>
          )}
        </section>

        {/* Professional Summary */}
        <section className="mb-10 bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-2"></span>Professional Summary
            </h2>
            {editSection !== "summary" ? (
              <button className="text-blue-600 underline" onClick={() => handleEdit("summary")}>Edit</button>
            ) : (
              <button className="text-green-600 underline" onClick={() => handleSave("summary")}>Save</button>
            )}
          </div>
          {editSection === "summary" ? (
            <textarea value={summaryEdit} onChange={e => setSummaryEdit(e.target.value)} className="border rounded px-2 w-full" rows={3} />
          ) : (
            <div className="text-gray-700">{summary}</div>
          )}
        </section>

        {/* Generate Resume Button */}
        <div className="flex justify-end mt-10">
          <button
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold px-10 py-4 rounded-full text-xl shadow-xl transition-all duration-200"
            onClick={() => window.open(window.location.href + '?print=1', '_blank')}
          >
            Generate Resume
          </button>
        </div>
        {/* Auto-print if print=1 in query */}
        {typeof window !== 'undefined' && window.location.search.includes('print=1') && (
          <script dangerouslySetInnerHTML={{ __html: 'window.onload = function() { window.print(); }' }} />
        )}
      </div>
    </>
  );
}
