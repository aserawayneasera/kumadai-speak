export const MODE_KEY = 'kuma-appearance-v1';
export const STYLE_KEY = 'kuma-visual-theme-v1';

// Run before paint so a saved night preference never flashes a light page.
export const appearanceBootstrap = `(function(){var m='system',s='soft';try{var a=localStorage.getItem('${MODE_KEY}'),b=localStorage.getItem('${STYLE_KEY}');if(['system','light','night'].indexOf(a)>=0)m=a;if(['normal','soft','kuma'].indexOf(b)>=0)s=b;}catch(e){}var d=m==='night'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches),r=document.documentElement;r.dataset.appearance=m;r.dataset.visualTheme=s;r.dataset.theme=d?'soft-dark':'light';r.dataset.cardRadius='14';r.style.colorScheme=d?'dark':'light';})();`;
