import React, { useEffect, useState } from "react";
import SolutionMenu from "./SolutionMenu";

const ProblemDisplay = () => {
  const [topic, setTopic] = useState(null);
  const [problem, setProblem] = useState(null);
  const [solution, setSolution] = useState(null);
  useEffect(() => {
    // Send a message to the extension
    window.postMessage({ type: "FROM_PAGE", key: "topic" }, "*");

    // Listen for messages from the extension
    const handleMessage = (event) => {
      if (event.source !== window) return;
      if (event.data.type && event.data.type === "FROM_EXTENSION") {
        console.log(event.data.data);
        setTopic(event.data.data);
      }
    };
    window.addEventListener("message", handleMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (topic !== null) {
      console.log("Topic:", topic)
      fetch("34.31.69.199/api/problem/generate", {
        mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      })
        .then((response) => response.json())
        .then((data) => {
          const obj = JSON.parse(data.response.slice(7, -6));
          console.log(obj.problem);
          console.log(obj.solution);
          setProblem(obj.problem);
          setSolution(obj.solution);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [topic]);

  return (
    <div className="div-wrapper">
        <div>
        {problem === null ? (
            <h1>Loading...</h1>
        ) : (
            <div>
            <h1>{problem}</h1>
            </div>
        )}
        <SolutionMenu solution={solution} setSolution={setSolution} />
        </div>
    </div>
  );
};

export default ProblemDisplay;