(function(){
  'use strict';
  const gate=document.getElementById('rzPermissionGate');
  const button=document.getElementById('rzEnablePermissions');
  if(!gate || !button) return;

  const role=(document.body && document.body.classList.contains('admin-body')) ? 'admin' :
    (location.pathname.toLowerCase().includes('responder') ? 'responder' : 'user');
  const key='rz_permissions_'+role;

  function closeGate(){
    localStorage.setItem(key,'1');
    gate.classList.add('hidden');
    // The gate has an inline !important display rule, so the CSS .hidden
    // class alone cannot hide it. Override that inline rule explicitly.
    gate.style.setProperty('display','none','important');
    gate.setAttribute('aria-hidden','true');
  }

  if(localStorage.getItem(key)==='1'){
    closeGate();
    return;
  }

  async function enable(){
    if(button.dataset.busy==='1') return;
    button.dataset.busy='1';
    button.disabled=true;
    button.textContent='Enabling…';

    // Do NOT wait for browser permission dialogs. Some browsers keep these
    // pending for a long time; the app should continue immediately.
    try{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(()=>{},()=>{},
          {enableHighAccuracy:true,timeout:8000,maximumAge:0});
      }
    }catch(e){}

    try{
      if('Notification' in window && Notification.permission==='default'){
        Promise.resolve(Notification.requestPermission()).catch(()=>{});
      }
    }catch(e){}

    // iOS requires motion permission to be requested from a user gesture.
    try{
      if(typeof DeviceMotionEvent!=='undefined' &&
         typeof DeviceMotionEvent.requestPermission==='function'){
        Promise.resolve(DeviceMotionEvent.requestPermission()).catch(()=>{});
      }
    }catch(e){}

    // Start/resume audio directly inside the click gesture.
    try{
      const C=window.AudioContext||window.webkitAudioContext;
      if(C){
        const audio=window._rzAudio || new C();
        window._rzAudio=audio;
        if(audio.state==='suspended') Promise.resolve(audio.resume()).catch(()=>{});
      }
    }catch(e){}

    try{if(navigator.vibrate) navigator.vibrate(30);}catch(e){}

    // Continue immediately; browser permission prompts can remain open separately.
    closeGate();
    button.textContent='Continue';
  }

  button.addEventListener('click',enable,{passive:false});
  button.addEventListener('touchend',function(e){
    // Helps mobile browsers where click can be delayed/blocked by overlays.
    e.preventDefault();
    enable();
  },{passive:false});
})();
