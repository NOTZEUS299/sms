import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import Home_totle_card from "../../../../layout/Home_totle_card";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineAttachMoney } from "react-icons/md";
import TotalBalanceChart from "../../../../layout/TotalBalanceChart";
import {
  GetAnnouncement,
  Facility_Management_Get,
  GetComplainy,
  ImportantNumbersGet,
} from "../../../../services/Api/api";
import { Get_Pending_Maintenances } from "../../Api/api";
import useSidbarTogal from "../../../../layout/useSidbarTogal";
import {
  MdAccountBalanceWallet,
  MdMoneyOff,
  MdPrecisionManufacturing,
} from "react-icons/md";

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  let [data, setdata] = useState(280);
  let [getdata, setget] = useState(280);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  useSidbarTogal({ setdata, setget, isOpen });

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState("");

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    ImportantNumbersGet(setContacts, setLoading);
  };

  // Pending Maintenances

  const [PendingData, setPendingData] = useState("");

  useEffect(() => {
    GetPendMain();
  }, []);

  const GetPendMain = () => {
    Get_Pending_Maintenances(setPendingData);
  };

  // get complaint List

  useEffect(() => {
    getComplaintdata();
  }, []);

  const [filter, setFilter] = useState("Month");

  let [getComplaint, setgetComplaint] = useState([]);
  const [loadingcomplaint, setloadingcomplaint] = useState(true);
  const getComplaintdata = () => {
    GetComplainy(setgetComplaint, setloadingcomplaint);
  };

  const filterComplaints = () => {
    const now = new Date();
    return getComplaint.filter((e) => {
      const complaintDate = new Date(e.createdAt);
      switch (filter) {
        case "Day":
          return now.toDateString() === complaintDate.toDateString();
        case "Week":
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return complaintDate >= weekAgo && complaintDate <= now;
        case "Month":
          return (
            complaintDate.getMonth() === now.getMonth() &&
            complaintDate.getFullYear() === now.getFullYear()
          );
        default:
          return true;
      }
    });
  };

  const [activities, setActivities] = useState([]);
  const [facility, setFacility] = useState([]);
  const [Loding, setLoding] = useState(true);

  useEffect(() => {
    fetchActivities();
    fetchFacility();
  }, []);

  const fetchActivities = async () => {
    GetAnnouncement(setActivities, setLoding);
  };

  const fetchFacility = async () => {
    Facility_Management_Get(setFacility, setLoding);
  };

  const getFirstLetter = (title) => {
    return title ? title.charAt(0).toUpperCase() : ""; // Get the first letter and capitalize it
  };

  return (
    <div className="bg-[#f0f5fb] h-full">
      <Sidebar toggleNav={toggleNav} data={data} />
      <div id="main" className={`ml-[${getdata}px] max-[426px]:ml-0`}>
        <div className="open_he">
          <Header toggleNav={toggleNav} />
        </div>
        <div className="flex-1 space-y-6 p-6">
          <div className="grid xl:grid-cols-4 grid-cols-1 gap-4">
            <div className="bg-white xl:col-span-3 rounded-lg shadow">
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg text-blue-600 font-semibold">
                    Complaint List
                  </h2>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Month">Month</option>
                    <option value="Week">Week</option>
                    <option value="Day">Day</option>
                  </select>
                </div>
                <div className="overflow-x-auto h-32 px-2">
                  {loadingcomplaint ? (
                    <div className="flex justify-center h-full items-center pb-10">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                    </div>
                  ) : (
                    <table className="min-w-full text-left rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-[#eef1fd] text-gray-700">
                          <th className="px-4 py-2">Complainer Name</th>
                          <th className="px-4 py-2">Complaint Name</th>
                          <th className="px-4 py-2 text-center">Date</th>
                          <th className="px-4 py-2 text-center">Priority</th>
                          <th className="px-4 py-2 text-center">
                            Complain Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterComplaints().map((e, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 flex items-center space-x-2">
                              <img
                                className="w-8 h-8 rounded-full"
                                src="https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770799/bl9awma4kwu1d9tdrakp.png
"
                                alt="profile"
                              />
                              <span>{e.Complainer_Name}</span>
                            </td>
                            <td className="px-4 py-2">{e.Complaint_Name}</td>
                            <td className="px-4 py-2 text-center">
                              {new Date(e.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span
                                className={`px-3 py-1 rounded-full text-md font-medium flex justify-center ${
                                  e.Priority === "High"
                                    ? "bg-[#e74c3c] text-white"
                                    : e.Priority === "Medium"
                                    ? "bg-[#5678e9] text-white"
                                    : e.Priority === "Low"
                                    ? "bg-[#39973d] text-white"
                                    : null
                                }`}
                              >
                                {e.Priority}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span
                                className={`px-3 py-1 rounded-full text-md font-medium flex justify-center ${
                                  e.Status === "Open"
                                    ? "bg-[#eef1fd] text-[#5678e9]"
                                    : e.Status === "Pending"
                                    ? "bg-[#fff9e7] text-[#ffc313]"
                                    : e.Status === "Solve"
                                    ? "bg-[#ebf5ec] text-[#39973d]"
                                    : null
                                }`}
                              >
                                {e.Status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-blue-600 font-semibold">
                  Upcoming Activity
                </h2>
                <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Month</option>
                  <option>Week</option>
                  <option>Day</option>
                </select>
              </div>
              {Loding ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                </div>
              ) : (
                <div className="bg-white rounded-lg w-full h-32 overflow-auto px-2">
                  <div className="space-y-4">
                    {/* Dynamically render each activity item */}
                    {activities.map((activity, index) => (
                      <div
                        className="flex items-center justify-between"
                        key={index}
                      >
                        <div className="flex items-center space-x-3">
                          {/* Use different colors for different activities based on type */}
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                              activity.color
                                ? `bg-${activity.color}-100`
                                : "bg-slate-200"
                            }  'gray-600' font-bold`}
                          >
                            {getFirstLetter(activity.title)}
                          </div>
                          <div>
                            <p className="text-gray-900 capitalize font-medium">
                              {activity.title}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {" "}
                          {new Date(activity.date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg col-span-1">
              <div className=" bg-white rounded-lg">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg text-blue-600 font-semibold">
                    Important Numbers
                  </h2>
                </div>
                <div className="space-y-4 h-80 overflow-y-auto pr-2">
                  {loading ? (
                    <div className="flex justify-center h-full items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#4CC9FE]" />
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {contacts.map((contact) => (
                        <div
                          key={contact._id}
                          className="flex justify-between items-center p-4 border-2 border-gray-100 rounded-lg"
                        >
                          <div>
                            <p className="text-sm text-blue-400">
                              Name :{" "}
                              <span className="text-black capitalize font-semibold">
                                {contact.Fullname}
                              </span>
                            </p>
                            <p className="text-sm text-blue-400">
                              Phone Number :{" "}
                              <span className="text-black capitalize font-semibold">
                                {contact.Phonenumber}
                              </span>
                            </p>
                            <p className="text-sm text-blue-400">
                              Work :{" "}
                              <span className="text-black capitalize font-semibold">
                                {contact.Work}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg text-blue-600 font-semibold">
                  Pending Maintenances
                </h2>
                <a href="#" className="text-blue-500 text-sm">
                  View all
                </a>
              </div>
              <div className="space-y-4 overflow-y-auto w-full h-96 px-2">
                {PendingData.length > 0 ? (
                  PendingData.map((e, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={
                            e.avatar ||
                            "https://res.cloudinary.com/ddf3pgcld/image/upload/v1733770799/bl9awma4kwu1d9tdrakp.png"
                          }
                          alt={`${e.name}'s avatar`}
                        />
                        <div>
                          <p className="font-medium">{e.Name}</p>
                          <p className="text-sm text-gray-500">{e.Status}</p>
                        </div>
                      </div>
                      <p className="text-red-500 font-semibold">₹ {e.Amount}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No pending data available.
                  </p>
                )}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg col-span-1">
              <div className=" bg-white rounded-lg">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg text-blue-600 font-semibold">
                    Upcoming Bookings
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg col-span-1">
              <div className=" bg-white rounded-lg">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg text-blue-600 font-semibold">Facility</h2>
                </div>
                <div className="mt-6">
  {loading ? (
    <div className="flex justify-center h-full items-center">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400" />
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4 max-h-[24rem] overflow-y-auto pr-2">
      {facility.map((facility) => (
        <div
          key={facility._id}
          className="flex items-start p-5 bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-lg transition duration-200"
        >
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Facility Name</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{facility.Facility_Name}</p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="text-sm text-gray-400">Description</span>
            </div>
            <p className="text-base text-gray-700">{facility.Description}</p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="text-sm text-gray-400">Scheduled Date</span>
            </div>
            <p className="text-base text-gray-700">
              {new Date(facility.Schedule_Service_Date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
