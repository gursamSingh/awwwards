import React, { use, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1); // Keeps track of which video is currently playing in the background.
  const [hasClicked, setHasClicked] = useState(false); // checks for if the user has clicked or not

  const [isLoading, setIsLoading] = useState(true); // checks if the video is loading
  const [loadedVideo, setLoadedVideo] = useState(0); // tracks the next loaded video to be played

  const totalVideosToBePlayed = 4;
  const nextVideoRef = useRef(null); // ref for targeting a dom element {here we are targeting the nextVideo to be played }

  useEffect(() => {
    if (loadedVideo === totalVideosToBePlayed - 1) {
      setIsLoading(false);
    }
  }, [loadedVideo]);

  // Animation-1- Video scale/change on click
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          ease: "power1.inOut",
          duration: 1.5,
        });
      }
    },
    {
      dependencies: [currentVideoIndex],
      revertOnUpdate: true,
    }
  );

  // Animaiton-2-Used this gsap to add the scroll animation (wherein on scroll the video is going from full to a certin clippath)
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });
  // function to handle the loaded video
  const handleVideoLoad = () => {
    setLoadedVideo((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentVideoIndex % totalVideosToBePlayed) + 1;

  // function to handle the mini video click
  const handleMiniVideoClick = () => {
    //   set the hasclicked use state to true
    setHasClicked(true);
    // Set the current index to next current index + 1
    setCurrentVideoIndex(upcomingVideoIndex);
  };

  // Just builds the file path for the video you want.
  const getVideoSource = (index) => {
    return `videos/hero-${index}.mp4`;
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      {/* bigger video container */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* Mini Video Button */}
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Mini Video  */}
              <video
                id="current-video"
                src={getVideoSource(upcomingVideoIndex)}
                ref={nextVideoRef}
                loop
                muted
                className="size-64 rounded-lg origin-center scale-150 object-cover"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          {/* Main Background Video */}
          <video
            ref={nextVideoRef}
            src={getVideoSource(currentVideoIndex)}
            autoPlay
            muted
            loop
            id="next-video" // className="absolute left-0 top-0 size-full object-cover object-center"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center rounded-lg"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSource(currentVideoIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute z-40 bottom-5 right-5 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className=" mt-20 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-75">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer
              <br />
              Unleash the play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
