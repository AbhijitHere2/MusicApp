import Navbar from "../components/Navbar";

// src/pages/Library.jsx
const Library = () => {
  return (
    <>
    <Navbar/>
    <div className="p-8">
      <h2 className="text-2xl font-bold">Your Purchased Songs</h2>
      <p>This section can display your purchased songs.</p>
    </div>
    </>
  );
};

export default Library;
