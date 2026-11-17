/**
 * 비밀번호 화면. 로그인 전에는 사이트의 어떤 파일도 내려가지 않아야 해서, React 번들과 따로
 * 이 파일 하나(HTML+CSS+JS)로 완결되게 만들었다. 입력 UI는 DesignBookmark의 "OTP code" 모션을
 * 참고해 다시 만들었고(https://designbookmark.com/motion#db-otp-code), 스프링 값은 원본 그대로다:
 * 글자 놓임 520/16, 글자 페이드 400/28, 활성 칸 300/26, 칸 합치기 260/24, 초록 전환 220/28.
 * 비밀번호 값은 여기에 없다. 서버(middleware.ts)가 환경 변수 SITE_PASSWORD와 비교한다.
 */
export const loginPage = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow, noai, noimageai">
<title>UI/UX 보물창고</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<style>
:root{--bg:#f5f3ee;--surface:#fffdf9;--ink:#1b1a17;--muted:#7a766d;--line:#e3dfd5;--line-2:#d3cec1;--accent:#d9480f;--chip:#ece8de;--green:#2f9e57;--on-green:#fff;--danger:#c92a2a}
@media (prefers-color-scheme:dark){:root{--bg:#121211;--surface:#1b1a18;--ink:#f3f0e8;--muted:#928e84;--line:#2b2926;--line-2:#3a3733;--accent:#ff8a4c;--chip:#252320;--green:#3cb371;--on-green:#08140c;--danger:#ff7b72}}
*{box-sizing:border-box;margin:0}
html,body{height:100%}
body{background:var(--bg);color:var(--ink);font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
main{min-height:100%;display:grid;place-items:center;padding:24px 20px}
.card{width:min(320px,100%);text-align:center}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--accent)}
.eyebrow:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent)}
h1{margin:14px 0 8px;font-size:32px;font-weight:800;letter-spacing:-.04em;line-height:1.1}
.label{margin-top:28px;font-size:12px;font-weight:700;letter-spacing:.14em;color:var(--muted)}
.hint{margin:6px 0 16px;font-size:14px;color:var(--muted);min-height:21px;transition:color .15s}
.hint.err{color:var(--danger)}
.boxes{position:relative;height:56px;margin:0 auto}
.bx{position:absolute;top:0;height:56px;border-radius:14px;background:var(--surface);border:1px solid var(--line);display:grid;place-items:center;font-size:24px;font-weight:700;color:var(--ink);will-change:transform,width,left}
.bx i{font-style:normal;display:block;will-change:transform,opacity;line-height:1}
.bx .car{position:absolute;width:2px;height:24px;border-radius:1px;background:var(--ink);left:50%;top:15px;margin-left:-1px}
.ok{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:700;color:var(--on-green);opacity:0;pointer-events:none}
.ok svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
#inp{position:absolute;inset:0;width:100%;height:100%;opacity:0;border:0;font-size:16px;z-index:2;cursor:text;caret-color:transparent}
.note{margin-top:22px;font-size:12px;color:var(--muted)}
</style>
</head>
<body>
<main>
  <div class="card">
    <span class="eyebrow">프로덕트 디자이너를 위한 레퍼런스 사이트 모음</span>
    <h1>UI/UX<br>보물창고</h1>
    <p class="label">PASSWORD</p>
    <p class="hint" id="hint" role="status" aria-live="polite">비밀번호 6자리를 입력하세요</p>
    <div class="boxes" id="boxes"><input id="inp" type="password" inputmode="numeric" autocomplete="current-password" maxlength="6" aria-label="비밀번호 6자리" autofocus></div>
    <p class="note">개인용 사이트입니다</p>
  </div>
