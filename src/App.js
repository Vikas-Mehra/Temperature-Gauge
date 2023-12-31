import { useEffect, useState } from "react";
import "./App.css";
import Gauge from "./gauge/Gauge";
import { IoMdFlame } from "react-icons/io";
import { LuSnowflake } from "react-icons/lu";

function App() {
  const [heat, setHeat] = useState(0); // Hard Coded Values for now. Change these values to see the working of the Gauge-Meter.
  const [cool, setCool] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const handleValue1Change = (newValue1) => {
    setHeat(newValue1);
    setTemperature((newValue1 + cool) / 2);
  };

  const handleValue2Change = (newValue2) => {
    setCool(newValue2);
    setTemperature((heat + newValue2) / 2);
  };

  // Fetch Temperature Data from Backend & set in the three states:
  const setData = () => {
    setHeat(70);
    setCool(74);
    setTemperature(72);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      <div className="bg-dark d-flex justify-content-center align-items-center">
        <div className="bg-dark d-flex flex-column justify-content-center align-items-center">
          {/* <Gauge value1={0.7 / 2} value2={(2 - 0.74) / 2} temperature="72°" /> */}
          {/* <Gauge value1={heat / 100 / 2} value2={(2 - cool / 100) / 2} temperature={`${temperature}°`} /> */}
          <Gauge
            value1={heat / 100 / 2}
            value2={(2 - cool / 100) / 2}
            temperature={`${temperature}°`}
            onValue1Change={handleValue1Change}
            onValue2Change={handleValue2Change}
          />

          <div
            className="d-flex justify-content-center align-items-center rounded m-4 p-4"
            style={{ backgroundColor: "gray" }}
          >
            <div className="m-1 d-flex flex-column gap-1">
              <IoMdFlame color="red" size={40} />
              <LuSnowflake color="blue" size={40} />
            </div>
            <h1 className="text-light text-center ">heat / cool</h1>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-light text-center p-4 px-5 rounded m-3" style={{ backgroundColor: "gray" }}>
            heat-to
            <div className="text-wrap text-danger" style={{ fontSize: "60px" }}>
              {/* 70° */}
              {`${heat}°`}
            </div>
          </h2>

          <h2 className="text-light text-center p-4  px-5 rounded m-3" style={{ backgroundColor: "gray" }}>
            cool-to
            <div className="text-wrap text-primary" style={{ fontSize: "60px" }}>
              {/* 74° */}
              {`${cool}°`}
            </div>
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
