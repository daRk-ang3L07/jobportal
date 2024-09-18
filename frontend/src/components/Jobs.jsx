import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row gap-5 relative">
          {/* Filter button for mobile */}
          <button
            className="fixed bottom-5 right-5 sm:hidden p-3 bg-blue-500 text-white rounded-full shadow-md"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </button>

          {/* Full viewport filter pop-up */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 bg-white shadow-lg p-5 sm:hidden flex flex-col">
              <button
                className="self-end text-xl font-bold"
                onClick={() => setIsFilterOpen(false)}
              >
                &times;
              </button>
              <FilterCard />
            </div>
          )}

          <div className={`w-full ${isFilterOpen ? "sm:w-0" : "sm:w-1/4"} transition-width duration-300`}>
            {!isFilterOpen && <FilterCard />}
          </div>

          {filterJobs.length === 0 ? (
            <span className="text-gray-500">No jobs found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
