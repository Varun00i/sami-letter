(() => {
'use strict';
const PASSWORD='Varun123';
const screens=[...document.querySelectorAll('.screen')];
const body=document.body;
const progress=document.getElementById('progress');
const progressLabel=document.getElementById('progressLabel');
const music=document.getElementById('music');
const musicButton=document.getElementById('musicButton');
const gate=document.getElementById('passwordGate');
const drawer=document.getElementById('noteDrawer');
const scrim=document.getElementById('scrim');
const notes={
 chemistry:['A tiny chemistry note','No reaction, no defense, no clever explanation. Just an honest apology from me to you.'],
 brother:['Brother','The ordinary laughs, conversations and random moments are still some of the memories I value most.'],
 letter:['One quiet line','I wanted this to be a letter, not pressure. Read it only if you want to.'],
 multiverse:['Another timeline','Maybe there is a version of this story where I handled things better. I cannot reach that timeline. I can only learn from this one.'],
 saul:['No defense','I do not need a case for myself here. I know an apology does not erase what happened.'],
 dark:['Time & choices','I cannot change the past. I can choose what I do with what it taught me.'],
 hope:['Take your time','There is no deadline on forgiveness. You do not owe me an answer.']
};
let current=0;
function storageGet(k){try{return sessionStorage.getItem(k)}catch(e){try{return localStorage.getItem(k)}catch(_){return null}}}
function storageSet(k,v){try{sessionStorage.setItem(k,v)}catch(e){try{localStorage.setItem(k,v)}catch(_){}}}
function setTheme(n){body.dataset.theme=n===0?'cloud':screens[n].dataset.theme;}
function setProgress(n){progress.style.width=(n===0?0:n>=6?100:n*20)+'%';progressLabel.textContent=n===0?'LETTER':n>=6?'DONE':String(n).padStart(2,'0')+' / 05';}
function closeMenu(){document.getElementById('menuPanel').classList.remove('open');document.getElementById('menuButton').setAttribute('aria-expanded','false');}
function show(n,replace=false){n=Math.max(0,Math.min(6,n));screens.forEach((s,i)=>s.classList.toggle('active',i===n));current=n;body.dataset.screen=String(n);setTheme(n);setProgress(n);document.querySelectorAll('.note-rail').forEach(r=>r.style.display=n===6?'none':'');closeMenu();
  // This is a single document: navigation never creates a new page or destroys the audio element.
  document.documentElement.scrollTop=0;document.body.scrollTop=0;window.scrollTo(0,0);
  const hash=n===0?'#cover':n===6?'#thank-you':'#chapter-'+n;
  if(replace)history.replaceState({n},'',hash); else if(location.hash!==hash)history.pushState({n},'',hash);
}
function navFromHash(){if(location.hash==='#thank-you') return 6; const m=location.hash.match(/chapter-(\d+)/);return m?Math.max(1,Math.min(5,Number(m[1]))):0;}
function openGate(){gate.classList.add('open');gate.setAttribute('aria-hidden','false');document.getElementById('passwordInput').focus();}
function closeGate(){gate.classList.remove('open');gate.setAttribute('aria-hidden','true');document.getElementById('passwordError').textContent='';}
function unlock(){const input=document.getElementById('passwordInput');if(input.value===PASSWORD){storageSet('sami-unlocked','1');closeGate();show(1);}else{document.getElementById('passwordError').textContent='That password does not match. Try again.';input.select();}}
function openNote(key){const d=notes[key]||notes.letter;document.getElementById('noteTitle').textContent=d[0];document.getElementById('noteBody').textContent=d[1];drawer.classList.add('open');scrim.classList.add('open');drawer.setAttribute('aria-hidden','false');}
function closeNote(){drawer.classList.remove('open');scrim.classList.remove('open');drawer.setAttribute('aria-hidden','true');}
function setMusicUI(){musicButton.classList.toggle('playing',!music.paused);musicButton.setAttribute('aria-label',music.paused?'Play background music':'Pause background music');}
async function toggleMusic(){try{if(music.paused){await music.play();}else{music.pause();}}catch(e){/* browser autoplay policy: user can tap again */}setMusicUI();}
music.loop=true;music.addEventListener('play',setMusicUI);music.addEventListener('pause',setMusicUI);music.addEventListener('ended',()=>{music.currentTime=0;music.play().catch(()=>{});});
musicButton.addEventListener('click',toggleMusic);
document.getElementById('openLetter').addEventListener('click',()=>{if(storageGet('sami-unlocked')==='1')show(1);else openGate();});
document.getElementById('passwordSubmit').addEventListener('click',unlock);document.getElementById('passwordInput').addEventListener('keydown',e=>{if(e.key==='Enter')unlock();});document.getElementById('gateClose').addEventListener('click',closeGate);
document.getElementById('noteClose').addEventListener('click',closeNote);scrim.addEventListener('click',closeNote);
document.getElementById('menuButton').addEventListener('click',()=>{const p=document.getElementById('menuPanel');p.classList.toggle('open');document.getElementById('menuButton').setAttribute('aria-expanded',p.classList.contains('open'));});
document.addEventListener('click',e=>{const n=e.target.closest('[data-nav]');if(n){e.preventDefault();const target=Number(n.dataset.nav);if(target===0||storageGet('sami-unlocked')==='1')show(target);else openGate();return;}const note=e.target.closest('[data-note]');if(note){e.preventDefault();openNote(note.dataset.note);}});
window.addEventListener('popstate',()=>show(navFromHash(),true));
window.addEventListener('hashchange',()=>{const n=navFromHash();if(n!==current)show(n,true);});
// Fresh deployment always starts at the top, even if the browser restores a previous scroll position.
if(!location.hash){history.replaceState({n:0},'',location.pathname+location.search+'#cover');}
show(navFromHash(),true);
})();
