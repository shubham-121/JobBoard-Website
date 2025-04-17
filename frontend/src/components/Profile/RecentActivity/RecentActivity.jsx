import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../Redux/Slices/modalSlice";
import useUserRecentActivity from "../../Utils/custom hooks/useUserRecentActivity";
import { useNavigate } from "react-router";
import applicationDate from "../../Utils/applicationDate";

export default function RecentActivity({ userId }) {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((store) => store.modal);

  //prettier-ignore
  const{ recentActivity, isLoadingRecentActivity } =useUserRecentActivity(userId);

  console.log("recent activity data", recentActivity);

  return (
    <div>
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {isLoadingRecentActivity && (
            <p className="text-lg font-semibold text-gray-600 text-center">
              Loading Recent activity{" "}
            </p>
          )}
          <div className="bg-white w-[900px] h-[600px] p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full hover:scale-95 transition"
              onClick={() => dispatch(closeModal())}
            >
              X
            </button>

            {/* Modal Header */}
            <h2 className="text-xl text-gray-700 font-semibold mb-4 text-center">
              Your Recent Activity
            </h2>

            {/* Content */}
            {recentActivity?.userRecentActivity ? (
              <RenderRecentActivity
                recentActivity={recentActivity?.userRecentActivity}
              />
            ) : (
              <p className="text-lg font-semibold text-gray-600 text-center">
                Loading Recent activity
              </p>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

//redner recent activity list
function RenderRecentActivity({ recentActivity }) {
  const navigate = useNavigate();
  const { appliedJobsActivity, savedJobsActivity, updatedProfileActivity } =
    recentActivity;

  // console.log(appliedJobsActivity);
  // console.log(savedJobsActivity);

  function formatDate(date) {
    const savedAt = applicationDate(date);

    return savedAt === "Today" ? "Today" : `${savedAt} Days Ago`;
  }

  return (
    <div className="space-y-4 px-4 py-2 overflow-y-auto h-[500px]">
      {/* Applied Jobs activity */}
      {appliedJobsActivity.length > 0 && (
        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
          Applied Jobs
        </h3>
      )}

      {appliedJobsActivity.map((activity, indx) => (
        <div
          key={`applied-${indx}`}
          className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition duration-200"
        >
          <p className="text-gray-800 mb-2">
            <span className="font-medium">You applied to:</span>{" "}
            <span className="font-semibold">{activity.jobTitle}</span> at{" "}
            <span className="italic font-bold">{activity.jobCompany}</span>
          </p>
          <p className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span>
              Applied:{" "}
              <span className="font-medium text-gray-700">
                {formatDate(activity.createdAt)}
              </span>
            </span>

            <span
              className={`${
                formatDate(activity.createdAt) === "Today"
                  ? "bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold"
                  : ""
              }`}
            >
              {formatDate(activity.createdAt) === "Today" ? "Latest" : ""}
            </span>
          </p>
          <button
            onClick={() => navigate(`/findJobs/${activity.jobId?._id}`)}
            className="text-blue-600 font-semibold hover:text-green-500 transition"
          >
            Show Details &rarr;
          </button>
        </div>
      ))}

      {/* Saved Jobs activity*/}
      {savedJobsActivity.length > 0 && (
        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
          Saved Jobs
        </h3>
      )}
      {savedJobsActivity.map((activity, indx) => (
        <div
          key={`saved-${indx}`}
          className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition duration-200"
        >
          <p className="text-gray-800 mb-2">
            <span className="font-medium">You saved a job:</span>{" "}
            <span className="font-semibold">{activity.jobId.jobTitle}</span> at{" "}
            <span className="italic font-bold">
              {activity.jobId.jobCompany}
            </span>
          </p>
          <p className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span>
              Saved:{" "}
              <span className="font-medium text-gray-700">
                {formatDate(activity.createdAt)}
              </span>
            </span>

            <span
              className={`${
                formatDate(activity.createdAt) === "Today"
                  ? "bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold"
                  : ""
              }`}
            >
              {formatDate(activity.createdAt) === "Today" ? "Latest" : ""}
            </span>
          </p>
          <button
            onClick={() => navigate(`/findJobs/${activity.jobId?._id}`)}
            className="text-blue-600 font-semibold hover:text-green-500 transition"
          >
            Show Details &rarr;
          </button>
        </div>
      ))}

      {/* updated profile of user activity */}
      {updatedProfileActivity && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
            Saved Jobs
          </h3>

          <div className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition duration-200">
            <p className="text-gray-800 mb-2"></p>
            <p className="flex justify-between items-center mt-2 text-sm text-gray-600">
              <span>
                <span className="font-bold text-center text-gray-700">
                  {updatedProfileActivity}
                </span>
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
