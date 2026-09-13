(() => {
  const track = document.getElementById('project-track');
  const previous = document.querySelector('.carousel-arrow.previous');
  const next = document.querySelector('.carousel-arrow.next');
  if (!track || !previous || !next) return;
  function update() {
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }
  function move(direction) {
    const card = track.querySelector('.project');
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    track.scrollBy({left: direction * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') track.scrollTo({left: 0});
    else if (event.key === 'End') track.scrollTo({left: track.scrollWidth});
    else move(event.key === 'ArrowLeft' ? -1 : 1);
  });
  track.addEventListener('scroll', update, {passive: true});
  new ResizeObserver(update).observe(track);
  update();
})();
