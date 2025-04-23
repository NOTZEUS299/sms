import React, { useEffect, useState } from 'react'
import Sidebar from '../../layout/Sidebar'
import Header from '../../layout/Header'
import { FaFileAlt } from "react-icons/fa";
import Tenant from './Tenant';
import useSidbarTogal from '../../../../layout/useSidbarTogal';
import { AnnouncementGet, Get_Profile_img } from '../../Api/api';


const Personal_Detail = () => {

  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen })

  const [activeTab, setActiveTab] = useState("Owner");

  const Pending = [
    {
      billDate: "11/01/2024",
      pendingDate: "11/01/2024",
      maintenanceAmount: 1000,
      penaltyAmount: 250,
      totalAmount: 1250,
    },
    {
      billDate: "11/01/2024",
      pendingDate: "11/01/2024",
      maintenanceAmount: 1000,
      penaltyAmount: 250,
      totalAmount: 1250,
    },
    {
      billDate: "11/01/2024",
      pendingDate: "11/01/2024",
      maintenanceAmount: 1000,
      penaltyAmount: 250,
      totalAmount: 1250,
    },
  ];
  const duePending = [
    {
      Date: "11/01/2024",
      Amount: 1000,
      dueAmount: 250,
    }, {
      Date: "11/01/2024",
      Amount: 1000,
      dueAmount: 250,
    }
  ];

  const [FormData, setFormData] = useState({ members: [], vehicles: [] })

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    Get_Profile_img((data) => {
      setFormData(data || { members: [], vehicles: [] });
    });
  };
  const [Announcement, setAnnouncement] = useState()

  useEffect(() => {
    AnnGET();
  }, []);

  const AnnGET = () => {
    AnnouncementGet(setAnnouncement);
  };


  return (
    <div className='bg-[#f0f5fb] h-screen'>
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id='main' className={`ml-[${getdata}px] max-[425px]:ml-0`} >
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* Tabs Section */}
          <div className="flex flex-wrap ">
            <button
              className={`py-2 px-8 font-semibold text-center rounded-t-lg border-b-2 border-b-orange-500 ${activeTab === "Owner"
                ? "bg-gradient-to-r from-orange-600 to-yellow-500 text-white"
                : "bg-white text-gray-700"
                }`}
              onClick={() => setActiveTab("Owner")}
            >
              Owner
            </button>
            <button
              className={`py-2 px-8 font-semibold text-center rounded-t-lg border-b-2 border-b-orange-500 ${activeTab === "Tenant"
                ? "bg-gradient-to-r from-orange-600 to-yellow-500 text-white"
                : "bg-white text-gray-700"
                }`}
              onClick={() => setActiveTab("Tenant")}
            >
              Tenant
            </button>
          </div>
          {activeTab === "Owner" && (
            <div>
              {/* Profile Section */}
              <div className="bg-white p-6 shadow rounded-md">
                <div className="flex flex-wrap gap-6 items-center justify-between max-[425px]:flex-col">
                  {/* Left Section: Profile Picture and Info */}
                  <div className="flex flex-wrap items-center gap-6 max-[425px]:flex-col">
                    <img
                      src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770800/shfpe3pccvr5qrpuldzh.png"
                      alt="Profile"
                      className="rounded-full w-24 h-24 md:w-36 md:h-36 border border-gray-300"
                    />
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
                        {[
                          ["Full Name", `${FormData.Fullname || ''}`],
                          ["Phone Number", `${FormData.Phone || ''}`],
                          ["Email Address", `${FormData.Email || ''}`],
                          ["Gender", `${FormData.Gender || ''}`],
                          ["Wing", `${FormData.Wing || ''}`],
                          ["Age", `${FormData.Age || ''}`],
                          ["Unit", `${FormData.Unit || ''}`],
                          ["Relation", `${FormData.Relation || ''}`],
                        ].map(([label, value]) => (
                          <p key={label}>
                            <span className="font-medium">{label}:</span> <br />
                            <span className='text-[#a7a7a7]'>{value}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Documents */}
                  <div className="space-y-3 flex-1 max-w-sm ">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border rounded-md max-[425px]:w-[14px]">
                      <FaFileAlt className="text-blue-500" />
                      <div>
                        <p>Front Side</p>
                        <p className="text-xs text-gray-500">img size</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border rounded-md max-[425px]:w-[14px]">
                      <FaFileAlt className="text-blue-500" />
                      <div>
                        <p>Back Side</p>
                        <p className="text-xs text-gray-500">img size</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg mt-5">
                <p className='mb-3 font-semibold text-lg'>Member : ({FormData?.members?.length ?? 0})</p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {FormData.members?.map((e, index) => (
                    <div className="bg-white shadow-md rounded-md relative" key={index}>
                      <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">{e.fullName}</h2>
                      </div>
                      <div className="flex flex-col gap-2 mb-4 p-2">
                        <div className="text-sm text-gray-500 flex justify-between">
                          Email
                          <span className="ml-2 text-base font-semibold text-gray-700">{e.email}</span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Phone Number
                          <span className="text-black">{e.phone}</span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Age
                          <span className="text-black">{e.age}</span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Gender
                          <span className="text-black">{e.gender}</span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Relation
                          <span className="text-black">{e.Relation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg mt-5">
              <p className='mb-3 font-semibold text-lg'>Vehicle : ({FormData?.vehicles?.length ?? 0})</p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {FormData.vehicles?.map((e, index) => (
                    <div className="bg-white shadow-md rounded-md relative" key={index}>
                      <div className="flex justify-between items-center mb-3 rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">{e.type}</h2>
                      </div>
                      <div className="flex flex-col gap-2 mb-4 p-2">
                        <div className="text-sm text-gray-500 flex justify-between">
                          Vehicle Name
                          <span className="ml-2 text-base font-semibold text-gray-700">{e.name}</span>
                        </div>
                        <div className="text-gray-500 flex justify-between">
                          Vehicle Number
                          <span className="text-black">{e.number}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending and Due Maintenance */}
              {[{ title: "Pending Maintenance", data: Pending }, { title: "Due Maintenance", data: duePending }].map(({ title, data }, index) => (
                <div key={index} className="bg-white p-4 rounded-lg mt-5">
                  <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {data.map((item, index) => (
                      <div key={index} className="bg-white shadow-md rounded-lg">
                        <div className="flex justify-between items-center p-2 rounded-t-lg bg-[#5678e9]">
                          <h2 className="text-lg font-semibold text-white">
                            Maintenance
                          </h2>
                          <span className="text-sm bg-blue-700 text-white py-1 px-3 rounded-full">
                            Pending
                          </span>
                        </div>
                        <div className="mt-4 text-gray-700 p-2">
                          {Object.entries(item).map(([key, value]) => (
                            <div key={key} className="flex justify-between mt-2">
                              <span>{key}</span>
                              <span>₹ {typeof value === "number" ? value.toFixed(2) : value}</span>
                            </div>
                          ))}
                          <button className="mt-4 w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-2 rounded-lg shadow">
                            Pay Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-white p-6 shadow rounded-md mt-5">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Announcements</h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Announcement?.map((e, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md relative border border-gray-200">
                      {/* Header Section */}
                      <div className="flex justify-between items-center rounded-t-lg p-2 bg-[#5678e9]">
                        <h2 className="text-lg font-semibold text-white">{e.title}</h2>
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-2 flex justify-between">
                          <strong>Announcement Date</strong>
                          <p className='text-black text-sm font-medium'>
                            {new Date(e.date).toLocaleDateString("en-US", {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            })}</p>

                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex justify-between">
                          <strong>Announcement Time</strong>
                          <p className='text-black text-sm font-medium'>{e.time}</p>
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Description</strong>
                          <p className='text-black font-medium text-sm'>{e.description}</p>
                        </p>
                      </div>
                    </div>
                  )) || <p>No announcements available.</p>}

                </div>
              </div>

            </div>
          )}

          {activeTab === "Tenant" && (

            <Tenant />
          )}
        </div>

      </div>
    </div>
  )
}

export default Personal_Detail
