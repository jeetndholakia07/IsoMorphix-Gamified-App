import { useState, type FC } from 'react';

type gifProps = {
  gifSrc: string;
  staticImgSrc: string;
  alt: string;
};

const GifPlayer: FC<gifProps> = ({ gifSrc, staticImgSrc, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [onLoad, setOnLoad] = useState(true);

  const handleStart = () => {
    setOnLoad(false);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsPaused(true);
  };

  return (
    <div
      className="relative inline-block" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static Image or GIF */}
      {!isPlaying || isPaused ? (
        <img
          src={staticImgSrc}
          alt={alt}
          className="w-full h-full object-cover rounded-lg" 
        />
      ) : (
        <img
          src={gifSrc}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
        />
      )}

      {/* Play and Pause buttons */}
      {(!isPlaying || onLoad && isHovered) && (
        <button
          onClick={handleStart}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 z-10"
        >
          <i className="bi bi-play-fill text-2xl"></i>
        </button>
      )}

      {isPlaying && isHovered && (
        <button
          onClick={handlePause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 z-10"
        >
          <i className="bi bi-pause-fill text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default GifPlayer;
