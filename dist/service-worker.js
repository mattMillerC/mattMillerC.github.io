if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,d,r)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const c={uri:location.origin+s.slice(1)};return Promise.all(d.map(s=>{switch(s){case"exports":return a;case"module":return c;default:return e(s)}})).then(e=>{const s=r(...e);return a.default||(a.default=s),a})}))}}define("./service-worker.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"0.bundle.js",revision:"20eb19e125b46380126ba91bb3e82ce5"},{url:"1.bundle.js",revision:"86380d9bb771e4bc835859f277ac083c"},{url:"10.bundle.js",revision:"1061774675446e7ad7797965880ed0ce"},{url:"11.bundle.js",revision:"33f23ddc3ed261b8278f114ff6341123"},{url:"12.bundle.js",revision:"2fdb487243f35715f50841a2da3d5863"},{url:"13.bundle.js",revision:"5bc9014cbc497414acbdaeb31fa31604"},{url:"14.bundle.js",revision:"2f5324b0e28901a791fac09b915c6619"},{url:"15.bundle.js",revision:"8ddbfec1c5d8ce9aecc86eca707db78e"},{url:"16.bundle.js",revision:"514e52a6d3cb205c67f9d17c044ebb7e"},{url:"17.bundle.js",revision:"af70732fd922c46f79c5e032f27ca14f"},{url:"18.bundle.js",revision:"1da6ab478fc8ea4cff99369dcd1eb2dd"},{url:"19.bundle.js",revision:"9c0e2af3c71ed695eb67935fac37889b"},{url:"2.bundle.js",revision:"c5fd84b770f217799a87f359359e6711"},{url:"20.bundle.js",revision:"29493de6a45e8e242eb1993c6aa29497"},{url:"21.bundle.js",revision:"9336aaa5fa800e33d64ef74848ebb56f"},{url:"3.bundle.js",revision:"13f0349c0f76b3babcfaffac87e2a049"},{url:"5.bundle.js",revision:"2ffb29c216441e63a6d7cbba796dd858"},{url:"6.bundle.js",revision:"d00075c29617c0f7dc81565859542080"},{url:"7.bundle.js",revision:"025f9c68f3fdceb71f5d1af5b5c5b994"},{url:"8.bundle.js",revision:"06d5bd5fcccc1d86f5c15f6d13b7d0de"},{url:"9.bundle.js",revision:"2b00e9473e3c8a119d1320b8e6324630"},{url:"data/backgrounds.json",revision:"820a6f456399efe960aeab43d959a4ba"},{url:"data/basicitems.json",revision:"15d8b9dd4bf68c0d1aefba00ba020e48"},{url:"data/classes/artificer.json",revision:"42689f435c192b8a081fcbfe502215a4"},{url:"data/classes/barbarian.json",revision:"345476cbe466d938c9098ff363c50be7"},{url:"data/classes/bard.json",revision:"41508c2c797e076ea504c93941b042fe"},{url:"data/classes/cleric.json",revision:"d46621f402c113e8e987ac8d7691302f"},{url:"data/classes/druid.json",revision:"fda549d7ac93453963db58624e2f4276"},{url:"data/classes/fighter.json",revision:"0c39e42bc60a2583dbae755d7b97b163"},{url:"data/classes/index.json",revision:"0be8f174566b9e49632522f2bc5504b4"},{url:"data/classes/monk.json",revision:"63e6ceb141d28d47cf352e74600ac45b"},{url:"data/classes/mystic.json",revision:"7f4936b0863c9076e091650478482019"},{url:"data/classes/paladin.json",revision:"f3c1e7fc329bec0eb99a25d47acb64b3"},{url:"data/classes/ranger.json",revision:"b9adc917a6098a91a68641a0da639087"},{url:"data/classes/rogue.json",revision:"da6616eb2a807c91df71373dd9643c77"},{url:"data/classes/sidekick.json",revision:"b5a3e340b41b79325ab6352f47579c5d"},{url:"data/classes/sorcerer.json",revision:"69d08048aa41707f844a2427b3e7bbcc"},{url:"data/classes/warlock.json",revision:"7340dd1b51aa286e28894e788b82fc6b"},{url:"data/classes/wizard.json",revision:"8a3247a9bd5ef71d3d168aebf705911c"},{url:"data/conditions.json",revision:"6afd0c28969c88d52b909b48614ecc8e"},{url:"data/cults.json",revision:"784409e3ea77a18f263b0e0d55cec45f"},{url:"data/feats.json",revision:"9967a346cf5b9cd13edadab233c1bd6a"},{url:"data/items.json",revision:"24d438e3c50c8df3f6bf2a67d023b2b2"},{url:"data/legendarygroups.json",revision:"51ce9d4c3464c99ef5a7044da9ae43ee"},{url:"data/magicvariants.json",revision:"fce713481043f969f81d3f0633b2feef"},{url:"data/psionics.json",revision:"d4d3983309dce6690814d09650cdb4f9"},{url:"data/races.json",revision:"4bd6042ffeb5a20e2549329d11113615"},{url:"data/rewards.json",revision:"e1502186046faf2c6a462a7d307f4764"},{url:"data/rules.json",revision:"bd0eb7c4f5abeeb26fff70ba40de4715"},{url:"data/spells/index.json",revision:"e2d320d2cb613e8c25bf648f73d8beda"},{url:"data/spells/spells-ai.json",revision:"2d587d6c98023603f39eda454ab15e91"},{url:"data/spells/spells-egw.json",revision:"188a72e6a6de31449225ea734f122afb"},{url:"data/spells/spells-ggr.json",revision:"427f6bfd44a859ef4e14918e202c3e2f"},{url:"data/spells/spells-llk.json",revision:"427f6bfd44a859ef4e14918e202c3e2f"},{url:"data/spells/spells-phb.json",revision:"31576bc0943585b323a5087e79e92a0a"},{url:"data/spells/spells-scag.json",revision:"b4e2fbcb5ecd42163db644031102d0eb"},{url:"data/spells/spells-stream.json",revision:"325c882960a827949572d3a4de9f1f07"},{url:"data/spells/spells-ua-2020por.json",revision:"dbb7bd0ead60172b02f1cbd803fbf5a5"},{url:"data/spells/spells-ua-2020smt.json",revision:"a0826ac9ed50dc7d2282b48a5a5d0c40"},{url:"data/spells/spells-ua-ar.json",revision:"82368a54d661178cb88d524ee29bb6b1"},{url:"data/spells/spells-ua-frw.json",revision:"8dedb5b6f12a9bd43d2d075be5a1638b"},{url:"data/spells/spells-ua-mm.json",revision:"6c9bf8abb3f5eded9a90cf520cc8addb"},{url:"data/spells/spells-ua-saw.json",revision:"aa10f5eb3b1d74e89f5fc5142c5b8cd0"},{url:"data/spells/spells-ua-ss.json",revision:"20a303115150a6ddcb32b8bfe876aa35"},{url:"data/spells/spells-ua-tobm.json",revision:"cd939f11a18a0490c3a1d0a190c09bef"},{url:"data/spells/spells-xge.json",revision:"f248bdc2c05e22db3381107bba4e16fc"},{url:"data/variantrules.json",revision:"c0d0ee6cd56dead6b8a2df246873a6c1"},{url:"favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"fonts/MaterialIcons-Regular.ttf",revision:"a37b0c01c0baf1888ca812cc0508f6e2"},{url:"fonts/MaterialIcons-Regular.woff",revision:"012cf6a10129e2275d79d6adac7f3b02"},{url:"fonts/MaterialIcons-Regular.woff2",revision:"570eb83859dc23dd0eec423a49e147fe"},{url:"img/android-chrome-192x192.png",revision:"be4c0728c703a538fb126893b628ccd7"},{url:"img/android-chrome-512x512.png",revision:"eeb392253dca9a14d0b6059e39eda40d"},{url:"img/apple-touch-icon.png",revision:"857576c68505885d2855fb6513bee130"},{url:"img/favicon-16x16.png",revision:"c580ba205c94c7b2e19edf5feb286018"},{url:"img/favicon-32x32.png",revision:"1ce713bb2f1c6bd34f61cfb3373cffe0"},{url:"img/favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"img/logo-white-192x192.png",revision:"de037ebe3d00877d460c1d93936f29ef"},{url:"index.bundle.js",revision:"252806ad262cc6e0e96675320acca1d7"},{url:"index.html",revision:"97abfd0f50f22ff115447bed8dfa29ba"},{url:"manifest.json",revision:"e5b09ff0e7d92f5e11fc856785883638"},{url:"node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js",revision:"79106fd9b808b3bbd70d54b934850301"},{url:"node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",revision:"e90bc4e3aa3ed407808c7b2726581d33"},{url:"node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js",revision:"e044a63e034bf10304dad73138b8c74b"}],{})}));
//# sourceMappingURL=service-worker.js.map
