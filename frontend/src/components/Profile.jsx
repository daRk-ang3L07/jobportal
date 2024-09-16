import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobtable from "./AppliedJobtable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "../hooks/useGetAppliedJob";

// const skills=["HTML","CSS","JavaScript","ReactJs"];


const Profile = () => {
      useGetAppliedJob();
        const isResume = true;
        const [open,setOpen] = useState(false);
        const {user}=useSelector(store=>store.auth);
        
    
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.logodesign.net/logo/line-art-buildings-in-swoosh-1273ld.png?nwm=1&nws=1&industry=company&sf=&txt_keyword=All"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                et debitis mollitia saepe ducimus, error consequatur labore
                possimus accusantium non magnam nostrum quaerat beatae cumque
                aut similique corrupti sint nesciunt.
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
            <div className="flex items-center gap-3 my-2">
            <Mail/>
            <span>Rohan@gmail.com</span>
            </div>
            
          <div className="flex items-center gap-3 my-2">
          <Contact/>
          <span>2345678901</span>
          </div>
        
       
        </div>

        <div className="my-5">
            <h1>Skills</h1>
            <div className="flex items-center gap-1">
            {
                user?.profile?.skills.length !==0 ?  user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>):<span>NA</span>
            }
            </div>

           
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {
                isResume ? <a target="blank" href={user?.profile?.resume} className="text-blue-500 hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a>: <span>NA</span>
            }
        </div>

       
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
            <AppliedJobtable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>    
        </div>
  );
};

export default Profile;
