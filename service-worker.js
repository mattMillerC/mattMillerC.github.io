if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise(async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()})),s.then(()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]})},s=(s,a)=>{Promise.all(s.map(e)).then(e=>a(1===e.length?e[0]:e))},a={require:Promise.resolve(s)};self.define=(s,d,r)=>{a[s]||(a[s]=Promise.resolve().then(()=>{let a={};const i={uri:location.origin+s.slice(1)};return Promise.all(d.map(s=>{switch(s){case"exports":return a;case"module":return i;default:return e(s)}})).then(e=>{const s=r(...e);return a.default||(a.default=s),a})}))}}define("./service-worker.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"0.bundle.js",revision:"81a923ed940f4464b0eb338264975c54"},{url:"1.bundle.js",revision:"1baa01886b33ecc2d33e7c003a338f37"},{url:"11.bundle.js",revision:"b39a0325731b3162c5d4c23099e174fb"},{url:"12.bundle.js",revision:"788a00d5be67fd922d2cb3f1d0bcde97"},{url:"13.bundle.js",revision:"5a1d1c1d0d0cfabc7a5dc5d42e695a1e"},{url:"14.bundle.js",revision:"4eebfc3d91397a47a0634aa3b92c48d2"},{url:"15.bundle.js",revision:"7d20a622e2766242534d15524fea2691"},{url:"16.bundle.js",revision:"72535202e200b042429370f3966ce87f"},{url:"17.bundle.js",revision:"524e702b98da2868cb194ad749048856"},{url:"18.bundle.js",revision:"7c610e0ed04e583fd5cfc361ccd62a0e"},{url:"19.bundle.js",revision:"30f94363e08486559dcae0b2731b6454"},{url:"2.bundle.js",revision:"9198bc767d7c0a90a68ae72fd622b047"},{url:"20.bundle.js",revision:"0fc2cf527a7b1294660d4037b3c14f2a"},{url:"21.bundle.js",revision:"836d63742d79c22075c2869900152f9a"},{url:"22.bundle.js",revision:"e3ddd52ed7af559d9730c02e0bae1ba2"},{url:"23.bundle.js",revision:"8134fea56dba6a5d2c7a27d92df49760"},{url:"24.bundle.js",revision:"b983d7181d1785620ae7fcb5971d3414"},{url:"25.bundle.js",revision:"e57d05d0d18b6eed162af7dded48629c"},{url:"26.bundle.js",revision:"4f6893c2258712d3bc8109b1556f259f"},{url:"27.bundle.js",revision:"4d07ce8d05b832cfc97962e6849a6b37"},{url:"28.bundle.js",revision:"3c7f3de6ce323d136f4bea02a534aabd"},{url:"3.bundle.js",revision:"62ba4f8e5137b6f1411ad97f1377bd03"},{url:"4.bundle.js",revision:"8a854720cf81ddcc4c3a92d33e33cc4a"},{url:"5.bundle.js",revision:"9a63ca5818b06eb6c27cf99a4ce45d4d"},{url:"6.bundle.js",revision:"6c3000bd57935938d6b4b57d15f613ef"},{url:"7.bundle.js",revision:"24d20d4ef624f0abd615a8a6d5216629"},{url:"8.bundle.js",revision:"ffe137934acbf461fe702890e42f400f"},{url:"9.bundle.js",revision:"c58b8c5f66cd8aebec495ef267036598"},{url:"data/backgrounds.json",revision:"820a6f456399efe960aeab43d959a4ba"},{url:"data/basicitems.json",revision:"15d8b9dd4bf68c0d1aefba00ba020e48"},{url:"data/choices.js",revision:"16e056c0dbc18642a65f1ed41f0126a8"},{url:"data/classes/artificer.json",revision:"f120a78d2f3c6e03b13d2caa01fa3650"},{url:"data/classes/barbarian.json",revision:"82031fa73734fe685e205892d5d414e3"},{url:"data/classes/bard.json",revision:"41508c2c797e076ea504c93941b042fe"},{url:"data/classes/cleric.json",revision:"d46621f402c113e8e987ac8d7691302f"},{url:"data/classes/druid.json",revision:"fda549d7ac93453963db58624e2f4276"},{url:"data/classes/fighter.json",revision:"b3497f5236c865012b1a81482e413ee7"},{url:"data/classes/index.json",revision:"0be8f174566b9e49632522f2bc5504b4"},{url:"data/classes/monk.json",revision:"63e6ceb141d28d47cf352e74600ac45b"},{url:"data/classes/mystic.json",revision:"7f4936b0863c9076e091650478482019"},{url:"data/classes/paladin.json",revision:"f3c1e7fc329bec0eb99a25d47acb64b3"},{url:"data/classes/ranger.json",revision:"b9adc917a6098a91a68641a0da639087"},{url:"data/classes/rogue.json",revision:"da6616eb2a807c91df71373dd9643c77"},{url:"data/classes/sidekick.json",revision:"b5a3e340b41b79325ab6352f47579c5d"},{url:"data/classes/sorcerer.json",revision:"69d08048aa41707f844a2427b3e7bbcc"},{url:"data/classes/warlock.json",revision:"7340dd1b51aa286e28894e788b82fc6b"},{url:"data/classes/wizard.json",revision:"8a3247a9bd5ef71d3d168aebf705911c"},{url:"data/conditions.json",revision:"6afd0c28969c88d52b909b48614ecc8e"},{url:"data/cults.json",revision:"784409e3ea77a18f263b0e0d55cec45f"},{url:"data/feats.json",revision:"9967a346cf5b9cd13edadab233c1bd6a"},{url:"data/features.json",revision:"1835cbe62a4e8c8ac03ecfdaa9fdefae"},{url:"data/items.json",revision:"24d438e3c50c8df3f6bf2a67d023b2b2"},{url:"data/legendarygroups.json",revision:"51ce9d4c3464c99ef5a7044da9ae43ee"},{url:"data/magicvariants.json",revision:"fce713481043f969f81d3f0633b2feef"},{url:"data/psionics.json",revision:"d4d3983309dce6690814d09650cdb4f9"},{url:"data/races.json",revision:"4bd6042ffeb5a20e2549329d11113615"},{url:"data/rewards.json",revision:"e1502186046faf2c6a462a7d307f4764"},{url:"data/rules.json",revision:"bd0eb7c4f5abeeb26fff70ba40de4715"},{url:"data/spells/index.json",revision:"e2d320d2cb613e8c25bf648f73d8beda"},{url:"data/spells/spells-ai.json",revision:"2d587d6c98023603f39eda454ab15e91"},{url:"data/spells/spells-egw.json",revision:"188a72e6a6de31449225ea734f122afb"},{url:"data/spells/spells-ggr.json",revision:"427f6bfd44a859ef4e14918e202c3e2f"},{url:"data/spells/spells-llk.json",revision:"427f6bfd44a859ef4e14918e202c3e2f"},{url:"data/spells/spells-phb.json",revision:"31576bc0943585b323a5087e79e92a0a"},{url:"data/spells/spells-scag.json",revision:"b4e2fbcb5ecd42163db644031102d0eb"},{url:"data/spells/spells-stream.json",revision:"325c882960a827949572d3a4de9f1f07"},{url:"data/spells/spells-ua-2020por.json",revision:"dbb7bd0ead60172b02f1cbd803fbf5a5"},{url:"data/spells/spells-ua-2020smt.json",revision:"a0826ac9ed50dc7d2282b48a5a5d0c40"},{url:"data/spells/spells-ua-ar.json",revision:"82368a54d661178cb88d524ee29bb6b1"},{url:"data/spells/spells-ua-frw.json",revision:"8dedb5b6f12a9bd43d2d075be5a1638b"},{url:"data/spells/spells-ua-mm.json",revision:"6c9bf8abb3f5eded9a90cf520cc8addb"},{url:"data/spells/spells-ua-saw.json",revision:"aa10f5eb3b1d74e89f5fc5142c5b8cd0"},{url:"data/spells/spells-ua-ss.json",revision:"20a303115150a6ddcb32b8bfe876aa35"},{url:"data/spells/spells-ua-tobm.json",revision:"cd939f11a18a0490c3a1d0a190c09bef"},{url:"data/spells/spells-xge.json",revision:"f248bdc2c05e22db3381107bba4e16fc"},{url:"data/variantrules.json",revision:"c0d0ee6cd56dead6b8a2df246873a6c1"},{url:"favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"fonts/MaterialIcons-Regular.ttf",revision:"a37b0c01c0baf1888ca812cc0508f6e2"},{url:"fonts/MaterialIcons-Regular.woff",revision:"012cf6a10129e2275d79d6adac7f3b02"},{url:"fonts/MaterialIcons-Regular.woff2",revision:"570eb83859dc23dd0eec423a49e147fe"},{url:"img/android-chrome-192x192.png",revision:"be4c0728c703a538fb126893b628ccd7"},{url:"img/android-chrome-512x512.png",revision:"eeb392253dca9a14d0b6059e39eda40d"},{url:"img/apple-touch-icon.png",revision:"857576c68505885d2855fb6513bee130"},{url:"img/favicon-16x16.png",revision:"c580ba205c94c7b2e19edf5feb286018"},{url:"img/favicon-32x32.png",revision:"1ce713bb2f1c6bd34f61cfb3373cffe0"},{url:"img/favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"img/logo-white-192x192.png",revision:"de037ebe3d00877d460c1d93936f29ef"},{url:"index.bundle.js",revision:"4a251c997087aa27a1642c284509ea7d"},{url:"index.html",revision:"362c2827ce3f565305b4d6aa4a3fd44d"},{url:"manifest.json",revision:"e5b09ff0e7d92f5e11fc856785883638"},{url:"node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",revision:"de4bdd416c5bdb296585ee9f5f918002"}],{})}));
//# sourceMappingURL=service-worker.js.map
