import { useNavigate } from "react-router-dom";
import vedio from "./vedio/Intropagevedio.mp4";
import "./intropage.css";

const Intropage = () => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/homepage");
  };

  return (
    <>
      <div className="intro-page-container">
        <div className="intro-page-video-overlay"></div>

        <video
          className="intro-page-video-background"
           src={vedio} autoPlay loop muted
        />

        <div className="intro-page-content">
          <h1 className="intro-page-title">triPlanner</h1>
          <h3 className="intro-page-subtitle">A Trip To Singapore</h3>
          <button
            href="/homepage"
            className="intro-page-button"
            onClick={redirect}
          >
            Start Planning
          </button>
        </div>
      </div>
    </>
  );
};

export default Intropage;
