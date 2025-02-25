// src/components/SongItem.jsx
import { useState, useRef, useEffect } from "react";
import PaymentModal from "./PaymentModal";
import { BsMusicNoteList } from "react-icons/bs";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

import "./songItem.css";

const SongItem = ({
  song,
  isPurchased,
  onPurchase,
  currentAudio,
  setCurrentAudio,
}) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const previewDuration = 60000; // 60 seconds
  let previewTimeout;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setPlaying(false);
        if (currentAudio === audioRef.current) {
          setCurrentAudio(null);
        }
      };
    }
    // Clear the timeout on unmount
    return () => {
      clearTimeout(previewTimeout);
    };
  }, [currentAudio, setCurrentAudio, previewTimeout]);

  const stopAudioAndReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlaying(false);
    setCurrentAudio(null);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    // Pause any currently playing song
    if (currentAudio && currentAudio !== audioRef.current) {
      currentAudio.pause();
    }

    if (playing) {
      stopAudioAndReset();
    } else {
      audioRef.current.play();
      setCurrentAudio(audioRef.current);
      // For unpurchased songs, automatically trigger payment after 30 seconds
      if (!isPurchased) {
        previewTimeout = setTimeout(() => {
          // If still unpurchased, stop and show payment modal
          stopAudioAndReset();
          setShowPayment(true);
        }, previewDuration);
      }
    }
    setPlaying(!playing);
  };

  const handleDownload = () => {
    // When download is clicked, stop the song if it's playing
    if (playing) {
      stopAudioAndReset();
    }
    if (isPurchased) {
      window.open(song.file, "_blank");
    } else {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    onPurchase();
    setShowPayment(false);
  };

  return (
    <div className=" border  max-sm:w-[23rem] max-sm:p-1 hover:border-black  border-white h-42 bg-gray-200 hover:shadow-lg rounded-xl flex justify-between  items-center  text-wrap ">
      <div className=" flex items-center max-sm:w-[14rem] w-full ">
        <BsMusicNoteList
          className="w-7 mx-2
       "
        />

        <div className="back w-55 max-sm:w-30  h-30  flex justify-center items-center">
          <button
            onClick={handlePlayPause}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:text-gray-700 md:px-2 hover:bg-white "
          >
            {playing ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        <h3 className=" ml-1 text-sm text-wrap max-md:w-21 font-medium bg-transparent  w-full max-sm:hidden">
          {song.title}
        </h3>
        <audio
          ref={audioRef}
          src={isPurchased ? song.file : song.preview}
          preload="metadata"
        />
      </div>
      <div className="space-x-2  space-y-2 max-lg:w-1/3 w-1/2 max-sm:w-1/3">
      <h3 className=" ml-1 text-sm text-wrap max-md:w-21 font-medium bg-transparent w-full md:hidden">
          {song.title}
        </h3>
        <button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-700 text-white px-1.5 py-1 rounded flex items-center gap-2   "
        >
          Download
          <HiDownload />
        </button>
      </div>
      <PaymentModal
        isOpen={showPayment}
        onSuccess={handlePaymentSuccess}
        onClose={() => setShowPayment(false)}
        songId={song.id}
        amount={song.amount}
      />
    </div>
  );
};

export default SongItem;
