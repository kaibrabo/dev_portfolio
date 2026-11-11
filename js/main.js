// Screen-only enhancements. The page works fully without this file; it adds
// the nav highlight for the section in view and the cursor spotlight.

(() => {
    const root = document.documentElement;

    // Nav highlight: mark the first nav-linked section that overlaps the top
    // half of the viewport. Keeps the last one lit while scrolling through
    // sections that have no nav entry (Education, Skills).
    const links = new Map(
        [...document.querySelectorAll('.nav a[href^="#"]')].map((a) => [a.getAttribute('href').slice(1), a])
    );
    const sections = [...document.querySelectorAll('main section[id]')].filter((s) => links.has(s.id));

    if ('IntersectionObserver' in window && sections.length > 0) {
        const inView = new Set();
        const setActive = () => {
            const current = sections.find((s) => inView.has(s));
            if (!current) return;
            links.forEach((a, id) => {
                const on = id === current.id;
                a.classList.toggle('active', on);
                if (on) a.setAttribute('aria-current', 'true');
                else a.removeAttribute('aria-current');
            });
        };
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) inView.add(entry.target);
                    else inView.delete(entry.target);
                }
                setActive();
            },
            { rootMargin: '0px 0px -50% 0px' }
        );
        sections.forEach((s) => observer.observe(s));
    }

    // Cursor spotlight: only for a mouse or trackpad, and only when the
    // visitor has not asked for reduced motion. Follows setting changes live.
    const spot = document.querySelector('.spotlight');
    if (spot && 'matchMedia' in window) {
        const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)');
        const finePointer = window.matchMedia('(pointer: fine)');
        const move = (e) => {
            spot.style.setProperty('--x', `${e.clientX}px`);
            spot.style.setProperty('--y', `${e.clientY}px`);
        };
        const update = () => {
            const on = motionOk.matches && finePointer.matches;
            root.classList.toggle('spotlight-on', on);
            if (on) window.addEventListener('pointermove', move, { passive: true });
            else window.removeEventListener('pointermove', move);
        };
        update();
        motionOk.addEventListener('change', update);
        finePointer.addEventListener('change', update);
    }
})();
