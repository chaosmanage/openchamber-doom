(()=>{var E="openchamber.sdk",_=1;var _t=`
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
`;function fo(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(p)=>{let u=p.target===e?r:p.target;if(!(u instanceof Element))return;if(!u.hasAttribute("data-oc-scrolling"))u.setAttribute("data-oc-scrolling","");let f=n.get(u);if(f!==void 0)clearTimeout(f);n.set(u,setTimeout(()=>{n.delete(u),u.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var fr=`(${fo.toString()})(document);`;var St=128,Tt=65536;var ve=128;var Le=65536;var mo=/^[a-z][a-z0-9-]{0,39}$/;var Oo=(e)=>Object(e)===e&&!Array.isArray(e),ft=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),Ao=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Ro=(e)=>String(e)===e&&e.length>=1&&e.length<=80,ho=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!Oo(n)||!mo.test(n.id)||!Ao(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!ft(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!ft(n,["kind","id","label","value","options","disabled"]))return!1;if(!Ro(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let p=new Set;for(let u of n.options){if(!Oo(u)||!ft(u,["value","label"])||!Ro(u.value)||!Ao(u.label)||p.has(u.value))return!1;p.add(u.value)}if(!p.has(n.value))return!1}return!0};var xo=["{id}","{segment}","{segments+}"];var on=new Set(xo);var Io=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var nn=new Set(Io);var Pe=20000000,we=256;var Ot=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,go=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var bo=/^[A-Za-z0-9_-]{1,80}$/;var ko=["left","right","top","bottom"];var Co=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let u of p)if(!Co(u,r+1,n))return!1;return!0},At=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(At);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(At)}return String(e)===e||Number.isFinite(e)},Rt=(e)=>{try{if(String(e.id)!==e.id||!bo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ko.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Co(e.data)||!At(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ht=2000;var yo=["file","directory","other","missing"],xt=(e)=>Boolean(e&&"sessionId"in e),It=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Mo=/^[0-9a-f]{7,64}$/i,gt=(e)=>Mo.test(e),De=500,Ge=32000,No=16000,vo=128,Lo=200,Po=2000,wo=16000,Do=80,Go=200,Ho=16000;var Vo=2000;var bt=20000,He=1024,Ve=2000000;var Xe=64000,Fe=8000,kt=4000;var Ct=960000;var Xo=999,Fo=1e4,Ee=500,Bo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],$o=["stopped","starting","ready","failed"],Ar=new Set(Bo),Ko=(e)=>Ar.has(e),Wo=(e)=>e&&Ko(e)?e:"HOST_REJECTED",Z=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Z);if(Object(e)===e)return Object.values(e).every(Z);return!1},jo=(e)=>Z(e)&&JSON.stringify(e).length<=Ho,Uo=(e)=>e?.trim().slice(0,Go)??"",q=(e)=>{let r=e.id.trim().slice(0,vo),n=e.title.trim().slice(0,Lo),p=e.url.trim().slice(0,Po),u=e.text?.trim().slice(0,wo),f=e.author?.trim().slice(0,Do),S=e.kind==="pull"?"pull":"issue",C={providerId:e.providerId.trim(),id:r,title:n||r,url:p,kind:S};if(u)C.text=u;if(f)C.author=f;if(S==="pull"){let I=Uo(e.branches?.head),D=Uo(e.branches?.base);if(I&&D)C.branches={head:I,base:D}}if(jo(e.data))C.data=e.data;return C},Ut=(e)=>{let r=q(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},yt=(e)=>{let r={text:e.text.trim().slice(0,No)};if(e.send)r.send=!0;return r},Mt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Xo,Math.max(0,Math.round(e)))},Nt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Fo,Math.max(0,Math.ceil(e)))};var ee=(e)=>e.length>0&&e.length<=He&&!e.includes("\x00")&&!e.includes("\\");var Be=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Vo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Rr=new Set($o),vt=(e)=>Boolean(e&&"status"in e&&Rr.has(String(e.status))&&!("body"in e)),$e=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Lt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Pt=(e)=>Boolean(e&&"written"in e&&e.written===!0),wt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),mr=new Set(yo),Dt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&mr.has(String(e.kind))&&Number.isFinite(e.size)),Gt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),hr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),xr=(e)=>Object(e)===e?e:null,mt=(e)=>String(e)===e&&e.length>0,Ir=(e)=>{if(!mt(e.id))return null;if(e.ok===!0){let r={channel:E,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&mt(e.error))return{channel:E,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:Wo(mt(e.code)?e.code:void 0)};return null},Ht=(e)=>{let r=xr(e);if(!r||r.channel!==E||r.v!==_)return null;if(r.type==="result")return Ir(r);if(!hr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var zo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),gr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class c extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Yo=()=>Promise.reject(new c("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ke=()=>Promise.reject(new c("BAD_PATH",`File path must be 1 to ${He} characters without NUL or backslash.`)),We=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new c("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},l=(e)=>(e.value+=1,`oc-${e.value}`),Vt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new c("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),p=e.requestTimeoutMs??bt,u=new Set,f=new Set,S=new Set,C=new Set,I=new Set,D=new Set,ie=new Set,Ie=new Set,ge=new Set,be=new Set,ke=new Set,z=new Set,dt=[],ae=null,ce=null,Ce=new Set,Ue=new Set,de=null,le=null,lt=!1,Y=new Map,J=new Map,Q=new Map,V=!1,d={value:0},a=null,X=null,pe=!1,ue=!1,no=null,so=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},P=(t)=>{r.parent.postMessage(t,"*")},io=()=>{if(V||r.parent===r||z.size===0||a?.features?.lateGenerateResults!==!0)return;P({channel:E,v:_,type:"generate-late-listen"})},R=(t,o)=>{for(let s of t)try{s(o)}catch(i){console.error(i)}},ao=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Ht(t.data);if(!o)return;if(o.type==="workspace"){let i=J.get(o.payload.subscriptionId);if(i)R([i],o.payload.snapshot);return}if(o.type==="shells"){let i=Q.get(o.payload.subscriptionId);if(i)R([i],o.payload.snapshot);return}if(o.type==="ready"){if(a=o.payload,X=so(o.payload.session),R(u,o.payload),R(f,o.payload.directory),R(S,o.payload.session),X)R(C,X);if(R(I,o.payload.connection),R(D,o.payload.settings),R(ie,o.payload.item),o.payload.block)R(Ie,o.payload.block);io();return}if(o.type==="service-event"){R(ge,o.payload);return}if(o.type==="generate-late"){if(z.size===0)dt.push(o.payload);else R(z,o.payload);return}if(o.type==="directory"){if(a)a={...a,directory:o.payload.directory};R(f,o.payload.directory);return}if(o.type==="session"){if(a)a={...a,session:o.payload.session};if(!o.payload.session)X=null;else if(X?.sessionId!==o.payload.session.id)X=so(o.payload.session);R(S,o.payload.session);return}if(o.type==="session-lifecycle"){X=o.payload,R(C,o.payload);return}if(o.type==="connection"){if(a)a={...a,connection:o.payload.connection};R(I,o.payload.connection);return}if(o.type==="settings"){if(a)a={...a,settings:o.payload.settings};R(D,o.payload.settings);return}if(o.type==="item"){if(a)a={...a,item:o.payload.item};R(ie,o.payload.item);return}if(o.type==="status-control-event"){R(be,o.payload);return}if(o.type==="popover-closed"){R(ke,o.payload);return}if(o.type==="action"){let i=(T)=>{if(!V)P({channel:E,v:_,type:"action-result",id:o.id,payload:T})},O=ce;if(!O){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>O(o.payload)).then(()=>i({ok:!0}),(T)=>{let b=(T instanceof Error?T.message:String(T)).trim();i({ok:!1,error:(b||"Action failed.").slice(0,Ee)})});return}if(o.type==="file-open"){let i=o.payload;if(le&&go(le,i))return;le=i,R(Ce,o.payload);return}if(o.type==="file-saved"){R(Ue,o.payload.version);return}if(o.type==="file-snapshot"){let i=(b)=>{if(!V)P({channel:E,v:_,type:"file-snapshot-result",id:o.id,payload:b})},O=(b)=>i({error:(b.trim()||"Could not read the edited file.").slice(0,Ee)}),T=de;if(!T){O("This extension does not edit files.");return}Promise.resolve().then(()=>T(o.payload.purpose)).then((b)=>{if(Ot(b)>Pe){O(`The file is over ${Pe} ${"bytes"in b?"bytes":"characters"}.`);return}if(b.version.length>we){O(`The snapshot version is over ${we} characters.`);return}i({snapshot:"bytes"in b?{bytes:b.bytes,version:b.version}:{content:b.content,version:b.version}})},(b)=>O(b instanceof Error?b.message:String(b)));return}if(o.type==="resolve"){let i=(T)=>{P({channel:E,v:_,type:"resolve-result",id:o.id,payload:T})},O=ae;if(!O){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>O(o.payload)).then((T)=>i({item:T?q(T):null}),(T)=>{let b=(T instanceof Error?T.message:String(T)).trim();i({error:(b||"Command failed.").slice(0,Ee)})});return}let s=Y.get(o.id);if(!s)return;if(clearTimeout(s.timer),Y.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new c(o.code,o.error))};r.addEventListener("message",ao),P({channel:E,v:_,type:"hello"});let U=(t,o=p)=>{if(V||r.parent===r)return Promise.reject(new c("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,i)=>{let O=setTimeout(()=>{Y.delete(t.id),i(new c("HOST_TIMEOUT","Host did not answer in time."))},o);Y.set(t.id,{resolve:s,reject:i,timer:O}),P(t)})},x=(t)=>U(t).then(()=>{return}),g={channel:E,v:_},pt=(t)=>{if(!V&&r.parent!==r)P(t)},co=()=>pt({...g,type:"file-save"}),lo=(t)=>{if(!zo(t)||!gr(t))return;t.preventDefault(),co()},po=(t)=>{if(!zo(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),So(a.popover.id,"escape").catch(()=>{return})},ye=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let o=pe||ue;if(no===o)return;no=o,To(t.id,o).catch(()=>{return})},Me=()=>{if(a?.surface!=="popover"||pe)return;pe=!0,ye()},uo=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!pe)return;pe=!1,ye()},Eo=()=>{if(a?.surface!=="popover"||ue)return;ue=!0,ye()},_o=()=>{if(a?.surface!=="popover"||!ue)return;ue=!1,ye()},G=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new c("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},ut=async(t)=>{if(t.kind!=="projects")G(t.projectId);let o=await U({...g,type:"workspace-read",id:l(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new c("HOST_REJECTED","Host did not return workspace data.");return o},Et=async(t,o)=>{if(t.kind!=="projects")G(t.projectId);let s=l(d);J.set(s,o);try{await x({...g,type:"workspace-subscribe",id:l(d),payload:{subscriptionId:s,query:t}})}catch(i){if(J.delete(s),!V)P({...g,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}});throw i}return()=>{if(!J.delete(s)||V)return;P({...g,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},Tr=async(t,o)=>{if(t.kind==="session")G(t.sessionId);if(t.kind==="project")G(t.projectId);let s=l(d);Q.set(s,o);try{await x({...g,type:"shells-subscribe",id:l(d),payload:{subscriptionId:s,scope:t}})}catch(i){if(Q.delete(s),!V)P({...g,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}});throw i}return()=>{if(!Q.delete(s)||V)return;P({...g,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},Ne=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>St))throw new c("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Z(t.value))throw new c("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Tt)throw new c("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new c("UNSUPPORTED","This host does not support device storage.");let o=await U({...g,type:"storage",id:l(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new c("HOST_REJECTED","Host did not return storage data.");return o},So=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):x({...g,type:"popover-close",id:l(d),payload:o?{id:t,reason:o}:{id:t}}),To=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new c("UNSUPPORTED","This host does not support popovers.")):x({...g,type:"popover-anchor",id:l(d),payload:{id:t,active:o}});return r.addEventListener("keydown",po,!0),r.addEventListener("pointerover",Me),r.addEventListener("pointermove",Me),r.addEventListener("pointerout",uo),r.addEventListener("focus",Eo),r.addEventListener("blur",_o),{onAction:(t)=>(ce=t,()=>{if(ce===t)ce=null}),listProjects:async()=>{let t=await ut({kind:"projects"});if(t.kind!=="projects")throw new c("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await ut({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new c("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await ut({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new c("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Et({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Et({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>Et({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>Tr(t,o),readShellOutput:async(t,o)=>{G(t,ve);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new c("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Le))throw new c("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Le}.`);let T=await U({...g,type:"shell-output",id:l(d),payload:{shellId:t,cursor:s,tailBytes:i}});if(!T||typeof T.output!=="string"||!Number.isFinite(T.cursor))throw new c("HOST_REJECTED","Host did not return shell output.");return T},stopShell:async(t)=>{if(G(t,ve),(await U({...g,type:"shell-stop",id:l(d),payload:{shellId:t}}))?.stopped!==!0)throw new c("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{G(t),await x({...g,type:"open-session",id:l(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=We(o),i={op:"get",key:t};if(s)i.scope=s;let O=await Ne(i);return O.op==="get"&&O.found?O.value:void 0},set:async(t,o,s)=>{let i=We(s),O={op:"set",key:t,value:o};if(i)O.scope=i;await Ne(O)},delete:async(t,o)=>{let s=We(o),i={op:"delete",key:t};if(s)i.scope=s;await Ne(i)},keys:async(t)=>{let o=We(t),s={op:"keys"};if(o)s.scope=o;let i=await Ne(s);if(i.op!=="keys")throw new c("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(u.add(t),a)t(a);return()=>{u.delete(t)}},onDirectory:(t)=>{if(f.add(t),a)t(a.directory);return()=>{f.delete(t)}},onSession:(t)=>{if(S.add(t),a)t(a.session);return()=>{S.delete(t)}},onSessionLifecycle:(t)=>{if(C.add(t),X)t(X);return()=>{C.delete(t)}},onConnection:(t)=>{if(I.add(t),a)t(a.connection);return()=>{I.delete(t)}},onSettings:(t)=>{if(D.add(t),a)t(a.settings);return()=>{D.delete(t)}},onItem:(t)=>{if(ie.add(t),a)t(a.item);return()=>{ie.delete(t)}},onBlock:(t)=>{if(Ie.add(t),a?.block)t(a.block);return()=>{Ie.delete(t)}},onServiceEvent:(t)=>(ge.add(t),()=>{ge.delete(t)}),onStatusControl:(t)=>(be.add(t),()=>{be.delete(t)}),onPopoverClosed:(t)=>(ke.add(t),()=>{ke.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support status controls."));if(!ho(t))return Promise.reject(new c("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return x({...g,type:"status-controls",id:l(d),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new c("UNSUPPORTED","This host does not support popovers."));if(!Rt(t))return Promise.reject(new c("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return x({...g,type:"popover-open",id:l(d),payload:t})},closePopover:So,setPopoverAnchorActive:To,onResolve:(t)=>(ae=t,()=>{if(ae===t)ae=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>De)return Promise.reject(new c("HOST_REJECTED",`Toast message must contain 1 to ${De} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ge))return Promise.reject(new c("HOST_REJECTED",`Toast copy text must contain 1 to ${Ge} characters.`));return x({channel:E,v:_,type:"toast",id:l(d),payload:{...t,message:o}})},openUrl:(t)=>x({channel:E,v:_,type:"open-url",id:l(d),payload:{url:t}}),openCommit:(t)=>gt(t)?x({channel:E,v:_,type:"open-commit",id:l(d),payload:{sha:t}}):Promise.reject(new c("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(t)=>x({channel:E,v:_,type:"block-answer",id:l(d),payload:{text:t.trim().slice(0,ht)}}),openSurface:(t)=>x({channel:E,v:_,type:"open-surface",id:l(d),payload:{surfaceId:t}}),writeClipboard:(t)=>x({channel:E,v:_,type:"clipboard-write",id:l(d),payload:{text:t}}),compose:(t)=>x({channel:E,v:_,type:"compose",id:l(d),payload:t}),attach:(t)=>x({channel:E,v:_,type:"attach",id:l(d),payload:q(t)}),startSession:async(t)=>{if(t.projectId!==void 0)G(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")G(o.directory);else{if(o.name!==void 0)G(o.name,200);if(o.baseBranch!==void 0)G(o.baseBranch,200)}let s=await U({channel:E,v:_,type:"start-session",id:l(d),payload:Ut(t)},e.requestTimeoutMs??180000);if(!xt(s))throw new c("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>U({channel:E,v:_,type:"prompt",id:l(d),payload:yt(t)}).then((o)=>{if(!It(o))throw new c("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>x({channel:E,v:_,type:"session-link",id:l(d),payload:q(t)}),close:()=>x({channel:E,v:_,type:"close",id:l(d)}),oauthStart:()=>x({channel:E,v:_,type:"oauth-start",id:l(d)}),oauthDisconnect:()=>x({channel:E,v:_,type:"oauth-disconnect",id:l(d)}),request:(t)=>(Be(t.path)?U({channel:E,v:_,type:"request",id:l(d),payload:t}):Yo()).then((o)=>{if(!$e(o))throw new c("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Be(t.path)?U({channel:E,v:_,type:"service-request",id:l(d),payload:t}):Yo()).then((o)=>{if(!$e(o))throw new c("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>U({channel:E,v:_,type:"service-status",id:l(d)}).then((t)=>{if(!vt(t))throw new c("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ee(t)?U({channel:E,v:_,type:"file-read",id:l(d),payload:{path:t}}):Ke()).then((o)=>{if(!Lt(o))throw new c("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ee(t))return Ke();if(o.length>Ve)return Promise.reject(new c("FILE_TOO_LARGE",`Content is over ${Ve} characters.`));return U({channel:E,v:_,type:"file-write",id:l(d),payload:{path:t,content:o}}).then((s)=>{if(!Pt(s))throw new c("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(ee(t)?U({channel:E,v:_,type:"file-list",id:l(d),payload:{path:t}}):Ke()).then((o)=>{if(!wt(o))throw new c("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ee(t)?U({channel:E,v:_,type:"file-stat",id:l(d),payload:{path:t}}):Ke()).then((o)=>{if(!Dt(o))throw new c("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>Xe)return Promise.reject(new c("HOST_REJECTED",`Prompt must be 1 to ${Xe} characters.`));if(s!==void 0&&(s.length===0||s.length>Fe))return Promise.reject(new c("HOST_REJECTED",`System prompt must be 1 to ${Fe} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(kt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new c("HOST_REJECTED","maxOutputTokens must be a number."));let O={prompt:o};if(s!==void 0)O.system=s;if(i!==void 0)O.maxOutputTokens=i;return U({channel:E,v:_,type:"generate",id:l(d),payload:O},e.requestTimeoutMs??Ct).then((T)=>{if(!Gt(T))throw new c("HOST_REJECTED","Host did not return generated text.");return T})},onLateGenerateResult:(t)=>{z.add(t);for(let o of dt.splice(0))R([t],o);return io(),()=>{z.delete(t)}},setBadge:(t)=>x({channel:E,v:_,type:"badge",id:l(d),payload:{count:Mt(t)}}),setHeight:(t)=>x({channel:E,v:_,type:"resize",id:l(d),payload:{height:Nt(t)}}),onFileOpen:(t)=>{if(Ce.add(t),!lt)lt=!0,r.addEventListener("keydown",lo,!0);if(le)t(le);return()=>{Ce.delete(t)}},onFileSnapshot:(t)=>(de=t,()=>{if(de===t)de=null}),onFileSaved:(t)=>(Ue.add(t),()=>{Ue.delete(t)}),reportFileChange:(t)=>pt({...g,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:co,reportFileUnsupported:()=>pt({...g,type:"file-unsupported"}),dispose:()=>{for(let t of J.keys())P({...g,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:t}});J.clear();for(let t of Q.keys())P({...g,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:t}});if(Q.clear(),V=!0,ae=null,ce=null,de=null,Ce.clear(),Ue.clear(),lt)r.removeEventListener("keydown",lo,!0);r.removeEventListener("message",ao),r.removeEventListener("keydown",po,!0),r.removeEventListener("pointerover",Me),r.removeEventListener("pointermove",Me),r.removeEventListener("pointerout",uo),r.removeEventListener("focus",Eo),r.removeEventListener("blur",_o);for(let t of Y.values())clearTimeout(t.timer),t.reject(new c("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),u.clear(),f.clear(),S.clear(),C.clear(),I.clear(),D.clear(),ie.clear(),Ie.clear(),ge.clear(),be.clear(),ke.clear(),z.clear(),dt.length=0}}};var Jo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Rn=new Set(Jo);var Qo=["none","agent","user"];var hn=new Set(Qo);var br=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],kr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Zo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,p]of br)r.style.setProperty(n,e.tokens[p]);for(let[n,p,u]of kr){let f=e.tokens[u]??"";r.style.setProperty(n,f),r.style.setProperty(p,f)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Xt=(e,r)=>{if(Zo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var Cr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},A=(e,r)=>`var(--${e}, var(--oc-${Cr[e]}, ${r}))`,B=A("surface-background","transparent"),ze=A("surface-elevated","transparent"),te=A("surface-elevated-foreground","inherit"),w=A("surface-foreground","inherit"),m=A("surface-muted-foreground","gray"),Ur=A("surface-muted","transparent"),W=A("interactive-border","currentColor"),N=A("interactive-hover","transparent"),j=A("interactive-active","transparent"),Ft=A("interactive-selection","transparent"),Bt=A("interactive-selection-foreground","inherit"),F=A("primary","currentColor"),$t=A("primary-text","inherit"),Kt=A("error-text","inherit"),yr=A("font-sans","inherit"),Wt=A("font-mono","monospace"),or=A("radius","9px"),jt=`calc(${or} - 2px)`,qo=`calc(${or} - 4px)`,h=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,er=`background-image: linear-gradient(${N}, ${N});`,zt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Yt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",tr="box-shadow: var(--oc-sdk-lit);",Jt=`inset 0 0.5px 0 0 ${h(w,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Mr=`
:root {
  --oc-sdk-edge: ${h(w,16)};
  --oc-sdk-field-bg: ${ze};
  --oc-sdk-raised-bg: ${B};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${h(w,14)};
  --oc-sdk-field-bg: ${h(B,50,ze)};
  --oc-sdk-raised-bg: ${ze};
  --oc-sdk-field-lift: ${Jt};
  --oc-sdk-raised-lift: ${Jt};
  --oc-sdk-lit: ${Jt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,je=(e)=>{let r=A(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${A(`${e}-text`,"inherit")}; }`},Nr=`
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
`,rr=`${Mr}
.oc-sdk { color: ${w}; font-family: ${yr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${er} }
.oc-sdk-mono { font-family: ${Wt}; }
.oc-sdk-muted { color: ${m}; }
${je("success")}${je("warning")}${je("error")}${je("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${F}; --oc-sdk-tone-text: ${$t}; }

.oc-sdk-btn { border-radius: ${jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${qo}; }
.oc-sdk-btn[data-variant="default"] { color: ${$t}; background: ${h(F,10,B)}; border-color: ${h(F,12)}; ${tr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${h(F,16,B)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${h(F,22,B)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ur}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${te}; ${Yt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${j}, ${j}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${N}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${j}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${A("status-error","red")}; color: ${Kt}; background: ${h("var(--oc-sdk-tone)",7,B)}; border-color: ${h("var(--oc-sdk-tone)",12)}; ${tr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${h("var(--oc-sdk-tone)",9,B)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${h("var(--oc-sdk-tone)",11,B)}; box-shadow: none; }

.oc-sdk-field-note { color: ${m}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Kt}; }
.oc-sdk-input { border-radius: ${jt}; background: var(--oc-sdk-field-bg); color: ${te}; ${zt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${m}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${zt(h(w,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${zt(A("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Wt}; }

.oc-sdk-search-icon { color: ${m}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${F}; }
.oc-sdk-search-clear { border-radius: ${qo}; color: ${m}; }
.oc-sdk-search-clear:hover { background: ${N}; color: ${w}; }

.oc-sdk-trigger { border-radius: ${jt}; background: var(--oc-sdk-raised-bg); color: ${te}; ${Yt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${N}, ${N}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${m}; }
.oc-sdk-trigger-chevron { color: ${m}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${te}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${ze}; background-clip: padding-box; color: ${te}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${N}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ft}; color: ${Bt}; }
.oc-sdk-option-check { color: ${w}; }
.oc-sdk-option[data-destructive="true"] { color: ${Kt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${h(A("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${m}; }
.oc-sdk-popup-empty { color: ${m}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${W}; border-radius: 4px; color: ${w}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${h(w,60,W)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${W}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${B}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${F}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${er} }
.oc-sdk-check-desc { color: ${m}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${h(w,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${m}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${w}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Bt}; background: ${Ft}; border-color: ${W}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${te}; background: var(--oc-sdk-raised-bg); ${Yt} }
.oc-sdk-tab-count { color: ${m}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${h(w,6)}; color: ${m}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${h("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${N}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ft}; color: ${Bt}; }
.oc-sdk-row-lead { font-family: ${Wt}; color: ${m}; }
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
.oc-sdk-progress-track { border-radius: 9999px; background: ${h(w,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${F}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${A("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${A("success-text","inherit")}; }

.oc-sdk-text a { color: ${$t}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${h(W,60)}; }
`,y=`
${_t}
${Nr}
${rr}`;var ot=Vt(),dr=M("#root"),lr=M("#lobby"),to=M("#play"),fe=M("#screen"),pr=M("#overlay"),Dr=M("#overlay-kicker"),Gr=M("#overlay-title"),Hr=M("#overlay-message"),nr=M("#overlay-button"),Zt=M("#mode"),oo=M("#pause"),ur=M("#meter"),k=null,rt=null,he=null,nt=null,qe=320,qt=400,re=160,Oe=100,H=!1,se=!1,Se=0,ne=null,eo=0,Ae=15,Te=0,et=0,sr=!1,ir=null,Re=new Set;function M(e){let r=document.querySelector(e);if(!r)throw Error("Missing DOOM element: "+e);return r}function xe(){let e=Math.ceil(dr.getBoundingClientRect().height);if(e>0)ot.setHeight(e).catch(()=>{return})}function st(e,r,n,p,u){Dr.textContent=e,Gr.textContent=r,Hr.textContent=n,nr.textContent=p,nr.onclick=u,pr.hidden=!1}function Er(){pr.hidden=!0}function Vr(){for(let e of Re)k?.reportKeyUp(e);Re.clear()}function ro(){if(H=!1,ne!==null)clearTimeout(ne),ne=null;Vr()}function me(){if(!se||!k||!H)return;ro(),oo.textContent="Resume",st("Standby","Paused","0 game ticks or rendering while paused.","Resume",ct)}function ct(){if(!se||!k||H||document.hidden)return;Er(),oo.textContent="Pause",fe.focus({preventScroll:!0}),H=!0,ne=window.setTimeout(Sr,0)}function it(){++Se,ro(),k=null,he=null,nt=null,rt=null,se=!1,ur.textContent="— ms/tick"}function at(){it(),to.hidden=!0,lr.hidden=!1,xe()}function _r(e){let r=k;if(!r)return null;let n={w:"KEY_UPARROW",a:"KEY_LEFTARROW",s:"KEY_DOWNARROW",d:"KEY_RIGHTARROW",ArrowUp:"KEY_UPARROW",ArrowLeft:"KEY_LEFTARROW",ArrowDown:"KEY_DOWNARROW",ArrowRight:"KEY_RIGHTARROW",Control:"KEY_FIRE",f:"KEY_FIRE",e:"KEY_USE"," ":"KEY_USE",q:"KEY_STRAFE_L",r:"KEY_STRAFE_R",",":"KEY_STRAFE_L",".":"KEY_STRAFE_R",Shift:"KEY_SHIFT",Escape:"KEY_ESCAPE",Enter:"KEY_ENTER",Backspace:"KEY_BACKSPACE",Tab:"KEY_TAB",Alt:"KEY_ALT"},p=e.length===1?e.toLowerCase():e,u=n[p];if(u)return Number(r[u]);return p.length===1?p.charCodeAt(0):null}function tt(e,r){if(!se||!k||!H)return;let n=_r(e);if(n===null||!Number.isFinite(n))return;if(r){if(!Re.has(n))Re.add(n),k.reportKeyDown(n)}else if(Re.delete(n))k.reportKeyUp(n)}function ar(e,r){if(!se||!k||to.hidden)return;if(e.key.toLowerCase()==="p"&&r){if(e.preventDefault(),H)me();else ct();return}if(document.activeElement!==fe)return;if(_r(e.key)===null)return;e.preventDefault(),e.stopPropagation(),tt(e.key,r)}function Xr(e){let r=k;if(!r||!he||!nt||!rt)return;let n=new Uint32Array(r.memory.buffer,e,qe*qt),p=nt,u=Math.max(1,Math.floor(qe/re)),f=Math.max(1,Math.floor(qt/Oe));for(let S=0;S<Oe;S++){let C=S*f*qe;for(let I=0;I<re;I++){let D=n[C+I*u];p[S*re+I]=4278190080|D&65280|(D&255)<<16|D>>>16&255}}rt.putImageData(he,0,0)}function Fr(e,r){if(!k||r<=0)return"";return new TextDecoder().decode(new Uint8Array(k.memory.buffer,e,r))}function Sr(){if(ne=null,!H||!k||document.hidden){if(H)me();return}let e=performance.now();eo+=28.571428571428573;try{k.tickGame()}catch(n){ro(),st("Engine stopped","Game error",String(n),"Back",at);return}let r=performance.now()-e;if(Te+=1,et+=r,Te>=Math.max(10,Ae))ur.textContent=(et/Te).toFixed(1)+" ms/tick",Te=0,et=0;if(H)ne=window.setTimeout(Sr,Math.max(1,Math.round(1000/Ae-r)))}function Br(e){let r=new URL("./assets/"+e,window.location.href),n=document.querySelector('script[src*="main.js"]'),p=n?new URL(n.src).searchParams.get("oc_url_token"):null;if(p)r.searchParams.set("oc_url_token",p);return r.href}async function $r(){let e=Br("doom-packed.js");await new Promise((S,C)=>{let I=document.createElement("script");I.src=e,I.onload=()=>{I.remove(),S()},I.onerror=()=>{I.remove(),C(Error("Could not load packaged engine"))},document.head.append(I)});let r=window.__doomPacked;if(delete window.__doomPacked,!r)throw Error("Packaged engine missing");let n=atob(r),p=new Uint8Array(n.length);for(let S=0;S<n.length;S++)p[S]=n.charCodeAt(S);if(!("DecompressionStream"in window))throw Error("This browser does not support gzip decompression streams");let u=new Blob([p]).stream().pipeThrough(new DecompressionStream("gzip")),f=await new Response(u).arrayBuffer();return new Uint8Array(f)}async function cr(){it();let e=Se;lr.hidden=!0,to.hidden=!1,st("Loading","Starting DOOM","Unpacking the engine once. No audio or network services.","Back",at),xe();try{let r=await $r();if(e!==Se)return;let n=fe.getContext("2d",{alpha:!1});if(!n)throw Error("Canvas 2D is unavailable");rt=n,eo=1000,Te=0,et=0;let p={console:{onInfoMessage:(f,S)=>{},onErrorMessage:(f,S)=>console.warn("[DOOM]",Fr(f,S))},loading:{onGameInit:(f,S)=>{qe=f,qt=S,re=Math.min(160,f),Oe=Math.min(100,S),fe.width=re,fe.height=Oe,he=n.createImageData(re,Oe),nt=new Uint32Array(he.data.buffer)},wadSizes:()=>{},readWads:()=>{}},ui:{drawFrame:Xr},runtimeControl:{timeInMilliseconds:()=>BigInt(Math.trunc(++eo))},gameSaving:{sizeOfSaveGame:()=>0,readSaveGame:()=>0,writeSaveGame:()=>0}},{instance:u}=await WebAssembly.instantiate(r.buffer,p);if(e!==Se)return;k=u.exports,k.initGame(),se=!0,Er(),ct(),xe()}catch(r){if(e!==Se)return;it(),st("Could not launch","DOOM unavailable",String(r),"Back",at)}}function Kr(){for(let e of document.querySelectorAll("[data-key]")){let r=e.dataset.key||"",n=(p)=>{p.preventDefault(),tt(r,!1)};e.addEventListener("pointerdown",(p)=>{if(p.preventDefault(),!H)return;e.setPointerCapture(p.pointerId),tt(r,!0)}),e.addEventListener("pointerup",n),e.addEventListener("pointercancel",n),e.addEventListener("lostpointercapture",()=>tt(r,!1))}}function Wr(){M("#launch").addEventListener("click",()=>void cr()),M("#exit").addEventListener("click",at),M("#restart").addEventListener("click",()=>void cr()),oo.addEventListener("click",()=>{if(H)me();else ct()}),Zt.addEventListener("change",()=>{Ae=Number(Zt.value);try{ot.storage.set("doom:tps",Ae).catch(()=>{return})}catch{}}),window.addEventListener("keydown",(e)=>ar(e,!0)),window.addEventListener("keyup",(e)=>ar(e,!1)),window.addEventListener("blur",me),document.addEventListener("visibilitychange",()=>{if(document.hidden)me()}),window.addEventListener("pagehide",it),ir=new ResizeObserver(xe),ir.observe(dr),Kr(),xe(),ot.storage.get("doom:tps").then((e)=>{if([10,15,25,35].includes(Number(e)))Ae=Number(e),Zt.value=String(e)}).catch(()=>{return})}ot.onReady((e)=>{if(Xt(e,document.documentElement),sr)return;sr=!0,Wr()});})();
