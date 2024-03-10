import React, { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "./Modal";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

const ImageGallery = () => {
  const { docs, isLoading } = useFirestore();
  // console.log(docs, "docs");

  const [selectedImg, setSelectedImg] = useState(null);

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

  const getFilename = (url) => {
    // Split the URL by '/' and decode the encoded part
    const parts = decodeURIComponent(url).split("/");

    // Get the last part of the URL
    const lastPart = parts[parts.length - 1];

    // Extract the filename without query parameters
    const filename = lastPart.split("?")[0];

    return filename;
  };

  const handleDelete = async (id, url) => {
    try {
      // Get the filename from the URL
      const filename = getFilename(url);

      // Reference to the Firestore document
      const docRef = doc(db, "images", id);

      // Reference to the Storage file
      const imageRef = ref(storage, `images/${filename}`);

      // Delete both Firestore document and Storage file concurrently
      await Promise.all([
        // Delete document from Firestore
        deleteDoc(docRef),
        // Delete file from Storage
        deleteObject(imageRef),
      ]);

      console.log("Document and file deleted successfully");
    } catch (error) {
      console.error("Error deleting document and file:", error);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-3 m-5 gap-4 mt-10">
        {docs.map((data) => (
          <div
            className="card card-compact relative w-full bg-base-100 shadow-xl rounded-none border border-white"
            key={data.id}
          >
            <figure>
              <img
                src={data.url}
                alt={data.name}
                onClick={() => setSelectedImg(data.url)}
                className="cursor-pointer max-h-52 w-full hover:scale-95 transition-all duration-75"
              />
              <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full">
                <RiDeleteBin6Line
                  size={20}
                  className="hover:text-red-600 text-black"
                  onClick={() => handleDelete(data.id, data.url)}
                />
              </button>
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

      {/* Modal */}
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </>
  );
};

export default ImageGallery;
