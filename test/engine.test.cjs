/* ORACULUM ∞ v2 — unit tests (node, zero deps) */
const assert = require("assert");
const ORC = require("../engine.js");

let passed = 0, failed = 0;
function t(name, fn) {
  try { fn(); passed++; console.log("  ✓ " + name); }
  catch (e) { failed++; console.log("  ✗ " + name + "\n      " + e.message); }
}

console.log("\nORACULUM ∞ v2 engine tests\n");

// Core
t("version 2.0.0", () => assert.strictEqual(ORC.version, "2.0.0"));
t("φ² = φ + 1", () => assert.ok(Math.abs(ORC.PHI * ORC.PHI - (ORC.PHI + 1)) < 1e-9));
t("1/φ = φ - 1", () => assert.ok(Math.abs(ORC.INV_PHI - (ORC.PHI - 1)) < 1e-9));
t("√φ · √φ = φ", () => assert.ok(Math.abs(ORC.SQRT_PHI * ORC.SQRT_PHI - ORC.PHI) < 1e-9));
t("golden angle ≈ 137.5°", () => assert.ok(Math.abs(ORC.GOLDEN_ANGLE - 137.507764) < 1e-3));

// Mod9
t("digitalRoot", () => {
  assert.strictEqual(ORC.digitalRoot(0), 0);
  assert.strictEqual(ORC.digitalRoot(9), 9);
  assert.strictEqual(ORC.digitalRoot(18), 9);
  assert.strictEqual(ORC.digitalRoot(1998), 9);
  assert.strictEqual(ORC.digitalRoot(528), 6);
});
t("mirror pairs", () => {
  assert.strictEqual(ORC.mirrorPair(1), 8);
  assert.strictEqual(ORC.mirrorPair(2), 7);
  assert.strictEqual(ORC.mirrorPair(4), 5);
  assert.strictEqual(ORC.mirrorPair(9), 9);
});
t("axis/ring cover 1..9", () => {
  const all = ORC.AXIS.concat(ORC.RING).sort((a, b) => a - b);
  assert.deepStrictEqual(all, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

// Fib / phi
t("nearestFib и isFib", () => {
  assert.strictEqual(ORC.nearestFib(13), 13);
  assert.ok(ORC.isFib(21));
  assert.ok(!ORC.isFib(20));
  assert.strictEqual(ORC.nearestFib(100), 89);
});
t("kepler ladder proportions", () => {
  const kl = ORC.keplerLadder(1);
  assert.ok(Math.abs(kl.high / kl.mid - kl.mid / kl.low) < 1e-9);
  assert.ok(Math.abs(kl.high - ORC.PHI) < 1e-9);
});

// ИДСЗ
t("62 nodes", () => {
  assert.strictEqual(ORC.NODES.length, 62);
  assert.strictEqual(ORC.NODES.filter(n => n.cls === "icosa").length, 12);
  assert.strictEqual(ORC.NODES.filter(n => n.cls === "dodeca").length, 20);
  assert.strictEqual(ORC.NODES.filter(n => n.cls === "mid").length, 30);
});
t("all nodes valid coords", () => {
  ORC.NODES.forEach(n => {
    assert.ok(n.lat >= -90 && n.lat <= 90, "lat " + n.lat);
    assert.ok(n.lon >= -180 && n.lon <= 180, "lon " + n.lon);
  });
});
t("nearestNode Тбилиси", () => {
  const r = ORC.nearestNode(41.72, 44.83);
  assert.ok(r.node && typeof r.distanceKm === "number");
  assert.ok(r.distanceKm >= 0);
});
t("haversine zero", () => assert.ok(ORC.haversine(10, 20, 10, 20) < 1e-6));

// Second Key / lunar / parse
t("nearestFreq 528", () => {
  assert.strictEqual(ORC.nearestFreq(530).hz, 528);
  assert.strictEqual(ORC.nearestFreq(8).hz, 7.83);
});
t("step21", () => {
  for (let i = 1; i <= 50; i++) {
    const s = ORC.step21(i);
    assert.ok(s.step >= 1 && s.step <= 21);
    assert.ok(s.phase >= 1 && s.phase <= 3);
  }
  assert.strictEqual(ORC.step21(1).step, 1);
  assert.strictEqual(ORC.step21(21).step, 21);
  assert.strictEqual(ORC.step21(22).step, 1);
});
t("lunarPhase fraction", () => {
  const lp = ORC.lunarPhase(new Date(Date.UTC(2026, 7, 12)));
  assert.ok(lp.fraction >= 0 && lp.fraction < 1);
  assert.ok(typeof lp.name === "string");
});
t("parseInput", () => {
  assert.strictEqual(ORC.parseInput("42").type, "number");
  assert.strictEqual(ORC.parseInput("41.72, 44.83").type, "geo");
  assert.strictEqual(ORC.parseInput("528hz").type, "freq");
  assert.strictEqual(ORC.parseInput("2026-08-12").type, "date");
  assert.strictEqual(ORC.parseInput("10.04.1998").type, "date");
  assert.strictEqual(ORC.parseInput("Weeekend").type, "name");
  assert.strictEqual(ORC.parseInput("  ").type, "empty");
});
t("nameToNumber", () => {
  assert.ok(ORC.nameToNumber("MIGI") > 0);
  assert.strictEqual(ORC.nameToNumber("abc"), 6);
});

// Field Read
t("fieldRead: number", () => {
  const r = ORC.fieldRead("9");
  assert.ok(r.ok);
  assert.strictEqual(r.dr, 9);
  assert.ok(r.lenses.length >= 4);
  assert.ok(["ЗВУЧИТ", "ТРЕБУЕТ НАСТРОЙКИ", "НЕ ЗВУЧИТ"].indexOf(r.verdict) >= 0);
});
t("fieldRead: geo adds ИДСЗ", () => {
  const r = ORC.fieldRead("41.72, 44.83");
  assert.ok(r.ok);
  assert.ok(r.lenses.some(l => l.key === "geo"));
});
t("fieldRead: date adds luna", () => {
  const r = ORC.СТРОЙКИ", "НЕ ЗВУЧИТ"].indexOf(r.verdict) >= 0);
});

t("fieldRead: geo добавляет линзу ИДСЗ", () => {
  const r = ORC.fieldRead("41.72, 44.83");
  assert.ok(r.ok);
  assert.ok(r.lenses.some(l => l.key === "geo"));
});

t("fieldRead: дата добавляет луну", () => {
  const r = ORC.fieldRead("10.04.1998");
  assert.ok(r.ok);
  assert.ok(r.lenses.some(l => l.key === "luna"));
});

t("fieldRead: overall в диапазоне 0..100", () => {
  ["42", "Weeekend", "432hz", "2026-08-12", "41.72, 44.83"].forEach(v => {
    const r = ORC.fieldRead(v);
    assert.ok(r.overall >= 0 && r.overall <= 100, v + " => " + r.overall);
  });
});

t("fieldRead: пустой ввод — ok=false", () => {
  assert.strictEqual(ORC.fieldRead("").ok, false);
});

console.log("\n" + passed + " passed, " + failed + " failed\n");
process.exit(failed ? 1 : 0);
rt.strictEqual(p.calendar.length, 27);
  assert.ok(p.best.launch && p.best.money && p.best.release && p.best.deal && p.best.deepWork);
  assert.ok(p.peaks.length >= 0);
});

// v2 Create Design
t("createDesign returns 9 modules and 21 roadmap", () => {
  const c = ORC.createDesign({intent: "ORACULUM v2 release"});
  assert.ok(c.ok);
  assert.strictEqual(c.modules.length, 9);
  assert.strictEqual(c.roadmap.length, 21);
  assert.ok(c.dr >= 1 && c.dr <= 9);
  assert.ok(c.timing && c.timing.bestLaunch);
  assert.ok(c.checklist && c.checklist.axis369);
});

console.log("\n" + passed + " passed, " + failed + " failed\n");
process.exit(failed ? 1 : 0);
