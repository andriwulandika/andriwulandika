/* editorial-ui.js — interaksi shared untuk seluruh halaman "Editorial Premium"
   (nav mobile, marquee, filter portofolio, FAQ accordion, scroll reveal,
   Lenis smooth-scroll, parallax, tombol magnetik, animasi jaringan di hero).
   Semua blok mengecek dulu elemen ada sebelum jalan, jadi aman dipakai di
   halaman mana pun tanpa perlu semua section ada. */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(pointer:fine)').matches;

  /* ---- Mobile nav ---- */
  var burger=document.getElementById('burger'), mnav=document.getElementById('mnav');
  if(burger){ burger.addEventListener('click', function(){ var open=mnav.classList.toggle('open'); burger.setAttribute('aria-expanded', open?'true':'false'); }); }
  mnav && mnav.addEventListener('click', function(e){ if(e.target.tagName==='A'){ mnav.classList.remove('open'); burger&&burger.setAttribute('aria-expanded','false'); } });

  /* ---- Marquee: duplicate for seamless loop ---- */
  var t=document.getElementById('mtrack'); if(t){ t.innerHTML=t.innerHTML+t.innerHTML; }

  /* ---- Portfolio / list filter ---- */
  var filters=document.querySelectorAll('.filter'), projs=document.querySelectorAll('.proj');
  if(filters.length && projs.length){
    filters.forEach(function(f){ f.addEventListener('click', function(){
      filters.forEach(function(x){ x.classList.remove('active'); }); f.classList.add('active');
      var cat=f.getAttribute('data-filter');
      projs.forEach(function(p){ p.classList.toggle('hide', cat!=='all' && p.getAttribute('data-cat')!==cat); });
    }); });
  }

  /* ---- FAQ accordion ---- */
  var faqItems=document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var btn=item.querySelector('.faq-q'); if(!btn) return;
    btn.addEventListener('click', function(){
      var was=item.classList.contains('open');
      faqItems.forEach(function(i){ i.classList.remove('open'); });
      if(!was) item.classList.add('open');
    });
  });

  /* ---- Scroll reveal ---- */
  var reveals=document.querySelectorAll('.reveal');
  if(reduce || !('IntersectionObserver' in window)){
    reveals.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
    reveals.forEach(function(el){ io.observe(el); });
  }

  /* ---- Lenis smooth scroll ---- */
  var lenis=null;
  if(!reduce && window.Lenis){
    lenis=new Lenis({ duration:1.1, smoothWheel:true, easing:function(x){ return Math.min(1,1.001-Math.pow(2,-10*x)); } });
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
  /* Anchor links -> smooth scroll to target (works with or without Lenis) */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    var id=a.getAttribute('href');
    if(id==='#' || id.length<2) return;
    a.addEventListener('click', function(e){
      var target=document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      if(lenis){ lenis.scrollTo(target, { offset:-80 }); }
      else { var y=target.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top:y, behavior:reduce?'auto':'smooth' }); }
    });
  });

  /* ---- Parallax on project/portfolio images ---- */
  var pElems=Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if(!reduce && pElems.length){
    var ticking=false;
    function updateParallax(){
      var vh=window.innerHeight;
      pElems.forEach(function(img){
        var r=img.getBoundingClientRect();
        if(r.bottom<0 || r.top>vh) return;
        var progress=(r.top + r.height/2 - vh/2) / vh;
        var shift=Math.max(-18, Math.min(18, -progress*22));
        img.style.transform='translateY('+shift.toFixed(1)+'px)';
      });
      ticking=false;
    }
    function onScroll(){ if(!ticking){ ticking=true; requestAnimationFrame(updateParallax); } }
    if(lenis){ lenis.on('scroll', onScroll); } else { window.addEventListener('scroll', onScroll, { passive:true }); }
    window.addEventListener('resize', onScroll); updateParallax();
  }

  /* ---- Magnetic buttons ---- */
  if(finePointer && !reduce){
    document.querySelectorAll('[data-magnetic]').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var r=el.getBoundingClientRect();
        var mx=e.clientX-(r.left+r.width/2), my=e.clientY-(r.top+r.height/2);
        el.style.transform='translate('+(mx*0.22).toFixed(1)+'px,'+(my*0.30).toFixed(1)+'px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform=''; });
    });
  }

  /* ---- Signature hero animation: "jaringan konektivitas" ----
     Titik-titik yang melayang lambat, terhubung garis tipis saat berdekatan —
     melambangkan transformasi digital yang menghubungkan pemerintah & bisnis.
     Native canvas, tanpa library eksternal (pengganti ringan untuk Spline/WebGL). */
  function initNetworkCanvas(cv){
    var ctx=cv.getContext('2d'), W=0, H=0, dpr=Math.min(window.devicePixelRatio||1,2);
    var host=cv.parentElement;
    var density = parseFloat(cv.getAttribute('data-density')) || 1;
    var palette=['#c2510c','#e76e44','#111111'];
    var pts=[];
    var LINK_DIST = 150;

    function makePoints(){
      pts=[];
      var area=W*H;
      var n=Math.max(10, Math.min(46, Math.round((area/26000)*density)));
      for(var i=0;i<n;i++){
        pts.push({
          x:Math.random()*W, y:Math.random()*H,
          dx:(Math.random()-0.5)*0.18, dy:(Math.random()-0.5)*0.18,
          r:1.4+Math.random()*1.6,
          c:palette[i%palette.length]
        });
      }
    }
    function resize(){
      W=host.clientWidth; H=host.clientHeight;
      if(!W||!H) return;
      cv.width=W*dpr; cv.height=H*dpr; cv.style.width=W+'px'; cv.style.height=H+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      makePoints();
    }
    var mx=-9999, my=-9999;
    host.addEventListener('mousemove', function(e){ var r=host.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; });
    host.addEventListener('mouseleave', function(){ mx=-9999; my=-9999; });
    function hexA(hex,a){
      var n=parseInt(hex.slice(1),16), r=(n>>16)&255, g=(n>>8)&255, bl=n&255;
      return 'rgba('+r+','+g+','+bl+','+a+')';
    }
    function draw(){
      if(W&&H){
        ctx.clearRect(0,0,W,H);
        for(var i=0;i<pts.length;i++){
          var p=pts[i];
          p.x+=p.dx; p.y+=p.dy;
          if(p.x<0||p.x>W) p.dx*=-1;
          if(p.y<0||p.y>H) p.dy*=-1;
          var dmx=mx-p.x, dmy=my-p.y, dm=Math.sqrt(dmx*dmx+dmy*dmy);
          if(dm<120){ var push=(120-dm)/120*0.35; p.x-=dmx*0.02*push; p.y-=dmy*0.02*push; }
        }
        for(i=0;i<pts.length;i++){
          for(var j=i+1;j<pts.length;j++){
            var a=pts[i], b=pts[j];
            var ddx=a.x-b.x, ddy=a.y-b.y, dist=Math.sqrt(ddx*ddx+ddy*ddy);
            if(dist<LINK_DIST){
              ctx.strokeStyle=hexA('#c2510c', (1-dist/LINK_DIST)*0.16);
              ctx.lineWidth=1;
              ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
            }
          }
        }
        for(i=0;i<pts.length;i++){
          var pt=pts[i];
          ctx.fillStyle=hexA(pt.c,0.55);
          ctx.beginPath(); ctx.arc(pt.x,pt.y,pt.r,0,Math.PI*2); ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    }
    resize(); window.addEventListener('resize', resize); requestAnimationFrame(draw);
  }
  if(!reduce){
    document.querySelectorAll('.hero-canvas').forEach(function(cv){ initNetworkCanvas(cv); });
  }
})();
