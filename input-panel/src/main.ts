
import { globalPanel } from "./panels/global";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h2>${globalPanel.name}</h2>
  <div class="panel"></div>
  <hr/>
  <div class="keyboard">[ On-Screen Keyboard Placeholder ]</div>
  <div class="trackpad">[ On-Screen Trackpad Placeholder ]</div>
`;

const panelDiv = document.querySelector(".panel")!;

globalPanel.buttons.forEach(btn => {
  const b = document.createElement("button");
  b.textContent = btn.label;
  b.onclick = () => {
    console.log("Triggered:", btn);
  };
  panelDiv.appendChild(b);
});
