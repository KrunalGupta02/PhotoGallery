import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useUserAuth } from "../context/AuthContext";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const { user } = useUserAuth();

  const startUpload = (file) => {
    if (!file) {
      return;
    }

    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];

    // Firebase references
    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const collectionRef = collection(db, "images");

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        try {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
          setProgress(progress);

          const createdAt = serverTimestamp();

          // store this data into firestore db
          await addDoc(collectionRef, {
            url: downloadURL,
            createdAt: createdAt,
            email: user.email,
          });
        } catch (e) {
          console.log("error", e);
          setError(e);
        }
      }
    );
  };

  return {
    progress,
    error,
    url,
    startUpload,
  };
};

export default useStorage;
