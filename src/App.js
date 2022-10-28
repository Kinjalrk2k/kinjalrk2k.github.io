import React from "react";
import "./App.css";
import { PORTFOLIO_LINK, PROFILE_PIC } from "./data/constants";
import socials from "./data/socials";

class App extends React.Component {
  state = {
    social: socials,
  };

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.innerRef = React.createRef();
  }

  renderSocial() {
    const randDurations = socials.map(
      (s) => String(Math.random() * 3 + 1) + "s"
    );

    // const animationDuration = "3s";

    return socials.map((s, i) => {
      // console.log(randDurations[i]);
      return (
        <div key={i}>
          <a
            className="fade-in"
            style={{ animationDuration: randDurations[i] }}
            href={s.link}
          >
            {s.icon}
          </a>
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

    // const handleOrientation = (e) => {
    //   var absolute = e.absolute;
    //   var alpha = e.alpha;
    //   var beta = e.beta;
    //   var gamma = e.gamma;

    //   console.log(beta, gamma);
    // };

    try {
      window.addEventListener(
        "deviceorientation",
        (e) => {
          // var absolute = e.absolute;
          // var alpha = e.alpha;
          var beta = e.beta;
          var gamma = e.gamma;

          const gammaMax =
            gamma < 0 ? Math.max(gamma, -0.3) : Math.min(gamma, 0.3);

          const betaMax = beta < 0 ? Math.max(beta, -0.3) : Math.min(beta, 0.3);

          var style =
            "rotateX(" + betaMax + "deg) rotateY(" + gammaMax + "deg)";
          that.innerRef.current.style.transform = style;
          that.innerRef.current.style.webkitTransform = style;
          that.innerRef.current.style.mozTransform = style;
          that.innerRef.current.style.msTransform = style;
          that.innerRef.current.style.oTransform = style;

          // console.log(betaMax);
        },
        true
      );
    } catch (e) {}
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
                src={PROFILE_PIC}
              ></img>
              <h1>KINJAL RAYKARMAKAR</h1>
            </div>
            <h2>Developer</h2>
          </div>
          <div id="portfolio">
            <a href={PORTFOLIO_LINK}>Portfolio</a>
          </div>
          <div id="social">{this.renderSocial()}</div>
        </div>
      </div>
    );
  }
}

export default App;
