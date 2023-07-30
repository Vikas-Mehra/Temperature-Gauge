import React, { useRef, useEffect, useState } from "react";

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

function Gauge({ value1, value2, temperature, onValue1Change, onValue2Change }) {
  const canvasRef = useRef(null);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    // console.log({ canvas });

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
      // console.log({ maxRad, minRad, value1 });
      // console.log(`valueRad1 :>> `, valueRad1);
      const valueRad2 = (maxRad - minRad) * value2 + minRad;
      const toolTipWidth = 100;

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

      // const midAngle = (valueRad1 + valueRad2) / 2; // Movable Yellow-Marker b/w both gauges.
      const midAngle = -1.6; // Fixed Yellow-Marker in the center.
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

      // const fontSize = 274;
      const fontSize = 180;
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

      const updateValue1 = (mouseX, mouseY) => {
        const angle = Math.atan2(y - mouseY, x - mouseX);
        let newValue1 = (angle - minRad) / (maxRad - minRad);
        // console.log(`newValue1 :>> `, newValue1);
        if (newValue1 < 0) {
          newValue1 += 1;
        }
        newValue1 = Math.abs(newValue1);
        newValue1 *= 100;
        newValue1 = parseInt(newValue1);
        onValue1Change(newValue1);
      };

      const updateValue2 = (mouseX, mouseY) => {
        // const angle = Math.atan2(y - mouseY, x - mouseX);
        const angle = Math.atan2(mouseY - y, mouseX - x);
        let newValue2 = (angle - minRad) / (maxRad - minRad);
        // console.log(`newValue2 :>> `, newValue2);
        if (newValue2 < 0) {
          newValue2 += 1;
        }
        newValue2 = 1 - newValue2;
        newValue2 = Math.abs(newValue2);
        newValue2 *= 100;
        newValue2 = parseInt(newValue2);
        newValue2 = Math.min(newValue2, 100);
        onValue2Change(newValue2);
      };

      const isMouseInRedCircle = (mouseX, mouseY) => {
        const centerX = x + radius * Math.cos(valueRad1);
        const centerY = y + radius * Math.sin(valueRad1);
        const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
        // drawBlueCircle(ctx, centerX, centerY, 41);
        return distance <= 41;
      };

      const isMouseInBlueCircle = (mouseX, mouseY) => {
        const centerX = x + radius * Math.cos(valueRad2);
        const centerY = y + radius * Math.sin(valueRad2);
        const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
        // drawBlueCircle(ctx, centerX, centerY, 41);
        return distance <= 41;
      };

      const handleMouseDown = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (isMouseInRedCircle(x, y)) {
          setIsDragging1(true);
        }

        if (isMouseInBlueCircle(x, y)) {
          setIsDragging2(true);
        }
      };

      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (isDragging1) {
          updateValue1(x, y);
        }

        if (isDragging2) {
          updateValue2(x, y);
        }
      };

      const handleMouseUp = (e) => {
        setIsDragging1(false);
        setIsDragging2(false);
      };

      const handleMouseOut = () => {
        setIsDragging1(false);
        setIsDragging2(false);
      };

      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("mouseout", handleMouseOut);

      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [value1, value2, temperature, isDragging1, isDragging2, onValue1Change, onValue2Change]);

  return (
    <div>
      {/* <canvas ref={canvasRef} width="800" height="640" style={{ border: "1px solid #d3d3d3;" }}></canvas> */}

      <canvas
        ref={canvasRef}
        width="800"
        height="640"
        style={{ border: "1px solid #d3d3d3;" }}
        // onMouseMove={(e) => console.log(e)}
      ></canvas>
    </div>
  );
}

export default Gauge;
