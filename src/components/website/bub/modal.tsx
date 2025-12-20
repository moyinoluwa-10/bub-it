import React, { useState } from "react";
import { TbCopy } from "react-icons/tb";
import { GrClose } from "react-icons/gr";
import Link from "next/link";

interface ModalProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  shortUrl: string;
}

export default function Modal({ closeModal, shortUrl }: ModalProps) {
  const closeModalHandler = () => {
    closeModal(false);
  };

  const [isCopied, setIsCopied] = useState(false);
  const handleCopied = async () => {
    await navigator.clipboard.writeText(shortUrl || "");
    setIsCopied(!isCopied);
  };

  return (
    <div className="modalSection">
      <div className="overLay" onClick={closeModalHandler}></div>
      <div className="modalContainer">
        <div className="closeBtn">
          <button onClick={closeModalHandler}>
            <GrClose className="close" />
          </button>
        </div>
        <div className="title">Your Shortened Url:</div>
        <div className="body">
          <div className="inputCopy">
            <input type="url" value={shortUrl} readOnly />
            <button className="copyIcon" onClick={handleCopied}>
              <TbCopy className="copy" />
            </button>
          </div>
          {isCopied ? <span>Copied</span> : null}
        </div>
        <div className="footer bg-none!">
          <Link
            href={shortUrl}
            className="out"
            target={"_blank"}
            rel={"noreferrer"}
          >
            Go to site
          </Link>
        </div>
      </div>
    </div>
  );
}
