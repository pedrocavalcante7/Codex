// 5.65: batch localization at the outer render boundary; never scan every intermediate DOM.
let renderDepth565=0;
const rootLocalizeBefore565=localizeRoot559,localizeBefore565=localize48;
localizeRoot559=function(root=document){if(renderDepth565)return;return rootLocalizeBefore565(root);};
localize48=function(){if(renderDepth565)return;return localizeBefore565();};
const renderBefore565=render;
render=function(){const outer=renderDepth565===0;if(outer)languageObserver559.disconnect();renderDepth565++;try{return renderBefore565();}finally{renderDepth565--;if(outer){try{rootLocalizeBefore565(document);sortFeatureList564(document);languageRoots559.clear();}finally{languageObserver559.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt','aria-valuetext','open']});}}}};
// Keep stable IntersectionObserver subscriptions instead of disconnecting the entire screen.
effectObserver470?.disconnect();
const observedEffects565=new Set();
observeEffects470=function(){const current=new Set(document.querySelectorAll('.hero,.session-vitals,.inspiration-active,.ability-panel463,.death-saves47'));for(const node of observedEffects565)if(!current.has(node)){effectObserver470?.unobserve(node);observedEffects565.delete(node);}for(const node of current)if(!observedEffects565.has(node)){effectObserver470?.observe(node);observedEffects565.add(node);}};
observeEffects470();
// Decorative animation pauses only while a page is moving, resuming at the end of the swipe.
const performanceStyle565=document.createElement('style');performanceStyle565.textContent=`.sheet-motion-active472 *,.sheet-drag475 *{animation-play-state:paused!important}.sheet-warmup559{border:1px solid #b2915555;border-radius:10px;background:linear-gradient(90deg,#e1c79922,#f2dca344,#e1c79922);min-height:180px}`;document.head.append(performanceStyle565);
