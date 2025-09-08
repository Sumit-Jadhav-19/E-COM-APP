import React from "react";

export default function Contact() {
  return (
    <div className="mt-14">
      <div className="m-15 w-[90%] h-[89vh] border-1 border-gray-200 rounded-xs bg-white shadow-xl p-10">
        <h1 className="text-3xl font-semibold text-center font">
          Get in Touch with us
        </h1>
        <p className="mt-2 text-[14px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quas,
          illum pariatur blanditiis tempore ullam asperiores minima odit nihil
          aspernatur eaque. Ipsam magni error adipisci voluptates corporis
          tempora nam veniam?
        </p>
        <div className="flex justify-center">
          <form className="w-100 mt-5">
            <div className="flex gap-3">
              <div className="flex flex-col">
                <label htmlFor="first-name">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="first-name"
                  className="border-1  border-gray-400 rounded-sm px-1 focus-visible:outline-0 focus-visible:border-1 focus-visible:border-indigo-400"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="last-name">Last Name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last-name"
                  className="border-1  border-gray-400 rounded-sm px-1 focus-visible:outline-0 focus-visible:border-1 focus-visible:border-indigo-400"
                />
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="border-1  border-gray-400 rounded-sm px-1 focus-visible:outline-0 focus-visible:border-1 focus-visible:border-indigo-400"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="phone-no">Phone no</label>
              <input
                type="text"
                placeholder="Phone no"
                name="email"
                className="border-1  border-gray-400 rounded-sm px-1 focus-visible:outline-0 focus-visible:border-1 focus-visible:border-indigo-400"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="message">Message</label>
              <textarea
                type="text"
                placeholder="Message"
                name="message"
                rows={4}
                className="border-1  border-gray-400 rounded-sm px-1 focus-visible:outline-0 focus-visible:border-1 focus-visible:border-indigo-400"
              />
              <button
                type="button"
                className="w-full mt-4 bg-black p-2 text-white text-sm cursor-pointer rounded-xs hover:bg-black/75"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
