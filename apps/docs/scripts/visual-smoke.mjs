import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const url=process.env.AAR_LAB_URL || 'http://127.0.0.1:5180';
const artifacts=new URL('../visual-artifacts/',import.meta.url);
await mkdir(artifacts,{recursive:true});
const browser=await chromium.launch();
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:new URL(url).origin});
 await page.goto(url+'/#/');
 const header=page.locator('.aar-site-header');
 const flatCard=page.locator('.aar-feature-card').first();
 await flatCard.hover();
 const flat=await flatCard.evaluate(el=>({shadow:getComputedStyle(el).boxShadow,offset:getComputedStyle(el).getPropertyValue('--aar-hover-offset').trim()}));
 assert.match(flat.shadow,/rgba\(0, 0, 0, 0\)/,'Core cards have no visible elevation');
 assert.equal(flat.offset,'0px','Core cards do not lift on hover');
 assert.equal(await flatCard.evaluate(el=>getComputedStyle(el).borderTopWidth),'0px','Paper cards use fill instead of borders');
 const appearance=header.getByLabel('Appearance',{exact:true});
 const accent=header.getByLabel('Accent',{exact:true});
 assert.deepEqual(await appearance.locator('option').evaluateAll(options=>options.map(option=>option.value)),['light','dark','system']);
 assert.deepEqual(await accent.locator('option').evaluateAll(options=>options.map(option=>option.value)),['default','custom']);
 await appearance.selectOption('light');
 const light=await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-background').trim());
 await appearance.selectOption('dark');
 assert.notEqual(await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-background').trim()),light);
 await appearance.selectOption('system');await page.emulateMedia({colorScheme:'light'});
 assert.equal(await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-background').trim()),light);
 await page.emulateMedia({colorScheme:'dark'});
 assert.notEqual(await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-background').trim()),light);
 await accent.selectOption('custom');
 await header.getByLabel('Primary',{exact:true}).fill('#326954');
 assert.equal(await page.locator('.aar-site').evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-primary').trim()),'#326954');
 await accent.selectOption('default');
 await header.getByRole('button',{name:'Magic Art',exact:true}).click();
 assert.equal(await page.locator('.aar-site').getAttribute('data-magic-art'),'true');
 assert.notEqual(await flatCard.evaluate(el=>getComputedStyle(el).getPropertyValue('--aar-shadow-md').trim()),'0 0 transparent','Magic Art retains optional elevation');
 await header.getByRole('button',{name:'Magic Art',exact:true}).click();
 await appearance.focus();
 const enhanced=await appearance.evaluate(el=>getComputedStyle(el).appearance==='base-select');
 if(enhanced) {
  await appearance.press('Space');
  assert.equal(await appearance.evaluate(el=>el.matches(':open')),true);
  assert.match(await appearance.evaluate(el=>getComputedStyle(el,'::picker(select)').transitionProperty),/opacity/);
  await page.waitForTimeout(220);
  await page.screenshot({path:new URL('select-reveal.png',artifacts).pathname.replace(/^\/(\w:)/,'$1')});
 }
 if(enhanced) { await page.keyboard.press('ArrowUp');await page.keyboard.press('ArrowUp');await page.keyboard.press('Enter'); }
 else { await appearance.press('Home');await appearance.press('Enter'); }
 assert.equal(await appearance.inputValue(),'light');
 const bottoms=await header.locator('.aar-site-controls select, .aar-site-controls > button').evaluateAll(elements=>elements.map(el=>el.getBoundingClientRect().bottom));
 assert.ok(Math.max(...bottoms)-Math.min(...bottoms)<2,'Header control baseline alignment');

 for(const route of ['','aar-loom','headless','contextual-empty','guides/philosophy','guides/magic-art','guides/icons','guides/brand','guides/versioning']) {
  await page.goto(url+'/#/'+route);
  for(const width of [320,768,1440]) {await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow at '+width);}
  assert.equal(await page.locator('.aar-site-header .aar-brand-wordmark').isVisible(),true,'Primary text identity stays visible');
 }
 await page.goto(url+'/#/guides/brand');
 assert.equal(await page.getByRole('img',{name:/color mark$/}).count(),11,'All package color identities');
 assert.equal(await page.getByRole('img',{name:/monochrome mark$/}).count(),11,'All theme-aware identities');
 const downloads=await page.getByRole('link',{name:/^Download .* SVG$/}).evaluateAll(links=>links.map(link=>link.href));
 assert.equal(downloads.length,44);
 assert.equal(await page.getByRole('img',{name:/color wordmark$/}).count(),11,'Primary text identities');
 for(const asset of downloads) {
  const response=await page.request.get(asset);
  assert.equal(response.ok(),true,'Identity asset loads');
  assert.match(await response.text(),/<svg[^>]+viewBox="0 0 \d+ 64"/);
 }
 await page.screenshot({path:new URL('package-identities.png',artifacts).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
 await page.goto(url+'/#/aar-loom');
 await page.locator('.aar-guide-sidebar').getByRole('button',{name:'Project migration foundations',exact:false}).click();
 await page.getByRole('region',{name:'Migration workspace example'}).waitFor();
 for(const width of [320,768,1440]) {
  await page.setViewportSize({width,height:1000});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Migration guide at '+width);
 }
 await page.setViewportSize({width:1440,height:1000});
 const longNav=page.locator('.aar-guide-sidebar').getByRole('button',{name:'Tabs, Side Navigation & Headers',exact:false});
 assert.equal(await longNav.locator('.aar-nav-label').evaluate(el=>getComputedStyle(el).whiteSpace),'normal');
 for(const width of [320,768,1440]) {
  await page.setViewportSize({width,height:1000});
  const fits=await longNav.evaluate(el=>{
   const row=el.getBoundingClientRect();
   const label=el.querySelector('.aar-nav-label').getBoundingClientRect();
   const badge=el.querySelector('.aar-badge').getBoundingClientRect();
   return label.right<=badge.left && badge.right<=row.right && badge.bottom<=row.bottom && label.bottom<=row.bottom;
  });
  assert.equal(fits,true,'Sidebar label and badge fit at '+width);
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('.aar-guide-sidebar').getByRole('button',{name:'Tabs, Side Navigation & Headers',exact:false}).click();
 const navigation=page.getByRole('region',{name:'Navigation example'});
 const overview=navigation.getByRole('tab',{name:'Overview',exact:true});
 await overview.focus();await overview.press('ArrowRight');
 assert.equal(await navigation.getByRole('tab',{name:'Activity',exact:true}).evaluate(el=>document.activeElement===el),true);
 assert.equal(await overview.getAttribute('aria-selected'),'true','Arrows move focus without activation');
 await page.keyboard.press('Enter');
 assert.equal(await navigation.getByRole('tabpanel',{name:'Activity',exact:true}).isVisible(),true);
 await navigation.getByRole('button',{name:'New project',exact:true}).click();
 assert.match(await navigation.getByRole('tabpanel',{name:'Activity',exact:true}).textContent(),/1 project created/);
 const activity=navigation.getByRole('tab',{name:'Activity',exact:true});
 await activity.focus();await activity.press('End');await page.keyboard.press('Space');
 assert.equal(await navigation.getByRole('tabpanel',{name:'Settings',exact:true}).isVisible(),true);
 for(const width of [320,768,1440]) {
  await page.setViewportSize({width,height:1000});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Navigation at '+width);
 }
 await navigation.locator('summary').click();
 assert.equal(await navigation.getByRole('navigation',{name:'Example documentation'}).isVisible(),false);
 await navigation.locator('summary').click();
 assert.equal(await navigation.getByRole('navigation',{name:'Example documentation'}).isVisible(),true);
 await page.locator('.aar-guide-sidebar').getByRole('button',{name:'Inputs & Form Controls',exact:false}).click();
 const projectName=page.getByLabel('Project Name',{exact:false});
 await projectName.focus();
 assert.equal(await projectName.evaluate(el=>getComputedStyle(el).outlineStyle),'solid','Flat controls retain visible focus');
 assert.equal(await page.locator('.aar-specimen-preview').first().evaluate(el=>getComputedStyle(el).borderTopWidth),'0px','Specimens use flat surfaces');
 const range=page.getByRole('slider',{name:/Canvas Viewport Scale/});
 await range.focus();await range.press('End');
 assert.equal(await range.inputValue(),'200');
 assert.equal(await page.locator('[aria-label="Canvas scale preview"] .aar-bind-transform').evaluate(el=>getComputedStyle(el).transform),'matrix(2, 0, 0, 2, 0, 0)');
 await range.press('Home');assert.equal(await range.inputValue(),'50');
 await page.setViewportSize({width:320,height:1000});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Inputs guide at 320');
 await page.setViewportSize({width:1440,height:1000});
 await page.getByRole('button',{name:'Layout primitives',exact:false}).click();
 await page.getByRole('heading',{name:'Layouts without framework components'}).waitFor();
 await page.setViewportSize({width:320,height:1000});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Layout guide at 320');
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:new URL('framework-layouts.png',artifacts).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true});
 await page.goto(url+'/#/headless');
 await page.locator('.aar-guide-sidebar').getByRole('button',{name:'Ordered Collection',exact:false}).click();
 await page.locator('[aria-label="Collection items"]').getByRole('button',{name:'Details'}).click();
 assert.equal(await page.getByRole('button',{name:'Details',exact:true}).getAttribute('aria-pressed'),'true');
 const code=page.locator('.aar-code').filter({has:page.getByRole('button',{name:'Copy OrderedCollectionExample.tsx'})});
 const source=(await readFile(new URL('../src/OrderedCollectionExample.tsx',import.meta.url),'utf8')).replace(/\r\n/g,'\n').trimEnd();
 assert.equal(await code.locator('pre code').textContent(),source);
 assert.ok(await code.locator('.hljs-keyword').count()>0);
 await code.getByRole('button',{name:'Copy OrderedCollectionExample.tsx'}).click();
 assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),source);
 await page.locator('.aar-guide-sidebar').getByRole('button',{name:'File Intake',exact:false}).click();
 await page.getByLabel('Image files').setInputFiles({name:'cover.png',mimeType:'image/png',buffer:Buffer.from('example')});
 assert.match(await page.locator('#intake-result').textContent(),/Accepted 1 file/);
 await page.getByLabel('Image files').setInputFiles({name:'large.png',mimeType:'image/png',buffer:Buffer.alloc(2*1024*1024+1)});
 assert.match(await page.locator('#intake-result').textContent(),/exceeds/);
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.locator('.aar-button').first().evaluate(el=>getComputedStyle(el).animationName),'none');
 assert.deepEqual(errors,[]);

 // A consumer fixture using HTML and public CSS alone: no React or other components.
 const files=['tokens','components','layouts','navigation','workspace','compositions','expression','code','magic-art','utilities'];
 const css=(await Promise.all(files.map(name=>readFile(new URL('../../../packages/aar-loom/src/'+name+'.css',import.meta.url),'utf8')))).join('\n');
 await page.setContent(`<style>${css}</style><body class="aar-page-reset"><main class="aar-root" data-theme="light"><section class="aar-container aar-stack aar-p-4" data-gap="6"><h1 class="aar-title">Independent HTML</h1><div class="aar-grid" data-min="18"><article class="aar-panel">Main work</article><aside class="aar-panel">Supporting tools</aside></div><label class="aar-field">Choice<span class="aar-select-frame"><select class="aar-select"><option>First</option><option>Second</option></select></span></label></section></main></body>`);
 await page.getByRole('combobox').selectOption({label:'Second'});
 for(const width of [320,1280]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Plain HTML fixture');}
 const workspaceHtml=await readFile(new URL('../src/examples/aar-loom/workspace.html',import.meta.url),'utf8');
 await page.setContent(`<style>${css}</style><body class="aar-page-reset">${workspaceHtml}</body>`);
 for(const [width,columns] of [[320,1],[900,2],[1440,3]]) {
  await page.setViewportSize({width,height:1000});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Plain workspace at '+width);
  assert.equal(await page.locator('.aar-workspace-body').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),columns,'Container-responsive columns at '+width);
 }
 const inspector=page.locator('[data-region="inspector"]');
 await inspector.evaluate(el=>el.hidden=true);
 assert.equal(await inspector.isVisible(),false);
 assert.equal(await page.locator('.aar-workspace-body').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),2,'Hidden inspector releases its column');
 await page.locator('[data-region="navigation"]').evaluate(el=>el.hidden=true);
 assert.equal(await page.locator('.aar-workspace-body').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),1,'Content-only workspace');
 await page.locator('.aar-workspace').evaluate(el=>el.dataset.size='viewport');
 assert.equal(await page.locator('.aar-workspace').evaluate(el=>Math.round(el.getBoundingClientRect().height)),1000,'Viewport shell is bounded');
 console.log('Visual smoke passed: framework-only HTML, simplified themes, native keyboard selection, custom accent, all routes and narrow layouts, copyable source, file validation, reduced motion.');
} finally {await browser.close();}
