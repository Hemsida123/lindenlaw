const menuButton = document.querySelector('.mobile-menu-button');
const navigation = document.querySelector('.main-nav');
if (menuButton && navigation) {
  const closeMenu = (returnFocus = false) => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('span').textContent = 'Meny';
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (returnFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span').textContent = open ? 'Stäng' : 'Meny';
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') closeMenu(true);
    if (event.key === 'Tab') {
      const targets = [menuButton, ...navigation.querySelectorAll('a')];
      const first = targets[0], last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
}
