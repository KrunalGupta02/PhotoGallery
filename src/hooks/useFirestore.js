import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const useFirestore = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  let unsubscribe;

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(collection(db, "images"), orderBy("createdAt", "desc"));

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            images.push(doc.data());
          });
          setDocs(images);
          setIsloading(false);
        });
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    };

    getData();

    return () => unsubscribe && unsubscribe();
  }, ["images"]);

  return { docs, isLoading };
};

export default useFirestore;
