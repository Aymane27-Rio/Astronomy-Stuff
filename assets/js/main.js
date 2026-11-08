// Starfield
function initStars(){
  const container=document.querySelector('.stars');
  if(!container) return;
  container.innerHTML='';
  const count=250;
  for(let i=0;i<count;i++){
    const star=document.createElement('div');
    star.className='star';
    const size=Math.random()*3+1;
    const zDepth=Math.random()*500-250;
    const brightness=Math.max(0.2,1-Math.abs(zDepth)/500);
    star.style.width=size+'px';
    star.style.height=size+'px';
    star.style.top=Math.random()*100+'%';
    star.style.left=Math.random()*100+'%';
    star.style.background=`rgba(255,255,255,${brightness})`;
    star.style.setProperty('--star-z', zDepth+'px');
    star.style.animationDelay=Math.random()*3+'s';
    star.style.animationDuration=(2+Math.random()*4)+'s';
    if(Math.random()<0.1){
      const colors=['#ff6b6b','#4ecdc4','#45b7d1','#f9ca24','#f0932b'];
      star.style.background=colors[Math.floor(Math.random()*colors.length)];
    }
    container.appendChild(star);
  }
}

// Info data
const infoData={
  'solar-system':{title:'Our Solar System',description:'Our Solar System formed about 4.6 billion years ago from a cloud of gas and dust. The Sun and everything bound to it by gravity—including eight planets, dwarf planets, moons, asteroids, and comets—make up this changing system.',scene:'The animation shows the Sun and all eight planets. Their sizes, spacing, and orbital speeds are stylized so the whole system fits on screen.',facts:[
    'The eight planets, in order from the Sun, are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.',
    'Jupiter and Saturn are gas giants; Uranus and Neptune are ice giants.',
    'Venus rotates so slowly that one Venus day (243 Earth days) is longer than its year (225 Earth days).',
    'Olympus Mons on Mars is the largest known volcano in the Solar System.',
    'Saturn’s average density is lower than water’s, though there is no ocean large enough for it to float in.'
  ],sources:[['NASA: Solar System facts','https://science.nasa.gov/solar-system/solar-system-facts/'],['NASA: The planets','https://science.nasa.gov/solar-system/planets/']]},
  'black-hole':{title:'Black Holes',description:'A black hole is a region of spacetime whose gravity is so strong that anything crossing its event horizon cannot escape. Black holes can form through stellar collapse, and supermassive ones inhabit the centers of many galaxies. We infer their presence from how they affect nearby matter and light.',scene:'The bright, flattened disk represents hot material orbiting outside the dark event horizon. The disk is visible; the black hole itself emits no light.',facts:[
    'The event horizon marks the boundary beyond which escape is impossible; it is not a solid surface.',
    'Hot gas in an accretion disk can glow brightly before it crosses the event horizon.',
    'A black hole’s gravity bends light, producing gravitational lensing and distorted views of its surroundings.',
    'Sagittarius A* is the supermassive black hole at the center of the Milky Way.',
    'Hawking radiation is a theoretical quantum effect; it has not been detected from an astrophysical black hole.'
  ],sources:[['NASA: Anatomy of a black hole','https://science.nasa.gov/universe/black-holes/anatomy/']]},
  'supernova':{title:'Supernovae',description:'A supernova is a stellar explosion, but there is more than one route to one. A massive star can collapse when its core can no longer support itself; a white dwarf can also explode after gaining matter from a companion or merging with another white dwarf. Their remnants enrich and reshape galaxies.',scene:'The expanding rings are a visual shorthand for an explosion and its outward-moving shock. Real supernovae evolve over days, months, and years, not seconds.',facts:[
    'Core-collapse supernovae come from the deaths of massive stars; Type Ia supernovae involve white dwarfs.',
    'Supernovae forge and distribute many elements, while some of the heaviest elements also form in neutron-star mergers.',
    'The Crab Nebula is the expanding remnant of a supernova recorded by observers in 1054.',
    'Type Ia supernovae have a repeatable peak brightness, making them useful distance indicators after calibration.',
    'A supernova remnant can remain visible long after the brief explosion has faded.'
  ],sources:[['NASA: Type Ia supernovae','https://science.nasa.gov/mission/roman-space-telescope/type-ia-supernovae/']]},
  'pulsar':{title:'Pulsars',description:'Pulsars are rapidly rotating neutron stars with strong magnetic fields. Radiation beams emerge near their magnetic poles; when a beam sweeps across Earth, we detect a pulse. The pulses come from the rotating lighthouse-like beam, not from the star switching on and off.',scene:'The beams mark the directions of radiation, while the magnetic field is tilted relative to the star’s spin axis. This is a simplified illustration, not to scale.',facts:[
    'A pulsar is observed as a pulsar only when its beam crosses our line of sight.',
    'Neutron stars pack more mass than the Sun into a sphere roughly the size of a city.',
    'Jocelyn Bell Burnell identified the first pulsar signal in 1967 while she was a graduate student.',
    'Some pulsars rotate hundreds of times per second; their regular pulses help test gravity and matter at extreme densities.',
    'Pulsars gradually lose rotational energy, and some can suddenly change spin in events called glitches.'
  ],sources:[['NASA / Hubble: Pulsars','https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-pulsars/']]},
  'galaxy':{title:'Spiral Galaxies',description:'A spiral galaxy is a vast, rotating collection of stars, gas, dust, and dark matter. Its disk and spiral arms are active environments where gas clouds can collapse to form stars. The Milky Way is a barred spiral, with a central bar and arms extending through its disk.',scene:'The glowing core, disk, and spiral arms are drawn as a face-on view. Actual galaxies contain far more stars and dust than this simplified animation can show.',facts:[
    'The Milky Way is a barred spiral galaxy, and our Solar System lies in one of its spiral-arm regions.',
    'The Sun takes roughly 230 million years to complete one orbit around the Milky Way’s center.',
    'Spiral arms are regions where material gathers; gas compression there can encourage new stars to form.',
    'The Milky Way and Andromeda are moving toward one another and are expected to interact over billions of years.',
    'Galaxies come in several broad shapes, including spiral, elliptical, and irregular.'
  ],sources:[['NASA: Galaxy types','https://science.nasa.gov/universe/galaxies/types/'],['NASA: Milky Way facts','https://science.nasa.gov/solar-system/solar-system-facts/']]}
};

