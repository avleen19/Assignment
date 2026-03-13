import React, { useState } from "react";
import CameraCapture from "../components/CameraCapture";
import SignatureCanvas from "../components/SignatureCanvas";
import { mergeImages } from "../utils/imageMerge";

export default function DetailsPage() {

  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [result, setResult] = useState(null);

  async function merge() {

    if (!photo || !signature) {
      alert("Capture photo and sign first");
      return;
    }

    const img = await mergeImages(photo, signature);

    setResult(img);

  }

  return (

    <div className="p-6">

      <h2 className="text-xl mb-4">
        Identity Verification
      </h2>

      <CameraCapture setPhoto={setPhoto} />

      {photo && (
        <img
          src={photo}
          alt="captured"
          className="w-64 border mb-4"
        />
      )}

      <SignatureCanvas setSignature={setSignature} />

      <button
        onClick={merge}
        className="bg-green-600 text-white px-4 py-2 mt-3"
      >
        Merge Image
      </button>

      {result && (

        <div className="mt-4">

          <p className="mb-2">Merged Audit Image</p>

          <img
            src={result}
            alt="merged"
            className="border"
          />

        </div>

      )}

    </div>

  );
}