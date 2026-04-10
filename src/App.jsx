import { useState, useEffect } from "react";

const storage = {
  get: (key, fallback) => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

const DEFAULT_CATEGORIES = [
  { id: "travel",  name: "行きたい旅行先",    emoji: "✈️",  color: "#7eb8d4" },
  { id: "person",  name: "会いたい人",         emoji: "🤝",  color: "#c9716a" },
  { id: "study",   name: "勉強したいこと",     emoji: "📖",  color: "#8fb87a" },
  { id: "event",   name: "行きたいイベント",   emoji: "🎫",  color: "#b08ec4" },
  { id: "create",  name: "自分で作りたいもの", emoji: "🛠️", color: "#d4a96a" },
];

const C = {
  bg:      "#f7f4f0",
  white:   "#ffffff",
  terra:   "#c9716a",
  sky:     "#7eb8d4",
  sage:    "#8fb87a",
  lavend:  "#b08ec4",
  amber:   "#d4a96a",
  text:    "#3a3028",
  sub:     "#9a8f85",
  border:  "#e5ddd6",
};

function getTimeGroup(targetDate) {
  if (!targetDate) return "nolimit";
  return targetDate;
}

const TIME_GROUPS = [
  { id:"thisyear", label:"今年",     color:"#c9716a" },
  { id:"nextyear", label:"来年",     color:"#7eb8d4" },
  { id:"within5",  label:"5年以内",  color:"#b08ec4" },
  { id:"later",    label:"それ以降", color:"#8fb87a" },
  { id:"nolimit",  label:"期限なし", color:"#b0a090" },
];

function TulipSVG({ size=32, color=C.terra, stem=C.sage }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <line x1="16" y1="30" x2="16" y2="15" stroke={stem} strokeWidth="2.2" strokeLinecap="round"/>
      <ellipse cx="11.5" cy="22" rx="4.2" ry="1.7" fill={stem} transform="rotate(-32 11.5 22)" opacity="0.85"/>
      <ellipse cx="20.5" cy="19.5" rx="4.2" ry="1.7" fill={stem} transform="rotate(32 20.5 19.5)" opacity="0.85"/>
      <ellipse cx="13.2" cy="11.5" rx="3.6" ry="6.2" fill={color} transform="rotate(-14 13.2 11.5)" opacity="0.88"/>
      <ellipse cx="18.8" cy="11.5" rx="3.6" ry="6.2" fill={color} transform="rotate(14 18.8 11.5)" opacity="0.88"/>
      <ellipse cx="16" cy="10" rx="3.6" ry="6.2" fill={color}/>
      <ellipse cx="16" cy="14.5" rx="4.2" ry="2.4" fill={color} opacity="0.5"/>
    </svg>
  );
}

