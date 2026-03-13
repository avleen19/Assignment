import React, { useRef } from "react";

export default function CameraCapture({ setPhoto }) {

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  function startCamera() {

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      })
      .catch(err => {
        console.error("Camera error", err);
      });

  }

  function capturePhoto() {

    const video = videoRef.current;

    if (!video || video.readyState !== 4) {
      alert("Camera not ready yet");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    setPhoto(imageData);

    /*
      INTENTIONAL BUG (Memory Leak)

      The MediaStream created by getUserMedia() is never stopped.

      Normally we should run:

      streamRef.current.getTracks().forEach(track => track.stop())

      when the camera is no longer needed.

      Because we intentionally omit this cleanup,
      the camera keeps running in the background
      even after leaving the page.
    */

  }

  return (

    <div className="mb-6">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="400"
        className="border mb-3"
      />

      <div>

        <button
          onClick={startCamera}
          className="bg-blue-500 text-white px-4 py-2 mr-2"
        >
          Start Camera
        </button>

        <button
          onClick={capturePhoto}
          className="bg-green-500 text-white px-4 py-2"
        >
          Capture Photo
        </button>

      </div>

    </div>
  );
}