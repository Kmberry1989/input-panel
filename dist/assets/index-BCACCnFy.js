(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}})();async function y(e,t={},o){return window.__TAURI_INTERNALS__.invoke(e,t,o)}const T={id:"global",name:"Global Controls",buttons:[{id:"copy",label:"Copy",action:"hotkey",payload:"copy"},{id:"paste",label:"Paste",action:"hotkey",payload:"paste"},{id:"select_all",label:"Select All",action:"hotkey",payload:"select_all"},{id:"cut",label:"Cut",action:"hotkey",payload:"cut"},{id:"undo",label:"Undo",action:"hotkey",payload:"undo"},{id:"redo",label:"Redo",action:"hotkey",payload:"redo"},{id:"screenshot",label:"Screenshot",action:"system",payload:"screenshot"},{id:"dictation",label:"🎙️ Dictate",action:"system",payload:"dictation_toggle"},{id:"switch",label:"App Switcher",action:"system",payload:"switcher"},{id:"minimize",label:"Minimize",action:"system",payload:"minimize"},{id:"close",label:"Close",action:"system",payload:"close"}]},A={id:"keyboard",name:"Keyboard",buttons:[{id:"tab",label:"Tab",action:"hotkey",payload:"type:tab",gridRow:"1",gridColumn:"span 3"},...["q","w","e","r","t","y","u","i","o","p"].map(e=>({id:e,label:e.toUpperCase(),action:"hotkey",payload:`type:${e}`,gridRow:"1",gridColumn:"span 2"})),{id:"bsp",label:"⌫",action:"hotkey",payload:"type:backspace",gridRow:"1",gridColumn:"span 3"},{id:"caps",label:"Caps",action:"hotkey",payload:"type:capslock",gridRow:"2",gridColumn:"span 4"},...["a","s","d","f","g","h","j","k","l"].map(e=>({id:e,label:e.toUpperCase(),action:"hotkey",payload:`type:${e}`,gridRow:"2",gridColumn:"span 2"})),{id:"ent",label:"⏎",action:"hotkey",payload:"type:return",gridRow:"2",gridColumn:"span 4"},{id:"lshift",label:"Shift",action:"hotkey",payload:"type:shift",gridRow:"3",gridColumn:"span 5"},...["z","x","c","v","b","n","m"].map(e=>({id:e,label:e.toUpperCase(),action:"hotkey",payload:`type:${e}`,gridRow:"3",gridColumn:"span 2"})),{id:"rshift",label:"Shift",action:"hotkey",payload:"type:shift",gridRow:"3",gridColumn:"span 5"},{id:"space",label:"",action:"hotkey",payload:"type:space",gridRow:"4",gridColumn:"10 / span 12"}]};[...Array.from({length:12},(e,t)=>({id:`f${t+1}`,label:`F${t+1}`,action:"hotkey",payload:`type:f${t+1}`}))];const f={id:"clipboard",name:"Clipboard",buttons:[]},O={id:"modifiers",name:"Modifiers",buttons:[{id:"shift",label:"Shift",action:"hotkey",payload:"type:shift"},{id:"ctrl",label:"Ctrl",action:"hotkey",payload:"type:control"},{id:"opt",label:"Opt",action:"hotkey",payload:"type:option"},{id:"cmd",label:"Cmd",action:"hotkey",payload:"type:command"},{id:"fn",label:"Fn",action:"hotkey",payload:"type:fn"},{id:"caps",label:"Caps",action:"hotkey",payload:"type:capslock"},{id:"tab",label:"Tab",action:"hotkey",payload:"type:tab"},{id:"esc",label:"Esc",action:"hotkey",payload:"type:escape"},{id:"del",label:"Del",action:"hotkey",payload:"type:delete"}]},H={id:"media",name:"Media & System",buttons:[{id:"vol_up",label:"🔊",action:"hotkey",payload:"type:volume_up"},{id:"vol_dn",label:"🔉",action:"hotkey",payload:"type:volume_down"},{id:"mute",label:"🔇",action:"hotkey",payload:"type:mute"},{id:"prev",label:"⏮",action:"hotkey",payload:"type:rewind"},{id:"play",label:"⏯",action:"hotkey",payload:"type:play_pause"},{id:"next",label:"⏭",action:"hotkey",payload:"type:fast_forward"},{id:"bright_up",label:"☀↑",action:"hotkey",payload:"type:brightness_up"},{id:"bright_dn",label:"☀↓",action:"hotkey",payload:"type:brightness_down"},{id:"spotlight",label:"🔍",action:"hotkey",payload:"type:spotlight"},{id:"sleep",label:"💤",action:"system",payload:"sleep_display"}]},N={id:"macro",name:"Macros",buttons:[{id:"record",label:"● Rec",action:"system",payload:"macro_record"},{id:"stop",label:"■ Stop",action:"system",payload:"macro_stop"},{id:"play",label:"▶ Play",action:"system",payload:"macro_play"},{id:"wait",label:"⏱ Wait",action:"system",payload:"macro_wait"},{id:"save",label:"💾 Save",action:"system",payload:"macro_save"},{id:"load",label:"📂 Load",action:"system",payload:"macro_load"}]},F={id:"function_keys",name:"Function Keys",buttons:Array.from({length:12},(e,t)=>({id:`f${t+1}`,label:`F${t+1}`,action:"hotkey",payload:`type:f${t+1}`}))},M={id:"navigation",name:"Navigation & Numpad",buttons:[{id:"ins",label:"Ins",action:"hotkey",payload:"type:insert",gridColumn:"1",gridRow:"1"},{id:"home",label:"Home",action:"hotkey",payload:"type:home",gridColumn:"2",gridRow:"1"},{id:"pgup",label:"PgUp",action:"hotkey",payload:"type:pageup",gridColumn:"3",gridRow:"1"},{id:"del",label:"Del",action:"hotkey",payload:"type:delete",gridColumn:"1",gridRow:"2"},{id:"end",label:"End",action:"hotkey",payload:"type:end",gridColumn:"2",gridRow:"2"},{id:"pgdn",label:"PgDn",action:"hotkey",payload:"type:pagedown",gridColumn:"3",gridRow:"2"},{id:"up",label:"↑",action:"hotkey",payload:"type:up",gridColumn:"2",gridRow:"4"},{id:"left",label:"←",action:"hotkey",payload:"type:left",gridColumn:"1",gridRow:"5"},{id:"down",label:"↓",action:"hotkey",payload:"type:down",gridColumn:"2",gridRow:"5"},{id:"right",label:"→",action:"hotkey",payload:"type:right",gridColumn:"3",gridRow:"5"},{id:"nl",label:"Num",action:"hotkey",payload:"type:numlock",gridColumn:"5",gridRow:"1"},{id:"div",label:"/",action:"hotkey",payload:"type:kp_slash",gridColumn:"6",gridRow:"1"},{id:"mul",label:"*",action:"hotkey",payload:"type:kp_multiply",gridColumn:"7",gridRow:"1"},{id:"sub",label:"-",action:"hotkey",payload:"type:kp_minus",gridColumn:"8",gridRow:"1"},{id:"n7",label:"7",action:"hotkey",payload:"type:num7",gridColumn:"5",gridRow:"2"},{id:"n8",label:"8",action:"hotkey",payload:"type:num8",gridColumn:"6",gridRow:"2"},{id:"n9",label:"9",action:"hotkey",payload:"type:num9",gridColumn:"7",gridRow:"2"},{id:"add",label:"+",action:"hotkey",payload:"type:kp_plus",gridColumn:"8",gridRow:"2 / span 2"},{id:"n4",label:"4",action:"hotkey",payload:"type:num4",gridColumn:"5",gridRow:"3"},{id:"n5",label:"5",action:"hotkey",payload:"type:num5",gridColumn:"6",gridRow:"3"},{id:"n6",label:"6",action:"hotkey",payload:"type:num6",gridColumn:"7",gridRow:"3"},{id:"n1",label:"1",action:"hotkey",payload:"type:num1",gridColumn:"5",gridRow:"4"},{id:"n2",label:"2",action:"hotkey",payload:"type:num2",gridColumn:"6",gridRow:"4"},{id:"n3",label:"3",action:"hotkey",payload:"type:num3",gridColumn:"7",gridRow:"4"},{id:"ent",label:"⏎",action:"hotkey",payload:"type:kp_enter",gridColumn:"8",gridRow:"4 / span 2"},{id:"n0",label:"0",action:"hotkey",payload:"type:num0",gridColumn:"5 / span 2",gridRow:"5"},{id:"dec",label:".",action:"hotkey",payload:"type:kp_period",gridColumn:"7",gridRow:"5"}]},U={id:"dictation",name:"Dictation",buttons:[{id:"dictate_toggle",label:"🎙️",action:"system",payload:"dictation_toggle"}]},j={global:T,keyboard:A,function_keys:F,navigation:M,modifiers:O,media:H,clipboard:f,macro:N,dictation:U};let c=[{id:"keyboard",x:100,y:150,zIndex:1,opacity:1},{id:"dictation",x:50,y:50,zIndex:2,opacity:1}],S=2,w=!1,_=[],m=!1;const R=document.querySelector("#app");R.innerHTML=`
  <div id="top-bar">
      <input type="text" placeholder="Type here..." id="floating-input" />
  </div>
  <div id="desktop"></div>
  <div id="dock"></div>
`;const E=document.getElementById("desktop"),P=document.getElementById("dock"),g=document.getElementById("floating-input");y("set_ignore_cursor_events",{ignore:!0});y("configure_panel");R.addEventListener("mouseenter",()=>{y("set_ignore_cursor_events",{ignore:!1})});R.addEventListener("mouseleave",()=>{y("set_ignore_cursor_events",{ignore:!0})});g.addEventListener("mousedown",e=>{e.stopPropagation()});function L(){P.innerHTML="",[{id:"keyboard",label:"⌨️"},{id:"dictation",label:"🎙️"},{id:"navigation",label:"🔢"},{id:"function_keys",label:"FN"},{id:"modifiers",label:"🎛️"},{id:"media",label:"⏯️"},{id:"clipboard",label:"📋"},{id:"macro",label:"⏺️"}].forEach(t=>{const o=document.createElement("button");o.textContent=t.label;const d=c.some(a=>a.id===t.id);o.style.background=d?"rgba(255, 255, 255, 0.3)":"rgba(255, 255, 255, 0.1)",o.style.borderColor=d?"white":"transparent",o.onmousedown=a=>{a.preventDefault(),I(t.id)},P.appendChild(o)})}function u(){E.innerHTML="",c.forEach(e=>{const t=j[e.id];if(!t)return;const o=document.createElement("div");o.classList.add("panel-window"),o.style.left=`${e.x}px`,o.style.top=`${e.y}px`,o.style.zIndex=`${e.zIndex}`,o.style.opacity=`${e.opacity}`,e.id==="dictation"&&o.classList.add("dictation-window");const d=document.createElement("div");d.classList.add("panel-header");const a=document.createElement("span");a.textContent=t.name,a.style.marginRight="auto",d.appendChild(a);const i=document.createElement("input");i.type="range",i.min="0.2",i.max="1.0",i.step="0.1",i.value=`${e.opacity}`,i.style.width="40px",i.style.marginRight="5px",i.title="Opacity",i.onmousedown=n=>{n.stopPropagation()},i.oninput=n=>{e.opacity=parseFloat(n.target.value),o.style.opacity=`${e.opacity}`},d.appendChild(i);const s=document.createElement("span");s.textContent="×",s.style.cursor="pointer",s.style.fontWeight="bold",s.onmousedown=n=>{n.stopPropagation(),n.preventDefault(),I(e.id)},d.appendChild(s),d.onmousedown=n=>{n.target!==d&&n.target!==a||(n.preventDefault(),B(e.id),W(n,e))},o.appendChild(d);const l=document.createElement("div");l.classList.add("panel-content"),e.id==="keyboard"?(l.style.display="grid",l.style.gridTemplateColumns="repeat(30, 1fr)",l.style.width="600px"):e.id==="navigation"?(l.style.display="grid",l.style.gridTemplateColumns="repeat(3, 1fr) 20px repeat(4, 1fr)",l.style.width="auto"):e.id==="function_keys"?(l.style.display="grid",l.style.gridTemplateColumns="repeat(12, 1fr)",l.style.width="600px"):e.id==="clipboard"&&(l.style.flexDirection="column",l.style.justifyContent="flex-start",l.style.maxHeight="300px",l.style.overflowY="auto",l.style.width="250px");let x=t.buttons;e.id==="macro"&&(x=[{id:"record",label:w?"■ Stop":"● Rec",action:"system",payload:w?"macro_stop":"macro_record"},{id:"play",label:"▶ Play",action:"system",payload:"macro_play"},{id:"wait",label:"⏱ Wait",action:"system",payload:"macro_wait"},{id:"save_demo",label:"💾 Save",action:"system",payload:"macro_save"},{id:"load_demo",label:"📂 Load",action:"system",payload:"macro_load"}]),e.id==="clipboard"&&(x=f.buttons),e.id==="dictation"&&(x=[{id:"dictate_toggle",label:m?"🛑 Listening...":"🎙️",action:"system",payload:"dictation_toggle"}]),x.forEach(n=>{const r=document.createElement("button");if(r.textContent=n.label,w&&e.id==="macro"&&n.id==="record"&&(r.style.background="red"),m&&e.id==="dictation"&&(r.style.background="red",r.style.width="100%",r.style.height="100%"),n.gridColumn&&(r.style.gridColumn=n.gridColumn),n.gridRow&&(r.style.gridRow=n.gridRow),e.id==="clipboard"&&(r.style.width="100%",r.style.textAlign="left",r.style.marginBottom="4px"),r.onmousedown=async b=>{b.preventDefault(),await q(n.payload,n.action)},l.appendChild(r),n.breakAfter&&!["keyboard","navigation","function_keys"].includes(e.id)){const b=document.createElement("div");b.style.flexBasis="100%",b.style.height="0",l.appendChild(b)}}),o.appendChild(l),E.appendChild(o)})}function I(e){const t=c.findIndex(o=>o.id===e);t>=0?c.splice(t,1):c.push({id:e,x:150+c.length*20,y:150+c.length*20,zIndex:++S,opacity:1}),L(),u()}function B(e){const t=c.find(o=>o.id===e);t&&(t.zIndex=++S,u())}let k=null,C={x:0,y:0};function W(e,t){k=t,C.x=e.clientX-t.x,C.y=e.clientY-t.y,document.addEventListener("mousemove",D),document.addEventListener("mouseup",z)}function D(e){k&&(k.x=e.clientX-C.x,k.y=e.clientY-C.y,requestAnimationFrame(u))}function z(){k=null,document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",z)}async function q(e,t){if(document.activeElement===g&&e.startsWith("type:")){const o=e.split(":")[1];o==="backspace"?g.value=g.value.slice(0,-1):o==="tab"?g.value+="	":o==="enter"||(o==="space"?g.value+=" ":o.length===1&&(g.value+=o))}if(e==="macro_record"){await y("start_recording"),w=!0,u();return}if(e==="macro_stop"){_=await y("stop_recording"),w=!1,u();return}if(e==="macro_play"){if(_.length===0){alert("No macro recorded!");return}await y("play_macro",{events:_});return}if(e!=="macro_wait"){if(e==="dictation_toggle"){v();return}await y("trigger_action",{payload:e})}}let p=null;"webkitSpeechRecognition"in window&&(p=new webkitSpeechRecognition,p.continuous=!1,p.interimResults=!1,p.onresult=async e=>{const t=e.results[0][0].transcript;await navigator.clipboard.writeText(t+" "),await y("trigger_action",{payload:"paste"}),v(!1)},p.onerror=()=>v(!1),p.onend=()=>m&&v(!1));function v(e){if(!p){alert("Speech API not supported");return}const t=e!==void 0?e:!m;t!==m&&(m=t,m?p.start():p.stop(),u())}let h=[];setInterval(async()=>{try{const e=await navigator.clipboard.readText();e&&e!==h[0]&&(h.unshift(e),h.length>20&&h.pop(),f.buttons=[],f.buttons.push({id:"clear_hist",label:"Clear History",action:"system",payload:"clear_hist"}),h.forEach((t,o)=>{f.buttons.push({id:`clip_${o}`,label:t.length>30?t.substring(0,30)+"...":t,action:"system",payload:`type:${t}`})}),c.some(t=>t.id==="clipboard")&&u())}catch{}},2e3);const $=document.createElement("style");$.textContent=`
  #app {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: none;
  }
  
  #top-bar {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: auto;
      z-index: 1000;
  }
  
  #floating-input {
      width: 60%;
      padding: 10px 20px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(0,0,0,0.6);
      color: white;
      font-size: 16px;
      backdrop-filter: blur(5px);
  }
  
  #desktop {
      flex: 1;
      position: relative;
      pointer-events: none;
  }
  #dock {
      height: 60px;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 10px;
      pointer-events: auto;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      backdrop-filter: blur(10px);
      margin: 0 auto;
      max-width: 80%;
  }
  
  /* Global Panel Window Styles */
  .panel-window {
      position: absolute;
      background: rgba(30,30,30, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      min-width: 150px;
      pointer-events: auto;
      display: flex;
      flex-direction: column; /* Header + Content */
      overflow: hidden;
      resize: both;
      min-height: 100px;
  }
  
  /* Dictation Specific Overrides */
  .dictation-window {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      resize: both; 
      aspect-ratio: 1 / 1;
      /* We keep resize but hide standard window chrome */
  }

  .dictation-window .panel-header {
      /* Make header minimal or invisible but draggable? */
      /* Let's keep it visible but very small overlay? */
      /* Or better: standard window but with button fully filling it. */
      /* User wanted "One big circular button". */
      /* If we hide background, we see just content. */
      background: rgba(0,0,0,0.5); /* Semi-transparent header for drag */
      border-radius: 12px 12px 0 0;
  }
  
  .dictation-window .panel-content {
      padding: 0;
      background: transparent;
      overflow: hidden; /* No scrollbars */
  }

  /* Universal Header */
  .panel-header {
      background: rgba(255,255,255,0.1);
      color: #ccc;
      padding: 6px 10px;
      font-size: 13px;
      cursor: grab;
      user-select: none;
      display: flex;
      align-items: center;
      flex-shrink: 0; /* Header size fixed */
  }
  .panel-header:active {
      cursor: grabbing;
  }
  
  .panel-content {
      padding: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      justify-content: center;
      overflow: auto; /* Scroll for others */
      align-items: start;
      flex: 1; /* Take remaining space */
      width: 100%;
  }

  .panel-content button {
      flex: 1;
      min-width: 40px;
      /* Ensure grid items stretch or fit */
      width: 100%; 
      height: 100%;
      /* Force circular shape for logic handled in JS, but backup here */
  }
  
  .dictation-window button {
      border-radius: 50% !important;
  }
`;document.head.appendChild($);L();u();
