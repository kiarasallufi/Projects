import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

export const ProgressBar = () => {
  const [status, setStatus] = useState(""); 
  const [isInProcess, setIsInProcess] = useState(false);
  const [progress, setProgress] = useState(0);

  
  useEffect(() => {
    let interval;
    if (status === "inProcess" && progress < 90) {
      interval = setInterval(() => {
        setProgress((prevProgress) => Math.min(prevProgress + 1, 90));
      }, 100);
    }

 
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, progress]);

  const handleApprove = () => {
    if (status !== 'inProcess') return;
    setStatus("approved");
    setProgress(100);
    setIsInProcess(false);
  };

  const handleReject = () => {
    if (status !== 'inProcess') return;
    setStatus("rejected");
    setProgress(0);
    setIsInProcess(false);
  };

  const handleInProcessClick = () => {
    if (status === "" || status === "approved" || status === "rejected") {
      setStatus("inProcess");
      setIsInProcess(true);
      setProgress(0);
    }
  };

  const handleReset = () => {
    setStatus("");
    setProgress(0);
  };

  return (
    <div className="progress-container">
      <div className="status-label">
        <p>
          {status === "inProcess"
            ? "In Process..."
            : status === "approved"
            ? "Approved!"
            : status === "rejected"
            ? "Rejected"
            : ""}
        </p>
      </div>

      <div className="progress-bar">
        <div
          className={`progress ${
            status === "approved"
              ? "approved"
              : status === "rejected"
              ? "rejected"
              : ""
          }`}
          style={{ width: `${progress}%` }}
        >
          {status === "inProcess" && <span className="progress-text">{progress}%</span>}
        </div>
      </div>

      <button
        onClick={handleInProcessClick}
        className={`in-process-button ${status === "inProcess" ? "in-process" : ""}`}
        disabled={status === "inProcess"}
      >
        {status === "inProcess" ? "In Process..." : "Start Process"}
      </button>

      {progress >= 90 && status === "inProcess" && (
        <div className="buttons">
          <button onClick={handleReject} className="reject-button">
            Reject
          </button>
          <button onClick={handleApprove} className="approve-button">
            Approve
          </button>
        </div>
      )}

      {(status === "approved" || status === "rejected") && (
        <div className="buttons">
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
