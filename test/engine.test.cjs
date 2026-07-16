/* ORACULUM ∞ v3 — unit tests (node, zero deps) */
const assert = require("assert");
const ORC = require("../engine.js");

let passed = 0, failed = 0;
function t(name, fn) {
  try { fn(); passed++; console.log("  ✓ " + name); }
  catch (e) { failed++; console.log("  ✗ " + name + "\n      " + e.message); }
}

console.log("\nORACULUM ∞ v3 engine tests\n");

// Core
t("version 3.0.0", () => assert.strictEqual(ORC.version, "3.0.0"));
t("φ² = φ + 1", () => assert.ok(Math.abs(ORC.PHI * ORC.PHI - (ORC.PHI + 1)) < 1e-9));
t("1/φ = φ - 1", () => assert.ok(Math.abs(ORC.INV_PHI - (ORC.PHI - 1)) < 1e-9));
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
t("nearestNode Тбилиси", () => {
  const r = ORC.nearestNode(41.72, 44.83);
  assert.ok(r.node && typeof r.distanceKm === "number");
  assert.ok(r.distanceKm >= 0);
});

// Second Key / lunar / parse
t("nearestFreq 528", () => assert.strictEqual(ORC.nearestFreq(530).hz, 528));
t("step21", () => {
  for (let i = 1; i <= 50; i++) {
    const s = ORC.step21(i);
    assert.ok(s.step >= 1 && s.step <= 21);
    assert.ok(s.phase >= 1 && s.phase <= 3);
  }
});
t("parseInput", () => {
  assert.strictEqual(ORC.parseInput("42").type, "number");
  assert.strictEqual(ORC.parseInput("41.72, 44.83").type, "geo");
  assert.strictEqual(ORC.parseInput("528hz").type, "freq");
  assert.strictEqual(ORC.parseInput("2026-08-12").type, "date");
  assert.strictEqual(ORC.parseInput("10.04.1998").type, "date");
  assert.strictEqual(ORC.parseInput("Weeekend").type, "name");
  assert.strictEqual(ORC.parseInput("#ff5a5a").type, "color");
  assert.strictEqual(ORC.parseInput("10:00").type, "time");
});

// Field Read
t("fieldRead: number", () => {
  const r = ORC.fieldRead("9");
  assert.ok(r.ok);
  assert.strictEqual(r.dr, 9);
  assert.ok(r.lenses.length >= 4);
});
t("fieldRead: date adds luna", () => {
  const r = ORC.fieldRead("10.04.1998");
  assert.ok(r.ok);
  assert.ok(r.lenses.some(l => l.key === "luna"));
});
t("fieldRead: color", () => {
  const r = ORC.fieldRead("#ff5a5a");
  assert.ok(r.ok);
  assert.strictEqual(r.input.type, "color");
});

// v2/v3 Deep Birth
t("birthProfile returns deep numbers", () => {
  const b = ORC.birthProfile({name: "Максим Мигай", date: "1998-04-10"});
  assert.ok(b.ok);
  assert.strictEqual(b.numbers.dr, 5);
  assert.ok(b.numbers.soul > 0);
  assert.ok(b.spectrum && Object.keys(b.spectrum).length === 9);
  assert.ok(b.insight.length > 5);
});

