if (process.env.RTL) {
  document.body.setAttribute('dir', 'rtl');
  document.body.classList.add('rtl');
} else {
  document.body.removeAttribute('dir');
  document.body.classList.remove('rtl');
}
