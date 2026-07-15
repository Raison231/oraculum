const fs=require("fs");const path=require("path");
const map={
  "README.md":2,
  "engine.js":10,
  "index.html":11,
  "test/engine.test.cjs":4
};
for (const [out,n] of Object.entries(map)){
  let s="";
  for(let i=0;i<n;i++){
    const p=`.parts/${out}.part${String(i).padStart(2,"0")}`;
    s+=fs.readFileSync(p,"utf8");
  }
  fs.mkdirSync(path.dirname(out)==="."?".":path.dirname(out),{recursive:true});
  fs.writeFileSync(out,s);
  console.log("assembled",out,s.length);
}
