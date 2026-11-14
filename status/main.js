(()=>{var E="openchamber.sdk",_=1;var ft=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Ro(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(p)=>{let u=p.target===e?r:p.target;if(!(u instanceof Element))return;if(!u.hasAttribute("data-oc-scrolling"))u.setAttribute("data-oc-scrolling","");let f=n.get(u);if(f!==void 0)clearTimeout(f);n.set(u,setTimeout(()=>{n.delete(u),u.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Rr=`(${Ro.toString()})(document);`;var Ot=128,At=65536;var we=128;var Pe=65536;var Io=/^[a-z][a-z0-9-]{0,39}$/;var mo=(e)=>Object(e)===e&&!Array.isArray(e),Rt=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),ho=(e)=>String(e)===e&&e.length>=1&&e.length<=60,xo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,go=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!mo(n)||!Io.test(n.id)||!ho(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!Rt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Rt(n,["kind","id","label","value","options","disabled"]))return!1;if(!xo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let p=new Set;for(let u of n.options){if(!mo(u)||!Rt(u,["value","label"])||!xo(u.value)||!ho(u.label)||p.has(u.value))return!1;p.add(u.value)}if(!p.has(n.value))return!1}return!0};var bo=["{id}","{segment}","{segments+}"];var sn=new Set(bo);var ko=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var cn=new Set(ko);var De=20000000,Ge=256;var mt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Co=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var Uo=/^[A-Za-z0-9_-]{1,80}$/;var yo=["left","right","top","bottom"];var Mo=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let u of p)if(!Mo(u,r+1,n))return!1;return!0},ht=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(ht);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(ht)}return String(e)===e||Number.isFinite(e)},xt=(e)=>{try{if(String(e.id)!==e.id||!Uo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!yo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Mo(e.data)||!ht(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var gt=2000;var vo=["file","directory","other","missing"],bt=(e)=>Boolean(e&&"sessionId"in e),kt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Lo=/^[0-9a-f]{7,64}$/i,Ct=(e)=>Lo.test(e),He=500,Ve=32000,wo=16000,Po=128,Do=200,Go=2000,Ho=16000,Vo=80,Xo=200,Fo=16000;var Bo=2000;var Ut=20000,Xe=1024,Fe=2000000;var Be=64000,$e=8000,yt=4000;var Mt=960000;var $o=999,Ko=1e4,_e=500,Wo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],jo=["stopped","starting","ready","failed"],hr=new Set(Wo),zo=(e)=>hr.has(e),Yo=(e)=>e&&zo(e)?e:"HOST_REJECTED",q=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(q);if(Object(e)===e)return Object.values(e).every(q);return!1},Jo=(e)=>q(e)&&JSON.stringify(e).length<=Fo,No=(e)=>e?.trim().slice(0,Xo)??"",ee=(e)=>{let r=e.id.trim().slice(0,Po),n=e.title.trim().slice(0,Do),p=e.url.trim().slice(0,Go),u=e.text?.trim().slice(0,Ho),f=e.author?.trim().slice(0,Vo),S=e.kind==="pull"?"pull":"issue",C={providerId:e.providerId.trim(),id:r,title:n||r,url:p,kind:S};if(u)C.text=u;if(f)C.author=f;if(S==="pull"){let I=No(e.branches?.head),D=No(e.branches?.base);if(I&&D)C.branches={head:I,base:D}}if(Jo(e.data))C.data=e.data;return C},Nt=(e)=>{let r=ee(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},vt=(e)=>{let r={text:e.text.trim().slice(0,wo)};if(e.send)r.send=!0;return r},Lt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min($o,Math.max(0,Math.round(e)))},wt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Ko,Math.max(0,Math.ceil(e)))};var te=(e)=>e.length>0&&e.length<=Xe&&!e.includes("\x00")&&!e.includes("\\");var Ke=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Bo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},xr=new Set(jo),Pt=(e)=>Boolean(e&&"status"in e&&xr.has(String(e.status))&&!("body"in e)),We=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Dt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Gt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Ht=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Ir=new Set(vo),Vt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Ir.has(String(e.kind))&&Number.isFinite(e.size)),Xt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),gr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),br=(e)=>Object(e)===e?e:null,It=(e)=>String(e)===e&&e.length>0,kr=(e)=>{if(!It(e.id))return null;if(e.ok===!0){let r={channel:E,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&It(e.error))return{channel:E,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:Yo(It(e.code)?e.code:void 0)};return null},Ft=(e)=>{let r=br(e);if(!r||r.channel!==E||r.v!==_)return null;if(r.type==="result")return kr(r);if(!gr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Qo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Cr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class c extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Zo=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),je=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${Xe} characters without NUL or backslash.`)),ze=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},l=(e)=>(e.value+=1,`oc-${e.value}`),Bt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),p=e.requestTimeoutMs??Ut,u=new Set,f=new Set,S=new Set,C=new Set,I=new Set,D=new Set,ae=new Set,be=new Set,ke=new Set,Ce=new Set,Ue=new Set,Y=new Set,ut=[],ce=null,de=null,ye=new Set,Me=new Set,le=null,pe=null,Et=!1,J=new Map,Q=new Map,Z=new Map,V=!1,d={value:0},a=null,X=null,ue=!1,Ee=!1,ao=null,co=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},w=(t)=>{r.parent.postMessage(t,"*")},lo=()=>{if(V||r.parent===r||Y.size===0||a?.features?.lateGenerateResults!==!0)return;w({channel:E,v:_,type:"generate-late-listen"})},R=(t,o)=>{for(let s of t)try{s(o)}catch(i){console.error(i)}},po=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Ft(t.data);if(!o)return;if(o.type==="workspace"){let i=Q.get(o.payload.subscriptionId);if(i)R([i],o.payload.snapshot);return}if(o.type==="shells"){let i=Z.get(o.payload.subscriptionId);if(i)R([i],o.payload.snapshot);return}if(o.type==="ready"){if(a=o.payload,X=co(o.payload.session),R(u,o.payload),R(f,o.payload.directory),R(S,o.payload.session),X)R(C,X);if(R(I,o.payload.connection),R(D,o.payload.settings),R(ae,o.payload.item),o.payload.block)R(be,o.payload.block);lo();return}if(o.type==="service-event"){R(ke,o.payload);return}if(o.type==="generate-late"){if(Y.size===0)ut.push(o.payload);else R(Y,o.payload);return}if(o.type==="directory"){if(a)a={...a,directory:o.payload.directory};R(f,o.payload.directory);return}if(o.type==="session"){if(a)a={...a,session:o.payload.session};if(!o.payload.session)X=null;else if(X?.sessionId!==o.payload.session.id)X=co(o.payload.session);R(S,o.payload.session);return}if(o.type==="session-lifecycle"){X=o.payload,R(C,o.payload);return}if(o.type==="connection"){if(a)a={...a,connection:o.payload.connection};R(I,o.payload.connection);return}if(o.type==="settings"){if(a)a={...a,settings:o.payload.settings};R(D,o.payload.settings);return}if(o.type==="item"){if(a)a={...a,item:o.payload.item};R(ae,o.payload.item);return}if(o.type==="status-control-event"){R(Ce,o.payload);return}if(o.type==="popover-closed"){R(Ue,o.payload);return}if(o.type==="action"){let i=(T)=>{if(!V)w({channel:E,v:_,type:"action-result",id:o.id,payload:T})},O=de;if(!O){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>O(o.payload)).then(()=>i({ok:!0}),(T)=>{let b=(T instanceof Error?T.message:String(T)).trim();i({ok:!1,error:(b||"Action failed.").slice(0,_e)})});return}if(o.type==="file-open"){let i=o.payload;if(pe&&Co(pe,i))return;pe=i,R(ye,o.payload);return}if(o.type==="file-saved"){R(Me,o.payload.version);return}if(o.type==="file-snapshot"){let i=(b)=>{if(!V)w({channel:E,v:_,type:"file-snapshot-result",id:o.id,payload:b})},O=(b)=>i({error:(b.trim()||"Could not read the edited file.").slice(0,_e)}),T=le;if(!T){O("This extension does not edit files.");return}Promise.resolve().then(()=>T(o.payload.purpose)).then((b)=>{if(mt(b)>De){O(`The file is over ${De} ${"bytes"in b?"bytes":"characters"}.`);return}if(b.version.length>Ge){O(`The snapshot version is over ${Ge} characters.`);return}i({snapshot:"bytes"in b?{bytes:b.bytes,version:b.version}:{content:b.content,version:b.version}})},(b)=>O(b instanceof Error?b.message:String(b)));return}if(o.type==="resolve"){let i=(T)=>{w({channel:E,v:_,type:"resolve-result",id:o.id,payload:T})},O=ce;if(!O){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>O(o.payload)).then((T)=>i({item:T?ee(T):null}),(T)=>{let b=(T instanceof Error?T.message:String(T)).trim();i({error:(b||"Command failed.").slice(0,_e)})});return}let s=J.get(o.id);if(!s)return;if(clearTimeout(s.timer),J.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new c(o.code,o.error))};r.addEventListener("message",po),w({channel:E,v:_,type:"hello"});let U=(t,o=p)=>{if(V||r.parent===r)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,i)=>{let O=setTimeout(()=>{J.delete(t.id),i(new c("HOST_TIMEOUT","Host did not answer in time."))},o);J.set(t.id,{resolve:s,reject:i,timer:O}),w(t)})},x=(t)=>U(t).then(()=>{return}),g={channel:E,v:_},_t=(t)=>{if(!V&&r.parent!==r)w(t)},uo=()=>_t({...g,type:"file-save"}),Eo=(t)=>{if(!Qo(t)||!Cr(t))return;t.preventDefault(),uo()},_o=(t)=>{if(!Qo(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),Oo(a.popover.id,"escape").catch(()=>{return})},Ne=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let o=ue||Ee;if(ao===o)return;ao=o,Ao(t.id,o).catch(()=>{return})},ve=()=>{if(a?.surface!=="popover"||ue)return;ue=!0,Ne()},So=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!ue)return;ue=!1,Ne()},To=()=>{if(a?.surface!=="popover"||Ee)return;Ee=!0,Ne()},fo=()=>{if(a?.surface!=="popover"||!Ee)return;Ee=!1,Ne()},G=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new c("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},St=async(t)=>{if(t.kind!=="projects")G(t.projectId);let o=await U({...g,type:"workspace-read",id:l(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return o},Tt=async(t,o)=>{if(t.kind!=="projects")G(t.projectId);let s=l(d);Q.set(s,o);try{await x({...g,type:"workspace-subscribe",id:l(d),payload:{subscriptionId:s,query:t}})}catch(i){if(Q.delete(s),!V)w({...g,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}});throw i}return()=>{if(!Q.delete(s)||V)return;w({...g,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},Ar=async(t,o)=>{if(t.kind==="session")G(t.sessionId);if(t.kind==="project")G(t.projectId);let s=l(d);Z.set(s,o);try{await x({...g,type:"shells-subscribe",id:l(d),payload:{subscriptionId:s,scope:t}})}catch(i){if(Z.delete(s),!V)w({...g,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}});throw i}return()=>{if(!Z.delete(s)||V)return;w({...g,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},Le=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>Ot))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!q(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>At)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let o=await U({...g,type:"storage",id:l(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return o},Oo=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):x({...g,type:"popover-close",id:l(d),payload:o?{id:t,reason:o}:{id:t}}),Ao=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):x({...g,type:"popover-anchor",id:l(d),payload:{id:t,active:o}});return r.addEventListener("keydown",_o,!0),r.addEventListener("pointerover",ve),r.addEventListener("pointermove",ve),r.addEventListener("pointerout",So),r.addEventListener("focus",To),r.addEventListener("blur",fo),{onAction:(t)=>(de=t,()=>{if(de===t)de=null}),listProjects:async()=>{let t=await St({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await St({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await St({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Tt({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Tt({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>Tt({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>Ar(t,o),readShellOutput:async(t,o)=>{G(t,we);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Pe))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Pe}.`);let T=await U({...g,type:"shell-output",id:l(d),payload:{shellId:t,cursor:s,tailBytes:i}});if(!T||typeof T.output!=="string"||!Number.isFinite(T.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return T},stopShell:async(t)=>{if(G(t,we),(await U({...g,type:"shell-stop",id:l(d),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{G(t),await x({...g,type:"open-session",id:l(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=ze(o),i={op:"get",key:t};if(s)i.scope=s;let O=await Le(i);return O.op==="get"&&O.found?O.value:void 0},set:async(t,o,s)=>{let i=ze(s),O={op:"set",key:t,value:o};if(i)O.scope=i;await Le(O)},delete:async(t,o)=>{let s=ze(o),i={op:"delete",key:t};if(s)i.scope=s;await Le(i)},keys:async(t)=>{let o=ze(t),s={op:"keys"};if(o)s.scope=o;let i=await Le(s);if(i.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(u.add(t),a)t(a);return()=>{u.delete(t)}},onDirectory:(t)=>{if(f.add(t),a)t(a.directory);return()=>{f.delete(t)}},onSession:(t)=>{if(S.add(t),a)t(a.session);return()=>{S.delete(t)}},onSessionLifecycle:(t)=>{if(C.add(t),X)t(X);return()=>{C.delete(t)}},onConnection:(t)=>{if(I.add(t),a)t(a.connection);return()=>{I.delete(t)}},onSettings:(t)=>{if(D.add(t),a)t(a.settings);return()=>{D.delete(t)}},onItem:(t)=>{if(ae.add(t),a)t(a.item);return()=>{ae.delete(t)}},onBlock:(t)=>{if(be.add(t),a?.block)t(a.block);return()=>{be.delete(t)}},onServiceEvent:(t)=>(ke.add(t),()=>{ke.delete(t)}),onStatusControl:(t)=>(Ce.add(t),()=>{Ce.delete(t)}),onPopoverClosed:(t)=>(Ue.add(t),()=>{Ue.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!go(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return x({...g,type:"status-controls",id:l(d),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!xt(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return x({...g,type:"popover-open",id:l(d),payload:t})},closePopover:Oo,setPopoverAnchorActive:Ao,onResolve:(t)=>(ce=t,()=>{if(ce===t)ce=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>He)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${He} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ve))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Ve} characters.`));return x({channel:E,v:_,type:"toast",id:l(d),payload:{...t,message:o}})},openUrl:(t)=>x({channel:E,v:_,type:"open-url",id:l(d),payload:{url:t}}),openCommit:(t)=>Ct(t)?x({channel:E,v:_,type:"open-commit",id:l(d),payload:{sha:t}}):Promise.reject(new c("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>x({channel:E,v:_,type:"block-answer",id:l(d),payload:{text:t.trim().slice(0,gt)}}),openSurface:(t)=>x({channel:E,v:_,type:"open-surface",id:l(d),payload:{surfaceId:t}}),writeClipboard:(t)=>x({channel:E,v:_,type:"clipboard-write",id:l(d),payload:{text:t}}),compose:(t)=>x({channel:E,v:_,type:"compose",id:l(d),payload:t}),attach:(t)=>x({channel:E,v:_,type:"attach",id:l(d),payload:ee(t)}),startSession:async(t)=>{if(t.projectId!==void 0)G(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")G(o.directory);else{if(o.name!==void 0)G(o.name,200);if(o.baseBranch!==void 0)G(o.baseBranch,200)}let s=await U({channel:E,v:_,type:"start-session",id:l(d),payload:Nt(t)},e.requestTimeoutMs??180000);if(!bt(s))throw new c("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>U({channel:E,v:_,type:"prompt",id:l(d),payload:vt(t)}).then((o)=>{if(!kt(o))throw new c("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>x({channel:E,v:_,type:"session-link",id:l(d),payload:ee(t)}),close:()=>x({channel:E,v:_,type:"close",id:l(d)}),oauthStart:()=>x({channel:E,v:_,type:"oauth-start",id:l(d)}),oauthDisconnect:()=>x({channel:E,v:_,type:"oauth-disconnect",id:l(d)}),request:(t)=>(Ke(t.path)?U({channel:E,v:_,type:"request",id:l(d),payload:t}):Zo()).then((o)=>{if(!We(o))throw new c("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Ke(t.path)?U({channel:E,v:_,type:"service-request",id:l(d),payload:t}):Zo()).then((o)=>{if(!We(o))throw new c("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>U({channel:E,v:_,type:"service-status",id:l(d)}).then((t)=>{if(!Pt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(te(t)?U({channel:E,v:_,type:"file-read",id:l(d),payload:{path:t}}):je()).then((o)=>{if(!Dt(o))throw new c("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!te(t))return je();if(o.length>Fe)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${Fe} characters.`));return U({channel:E,v:_,type:"file-write",id:l(d),payload:{path:t,content:o}}).then((s)=>{if(!Gt(s))throw new c("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(te(t)?U({channel:E,v:_,type:"file-list",id:l(d),payload:{path:t}}):je()).then((o)=>{if(!Ht(o))throw new c("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(te(t)?U({channel:E,v:_,type:"file-stat",id:l(d),payload:{path:t}}):je()).then((o)=>{if(!Vt(o))throw new c("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>Be)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${Be} characters.`));if(s!==void 0&&(s.length===0||s.length>$e))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${$e} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(yt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let O={prompt:o};if(s!==void 0)O.system=s;if(i!==void 0)O.maxOutputTokens=i;return U({channel:E,v:_,type:"generate",id:l(d),payload:O},e.requestTimeoutMs??Mt).then((T)=>{if(!Xt(T))throw new c("HOST_REJECTED","Host did not return generated text.");return T})},onLateGenerateResult:(t)=>{Y.add(t);for(let o of ut.splice(0))R([t],o);return lo(),()=>{Y.delete(t)}},setBadge:(t)=>x({channel:E,v:_,type:"badge",id:l(d),payload:{count:Lt(t)}}),setHeight:(t)=>x({channel:E,v:_,type:"resize",id:l(d),payload:{height:wt(t)}}),onFileOpen:(t)=>{if(ye.add(t),!Et)Et=!0,r.addEventListener("keydown",Eo,!0);if(pe)t(pe);return()=>{ye.delete(t)}},onFileSnapshot:(t)=>(le=t,()=>{if(le===t)le=null}),onFileSaved:(t)=>(Me.add(t),()=>{Me.delete(t)}),reportFileChange:(t)=>_t({...g,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:uo,reportFileUnsupported:()=>_t({...g,type:"file-unsupported"}),dispose:()=>{for(let t of Q.keys())w({...g,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:t}});Q.clear();for(let t of Z.keys())w({...g,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:t}});if(Z.clear(),V=!0,ce=null,de=null,le=null,ye.clear(),Me.clear(),Et)r.removeEventListener("keydown",Eo,!0);r.removeEventListener("message",po),r.removeEventListener("keydown",_o,!0),r.removeEventListener("pointerover",ve),r.removeEventListener("pointermove",ve),r.removeEventListener("pointerout",So),r.removeEventListener("focus",To),r.removeEventListener("blur",fo);for(let t of J.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),u.clear(),f.clear(),S.clear(),C.clear(),I.clear(),D.clear(),ae.clear(),be.clear(),ke.clear(),Ce.clear(),Ue.clear(),Y.clear(),ut.length=0}}};var qo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var xn=new Set(qo);var er=["none","agent","user"];var gn=new Set(er);var Ur=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],yr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],tr=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,p]of Ur)r.style.setProperty(n,e.tokens[p]);for(let[n,p,u]of yr){let f=e.tokens[u]??"";r.style.setProperty(n,f),r.style.setProperty(p,f)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},$t=(e,r)=>{if(tr(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var Mr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},A=(e,r)=>`var(--${e}, var(--oc-${Mr[e]}, ${r}))`,B=A("surface-background","transparent"),Je=A("surface-elevated","transparent"),oe=A("surface-elevated-foreground","inherit"),P=A("surface-foreground","inherit"),m=A("surface-muted-foreground","gray"),Nr=A("surface-muted","transparent"),W=A("interactive-border","currentColor"),N=A("interactive-hover","transparent"),j=A("interactive-active","transparent"),Kt=A("interactive-selection","transparent"),Wt=A("interactive-selection-foreground","inherit"),F=A("primary","currentColor"),jt=A("primary-text","inherit"),zt=A("error-text","inherit"),vr=A("font-sans","inherit"),Yt=A("font-mono","monospace"),sr=A("radius","9px"),Jt=`calc(${sr} - 2px)`,or=`calc(${sr} - 4px)`,h=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,rr=`background-image: linear-gradient(${N}, ${N});`,Qt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Zt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",nr="box-shadow: var(--oc-sdk-lit);",qt=`inset 0 0.5px 0 0 ${h(P,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Lr=`
:root {
  --oc-sdk-edge: ${h(P,16)};
  --oc-sdk-field-bg: ${Je};
  --oc-sdk-raised-bg: ${B};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${h(P,14)};
  --oc-sdk-field-bg: ${h(B,50,Je)};
  --oc-sdk-raised-bg: ${Je};
  --oc-sdk-field-lift: ${qt};
  --oc-sdk-raised-lift: ${qt};
  --oc-sdk-lit: ${qt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ye=(e)=>{let r=A(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${A(`${e}-text`,"inherit")}; }`},wr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,ir=`${Lr}
.oc-sdk { color: ${P}; font-family: ${vr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${rr} }
.oc-sdk-mono { font-family: ${Yt}; }
.oc-sdk-muted { color: ${m}; }
${Ye("success")}${Ye("warning")}${Ye("error")}${Ye("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${F}; --oc-sdk-tone-text: ${jt}; }

.oc-sdk-btn { border-radius: ${Jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${or}; }
.oc-sdk-btn[data-variant="default"] { color: ${jt}; background: ${h(F,10,B)}; border-color: ${h(F,12)}; ${nr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${h(F,16,B)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${h(F,22,B)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Nr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${oe}; ${Zt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${N}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${A("status-error","red")}; color: ${zt}; background: ${h("var(--oc-sdk-tone)",7,B)}; border-color: ${h("var(--oc-sdk-tone)",12)}; ${nr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${h("var(--oc-sdk-tone)",9,B)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${h("var(--oc-sdk-tone)",11,B)}; box-shadow: none; }

.oc-sdk-field-note { color: ${m}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${zt}; }
.oc-sdk-input { border-radius: ${Jt}; background: var(--oc-sdk-field-bg); color: ${oe}; ${Qt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${m}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Qt(h(P,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Qt(A("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Yt}; }

.oc-sdk-search-icon { color: ${m}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${F}; }
.oc-sdk-search-clear { border-radius: ${or}; color: ${m}; }
.oc-sdk-search-clear:hover { background: ${N}; color: ${P}; }

.oc-sdk-trigger { border-radius: ${Jt}; background: var(--oc-sdk-raised-bg); color: ${oe}; ${Zt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${m}; }
.oc-sdk-trigger-chevron { color: ${m}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${oe}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Je}; background-clip: padding-box; color: ${oe}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${N}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Kt}; color: ${Wt}; }
.oc-sdk-option-check { color: ${P}; }
.oc-sdk-option[data-destructive="true"] { color: ${zt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${h(A("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${m}; }
.oc-sdk-popup-empty { color: ${m}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${W}; border-radius: 4px; color: ${P}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${h(P,60,W)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${W}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${F}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${rr} }
.oc-sdk-check-desc { color: ${m}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${h(P,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${m}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${P}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Wt}; background: ${Kt}; border-color: ${W}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${oe}; background: var(--oc-sdk-raised-bg); ${Zt} }
.oc-sdk-tab-count { color: ${m}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${h(P,6)}; color: ${m}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${h("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${N}; }
.oc-sdk-row[aria-selected="true"] { background: ${Kt}; color: ${Wt}; }
.oc-sdk-row-lead { font-family: ${Yt}; color: ${m}; }
.oc-sdk-row-sub { color: ${m}; }
.oc-sdk-row-meta { color: ${m}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${m}; }

.oc-sdk-empty-body { color: ${m}; }

.oc-sdk-spinner { color: ${m}; }
.oc-sdk-spinner-ring { border-color: ${W}; border-top-color: ${F}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${h("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${m}; }

.oc-sdk-separator { color: ${m}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${h(W,40)}; }

.oc-sdk-progress-label { color: ${m}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${h(P,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${F}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${A("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${A("success-text","inherit")}; }

.oc-sdk-text a { color: ${jt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${h(W,60)}; }
`,y=`
${ft}
${wr}
${ir}`;var nt=Bt(),ur=M("#root"),Er=M("#lobby"),no=M("#play"),Oe=M("#screen"),_r=M("#overlay"),Vr=M("#overlay-kicker"),Xr=M("#overlay-title"),Fr=M("#overlay-message"),ar=M("#overlay-button"),to=M("#mode"),so=M("#pause"),Sr=M("#meter"),k=null,st=null,xe=null,it=null,tt=320,oo=400,ne=320,Ae=200,H=!1,ie=!1,Te=0,se=null,ro=0,Re=15,fe=0,ot=0,cr=!1,dr=null,z=new Set,Ie=new Set,me=new Map,at=0;function M(e){let r=document.querySelector(e);if(!r)throw Error("Missing DOOM element: "+e);return r}function ge(){let e=Math.ceil(ur.getBoundingClientRect().height);if(e>0)nt.setHeight(e).catch(()=>{return})}function ct(e,r,n,p,u){Vr.textContent=e,Xr.textContent=r,Fr.textContent=n,ar.textContent=p,ar.onclick=u,_r.hidden=!1}function Tr(){_r.hidden=!0}function Br(){for(let e of z)k?.reportKeyUp(e);z.clear(),Ie.clear(),me.clear()}function io(){if(H=!1,se!==null)clearTimeout(se),se=null;Br()}function he(){if(!ie||!k||!H)return;io(),so.textContent="Resume",ct("Standby","Paused","0 game ticks or rendering while paused.","Resume",pt)}function pt(){if(!ie||!k||H||document.hidden)return;Tr(),so.textContent="Pause",Oe.focus({preventScroll:!0}),H=!0,se=window.setTimeout(Or,0)}function dt(){++Te,io(),k=null,xe=null,it=null,st=null,ie=!1,Sr.textContent="— ms/tick"}function lt(){dt(),no.hidden=!0,Er.hidden=!1,ge()}function fr(e){let r=k;if(!r)return null;let n={w:"KEY_UPARROW",a:"KEY_LEFTARROW",s:"KEY_DOWNARROW",d:"KEY_RIGHTARROW",ArrowUp:"KEY_UPARROW",ArrowLeft:"KEY_LEFTARROW",ArrowDown:"KEY_DOWNARROW",ArrowRight:"KEY_RIGHTARROW",Control:"KEY_FIRE",f:"KEY_FIRE",e:"KEY_USE"," ":"KEY_USE",q:"KEY_STRAFE_L",r:"KEY_STRAFE_R",",":"KEY_STRAFE_L",".":"KEY_STRAFE_R",Shift:"KEY_SHIFT",Escape:"KEY_ESCAPE",Enter:"KEY_ENTER",Backspace:"KEY_BACKSPACE",Tab:"KEY_TAB",Alt:"KEY_ALT"},p=e.length===1?e.toLowerCase():e,u=n[p];if(u)return Number(r[u]);return p.length===1?p.charCodeAt(0):null}function rt(e,r){if(!ie||!k||!H)return;let n=fr(e);if(n===null||!Number.isFinite(n))return;if(r){if(Ie.delete(n),!z.has(n))z.add(n),me.set(n,at),k.reportKeyDown(n)}else if(z.has(n))if(me.get(n)===at)Ie.add(n);else z.delete(n),me.delete(n),k.reportKeyUp(n)}function lr(e,r){if(!ie||!k||no.hidden)return;if(e.key.toLowerCase()==="p"&&r){if(e.preventDefault(),H)he();else pt();return}if(document.activeElement!==Oe)return;if(fr(e.key)===null)return;e.preventDefault(),e.stopPropagation(),rt(e.key,r)}function $r(e){let r=k;if(!r||!xe||!it||!st)return;let n=new Uint32Array(r.memory.buffer,e,tt*oo),p=it,u=Math.max(1,Math.floor(tt/ne)),f=Math.max(1,Math.floor(oo/Ae));for(let S=0;S<Ae;S++){let C=S*f*tt;for(let I=0;I<ne;I++){let D=n[C+I*u];p[S*ne+I]=4278190080|D&65280|(D&255)<<16|D>>>16&255}}st.putImageData(xe,0,0)}function Kr(e,r){if(!k||r<=0)return"";return new TextDecoder().decode(new Uint8Array(k.memory.buffer,e,r))}function Or(){if(se=null,!H||!k||document.hidden){if(H)he();return}let e=performance.now();ro+=28.571428571428573;try{k.tickGame(),at++;for(let n of Ie){if(z.delete(n))k.reportKeyUp(n);me.delete(n)}Ie.clear()}catch(n){io(),ct("Engine stopped","Game error",String(n),"Back",lt);return}let r=performance.now()-e;if(fe+=1,ot+=r,fe>=Math.max(10,Re))Sr.textContent=(ot/fe).toFixed(1)+" ms/tick",fe=0,ot=0;if(H)se=window.setTimeout(Or,Math.max(1,Math.round(1000/Re-r)))}function Wr(e){let r=new URL("./assets/"+e,window.location.href),n=document.querySelector('script[src*="main.js"]'),p=n?new URL(n.src).searchParams.get("oc_url_token"):null;if(p)r.searchParams.set("oc_url_token",p);return r.href}async function jr(){let e=Wr("doom-packed.js");await new Promise((S,C)=>{let I=document.createElement("script");I.src=e,I.onload=()=>{I.remove(),S()},I.onerror=()=>{I.remove(),C(Error("Could not load packaged engine"))},document.head.append(I)});let r=window.__doomPacked;if(delete window.__doomPacked,!r)throw Error("Packaged engine missing");let n=atob(r),p=new Uint8Array(n.length);for(let S=0;S<n.length;S++)p[S]=n.charCodeAt(S);if(!("DecompressionStream"in window))throw Error("This browser does not support gzip decompression streams");let u=new Blob([p]).stream().pipeThrough(new DecompressionStream("gzip")),f=await new Response(u).arrayBuffer();return new Uint8Array(f)}async function pr(){dt();let e=Te;Er.hidden=!0,no.hidden=!1,ct("Loading","Starting DOOM","Loading the original shareware episode and silent engine.","Back",lt),ge();try{let r=await jr();if(e!==Te)return;let n=Oe.getContext("2d",{alpha:!1});if(!n)throw Error("Canvas 2D is unavailable");st=n,ro=1000,fe=0,ot=0,at=0;let p={console:{onInfoMessage:(f,S)=>{},onErrorMessage:(f,S)=>console.warn("[DOOM]",Kr(f,S))},loading:{onGameInit:(f,S)=>{tt=f,oo=S,ne=Math.min(320,f),Ae=Math.min(200,S),Oe.width=ne,Oe.height=Ae,xe=n.createImageData(ne,Ae),it=new Uint32Array(xe.data.buffer)},wadSizes:()=>{},readWads:()=>{}},ui:{drawFrame:$r},runtimeControl:{timeInMilliseconds:()=>BigInt(Math.trunc(++ro))},gameSaving:{sizeOfSaveGame:()=>0,readSaveGame:()=>0,writeSaveGame:()=>0}},{instance:u}=await WebAssembly.instantiate(r.buffer,p);if(e!==Te)return;k=u.exports,k.initGame(),ie=!0,Tr(),pt(),ge()}catch(r){if(e!==Te)return;dt(),ct("Could not launch","DOOM unavailable",String(r),"Back",lt)}}function zr(){for(let e of document.querySelectorAll("[data-key]")){let r=e.dataset.key||"",n=(p)=>{p.preventDefault(),rt(r,!1)};e.addEventListener("pointerdown",(p)=>{if(p.preventDefault(),!H)return;e.setPointerCapture(p.pointerId),rt(r,!0)}),e.addEventListener("pointerup",n),e.addEventListener("pointercancel",n),e.addEventListener("lostpointercapture",()=>rt(r,!1))}}function Yr(){M("#launch").addEventListener("click",()=>void pr()),M("#exit").addEventListener("click",lt),M("#restart").addEventListener("click",()=>void pr()),so.addEventListener("click",()=>{if(H)he();else pt()}),to.addEventListener("change",()=>{Re=Number(to.value);try{nt.storage.set("doom:tps",Re).catch(()=>{return})}catch{}}),window.addEventListener("keydown",(e)=>lr(e,!0)),window.addEventListener("keyup",(e)=>lr(e,!1)),window.addEventListener("blur",he),document.addEventListener("visibilitychange",()=>{if(document.hidden)he()}),window.addEventListener("pagehide",dt),dr=new ResizeObserver(ge),dr.observe(ur),zr(),ge(),nt.storage.get("doom:tps").then((e)=>{if([10,15,25,35].includes(Number(e)))Re=Number(e),to.value=String(e)}).catch(()=>{return})}nt.onReady((e)=>{if($t(e,document.documentElement),cr)return;cr=!0,Yr()});})();
