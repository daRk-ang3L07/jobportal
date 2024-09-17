import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-white relative z-10">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Brand Name */}
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Portal</span>
          </h1>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} aria-label="Open Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden sm:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="border border-gray-900 cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-4 space-y-2">
                    <Avatar className=" cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <Button variant="link"><User2/>
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Full-Screen Sidebar for Mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div>
          <div className="fixed left-0 top-0 h-full w-3/4 bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
            {/* Close button */}
            <button onClick={toggleMenu} aria-label="Close Menu" className="absolute top-4 right-4">
              <X className="h-6 w-6" />
            </button>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="border border-gray-900 cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto} />
              </Avatar>
              <div>
                <h4 className="font-medium">{user?.fullname}</h4>
                <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Navigation Links */}
            <ul className="flex flex-col gap-5 font-medium">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies" onClick={toggleMenu}>Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" onClick={toggleMenu}>Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs" onClick={toggleMenu}>Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse" onClick={toggleMenu}>Browse</Link>
                  </li>
                </>
              )}
            </ul>

            {/* Bottom Section for Login/SignUp */}
            <div className="absolute bottom-6 left-0 w-full px-6">
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">
                      SignUp
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button onClick={logoutHandler} className="w-full" variant="outline">
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
