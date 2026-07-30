const butterflyCount = 10;
const pinkButterflyCount = 10;
const heartCount = 30;

function createFloatingElement(className, count) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add(className);
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';
    el.style.animationDuration = 5 + Math.random() * 5 + 's';
    el.style.opacity = Math.random();
    document.body.appendChild(el);
  }
}

createFloatingElement('butterfly-default', butterflyCount);
createFloatingElement('butterfly-pink', pinkButterflyCount);
createFloatingElement('heart', heartCount);
