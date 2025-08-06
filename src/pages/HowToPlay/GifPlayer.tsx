import { useState, type FC } from 'react';
import { useMediaQuery } from '../../utils/useMediaQuery.js';

type GifProps = {
  gifSrc: string;
  staticImgSrc: string;
  alt: string;
};

const GifPlayer: FC<GifProps> = ({ gifSrc, staticImgSrc, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [onLoad, setOnLoad] = useState(true);
  const [showButtonsMobile, setShowButtonsMobile] = useState(false);
  const [mobileLoad,setMobileLoad] = useState(true);

  const isMobile = useMediaQuery('(max-width: 800px)');

  const handleStart = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // prevent bubbling
    setOnLoad(false);
    setMobileLoad(false);
    setIsPlaying(true);
    setIsPaused(false);
    if (isMobile) setShowButtonsMobile(true);
  };

  const handlePause = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // prevent bubbling
    setIsPlaying(false);
    setIsPaused(true);
    if (isMobile) setShowButtonsMobile(true);
  };

  // On mobile, tap toggles play/pause and toggles button visibility
  const handleMobileToggle = () => {
    if (!isMobile) return;

    if (isPlaying) {
      handleStart();
    } else {
      handlePause();
    }
    setShowButtonsMobile(!showButtonsMobile);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleMobileToggle}
      style={{ cursor: 'pointer' }}
    >
      {/* Static Image or GIF */}
      {!isPlaying || isPaused ? (
        <img
          src={staticImgSrc}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
          draggable={false}
          loading="lazy"
        />
      ) : (
        <img
          src={gifSrc}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
          draggable={false}
          loading="lazy"
        />
      )}

      {/* Play button */}
      {((!isPlaying || (onLoad && isHovered)) && (!isMobile || mobileLoad || showButtonsMobile)) && (
        <button
          onClick={handleStart}
          className="absolute top-1/2 left-1/2 transform hover:cursor-pointer -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 z-10"
          aria-label="Play GIF"
        >
          <i className="bi bi-play-fill text-2xl"></i>
        </button>
      )}

      {/* Pause button */}
      {(isPlaying && (isHovered || (isMobile && !showButtonsMobile))) && (
        <button
          onClick={handlePause}
          className="absolute top-1/2 left-1/2 transform hover:cursor-pointer -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 z-10"
          aria-label="Pause GIF"
        >
          <i className="bi bi-pause-fill text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default GifPlayer;
