import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { uploadFile } from "../helpers/uploadfile";
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);
    // console.log("upload : ", uploadPhoto );
    setUploadPhoto(file);

    setData((prev)=> {
      return {
        ...prev,
        profile_pic : uploadPhoto?.url
      }
    })
  };

  // console.log(uploadPhoto);

  const handleClearUploadMedia = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`;

    try{
      const res = await axios.post(URL, data);
      console.log(res);
    }catch(err) {
      console.log(err);
    }

    console.log(data);
  };
  
  

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto ">
        <h3>Welcome to ChatterLoop!</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          {/* name input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name..."
              className="bg-slate-100 px-2 py-1 focus:outline-primary "
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email..."
              className="bg-slate-100 px-2 py-1 focus:outline-primary "
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password input */}

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
              className="bg-slate-100 px-2 py-1 focus:outline-primary "
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1 ">
                  {uploadPhoto?.name
                    ? uploadPhoto.name
                    : "Upload profile photo"}
                </p>

                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadMedia}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secontary tracking-wide rounded mt-2 font-bold text-white leading-relaxed">
            Register
          </button>
        </form>

        <p className="my-3 text-center">Already have account ? <Link to={"/email"} className="font-semibold hover:text-primary hover:underline" >Login</Link> </p>

      </div>
    </div>
  );
};

export default Register;
