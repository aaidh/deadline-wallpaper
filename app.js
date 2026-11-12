/* Deadline Wallpaper — no data leaves this browser. */
const $ = id => document.getElementById(id);
const themes = [
  {name:'Forest',bg:'#172b26',fg:'#eef1df',accent:'#c4db9b',muted:'#a6b7a1'},
  {name:'Lavender',bg:'#28233d',fg:'#f0eafa',accent:'#c3b2f2',muted:'#b3a9c9'},
  {name:'Paper',bg:'#eee8da',fg:'#343d31',accent:'#536d45',muted:'#707965'},
  {name:'Midnight',bg:'#172333',fg:'#edf1fa',accent:'#9ec7ef',muted:'#a0b1c9'},
  {name:'Rose',bg:'#3c262b',fg:'#fff0e8',accent:'#efb6a3',muted:'#c5a4a5'}
];
const dateValue = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const inDays = n => {const d = new Date(); d.setDate(d.getDate()+n); return dateValue(d)};
// UTC calendar components avoid daylight-saving offsets in day differences.
function dayNumber(s){const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)/86400000}
function remaining(s){return dayNumber(s)-dayNumber(dateValue(new Date()))}
function countdown(n){return n===0?'TODAY':n===1?'1 DAY LEFT':n>1?`${n} DAYS LEFT`:n===-1?'1 DAY AGO':`${Math.abs(n)} DAYS AGO`}
let model={heading:'One thing at a time.',theme:0,size:'1170,2532',safe:true,deadlines:[{title:'Design project',date:inDays(3)},{title:'Final presentation',date:inDays(8)},{title:'A new beginning',date:inDays(21)}]};
try{const saved=JSON.parse(localStorage.getItem('deadline-wallpaper-v1'));if(saved&&typeof saved.heading==='string'&&themes[saved.theme]&&['1170,2532','1290,2796','1080,2400','1080,1920'].includes(saved.size)&&Array.isArray(saved.deadlines)&&saved.deadlines.length<=6&&saved.deadlines.every(d=>typeof d.title==='string'&&d.title.length<=48&&/^\d{4}-\d{2}-\d{2}$/.test(d.date)&&Number.isFinite(Date.parse(d.date))))model={...model,...saved,heading:saved.heading.slice(0,40),safe:!!saved.safe};}catch{}
function save(){try{localStorage.setItem('deadline-wallpaper-v1',JSON.stringify(model));document.querySelector('.local-badge').textContent='Saved on this device'}catch{document.querySelector('.local-badge').textContent='Unsaved · storage unavailable';$('status').textContent='Browser storage is unavailable. You can still download your wallpaper.'}}
function renderRows(){
  $('deadlines').replaceChildren();
  model.deadlines.forEach((d,i)=>{
    const row=document.createElement('div');row.className='deadline';
    const title=document.createElement('input');title.type='text';title.maxLength=48;title.placeholder='Deadline name';title.value=d.title;title.setAttribute('aria-label',`Deadline ${i+1} name`);
    const date=document.createElement('input');date.type='date';date.min='2000-01-01';date.max='2100-12-31';date.value=d.date;date.setAttribute('aria-label',`Deadline ${i+1} date`);
    title.addEventListener('input',()=>{d.title=title.value;update()});date.addEventListener('input',()=>{d.date=date.value;update()});
    const remove=document.createElement('button');remove.type='button';remove.className='remove';remove.textContent='×';remove.setAttribute('aria-label',`Remove deadline ${i+1}`);remove.onclick=()=>{model.deadlines.splice(i,1);renderRows();update();$('add').focus()};
    row.append(title,date,remove);$('deadlines').append(row);
  });
  $('count').textContent=`${model.deadlines.length} / 6`;$('add').disabled=model.deadlines.length>=6;
}
function fit(ctx,text,x,y,max,size,min=22){ctx.font=`500 ${size}px Arial`;while(ctx.measureText(text).width>max&&size>min){size-=1;ctx.font=`500 ${size}px Arial`}if(ctx.measureText(text).width>max){while(text.length&&ctx.measureText(text+'…').width>max)text=text.slice(0,-1);text+='…'}ctx.fillText(text,x,y)}
function draw(){
  const canvas=$('wallpaper');const [w,h]=model.size.split(',').map(Number);canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext('2d');const t=themes[model.theme];const s=w/1170;
  ctx.fillStyle=t.bg;ctx.fillRect(0,0,w,h);ctx.save();ctx.scale(s,s);const height=h/s;
  const gradient=ctx.createRadialGradient(1100,100,0,1100,100,1100);gradient.addColorStop(0,t.accent+'1c');gradient.addColorStop(1,t.accent+'00');ctx.fillStyle=gradient;ctx.fillRect(0,0,1170,height);
  ctx.strokeStyle=t.accent+'18';ctx.lineWidth=2;[340,470,600].forEach(r=>{ctx.beginPath();ctx.arc(1080,100,r,0,Math.PI*2);ctx.stroke()});
  let y=model.safe?height*.32:height*.13;
  ctx.fillStyle=t.muted;ctx.font='24px Arial';ctx.fillText('A LITTLE FOCUS. A LITTLE FORWARD.',96,y);
  y+=94;ctx.fillStyle=t.fg;fit(ctx,model.heading.trim()||'One thing at a time.',96,y,978,70,35);
  y+=55;ctx.fillStyle=t.muted;ctx.font='25px Arial';ctx.fillText(new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}),96,y);
  const items=model.deadlines.filter(d=>d.title.trim()&&d.date&&Number.isFinite(dayNumber(d.date))).sort((a,b)=>a.date.localeCompare(b.date));
  y+=80;const available=height-170-y;const step=Math.min(205,available/Math.max(items.length,1));
  if(!items.length){ctx.fillStyle=t.muted;ctx.font='32px Arial';ctx.fillText('Make space for what matters.',96,y+50)}
  items.forEach((d,i)=>{const top=y+i*step;ctx.strokeStyle=t.muted+'40';ctx.beginPath();ctx.moveTo(96,top);ctx.lineTo(1074,top);ctx.stroke();const n=remaining(d.date);ctx.fillStyle=t.fg;fit(ctx,d.title.trim(),96,top+step*.42,650,42,25);ctx.fillStyle=t.muted;ctx.font='24px Arial';ctx.fillText(new Date(d.date+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}),96,top+step*.72);ctx.fillStyle=t.accent;ctx.textAlign='right';ctx.font='bold 23px Arial';ctx.fillText(countdown(n),1074,top+step*.47);ctx.textAlign='left'});
  ctx.fillStyle=t.muted;ctx.font='23px Arial';ctx.fillText('YOU HAVE TIME. MAKE IT COUNT.',96,height-100);ctx.restore();
  $('dimensions').textContent=`${w} × ${h}`;
  $('theme-name').textContent=t.name;
  canvas.setAttribute('aria-label',`Wallpaper preview: ${model.heading}. ${items.map(d=>`${d.title}, ${countdown(remaining(d.date))}`).join('. ')}`);
}
function update(){save();draw()}
$('heading').value=model.heading;$('size').value=model.size;$('safe').checked=model.safe;
themes.forEach((t,i)=>{const b=document.createElement('button');b.type='button';b.className='swatch';b.style.background=t.bg;b.style.setProperty('--fg',t.fg);b.title=t.name;b.setAttribute('aria-label',t.name);b.setAttribute('aria-pressed',i===model.theme);b.onclick=()=>{model.theme=i;[...$('themes').children].forEach((el,j)=>el.setAttribute('aria-pressed',j===i));update()};$('themes').append(b)});
$('heading').oninput=e=>{model.heading=e.target.value;update()};$('size').onchange=e=>{model.size=e.target.value;update()};$('safe').onchange=e=>{model.safe=e.target.checked;update()};
$('add').onclick=()=>{model.deadlines.push({title:'',date:inDays(7)});renderRows();update();$('deadlines').lastElementChild.firstElementChild.focus()};
$('download').onclick=()=>{draw();$('wallpaper').toBlob(blob=>{if(!blob){$('status').textContent='Unable to create image. Please try again.';return}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`deadline-wallpaper-${dateValue(new Date())}.png`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);$('status').textContent='Downloaded! Set the PNG as your phone wallpaper.'},'image/png')};
renderRows();update();
document.addEventListener('visibilitychange',()=>{if(!document.hidden)draw()});
