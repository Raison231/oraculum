const fs=require('fs');const path=require('path');
const map={"engine.js": 56, "index.html": 31, "test_engine.test.cjs": 8, "README.md": 3, "package.json": 1};
const outPath = {
  'engine.js': 'engine.js',
  'index.html': 'index.html',
  'test_engine.test.cjs': 'test/engine.test.cjs',
  'README.md': 'README.md',
  'package.json': 'package.json'
};
for (const [out,n] of Object.entries(map)){
 let s='';
 for(let i=0;i<n;i++){
 const p=`.parts/v3/${out}.part${String(i).padStart(2,'0')}`;
 if(!fs.existsSync(p)){console.error('MISSING',p);process.exit(1);}
 s+=fs.readFileSync(p,'utf8');
 }
 const target = outPath[out] || out;
 fs.mkdirSync(path.dirname(target)==='.'?'.':path.dirname(target),{recursive:true});
 fs.writeFileSync(target,s);
 console.log('assembled',target,s.length);
}
