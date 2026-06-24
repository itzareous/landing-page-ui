/* Lythe — landing page redesign ("Signal Lab" direction)
   Self-contained, responsive. Instrument Serif + Space Grotesk + JetBrains Mono.
   Amber brand thread; mint = voice/live signal; sky = chat.
   Motion: CSS-first. Scroll-reveal (IntersectionObserver) + staggered groups,
   characterful hover/press, ambient signal motion, full reduced-motion path. */
import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------- reveal */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll("[data-reveal],[data-stagger]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((e) => io.observe(e));
    // safety net: never leave content hidden if the observer misbehaves
    const t = window.setTimeout(() => els.forEach((e) => e.classList.add("in")), 1700);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);
  return ref;
}

/* ---------------------------------------------------------------- icons */
function IArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
  );
}
function ITerminal() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 4 4-4 4" /><path d="M13 16h6" /></svg>
  );
}
function ICopy() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
  );
}
function ICheck({ c = "currentColor" }: { c?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
  );
}
function IGithub() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
  );
}
function IX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-5.4-7-6.2 7H1.4l8-9.2L1 2h7l4.9 6.5L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z" /></svg>
  );
}
function IDiscord() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4.4A19 19 0 0 0 15.3 3l-.3.6c1.7.5 2.6 1.1 3.5 1.8a16 16 0 0 0-12 0C7.4 4.7 8.3 4.1 10 3.6L9.7 3A19 19 0 0 0 4 4.4C1.6 8 1 11.6 1.2 15.2a19 19 0 0 0 5.8 2.9l.5-.8c-.8-.3-1.5-.7-2.2-1.2l.5-.4a13.6 13.6 0 0 0 11.4 0l.5.4c-.7.5-1.4.9-2.2 1.2l.5.8a19 19 0 0 0 5.8-2.9c.3-4.2-.6-7.8-2.3-10.8zM8.6 13.3c-.9 0-1.6-.9-1.6-1.9s.7-1.9 1.6-1.9 1.7.9 1.6 1.9c0 1-.7 1.9-1.6 1.9zm6.8 0c-.9 0-1.6-.9-1.6-1.9s.7-1.9 1.6-1.9 1.6.9 1.6 1.9-.7 1.9-1.6 1.9z" /></svg>
  );
}

