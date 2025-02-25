
import { useState, useEffect } from 'react';
import SongItem from './SongItem';

const mockSongs = [
  {
    id: 1,
    title: 'I Am The Best',
    file: '/songs/iAmTheBest.mp3',
    preview: '/songs/iAmTheBest.mp3',
    amount: 50000, // Amount in paise (e.g., INR 500.00)
  },
  {
    id: 2,
    title: 'Jo Pyar Se Darte Ho',
    file: '/songs/JoPyarSeDarteHo.mp3',
    preview: '/songs/JoPyarSeDarteHo.mp3',
    amount: 40000,
  },
  {
    id: 3,
    title: 'No Love No Gold',
    file: '/songs/NoLoveNoGold.mp3',
    preview: '/songs/NoLoveNoGold.mp3',
    amount: 40000,
  },
  {
    id: 4,
    title: 'You came once you’ll come again',
    file: '/songs/You_came_once_you’ll_come_again,.mp3',
    preview: '/songs/You_came_once_you’ll_come_again.mp3',
    amount: 40000,
  },
  {
    id: 5,
    title: 'गाना__सपनों की उड़ान_ ',
    file: '/songs/गाना__सपनों की उड़ान_ .mp3',
    preview: '/songs/गाना__सपनों की उड़ान_ .mp3',
    amount: 40000,
  },
  // Add more songs as needed...
];

const SongList = () => {
  const [purchasedSongs, setPurchasedSongs] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('purchasedSongs')) || [];
    setPurchasedSongs(stored);
  }, []);

  const handlePurchase = (songId) => {
    const updated = [...purchasedSongs, songId];
    localStorage.setItem('purchasedSongs', JSON.stringify(updated));
    setPurchasedSongs(updated);
  };

  return (
    <div className=" max-sm:p-1 max-lg:px-0 ">
      <h2 className="text-xl font-bold my-5 mx-5 ">Song List</h2>
      <div className="space-y-2 md:p-2 max-sm:p-1  xl:grid-cols-3 grid gap-3  max-sm:grid-cols-none lg:grid-cols-2 ">

        {mockSongs.map((song) => (
          
          <SongItem
            key={song.id}
            song={song}
            isPurchased={purchasedSongs.includes(song.id)}
            onPurchase={() => handlePurchase(song.id)}
            currentAudio={currentAudio}
            setCurrentAudio={setCurrentAudio}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;