// v3 new functions
t("synastry", () => {
  const s = ORC.synastry({date: "1998-04-10"}, {date: "2000-01-01"});
  assert.ok(s.ok);
  assert.ok(s.score >= 0 && s.score <= 100);
});
t("brandProfile", () => {
  const b = ORC.brandProfile("ORACULUM");
  assert.ok(b.ok);
  assert.ok(b.dr >= 1 && b.dr <= 9);
  assert.ok(b.score > 0);
});
t("colorOfNumber", () => {
  const c = ORC.colorOfNumber(7);
  assert.strictEqual(c.dr, 7);
  assert.ok(c.hex);
});
t("textResonance", () => {
  const t = ORC.textResonance("ORACULUM v3 release");
  assert.ok(t.ok);
  assert.ok(t.words > 0);
});
t("headlineScore", () => {
  const h = ORC.headlineScore("Как удвоить доход за 30 дней");
  assert.ok(h.ok);
  assert.ok(h.score >= 0 && h.score <= 100);
});
t("decisionMatrix", () => {
  const d = ORC.decisionMatrix(["A", "B", "C"], {birth: {date: "1998-04-10"}});
  assert.ok(d.ok);
  assert.strictEqual(d.rows.length, 3);
  assert.ok(d.winner);
});
t("teamField", () => {
  const team = ORC.teamField([{date: "1998-04-10"}, {date: "1990-05-15"}, {date: "1985-12-01"}]);
  assert.ok(team.ok);
  assert.ok(team.teamDR >= 1 && team.teamDR <= 9);
});
t("moneyMap", () => {
  const m = ORC.moneyMap({date: "1998-04-10"}, 30);
  assert.ok(m.ok);
  assert.ok(m.bestMoneyDR >= 1 && m.bestMoneyDR <= 9);
});
t("healthRhythm", () => {
  const h = ORC.healthRhythm({date: "1998-04-10"}, "2026-07-16");
  assert.ok(h.ok);
  assert.ok(h.physical >= 0 && h.physical <= 100);
});
t("chronobiology", () => {
  const c = ORC.chronobiology({date: "1998-04-10"}, "2026-07-16");
  assert.ok(c.ok);
  assert.ok(c.schedule.length > 0);
});
t("dreamRead", () => {
  const d = ORC.dreamRead("я летал над водой и увидел золото");
  assert.ok(d.ok);
  assert.ok(d.symbols.length > 0);
});
t("ichingDraw", () => {
  const i = ORC.ichingDraw("что делать?");
  assert.ok(i.ok);
  assert.ok(i.hexagram);
});
t("tarotSpread", () => {
  const t = ORC.tarotSpread(123);
  assert.ok(t.ok);
  assert.strictEqual(t.cards.length, 3);
});
t("routeScore", () => {
  const r = ORC.routeScore([{name: "A", lat: 41.72, lon: 44.83}, {name: "B", lat: 46.54, lon: 61.17}]);
  assert.ok(r.ok);
  assert.ok(r.score >= 0 && r.score <= 100);
});
t("manifestation369", () => {
  const m = ORC.manifestation369("рост дохода", 21);
  assert.ok(m.ok);
  assert.strictEqual(m.plan.length, 21);
});
t("foodResonance", () => {
  const f = ORC.foodResonance("чай");
  assert.ok(f.ok);
  assert.ok(f.type);
});
t("learningWindow", () => {
  const l = ORC.learningWindow("JavaScript", {date: "1998-04-10"});
  assert.ok(l.ok);
  assert.ok(l.dr >= 1 && l.dr <= 9);
});
t("commitTiming", () => {
  const c = ORC.commitTiming("v3 release", {date: "1998-04-10"});
  assert.ok(c.ok);
  assert.ok(c.score >= 0 && c.score <= 100);
});
t("priceResonance", () => {
  const p = ORC.priceResonance(999);
  assert.ok(p.ok);
  assert.ok(p.phiFriendly);
});
t("yearlyArc", () => {
  const y = ORC.yearlyArc({date: "1998-04-10"}, 2026);
  assert.ok(y.ok);
  assert.ok(y.personalYear >= 1 && y.personalYear <= 9);
});
t("soulContract", () => {
  const s = ORC.soulContract({date: "1998-04-10"});
  assert.ok(s.ok);
  assert.ok(s.coreLesson);
});
t("dailyRitual", () => {
  const d = ORC.dailyRitual({date: "1998-04-10"}, "2026-07-16");
  assert.ok(d.ok);
  assert.ok(d.ritual);
});
t("astroLocality", () => {
  const a = ORC.astroLocality({date: "1998-04-10"}, 41.72, 44.83);
  assert.ok(a.ok);
  assert.ok(a.verdict);
});
t("eventFlow", () => {
  const e = ORC.eventFlow({date: "1998-04-10"}, "2026-07-16", 9);
  assert.ok(e.ok);
  assert.ok(e.flow.length > 0);
});
t("crystalOf", () => {
  const c = ORC.crystalOf(7);
  assert.ok(c.crystal);
});

console.log("\n" + passed + " passed, " + failed + " failed\n");
process.exit(failed ? 1 : 0);
