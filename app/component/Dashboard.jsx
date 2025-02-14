"use client";
import Image from "next/image";
import Sidebar from "@/app/component/Sidebar";
import React from "react";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import htmlLogo  from "@/public/assets/htmlLogo.png"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircularProgress } from "@mui/material";

const SkillProgressBar = ({ label, percentage, color}) => {
  return (
    <>
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 font-medium">
          {label}
        </span>
        <span className="font-medium" style={{color}}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-9">
        <div className="h-2.5 rounded-full" style={{width: `${percentage}%`, backgroundColor: color}}></div>
      </div>
    </div>
    </>
  )
}

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [stats, setStats] = useState({
    rank: 1,
    percentile: 30,
    score: "10/15",
  });
  const [formValues, setFormValues] = useState({
    rank: "",
    percentile: "",
    score: "",
  });

  const [data, setData] = useState([
    { x: 0, y: 2 },
    { x: 10, y: 5 },
    { x: 20, y: 12 },
    { x: 30, y: 18 },
    { x: 40, y: 25 },
    { x: 50, y: 38 },
    { x: 60, y: 30 },
    { x: 70, y: 20 },
    { x: 80, y: 15 },
    { x: 90, y: 10 },
    { x: 100, y: 5 },
  ]);

  const handleUpdateClick = () => setShowPopup(true);
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const newScore = formValues.score? parseInt(formValues.score) : parseInt(stats.score)
    const newPercentile = formValues.percentile
      ? Number(formValues.percentile)
      : stats.percentile;

    setStats({
      rank: formValues.rank || stats.rank,
      percentile: formValues.percentile || stats.percentile,
      score: `${newScore}/15` ,
    });

    const updateData = data.map((point) => ({
      ...point,
      y: point.x <= newPercentile ? point.y + 5 : point.y - 2,
    }));
    setData(updateData);

    setShowPopup(false);
  };

  return (
    <>
      <div className="flex">
        
        <div className="sideDash -z-10">
          <Sidebar />
        </div>
        <div className="p-7 mx-w-lg mx-auto relative left-0">
        <h5>Skill Test</h5>
        <div className="UI_Container relative left-0 flex justify-center items-center gap-10">
        <section className="leftui">
            {/* Skill Test box */}
            <div className="border p-4 py-8 rounded-lg shadow-md">
              <div className="gap-10 flex justify-between items-center">
                <div>
                <Image src={htmlLogo} width={52} alt="html"/>
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    Hyper Text Markup Language
                  </h2>
                  <p className="text-sm text-gray-600">
                    {" "}
                    Question: 08 | Duration: 15 mins | Submitted on 5 June 2021
                  </p>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
              </div>
            </div>

            {/* quick statistics */}
            <div className="border p-4 mt-4 rounded-lg shadow-md">
              <h3 className="font-semibold">Quick Statistics</h3>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="font-bold">{stats.rank}</p>{" "}
                  <p className="text-gray-600">Your Rank</p>
                </div>
                <div>
                  <p className="font-bold">{stats.percentile}</p>{" "}
                  <p className="text-gray-600">Percentile</p>
                </div>
                <div>
                  <p className="font-bold">{stats.score}</p>{" "}
                  <p className="text-gray-600">Correct Answers</p>
                </div>
              </div>
            </div>

            {/* Comparison Graph */}
            <div className="border p-4 mt-4 rounded-lg shadow-md">
              <h3 className="font-semibold">Comparison Graph</h3>
              <p><b>You scored {stats.percentile}% percentile, which is lower than the</b> <br /> average percentile of 72% of all the engineers who took the test
              </p>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <XAxis dataKey="x" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="y" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* popup-Form */}

            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Update Scores</h2>
                  <label className="block mb-2">
                    <span>Update Your Rank</span>
                    <input
                      type="number"
                      name="rank"
                      className="w-full p-2  border rounded mt-1"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="block mb-2">
                    <span>Update Your Percentile</span>
                    <input
                      type="number"
                      name="percentile"
                      className="w-full p-2  border rounded mt-1"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="block mb-2">
                    <span>Update Your Current Score (out of 15)</span>
                    <input
                      type="number"
                      name="score"
                      className="w-full p-2  border rounded mt-1"
                      onChange={handleChange}
                    />
                  </label>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded"
                      onClick={() => setShowPopup(false)}
                    >
                      {" "}
                      Cancel
                    </button>
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
          <section className="rightui  flex flex-col relative top-4 -z-10">
            {/* SKILL PROGRESSBAR */}
            <div className="border p-4 mt-4 rounded-lg shadow-md h-full ">
              <h3 className="font-semibold mb-9">Skill Progress</h3>
              <SkillProgressBar label="HTML Tools, Forms, History" percentage={80} color="#4088F4"/>
              <SkillProgressBar label="Tags & References in HTML" percentage={60} color="#FB9B40"/>
              <SkillProgressBar label="Tables & References in HTML" percentage={24} color="#FB6868"/>
              <SkillProgressBar label="Tables & CSS Basics" percentage={96} color="#90E571"/>
            </div>
            
            
            {/* QUESTION ANALYSIS */}
            <div className="border p-4 mt-4 max-w-screen-xl rounded-lg shadow-md flex flex-col justify-center ">
              <div className="flex justify-between">
              <h4>Question Analysis</h4>
              <p>{stats.score}</p>
              </div>
              <p><b>You scored {parseInt(stats.score)} out of /15.</b>However it still <br /> need some improvements</p>
              <div className="relative w-96 h-64 flex justify-center items-center">
                <CircularProgress variant="determinate" value={(parseInt(stats.score/15)* 100)} size={126} thickness={4}/>
                <span className="absolute text-lg font-bold ">🎯</span>
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
