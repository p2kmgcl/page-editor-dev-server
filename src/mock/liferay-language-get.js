export default function liferayLanguageGet(str) {
  const words = str.split('-');
  let varCount = 0;
  words[0] = words[0].charAt(0).toUpperCase() + words[0].substr(1);
  return words.map(word => (word === 'x' ? `{${varCount++}}` : word)).join(' ');
}