/* ---------------------------------------------------------------- waveform */
function Wave({ count = 46, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={"wave " + className} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const h = 14 + (Math.sin(i * 1.7) * 0.5 + 0.5) * 42 + (Math.sin(i * 0.5) * 0.5 + 0.5) * 8;
        return (
          <span
            key={i}
            className="wb"
            style={{ height: h.toFixed(1) + "px", animationDelay: (i * 0.04).toFixed(2) + "s", animationDuration: (1.1 + (i % 5) * 0.12).toFixed(2) + "s" }}
          />
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- code block */
function CodeWindow({ file, accent = "var(--amber)", children }: { file: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="codewin">
      <div className="codewin-bar">
        <span className="dot d-r" /><span className="dot d-y" /><span className="dot d-g" />
        <span className="codewin-file">{file}</span>
        <span className="codewin-tag" style={{ color: accent, borderColor: accent }}>esm</span>
      </div>
      <pre className="codewin-body"><code>{children}</code></pre>
    </div>
  );
}

/* ---------------------------------------------------------------- styles */
export function LytheStyles() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
      />
      <style>{`
:where(html,body,#root){margin:0;padding:0;background:#07080A;}
.lythe-root{
  --bg:#07080A;--bg-1:#0B0D11;--bg-2:#101418;--bg-3:#171C22;
  --surface:rgba(255,255,255,.035);--surface-2:rgba(255,255,255,.065);
  --line:rgba(255,255,255,.08);--line-2:rgba(255,255,255,.15);
  --text:#F4F2EC;--dim:#C4C6CD;--muted:#7C828D;--faint:#525762;
  --amber:#F5B33C;--amber-2:#FF9B3D;--amber-soft:rgba(245,179,60,.13);
  --mint:#5FE3C0;--mint-soft:rgba(95,227,192,.12);
  --sky:#7CC4FF;--sky-soft:rgba(124,196,255,.12);
  --radius:16px;--shadow:0 40px 90px -28px rgba(0,0,0,.8);
  --ease-out:cubic-bezier(0.23,1,0.32,1);
  --ease-in-out:cubic-bezier(0.77,0,0.175,1);
  --ease-spring:cubic-bezier(0.34,1.4,0.5,1);
  background:var(--bg);color:var(--text);
  font-family:'Space Grotesk',-apple-system,system-ui,sans-serif;font-size:16px;line-height:1.62;
  position:relative;min-height:100vh;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
}
.lythe-root *,.lythe-root *::before,.lythe-root *::after{box-sizing:border-box;}
.lythe-root h1,.lythe-root h2,.lythe-root h3,.lythe-root h4,.lythe-root p{margin:0;}
.lythe-root a{color:inherit;text-decoration:none;}
.lythe-root button{font-family:inherit;}
.lythe-root a:focus-visible,.lythe-root button:focus-visible{outline:2px solid var(--amber);outline-offset:3px;border-radius:8px;}
.lythe-bg{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(58% 38% at 50% -6%, rgba(245,179,60,.18), transparent 72%),
    radial-gradient(40% 26% at 88% 9%, rgba(124,196,255,.07), transparent 70%),
    radial-gradient(46% 30% at 6% 52%, rgba(95,227,192,.06), transparent 70%),
    linear-gradient(180deg,#07080A 0%,#08090C 40%,#070809 100%);}
.lythe-grain{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.045;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.lythe-content{position:relative;z-index:1;}
.lx{width:100%;max-width:1180px;margin:0 auto;padding:0 40px;}
.section{position:relative;padding:118px 0;overflow:hidden;}
.section-sm{padding:72px 0;}

/* type */
.serif{font-family:'Instrument Serif',Georgia,serif;font-weight:400;letter-spacing:-.015em;}
.h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:clamp(2.9rem,6.6vw,5.7rem);line-height:.97;letter-spacing:-.022em;}
.h2{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:clamp(2.15rem,4.7vw,3.7rem);line-height:1.02;letter-spacing:-.018em;}
.it{font-style:italic;}
.amber{color:var(--amber);} .mint{color:var(--mint);} .sky{color:var(--sky);}
.em-amber{font-style:italic;color:var(--amber);} .em-mint{font-style:italic;color:var(--mint);} .em-sky{font-style:italic;color:var(--sky);}
.lede{font-size:clamp(1.05rem,1.35vw,1.27rem);line-height:1.6;color:var(--dim);max-width:60ch;}
.eyebrow{display:inline-flex;align-items:center;gap:11px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--amber);}
.eyebrow::before{content:"";width:22px;height:1px;background:currentColor;opacity:.65;}
.eyebrow.m{color:var(--mint);} .eyebrow.s{color:var(--sky);}
.kicker{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-weight:600;font-size:15px;line-height:1;padding:14px 22px;border-radius:12px;border:1px solid transparent;cursor:pointer;transition:transform .18s var(--ease-out),box-shadow .25s var(--ease-out),background .2s,border-color .2s,color .2s;white-space:nowrap;}
.btn-amber{background:linear-gradient(180deg,#FBC25A,var(--amber-2));color:#241606;box-shadow:0 12px 30px -10px rgba(245,179,60,.55),inset 0 1px 0 rgba(255,255,255,.45);}
.btn-ghost{background:var(--surface);color:var(--text);border-color:var(--line-2);}
.btn svg{transition:transform .2s var(--ease-out);}
.btn:active{transform:scale(.97);transition-duration:.1s;}

/* nav */
.nav{position:sticky;top:0;z-index:60;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background:rgba(8,9,11,.62);border-bottom:1px solid var(--line);}
.nav-in{display:flex;align-items:center;height:70px;gap:30px;}
.brand{display:flex;align-items:center;gap:11px;font-weight:700;font-size:19px;letter-spacing:-.02em;}
.brand .mk{display:flex;align-items:flex-end;gap:2.5px;height:19px;color:var(--amber);}
.brand .mk i{width:3px;border-radius:3px;background:currentColor;display:block;animation:wave 1.5s ease-in-out infinite;transform-origin:bottom;}
.nav-links{display:flex;gap:27px;}
.nav-links a{font-size:14.5px;color:var(--dim);transition:color .18s;position:relative;}
.nav-links a:hover{color:var(--text);}
.nav-links a::after{content:"";position:absolute;left:0;right:100%;bottom:-5px;height:1.5px;background:var(--amber);border-radius:2px;transition:right .3s var(--ease-out);}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:14px;}
.gh-pill{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:12.5px;color:var(--dim);padding:8px 13px;border:1px solid var(--line);border-radius:999px;background:var(--surface);transition:border-color .18s,color .18s,transform .16s var(--ease-out);}
.gh-pill b{color:var(--text);font-weight:600;}
.signin{font-size:14.5px;color:var(--dim);transition:color .15s;}
.signin:hover{color:var(--text);}
.burger{display:none;flex-direction:column;gap:5px;padding:8px;border:1px solid var(--line);border-radius:9px;background:var(--surface);}
.burger i{width:18px;height:1.6px;background:var(--dim);display:block;border-radius:2px;}

/* hero */
.hero{padding-top:74px;padding-bottom:104px;}
.hero-grid{display:grid;grid-template-columns:1.06fr .94fr;gap:58px;align-items:center;}
.hero h1{margin-top:22px;}
.hero .lede{margin-top:24px;}
.hero-cta{display:flex;flex-wrap:wrap;gap:13px;margin-top:34px;}
.install{display:inline-flex;align-items:center;gap:12px;margin-top:24px;font-family:'JetBrains Mono',monospace;font-size:13.5px;color:var(--dim);background:var(--bg-1);border:1px solid var(--line);border-radius:11px;padding:11px 14px;transition:border-color .2s;}
.install:hover{border-color:var(--line-2);}
.install .pr{color:var(--mint);} .install .cp{margin-left:4px;color:var(--faint);display:inline-flex;cursor:pointer;transition:color .15s;} .install .cp:hover{color:var(--dim);}

/* agent console */
.console{position:relative;border-radius:18px;background:linear-gradient(180deg,rgba(20,24,29,.9),rgba(11,13,16,.92));border:1px solid var(--line-2);box-shadow:var(--shadow);overflow:hidden;}
.console::before{content:"";position:absolute;inset:0;border-radius:18px;padding:1px;background:linear-gradient(180deg,rgba(255,255,255,.16),transparent 40%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
.con-bar{display:flex;align-items:center;gap:8px;padding:13px 16px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.02);}
.dot{width:11px;height:11px;border-radius:50%;}
.d-r{background:#ff5f57;opacity:.85;}.d-y{background:#febc2e;opacity:.85;}.d-g{background:#28c840;opacity:.85;}
.con-file{margin-left:8px;font-family:'JetBrains Mono',monospace;font-size:12.5px;color:var(--muted);}
.live{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--mint);letter-spacing:.04em;}
.live .pulse{width:8px;height:8px;border-radius:50%;background:var(--mint);box-shadow:0 0 0 0 rgba(95,227,192,.6);animation:pulse 1.8s infinite;}
.con-body{padding:20px 18px 22px;}
.con-region{color:var(--muted);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.05em;}
.transcript{margin:16px 0 6px;display:flex;flex-direction:column;gap:14px;}
.turn{display:flex;gap:11px;align-items:flex-start;}
.av{width:26px;height:26px;border-radius:8px;flex:none;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;}
.av-u{background:var(--surface-2);color:var(--dim);}
.av-a{background:linear-gradient(180deg,rgba(95,227,192,.25),rgba(95,227,192,.08));color:var(--mint);border:1px solid rgba(95,227,192,.4);}
.turn .msg{font-size:14px;color:var(--dim);padding-top:3px;}
.turn .msg b{color:var(--text);font-weight:500;}
.cursor{display:inline-block;width:7px;height:15px;background:var(--mint);margin-left:2px;vertical-align:-2px;animation:blink 1s steps(1) infinite;border-radius:1px;}
.toolcall{margin:2px 0 0 37px;display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--muted);background:var(--bg-1);border:1px solid var(--line);border-radius:8px;padding:6px 10px;}
.toolcall .ok{color:var(--mint);}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;}
.chip{font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--dim);background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:6px 10px;display:inline-flex;gap:7px;align-items:center;}
.chip b{color:var(--text);font-weight:600;}
.chip .g{color:var(--mint);}

/* logos */
.logos{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:rgba(255,255,255,.012);}
.logos-in{padding:42px 0 38px;}
.logos-label{text-align:center;margin-bottom:26px;}
.logos-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:30px 52px;}
.logo{display:inline-flex;align-items:center;gap:10px;color:var(--faint);font-weight:600;font-size:18px;letter-spacing:-.01em;transition:color .2s,opacity .2s,transform .2s var(--ease-out);opacity:.9;}
.logo svg{opacity:.8;}

/* splits */
.split{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;}
.split-wide{grid-template-columns:1.04fr .96fr;}
.s-head .lede{margin-top:20px;}
.s-head .h2{margin-top:18px;}

/* feature list */
.flist{margin-top:30px;display:flex;flex-direction:column;}
.fitem{display:flex;gap:15px;padding:17px 0;border-top:1px solid var(--line);}
.fitem:last-child{border-bottom:1px solid var(--line);}
.fi-ic{flex:none;width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:var(--mint-soft);border:1px solid rgba(95,227,192,.3);color:var(--mint);}
.fi-ic.s{background:var(--sky-soft);border-color:rgba(124,196,255,.3);color:var(--sky);}
.fi-ic.a{background:var(--amber-soft);border-color:rgba(245,179,60,.3);color:var(--amber);}
.fitem h4{font-size:15.5px;font-weight:600;color:var(--text);}
.fitem p{font-size:14px;color:var(--muted);margin-top:3px;}

/* generic panel / cards */
.panel{position:relative;background:linear-gradient(180deg,rgba(18,22,27,.8),rgba(11,13,16,.85));border:1px solid var(--line-2);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;}
.glow{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;z-index:0;animation:glowpulse 7s ease-in-out infinite alternate;}
.cards{display:grid;gap:14px;}
.card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px;transition:transform .22s var(--ease-out),border-color .22s,background .22s;}
.card .ci{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:13px;}
.card h4{font-size:15.5px;font-weight:600;}
.card p{font-size:13.6px;color:var(--muted);margin-top:6px;}

/* chat mock */
.chatwin{padding:18px;}
.chat-head{display:flex;align-items:center;gap:9px;padding-bottom:14px;border-bottom:1px solid var(--line);margin-bottom:16px;}
.chat-head .av{width:30px;height:30px;border-radius:9px;}
.chan-rail{display:flex;gap:7px;margin-left:auto;}
.chan{width:27px;height:27px;border-radius:8px;background:var(--surface);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--muted);}
.chan.on{border-color:rgba(124,196,255,.5);color:var(--sky);background:var(--sky-soft);}
.bubbles{display:flex;flex-direction:column;gap:11px;}
.bub{max-width:84%;padding:11px 14px;border-radius:14px;font-size:13.6px;line-height:1.45;}
.bub-u{align-self:flex-end;background:var(--surface-2);color:var(--text);border-bottom-right-radius:5px;}
.bub-a{align-self:flex-start;background:linear-gradient(180deg,rgba(124,196,255,.14),rgba(124,196,255,.05));border:1px solid rgba(124,196,255,.22);color:var(--dim);border-bottom-left-radius:5px;}
.bub-a b{color:var(--text);font-weight:500;}
.toolrow{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted);background:var(--bg-1);border:1px solid var(--line);border-radius:8px;padding:6px 10px;}
.toolrow .ok{color:var(--sky);}
.delivered{align-self:flex-end;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--muted);margin-top:-3px;}

/* eval / replay */
.replay{display:grid;grid-template-columns:.92fr 1.08fr;gap:0;}
.replay-runs{border-right:1px solid var(--line);padding:18px;}
.replay-runs .rl-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.run{display:flex;align-items:center;gap:11px;padding:10px 11px;border-radius:10px;font-size:13px;color:var(--dim);transition:background .18s;}
.run .rid{font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--muted);}
.run .delta{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:11.5px;}
.delta.up{color:var(--mint);} .delta.down{color:#ff7a6b;}
.run.active{background:var(--amber-soft);border:1px solid rgba(245,179,60,.25);}
.replay-detail{padding:18px;}
.metrics4{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:2px;}
.metric{background:var(--bg-1);border:1px solid var(--line);border-radius:12px;padding:14px;}
.metric .mv{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:600;color:var(--text);letter-spacing:-.01em;}
.metric .ml{font-size:11.5px;color:var(--muted);margin-top:4px;}
.metric .mv .u{font-size:13px;color:var(--muted);}
.trace{margin-top:14px;background:var(--bg-1);border:1px solid var(--line);border-radius:12px;padding:14px;}
.trace .tl{display:flex;align-items:flex-end;gap:3px;height:46px;margin-top:10px;color:var(--amber);}
.statrow{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:54px;}
.stat .sv{font-family:'Instrument Serif',serif;font-size:clamp(2.4rem,3.4vw,3.3rem);line-height:1;color:var(--text);}
.stat .sl{font-size:13.5px;color:var(--muted);margin-top:8px;max-width:22ch;}
.stat .sv .u{font-family:'Space Grotesk';font-size:1.2rem;color:var(--amber);}

/* integrations */
.stackdiag{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;gap:16px;margin-top:46px;}
.stackcol{display:flex;flex-direction:column;gap:10px;}
.stacktag{text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:4px;}
.snode{background:var(--surface);border:1px solid var(--line);border-radius:11px;padding:12px 14px;font-size:13.5px;color:var(--dim);display:flex;align-items:center;gap:9px;}
.scenter{background:linear-gradient(180deg,rgba(245,179,60,.16),rgba(245,179,60,.05));border:1px solid rgba(245,179,60,.4);border-radius:14px;padding:22px 18px;text-align:center;box-shadow:0 0 50px -12px rgba(245,179,60,.4);}
.scenter .sn-t{font-family:'Instrument Serif',serif;font-size:1.7rem;color:var(--text);}
.scenter .sn-s{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--amber);margin-top:4px;}
.arrow-c{color:var(--faint);display:flex;justify-content:center;}
.intg-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:30px;}
.intg{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:15px 12px;display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center;transition:border-color .2s,background .2s,transform .2s var(--ease-out);}
.intg .ig-m{width:30px;height:30px;border-radius:9px;background:var(--bg-2);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:13px;color:var(--dim);}
.intg .ig-n{font-size:12.5px;color:var(--muted);}

/* open source */
.repos{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:8px;}
.repo{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px;transition:border-color .2s,background .2s,transform .2s var(--ease-out);}
.repo .rn{display:flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--text);font-weight:600;}
.repo .rn .mit{margin-left:auto;font-size:10.5px;color:var(--muted);border:1px solid var(--line);border-radius:6px;padding:2px 7px;letter-spacing:.05em;}
.repo .rd{font-size:13px;color:var(--muted);margin:10px 0 14px;}
.repo .rmeta{display:flex;align-items:center;gap:16px;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--muted);}
.repo .lang{display:inline-flex;align-items:center;gap:6px;}
.repo .lang i{width:9px;height:9px;border-radius:50%;}
.contrib{display:flex;align-items:center;gap:14px;margin-top:26px;}
.avatars{display:flex;}
.avatars .ax{width:34px;height:34px;border-radius:50%;border:2px solid var(--bg);margin-left:-10px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#1a1206;transition:transform .2s var(--ease-out);}
.avatars .ax:first-child{margin-left:0;}
.avatars:hover .ax{margin-left:0;}

/* final cta */
.finalcta{position:relative;text-align:center;padding:128px 0;overflow:hidden;}
.finalcta .lede{margin:22px auto 0;}
.finalcta .hero-cta{justify-content:center;}

/* footer */
.foot{border-top:1px solid var(--line);background:rgba(255,255,255,.012);position:relative;overflow:hidden;}
.foot-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr 1fr;gap:34px;padding:64px 0 40px;}
.foot-brand .brand{margin-bottom:14px;}
.foot-brand p{font-size:13.5px;color:var(--muted);max-width:30ch;}
.foot-status{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--dim);border:1px solid var(--line);border-radius:999px;padding:6px 12px;}
.foot-status .pulse{width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 0 0 rgba(95,227,192,.6);animation:pulse 2.4s infinite;}
.foot-soc{display:flex;gap:10px;margin-top:16px;}
.foot-soc a{width:34px;height:34px;border-radius:9px;background:var(--surface);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--dim);transition:color .18s,border-color .18s,transform .16s var(--ease-out);}
.foot-col h5{font-size:12px;font-family:'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin-bottom:14px;}
.foot-col a{display:block;font-size:13.6px;color:var(--muted);padding:5px 0;transition:color .15s,transform .15s var(--ease-out);}
.foot-word{font-family:'Instrument Serif',serif;font-size:clamp(5rem,17vw,15rem);line-height:.8;color:rgba(255,255,255,.04);text-align:center;padding:8px 0 0;letter-spacing:-.02em;user-select:none;}
.foot-bot{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 0 30px;border-top:1px solid var(--line);font-size:12.5px;color:var(--muted);flex-wrap:wrap;}
.foot-bot .fb-legal{display:flex;gap:20px;flex-wrap:wrap;}

/* shared wave */
.wave{display:flex;align-items:flex-end;gap:3px;height:62px;color:var(--mint);}
.wb{width:3px;border-radius:3px;background:currentColor;transform-origin:bottom;animation:wave 1.3s ease-in-out infinite;}

/* codewin */
.codewin{background:var(--bg-1);border:1px solid var(--line-2);border-radius:14px;overflow:hidden;box-shadow:var(--shadow);}
.codewin-bar{display:flex;align-items:center;gap:8px;padding:11px 14px;border-bottom:1px solid var(--line);background:rgba(255,255,255,.02);}
.codewin-file{margin-left:8px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted);}
.codewin-tag{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:10px;border:1px solid;border-radius:5px;padding:2px 7px;opacity:.8;text-transform:uppercase;letter-spacing:.06em;}
.codewin-body{margin:0;padding:16px 18px;overflow-x:auto;font-family:'JetBrains Mono',monospace;font-size:12.8px;line-height:1.75;color:var(--dim);}
.t-key{color:var(--sky);} .t-str{color:var(--amber);} .t-fn{color:var(--mint);} .t-com{color:var(--faint);font-style:italic;} .t-pn{color:var(--muted);}

/* hero on-load stagger */
.rv{animation:rise .85s var(--ease-out) both;}
.rv-fade{animation:fadein .9s var(--ease-out) both;}
.d1{animation-delay:.05s;}.d2{animation-delay:.14s;}.d3{animation-delay:.23s;}.d4{animation-delay:.32s;}.d5{animation-delay:.42s;}.d6{animation-delay:.54s;}

@keyframes rise{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:none;}}
@keyframes fadein{from{opacity:0;}to{opacity:1;}}
@keyframes wave{0%,100%{transform:scaleY(.34);}50%{transform:scaleY(1);}}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(95,227,192,.55);}70%{box-shadow:0 0 0 9px rgba(95,227,192,0);}100%{box-shadow:0 0 0 0 rgba(95,227,192,0);}}
@keyframes blink{0%,50%{opacity:1;}51%,100%{opacity:0;}}
@keyframes glowpulse{from{opacity:.65;}to{opacity:1;}}
@keyframes drift{from{transform:translate3d(0,0,0) scale(1);}to{transform:translate3d(0,-1.4%,0) scale(1.045);}}

/* ---- scroll reveal (IntersectionObserver toggles .in) ---- */
@media (prefers-reduced-motion: no-preference){
  .lythe-bg{animation:drift 26s ease-in-out infinite alternate;}
  [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .72s var(--ease-out),transform .72s var(--ease-out),filter .72s var(--ease-out);}
  [data-reveal="blur"]{filter:blur(7px);}
  [data-reveal].in{opacity:1;transform:none;filter:none;}
  [data-stagger]>*{opacity:0;transform:translateY(16px);transition:opacity .6s var(--ease-out),transform .6s var(--ease-out);}
  [data-stagger].in>*{opacity:1;transform:none;}
  [data-stagger].in>*:nth-child(1){transition-delay:.03s;}
  [data-stagger].in>*:nth-child(2){transition-delay:.09s;}
  [data-stagger].in>*:nth-child(3){transition-delay:.15s;}
  [data-stagger].in>*:nth-child(4){transition-delay:.21s;}
  [data-stagger].in>*:nth-child(5){transition-delay:.27s;}
  [data-stagger].in>*:nth-child(6){transition-delay:.33s;}
  [data-stagger].in>*:nth-child(7){transition-delay:.39s;}
  [data-stagger].in>*:nth-child(8){transition-delay:.45s;}
  [data-stagger].in>*:nth-child(n+9){transition-delay:.5s;}
}

/* ---- press + hover (hover gated to fine pointers) ---- */
.btn:active{transform:scale(.97);}
@media (hover:hover) and (pointer:fine){
  .btn-amber:hover{transform:translateY(-2px);box-shadow:0 18px 44px -10px rgba(245,179,60,.7),inset 0 1px 0 rgba(255,255,255,.5);}
  .btn-amber:hover svg{transform:translateX(3px);}
  .btn-ghost:hover{background:var(--surface-2);border-color:rgba(255,255,255,.3);transform:translateY(-2px);}
  .gh-pill:hover{border-color:var(--line-2);color:var(--text);transform:translateY(-1px);}
  .nav-links a:hover::after{right:0;}
  .logo:hover{color:var(--dim);opacity:1;transform:translateY(-2px);}
  .card:hover{transform:translateY(-3px);border-color:var(--line-2);background:var(--surface-2);}
  .intg:hover{border-color:var(--line-2);background:var(--surface-2);transform:translateY(-2px);}
  .repo:hover{border-color:var(--line-2);background:var(--surface-2);transform:translateY(-2px);}
  .run:hover{background:var(--surface);}
  .foot-soc a:hover{color:var(--text);border-color:var(--line-2);transform:translateY(-2px);}
  .foot-col a:hover{color:var(--text);transform:translateX(3px);}
}

/* ---- responsive ---- */
@media (max-width:980px){
  .nav-links,.signin,.gh-pill{display:none;}
  .burger{display:flex;}
  .hero-grid{grid-template-columns:1fr;gap:44px;}
  .split{grid-template-columns:1fr;gap:38px;}
  .s-text{order:1;} .s-visual{order:2;}
  .replay{grid-template-columns:1fr;}
  .replay-runs{border-right:none;border-bottom:1px solid var(--line);}
  .statrow{grid-template-columns:repeat(2,1fr);gap:30px 22px;}
  .stackdiag{grid-template-columns:1fr;gap:12px;}
  .stackdiag .arrow-c{transform:rotate(90deg);}
  .intg-grid{grid-template-columns:repeat(4,1fr);}
  .repos{grid-template-columns:1fr;}
  .foot-top{grid-template-columns:1fr 1fr;gap:28px;}
  .foot-brand{grid-column:1 / -1;}
  .section{padding:88px 0;}
}
@media (max-width:560px){
  .lx{padding:0 20px;}
  .section{padding:64px 0;}
  .hero{padding-top:48px;padding-bottom:72px;}
  .hero-cta .btn{flex:1 1 auto;}
  .metrics4{grid-template-columns:1fr 1fr;}
  .statrow{grid-template-columns:1fr 1fr;}
  .intg-grid{grid-template-columns:repeat(3,1fr);}
  .foot-top{grid-template-columns:1fr 1fr;}
  .logos-row{gap:22px 30px;}
  .logo{font-size:15px;}
  .con-body{padding:16px 14px 18px;}
}

/* ---- reduced motion: keep it calm, keep it visible ---- */
@media (prefers-reduced-motion: reduce){
  .rv,.rv-fade,.wb,.brand .mk i,.pulse,.cursor,.lythe-bg,.glow{animation:none !important;}
  [data-reveal],[data-stagger]>*{opacity:1 !important;transform:none !important;filter:none !important;transition:none !important;}
  .lythe-root *{scroll-behavior:auto !important;}
}
`}</style>
    </>
  );
}

/* ---------------------------------------------------------------- nav */
function Brand() {
  return (
    <a className="brand" href="#">
      <span className="mk">
        <i style={{ height: "8px", animationDelay: "0s" }} />
        <i style={{ height: "15px", animationDelay: ".2s" }} />
        <i style={{ height: "11px", animationDelay: ".4s" }} />
        <i style={{ height: "18px", animationDelay: ".1s" }} />
      </span>
      lythe
    </a>
  );
}
function Nav() {
  return (
    <nav className="nav rv-fade">
      <div className="lx nav-in">
        <Brand />
        <div className="nav-links">
          <a href="#voice">Voice</a>
          <a href="#chat">Chat</a>
          <a href="#eval">Eval</a>
          <a href="#integrations">Integrations</a>
          <a href="#oss">Open source</a>
          <a href="#">Docs</a>
        </div>
        <div className="nav-right">
          <a className="gh-pill" href="#"><IGithub /> <b>12.4k</b></a>
          <a className="signin" href="#">Sign in</a>
          <a className="btn btn-amber" href="#">Start building <IArrow /></a>
          <button className="burger" aria-label="Menu"><i /><i /><i /></button>
        </div>
      </div>
    </nav>
  );
}

/* ---------------------------------------------------------------- hero */
function AgentConsole() {
  return (
    <div className="console rv d3">
      <div className="con-bar">
        <span className="dot d-r" /><span className="dot d-y" /><span className="dot d-g" />
        <span className="con-file">agent.session — voice</span>
        <span className="live"><span className="pulse" /> LIVE</span>
      </div>
      <div className="con-body">
        <div className="con-region">sess_8fa2 · us-east-1 · turn 04</div>
        <Wave count={42} />
        <div className="transcript">
          <div className="turn">
            <span className="av av-u">U</span>
            <span className="msg">Where's my last order, and can you refund it?</span>
          </div>
          <div className="turn">
            <span className="av av-a">L</span>
            <span className="msg"><b>Order #4021</b> shipped Tuesday. I can refund $48.00 now<span className="cursor" /></span>
          </div>
          <div className="toolcall"><span className="ok">↳</span> called <span style={{ color: "var(--sky)" }}>lookup_order</span>(4021) · 38ms <span className="ok">✓</span></div>
        </div>
        <div className="chips">
          <span className="chip">turn p95 <b>310ms</b></span>
          <span className="chip"><span className="g">●</span> barge-in</span>
          <span className="chip">stt <b>deepgram</b></span>
          <span className="chip">tts <b>cartesia</b></span>
        </div>
      </div>
    </div>
  );
}
function HeroSection() {
  return (
    <section className="section hero" id="top">
      <div className="lx">
        <div className="hero-grid">
          <div>
            <span className="eyebrow rv d1">// infrastructure for production agents</span>
            <h1 className="h1 rv d2">
              Voice &amp; chat agents,<br />
              <span className="em-amber">engineered for production.</span>
            </h1>
            <p className="lede rv d3">
              Lythe is the developer platform for real-time AI agents — a sub-300ms voice
              pipeline, a durable chat runtime, and the evaluation tooling to know exactly
              how they behave before you ship.
            </p>
            <div className="hero-cta rv d4">
              <a className="btn btn-amber" href="#">Start building <IArrow /></a>
              <a className="btn btn-ghost" href="#"><ITerminal /> Read the docs</a>
            </div>
            <div className="install rv d5">
              <span className="pr">$</span> npm i @lythe/agent
              <span className="cp"><ICopy /></span>
            </div>
          </div>
          <AgentConsole />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- logos */
function LogoMark({ shape, c }: { shape: string; c: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 16 16" } as const;
  if (shape === "tri") return (<svg {...common} fill={c}><path d="M8 1l7 13H1z" /></svg>);
  if (shape === "ring") return (<svg {...common} fill="none" stroke={c} strokeWidth="2"><circle cx="8" cy="8" r="6" /></svg>);
  if (shape === "sq") return (<svg {...common} fill={c}><rect x="2" y="2" width="12" height="12" rx="3" /></svg>);
  if (shape === "dia") return (<svg {...common} fill={c}><path d="M8 1l7 7-7 7-7-7z" /></svg>);
  if (shape === "hex") return (<svg {...common} fill={c}><path d="M8 1l6 3.5v7L8 15l-6-3.5v-7z" /></svg>);
  if (shape === "dot") return (<svg {...common} fill={c}><circle cx="8" cy="8" r="5" /><circle cx="8" cy="8" r="2" fill="#07080A" /></svg>);
  return (<svg {...common} fill="none" stroke={c} strokeWidth="2"><path d="M2 8h12M8 2v12" /></svg>);
}
function LogoStrip() {
  const logos = [
    { n: "Northwind", s: "hex" }, { n: "Helix", s: "ring" }, { n: "Cadence", s: "tri" },
    { n: "Orbital", s: "dot" }, { n: "Mercato", s: "sq" }, { n: "Pulsar", s: "dia" }, { n: "Relay", s: "plus" },
  ];
  return (
    <section className="logos">
      <div className="lx logos-in">
        <div className="logos-label kicker" data-reveal>Powering agents in production at</div>
        <div className="logos-row" data-stagger>
          {logos.map((l) => (
            <span className="logo" key={l.n}><LogoMark shape={l.s} c="currentColor" /> {l.n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- voice */
function VoiceSection() {
  return (
    <section className="section" id="voice">
      <div className="lx split split-wide">
        <div className="s-text s-head" data-stagger>
          <span className="eyebrow m">Voice Agent SDK</span>
          <h2 className="h2">Conversations that <span className="em-mint">feel</span> real-time.</h2>
          <p className="lede">
            Bidirectional audio with sub-300ms turn-taking. Native barge-in, endpointing,
            and STT/TTS you can swap per call — without re-architecting your stack.
          </p>
          <div className="flist" data-stagger>
            <div className="fitem"><span className="fi-ic"><ICheck /></span><div><h4>Streaming pipeline</h4><p>Frame-level audio in and out over WebRTC or WebSocket — no batching, no buffering tax.</p></div></div>
            <div className="fitem"><span className="fi-ic"><ICheck /></span><div><h4>Turn-taking &amp; barge-in</h4><p>Interrupt-aware VAD stops the agent the instant the user speaks back.</p></div></div>
            <div className="fitem"><span className="fi-ic"><ICheck /></span><div><h4>Pluggable STT / TTS</h4><p>Deepgram, ElevenLabs, Cartesia, or bring your own — swap providers per session.</p></div></div>
          </div>
        </div>
        <div className="s-visual" data-reveal="blur">
          <div className="panel" style={{ padding: "22px" }}>
            <div className="glow" style={{ width: "220px", height: "220px", background: "rgba(95,227,192,.18)", top: "-40px", right: "-30px" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span className="live"><span className="pulse" /> listening</span>
                <span className="kicker">p50 210ms · p95 310ms</span>
              </div>
              <Wave count={52} className="" />
              <div style={{ height: "14px" }} />
              <CodeWindow file="voice.ts" accent="var(--mint)">
{`const call = await `}<span className="t-fn">lythe.voice</span>{`.`}<span className="t-fn">connect</span>{`({\n  stt: `}<span className="t-str">"deepgram"</span>{`,\n  tts: `}<span className="t-str">"cartesia"</span>{`,\n  `}<span className="t-key">onTurn</span>{`: (t) => t.`}<span className="t-fn">reply</span>{`(agent.`}<span className="t-fn">run</span>{`(t.text)),\n});`}
              </CodeWindow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- chat */
function ChatSection() {
  return (
    <section className="section" id="chat">
      <div className="lx split split-wide">
        <div className="s-visual" data-reveal="blur">
          <div className="panel chatwin">
            <div className="glow" style={{ width: "220px", height: "220px", background: "rgba(124,196,255,.16)", bottom: "-50px", left: "-30px" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="chat-head">
                <span className="av av-a" style={{ color: "var(--sky)", background: "var(--sky-soft)", borderColor: "rgba(124,196,255,.4)" }}>L</span>
                <div><div style={{ fontSize: "13.5px", fontWeight: 600 }}>support-agent</div><div className="kicker" style={{ fontSize: "10.5px" }}>thread_1f29</div></div>
                <div className="chan-rail">
                  <span className="chan on">Sl</span><span className="chan">Web</span><span className="chan">Wa</span><span className="chan">SMS</span>
                </div>
              </div>
              <div className="bubbles">
                <div className="bub bub-u">Can you reschedule my delivery to Friday?</div>
                <div className="bub bub-a">Done — moved <b>#4021</b> to Fri, Jun 26. Want a text reminder?</div>
                <div className="toolrow"><span className="ok">↳</span> reschedule_delivery(4021, "2026-06-26") <span className="ok">✓</span></div>
                <div className="bub bub-u">Yes please 🙏</div>
                <div className="delivered">delivered · at-least-once ✓</div>
              </div>
            </div>
          </div>
        </div>
        <div className="s-text s-head" data-stagger>
          <span className="eyebrow s">Chat Agent SDK</span>
          <h2 className="h2">One runtime. <span className="em-sky">Every</span> channel.</h2>
          <p className="lede">
            Reliable conversations across Slack, web, WhatsApp, and SMS. Durable delivery,
            idempotent tool calls, and conversation-level observability — out of the box.
          </p>
          <div className="cards" data-stagger style={{ gridTemplateColumns: "1fr 1fr", marginTop: "30px" }}>
            <div className="card"><div className="ci" style={{ background: "var(--sky-soft)", color: "var(--sky)" }}><ITerminal /></div><h4>Channel adapters</h4><p>Slack, web, WhatsApp, SMS &amp; Discord behind one API.</p></div>
            <div className="card"><div className="ci" style={{ background: "var(--sky-soft)", color: "var(--sky)" }}><ICheck c="var(--sky)" /></div><h4>Reliable delivery</h4><p>At-least-once with retries, ordering &amp; dedupe.</p></div>
            <div className="card"><div className="ci" style={{ background: "var(--sky-soft)", color: "var(--sky)" }}><ITerminal /></div><h4>Tool-call reliability</h4><p>Typed tools, automatic retries, guardrails.</p></div>
            <div className="card"><div className="ci" style={{ background: "var(--sky-soft)", color: "var(--sky)" }}><ICheck c="var(--sky)" /></div><h4>Observability</h4><p>Every turn &amp; tool traced end to end.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- eval */
function EvalSection() {
  const traceBars = Array.from({ length: 40 });
  return (
    <section className="section" id="eval">
      <div className="lx" style={{ textAlign: "center", marginBottom: "44px" }} data-stagger>
        <span className="eyebrow" style={{ justifyContent: "center" }}>Evaluation &amp; Observability</span>
        <h2 className="h2" style={{ marginTop: "18px" }}>Replay production. <span className="em-amber">Before</span> you ship.</h2>
        <p className="lede" style={{ margin: "20px auto 0" }}>
          Capture every run, replay it against a new prompt or model, and measure regressions
          in latency, cost, and task success — in CI or in the dashboard.
        </p>
      </div>
      <div className="lx">
        <div className="panel replay" data-reveal="blur">
          <div className="replay-runs">
            <div className="rl-h"><span className="kicker">Production runs</span><span className="kicker">replay ▸</span></div>
            <div className="run active"><span className="rid">run_9c1</span> checkout flow <span className="delta up">+4.1%</span></div>
            <div className="run"><span className="rid">run_9c0</span> refund intent <span className="delta up">+1.2%</span></div>
            <div className="run"><span className="rid">run_9bf</span> reschedule <span className="delta down">−2.8%</span></div>
            <div className="run"><span className="rid">run_9be</span> escalation <span className="delta up">+0.6%</span></div>
            <div className="run"><span className="rid">run_9bd</span> address change <span className="delta up">+3.4%</span></div>
          </div>
          <div className="replay-detail">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, fontSize: "14.5px" }}>run_9c1 · gpt vs. candidate</span>
              <span className="kicker">12,418 turns</span>
            </div>
            <div className="metrics4">
              <div className="metric"><div className="mv">94.2<span className="u">%</span></div><div className="ml">task success</div></div>
              <div className="metric"><div className="mv">310<span className="u">ms</span></div><div className="ml">p95 latency</div></div>
              <div className="metric"><div className="mv">$0.011</div><div className="ml">cost / run</div></div>
              <div className="metric"><div className="mv">0.4<span className="u">%</span></div><div className="ml">hallucination rate</div></div>
            </div>
            <div className="trace">
              <div className="kicker">trace · turn latency</div>
              <div className="tl">
                {traceBars.map((_, i) => {
                  const h = 18 + (Math.sin(i * 0.9) * 0.5 + 0.5) * 70;
                  return <span key={i} style={{ width: "100%", height: h.toFixed(0) + "%", background: "currentColor", opacity: 0.25 + (i % 7) * 0.1, borderRadius: "2px" }} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="statrow" data-stagger>
          <div className="stat"><div className="sv">94.2<span className="u">%</span></div><div className="sl">avg. task success across replayed suites</div></div>
          <div className="stat"><div className="sv">12.4<span className="u">M</span></div><div className="sl">production runs replayed to date</div></div>
          <div className="stat"><div className="sv">−38<span className="u">%</span></div><div className="sl">latency regressions caught pre-ship</div></div>
          <div className="stat"><div className="sv">5<span className="u">min</span></div><div className="sl">median time to a full eval in CI</div></div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- integrations */
function IntegrationsSection() {
  const tiles = [
    { m: "AI", n: "OpenAI" }, { m: "An", n: "Anthropic" }, { m: "Dg", n: "Deepgram" },
    { m: "11", n: "ElevenLabs" }, { m: "Ca", n: "Cartesia" }, { m: "Tw", n: "Twilio" },
    { m: "Pc", n: "Pinecone" }, { m: "Pg", n: "Postgres" }, { m: "Rd", n: "Redis" },
    { m: "Dd", n: "Datadog" }, { m: "Tm", n: "Temporal" }, { m: "▲", n: "Vercel" },
  ];
  return (
    <section className="section" id="integrations">
      <div className="lx">
        <div style={{ maxWidth: "640px" }} data-stagger>
          <span className="eyebrow">Integrations</span>
          <h2 className="h2" style={{ marginTop: "18px" }}>Drops into the stack you <span className="em-amber">already</span> run.</h2>
          <p className="lede" style={{ marginTop: "20px" }}>
            Lythe speaks your tools — model providers, voice vendors, vector stores, queues,
            and telemetry. No rip-and-replace, no lock-in.
          </p>
        </div>
        <div className="stackdiag" data-reveal>
          <div className="stackcol">
            <div className="stacktag">channels</div>
            <div className="snode">Slack</div><div className="snode">Web &amp; mobile</div><div className="snode">Phone &amp; SMS</div>
          </div>
          <div className="arrow-c"><IArrow /></div>
          <div className="scenter">
            <div className="sn-t">Lythe runtime</div>
            <div className="sn-s">voice · chat · eval</div>
          </div>
          <div className="arrow-c"><IArrow /></div>
          <div className="stackcol">
            <div className="stacktag">your stack</div>
            <div className="snode">Models &amp; LLMs</div><div className="snode">Vector &amp; data</div><div className="snode">Telemetry</div>
          </div>
        </div>
        <div className="intg-grid" data-stagger>
          {tiles.map((t) => (
            <div className="intg" key={t.n}><span className="ig-m">{t.m}</span><span className="ig-n">{t.n}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- open source */
function OpenSourceSection() {
  return (
    <section className="section" id="oss">
      <div className="lx split">
        <div className="s-text s-head" data-stagger>
          <span className="eyebrow">Open source</span>
          <h2 className="h2">Built in the <span className="em-amber">open.</span></h2>
          <p className="lede">
            Our SDKs and the durable agent runtime are MIT-licensed. Run Lythe locally,
            self-host, or contribute — the patterns for long-running agents shouldn't be a
            black box.
          </p>
          <div className="contrib">
            <div className="avatars">
              {[["A", "var(--amber)"], ["K", "var(--mint)"], ["M", "var(--sky)"], ["R", "#FBC25A"], ["J", "#9ad8c4"]].map((a, i) => (
                <span className="ax" key={i} style={{ background: a[1] }}>{a[0]}</span>
              ))}
            </div>
            <div style={{ fontSize: "13.5px", color: "var(--muted)" }}><b style={{ color: "var(--text)" }}>240+</b> contributors · <b style={{ color: "var(--text)" }}>12.4k</b> stars</div>
          </div>
          <div className="hero-cta" style={{ marginTop: "26px" }}>
            <a className="btn btn-amber" href="#"><IGithub /> Star on GitHub</a>
            <a className="btn btn-ghost" href="#">Read the RFCs <IArrow /></a>
          </div>
        </div>
        <div className="s-visual">
          <div className="repos" data-stagger>
            <div className="repo"><div className="rn">@lythe/voice <span className="mit">MIT</span></div><div className="rd">Real-time voice pipeline &amp; turn-taking.</div><div className="rmeta"><span className="lang"><i style={{ background: "var(--mint)" }} /> TypeScript</span><span>★ 4.1k</span><span>⑂ 312</span></div></div>
            <div className="repo"><div className="rn">@lythe/chat <span className="mit">MIT</span></div><div className="rd">Multi-channel chat runtime &amp; adapters.</div><div className="rmeta"><span className="lang"><i style={{ background: "var(--sky)" }} /> TypeScript</span><span>★ 3.8k</span><span>⑂ 240</span></div></div>
            <div className="repo"><div className="rn">@lythe/eval <span className="mit">MIT</span></div><div className="rd">Replay &amp; evaluation harness for CI.</div><div className="rmeta"><span className="lang"><i style={{ background: "var(--amber)" }} /> Python</span><span>★ 2.6k</span><span>⑂ 188</span></div></div>
            <div className="repo"><div className="rn">@lythe/runtime <span className="mit">MIT</span></div><div className="rd">Durable, long-running agent execution.</div><div className="rmeta"><span className="lang"><i style={{ background: "#dd6b5a" }} /> Rust</span><span>★ 1.9k</span><span>⑂ 140</span></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- final cta */
function FinalCTA() {
  return (
    <section className="section finalcta">
      <div className="glow" style={{ width: "560px", height: "320px", background: "rgba(245,179,60,.2)", top: "-60px", left: "50%", transform: "translateX(-50%)" }} />
      <div className="lx" style={{ position: "relative", zIndex: 1 }} data-stagger>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "26px", color: "var(--amber)" }}>
          <Wave count={28} className="" />
        </div>
        <h2 className="h2" style={{ fontSize: "clamp(2.4rem,5.4vw,4.4rem)" }}>
          Put an agent in production <span className="em-amber">this week.</span>
        </h2>
        <p className="lede">Free to start. Scales when you do. No credit card to ship your first agent.</p>
        <div className="hero-cta">
          <a className="btn btn-amber" href="#">Start building <IArrow /></a>
          <a className="btn btn-ghost" href="#">Talk to engineering</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- footer */
function SiteFooter() {
  const cols = [
    { h: "Product", links: ["Voice SDK", "Chat SDK", "Evaluation", "Integrations", "Pricing"] },
    { h: "Developers", links: ["Docs", "API reference", "SDKs", "Status", "Changelog"] },
    { h: "Open source", links: ["GitHub", "RFCs", "Roadmap", "Discord"] },
    { h: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  ];
  return (
    <footer className="foot">
      <div className="lx">
        <div className="foot-top" data-stagger>
          <div className="foot-brand">
            <Brand />
            <p>Developer infrastructure for production AI agents — voice, chat, and the eval to trust them.</p>
            <div className="foot-status"><span className="pulse" /> All systems operational</div>
            <div className="foot-soc">
              <a href="#" aria-label="GitHub"><IGithub /></a>
              <a href="#" aria-label="X"><IX /></a>
              <a href="#" aria-label="Discord"><IDiscord /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div className="foot-col" key={c.h}>
              <h5>{c.h}</h5>
              {c.links.map((l) => <a href="#" key={l}>{l}</a>)}
            </div>
          ))}
        </div>
        <div className="foot-word" data-reveal>lythe</div>
        <div className="foot-bot" data-reveal>
          <span>© 2026 Lythe Labs, Inc.</span>
          <div className="fb-legal">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a><a href="#">SOC 2</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- exports */
export function LandingPage() {
  const ref = useReveal();
  return (
    <div className="lythe-root" ref={ref}>
      <LytheStyles />
      <div className="lythe-bg" />
      <div className="lythe-grain" />
      <div className="lythe-content">
        <Nav />
        <main>
          <HeroSection />
          <LogoStrip />
          <VoiceSection />
          <ChatSection />
          <EvalSection />
          <IntegrationsSection />
          <OpenSourceSection />
          <FinalCTA />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

export function HeroShowcase() {
  const ref = useReveal();
  return (
    <div className="lythe-root" ref={ref}>
      <LytheStyles />
      <div className="lythe-bg" />
      <div className="lythe-grain" />
      <div className="lythe-content">
        <Nav />
        <HeroSection />
      </div>
    </div>
  );
}
