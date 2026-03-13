import React, { useRef, useState } from "react";

export default function SignatureCanvas({ setSignature }) {

  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  function startDraw(e) {
    setDrawing(true);
    draw(e);
  }

  function endDraw() {
    setDrawing(false);

    const canvas = canvasRef.current;

    const image = canvas.toDataURL("image/png");

    setSignature(image);
  }

  function draw(e) {

    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

  }

  function clearCanvas() {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

  }

  return (

    <div className="mb-4">

      <p className="mb-2">Sign Below</p>

      <canvas
        ref={canvasRef}
        width="400"
        height="150"
        className="border"
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
        onMouseLeave={endDraw}
      />

      <div className="mt-2">

        <button
          onClick={clearCanvas}
          className="bg-gray-400 text-white px-3 py-1"
        >
          Clear
        </button>

      </div>

    </div>
  );
}