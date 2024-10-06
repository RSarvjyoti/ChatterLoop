import React, { useState } from "react";

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

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
  };

  console.log(uploadPhoto);

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3>Welcome to ChatterLoop!</h3>

        <form className="grid gap-4 mt-5">
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
                <p className="text-sm">
                  {uploadPhoto.name ? uploadPhoto.name : "Upload profile photo"}
                </p>
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
        </form>
      </div>
    </div>
  );
};

export default Register;
