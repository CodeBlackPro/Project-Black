(() => {
    const night = document.querySelector('.night');
    if (!night) return;
    const COUNT = 60;
    const rnd = (min, max) => Math.random() * (max - min) + min;
    const px = v => `${v}px`;
    const ms = v => `${v}ms`;

    const spread = Math.max(window.innerWidth, window.innerHeight) * 1.2;

    for (let i = 0; i < COUNT; i++) {
        const s = document.createElement('span');
        s.className = 'shooting_star';

        const offsetY = rnd(-spread, spread);
        const offsetX = rnd(-spread, spread);
        const delay = Math.floor(rnd(0, 4000));
        const travel = rnd(600, 1400);
        const tail = rnd(120, 260);
        const duration = rnd(2600, 5200);

        s.style.top = `calc(50% - ${px(offsetY)})`;
        s.style.left = `calc(50% - ${px(offsetX)})`;
        s.style.animationDelay = ms(delay);
        s.style.setProperty('--shooting-time', ms(duration));
        s.style.setProperty('--travel', px(travel));
        s.style.setProperty('--tail', px(tail));

        night.appendChild(s);
    }

    const speed = 0.3; // 0.3 = slow parallax; use 1 for full scroll speed
    const onScroll = () => {
        night.style.setProperty('--parallax', `${-window.scrollY * speed}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
