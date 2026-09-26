const finePointer = window.matchMedia('(pointer: fine)');

if (finePointer.matches) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dot = document.createElement('div');
  let lastParticleAt = 0;

  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);
  document.documentElement.classList.add('has-custom-cursor');

  const createParticle = (x, y) => {
    const particle = document.createElement('span');
    const size = 2.5 + Math.random() * 3;
    const driftX = (Math.random() - 0.5) * 18;
    const driftY = 8 + Math.random() * 14;

    particle.className = 'cursor-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    document.body.appendChild(particle);

    const animation = particle.animate(
      [
        { opacity: 0.32, transform: 'translate(-50%, -50%) scale(1)' },
        {
          opacity: 0,
          transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(0)`,
        },
      ],
      { duration: 430 + Math.random() * 180, easing: 'ease-out' },
    );

    animation.finished.finally(() => particle.remove());
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      dot.style.opacity = '1';

      const now = performance.now();
      if (!reduceMotion && now - lastParticleAt > 28) {
        createParticle(event.clientX, event.clientY);
        lastParticleAt = now;
      }
    },
    { passive: true },
  );

  const hideDot = () => {
    dot.style.opacity = '0';
  };

  window.addEventListener('blur', hideDot);
  document.documentElement.addEventListener('mouseleave', hideDot);
}
