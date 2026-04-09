import { useState, useEffect } from "react";

const DEFAULT_CATEGORIES = [
  { id: "book",   name: "読みたい本",           emoji: "📚", color: "#f8a5c2" },
  { id: "place",  name: "行きたい場所",          emoji: "📍", color: "#c9b1ff" },
  { id: "food",   name: "行きたいお店",          emoji: "🍽️", color: "#86e3ce" },
  { id: "person", name: "会いたい人",            emoji: "👥", color: "#84b9ef" },
  { id: "goal",   name: "達成したいこと",        emoji: "⭐", color: "#ffe08a" },
  { id: "want",   name: "欲しいもの",            emoji: "🛍️", color: "#ffb347" },
  { id: "health", name: "健康のためにしたいこと", emoji: "💪", color: "#a8e6cf" },
  { id: "event",  name: "行きたいオフ会",        emoji: "🎉", color: "#ffd3e0" },
];

function Tulip({ x, y, color, size, delay, animate }) {
  return (
    <g style={{
      opacity: animate ? 1 : 0,
      transform: animate ? `translate(${x}px,${y}px) scale(1)` : `translate(${x}px,${y}px) scale(0)`,
      transformOrigin: `${x}px ${y}px`,
      transition: `opacity 0.5s ease ${delay}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
    }}>
      <line x1={x} y1={y} x2={x} y2={y - size * 1.5} stroke="#5a9e5a" strokeWidth={size * 0.12} strokeLinecap="round" />
      <ellipse cx={x - size*0.4} cy={y - size*0.7} rx={size*0.25} ry={size*0.1} fill="#6db86d" transform={`rotate(-35,${x-size*0.4},${y-size*0.7})`} />
      <ellipse cx={x + size*0.4} cy={y - size*0.95} rx={size*0.25} ry={size*0.1} fill="#6db86d" transform={`rotate(35,${x+size*0.4},${y-size*0.95})`} />
      <ellipse cx={x - size*0.18} cy={y - size*1.85} rx={size*0.22} ry={size*0.45} fill={color} transform={`rotate(-15,${x-size*0.18},${y-size*1.85})`} />
      <ellipse cx={x + size*0.18} cy={y - size*1.85} rx={size*0.22} ry={size*0.45} fill={color} transform={`rotate(15,${x+size*0.18},${y-size*1.85})`} />
      <ellipse cx={x} cy={y - size*2} rx={size*0.22} ry={size*0.45} fill={color} />
      <ellipse cx={x} cy={y - size*1.7} rx={size*0.3} ry={size*0.2} fill={color} opacity="0.7" />
    </g>
  );
}

function TulipCelebration({ active, onDone }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setAnimate(true), 50);
    const t2 = setTimeout(() => { setAnimate(false); setTimeout(onDone, 600); }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  if (!active && !animate) return null;

  const tulips = [
    { x: 40,  y: 520, color: "#ff6b9d", size: 26, delay: 0.00 },
    { x: 110, y: 505, color: "#ff8fab", size: 22, delay: 0.10 },
    { x: 180, y: 515, color: "#c77dff", size: 28, delay: 0.15 },
    { x: 250, y: 500, color: "#ff6b9d", size: 24, delay: 0.20 },
    { x: 320, y: 510, color: "#ffd166", size: 20, delay: 0.05 },
    { x: 380, y: 520, color: "#c77dff", size: 22, delay: 0.25 },
    { x: 70,  y: 540, color: "#ffd166", size: 18, delay: 0.30 },
    { x: 150, y: 545, color: "#ff6b9d", size: 20, delay: 0.12 },
    { x: 230, y: 535, color: "#ff8fab", size: 24, delay: 0.22 },
    { x: 310, y: 540, color: "#c77dff", size: 18, delay: 0.08 },
    { x: 360, y: 545, color: "#ff6b9d", size: 16, delay: 0.18 },
  ];

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:100,
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      background:"rgba(255,255,255,0.88)",
      backdropFilter:"blur(6px)",
    }}>
      <div style={{ fontSize:56, marginBottom:8 }}>🐻</div>
      <div style={{
        fontSize:30, fontWeight:800, color:"#c77dff",
        fontFamily:"'Zen Maru Gothic',sans-serif",
        opacity: animate ? 1 : 0,
        transform: animate ? "scale(1)" : "scale(0.5)",
        transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
      }}>かっこいい！</div>
      <div style={{
        fontSize:15, color:"#bbb", marginTop:6,
        fontFamily:"'Zen Maru Gothic',sans-serif",
        opacity: animate ? 1 : 0,
        transition:"opacity 0.4s ease 0.4s",
      }}>たっせい！🌷</div>
      <svg viewBox="0 0 430 560" width="100%" height="100%"
        style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        {tulips.map((t,i) => <Tulip key={i} {...t} animate={animate} />)}
      </svg>
      <button onClick={() => { setAnimate(false); setTimeout(onDone, 400); }} style={{
        marginTop:36, padding:"13px 40px",
        background:"linear-gradient(135deg,#f8a5c2,#c77dff)",
        border:"none", borderRadius:99, color:"#fff",
        fontSize:16, fontWeight:700, cursor:"pointer",
        fontFamily:"'Zen Maru Gothic',sans-serif",
        boxShadow:"0 4px 20px rgba(199,125,255,0.45)",
        opacity: animate ? 1 : 0,
        transition:"opacity 0.4s ease 0.5s",
        position:"relative", zIndex:10,
      }}>やったー！</button>
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:50,
      background:"rgba(0,0,0,0.28)",
      display:"flex", alignItems:"flex-end", justifyContent:"center",
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"#fff", borderRadius:"24px 24px 0 0",
        padding:"24px 20px 44px", width:"100%", maxWidth:480,
        boxShadow:"0 -8px 40px rgba(0,0,0,0.12)",
      }}>
        {title && <div style={{
          fontSize:17, fontWeight:700, marginBottom:16, color:"#444",
          fontFamily:"'Zen Maru Gothic',sans-serif",
        }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [items, setItems]           = useState([]);
  const [activeTab, setActiveTab]   = useState("all");
  const [celebration, setCelebration] = useState(false);

  const [addItemOpen, setAddItemOpen]   = useState(false);
  const [editItem, setEditItem]         = useState(null);
  const [catMgmtOpen, setCatMgmtOpen]   = useState(false);
  const [addCatOpen, setAddCatOpen]     = useState(false);
  const [editCat, setEditCat]           = useState(null);

  const [fTitle, setFTitle]   = useState("");
  const [fCat,   setFCat]     = useState("");
  const [fDate,  setFDate]    = useState("");
  const [fCName, setFCName]   = useState("");
  const [fCEmoji,setFCEmoji]  = useState("✨");

  const visible = activeTab === "all" ? items : items.filter(i => i.categoryId === activeTab);
  const done  = items.filter(i => i.done).length;
  const total = items.length;

  function toggleDone(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (!item.done) setCelebration(true);
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  }

  function addItem() {
    if (!fTitle.trim()) return;
    const catId = fCat || categories[0]?.id;
    setItems([...items, {
      id: Date.now().toString(),
      title: fTitle.trim(),
      categoryId: catId,
      targetDate: fDate,
      done: false,
      createdAt: new Date().toISOString(),
    }]);
    setFTitle(""); setFDate(""); setFCat("");
    setAddItemOpen(false);
  }

  function saveItem() {
    if (!editItem || !fTitle.trim()) return;
    setItems(items.map(i => i.id === editItem.id
      ? { ...i, title: fTitle.trim(), categoryId: fCat || i.categoryId, targetDate: fDate }
      : i));
    setEditItem(null);
  }

  function deleteItem(id) {
    setItems(items.filter(i => i.id !== id));
    setEditItem(null);
  }

  function addCat() {
    if (!fCName.trim()) return;
    const palette = ["#f8a5c2","#c9b1ff","#86e3ce","#84b9ef","#ffe08a","#ffb347","#a8e6cf"];
    setCategories([...categories, {
      id: Date.now().toString(),
      name: fCName.trim(), emoji: fCEmoji,
      color: palette[Math.floor(Math.random()*palette.length)],
    }]);
    setFCName(""); setFCEmoji("✨");
    setAddCatOpen(false);
  }

  function saveCat() {
    if (!editCat || !fCName.trim()) return;
    setCategories(categories.map(c => c.id === editCat.id
      ? { ...c, name: fCName.trim(), emoji: fCEmoji } : c));
    setEditCat(null);
  }

  function deleteCat(id) {
    setCategories(categories.filter(c => c.id !== id));
    setItems(items.filter(i => i.categoryId !== id));
    if (activeTab === id) setActiveTab("all");
    setEditCat(null);
  }

  const iS = {
    width:"100%", padding:"12px 14px", borderRadius:12,
    border:"1.5px solid #e8e0f0", fontSize:15, outline:"none",
    fontFamily:"'Zen Maru Gothic',sans-serif", boxSizing:"border-box",
    background:"#fafafa",
  };
  const btnP = {
    width:"100%", padding:14, borderRadius:99,
    background:"linear-gradient(135deg,#f8a5c2,#c77dff)",
    border:"none", color:"#fff", fontSize:15, fontWeight:700,
    cursor:"pointer", fontFamily:"'Zen Maru Gothic',sans-serif", marginTop:12,
  };
  const btnD = { ...btnP, background:"linear-gradient(135deg,#ff8a80,#ff5252)", marginTop:8 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}
        body{background:#f0e8ff;}
      `}</style>
      <div style={{
        minHeight:"100vh",
        background:"linear-gradient(160deg,#ffe0f0 0%,#ede0ff 45%,#dce8ff 100%)",
        fontFamily:"'Zen Maru Gothic',sans-serif",
        maxWidth:480, margin:"0 auto", position:"relative",
      }}>
        <div style={{ padding:"28px 20px 0", textAlign:"center" }}>
          <div style={{ fontSize:26, fontWeight:800, color:"#7c4dbd", letterSpacing:1 }}>
            🐻 わたしのバケットリスト
          </div>
          <div style={{ fontSize:13, color:"#b09ed4", marginTop:4 }}>
            やりたいことを全部かなえよう！
          </div>
        </div>
        <div style={{
          margin:"16px 20px 0",
          background:"rgba(255,255,255,0.7)",
          borderRadius:20, padding:"16px 0",
          display:"flex", justifyContent:"space-around",
          backdropFilter:"blur(8px)",
        }}>
          {[["ぜんぶ",total],["たっせい",done],["のこり",total-done]].map(([label,val])=>(
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ fontSize:28, fontWeight:800, color:"#7c4dbd" }}>{val}</div>
              <div style={{ fontSize:12, color:"#b09ed4" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{
          display:"flex", overflowX:"auto", gap:8,
          padding:"14px 20px 4px", scrollbarWidth:"none",
        }}>
          {[{ id:"all", name:"すべて", emoji:"", color:"#c77dff" }, ...categories].map(cat => {
            const active = activeTab === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
                flexShrink:0, padding:"8px 14px", borderRadius:99,
                border:"none", cursor:"pointer",
                background: active ? (cat.color || "#c77dff") : "rgba(255,255,255,0.75)",
                color: active ? "#fff" : "#9e7bc4",
                fontWeight:700, fontSize:13,
                fontFamily:"'Zen Maru Gothic',sans-serif",
                transition:"all 0.2s",
                boxShadow: active ? `0 3px 10px ${cat.color || "#c77dff"}88` : "none",
              }}>
                {cat.emoji ? `${cat.emoji} ` : ""}{cat.name}
              </button>
            );
          })}
        </div>
        <div style={{ padding:"12px 20px 130px" }}>
          {visible.length === 0 && (
            <div style={{ textAlign:"center", color:"#c4b0e0", padding:"60px 0", fontSize:14 }}>
              <div style={{ fontSize:44, marginBottom:12 }}>🌷</div>
              まだ登録がないよ！<br />やりたいことを追加しよう
            </div>
          )}
          {visible.map(item => {
            const cat = categories.find(c => c.id === item.categoryId);
            return (
              <div key={item.id} style={{
                display:"flex", alignItems:"center", gap:12,
                background: item.done ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.88)",
                borderRadius:16, padding:"14px 16px", marginBottom:10,
                boxShadow:"0 2px 12px rgba(180,150,220,0.1)",
                borderLeft:`4px solid ${cat?.color||"#c77dff"}`,
                opacity: item.done ? 0.6 : 1,
                transition:"all 0.2s",
              }}>
                <div onClick={() => toggleDone(item.id)} style={{
                  width:28, height:28, borderRadius:"50%", flexShrink:0,
                  background: item.done ? "linear-gradient(135deg,#f8a5c2,#c77dff)" : "transparent",
                  border: item.done ? "none" : "2px solid #d4b8f0",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", transition:"all 0.25s",
                }}>
                  {item.done && <span style={{ color:"#fff", fontSize:14 }}>✓</span>}
                </div>
                <div style={{ flex:1, minWidth:0, cursor:"pointer" }} onClick={() => {
                  setEditItem(item); setFTitle(item.title);
                  setFCat(item.categoryId); setFDate(item.targetDate||"");
                }}>
                  <div style={{
                    fontSize:15, fontWeight:600, color:"#444",
                    textDecoration: item.done ? "line-through" : "none",
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                  }}>{cat?.emoji} {item.title}</div>
                  <div style={{ fontSize:11, color:"#b0a0c8", marginTop:2 }}>
                    {cat?.name}{item.targetDate ? ` ・ 🗓 ${item.targetDate}` : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{
          position:"fixed", bottom:28, right:16,
          display:"flex", flexDirection:"column", gap:10, zIndex:40,
        }}>
          <button onClick={() => setCatMgmtOpen(true)} style={{
            width:46, height:46, borderRadius:"50%",
            background:"rgba(255,255,255,0.92)",
            border:"2px solid #e0d0f8", fontSize:20,
            cursor:"pointer", boxShadow:"0 4px 16px rgba(180,150,220,0.3)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>⚙️</button>
          <button onClick={() => {
            setFTitle(""); setFDate("");
            setFCat(activeTab !== "all" ? activeTab : categories[0]?.id||"");
            setAddItemOpen(true);
          }} style={{
            width:54, height:54, borderRadius:"50%",
            background:"linear-gradient(135deg,#f8a5c2,#c77dff)",
            border:"none", fontSize:26, color:"#fff",
            cursor:"pointer", boxShadow:"0 6px 24px rgba(199,125,255,0.5)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>＋</button>
        </div>
        <Modal open={addItemOpen} onClose={()=>setAddItemOpen(false)} title="📝 やりたいことを追加">
          <input style={iS} placeholder="なにをしたい？" value={fTitle} onChange={e=>setFTitle(e.target.value)} autoFocus />
          <div style={{marginTop:10}}>
            <select style={iS} value={fCat} onChange={e=>setFCat(e.target.value)}>
              {categories.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>
          </div>
          <div style={{marginTop:10}}>
            <label style={{fontSize:12,color:"#b09ed4"}}>目標年月（任意）</label>
            <input style={{...iS,marginTop:4}} type="month" value={fDate} onChange={e=>setFDate(e.target.value)} />
          </div>
          <button style={btnP} onClick={addItem}>追加する 🌷</button>
        </Modal>
        <Modal open={!!editItem} onClose={()=>setEditItem(null)} title="✏️ 編集">
          <input style={iS} placeholder="なにをしたい？" value={fTitle} onChange={e=>setFTitle(e.target.value)} />
          <div style={{marginTop:10}}>
            <select style={iS} value={fCat} onChange={e=>setFCat(e.target.value)}>
              {categories.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>
          </div>
          <div style={{marginTop:10}}>
            <label style={{fontSize:12,color:"#b09ed4"}}>目標年月（任意）</label>
            <input style={{...iS,marginTop:4}} type="month" value={fDate} onChange={e=>setFDate(e.target.value)} />
          </div>
          <button style={btnP} onClick={saveItem}>保存する</button>
          <button style={btnD} onClick={()=>editItem&&deleteItem(editItem.id)}>削除する</button>
        </Modal>
        <Modal open={catMgmtOpen} onClose={()=>setCatMgmtOpen(false)} title="📂 カテゴリ管理">
          <div style={{maxHeight:300,overflowY:"auto"}}>
            {categories.map(cat=>(
              <div key={cat.id} style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"10px 12px", borderRadius:12, marginBottom:6, background:"#f8f0ff",
              }}>
                <span style={{fontSize:14}}>{cat.emoji} {cat.name}</span>
                <button onClick={()=>{ setEditCat(cat); setFCName(cat.name); setFCEmoji(cat.emoji); setCatMgmtOpen(false); }} style={{
                  background:"none", border:"1px solid #d4b8f0",
                  borderRadius:8, padding:"4px 10px", cursor:"pointer",
                  fontSize:12, color:"#9e7bc4", fontFamily:"'Zen Maru Gothic',sans-serif",
                }}>編集</button>
              </div>
            ))}
          </div>
          <button style={btnP} onClick={()=>{ setCatMgmtOpen(false); setFCName(""); setFCEmoji("✨"); setAddCatOpen(true); }}>
            ＋ カテゴリを追加
          </button>
        </Modal>
        <Modal open={addCatOpen} onClose={()=>setAddCatOpen(false)} title="➕ カテゴリを追加">
          <div style={{display:"flex",gap:8}}>
            <input style={{...iS,width:60,textAlign:"center",fontSize:22,padding:"10px 4px"}}
              placeholder="🌷" value={fCEmoji} onChange={e=>setFCEmoji(e.target.value)} />
            <input style={{...iS,flex:1}} placeholder="カテゴリ名" value={fCName}
              onChange={e=>setFCName(e.target.value)} autoFocus />
          </div>
          <button style={btnP} onClick={addCat}>追加する</button>
        </Modal>
        <Modal open={!!editCat} onClose={()=>setEditCat(null)} title="✏️ カテゴリを編集">
          <div style={{display:"flex",gap:8}}>
            <input style={{...iS,width:60,textAlign:"center",fontSize:22,padding:"10px 4px"}}
              value={fCEmoji} onChange={e=>setFCEmoji(e.target.value)} />
            <input style={{...iS,flex:1}} value={fCName} onChange={e=>setFCName(e.target.value)} />
          </div>
          <button style={btnP} onClick={saveCat}>保存する</button>
          <button style={btnD} onClick={()=>editCat&&deleteCat(editCat.id)}>
            このカテゴリを削除（中のアイテムも削除）
          </button>
        </Modal>
        <TulipCelebration active={celebration} onDone={()=>setCelebration(false)} />
      </div>
    </>
  );
}