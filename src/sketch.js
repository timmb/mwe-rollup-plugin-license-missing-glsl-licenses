import GL from "PicoGL";
import mainVertSource from "./main.vert";
import mainFragSource from "./main.frag";

const canvas = document.createElement('canvas');
canvas.id = 'canvas';
document.body.appendChild(canvas);
canvas.width = canvas.clientWidth * window.devicePixelRatio;
canvas.height = canvas.clientHeight * window.devicePixelRatio;

let app = GL.createApp(canvas);

app.createPrograms(
  [
    mainVertSource,
    mainFragSource,
  ],
).then(function ([mainShader]) {

  const drawCall = (() => {
    const quadVertexBuffer = app.createVertexBuffer(GL.FLOAT, 2, new Float32Array([
      -1.0, -1.0,
      1.0, -1.0,
      1.0, 1.0,
      -1.0, 1.0,
    ]));
    const quadVertexArray = app.createVertexArray()
      .vertexAttributeBuffer(0, quadVertexBuffer);
    return app
      .createDrawCall(mainShader, quadVertexArray)
      .primitive(GL.TRIANGLE_FAN)
      ;
    return () => {
    };
  })();

  const render = () => {
    drawCall
      .uniform('time', performance.now() / 1000)
      .draw();
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
});








