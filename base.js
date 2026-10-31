(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const red=matchMedia('(prefers-reduced-motion:reduce)').matches;
function textNodesToWords(root,fn){(function w(n){[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t.trim()){f.append(t);return}f.append(fn(t,c.parentNode))});c.replaceWith(f)}else if(c.nodeType===1)w(c)})})(root)}
// headline: words rise one by one
const h=$('.sp');if(h){let i=0;textNodesToWords(h,t=>{const w=document.createElement('span');w.className='w';const s=document.createElement('i');s.textContent=t;s.style.setProperty('--i',i++);w.append(s);return w})}
// statement: words light up while scrolling
const p=$('#stm');if(p){textNodesToWords(p,(t,par)=>{const s=document.createElement('span');s.textContent=t;if(par.classList&&par.classList.contains('it'))s.className='it';return s});
 const ws=[...p.querySelectorAll('span')];const u=()=>{const r=p.getBoundingClientRect(),vh=innerHeight,k=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.3)));ws.forEach((w,i)=>w.classList.toggle('on',i/ws.length<k))};addEventListener('scroll',u,{passive:true});u()}
// reveal + counters
function count(el){if(el._d)return;el._d=1;const t=+el.dataset.n,d=1400,s=performance.now();(function f(n){const k=Math.min(1,(n-s)/d);el.textContent=Math.round(t*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(s)}
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');if(x.target.dataset.n)count(x.target);io.unobserve(x.target)}}),{threshold:.18});
$$('.rv,.clip,[data-n]').forEach(el=>io.observe(el));
// progress, parallax, sticky buy bar
const prog=$('.prog'),par=$('[data-par]'),st=$('.sticky'),hero=$('#top'),ab=$('#about')||$('.final');
function sc(){const y=scrollY;if(prog)prog.style.width=(y/Math.max(1,document.body.scrollHeight-innerHeight)*100)+'%';
 if(par&&!red&&y<innerHeight*1.2)par.style.transform=`translateY(${-y*.06}px)`;
 if(st&&hero&&ab)st.classList.toggle('show',y>hero.offsetHeight*.7&&ab.getBoundingClientRect().top>innerHeight*.5)}
addEventListener('scroll',sc,{passive:true});sc();
// photo tilts toward the mouse on desktop
const t=$('[data-tilt]');if(t&&!red&&matchMedia('(hover:hover) and (min-width:861px)').matches){const b=parseFloat(t.dataset.base||0);
 t.addEventListener('mousemove',e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`rotate(${b+x*4}deg) rotateX(${-y*6}deg) rotateY(${x*8}deg)`});
 t.addEventListener('mouseleave',()=>t.style.transform='')}
})();
