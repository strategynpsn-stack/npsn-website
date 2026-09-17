
(function(){
const nav=document.querySelector('.menu'), toggles=document.querySelectorAll('.menu-toggle');
if(toggles.length>1) toggles[1].addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.menu a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
const search=document.querySelector('[data-filter]');
if(search){const items=[...document.querySelectorAll('[data-item]')];search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();items.forEach(x=>x.hidden=q&&!x.textContent.toLowerCase().includes(q))})}
})();
