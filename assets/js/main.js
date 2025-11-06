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
  'solar-system':{title:'Our Solar System',description:'The Solar System is a gravitationally bound system consisting of the Sun and all the objects that orbit it. Formed about 4.6 billion years ago, our cosmic neighborhood contains eight planets, numerous moons, asteroids, comets, and other celestial bodies.',facts:[
    'The Sun contains 99.86% of all mass in the Solar System',
    'Jupiter is more massive than all other planets combined',
    'One day on Venus (243 Earth days) is longer than its year (225 Earth days)',
    'Mars has the largest volcano in the Solar System: Olympus Mons',
    "Saturn's density is less than water - it would float!"
  ]},
  'black-hole':{title:'Black Holes',description:'Black holes are regions of spacetime where gravity is so strong that nothing—not even light—can escape. They form when massive stars collapse at the end of their lives, creating a singularity surrounded by an event horizon.',facts:[
    'The closest black hole to Earth is about 1,000 light-years away',
    'Time slows down near black holes due to gravitational time dilation',
    'The supermassive black hole in our galaxy is called Sagittarius A*',
    'Accretion disks can reach temperatures of millions of degrees',
    'Black holes eventually evaporate through Hawking radiation'
  ]},
  'supernova':{title:'Supernovae',description:'A supernova is the explosive death of a massive star, occurring when the star exhausts its nuclear fuel. These cosmic explosions can briefly outshine entire galaxies and are responsible for creating and dispersing heavy elements throughout the universe.',facts:[
    'A supernova releases more energy in seconds than our Sun will in its entire lifetime',
    'Elements heavier than iron are only created during supernovae',
    'The Crab Nebula is a supernova remnant observed by Chinese astronomers in 1054 AD',
    'Supernovae occur about once every 50 years in galaxies like the Milky Way',
    'Type Ia supernovae are used as "standard candles" to measure cosmic distances'
  ]},
  'pulsar':{title:'Pulsars',description:'Pulsars are highly magnetized neutron stars that emit beams of electromagnetic radiation from their magnetic poles. As they rotate, these beams sweep across space like lighthouse beams, creating regular pulses when they point toward Earth.',facts:[
    'Pulsars can spin up to 700 times per second',
    'They are incredibly dense - a teaspoon would weigh about 6 billion tons',
    'The first pulsar was discovered in 1967 by Jocelyn Bell Burnell',
    'Some pulsars are more accurate timekeepers than atomic clocks',
    'There are over 3,000 known pulsars in our galaxy'
  ]},
  'galaxy':{title:'Spiral Galaxies',description:'Spiral galaxies are disk-shaped collections of stars, gas, and dust with prominent spiral arms extending from a central bulge. They contain billions of stars and are held together by gravity and dark matter. Our Milky Way is a barred spiral galaxy.',facts:[
    'The Milky Way contains 200-400 billion stars',
    'It takes our Solar System 225-250 million years to orbit the galaxy once',
    'Spiral arms are density waves that compress gas and trigger star formation',
    'The Andromeda Galaxy will collide with the Milky Way in 4.5 billion years',
    'About 60% of observed galaxies are spiral galaxies'
  ]}
};

function updateInfoContent(sectionId){
  const info=infoData[sectionId];
  const infoContent=document.getElementById('infoContent');
  if(!info||!infoContent) return;
  infoContent.innerHTML=`
    <div class="info-title">${info.title}</div>
    <div class="info-description">${info.description}</div>
    <div class="fun-facts">
      <h3>Some fascinating facts</h3>
      ${info.facts.map(f=>`<div class="fact-item">${f}</div>`).join('')}
    </div>
  `;
}

function toggleInfoPanel(){
  const panel=document.getElementById('infoPanel');
  if(panel) panel.classList.toggle('open');
}

// Initialize per page
window.addEventListener('DOMContentLoaded',()=>{
  initStars();
  const sectionId=document.body.getAttribute('data-section');
  if(sectionId) updateInfoContent(sectionId);

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