function updateInfoContent(sectionId){
  const info=infoData[sectionId];
  const infoContent=document.getElementById('infoContent');
  if(!info||!infoContent) return;
  infoContent.innerHTML=`
    <div class="info-title">${info.title}</div>
    <div class="info-kicker">Cosmic field notes</div>
    <div class="info-description">${info.description}</div>
    ${info.scene?`<div class="info-highlight"><h3>What you’re seeing</h3><p>${info.scene}</p></div>`:''}
    <div class="fun-facts">
      <h3>Key ideas</h3>
      ${info.facts.map(f=>`<div class="fact-item">${f}</div>`).join('')}
    </div>
    ${info.sources?.length?`<div class="info-sources"><h3>Explore trusted sources</h3>${info.sources.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true">↗</span></a>`).join('')}</div>`:''}
  `;
}

function toggleInfoPanel(){
  const panel=document.getElementById('infoPanel');
  const toggle=document.querySelector('.info-toggle');
  if(!panel) return;
  const isOpen=panel.classList.toggle('open');
  panel.setAttribute('aria-hidden',String(!isOpen));
  if(toggle){
    toggle.setAttribute('aria-expanded',String(isOpen));
    toggle.setAttribute('aria-label',isOpen?'Close information panel':'Open information panel');
    toggle.textContent=isOpen?'CLOSE':'INFO';
  }
}

// Initialize per page
window.addEventListener('DOMContentLoaded',()=>{
  initStars();
  const sectionId=document.body.getAttribute('data-section');
  if(sectionId) updateInfoContent(sectionId);

  // Expand one force explanation at a time in the physics chapter.
  const forceCards=[...document.querySelectorAll('.force-card[data-force]')];
  for(const card of forceCards){
    card.addEventListener('click',()=>{
      const isOpen=card.getAttribute('aria-expanded')==='true';
      for(const other of forceCards){
        const detail=document.getElementById(other.getAttribute('aria-controls'));
        other.setAttribute('aria-expanded','false');
        if(detail) detail.hidden=true;
      }
      if(!isOpen){
        card.setAttribute('aria-expanded','true');
        const detail=document.getElementById(card.getAttribute('aria-controls'));
        if(detail) detail.hidden=false;
      }
    });
  }

  // Page transition overlay
  const overlay=document.createElement('div');
  overlay.className='page-transition page-enter';
  document.body.appendChild(overlay);
  // Remove enter class after animation
  overlay.addEventListener('animationend',()=>{
    overlay.classList.remove('page-enter');
    overlay.style.opacity='0';
  },{once:true});

  // Intercept navigation for leave animation
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href$=.html]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const url=a.getAttribute('href');
      if(!url||url.startsWith('#')||url.startsWith('mailto:')||url.startsWith('http')) return;
      e.preventDefault();
      if(prefersReduced){
        window.location.href=url;
        return;
      }
      overlay.classList.add('page-leave');
      overlay.addEventListener('animationend',()=>{ window.location.href=url; },{once:true});
    });
  });

  // Subtle parallax for stars and title
  if(!prefersReduced){
    const stars=document.querySelector('.stars');
    const title=document.querySelector('.section-title');
    window.addEventListener('mousemove',(ev)=>{
      const cx=window.innerWidth/2, cy=window.innerHeight/2;
      const dx=(ev.clientX-cx)/cx; // -1..1
      const dy=(ev.clientY-cy)/cy;
      // Stars move slightly opposite
      if(stars){
        stars.style.setProperty('--px', (-dx*8).toFixed(2)+'px');
        stars.style.setProperty('--py', (-dy*8).toFixed(2)+'px');
      }
      // Title nudges a bit
      if(title){
        title.style.setProperty('--tx', (dx*6).toFixed(2)+'px');
        title.style.setProperty('--ty', (dy*4).toFixed(2)+'px');
      }
    });
  }

  // Dynamic planet lighting towards the sun (solar-system page only)
  if(sectionId==='solar-system'){
    const sunEl=document.querySelector('.sun');
    const planets=[...document.querySelectorAll('.planet')];
    if(sunEl && planets.length){
      const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
      let last=0;
      const loop=(t)=>{
        // ~60fps cap, but skip if tab is hidden anyway
        if(t-last>32){
          last=t;
          const srect=sunEl.getBoundingClientRect();
          const sx=srect.left + srect.width/2;
          const sy=srect.top + srect.height/2;
          for(const p of planets){
            const rect=p.getBoundingClientRect();
            const px=rect.left + rect.width/2;
            const py=rect.top + rect.height/2;
            const dx=px - sx;
            const dy=py - sy;
            const len=Math.hypot(dx,dy)||1;
            const nx=dx/len; // light coming from sun -> opposite of vector to sun on surface
            const ny=dy/len;
            // Map -1..1 to 15%..85% so highlight never clips too hard at edges
            const lx=clamp(50 + nx*35, 15, 85);
            const ly=clamp(50 + ny*35, 15, 85);
            p.style.setProperty('--light-x', lx+'%');
            p.style.setProperty('--light-y', ly+'%');
          }
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }
});
