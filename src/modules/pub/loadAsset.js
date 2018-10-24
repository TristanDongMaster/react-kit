
export default {
    varsion: '1.0.0',
    loadJs,
    loadCss,
    loadWait
}
window.loadedJSLibrary = window.loadedJSLibrary || new Map
window.loadedCSSLibrary = window.loadedCSSLibrary || new Map
function loadCss (src,callback){
    if(window.loadedCSSLibrary.get(src)){
        return this
    }
    window.loadedCSSLibrary.set(src,true)
	let style = document.createElement('link');

		
let loaded;
	style.setAttribute('href', src);
	style.rel = 'stylesheet';
	style.type = 'text/css';
    if (callback) {
    style.onreadystatechange = style.onload = function() {
        if (!loaded) {
          callback();
        }
        loaded = true;
      };
    }
    let head = document.getElementsByTagName('head')[0];
    (head || document.body).appendChild(style);
    return this;
}

function loadJs (src,callback){
    if(window.loadedJSLibrary.get(src)){
        return this
    }
    window.loadedJSLibrary.set(src,true)
    let script = document.createElement('script');

        
let loaded;
    script.setAttribute('src', src);
    script.type = 'text/javascript';
    if (callback) {
    script.onreadystatechange = script.onload = function() {
        if (!loaded) {
          callback();
        }
        loaded = true;
      };
    }
    let head = document.getElementsByTagName('head')[0];
    (head || document.body).appendChild(script);
    return this;
}

function loadWait(fn,...obj){
    var i = setInterval(() => {
        let cnt = 0
        obj.forEach((e,i) => {
            if(typeof window[e] !=='undefined'){
                cnt++ 
            }
        })
        if(cnt===obj.length){
            clearInterval(i)
            if(typeof fn){
                fn()
            }
        }      
    },10)
}