function Celebration({ active, title, onDone }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setShow(true), 30);
    const t2 = setTimeout(() => { setShow(false); setTimeout(onDone, 500); }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);
  if (!active && !show) return null;

  const tulips = [
    {x:4,  c:C.terra,  s:42, d:0.00},
    {x:17, c:C.amber,  s:36, d:0.08},
    {x:29, c:C.lavend, s:44, d:0.14},
    {x:41, c:C.terra,  s:38, d:0.04},
    {x:54, c:C.sky,    s:42, d:0.18},
    {x:66, c:C.sage,   s:36, d:0.10},
    {x:78, c:C.terra,  s:40, d:0.22},
    {x:89, c:C.amber,  s:34, d:0.06},
  ];

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:200,
      background:"rgba(247,244,240,0.95)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      backdropFilter:"blur(8px)",
    }}>
      <div style={{
        opacity: show?1:0,
        transform: show?"scale(1) translateY(0)":"scale(0.8) translateY(20px)",
        transition:"all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        textAlign:"center", padding:"0 32px",
      }}>
        <TulipSVG size={60} color={C.terra} stem={C.sage}/>
        <div style={{ fontSize:26, fontWeight:800, color:C.text, marginTop:14, marginBottom:6, fontFamily:"'Noto Sans JP',sans-serif" }}>
          達成おめでとう！🎉
        </div>
        <div style={{ fontSize:14, color:C.sub, marginBottom:32, fontFamily:"'Noto Sans JP',sans-serif", lineHeight:1.7 }}>
          「{title}」<br/>やりきりましたね！
        </div>
        <button onClick={() => { setShow(false); setTimeout(onDone, 400); }} style={{
          padding:"12px 44px", borderRadius:100,
          background:C.terra, border:"none", color:"#fff",
          fontSize:14, fontWeight:700, cursor:"pointer",
          fontFamily:"'Noto Sans JP',sans-serif",
          boxShadow:"0 4px 18px rgba(201,113,106,0.38)",
        }}>とじる</button>
      </div>

      {/* tulips bottom row */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, display:"flex", alignItems:"flex-end", height:120, overflow:"hidden" }}>
        {tulips.map((t, i) => (
          <div key={i} style={{
            position:"absolute", left:`${t.x}%`,
            bottom:0,
            transform: show ? "scaleY(1)" : "scaleY(0)",
            transformOrigin:"bottom center",
            transition:`transform 0.65s cubic-bezier(0.34,1.56,0.64,1) ${t.d}s`,
          }}>
            <TulipSVG size={t.s} color={t.c} stem={C.sage}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sheet({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:100,
      background:"rgba(58,48,40,0.38)",
      display:"flex", alignItems:"flex-end",
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:C.white, borderRadius:"20px 20px 0 0",
        padding:"8px 20px 52px", width:"100%",
        maxHeight:"88vh", overflowY:"auto",
      }}>
        <div style={{ width:36, height:4, borderRadius:2, background:C.border, margin:"12px auto 20px" }}/>
        {title && <div style={{ fontSize:16, fontWeight:700, color:C.text, fontFamily:"'Noto Sans JP',sans-serif", marginBottom:16 }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

const iS = { width:"100%", padding:"12px 14px", borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:15, outline:"none", fontFamily:"'Noto Sans JP',sans-serif", boxSizing:"border-box", background:"#faf8f6", marginTop:6, color:C.text };
const lbl = { fontSize:12, color:C.sub, fontFamily:"'Noto Sans JP',sans-serif", marginTop:14, display:"block" };
const btnP = { width:"100%", padding:"13px", borderRadius:100, background:C.terra, border:"none", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Noto Sans JP',sans-serif", marginTop:16, boxShadow:"0 3px 14px rgba(201,113,106,0.32)" };
const btnD = { ...btnP, background:"#b05050", boxShadow:"none", marginTop:8 };
const btnG = { ...btnP, background:"transparent", border:`1.5px solid ${C.border}`, color:C.sub, boxShadow:"none", marginTop:8 };

function Chip({ label, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"6px 14px", borderRadius:100,
      border:`1.5px solid ${active ? color : C.border}`,
      background: active ? `${color}20` : C.white,
      color: active ? color : C.sub,
      fontSize:12, fontWeight: active?700:400,
      cursor:"pointer", fontFamily:"'Noto Sans JP',sans-serif",
      transition:"all 0.15s", flexShrink:0, whiteSpace:"nowrap",
    }}>{label}</button>
  );
}

function ItemCard({ item, cat, onCheck, onEdit }) {
  const tg = TIME_GROUPS.find(g => g.id === getTimeGroup(item.targetDate));
  const cc = cat?.color || C.terra;
  return (
    <div style={{
      background: item.done ? "#faf8f6" : C.white,
      borderRadius:14, padding:"14px 16px", marginBottom:10,
      boxShadow: item.done ? "none" : "0 2px 10px rgba(58,48,40,0.07)",
      border:`1px solid ${item.done ? C.border : "transparent"}`,
      display:"flex", alignItems:"flex-start", gap:12,
      opacity: item.done ? 0.55 : 1,
    }}>
      <button onClick={() => onCheck(item.id)} style={{
        width:24, height:24, borderRadius:"50%", flexShrink:0, marginTop:2,
        background: item.done ? cc : "transparent",
        border:`2px solid ${item.done ? cc : C.border}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer", transition:"all 0.2s", padding:0,
      }}>
        {item.done && <span style={{ color:"#fff", fontSize:11 }}>✓</span>}
      </button>
      <div style={{ flex:1, minWidth:0, cursor:"pointer" }} onClick={() => onEdit(item)}>
        <div style={{ fontSize:15, fontWeight:600, color:item.done?C.sub:C.text, textDecoration:item.done?"line-through":"none", fontFamily:"'Noto Sans JP',sans-serif", wordBreak:"break-all", lineHeight:1.5 }}>{item.title}</div>
        <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
          {cat && <span style={{ fontSize:11, color:cc, background:`${cc}18`, borderRadius:6, padding:"2px 8px", fontFamily:"'Noto Sans JP',sans-serif", fontWeight:600 }}>{cat.emoji} {cat.name}</span>}
          {item.targetDate && tg && <span style={{ fontSize:11, color:tg.color, background:`${tg.color}18`, borderRadius:6, padding:"2px 8px", fontFamily:"'Noto Sans JP',sans-serif" }}>{tg.label} · {item.targetDate}</span>}
        </div>
      </div>
      <button onClick={() => onEdit(item)} style={{ background:"none", border:"none", cursor:"pointer", color:C.border, fontSize:20, padding:"0 0 0 4px", flexShrink:0, lineHeight:1 }}>›</button>
    </div>
  );
}

function SectionLabel({ label, count, color }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"16px 0 8px" }}>
      <div style={{ width:4, height:16, borderRadius:2, background:color||C.terra, flexShrink:0 }}/>
      <span style={{ fontSize:13, fontWeight:700, color:C.text, fontFamily:"'Noto Sans JP',sans-serif" }}>{label}</span>
      <span style={{ fontSize:12, color:C.sub, fontFamily:"'Noto Sans JP',sans-serif" }}>{count}件</span>
    </div>
  );
}

export default function App() {
  const [categories, setCategories] = useState(() => storage.get("bl_cats3", DEFAULT_CATEGORIES));
  const [items, setItems]           = useState(() => storage.get("bl_items3", []));
  const [viewMode, setViewMode]     = useState("category");
  const [filterCat, setFilterCat]   = useState("all");
  const [filterTime, setFilterTime] = useState("all");
  const [cele, setCele]             = useState({ active:false, title:"" });
  const [showDone, setShowDone]     = useState(false);
  const [addOpen, setAddOpen]       = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [catOpen, setCatOpen]       = useState(false);
  const [addCatOpen, setAddCatOpen] = useState(false);
  const [editCat, setEditCat]       = useState(null);
  const [fTitle, setFTitle] = useState("");
  const [fCat,   setFCat]   = useState("");
  const [fDate,  setFDate]  = useState("");
  const [fCName, setFCName] = useState("");
  const [fCEmoji,setFCEmoji]= useState("⭐");

  useEffect(() => { storage.set("bl_cats3",  categories); }, [categories]);
  useEffect(() => { storage.set("bl_items3", items); },     [items]);

  const activeItems = items.filter(i => !i.done);
  const doneItems   = items.filter(i =>  i.done);

  function openEdit(item) { setEditItem(item); setFTitle(item.title); setFCat(item.categoryId); setFDate(item.targetDate||""); }

  function toggleDone(id) {
    const item = items.find(i=>i.id===id);
    if (!item) return;
    if (!item.done) setCele({ active:true, title:item.title });
    setItems(items.map(i=>i.id===id?{...i,done:!i.done}:i));
  }

  function addItem() {
    if (!fTitle.trim()) return;
    setItems([...items,{ id:Date.now().toString(), title:fTitle.trim(), categoryId:fCat||categories[0]?.id, targetDate:fDate, done:false, createdAt:new Date().toISOString() }]);
    setFTitle(""); setFDate(""); setFCat(""); setAddOpen(false);
  }

  function saveItem() {
    if (!editItem||!fTitle.trim()) return;
    setItems(items.map(i=>i.id===editItem.id?{...i,title:fTitle.trim(),categoryId:fCat||i.categoryId,targetDate:fDate}:i));
    setEditItem(null);
  }

  function deleteItem(id) { setItems(items.filter(i=>i.id!==id)); setEditItem(null); }

  function addCat() {
    if (!fCName.trim()) return;
    const palette=[C.sky,C.terra,C.sage,C.lavend,C.amber,"#7abdb5"];
    setCategories([...categories,{ id:Date.now().toString(), name:fCName.trim(), emoji:fCEmoji, color:palette[categories.length%palette.length] }]);
    setFCName(""); setFCEmoji("⭐"); setAddCatOpen(false);
  }

  function saveCat() {
    if (!editCat||!fCName.trim()) return;
    setCategories(categories.map(c=>c.id===editCat.id?{...c,name:fCName.trim(),emoji:fCEmoji}:c));
    setEditCat(null);
  }

  function deleteCat(id) { setCategories(categories.filter(c=>c.id!==id)); setItems(items.filter(i=>i.categoryId!==id)); setEditCat(null); }

  function groupByCat(list) {
    const f = filterCat==="all" ? list : list.filter(i=>i.categoryId===filterCat);
    return categories.map(cat=>({ cat, items:f.filter(i=>i.categoryId===cat.id) })).filter(g=>g.items.length>0);
  }

  function groupByTime(list) {
    const f = filterTime==="all" ? list : list.filter(i=>getTimeGroup(i.targetDate)===filterTime);
    return TIME_GROUPS.map(tg=>({ tg, items:f.filter(i=>getTimeGroup(i.targetDate)===tg.id) })).filter(g=>g.items.length>0);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
        body{background:${C.bg};}
        select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239a8f85' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px!important;}
      `}</style>

      <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans JP',sans-serif", maxWidth:480, margin:"0 auto", paddingBottom:110 }}>

        {/* Header */}
        <div style={{ background:C.white, padding:"20px 20px 0", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:50 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <TulipSVG size={30} color={C.terra} stem={C.sage}/>
              <div>
                <div style={{ fontSize:19, fontWeight:800, color:C.text }}>Bucket List</div>
                <div style={{ fontSize:11, color:C.sub }}>やりたいことを全部かなえよう</div>
              </div>
            </div>
            <button onClick={()=>setCatOpen(true)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 12px", fontSize:12, color:C.sub, cursor:"pointer", fontFamily:"'Noto Sans JP',sans-serif" }}>カテゴリ管理</button>
          </div>
          {/* Stats */}
          <div style={{ display:"flex", borderTop:`1px solid ${C.border}`, margin:"0 -20px" }}>
            {[["全部",items.length,C.text],["達成",doneItems.length,C.sage],["残り",activeItems.length,C.terra]].map(([l,v,col],i)=>(
              <div key={l} style={{ flex:1, padding:"10px 0", textAlign:"center", borderRight:i<2?`1px solid ${C.border}`:"none" }}>
                <div style={{ fontSize:20, fontWeight:800, color:col }}>{v}</div>
                <div style={{ fontSize:11, color:C.sub }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding:"16px 16px 0" }}>

          {/* View Toggle */}
          <div style={{ display:"flex", background:C.border, borderRadius:10, padding:3, marginBottom:12 }}>
            {[["category","カテゴリ別"],["time","時期別"]].map(([mode,lbl])=>(
              <button key={mode} onClick={()=>setViewMode(mode)} style={{
                flex:1, padding:"8px 0", borderRadius:8, border:"none",
                background:viewMode===mode?C.white:"transparent",
                color:viewMode===mode?C.text:C.sub,
                fontSize:13, fontWeight:viewMode===mode?700:400,
                cursor:"pointer", fontFamily:"'Noto Sans JP',sans-serif",
                boxShadow:viewMode===mode?"0 1px 4px rgba(58,48,40,0.1)":"none",
                transition:"all 0.18s",
              }}>{lbl}</button>
            ))}
          </div>

          {/* Filter chips */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
            {viewMode==="category" ? (
              <>
                <Chip label="すべて" active={filterCat==="all"} color={C.terra} onClick={()=>setFilterCat("all")}/>
                {categories.map(cat=><Chip key={cat.id} label={`${cat.emoji} ${cat.name}`} active={filterCat===cat.id} color={cat.color} onClick={()=>setFilterCat(cat.id)}/>)}
              </>
            ) : (
              <>
                <Chip label="すべて" active={filterTime==="all"} color={C.terra} onClick={()=>setFilterTime("all")}/>
                {TIME_GROUPS.map(tg=><Chip key={tg.id} label={tg.label} active={filterTime===tg.id} color={tg.color} onClick={()=>setFilterTime(tg.id)}/>)}
              </>
            )}
          </div>

          {/* Empty */}
          {activeItems.length===0 && (
            <div style={{ textAlign:"center", padding:"64px 0", color:C.sub }}>
              <TulipSVG size={52} color="#d4c0b8" stem="#c0ccc0"/>
              <div style={{ marginTop:14, fontSize:14, fontWeight:600 }}>まだ登録がありません</div>
              <div style={{ fontSize:12, marginTop:4 }}>右下の＋からやりたいことを追加しよう</div>
            </div>
          )}

          {/* Groups */}
          {viewMode==="category"
            ? groupByCat(activeItems).map(({cat,items:g})=>(
                <div key={cat.id}>
                  <SectionLabel label={`${cat.emoji} ${cat.name}`} count={g.length} color={cat.color}/>
                  {g.map(item=><ItemCard key={item.id} item={item} cat={categories.find(c=>c.id===item.categoryId)} onCheck={toggleDone} onEdit={openEdit}/>)}
                </div>
              ))
            : groupByTime(activeItems).map(({tg,items:g})=>(
                <div key={tg.id}>
                  <SectionLabel label={tg.label} count={g.length} color={tg.color}/>
                  {g.map(item=><ItemCard key={item.id} item={item} cat={categories.find(c=>c.id===item.categoryId)} onCheck={toggleDone} onEdit={openEdit}/>)}
                </div>
              ))
          }

          {/* Done */}
          {doneItems.length>0 && (
            <div style={{ marginTop:8 }}>
              <button onClick={()=>setShowDone(!showDone)} style={{
                width:"100%", padding:"11px 16px", background:"transparent",
                border:`1px dashed ${C.border}`, borderRadius:10, color:C.sub, fontSize:13,
                cursor:"pointer", fontFamily:"'Noto Sans JP',sans-serif",
                display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              }}>
                <TulipSVG size={16} color={C.sub} stem={C.sub}/>
                達成済み（{doneItems.length}件）{showDone?" ▲":" ▼"}
              </button>
              {showDone && doneItems.map(item=><ItemCard key={item.id} item={item} cat={categories.find(c=>c.id===item.categoryId)} onCheck={toggleDone} onEdit={openEdit}/>)}
            </div>
          )}
        </div>

        {/* FAB */}
        <button onClick={()=>{ setFTitle(""); setFDate(""); setFCat(categories[0]?.id||""); setAddOpen(true); }} style={{
          position:"fixed", bottom:32, right:20, width:56, height:56, borderRadius:"50%",
          background:C.terra, border:"none", color:"#fff", fontSize:26, cursor:"pointer",
          boxShadow:"0 4px 20px rgba(201,113,106,0.45)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:50,
        }}>＋</button>

        {/* Sheets */}
        <Sheet open={addOpen} onClose={()=>setAddOpen(false)} title="やりたいことを追加">
          <span style={lbl}>内容</span>
          <input style={iS} placeholder="例：台湾に行く" value={fTitle} onChange={e=>setFTitle(e.target.value)} autoFocus/>
          <span style={lbl}>カテゴリ</span>
          <select style={iS} value={fCat} onChange={e=>setFCat(e.target.value)}>
            {categories.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
          </select>
          <span style={lbl}>いつまでに？（任意）</span>
          <select style={iS} value={fDate} onChange={e=>setFDate(e.target.value)}>
            <option value="">選択しない</option>
            <option value="thisyear">今年</option>
            <option value="nextyear">来年</option>
            <option value="within5">5年以内</option>
            <option value="later">それ以降</option>
          </select>
          <button style={btnP} onClick={addItem}>追加する</button>
        </Sheet>

        <Sheet open={!!editItem} onClose={()=>setEditItem(null)} title="編集">
          <span style={lbl}>内容</span>
          <input style={iS} value={fTitle} onChange={e=>setFTitle(e.target.value)}/>
          <span style={lbl}>カテゴリ</span>
          <select style={iS} value={fCat} onChange={e=>setFCat(e.target.value)}>
            {categories.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
          </select>
          <span style={lbl}>いつまでに？（任意）</span>
          <select style={iS} value={fDate} onChange={e=>setFDate(e.target.value)}>
            <option value="">選択しない</option>
            <option value="thisyear">今年</option>
            <option value="nextyear">来年</option>
            <option value="within5">5年以内</option>
            <option value="later">それ以降</option>
          </select>
          <button style={btnP} onClick={saveItem}>保存する</button>
          <button style={btnD} onClick={()=>editItem&&deleteItem(editItem.id)}>削除する</button>
          <button style={btnG} onClick={()=>setEditItem(null)}>キャンセル</button>
        </Sheet>

        <Sheet open={catOpen} onClose={()=>setCatOpen(false)} title="カテゴリ管理">
          {categories.map(cat=>(
            <div key={cat.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:10, marginBottom:6, background:C.bg, border:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:cat.color }}/>
                <span style={{ fontSize:14, fontFamily:"'Noto Sans JP',sans-serif", color:C.text }}>{cat.emoji} {cat.name}</span>
              </div>
              <button onClick={()=>{setEditCat(cat);setFCName(cat.name);setFCEmoji(cat.emoji);setCatOpen(false);}} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12, color:C.sub, fontFamily:"'Noto Sans JP',sans-serif" }}>編集</button>
            </div>
          ))}
          <button style={btnP} onClick={()=>{setCatOpen(false);setFCName("");setFCEmoji("⭐");setAddCatOpen(true);}}>＋ カテゴリを追加</button>
        </Sheet>

        <Sheet open={addCatOpen} onClose={()=>setAddCatOpen(false)} title="カテゴリを追加">
          <div style={{ display:"flex", gap:8 }}>
            <input style={{...iS,width:60,textAlign:"center",fontSize:22,padding:"8px 4px"}} placeholder="🌷" value={fCEmoji} onChange={e=>setFCEmoji(e.target.value)}/>
            <input style={{...iS,flex:1}} placeholder="カテゴリ名" value={fCName} onChange={e=>setFCName(e.target.value)} autoFocus/>
          </div>
          <button style={btnP} onClick={addCat}>追加する</button>
        </Sheet>

        <Sheet open={!!editCat} onClose={()=>setEditCat(null)} title="カテゴリを編集">
          <div style={{ display:"flex", gap:8 }}>
            <input style={{...iS,width:60,textAlign:"center",fontSize:22,padding:"8px 4px"}} value={fCEmoji} onChange={e=>setFCEmoji(e.target.value)}/>
            <input style={{...iS,flex:1}} value={fCName} onChange={e=>setFCName(e.target.value)}/>
          </div>
          <button style={btnP} onClick={saveCat}>保存する</button>
          <button style={btnD} onClick={()=>editCat&&deleteCat(editCat.id)}>削除する（中のアイテムも削除）</button>
          <button style={btnG} onClick={()=>setEditCat(null)}>キャンセル</button>
        </Sheet>

        <Celebration active={cele.active} title={cele.title} onDone={()=>setCele({active:false,title:""})}/>
      </div>
    </>
  );
}
