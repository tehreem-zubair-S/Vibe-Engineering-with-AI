import React, { useState, useEffect, useRef } from "react";
import {
  Home as HomeIcon, Search, ChevronLeft, ChevronRight, ChevronDown, Bell, Settings,
  User, History, Globe, Navigation, AlertTriangle, CheckCircle2, Circle, Car,
  Building2, Landmark, RefreshCw, CloudOff, Lock, Eye, EyeOff, Sliders, Languages,
  LifeBuoy, ArrowRight, X, Plus, Minus, Route as RouteIcon, Zap, TrendingUp,
  MapPinned, Footprints, TrainFront, Siren, Star, Check, PlayCircle, Info,
  Volume2, ArrowLeft, Filter, Edit2, Trash2, PhoneCall, HeartPulse, Bus,
  ParkingCircle, Accessibility, ShieldCheck, ShieldAlert, Wifi, WifiOff,
  MapPin, Clock, Wallet, Users, Cross, Repeat, ChevronUp, Building, Map as MapIcon
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

    :root{
      --ink:#141A22;
      --ink-soft:#3A4250;
      --muted:#6C7686;
      --muted-2:#98A1AF;
      --bg:#F3F5F8;
      --surface:#FFFFFF;
      --surface-alt:#EDF0F4;
      --border:#DFE4EA;
      --border-strong:#C7CEDA;
      --navy:#152238;
      --navy-2:#1E3151;
      --amber:#EE9E13;
      --amber-ink:#7A4D00;
      --amber-bg:#FDF0DA;
      --teal:#0C8E82;
      --teal-bg:#E1F4F1;
      --red:#D0453C;
      --red-bg:#FBEAE8;
      --blue:#2D62E0;
      --blue-bg:#E7EDFC;
      --radius-s:8px;
      --radius-m:14px;
      --radius-l:22px;
      --font-d:'Space Grotesk',sans-serif;
      --font-b:'Inter',sans-serif;
      --shadow-1: 0 1px 2px rgba(20,26,34,0.06), 0 1px 1px rgba(20,26,34,0.04);
      --shadow-2: 0 8px 24px rgba(20,26,34,0.14);
    }
    *{box-sizing:border-box;}
    html,body{margin:0;padding:0;}
    body{font-family:var(--font-b);color:var(--ink);}
    button{font-family:inherit;cursor:pointer;}
    input,select,textarea{font-family:inherit;}
    ::-webkit-scrollbar{width:0;height:0;}
    .app-outer{
      min-height:100vh;
      background:
        radial-gradient(1200px 600px at 20% -10%, #eef1f6 0%, var(--bg) 55%);
      display:flex;align-items:flex-start;justify-content:center;
      padding:28px 12px;
      font-family:var(--font-b);
    }
    .device{
      width:100%;max-width:412px;
      background:var(--surface);
      border-radius:34px;
      border:1px solid var(--border-strong);
      box-shadow:var(--shadow-2);
      overflow:hidden;
      position:relative;
      min-height:850px;
      display:flex;flex-direction:column;
    }
    .statusbar{
      display:flex;justify-content:space-between;align-items:center;
      padding:12px 22px 4px;font-size:12px;font-weight:600;color:var(--ink);
      font-family:var(--font-d);letter-spacing:0.2px;
    }
    .screen{
      flex:1;display:flex;flex-direction:column;min-height:0;position:relative;
      animation: screenIn 220ms ease;
    }
    @keyframes screenIn{ from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }
    .screen-header{
      display:flex;align-items:center;gap:10px;
      padding:6px 16px 12px;
    }
    .icon-btn{
      width:38px;height:38px;border-radius:12px;border:1px solid var(--border);
      background:var(--surface);display:flex;align-items:center;justify-content:center;
      color:var(--ink);flex-shrink:0;
    }
    .icon-btn:active{background:var(--surface-alt);}
    .screen-title{
      font-family:var(--font-d);font-weight:600;font-size:19px;color:var(--ink);
      flex:1;min-width:0;
    }
    .screen-sub{font-size:12.5px;color:var(--muted);margin-top:1px;}
    .screen-body{
      flex:1;overflow-y:auto;padding:0 16px 18px;
    }
    .screen-body.no-pad{padding:0;}

    .offline-banner{
      display:flex;align-items:center;gap:8px;
      background:var(--ink);color:#fff;font-size:12.5px;font-weight:600;
      padding:9px 16px;
    }
    .offline-banner svg{flex-shrink:0;}

    /* buttons */
    .btn{
      border-radius:14px;border:none;font-family:var(--font-b);font-weight:700;
      font-size:15px;display:flex;align-items:center;justify-content:center;gap:8px;
      padding:15px 18px;width:100%;transition:transform 80ms ease;
    }
    .btn:active{transform:scale(0.98);}
    .btn-primary{background:var(--ink);color:#fff;}
    .btn-amber{background:var(--amber);color:#3A2400;}
    .btn-secondary{background:var(--surface-alt);color:var(--ink);}
    .btn-outline{background:transparent;color:var(--ink);border:1.5px solid var(--border-strong);}
    .btn-danger{background:var(--red);color:#fff;}
    .btn-teal{background:var(--teal);color:#fff;}
    .btn-sm{padding:9px 14px;font-size:13px;border-radius:11px;width:auto;}
    .btn:disabled{opacity:0.45;}
    .btn-block-row{display:flex;gap:10px;}

    /* bottom nav */
    .bottom-nav{
      display:flex;border-top:1px solid var(--border);background:var(--surface);
      padding:8px 6px calc(10px + env(safe-area-inset-bottom,0px));
    }
    .nav-item{
      flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;
      background:none;border:none;color:var(--muted-2);padding:6px 2px;border-radius:12px;
      font-size:10.5px;font-weight:600;
    }
    .nav-item.active{color:var(--ink);}
    .nav-item .dot{width:4px;height:4px;border-radius:50%;background:var(--amber);margin-top:1px;}

    /* home */
    .hero-search{
      background:var(--navy);
      background-image: linear-gradient(160deg, var(--navy) 0%, var(--navy-2) 100%);
      border-radius:20px;padding:20px 18px 18px;color:#fff;position:relative;overflow:hidden;
    }
    .hero-search::after{
      content:'';position:absolute;right:-40px;top:-40px;width:160px;height:160px;border-radius:50%;
      background:radial-gradient(circle, rgba(238,158,19,0.28) 0%, rgba(238,158,19,0) 70%);
    }
    .hero-greet{font-family:var(--font-d);font-size:20px;font-weight:600;}
    .hero-sub{font-size:12.5px;color:#B7C2D6;margin-top:2px;}
    .search-pill{
      margin-top:14px;background:rgba(255,255,255,0.98);border-radius:14px;
      display:flex;align-items:center;gap:10px;padding:13px 14px;color:var(--muted);
    }
    .search-pill span{font-size:14.5px;font-weight:600;color:var(--ink-soft);}

    .section-label{
      font-family:var(--font-d);font-size:13.5px;font-weight:600;color:var(--ink);
      margin:22px 0 10px;display:flex;align-items:center;justify-content:space-between;
    }
    .section-label .link{font-family:var(--font-b);font-size:12.5px;font-weight:600;color:var(--blue);}

    .quick-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
    .quick-tile{
      display:flex;flex-direction:column;align-items:center;gap:6px;
      background:var(--surface);border:1px solid var(--border);border-radius:14px;
      padding:12px 4px;
    }
    .quick-tile .qi{
      width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;
    }
    .quick-tile span{font-size:10.5px;font-weight:600;color:var(--ink-soft);text-align:center;line-height:1.2;}

    .row{
      display:flex;align-items:center;gap:12px;padding:12px 2px;border-bottom:1px solid var(--border);
    }
    .row:last-child{border-bottom:none;}
    .row-ic{
      width:38px;height:38px;border-radius:11px;background:var(--surface-alt);
      display:flex;align-items:center;justify-content:center;color:var(--ink-soft);flex-shrink:0;
    }
    .row-title{font-size:14.5px;font-weight:600;color:var(--ink);}
    .row-sub{font-size:12px;color:var(--muted);margin-top:1px;}
    .row-right{margin-left:auto;color:var(--muted-2);flex-shrink:0;}

    .alert-card{
      display:flex;gap:10px;padding:12px 14px;border-radius:14px;margin-top:12px;align-items:flex-start;
    }
    .alert-red{background:var(--red-bg);color:#7A241E;}
    .alert-amber{background:var(--amber-bg);color:var(--amber-ink);}
    .alert-teal{background:var(--teal-bg);color:#075A52;}
    .alert-blue{background:var(--blue-bg);color:#1C3E96;}
    .alert-title{font-size:13.5px;font-weight:700;}
    .alert-text{font-size:12.5px;line-height:1.4;margin-top:2px;}

    .status-strip{
      display:flex;gap:8px;overflow-x:auto;padding:2px 0 4px;margin-top:2px;
    }
    .status-chip{
      flex-shrink:0;display:flex;align-items:center;gap:6px;padding:8px 12px;border-radius:12px;
      background:var(--surface);border:1px solid var(--border);font-size:12px;font-weight:600;
    }
    .status-dot{width:7px;height:7px;border-radius:50%;}
    .status-dot.ok{background:var(--teal);}
    .status-dot.warn{background:var(--amber);}
    .status-dot.bad{background:var(--red);}

    /* chips / badges */
    .chip{
      display:inline-flex;align-items:center;gap:5px;padding:4px 9px;border-radius:8px;
      font-size:11px;font-weight:700;
    }
    .chip-neutral{background:var(--surface-alt);color:var(--ink-soft);}
    .chip-teal{background:var(--teal-bg);color:#075A52;}
    .chip-amber{background:var(--amber-bg);color:var(--amber-ink);}
    .chip-red{background:var(--red-bg);color:#7A241E;}
    .chip-blue{background:var(--blue-bg);color:#1C3E96;}

    .persona-pill{
      display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);
      border-radius:30px;padding:6px 12px 6px 6px;
    }
    .persona-av{
      width:26px;height:26px;border-radius:50%;background:var(--amber);color:#3A2400;
      display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;font-family:var(--font-d);
    }
    .persona-pill span{font-size:12px;font-weight:700;color:var(--ink-soft);}

    /* search screen */
    .search-input-wrap{
      display:flex;align-items:center;gap:10px;background:var(--surface-alt);border-radius:14px;
      padding:12px 14px;border:1.5px solid transparent;
    }
    .search-input-wrap:focus-within{border-color:var(--ink);background:var(--surface);}
    .search-input-wrap input{border:none;background:transparent;outline:none;flex:1;font-size:14.5px;color:var(--ink);}
    .tab-strip{display:flex;gap:6px;margin:14px 0 4px;overflow-x:auto;}
    .tab-pill{
      flex-shrink:0;padding:8px 14px;border-radius:20px;font-size:12.5px;font-weight:700;
      background:var(--surface-alt);color:var(--ink-soft);border:1px solid transparent;
    }
    .tab-pill.active{background:var(--ink);color:#fff;}

    /* route options */
    .route-row{
      border:1.5px solid var(--border);border-radius:16px;padding:13px 14px;margin-bottom:10px;
      background:var(--surface);
    }
    .route-row.selected{border-color:var(--ink);box-shadow:var(--shadow-1);}
    .route-row.reco{border-color:var(--amber);background:linear-gradient(180deg,#FFFCF6,#fff);}
    .route-top{display:flex;align-items:center;gap:10px;}
    .route-badge{
      width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    .route-name{font-size:14.5px;font-weight:700;color:var(--ink);}
    .route-eta{font-family:var(--font-d);font-size:15px;font-weight:700;color:var(--ink);margin-left:auto;}
    .route-eta small{font-family:var(--font-b);font-size:11px;color:var(--muted);font-weight:600;display:block;text-align:right;}
    .metric-strip{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
    .metric{
      display:flex;align-items:center;gap:4px;font-size:11px;font-weight:700;color:var(--ink-soft);
      background:var(--surface-alt);padding:5px 8px;border-radius:8px;
    }

    /* timeline */
    .timeline{margin-top:6px;}
    .tl-item{display:flex;gap:12px;position:relative;padding-bottom:20px;}
    .tl-item:last-child{padding-bottom:0;}
    .tl-rail{display:flex;flex-direction:column;align-items:center;width:26px;flex-shrink:0;}
    .tl-dot{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1;}
    .tl-line{width:2px;flex:1;background:var(--border-strong);margin-top:2px;}
    .tl-title{font-size:13.5px;font-weight:700;color:var(--ink);}
    .tl-detail{font-size:12px;color:var(--muted);margin-top:2px;line-height:1.4;}
    .tl-dur{font-size:11px;font-weight:700;color:var(--muted-2);margin-top:3px;}

    /* map */
    .map-wrap{
      border-radius:18px;overflow:hidden;position:relative;background:#DCE4EC;border:1px solid var(--border);
    }
    .map-caption{
      position:absolute;left:12px;bottom:12px;background:rgba(20,26,34,0.86);color:#fff;
      padding:8px 11px;border-radius:11px;font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:6px;
      backdrop-filter:blur(2px);
    }
    .map-legend{
      position:absolute;right:10px;top:10px;background:rgba(255,255,255,0.94);border-radius:10px;
      padding:7px 9px;font-size:10px;font-weight:700;color:var(--ink-soft);display:flex;flex-direction:column;gap:5px;
    }
    .legend-row{display:flex;align-items:center;gap:5px;}
    .legend-swatch{width:12px;height:3px;border-radius:2px;}

    /* bottom sheet */
    .sheet-backdrop{
      position:absolute;inset:0;background:rgba(20,26,34,0.42);z-index:20;
      display:flex;align-items:flex-end;
    }
    .sheet{
      width:100%;background:var(--surface);border-radius:22px 22px 0 0;padding:10px 18px 22px;
      max-height:82%;overflow-y:auto;animation:sheetUp 220ms ease;
    }
    @keyframes sheetUp{from{transform:translateY(30px);opacity:0.4;} to{transform:translateY(0);opacity:1;}}
    .sheet-handle{width:36px;height:4px;border-radius:3px;background:var(--border-strong);margin:4px auto 14px;}

    /* toggle */
    .toggle{width:44px;height:26px;border-radius:14px;background:var(--border-strong);position:relative;flex-shrink:0;border:none;transition:background 150ms;}
    .toggle.on{background:var(--ink);}
    .toggle .knob{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform 150ms;box-shadow:0 1px 3px rgba(0,0,0,0.3);}
    .toggle.on .knob{transform:translateX(18px);}

    .pref-row{display:flex;align-items:center;gap:12px;padding:14px 2px;border-bottom:1px solid var(--border);}
    .pref-row:last-child{border-bottom:none;}
    .pref-text{flex:1;}
    .pref-title{font-size:14px;font-weight:700;color:var(--ink);}
    .pref-sub{font-size:11.5px;color:var(--muted);margin-top:2px;line-height:1.4;}

    .card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:14px;}
    .card + .card{margin-top:10px;}

    .empty-note{font-size:12px;color:var(--muted);text-align:center;padding:18px 8px;}

    .big-num{font-family:var(--font-d);font-weight:700;}

    .lang-choice{
      display:flex;align-items:center;gap:12px;border:1.5px solid var(--border);border-radius:14px;padding:14px;margin-bottom:10px;
    }
    .lang-choice.sel{border-color:var(--ink);background:var(--surface-alt);}

    .onb-dots{display:flex;gap:6px;justify-content:center;margin:18px 0;}
    .onb-dot{width:7px;height:7px;border-radius:50%;background:var(--border-strong);}
    .onb-dot.on{background:var(--ink);width:20px;border-radius:4px;}

    .step-num{
      width:30px;height:30px;border-radius:9px;background:var(--navy);color:#fff;font-family:var(--font-d);
      font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    .fab-sos{
      position:fixed;
    }
    .kbd-focus:focus-visible{outline:2.5px solid var(--blue);outline-offset:2px;}

    .toast{
      position:absolute;bottom:96px;left:16px;right:16px;background:var(--ink);color:#fff;padding:12px 15px;
      border-radius:13px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:9px;z-index:40;
      box-shadow:var(--shadow-2); animation: toastIn 200ms ease;
    }
    @keyframes toastIn{from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);}}
  `}</style>
);

/* ============================================================
   MOCK DATA
   ============================================================ */
const PERSONAS = {
  ahmed:  { key:"ahmed",  name:"Ahmed",       role:"Student · Home → University", initial:"A" },
  fatima: { key:"fatima", name:"Mrs. Fatima", role:"Elderly traveller, 68",        initial:"F" },
  sara:   { key:"sara",   name:"Sara",        role:"Wheelchair user",              initial:"S" },
  tourist:{ key:"tourist",name:"Alex",        role:"Visiting Karachi",             initial:"T" },
  driver: { key:"driver", name:"Bilal",       role:"Driving to campus",            initial:"B" },
};

const RECENTS = [
  { name:"University of Karachi — Main Gate", sub:"Frequent · 4 trips this week", icon:Building2 },
  { name:"DHA Phase 5 Office", sub:"Work", icon:Building2 },
  { name:"Aga Khan Hospital", sub:"2 weeks ago", icon:Cross },
];
const NEARBY = {
  stations: [{name:"Millennium Mall Bus Stop", sub:"6 min walk"},{name:"Central Metro Station", sub:"11 min walk"}],
  hospitals: [{name:"Aga Khan University Hospital", sub:"1.8 km"},{name:"Liaquat National Hospital", sub:"3.2 km"}],
  parking: [{name:"University Road Multi‑Storey", sub:"42 spots free"},{name:"DHA Plaza Parking", sub:"Full"}],
  landmarks: [{name:"Karachi Press Club", sub:"Landmark"},{name:"Frere Hall", sub:"Landmark"}],
};

const ROUTES = [
  { id:"reco", label:"Recommended", tag:"Best balance of time & cost", icon:Zap, tone:"amber",
    eta:34, cost:120, walk:8, transfers:1, crowd:"Moderate", crowdLevel:2, reliability:"High" },
  { id:"fastest", label:"Fastest", tag:"Priority: minimum time", icon:TrendingUp, tone:"blue",
    eta:27, cost:180, walk:5, transfers:1, crowd:"High", crowdLevel:3, reliability:"Medium" },
  { id:"cheapest", label:"Cheapest", tag:"Priority: lowest fare", icon:Wallet, tone:"teal",
    eta:42, cost:60, walk:12, transfers:2, crowd:"Low", crowdLevel:1, reliability:"Medium" },
  { id:"leastwalk", label:"Least walking", tag:"Priority: minimum walking", icon:Footprints, tone:"blue",
    eta:36, cost:140, walk:3, transfers:1, crowd:"Moderate", crowdLevel:2, reliability:"High" },
  { id:"fewtransfer", label:"Fewest transfers", tag:"Priority: 1 vehicle only", icon:RouteIcon, tone:"blue",
    eta:38, cost:130, walk:9, transfers:0, crowd:"Moderate", crowdLevel:2, reliability:"High" },
  { id:"reliable", label:"Most reliable", tag:"Priority: on-time history", icon:ShieldCheck, tone:"teal",
    eta:35, cost:120, walk:8, transfers:1, crowd:"Low", crowdLevel:1, reliability:"High" },
  { id:"accessible", label:"Accessible", tag:"Step-free, low-floor vehicles", icon:Accessibility, tone:"teal",
    eta:40, cost:120, walk:6, transfers:1, crowd:"Low", crowdLevel:1, reliability:"High", wheelchair:true },
];

const SEGMENTS = {
  reco: [
    { type:"walk", title:"Walk to Faisal Stop", detail:"450 m via Main Boulevard, flat pavement", dur:8 },
    { type:"bus", title:"Bus R‑12 → Millennium Mall", detail:"6 stops · Board at Faisal Stop · Moderate crowding", dur:16 },
    { type:"wait", title:"Transfer at Millennium Mall", detail:"Cross to Platform B", dur:3 },
    { type:"metro", title:"Green Line → University Rd", detail:"2 stops · Alight at University Rd Station", dur:7 },
  ],
};
const SEGMENTS_NEW = [
  { type:"walk", title:"Walk to Faisal Stop", detail:"450 m via Main Boulevard", dur:8 },
  { type:"metro", title:"Orange Line → Nazimabad Jn", detail:"Avoids construction on Shahrah‑e‑Faisal", dur:12 },
  { type:"wait", title:"Transfer at Nazimabad Jn", detail:"Same platform, 2 min", dur:2 },
  { type:"metro", title:"Green Line → University Rd", detail:"2 stops · Alight at University Rd Station", dur:9 },
];

const TRIP_HISTORY_SEED = [
  { id:1, from:"Home", to:"University of Karachi", when:"Today, 8:02 AM", freq:"Used 4x this week" },
  { id:2, from:"Home", to:"DHA Office", when:"Yesterday, 6:40 PM", freq:"Used 2x this week" },
  { id:3, from:"University of Karachi", to:"Home", when:"Mon, 4:15 PM", freq:"Used 3x this week" },
];

const PARKING = [
  { id:"p1", name:"University Road Multi‑Storey", spots:42, cap:120, rate:"Rs 50/hr", walk:3, recommended:true },
  { id:"p2", name:"DHA Plaza Parking", spots:0, cap:80, rate:"Rs 40/hr", walk:9, recommended:false },
];

/* ============================================================
   SMALL SHARED COMPONENTS
   ============================================================ */
const toneVars = {
  amber:{bg:"var(--amber-bg)",fg:"var(--amber-ink)"},
  teal:{bg:"var(--teal-bg)",fg:"#075A52"},
  blue:{bg:"var(--blue-bg)",fg:"#1C3E96"},
  red:{bg:"var(--red-bg)",fg:"#7A241E"},
  ink:{bg:"var(--surface-alt)",fg:"var(--ink-soft)"},
};

function Chip({tone="ink", icon:Icon, children}) {
  return (
    <span className={`chip chip-${tone}`}>
      {Icon && <Icon size={11} />}
      {children}
    </span>
  );
}

function Metric({icon:Icon, children}) {
  return <span className="metric"><Icon size={12} />{children}</span>;
}

function Toggle({on, onClick, ariaLabel}) {
  return (
    <button className={`toggle ${on?"on":""}`} onClick={onClick} aria-pressed={on} aria-label={ariaLabel}>
      <span className="knob" />
    </button>
  );
}

function Screen({title, sub, onBack, right, children, noPad, headerExtra}) {
  return (
    <div className="screen">
      <div className="screen-header">
        {onBack && (
          <button className="icon-btn kbd-focus" onClick={onBack} aria-label="Go back">
            <ChevronLeft size={19} />
          </button>
        )}
        <div style={{flex:1,minWidth:0}}>
          <div className="screen-title">{title}</div>
          {sub && <div className="screen-sub">{sub}</div>}
        </div>
        {right}
      </div>
      {headerExtra}
      <div className={`screen-body ${noPad?"no-pad":""}`}>{children}</div>
    </div>
  );
}

function Toast({text, icon:Icon=CheckCircle2, onDone}) {
  useEffect(()=>{ const t=setTimeout(onDone, 2200); return ()=>clearTimeout(t); },[]);
  return <div className="toast"><Icon size={16} color="var(--amber)"/>{text}</div>;
}

function CrowdBadge({level, label}) {
  const tones = ["teal","amber","red"];
  const tone = tones[level-1] || "teal";
  return <Chip tone={tone} icon={Users}>{label}</Chip>;
}

/* ============================================================
   SIMULATED MAP (shared SVG across screens)
   ============================================================ */
function SimulatedMap({ height=210, showAlt=false, disruption=false, rerouted=false,
  parking=false, accessibility=false, wheelchair=false, dim=false, caption, legend }) {
  const routeMain = rerouted
    ? "M60,300 L60,210 L150,210 L150,120 L230,120 L230,60"
    : "M60,300 L60,190 L190,190 L190,110 L230,110 L230,60";
  const routeAlt = "M60,300 L100,300 L100,150 L230,150 L230,60";
  return (
    <div className="map-wrap" style={{height, opacity:dim?0.55:1}}>
      <svg viewBox="0 0 300 340" width="100%" height="100%" role="img" aria-label="Simulated city map showing route">
        <rect width="300" height="340" fill="#DCE4EC" />
        {/* streets */}
        {[40,90,140,190,240,290].map((y,i)=>(
          <line key={"h"+i} x1="0" y1={y} x2="300" y2={y} stroke="#C7D0DC" strokeWidth="6" />
        ))}
        {[30,70,120,170,220,270].map((x,i)=>(
          <line key={"v"+i} x1={x} y1="0" x2={x} y2="340" stroke="#C7D0DC" strokeWidth="6" />
        ))}
        <line x1="0" y1="240" x2="300" y2="60" stroke="#CFD7E1" strokeWidth="10" />
        {/* blocks */}
        {[[45,45,28,28],[95,55,26,22],[145,45,30,26],[195,50,26,24],[45,140,26,22],[95,220,28,24],[195,220,26,22]].map((b,i)=>(
          <rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]} fill="#EAEFF4" rx="3" />
        ))}
        {/* landmarks */}
        <circle cx="150" cy="70" r="6" fill="#fff" stroke="#8A93A3" strokeWidth="1.5" />
        <circle cx="90" cy="180" r="6" fill="#fff" stroke="#8A93A3" strokeWidth="1.5" />

        {showAlt && !disruption && (
          <path d={routeAlt} fill="none" stroke="#98A1AF" strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" />
        )}

        {disruption && (
          <g>
            <circle cx="190" cy="150" r="26" fill="rgba(208,69,60,0.16)" />
            <circle cx="190" cy="150" r="10" fill="var(--red)" />
            <foreignObject x="180" y="140" width="20" height="20">
              <div style={{width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <AlertTriangle size={12} color="#fff" />
              </div>
            </foreignObject>
          </g>
        )}

        <path d={routeMain} fill="none" stroke={rerouted ? "#0C8E82" : "#EE9E13"} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />

        {parking && (
          <g>
            <rect x="120" y="250" width="20" height="20" rx="5" fill="#2D62E0" />
            <text x="130" y="264" fontSize="11" fontWeight="800" fill="#fff" textAnchor="middle">P</text>
          </g>
        )}
        {accessibility && (
          <g>
            <circle cx="230" cy="60" r="11" fill={wheelchair? "#0C8E82" : "#fff"} stroke="#0C8E82" strokeWidth="2" />
          </g>
        )}

        {/* destination pin */}
        <g transform="translate(230,60)">
          <path d="M0,-16 C8,-16 13,-9 13,-2 C13,7 0,18 0,18 C0,18 -13,7 -13,-2 C-13,-9 -8,-16 0,-16 Z" fill="var(--ink)" />
          <circle cx="0" cy="-2" r="4.5" fill="#fff" />
        </g>
        {/* current location */}
        <g transform="translate(60,300)">
          <circle r="13" fill="rgba(45,98,224,0.2)" />
          <circle r="6" fill="#2D62E0" stroke="#fff" strokeWidth="2" />
        </g>
      </svg>
      <div className="map-legend">
        <div className="legend-row"><span className="legend-swatch" style={{background:rerouted?"#0C8E82":"#EE9E13"}}/>Route</div>
        {showAlt && !disruption && <div className="legend-row"><span className="legend-swatch" style={{background:"#98A1AF"}}/>Alternative</div>}
        {disruption && <div className="legend-row"><span className="legend-swatch" style={{background:"#D0453C"}}/>Disruption</div>}
      </div>
      {caption && <div className="map-caption">{caption}</div>}
      {legend}
    </div>
  );
}

function SegIcon({type}) {
  const map = { walk:Footprints, bus:Bus, metro:TrainFront, wait:Clock };
  const I = map[type] || Circle;
  const tone = type==="walk"?"ink":type==="bus"?"amber":type==="metro"?"blue":"ink";
  const c = toneVars[tone];
  return <div className="tl-dot" style={{background:c.bg,color:c.fg}}><I size={13} /></div>;
}

function Timeline({segments}) {
  return (
    <div className="timeline">
      {segments.map((s,i)=>(
        <div className="tl-item" key={i}>
          <div className="tl-rail">
            <SegIcon type={s.type} />
            {i<segments.length-1 && <div className="tl-line" />}
          </div>
          <div style={{flex:1,paddingBottom:2}}>
            <div className="tl-title">{s.title}</div>
            <div className="tl-detail">{s.detail}</div>
            <div className="tl-dur">{s.dur} min</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function MobilityApp() {
  const [stack, setStack] = useState(["onboarding"]);
  const screen = stack[stack.length-1];
  const push = (s) => setStack(prev=>[...prev, s]);
  const pop = () => setStack(prev => prev.length>1 ? prev.slice(0,-1) : prev);
  const resetTo = (s) => setStack([s]);

  const [language, setLanguage] = useState("English");
  const [persona, setPersona] = useState("ahmed");
  const [wheelchairMode, setWheelchairMode] = useState(false);
  const [elderlyPrefs, setElderlyPrefs] = useState({minWalk:false, fewTransfers:false, avoidStairs:false, seating:false});
  const [offline, setOffline] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("reco");
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [disruptionActive, setDisruptionActive] = useState(false);
  const [rerouted, setRerouted] = useState(false);
  const [accessFailure, setAccessFailure] = useState(false);
  const [tripHistory, setTripHistory] = useState(TRIP_HISTORY_SEED);
  const [privacy, setPrivacy] = useState({location:true, history:true, accessibility:true});
  const [toast, setToast] = useState(null);
  const [personaSheet, setPersonaSheet] = useState(false);

  const showToast = (text, icon) => setToast({text, icon});

  const applyPersona = (key) => {
    setPersona(key);
    setPersonaSheet(false);
    setJourneyStarted(false); setDisruptionActive(false); setRerouted(false); setAccessFailure(false);
    if (key==="sara") { setWheelchairMode(true); setSelectedRoute("accessible"); resetTo("home"); }
    else if (key==="fatima") { setElderlyPrefs({minWalk:true, fewTransfers:true, avoidStairs:true, seating:true}); setSelectedRoute("leastwalk"); resetTo("home"); }
    else if (key==="tourist") { resetTo("home"); }
    else if (key==="driver") { resetTo("home"); }
    else { setWheelchairMode(false); setSelectedRoute("reco"); resetTo("home"); }
  };

  const activeRoutes = wheelchairMode ? ROUTES.filter(r=>r.wheelchair) : ROUTES;
  const routeObj = ROUTES.find(r=>r.id===selectedRoute) || ROUTES[0];

  return (
    <div className="app-outer">
      <GlobalStyle />
      <div className="device">
        <div className="statusbar">
          <span>9:41</span>
          <span style={{display:"flex",gap:6,alignItems:"center"}}>
            {offline ? <WifiOff size={13}/> : <Wifi size={13}/>}
            <span>{language==="Urdu" ? "اردو" : "EN"}</span>
          </span>
        </div>

        {offline && screen!=="onboarding" && (
          <div className="offline-banner">
            <CloudOff size={14} />
            You're offline — showing saved data. Live info may be out of date.
          </div>
        )}

        {screen==="onboarding" && <OnboardingScreen language={language} setLanguage={setLanguage} onDone={()=>resetTo("home")} />}

        {screen==="home" && (
          <HomeScreen
            persona={persona} personaSheet={personaSheet} setPersonaSheet={setPersonaSheet} applyPersona={applyPersona}
            offline={offline} setOffline={setOffline}
            onSearch={()=>push("search")}
            onGo={(dest)=>{ push("search"); }}
            onQuick={(s)=>push(s)}
            navTo={resetTo}
          />
        )}

        {screen==="search" && (
          <SearchScreen onBack={pop} onPick={()=>push("options")} />
        )}

        {screen==="options" && (
          <RouteOptionsScreen
            routes={activeRoutes} selected={selectedRoute} setSelected={setSelectedRoute}
            wheelchairMode={wheelchairMode}
            onBack={pop} onOpen={()=>push("details")}
          />
        )}

        {screen==="details" && (
          <RouteDetailsScreen
            route={routeObj}
            onBack={pop}
            onStart={()=>{ setJourneyStarted(true); push("liveNav"); }}
            onLiveStatus={()=>push("liveTransport")}
          />
        )}

        {screen==="liveNav" && (
          <LiveNavScreen
            route={routeObj}
            disruptionActive={disruptionActive}
            onBack={()=>{ resetTo("home"); }}
            onSimulateDisruption={()=>{ setDisruptionActive(true); push("disruption"); }}
            onSOS={()=>push("emergency")}
            onEnd={()=>{ setJourneyStarted(false); showToast("Trip completed — added to history", CheckCircle2); resetTo("home"); }}
          />
        )}

        {screen==="liveTransport" && <LiveTransportScreen onBack={pop} offline={offline} />}

        {screen==="disruption" && (
          <DisruptionScreen
            onBack={()=>push("liveNav")}
            onRecalculate={()=>push("reroute")}
          />
        )}

        {screen==="reroute" && (
          <RerouteScreen
            onKeep={()=>{ setRerouted(false); showToast("Keeping current route", Info); push("liveNav"); }}
            onSwitch={()=>{ setRerouted(true); setDisruptionActive(false); showToast("Switched to faster route", CheckCircle2); push("liveNav"); }}
          />
        )}

        {screen==="elderly" && (
          <ElderlyScreen prefs={elderlyPrefs} setPrefs={setElderlyPrefs} onBack={pop}
            onSeeRoute={()=>{ setSelectedRoute("leastwalk"); push("options"); }} />
        )}

        {screen==="wheelchair" && (
          <WheelchairScreen wheelchairMode={wheelchairMode} setWheelchairMode={setWheelchairMode}
            onBack={pop} onSeeRoutes={()=>{ setSelectedRoute("accessible"); push("options"); }}
            onSimulateFailure={()=>{ setAccessFailure(true); push("accessFailure"); }} />
        )}

        {screen==="accessFailure" && (
          <AccessibilityFailureScreen onBack={pop} onAccept={()=>{ showToast("Switched to fully accessible route", ShieldCheck); resetTo("home"); }} />
        )}

        {screen==="tourist" && <TouristScreen language={language} setLanguage={setLanguage} onBack={pop} />}

        {screen==="parking" && <ParkingScreen onBack={pop} onReserve={()=>showToast("Spot reserved at University Road", CheckCircle2)} />}

        {screen==="emergency" && (
          <EmergencyScreen offline={offline} setOffline={setOffline} onBack={pop}
            onSOS={()=>showToast("SOS sent — sharing live location", Siren)} />
        )}

        {screen==="history" && (
          <HistoryScreen trips={tripHistory} setTrips={setTripHistory} onBack={pop}
            onRepeat={()=>{ push("options"); }} />
        )}

        {screen==="profile" && (
          <ProfileScreen persona={persona} language={language} setLanguage={setLanguage}
            wheelchairMode={wheelchairMode} setWheelchairMode={setWheelchairMode}
            elderlyPrefs={elderlyPrefs} setElderlyPrefs={setElderlyPrefs}
            onBack={pop} onPrivacy={()=>push("privacy")} />
        )}

        {screen==="privacy" && (
          <PrivacyScreen privacy={privacy} setPrivacy={setPrivacy} onBack={pop}
            onClearHistory={()=>{ setTripHistory([]); showToast("Trip history cleared", Trash2); }} />
        )}

        {["home","history","profile"].includes(screen) && (
          <BottomNav screen={screen} navTo={resetTo} />
        )}

        {toast && <Toast text={toast.text} icon={toast.icon} onDone={()=>setToast(null)} />}
      </div>
    </div>
  );
}

function BottomNav({screen, navTo}) {
  const items = [
    {key:"home", label:"Home", icon:HomeIcon},
    {key:"search", label:"Search", icon:Search},
    {key:"history", label:"Trips", icon:History},
    {key:"profile", label:"Profile", icon:User},
  ];
  return (
    <div className="bottom-nav">
      {items.map(it=>{
        const active = screen===it.key || (it.key==="search" && screen==="options");
        return (
          <button key={it.key} className={`nav-item ${active?"active":""} kbd-focus`}
            onClick={()=> it.key==="search" ? navTo("home") : navTo(it.key)}
            aria-current={active?"page":undefined}>
            <it.icon size={20} strokeWidth={active?2.4:2} />
            {it.label}
            {active && <span className="dot" />}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   1. ONBOARDING
   ============================================================ */
function OnboardingScreen({language, setLanguage, onDone}) {
  const [step, setStep] = useState(0);
  const steps = ["intro","location","language"];
  const next = () => step<2 ? setStep(step+1) : onDone();
  return (
    <div className="screen">
      <div className="screen-body" style={{paddingTop:26, display:"flex", flexDirection:"column", height:"100%"}}>
        <div style={{flex:1}}>
          {step===0 && (
            <div style={{textAlign:"center", paddingTop:30}}>
              <div style={{width:88,height:88,borderRadius:24,background:"var(--navy)",margin:"0 auto 22px",
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                <RouteIcon size={40} color="var(--amber)" />
              </div>
              <div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:24,lineHeight:1.25}}>
                Smart Urban<br/>Mobility
              </div>
              <p style={{color:"var(--muted)",fontSize:14,marginTop:12,lineHeight:1.5,padding:"0 8px"}}>
                One app for buses, metro, walking, parking and accessible travel across the city — with live conditions built in.
              </p>
            </div>
          )}
          {step===1 && (
            <div style={{paddingTop:18}}>
              <div style={{width:64,height:64,borderRadius:18,background:"var(--blue-bg)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
                <MapPin size={28} color="var(--blue)" />
              </div>
              <div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:20}}>Allow location access</div>
              <p style={{color:"var(--muted)",fontSize:13.5,marginTop:10,lineHeight:1.5}}>
                We use your location to find nearby stops, calculate accurate ETAs, and guide you turn-by-turn. You can turn this off anytime in Privacy Controls.
              </p>
              <div className="card" style={{marginTop:18}}>
                <div className="row"><div className="row-ic"><CheckCircle2 size={17}/></div>
                  <div><div className="row-title" style={{fontSize:13}}>Used for live routing only</div>
                  <div className="row-sub">Never sold to third parties</div></div></div>
                <div className="row"><div className="row-ic"><Lock size={17}/></div>
                  <div><div className="row-title" style={{fontSize:13}}>You control sharing</div>
                  <div className="row-sub">Adjustable in Profile → Privacy</div></div></div>
              </div>
            </div>
          )}
          {step===2 && (
            <div style={{paddingTop:18}}>
              <div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:20}}>Choose your language</div>
              <p style={{color:"var(--muted)",fontSize:13.5,marginTop:6,marginBottom:18}}>You can change this later in Profile.</p>
              {["English","Urdu"].map(l=>(
                <button key={l} className={`lang-choice ${language===l?"sel":""} kbd-focus`} style={{width:"100%",background:"var(--surface)"}}
                  onClick={()=>setLanguage(l)}>
                  <div className="row-ic"><Languages size={17}/></div>
                  <div style={{flex:1,textAlign:"left"}}>
                    <div className="row-title">{l==="Urdu" ? "اردو (Urdu)" : "English"}</div>
                  </div>
                  {language===l && <CheckCircle2 size={18} color="var(--ink)"/>}
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="onb-dots">{steps.map((s,i)=><span key={s} className={`onb-dot ${i===step?"on":""}`} />)}</div>
          <button className="btn btn-primary kbd-focus" onClick={next}>
            {step<2 ? "Continue" : "Get started"} <ArrowRight size={17}/>
          </button>
          {step>0 && <button className="btn btn-secondary kbd-focus" style={{marginTop:8}} onClick={()=>setStep(step-1)}>Back</button>}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   2. HOME
   ============================================================ */
function HomeScreen({persona, personaSheet, setPersonaSheet, applyPersona, offline, setOffline, onSearch, onQuick, navTo}) {
  const p = PERSONAS[persona];
  const quickActions = [
    {key:"elderly", label:"Elderly mode", icon:Accessibility, tone:"teal"},
    {key:"wheelchair", label:"Wheelchair", icon:Accessibility, tone:"blue"},
    {key:"tourist", label:"Tourist mode", icon:Globe, tone:"amber"},
    {key:"parking", label:"Parking", icon:ParkingCircle, tone:"ink"},
    {key:"emergency", label:"Emergency", icon:Siren, tone:"red"},
    {key:"liveTransport", label:"Live status", icon:Bus, tone:"blue"},
    {key:"history", label:"Trip history", icon:History, tone:"ink"},
    {key:"profile", label:"Profile", icon:User, tone:"ink"},
  ];
  return (
    <div className="screen">
      <div className="screen-body" style={{paddingTop:8}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 2px 4px"}}>
          <button className="persona-pill kbd-focus" onClick={()=>setPersonaSheet(true)}>
            <span className="persona-av">{p.initial}</span>
            <span>{p.name} <ChevronDown size={12} style={{verticalAlign:-1}}/></span>
          </button>
          <div style={{display:"flex",gap:8}}>
            <button className="icon-btn kbd-focus" aria-label="Toggle offline demo" onClick={()=>setOffline(!offline)}>
              {offline ? <WifiOff size={17}/> : <Wifi size={17}/>}
            </button>
            <button className="icon-btn kbd-focus" aria-label="Notifications"><Bell size={17}/></button>
          </div>
        </div>

        <div className="hero-search">
          <div className="hero-greet">Where to, {p.name.split(" ")[0]}?</div>
          <div className="hero-sub">{p.role}</div>
          <button className="search-pill kbd-focus" style={{width:"100%",border:"none"}} onClick={onSearch}>
            <Search size={17}/>
            <span>Search destination or place</span>
          </button>
        </div>

        <div className="status-strip">
          <div className="status-chip"><span className="status-dot ok"/>Bus network normal</div>
          <div className="status-chip"><span className="status-dot warn"/>Metro: minor delays</div>
          <div className="status-chip"><span className="status-dot bad"/>1 road closure nearby</div>
        </div>

        <div className="alert-card alert-amber">
          <AlertTriangle size={17} style={{marginTop:1,flexShrink:0}}/>
          <div>
            <div className="alert-title">Construction on Shahrah‑e‑Faisal</div>
            <div className="alert-text">Expect +10–15 min on routes via Millennium Mall until 6:00 PM.</div>
          </div>
        </div>

        <div className="section-label">Recent & frequent<span className="link" onClick={()=>navTo("history")}>See all</span></div>
        <div className="card">
          {RECENTS.map((r,i)=>(
            <div className="row" key={i}>
              <div className="row-ic"><r.icon size={17}/></div>
              <div><div className="row-title">{r.name}</div><div className="row-sub">{r.sub}</div></div>
              <div className="row-right" onClick={onSearch}><ChevronRight size={17}/></div>
            </div>
          ))}
        </div>

        <div className="section-label">For you</div>
        <div className="alert-card alert-blue">
          <Star size={17} style={{marginTop:1,flexShrink:0}}/>
          <div>
            <div className="alert-title">Save Rs 60 today</div>
            <div className="alert-text">The Green Line is running on time — cheaper than your usual bus route to University.</div>
          </div>
        </div>

        <div className="section-label">Quick scenarios</div>
        <div className="quick-grid">
          {quickActions.map(q=>{
            const c = toneVars[q.tone];
            return (
              <button key={q.key} className="quick-tile kbd-focus" onClick={()=>onQuick(q.key)}>
                <div className="qi" style={{background:c.bg,color:c.fg}}><q.icon size={19}/></div>
                <span>{q.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {personaSheet && (
        <div className="sheet-backdrop" onClick={()=>setPersonaSheet(false)}>
          <div className="sheet" onClick={e=>e.stopPropagation()}>
            <div className="sheet-handle"/>
            <div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:16,marginBottom:4}}>Demo as a different traveller</div>
            <div style={{fontSize:12.5,color:"var(--muted)",marginBottom:14}}>Switches preferences and default routing to match this persona's scenario.</div>
            {Object.values(PERSONAS).map(pp=>(
              <button key={pp.key} className="row kbd-focus" style={{width:"100%",background:"none",border:"none",textAlign:"left"}}
                onClick={()=>applyPersona(pp.key)}>
                <span className="persona-av" style={{width:34,height:34}}>{pp.initial}</span>
                <div><div className="row-title">{pp.name}</div><div className="row-sub">{pp.role}</div></div>
                {persona===pp.key && <div className="row-right"><CheckCircle2 size={18} color="var(--ink)"/></div>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   3. DESTINATION SEARCH
   ============================================================ */
function SearchScreen({onBack, onPick}) {
  const [tab, setTab] = useState("recent");
  const [q, setQ] = useState("");
  const tabs = [
    {key:"recent", label:"Recent"},
    {key:"stations", label:"Stations"},
    {key:"hospitals", label:"Hospitals"},
    {key:"parking", label:"Parking"},
    {key:"landmarks", label:"Landmarks"},
  ];
  const list = tab==="recent" ? RECENTS.map(r=>({name:r.name, sub:r.sub})) : NEARBY[tab];
  return (
    <Screen title="Set destination" onBack={onBack}
      headerExtra={
        <div style={{padding:"0 16px 4px"}}>
          <div className="search-input-wrap">
            <Search size={17} color="var(--muted)"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="University of Karachi…" aria-label="Search destination" autoFocus />
            {q && <X size={16} onClick={()=>setQ("")}/>}
          </div>
          <div className="tab-strip">
            {tabs.map(t=>(
              <button key={t.key} className={`tab-pill kbd-focus ${tab===t.key?"active":""}`} onClick={()=>setTab(t.key)}>{t.label}</button>
            ))}
          </div>
        </div>
      }>
      <div className="card" style={{marginTop:6}}>
        <div className="row" onClick={onPick} style={{cursor:"pointer"}}>
          <div className="row-ic"><MapPin size={17}/></div>
          <div><div className="row-title">Use current location</div><div className="row-sub">DHA Phase 6, Karachi</div></div>
        </div>
      </div>
      <div className="section-label">{tab==="recent" ? "Recent & frequent" : tabs.find(t=>t.key===tab).label}</div>
      <div className="card">
        {list.filter(i=>i.name.toLowerCase().includes(q.toLowerCase())).map((r,i)=>(
          <div className="row" key={i} onClick={onPick} style={{cursor:"pointer"}}>
            <div className="row-ic"><MapPinned size={17}/></div>
            <div><div className="row-title">{r.name}</div><div className="row-sub">{r.sub}</div></div>
            <div className="row-right"><ChevronRight size={16}/></div>
          </div>
        ))}
        {list.filter(i=>i.name.toLowerCase().includes(q.toLowerCase())).length===0 && (
          <div className="empty-note">No matches. Try a different spelling or browse categories above.</div>
        )}
      </div>
      <button className="btn btn-primary kbd-focus" style={{marginTop:16}} onClick={onPick}>
        <MapPin size={16}/> Go to University of Karachi
      </button>
    </Screen>
  );
}

/* ============================================================
   4. ROUTE OPTIONS
   ============================================================ */
function RouteOptionsScreen({routes, selected, setSelected, wheelchairMode, onBack, onOpen}) {
  return (
    <Screen title="Home → University" sub={`${routes.length} route option${routes.length>1?"s":""} · updated just now`} onBack={onBack}>
      {wheelchairMode && (
        <div className="alert-card alert-teal">
          <Accessibility size={16} style={{marginTop:1}}/>
          <div><div className="alert-title">Wheelchair mode is on</div>
          <div className="alert-text">Only step-free routes with accessible vehicles are shown.</div></div>
        </div>
      )}
      <div style={{marginTop:12}}>
        {routes.map(r=>{
          const c = toneVars[r.tone];
          const isSel = selected===r.id;
          return (
            <button key={r.id} onClick={()=>setSelected(r.id)}
              className={`route-row kbd-focus ${isSel?"selected":""} ${r.id==="reco"?"reco":""}`}
              style={{width:"100%",textAlign:"left",display:"block"}}>
              <div className="route-top">
                <div className="route-badge" style={{background:c.bg,color:c.fg}}><r.icon size={17}/></div>
                <div>
                  <div className="route-name">{r.label}</div>
                  <div style={{fontSize:11.5,color:"var(--muted)"}}>{r.tag}</div>
                </div>
                <div className="route-eta">{r.eta}<small>min</small></div>
              </div>
              <div className="metric-strip">
                <Metric icon={Wallet}>Rs {r.cost}</Metric>
                <Metric icon={Footprints}>{r.walk} min walk</Metric>
                <Metric icon={RouteIcon}>{r.transfers} transfer{r.transfers!==1?"s":""}</Metric>
                <CrowdBadge level={r.crowdLevel} label={`${r.crowd} crowding`} />
                <Chip tone={r.reliability==="High"?"teal":"amber"} icon={ShieldCheck}>{r.reliability} reliability</Chip>
                {r.wheelchair && <Chip tone="teal" icon={Accessibility}>Step-free</Chip>}
              </div>
            </button>
          );
        })}
      </div>
      <button className="btn btn-primary kbd-focus" style={{marginTop:6}} onClick={onOpen}>
        View {routes.find(r=>r.id===selected)?.label.toLowerCase()} details <ArrowRight size={16}/>
      </button>
    </Screen>
  );
}

/* ============================================================
   5. ROUTE DETAILS
   ============================================================ */
function RouteDetailsScreen({route, onBack, onStart, onLiveStatus}) {
  const segs = SEGMENTS.reco;
  return (
    <Screen title={route.label + " route"} sub="Home → University of Karachi" onBack={onBack}>
      <SimulatedMap height={170} accessibility={route.wheelchair} wheelchair={route.wheelchair}
        caption={<><Clock size={12}/> {route.eta} min · Rs {route.cost}</>} />
      <div className="metric-strip" style={{marginTop:12}}>
        <Metric icon={Wallet}>Rs {route.cost}</Metric>
        <Metric icon={Footprints}>{route.walk} min walk</Metric>
        <Metric icon={RouteIcon}>{route.transfers} transfers</Metric>
        <CrowdBadge level={route.crowdLevel} label={route.crowd} />
        <Chip tone="teal" icon={ShieldCheck}>{route.reliability} reliability</Chip>
        {route.wheelchair && <Chip tone="teal" icon={Accessibility}>Step-free vehicles</Chip>}
      </div>

      <button className="row kbd-focus" style={{width:"100%",background:"none",border:"none",textAlign:"left",marginTop:8}} onClick={onLiveStatus}>
        <div className="row-ic"><Bus size={17}/></div>
        <div><div className="row-title">Check live transport & crowding</div><div className="row-sub">Real-time bus & metro status</div></div>
        <div className="row-right"><ChevronRight size={16}/></div>
      </button>

      <div className="section-label">Journey timeline</div>
      <div className="card"><Timeline segments={segs} /></div>

      <div className="alert-card alert-blue" style={{marginTop:12}}>
        <Info size={16} style={{marginTop:1}}/>
        <div className="alert-text">Total journey time includes a 3 min buffer for transfers. You'll get step-by-step directions once you start.</div>
      </div>

      <button className="btn btn-amber kbd-focus" style={{marginTop:16}} onClick={onStart}>
        <PlayCircle size={18}/> Start journey
      </button>
    </Screen>
  );
}

/* ============================================================
   6. LIVE NAVIGATION
   ============================================================ */
function LiveNavScreen({route, disruptionActive, onBack, onSimulateDisruption, onSOS, onEnd}) {
  return (
    <Screen title="Live navigation" sub="Step 2 of 4 · Bus R‑12" onBack={onBack}
      right={<button className="icon-btn kbd-focus" style={{borderColor:"var(--red)"}} onClick={onSOS} aria-label="Emergency SOS"><Siren size={17} color="var(--red)"/></button>}>
      <SimulatedMap height={260} caption={<><Navigation size={12}/> On Bus R‑12 · 4 stops to go</>} />

      <div className="card" style={{marginTop:12, display:"flex", alignItems:"center", gap:12}}>
        <div className="row-ic" style={{background:"var(--amber-bg)",color:"var(--amber-ink)",width:46,height:46}}><Bus size={20}/></div>
        <div style={{flex:1}}>
          <div className="row-title" style={{fontSize:15}}>Next: Alight at Millennium Mall</div>
          <div className="row-sub">Then walk 3 min to Green Line platform</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div className="big-num" style={{fontSize:18}}>17</div>
          <div style={{fontSize:10.5,color:"var(--muted)"}}>min left</div>
        </div>
      </div>

      <div className="metric-strip" style={{marginTop:12}}>
        <Chip tone="teal" icon={CheckCircle2}>On schedule</Chip>
        <CrowdBadge level={2} label="Moderate crowding" />
        <Chip tone="blue" icon={ShieldCheck}>GPS confirmed</Chip>
      </div>

      <div className="section-label">Remaining stops</div>
      <div className="card">
        {["Faisal Chowk","City Centre","Millennium Mall (transfer)","University Road Station"].map((s,i)=>(
          <div className="row" key={i}>
            <div className="row-ic" style={{width:30,height:30,background:i===0?"var(--ink)":"var(--surface-alt)",color:i===0?"#fff":"var(--ink-soft)"}}>
              {i===0 ? <Circle size={9} fill="#fff"/> : <span style={{fontSize:11,fontWeight:700}}>{i+1}</span>}
            </div>
            <div className="row-title" style={{fontSize:13}}>{s}</div>
          </div>
        ))}
      </div>

      <div className="btn-block-row" style={{marginTop:16}}>
        <button className="btn btn-outline kbd-focus" onClick={onSimulateDisruption}>
          <AlertTriangle size={15}/> Simulate disruption
        </button>
        <button className="btn btn-secondary kbd-focus" onClick={onEnd}>
          <CheckCircle2 size={15}/> End trip
        </button>
      </div>
    </Screen>
  );
}

/* ============================================================
   7. LIVE TRANSPORT & CROWD
   ============================================================ */
function LiveTransportScreen({onBack, offline}) {
  const vehicles = [
    {name:"Bus R‑12", eta:"4–6 min", status:"Confirmed via GPS", crowd:2, confirmed:true},
    {name:"Bus R‑9", eta:"~11 min", status:"Estimated from schedule", crowd:1, confirmed:false},
    {name:"Green Line Metro", eta:"2 min", status:"Confirmed via GPS", crowd:3, confirmed:true},
    {name:"Orange Line Metro", eta:"~14 min", status:"Estimated — signal delay", crowd:1, confirmed:false},
  ];
  return (
    <Screen title="Live transport & crowd" sub="Millennium Mall corridor" onBack={onBack}>
      <SimulatedMap height={160} caption={<><Bus size={12}/> 4 vehicles tracked nearby</>} />
      <div className="section-label">Arrivals</div>
      <div className="card">
        {vehicles.map((v,i)=>(
          <div className="row" key={i}>
            <div className="row-ic"><Bus size={17}/></div>
            <div style={{flex:1}}>
              <div className="row-title">{v.name}</div>
              <div className="row-sub" style={{display:"flex",alignItems:"center",gap:5}}>
                {v.confirmed ? <ShieldCheck size={11}/> : <Info size={11}/>} {v.status}{offline ? " · last known" : ""}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontWeight:700,fontSize:13}}>{v.eta}</div>
              <CrowdBadge level={v.crowd} label={["Low","Moderate","High"][v.crowd-1]} />
            </div>
          </div>
        ))}
      </div>
      <div className="alert-card alert-blue" style={{marginTop:4}}>
        <Info size={16} style={{marginTop:1}}/>
        <div className="alert-text"><b>Confirmed</b> data comes from live vehicle GPS. <b>Estimated</b> data is based on the published schedule when GPS isn't available.</div>
      </div>
    </Screen>
  );
}

/* ============================================================
   8. DISRUPTION ALERT
   ============================================================ */
function DisruptionScreen({onBack, onRecalculate}) {
  return (
    <Screen title="Disruption detected" onBack={onBack}>
      <SimulatedMap height={190} disruption caption={<><AlertTriangle size={12}/> Construction zone ahead</>} />
      <div className="alert-card alert-red" style={{marginTop:12}}>
        <AlertTriangle size={18} style={{marginTop:1}}/>
        <div>
          <div className="alert-title">Road construction near Millennium Mall</div>
          <div className="alert-text">Shahrah‑e‑Faisal is down to one lane. Bus R‑12 is queued in traffic.</div>
        </div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:12,color:"var(--muted)"}}>Original ETA</div>
            <div className="big-num" style={{fontSize:20}}>34 min</div>
          </div>
          <ArrowRight size={18} color="var(--muted)"/>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:12,color:"var(--muted)"}}>New ETA if you stay</div>
            <div className="big-num" style={{fontSize:20,color:"var(--red)"}}>46 min</div>
          </div>
        </div>
      </div>

      <div className="section-label">What changed</div>
      <div className="card">
        <div className="row"><div className="row-ic"><Clock size={17}/></div>
          <div><div className="row-title">+12 min delay</div><div className="row-sub">On the Shahrah‑e‑Faisal segment</div></div></div>
        <div className="row"><div className="row-ic"><Users size={17}/></div>
          <div><div className="row-title">Crowding rising</div><div className="row-sub">Bus R‑12 now High crowding, confirmed</div></div></div>
      </div>

      <div style={{fontSize:12.5,color:"var(--muted)",marginTop:14,marginBottom:4}}>What would you like to do?</div>
      <button className="btn btn-amber kbd-focus" onClick={onRecalculate}>
        <RefreshCw size={16}/> See a faster alternative
      </button>
      <button className="btn btn-secondary kbd-focus" style={{marginTop:8}} onClick={onBack}>
        Stay on current route
      </button>
    </Screen>
  );
}

/* ============================================================
   9. DYNAMIC ROUTE RECALCULATION
   ============================================================ */
function RerouteScreen({onKeep, onSwitch}) {
  return (
    <Screen title="Faster route found" onBack={onKeep}>
      <SimulatedMap height={190} rerouted disruption caption={<><RouteIcon size={12}/> Avoids Shahrah‑e‑Faisal</>} />

      <div className="alert-card alert-teal" style={{marginTop:12}}>
        <Zap size={17} style={{marginTop:1}}/>
        <div>
          <div className="alert-title">Why this is better</div>
          <div className="alert-text">Switches to the Orange Line to bypass the construction zone entirely. You'll walk 2 min more, but save 15 minutes overall.</div>
        </div>
      </div>

      <div style={{display:"flex",gap:10,marginTop:14}}>
        <div className="card" style={{flex:1}}>
          <div style={{fontSize:11.5,color:"var(--muted)",fontWeight:700}}>CURRENT ROUTE</div>
          <div className="big-num" style={{fontSize:22,marginTop:4}}>46 min</div>
          <div style={{fontSize:11.5,color:"var(--muted)",marginTop:6}}>Rs 120 · 8 min walk · 1 transfer</div>
          <Chip tone="red" icon={AlertTriangle}>Delayed</Chip>
        </div>
        <div className="card" style={{flex:1, borderColor:"var(--teal)"}}>
          <div style={{fontSize:11.5,color:"var(--teal)",fontWeight:700}}>NEW ROUTE</div>
          <div className="big-num" style={{fontSize:22,marginTop:4}}>31 min</div>
          <div style={{fontSize:11.5,color:"var(--muted)",marginTop:6}}>Rs 120 · 10 min walk · 1 transfer</div>
          <Chip tone="teal" icon={ShieldCheck}>On time</Chip>
        </div>
      </div>

      <div className="section-label">New journey timeline</div>
      <div className="card"><Timeline segments={SEGMENTS_NEW} /></div>

      <button className="btn btn-teal kbd-focus" style={{marginTop:16}} onClick={onSwitch}>
        <RefreshCw size={16}/> Switch to new route
      </button>
      <button className="btn btn-secondary kbd-focus" style={{marginTop:8}} onClick={onKeep}>
        Keep current route
      </button>
    </Screen>
  );
}

/* ============================================================
   10. ELDERLY / PERSONALIZED JOURNEY
   ============================================================ */
function ElderlyScreen({prefs, setPrefs, onBack, onSeeRoute}) {
  const toggle = (k)=> setPrefs({...prefs, [k]:!prefs[k]});
  const items = [
    {k:"minWalk", t:"Minimise walking", s:"Prefer routes under 5 min walking"},
    {k:"fewTransfers", t:"Fewer transfers", s:"Prioritise single-vehicle journeys"},
    {k:"avoidStairs", t:"Avoid stairs", s:"Only show stations with ramps or lifts"},
    {k:"seating", t:"Prefer guaranteed seating", s:"Favour less crowded vehicles"},
  ];
  return (
    <Screen title="Journey preferences" sub="Mrs. Fatima, 68 · Simplified view" onBack={onBack}>
      <div className="card" style={{padding:16}}>
        {items.map(it=>(
          <div className="pref-row" key={it.k}>
            <div className="pref-text">
              <div className="pref-title" style={{fontSize:16}}>{it.t}</div>
              <div className="pref-sub" style={{fontSize:13}}>{it.s}</div>
            </div>
            <Toggle on={prefs[it.k]} onClick={()=>toggle(it.k)} ariaLabel={it.t} />
          </div>
        ))}
      </div>

      <div className="alert-card alert-teal" style={{marginTop:14}}>
        <CheckCircle2 size={18} style={{marginTop:1}}/>
        <div>
          <div className="alert-title" style={{fontSize:14.5}}>Your recommended route updated</div>
          <div className="alert-text" style={{fontSize:13}}>Walking cut to 3 min, 0 transfers, all stations have lifts, and seating is likely available.</div>
        </div>
      </div>

      <button className="btn btn-primary kbd-focus" style={{marginTop:18, fontSize:16, padding:18}} onClick={onSeeRoute}>
        View my easier route <ArrowRight size={18}/>
      </button>
    </Screen>
  );
}

/* ============================================================
   11. WHEELCHAIR ACCESSIBILITY
   ============================================================ */
function WheelchairScreen({wheelchairMode, setWheelchairMode, onBack, onSeeRoutes, onSimulateFailure}) {
  return (
    <Screen title="Wheelchair accessibility" sub="Sara's travel settings" onBack={onBack}>
      <div className="card">
        <div className="pref-row">
          <div className="pref-text">
            <div className="pref-title">Wheelchair mode</div>
            <div className="pref-sub">Show only step-free routes with accessible, low-floor vehicles</div>
          </div>
          <Toggle on={wheelchairMode} onClick={()=>setWheelchairMode(!wheelchairMode)} ariaLabel="Wheelchair mode" />
        </div>
      </div>

      <SimulatedMap height={170} accessibility wheelchair={wheelchairMode} dim={!wheelchairMode}
        caption={<><Accessibility size={12}/> Accessible stations highlighted</>} />

      <div className="section-label">What changes when it's on</div>
      <div className="card">
        <div className="row"><div className="row-ic"><Accessibility size={17}/></div>
          <div><div className="row-title">Step-free routes only</div><div className="row-sub">Ramps and lifts, never stairs</div></div></div>
        <div className="row"><div className="row-ic"><Bus size={17}/></div>
          <div><div className="row-title">Low-floor vehicles</div><div className="row-sub">Bus and metro with wheelchair boarding</div></div></div>
        <div className="row"><div className="row-ic"><ShieldCheck size={17}/></div>
          <div><div className="row-title">Accessibility badges</div><div className="row-sub">Every stop shows lift/ramp status</div></div></div>
      </div>

      <button className="btn btn-primary kbd-focus" style={{marginTop:16}} onClick={onSeeRoutes} disabled={!wheelchairMode}>
        View accessible routes <ArrowRight size={16}/>
      </button>
      <button className="btn btn-outline kbd-focus" style={{marginTop:8}} onClick={onSimulateFailure}>
        <AlertTriangle size={15}/> Simulate elevator outage
      </button>
    </Screen>
  );
}

/* ============================================================
   12. ACCESSIBILITY FAILURE / RECOVERY
   ============================================================ */
function AccessibilityFailureScreen({onBack, onAccept}) {
  return (
    <Screen title="Accessible route update" onBack={onBack}>
      <div className="alert-card alert-red">
        <AlertTriangle size={18} style={{marginTop:1}}/>
        <div>
          <div className="alert-title">Elevator at Central Station is unavailable</div>
          <div className="alert-text">Your original route relies on this elevator and is no longer step-free.</div>
        </div>
      </div>

      <SimulatedMap height={180} disruption accessibility wheelchair caption={<><RefreshCw size={12}/> Rerouted to ramp-accessible station</>} />

      <div className="alert-card alert-teal" style={{marginTop:12}}>
        <ShieldCheck size={17} style={{marginTop:1}}/>
        <div>
          <div className="alert-title">Fully accessible alternative found</div>
          <div className="alert-text">Routed via Nazimabad Junction, which has a working ramp and accessible boarding at every stop.</div>
        </div>
      </div>

      <div style={{display:"flex",gap:10,marginTop:14}}>
        <div className="card" style={{flex:1}}>
          <div style={{fontSize:11.5,color:"var(--muted)",fontWeight:700}}>ORIGINAL</div>
          <div className="big-num" style={{fontSize:20,marginTop:4}}>40 min</div>
          <Chip tone="red" icon={AlertTriangle}>Not accessible</Chip>
        </div>
        <div className="card" style={{flex:1, borderColor:"var(--teal)"}}>
          <div style={{fontSize:11.5,color:"var(--teal)",fontWeight:700}}>NEW ROUTE</div>
          <div className="big-num" style={{fontSize:20,marginTop:4}}>46 min</div>
          <Chip tone="teal" icon={Accessibility}>Fully step-free</Chip>
        </div>
      </div>
      <p style={{fontSize:12,color:"var(--muted)",marginTop:8,lineHeight:1.5}}>
        Trade-off: 6 minutes longer, but every stop on this route has a working ramp or lift.
      </p>

      <button className="btn btn-teal kbd-focus" style={{marginTop:16}} onClick={onAccept}>
        <Accessibility size={16}/> Use accessible alternative
      </button>
    </Screen>
  );
}

/* ============================================================
   13. TOURIST MODE
   ============================================================ */
function TouristScreen({language, setLanguage, onBack}) {
  const steps = [
    {icon:Footprints, t:"Walk to the Blue Building", s:"That's the Karachi Press Club — 5 min, turn right out the door", dur:"5 min"},
    {icon:Bus, t:"Board the Green Bus", s:"Look for the green sign marked \"R‑12\" — pay Rs 50 to the driver", dur:"12 min"},
    {icon:Footprints, t:"Get off at the big clock tower", s:"That's Millennium Mall — walk straight ahead 2 min", dur:"2 min"},
    {icon:Landmark, t:"You've arrived!", s:"University of Karachi main gate is on your left", dur:""},
  ];
  return (
    <Screen title="Simple directions" sub="For visitors · Landmark-based" onBack={onBack}
      right={
        <button className="icon-btn kbd-focus" onClick={()=>setLanguage(language==="English"?"Urdu":"English")} aria-label="Change language">
          <Languages size={17}/>
        </button>
      }>
      <div className="alert-card alert-blue">
        <Globe size={16} style={{marginTop:1}}/>
        <div className="alert-text">
          {language==="Urdu"
            ? "آسان ہدایات — نشانیوں کے ساتھ"
            : "Directions use landmarks and colours instead of station names, so you don't need local knowledge."}
        </div>
      </div>

      {steps.map((s,i)=>(
        <div className="card" key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div className="step-num">{i+1}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <s.icon size={16} color="var(--amber-ink)"/>
              <div className="row-title">{s.t}</div>
            </div>
            <div className="row-sub" style={{marginTop:4}}>{s.s}</div>
          </div>
          {s.dur && <Chip tone="amber">{s.dur}</Chip>}
        </div>
      ))}

      <div className="section-label">Language</div>
      <div className="btn-block-row">
        <button className={`btn ${language==="English"?"btn-primary":"btn-outline"} kbd-focus`} onClick={()=>setLanguage("English")}>English</button>
        <button className={`btn ${language==="Urdu"?"btn-primary":"btn-outline"} kbd-focus`} onClick={()=>setLanguage("Urdu")}>اردو</button>
      </div>
    </Screen>
  );
}

/* ============================================================
   14. SMART PARKING
   ============================================================ */
function ParkingScreen({onBack, onReserve}) {
  return (
    <Screen title="Parking near University" sub="Driving · Bilal" onBack={onBack}>
      <SimulatedMap height={170} parking caption={<><ParkingCircle size={12}/> 2 facilities within 10 min walk</>} />
      <div className="section-label">Facilities</div>
      {PARKING.map(p=>(
        <div className={`route-row ${p.recommended?"reco":""}`} key={p.id} style={{marginBottom:10}}>
          <div className="route-top">
            <div className="route-badge" style={{background:p.spots>0?"var(--teal-bg)":"var(--red-bg)", color:p.spots>0?"#075A52":"#7A241E"}}>
              <ParkingCircle size={17}/>
            </div>
            <div>
              <div className="route-name">{p.name}</div>
              <div style={{fontSize:11.5,color:"var(--muted)"}}>{p.rate} · {p.walk} min walk</div>
            </div>
            {p.recommended && <Chip tone="amber">Recommended</Chip>}
          </div>
          <div className="metric-strip">
            {p.spots>0
              ? <Chip tone="teal" icon={CheckCircle2}>{p.spots}/{p.cap} spots free</Chip>
              : <Chip tone="red" icon={AlertTriangle}>Full — 0/{p.cap}</Chip>}
            <Metric icon={Wallet}>{p.rate}</Metric>
            <Metric icon={Footprints}>{p.walk} min walk</Metric>
          </div>
          {p.spots===0 && (
            <div className="alert-card alert-amber" style={{marginTop:10}}>
              <Info size={14} style={{marginTop:1}}/>
              <div className="alert-text">Full right now. University Road Multi‑Storey has 42 free spots, 6 min further.</div>
            </div>
          )}
        </div>
      ))}
      <button className="btn btn-primary kbd-focus" style={{marginTop:6}} onClick={onReserve}>
        <Car size={16}/> Navigate & reserve at University Road
      </button>
    </Screen>
  );
}

/* ============================================================
   15. EMERGENCY + OFFLINE
   ============================================================ */
function EmergencyScreen({offline, setOffline, onBack, onSOS}) {
  return (
    <Screen title="Emergency & offline" onBack={onBack}>
      <button className="card kbd-focus" style={{width:"100%",background:"var(--red)",border:"none",textAlign:"left",display:"flex",alignItems:"center",gap:14}}
        onClick={onSOS}>
        <div style={{width:52,height:52,borderRadius:16,background:"rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Siren size={26} color="#fff"/>
        </div>
        <div>
          <div style={{color:"#fff",fontFamily:"var(--font-d)",fontWeight:700,fontSize:17}}>SOS — Send alert</div>
          <div style={{color:"rgba(255,255,255,0.85)",fontSize:12}}>Shares your live location with responders & contacts</div>
        </div>
      </button>

      <div className="section-label">Emergency assistance</div>
      <div className="card">
        <div className="row"><div className="row-ic"><PhoneCall size={17}/></div>
          <div><div className="row-title">Call ambulance</div><div className="row-sub">1122 · nearest unit 4 min away</div></div>
          <div className="row-right"><ChevronRight size={16}/></div></div>
        <div className="row"><div className="row-ic"><ShieldAlert size={17}/></div>
          <div><div className="row-title">Call police</div><div className="row-sub">15 · Karachi Police</div></div>
          <div className="row-right"><ChevronRight size={16}/></div></div>
        <div className="row"><div className="row-ic"><HeartPulse size={17}/></div>
          <div><div className="row-title">Notify trusted contact</div><div className="row-sub">Send location to Ali (Brother)</div></div>
          <div className="row-right"><ChevronRight size={16}/></div></div>
      </div>

      <div className="section-label">Nearby hospitals</div>
      <div className="card">
        {NEARBY.hospitals.map((h,i)=>(
          <div className="row" key={i}><div className="row-ic"><Cross size={17}/></div>
            <div><div className="row-title">{h.name}</div><div className="row-sub">{h.sub}</div></div></div>
        ))}
      </div>

      <div className="section-label">Offline mode</div>
      <div className="card">
        <div className="pref-row">
          <div className="pref-text">
            <div className="pref-title">Simulate no connection</div>
            <div className="pref-sub">See how the app behaves without internet</div>
          </div>
          <Toggle on={offline} onClick={()=>setOffline(!offline)} ariaLabel="Simulate offline mode" />
        </div>
      </div>
      {offline && (
        <div className="alert-card alert-amber" style={{marginTop:10}}>
          <CloudOff size={16} style={{marginTop:1}}/>
          <div>
            <div className="alert-title">You're offline</div>
            <div className="alert-text">Your saved route to University is still available. Live bus positions and crowding were last updated 12 min ago and won't refresh until you reconnect.</div>
          </div>
        </div>
      )}
    </Screen>
  );
}

/* ============================================================
   16. TRIP HISTORY
   ============================================================ */
function HistoryScreen({trips, setTrips, onBack, onRepeat}) {
  const [confirmId, setConfirmId] = useState(null);
  const del = (id) => { setTrips(trips.filter(t=>t.id!==id)); setConfirmId(null); };
  return (
    <div className="screen">
      <div className="screen-header">
        <div className="screen-title" style={{paddingLeft:2}}>Trip history</div>
      </div>
      <div className="screen-body">
        <div className="section-label" style={{marginTop:2}}>Frequently used</div>
        <div className="card">
          <div className="row"><div className="row-ic"><RouteIcon size={17}/></div>
            <div><div className="row-title">Home → University</div><div className="row-sub">Used 4x this week</div></div>
            <button className="btn btn-sm btn-secondary kbd-focus" onClick={onRepeat}>Repeat</button></div>
          <div className="row"><div className="row-ic"><RouteIcon size={17}/></div>
            <div><div className="row-title">Home → Office</div><div className="row-sub">Used 2x this week</div></div>
            <button className="btn btn-sm btn-secondary kbd-focus" onClick={onRepeat}>Repeat</button></div>
        </div>

        <div className="section-label">Recent journeys</div>
        {trips.length===0 && <div className="empty-note">No trips yet. Start a journey and it will appear here.</div>}
        {trips.map(t=>(
          <div className="card" key={t.id} style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div className="row-ic"><History size={17}/></div>
              <div style={{flex:1}}>
                <div className="row-title">{t.from} → {t.to}</div>
                <div className="row-sub">{t.when} · {t.freq}</div>
              </div>
            </div>
            <div className="btn-block-row" style={{marginTop:10}}>
              <button className="btn btn-sm btn-secondary kbd-focus" onClick={onRepeat}><Repeat size={13}/> Repeat</button>
              <button className="btn btn-sm btn-outline kbd-focus"><Edit2 size={13}/> Edit</button>
              <button className="btn btn-sm btn-outline kbd-focus" style={{color:"var(--red)",borderColor:"var(--red-bg)"}}
                onClick={()=>setConfirmId(t.id)}><Trash2 size={13}/> Delete</button>
            </div>
            {confirmId===t.id && (
              <div className="alert-card alert-red" style={{marginTop:10}}>
                <AlertTriangle size={15} style={{marginTop:1}}/>
                <div style={{flex:1}}>
                  <div className="alert-text">Delete this trip from your history? This can't be undone.</div>
                  <div className="btn-block-row" style={{marginTop:8}}>
                    <button className="btn btn-sm btn-danger kbd-focus" onClick={()=>del(t.id)}>Delete</button>
                    <button className="btn btn-sm btn-secondary kbd-focus" onClick={()=>setConfirmId(null)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   17. PROFILE / PREFERENCES
   ============================================================ */
function ProfileScreen({persona, language, setLanguage, wheelchairMode, setWheelchairMode, elderlyPrefs, setElderlyPrefs, onBack, onPrivacy}) {
  const p = PERSONAS[persona];
  const [notif, setNotif] = useState({disruptions:true, arrivals:true, promos:false});
  const [offlineMaps, setOfflineMaps] = useState(true);
  return (
    <div className="screen">
      <div className="screen-header"><div className="screen-title" style={{paddingLeft:2}}>Profile</div></div>
      <div className="screen-body">
        <div className="card" style={{display:"flex",alignItems:"center",gap:14}}>
          <span className="persona-av" style={{width:48,height:48,fontSize:16}}>{p.initial}</span>
          <div><div style={{fontFamily:"var(--font-d)",fontWeight:700,fontSize:17}}>{p.name}</div>
          <div className="row-sub">{p.role}</div></div>
        </div>

        <div className="section-label">Travel preferences</div>
        <div className="card">
          <div className="pref-row"><div className="pref-text"><div className="pref-title">Minimise walking</div><div className="pref-sub">Prefer shorter walking segments</div></div>
            <Toggle on={elderlyPrefs.minWalk} onClick={()=>setElderlyPrefs({...elderlyPrefs, minWalk:!elderlyPrefs.minWalk})} ariaLabel="Minimise walking"/></div>
          <div className="pref-row"><div className="pref-text"><div className="pref-title">Prefer seating</div><div className="pref-sub">Favour less crowded vehicles</div></div>
            <Toggle on={elderlyPrefs.seating} onClick={()=>setElderlyPrefs({...elderlyPrefs, seating:!elderlyPrefs.seating})} ariaLabel="Prefer seating"/></div>
        </div>

        <div className="section-label">Accessibility</div>
        <div className="card">
          <div className="pref-row"><div className="pref-text"><div className="pref-title">Wheelchair mode</div><div className="pref-sub">Only step-free, accessible routes</div></div>
            <Toggle on={wheelchairMode} onClick={()=>setWheelchairMode(!wheelchairMode)} ariaLabel="Wheelchair mode"/></div>
          <div className="pref-row"><div className="pref-text"><div className="pref-title">Avoid stairs</div><div className="pref-sub">Require lifts or ramps at every station</div></div>
            <Toggle on={elderlyPrefs.avoidStairs} onClick={()=>setElderlyPrefs({...elderlyPrefs, avoidStairs:!elderlyPrefs.avoidStairs})} ariaLabel="Avoid stairs"/></div>
        </div>

        <div className="section-label">Language</div>
        <div className="btn-block-row">
          <button className={`btn ${language==="English"?"btn-primary":"btn-outline"} kbd-focus`} onClick={()=>setLanguage("English")}>English</button>
          <button className={`btn ${language==="Urdu"?"btn-primary":"btn-outline"} kbd-focus`} onClick={()=>setLanguage("Urdu")}>اردو</button>
        </div>

        <div className="section-label">Notifications</div>
        <div className="card">
          <div className="pref-row"><div className="pref-text"><div className="pref-title">Disruption alerts</div><div className="pref-sub">Construction, closures, delays</div></div>
            <Toggle on={notif.disruptions} onClick={()=>setNotif({...notif, disruptions:!notif.disruptions})} ariaLabel="Disruption alerts"/></div>
          <div className="pref-row"><div className="pref-text"><div className="pref-title">Arrival reminders</div><div className="pref-sub">Bus/metro approaching your stop</div></div>
            <Toggle on={notif.arrivals} onClick={()=>setNotif({...notif, arrivals:!notif.arrivals})} ariaLabel="Arrival reminders"/></div>
          <div className="pref-row"><div className="pref-text"><div className="pref-title">Offers & promos</div><div className="pref-sub">Occasional fare discounts</div></div>
            <Toggle on={notif.promos} onClick={()=>setNotif({...notif, promos:!notif.promos})} ariaLabel="Offers and promos"/></div>
        </div>

        <div className="section-label">Emergency contacts</div>
        <div className="card">
          <div className="row"><div className="row-ic"><HeartPulse size={17}/></div>
            <div><div className="row-title">Ali Raza (Brother)</div><div className="row-sub">+92 300 1234567</div></div></div>
          <button className="row kbd-focus" style={{width:"100%",background:"none",border:"none",textAlign:"left"}}>
            <div className="row-ic"><Plus size={17}/></div>
            <div className="row-title" style={{color:"var(--blue)"}}>Add emergency contact</div>
          </button>
        </div>

        <div className="section-label">Offline maps</div>
        <div className="card">
          <div className="pref-row"><div className="pref-text"><div className="pref-title">Download city map for offline use</div><div className="pref-sub">{offlineMaps? "Downloaded · 34 MB" : "Not downloaded"}</div></div>
            <Toggle on={offlineMaps} onClick={()=>setOfflineMaps(!offlineMaps)} ariaLabel="Offline maps"/></div>
        </div>

        <button className="row kbd-focus" style={{width:"100%",background:"none",border:"none",textAlign:"left",marginTop:16}} onClick={onPrivacy}>
          <div className="row-ic"><Lock size={17}/></div>
          <div><div className="row-title">Privacy controls</div><div className="row-sub">Manage what data is collected</div></div>
          <div className="row-right"><ChevronRight size={16}/></div>
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   18. PRIVACY CONTROLS
   ============================================================ */
function PrivacyScreen({privacy, setPrivacy, onBack, onClearHistory}) {
  const items = [
    {k:"location", t:"Location", required:true,
      why:"Needed to find nearby stops, calculate ETAs, and give turn-by-turn directions."},
    {k:"history", t:"Travel history", required:false,
      why:"Used to suggest frequent routes and speed up repeat journeys. Optional — the app works without it."},
    {k:"accessibility", t:"Accessibility information", required:false,
      why:"Used only to personalise routing (e.g. wheelchair mode). Optional, and never shown to other users."},
  ];
  return (
    <Screen title="Privacy controls" onBack={onBack}>
      <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.5,margin:"4px 0 14px"}}>
        You control what's collected and why. Required data keeps core navigation working; everything else is optional.
      </p>
      {items.map(it=>(
        <div className="card" key={it.k} style={{marginBottom:10}}>
          <div className="pref-row" style={{borderBottom:"none",paddingBottom:6}}>
            <div className="pref-text">
              <div className="pref-title">{it.t} {it.required && <Chip tone="ink">Required</Chip>}</div>
            </div>
            {it.required
              ? <Chip tone="teal" icon={Lock}>Always on</Chip>
              : <Toggle on={privacy[it.k]} onClick={()=>setPrivacy({...privacy, [it.k]:!privacy[it.k]})} ariaLabel={it.t} />}
          </div>
          <div className="pref-sub" style={{fontSize:12.5}}>{it.why}</div>
        </div>
      ))}

      <div className="section-label">Your data</div>
      <div className="card">
        <button className="row kbd-focus" style={{width:"100%",background:"none",border:"none",textAlign:"left"}}>
          <div className="row-ic"><Eye size={17}/></div>
          <div><div className="row-title">Download my data</div><div className="row-sub">Export as a file</div></div>
          <div className="row-right"><ChevronRight size={16}/></div>
        </button>
        <button className="row kbd-focus" style={{width:"100%",background:"none",border:"none",textAlign:"left"}} onClick={onClearHistory}>
          <div className="row-ic" style={{color:"var(--red)"}}><Trash2 size={17}/></div>
          <div><div className="row-title" style={{color:"var(--red)"}}>Clear travel history</div><div className="row-sub">Removes saved trips from this device</div></div>
        </button>
      </div>
    </Screen>
  );
}
