import React, { Component } from "react";
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
// import "./App.css";

let box;

const onSceneReady = (scene) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 2 }, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false, background: "clouds" };
  }

  background = [
    { id: 1, txt: 'space' },
    { id: 2, txt: 'forrest' },
    { id: 3, txt: 'clouds' },
  ]

  // e is not "error", it is even it
  handleSubmit(e, param) {
    e.preventDefault();
    this.setState( {
      ...this.state,
      // make this an if statment :D
      background : param
    } )
  }

  render() {
    return (
      <div>
      <>
        <form onSubmit={(e) => this.handleSubmit(e, "space")}>
          <button type="submit">Space</button>
        </form>
        <form onSubmit={(e) => this.handleSubmit(e, "forrest")}>
          <button type="submit">Forrest</button>
        </form>
        <form onSubmit={(e) => this.handleSubmit(e, "clouds")}>
          <button type="submit">Clouds</button>
        </form>
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} background={this.state.background} id="my-canvas" />
      </>
    </div>
    );
  }
}

export default App;
