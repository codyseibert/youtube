const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

const tl = gsap.timeline();

tl.to('#triangle', {
  duration: 2,
  'border-top-width': '400px',
  'border-right-width': '2000px',
  ease: 'power1.out'
})
  .to(
    'body',
    {
      duration: 3,
      'background-color': '#c2f686'
    },
    '-=2'
  )
  .to(
    '#circle',
    {
      ease: 'elastic.out',
      duration: 2,
      width: '500px',
      height: '500px',
      left: '50px',
      top: '50px'
    },
    '-=2.5'
  )
  .to(
    '#circle',
    {
      duration: 2,
      'background-color': '#00abff'
    },
    '-=2'
  )
  .to(
    '#logo',
    {
      ease: 'power4.out',
      duration: 2,
      left: 110,
      top: 160
    },
    '-=1.5'
  )
  .to(
    '#name',
    {
      ease: 'power4.out',
      duration: 2,
      left: 140,
      top: 370
    },
    '-=2'
  )
  .to(['#logo', '#name', '#circle'], {
    ease: 'power4.in',
    duration: 1,
    left: 1400,
    opacity: 0
  })
  .to('#title', {
    ease: 'elastic.out',
    duration: 2,
    left: 400,
    top: 220
  })
  .to('#title', {
    ease: 'power4.in',
    duration: 2,
    left: 400,
    top: 1060
  })
  .to(
    'body',
    {
      ease: 'power4.in',
      duration: 2,
      'background-color': '#000'
    },
    '-=2'
  )
  .to(
    '#triangle',
    {
      ease: 'power4.in',
      duration: 6,
      'border-top-width': '0px',
      'border-right-width': '0px'
    },
    '-=6'
  );
