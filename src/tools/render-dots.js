window.renderDot = (text, x, y, data = '') => {
  const id = `render-dot-${text}`;

  const div =
    document.getElementById(id) ||
    (function () {
      const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`;
      const newDiv = document.createElement('div');

      newDiv.id = id;

      newDiv.style.position = 'fixed';
      newDiv.style.top = '0px';
      newDiv.style.left = '0px';
      newDiv.style.zIndex = '9999999';
      newDiv.style.fontSize = '10px';
      newDiv.style.color = color;
      newDiv.style.background = 'black';
      newDiv.style.borderLeft = `solid 10px ${color}`;
      newDiv.style.paddingLeft = '1ch';
      newDiv.style.paddingRight = '1ch';
      newDiv.style.pointerEvents = 'none';

      document.body.appendChild(newDiv);

      return newDiv;
    })();

  div.style.top = `${y}px`;
  div.style.left = `${x}px`;
  div.innerText = `${text} (${x}, ${y}) ${data}`;
};

window.renderDots = (...arrs) => {
  arrs.forEach((arr) => window.renderDot(...arr));
};
