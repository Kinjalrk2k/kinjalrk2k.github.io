import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends React.Component {
  state = {
    social: [
      {
        link: "https://github.com/Kinjalrk2k",
        icon: <FontAwesomeIcon icon={["fab", "github"]} />,
      },
      {
        link: "https://www.linkedin.com/in/kinjal-raykarmakar",
        icon: <FontAwesomeIcon icon={["fab", "linkedin"]} />,
      },
      {
        link: "https://www.facebook.com/kinjal.raykarmakar",
        icon: <FontAwesomeIcon icon={["fab", "facebook"]} />,
      },
      {
        link: "https://www.instagram.com/kinjal.raykarmakar",
        icon: <FontAwesomeIcon icon={["fab", "instagram"]} />,
      },
      {
        link: "https://twitter.com/kinjal2209",
        icon: <FontAwesomeIcon icon={["fab", "twitter"]} />,
      },
      {
        link: "https://www.quora.com/profile/Kinjal-Raykarmakar",
        icon: <FontAwesomeIcon icon={["fab", "quora"]} />,
      },
      {
        link: "https://profile.codersrank.io/user/kinjalrk2k",
        icon: <span className="codersrank">&#xe91b;</span>,
      },
      {
        link: "https://www.hackerrank.com/kinjalrk2k",
        icon: <FontAwesomeIcon icon={["fab", "hackerrank"]} />,
      },
      {
        link: "https://www.codechef.com/users/kinjalrk2k",
        icon: <span className="codechef">&#xe900;</span>,
      },
      {
        link: "https://stackoverflow.com/users/10537134/kinjal-raykarmakar",
        icon: <FontAwesomeIcon icon={["fab", "stack-overflow"]} />,
      },
      {
        link: "https://www.youtube.com/channel/UCINTZKi7pDBr_iDkibhTXVg/",
        icon: <FontAwesomeIcon icon={["fab", "youtube"]} />,
      },
      {
        link: "https://www.deviantart.com/kinjal2209",
        icon: <FontAwesomeIcon icon={["fab", "deviantart"]} />,
      },
      {
        link: "https://www.reddit.com/user/krk2k",
        icon: <FontAwesomeIcon icon={["fab", "reddit"]} />,
      },
      // {
      //   link: "https://in.pinterest.com/kinjalraykarmak",
      //   icon: <FontAwesomeIcon icon={["fab", "pinterest"]} />,
      // },
      {
        link: "https://dev.to/kinjalrk2k",
        icon: <FontAwesomeIcon icon={["fab", "dev"]} />,
      },
      {
        link: "https://www.credly.com/users/kinjalrk2k/badges",
        icon: <span className="credly">&#xe901;</span>,
      },
    ],
  };

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.innerRef = React.createRef();
  }

  renderSocial() {
    return this.state.social.map((s, i) => {
      return (
        <div key={i}>
          <a href={s.link}>{s.icon}</a>
        </div>
      );
    });
  }

  componentDidMount() {
    // Mouse
    var mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function (event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function (e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function () {
        return "(" + this.x + ", " + this.y + ")";
      },
    };

    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(this.containerRef.current);

    //-----------------------------------------

    var counter = 0;
    var updateRate = 10;
    var isTimeToUpdate = function () {
      return counter++ % updateRate === 0;
    };

    //-----------------------------------------
    const that = this;

    var onMouseEnterHandler = function (event) {
      update(event);
    };
    var onMouseLeaveHandler = function () {
      that.innerRef.current.style = "";
    };
    var onMouseMoveHandler = function (event) {
      if (isTimeToUpdate()) {
        update(event);
      }
    };

    //-----------------------------------------

    var update = function (event) {
      mouse.updatePosition(event);
      updateTransformStyle(
        (mouse.y / that.innerRef.current.offsetHeight / 2).toFixed(2),
        (mouse.x / that.innerRef.current.offsetWidth / 2).toFixed(2)
      );
    };

    var updateTransformStyle = function (x, y) {
      var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
      that.innerRef.current.style.transform = style;
      that.innerRef.current.style.webkitTransform = style;
      that.innerRef.current.style.mozTransform = style;
      that.innerRef.current.style.msTransform = style;
      that.innerRef.current.style.oTransform = style;
    };

    //-----------------------------------------

    this.containerRef.current.onmouseenter = onMouseEnterHandler;
    this.containerRef.current.ontouchstart = onMouseEnterHandler;

    this.containerRef.current.onmouseleave = onMouseLeaveHandler;
    this.containerRef.current.ontouchleave = onMouseLeaveHandler;

    this.containerRef.current.onmousemove = onMouseMoveHandler;
    this.containerRef.current.ontouchmove = onMouseMoveHandler;
  }

  render() {
    return (
      <div id="container" ref={this.containerRef}>
        <div id="inner" ref={this.innerRef}>
          <div>
            <div id="header">
              <img
                id="profile"
                onLoad={(e) => (e.target.className = "img-onLoad")}
                alt="It's me!"
                src="https://firebasestorage.googleapis.com/v0/b/portfolio-24dd4.appspot.com/o/images%2F1573102050331.jfif-1617201776341?alt=media&token=8c871b61-bb9c-4d3f-9392-2a503eb81795"
              ></img>
              <h1>KINJAL RAYKARMAKAR</h1>
            </div>
            <h2>DEVELOPER</h2>
          </div>
          <div id="social">{this.renderSocial()}</div>
        </div>
      </div>
    );
  }
}

export default App;
