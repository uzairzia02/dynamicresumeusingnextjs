"use client"
import { useState } from "react";
import Link from "next/link";

export default function PersonalDetails() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
        email: "",
        image: null,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "file" ? files?.[0] : value
        }));
    }

    function handleNext() {
        if (typeof window !== "undefined") {
            localStorage.setItem("personal", JSON.stringify(form));
        }
    }

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-[1000px] mb-8">
                <p className="text-4xl sm:text-5xl lg:text-[80px] font-bold leading-tight">
                    How should employers get in touch with you?
                </p>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-8">
                {/* Image Upload Section */}
                <div className="w-full lg:w-[300px]">
                    <p>Click to upload image</p>
                    <input
                        type="file"
                        accept="image"
                        name="image"
                        onChange={handleChange}
                        className="cursor-pointer text-black w-full"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-[800px] lg:px-10">
                    <p className="text-blue-600 font-semibold">* indicates a required field</p>
                    {/* Name Fields */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-10">
                        <div className="w-full sm:w-1/2">
                            <p>First Name *</p>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                placeholder="eg. Ali"
                                className="h-[40px] rounded-md w-full border border-gray-500"
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <p>Last Name *</p>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                placeholder="eg. Khan"
                                className="h-[40px] rounded-md w-full border border-gray-500"
                            />
                        </div>
                    </div>
                    {/* Location Fields */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-10">
                        <div className="w-full sm:w-1/2">
                            <p>City *</p>
                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="eg. Karachi"
                                className="h-[40px] rounded-md w-full border border-gray-500"
                            />
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col sm:flex-row gap-4 sm:gap-5">
                            <div className="w-full sm:w-1/2">
                                <p>Postal Code</p>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={form.postalCode}
                                    onChange={handleChange}
                                    placeholder="eg. 9999"
                                    className="h-[40px] rounded-md w-full border border-gray-500"
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <p>Country</p>
                                <input
                                    type="text"
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    placeholder="eg. Pakistan"
                                    className="h-[40px] rounded-md w-full border border-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Contact Fields */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-10">
                        <div className="w-full sm:w-1/2">
                            <p>Phone *</p>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="eg. 00 92 311 1111111"
                                className="h-[40px] rounded-md w-full border border-gray-500"
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <p>Email *</p>
                            <input
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="eg. abc@xyz.com"
                                className="h-[40px] rounded-md w-full border border-gray-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4 sm:gap-12">
                {/* <button className="w-full sm:w-auto border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-10 py-3 font-bold rounded-full">
                    Preview
                </button> */}
                <Link href="/workhistory">
                    <button type="button" onClick={handleNext} className="w-full sm:w-auto border-4 border-blue-600 hover:text-white text-blue-600 hover:bg-blue-600 duration-200 px-10 py-3 font-bold rounded-full">
                        Next: Work History
                    </button>
                </Link>
            </div>
        </div>
    );
}