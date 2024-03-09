import React from "react";
import useFirestore from "../hooks/useFirestore";

const ImageGallery = () => {
  const { docs, isLoading } = useFirestore();
  //   console.log(docs, "docs");

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (docs.length == 0) {
    return (
      <div className="flex justify-center items-center mt-10">
        <img
          src="https://img.freepik.com/free-vector/gradient-no-photo-sign-design_23-2149288316.jpg?t=st=1710011649~exp=1710015249~hmac=c1e345421899eaa9197c3fe4aa9f55d9bdfd3a07069f759ade09509de2ba7550&w=740"
          alt="errorImg"
          className="mix-blend-screen max-h-36 rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 m-5 gap-4 mt-10">
      {docs.map((data, index) => (
        <div
          className="card card-compact w-full bg-base-100 shadow-xl rounded-none border border-white"
          key={index}
        >
          <figure className="">
            <img
              src={data.url}
              alt="image"
              className="cursor-pointer max-h-52 w-full hover:scale-95 transition-all duration-75"
            />
          </figure>
          <div className="card-body">
            <p>Upload By : {data.email}</p>
            <p>
              Created At:{" "}
              {new Date(data.createdAt?.seconds * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
