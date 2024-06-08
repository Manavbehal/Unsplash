import './Photo.css';
import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import buttonStyle from "../../Styles/ButtonStyle";
import download from "../../images/download_icon.png";
import "../../Styles/hideStyle.css";
import './Photo.css';
const phtoStyle = StyleSheet.create({
  heartIcon: {
    color: "#767676"
  },
  imageStyle: {
    width: "100%",
    display: "block",
    borderRadius: "2px"
  },
  buttonMargin: {
    "margin-left": "8px"
  },
  fullNameCss: {
    color: "white",
    position: "relative",
    top: "5px",
    '@media (max-width: 768px)': {
      color:"black",
    },
  },
  userIcon: {
    "border-radius": "18px"
  },
  downloadIcon: {
    width: "20px",
    height: "18px",
    "border-radius": "4px",
    "padding-top": "7px",
    "justify-content": "center"
  }
});
const photo = ({
  photoUrl,
  likes,
  profilePhoto,
  firstName,
  lastName,
  downloadUrl
}) => {
  return (
    <div className="unplashPhtoDiv">
      <div className="likeDiv">
        <div className={css(buttonStyle.button)}>
          <span className={css(phtoStyle.heartIcon)}>
            <i className="fas fa-heart" />
          </span>{" "}
       
        </div>
        <div className={css(buttonStyle.button, phtoStyle.buttonMargin)}>
          <i className="fas fa-plus" /> 
        </div>
      </div>

      <div className="footerDiv-hidden">
        <img src={profilePhoto} className={css(phtoStyle.userIcon)} />
        <div className={css(phtoStyle.buttonMargin)}>
          <span
            className={css(phtoStyle.fullNameCss)}
          >{`${firstName} ${lastName}`}</span>
        </div>
      


      
      </div>
      <img src={photoUrl} className={css(phtoStyle.imageStyle)} />

      <div className="likeDiv-hidden">
        <div className={css(buttonStyle.button)}>
          <span className={css(phtoStyle.heartIcon)}>
            <i className="fas fa-heart" />
          </span>{" "}
       
        </div>
        <div className={css(buttonStyle.button, phtoStyle.buttonMargin)}>
          <i className="fas fa-plus" /> 
        </div>
        <div className="downloadPhoto-hidden">
        <a
          className={css(buttonStyle.button)}
          href={`${downloadUrl}?force=true`}
          target="_blank"
        >
          <img src={download} className={css(phtoStyle.downloadIcon)} />
        </a>

        
      </div>
      </div>



      <div className="footerDiv">
        <img src={profilePhoto} className={css(phtoStyle.userIcon)} />
        <div className={css(phtoStyle.buttonMargin)}>
          <span
            className={css(phtoStyle.fullNameCss)}
          >{`${firstName} ${lastName}`}</span>
        </div>
      </div>


      <div className="downloadPhoto">
        <a
          className={css(buttonStyle.button)}
          href={`${downloadUrl}?force=true`}
          target="_blank"
        >
          <img src={download} className={css(phtoStyle.downloadIcon)} />
        </a>


      </div>
    </div>
  );
};
export default photo;
