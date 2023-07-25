import React, { useRef, useEffect } from "react";
// import canvas from "canvas";

function drawGreyCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
}

function drawRedCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
}

function drawBlueCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function Gauge({ value1, value2, temperature }) {
  const canvasRef = useRef(null);

  // useEffect(z

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log({ canvas });

    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      const width = 600;
      const x = 400;
      const y = 400;
      const radius = 300;
      const minRad = 0.75 * Math.PI;
      const maxRad = 2.25 * Math.PI;
      const valueRad1 = (maxRad - minRad) * value1 + minRad;
      const valueRad2 = (maxRad - minRad) * value2 + minRad;
      const toolTipWidth = 100;
      // const toolTipHeight = 60;
      // const toolTipArrowHeight = 30;
      // const hollowCircleRadius = 1;
      // const hollowCircleRadius2 = 20;

      const grd = ctx.createLinearGradient(x - radius, 0, x - radius + width, 0);
      grd.addColorStop(0, "red");
      grd.addColorStop(0.25, "#D70040");
      grd.addColorStop(0.5, "#FF2400");
      grd.addColorStop(0.75, "#FF4433");
      grd.addColorStop(1, "#FAA0A0");

      const grd2 = ctx.createLinearGradient(0, 0, toolTipWidth, 0);
      grd2.addColorStop(0, "white");
      grd2.addColorStop(1, "#D8D8D8");

      ctx.beginPath();
      ctx.arc(x, y, radius, minRad, maxRad);
      ctx.lineWidth = 50;
      ctx.lineCap = "round";
      ctx.strokeStyle = "white";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, radius, minRad, valueRad1);
      ctx.lineWidth = 50;
      ctx.lineCap = "round";
      ctx.strokeStyle = grd;
      ctx.stroke();

      const circularEndWidth = 80;
      ctx.beginPath();
      ctx.arc(x, y, radius + circularEndWidth / 20, valueRad1, valueRad1 + 0.001);
      ctx.lineWidth = circularEndWidth;
      ctx.lineCap = "round";
      ctx.strokeStyle = grd2;
      ctx.stroke();

      const grd3 = ctx.createLinearGradient(x - radius, 0, x - radius + width, 0);
      grd3.addColorStop(0, "#B3E5FC");
      grd3.addColorStop(0.25, "#29B6F6");
      grd3.addColorStop(0.5, "#03A9F4");
      grd3.addColorStop(0.75, "#0288D1");
      grd3.addColorStop(1, "#01579B");

      ctx.beginPath();
      ctx.arc(x, y, radius, maxRad, valueRad2, true);
      ctx.lineWidth = 50;
      ctx.lineCap = "round";
      ctx.strokeStyle = grd3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, radius + circularEndWidth / 20, valueRad2, valueRad2 + 0.001);
      ctx.lineWidth = circularEndWidth;
      ctx.lineCap = "round";
      ctx.strokeStyle = grd2;
      ctx.stroke();

      const midAngle = (valueRad1 + valueRad2) / 2;
      const startX = x + (radius - 20) * Math.cos(midAngle);
      const startY = y + (radius - 20) * Math.sin(midAngle);
      const endX = x + (radius + 20) * Math.cos(midAngle);
      const endY = y + (radius + 20) * Math.sin(midAngle);

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = 22;
      ctx.strokeStyle = "black";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = 20;
      ctx.lineCap = "round";
      ctx.strokeStyle = "yellow";
      ctx.stroke();

      const fontSize = 274;
      const textX = x;
      const textY = y;
      ctx.font = fontSize + "px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(temperature, textX, textY);

      const superscriptText = "inside";
      const superscriptFontSize = fontSize / 7;
      const superscriptX = textX - fontSize / 2;
      const superscriptY = textY - fontSize / 2;
      ctx.font = superscriptFontSize + "px Arial";
      ctx.fillText(superscriptText, superscriptX, superscriptY);

      const greyCircleRadius = 23;
      const redCircleRadius = 32;
      drawRedCircle(
        ctx,
        x + (radius + circularEndWidth / 20) * Math.cos(valueRad1),
        y + (radius + circularEndWidth / 20) * Math.sin(valueRad1),
        redCircleRadius
      );
      drawGreyCircle(
        ctx,
        x + (radius + circularEndWidth / 20) * Math.cos(valueRad1),
        y + (radius + circularEndWidth / 20) * Math.sin(valueRad1),
        greyCircleRadius
      );

      const blueCircleRadius = 32;
      drawBlueCircle(
        ctx,
        x + (radius + circularEndWidth / 20) * Math.cos(valueRad2),
        y + (radius + circularEndWidth / 20) * Math.sin(valueRad2),
        blueCircleRadius
      );
      drawGreyCircle(
        ctx,
        x + (radius + circularEndWidth / 20) * Math.cos(valueRad2),
        y + (radius + circularEndWidth / 20) * Math.sin(valueRad2),
        greyCircleRadius
      );
    }
  }, [value1, value2, temperature]);

  return (
    <div>
      <canvas ref={canvasRef} width="800" height="640" style={{ border: "1px solid #d3d3d3;" }}></canvas>;
    </div>
  );
}

export default Gauge;