</main>
<script>
(function(){
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var S = function(x,k,c){ return {x:x,v:0,t:x,k:k,c:reduce ? 2*Math.sqrt(k) : c}; };
  var step = function(s,dt){ var a = -s.k*(s.x-s.t) - s.c*s.v; s.v += a*dt; s.x += s.v*dt; };
  var clamp = function(v,a,b){ return Math.max(a, Math.min(b, v)); };
  var timers = [];
  var after = function(sec,fn){ var t = {t:sec,fn:fn}; timers.push(t); return t; };

  var boxes = document.getElementById("boxes"), inp = document.getElementById("inp"), hint = document.getElementById("hint");
  var N = 6, DOT = "\\u2022";
  var bx = [];
  for (var i = 0; i < N; i++) {
    var el = document.createElement("div"); el.className = "bx";
    var d = document.createElement("i"); el.appendChild(d);
    var car = document.createElement("span"); car.className = "car"; el.appendChild(car);
    boxes.insertBefore(el, inp);
    bx.push({el:el, d:d, car:car, y:S(0,520,16), o:S(0,400,28), a:S(0,300,26), filled:false});
  }
  var ok = document.createElement("div"); ok.className = "ok";
  ok.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><span>확인됐어요</span>';
  boxes.appendChild(ok);
  var M = S(0,260,24), G = S(0,220,28), SH = S(0,700,14);
  var val = "", clock = 0, busy = false;

  function say(msg, err){ hint.textContent = msg; hint.className = "hint" + (err ? " err" : ""); }

  function set(v){
    v = v.replace(/\\D/g, "").slice(0, N);
    for (var i = 0; i < N; i++) {
      var c = v[i], b = bx[i];
      if (c && !b.filled) { b.filled = true; b.d.textContent = DOT; b.y.x = -14; b.y.v = 0; b.o.x = 0; b.o.t = 1; }
      if (!c && b.filled) { b.filled = false; b.d.textContent = ""; b.o.t = 0; }
    }
    val = v; inp.value = v;
    if (v.length === N) submit(v);
  }

  function submit(code){
    if (busy) return;
    busy = true; inp.blur();
    say("확인하는 중이에요");
    fetch("/__login", {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({code:code}), credentials:"same-origin"})
      .then(function(r){ return r.ok; }, function(){ return null; })
      .then(function(good){
        if (good) {
          after(.1, function(){ M.t = 1; });
          after(.4, function(){ G.t = 1; say(""); });
          after(1.5, function(){ location.reload(); });
        } else {
          say(good === null ? "연결이 불안정해요. 다시 시도해 주세요" : "비밀번호가 맞지 않아요", true);
          SH.v = 650;
          after(.55, function(){ busy = false; set(""); inp.focus(); });
        }
      });
  }

  inp.addEventListener("input", function(){
    if (busy) { inp.value = val; return; }
    if (hint.className.indexOf("err") > -1) say("비밀번호 6자리를 입력하세요");
    set(inp.value);
  });
  boxes.addEventListener("pointerdown", function(){ if (!busy) inp.focus(); });

  var last = performance.now();
  function frame(dt){
    clock += dt;
    for (var i = 0; i < N; i++) {
      var b = bx[i];
      b.a.t = !busy && i === Math.min(val.length, N-1) && document.activeElement === inp ? 1 : 0;
      step(b.y,dt); step(b.o,dt); step(b.a,dt);
    }
    step(M,dt); step(G,dt); step(SH,dt);
  }
  function render(){
    var W = boxes.parentElement.offsetWidth, gap0 = 8, bw = Math.min(48, (W - gap0*(N-1))/N);
    var mc = clamp(M.x, 0, 1), gap = gap0*(1 - mc);
    var total = bw*N + gap*(N-1), left0 = (W - total)/2;
    var g = clamp(G.x, 0, 1);
    for (var i = 0; i < N; i++) {
      var b = bx[i], a = clamp(b.a.x, 0, 1);
      b.el.style.left = (left0 + i*(bw+gap)).toFixed(2) + "px";
      b.el.style.width = (bw + (i < N-1 ? gap0*mc + 1 : 0)).toFixed(2) + "px";
      var r = 14*(1-mc);
      b.el.style.borderRadius = i === 0 ? "14px "+r+"px "+r+"px 14px" : i === N-1 ? r+"px 14px 14px "+r+"px" : r+"px";
      b.el.style.borderColor = g > .01 ? "transparent" : "";
      b.el.style.background = g > .01 ? "color-mix(in srgb, var(--green) "+(g*100).toFixed(1)+"%, var(--surface))" : a > .01 ? "color-mix(in srgb, var(--chip) "+(a*100).toFixed(1)+"%, var(--surface))" : "";
      b.d.style.opacity = (clamp(b.o.x,0,1)*(1-g)).toFixed(3);
      b.d.style.transform = "translateY("+b.y.x.toFixed(2)+"px)";
      b.car.style.opacity = a > .5 && !b.filled && (clock*1.8)%2 < 1.2 ? 1 : 0;
    }
    boxes.style.width = W + "px";
    boxes.style.transform = "translateX("+SH.x.toFixed(2)+"px)";
    ok.style.opacity = clamp(G.x*1.6 - .5, 0, 1).toFixed(3);
    ok.style.transform = "translateY("+((1-clamp(G.x,0,1))*8).toFixed(2)+"px)";
  }
  function loop(now){
    var dt = Math.min((now-last)/1000, 1/30); last = now;
    for (var i = timers.length-1; i >= 0; i--) { if ((timers[i].t -= dt) <= 0) timers.splice(i,1)[0].fn(); }
    for (var k = 0; k < 4; k++) frame(dt/4);
    render();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  setTimeout(function(){ inp.focus(); }, 50);
})();
</script>
</body>
</html>`
