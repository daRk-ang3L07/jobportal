import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium inline-block">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6a38c2]">Dream Jobs</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, expedita
          voluptatum iure laborum delectus culpa?
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mx-auto">
          <div className="flex w-full sm:w-[80%] md:w-[70%] lg:w-[100%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
            <input
              type="text"
              placeholder="Find your dream jobs"
              className="outline-none border-none w-full py-2 px-4"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-full bg-[#6a38c2] text-white px-4 py-2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
