const comment = '{{ .Site.Params.comment }}'
const light = 'light', dark = 'dark'

const themeSwitcher = document.getElementById('theme-switcher')

themeSwitcher.addEventListener('click', function () {
  const currentTheme = localStorage.theme
  const newTheme = currentTheme === light ? dark : light
  
  // switch global theme
  switchMinimaTheme(currentTheme, newTheme)

  // switch utterance theme if necessary
  if (comment === 'utterances')
    switchUtteranceTheme(`github-${newTheme}`)
});

function switchMinimaTheme(oldTheme, newTheme) {
  const { classList } = document.documentElement

  classList.remove(oldTheme);
  classList.add(newTheme);
  localStorage.theme = newTheme;
}

const utteranceClassName = '.utterances-frame'
let utterance;

function switchUtteranceTheme(theme) {
  if (!utterance) utterance = document.querySelector(utteranceClassName)
  utterance.contentWindow.postMessage({type: 'set-theme', theme}, 'https://utteranc.es')
}