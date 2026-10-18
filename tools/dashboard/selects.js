// Keep the native select as the source of truth for existing change handlers.
(() => {
  const controls = new WeakMap();
  let opened = null;
  function enhance() {
    for (const select of document.querySelectorAll('#uiLanguage, #engineSelect')) {
      let c = controls.get(select);
      if (!c) {
        const wrapper = document.createElement('div');
        wrapper.className = `custom-select ${select.id === 'uiLanguage' ? 'language-select' : ''}`;
        select.before(wrapper); wrapper.append(select);
        const trigger = document.createElement('button');
        trigger.type = 'button'; trigger.className = 'select-trigger'; trigger.setAttribute('role','combobox');
        trigger.setAttribute('aria-haspopup','listbox'); trigger.setAttribute('aria-expanded','false');
        const value = document.createElement('span');
        const arrow = document.createElementNS('http://www.w3.org/2000/svg','svg');
        arrow.setAttribute('viewBox','0 0 16 16'); arrow.setAttribute('class','chevron'); arrow.setAttribute('aria-hidden','true');
        arrow.innerHTML = '<path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
        trigger.append(value,arrow);
        const menu = document.createElement('div'); menu.className = 'select-menu'; menu.hidden = true;
        menu.id = `${select.id}-menu`; menu.setAttribute('role','listbox'); trigger.setAttribute('aria-controls',menu.id);
        wrapper.append(trigger,menu);
        c = {select,wrapper,trigger,value,menu,index:0,key:''}; controls.set(select,c);
        c.close = () => { menu.hidden = true; trigger.setAttribute('aria-expanded','false'); trigger.removeAttribute('aria-activedescendant'); if (opened === c) opened = null; };
        c.highlight = () => {
          [...menu.children].forEach((el,i)=>el.classList.toggle('active',i===c.index));
          if (!menu.hidden && menu.children[c.index]) trigger.setAttribute('aria-activedescendant',menu.children[c.index].id);
        };
        c.open = () => {
          if (select.disabled) return;
          opened?.close(); opened = c; c.index = Math.max(0,select.selectedIndex);
          menu.hidden = false; trigger.setAttribute('aria-expanded','true'); c.highlight();
        };
        c.choose = index => {
          const option = select.options[index]; if (!option || option.disabled) return;
          select.value = option.value; c.close(); trigger.focus();
          select.dispatchEvent(new Event('change',{bubbles:true})); enhance();
        };
        trigger.addEventListener('click',e=>{ e.preventDefault(); menu.hidden ? c.open() : c.close(); });
        trigger.addEventListener('keydown',e=>{
          if (e.key === 'Escape') { c.close(); return; }
          if (e.key === 'Tab') { c.close(); return; }
          if (['ArrowDown','ArrowUp','Home','End'].includes(e.key)) {
            e.preventDefault(); if (menu.hidden) c.open();
            else if (e.key === 'Home') c.index=0;
            else if (e.key === 'End') c.index=select.options.length-1;
            else c.index=(c.index+(e.key==='ArrowDown'?1:-1)+select.options.length)%select.options.length;
            c.highlight();
          } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); menu.hidden ? c.open() : c.choose(c.index);
          }
        });
        // Keep focus on the combobox until the option's click is handled.
        menu.addEventListener('pointerdown',e=>e.preventDefault());
        menu.addEventListener('click',e=>{ const option=e.target.closest('[data-index]'); if(option) c.choose(Number(option.dataset.index)); });
        menu.addEventListener('pointermove',e=>{ const option=e.target.closest('[data-index]'); if(option) {c.index=Number(option.dataset.index);c.highlight();} });
        wrapper.addEventListener('focusout',e=>{ if (!wrapper.contains(e.relatedTarget)) c.close(); });
      }
      const label = select.getAttribute('aria-label') || '';
      if (c.trigger.getAttribute('aria-label') !== label) c.trigger.setAttribute('aria-label',label);
      if (c.trigger.disabled !== select.disabled) c.trigger.disabled=select.disabled;
      if (select.disabled) c.close();
      const text = select.selectedOptions[0]?.textContent || '';
      if (c.value.textContent !== text) c.value.textContent=text;
      const key = JSON.stringify([...select.options].map(o=>[o.value,o.textContent,o.selected,o.disabled]));
      if (c.key !== key) {
        c.key=key; c.menu.replaceChildren();
        [...select.options].forEach((o,i)=>{
          const el=document.createElement('div'); el.className='select-option'; el.id=`${select.id}-option-${i}`;
          el.dataset.index=String(i);el.setAttribute('role','option');el.setAttribute('aria-selected',String(o.selected));
          const label=document.createElement('span');label.textContent=o.textContent;
          const tick=document.createElement('span');tick.className='tick';tick.textContent='✓';tick.setAttribute('aria-hidden','true');
          el.append(label,tick);c.menu.append(el);
        });
        c.highlight();
      }
    }
  }
  document.addEventListener('pointerdown',e=>{if(opened && !opened.wrapper.contains(e.target)) opened.close();});
  // Only source-select mutations matter; custom-menu updates must not trigger a loop.
  new MutationObserver(records=>{
    if (records.some(r=>r.target.closest?.('select') || [...r.addedNodes].some(n=>n.nodeType===1 && (n.matches?.('#engineSelect') || n.querySelector?.('#engineSelect'))))) enhance();
  }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['disabled','aria-label']});
  enhance();
})();
