for(const e of BOOK.entries){const t=SPELL_PT434[e.id];if(e.kind==='Magias'&&t?.sourceText){e.text=t.sourceText;e.classes=t.classes||e.classes;}}
// Presentation-only translations. English rule data and saved spell identifiers remain stable.
function spellTranslation434(e){return e && (SPELL_PT434[e.id] || Object.values(SPELL_PT434).find(t=>t.original===e.name));}
function spellName434(e){return (typeof SETTINGS48!=='undefined'&&SETTINGS48.language==='en')?e.name:(spellTranslation434(e)?.name||e.name);}
function spellSearch434(e){const t=spellTranslation434(e);return t?t.name+' '+t.text:'';}
function compareSpellNames434(a,b){return spellName434(a).localeCompare(spellName434(b),'pt-BR',{sensitivity:'base'});}
