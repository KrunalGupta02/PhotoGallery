import React, { useEffect } from "react";

const Modal = ({ selectedImg, setSelectedImg }) => {
  // If clicking anything outside it will close the modal
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  // Disable scrolling when the modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImg} alt="enlarged pic" />;
    </div>
  );
};

export default Modal;
