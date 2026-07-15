/*
 * ORACULUM ∞ — Unified Field Engine (Natural Code core)
 * ------------------------------------------------------------
 * Один движок, который читает «поле» любого объекта через единый
 * Natural Code: Mod9 · φ/Fibonacci · Кеплерова лестница · 62 узла ИДСЗ ·
 * Solfeggio/Шуман · 21 шаг Второго Ключа · фаза Луны.
 *
 * Pure, dependency-free. UMD: работает в браузере (window.ORC) и в Node (require).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ORC = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var PHI = (1 + Math.sqrt(5)) / 2; // 1.6180339887...
  var INV_PHI = 1 / PHI; // 0.6180339887...
  var SQRT_PHI = Math.sqrt(PHI); // средняя ступень Кеплера
  var GOLDEN_ANGLE = 360 * (1 - INV_PHI); // 137.507...

  // ---------- Mod9 Resonance Algebra ----------
  function digitalRoot(n) {
    n = Math.abs(Math.trunc(n));
    if (n === 0) return 0;
    var r = n % 9;
    return r === 0 ? 9 : r;
  }
  var AXIS = [3, 6, 9];
  var RING = [1, 2, 4, 8, 7, 5]; // кольцо удвоения
  function mod9Class(dr) {
    if (dr === 9) return "ОСЬ · Источник (9 — возврат/целое)";
    if (dr === 3 || dr === 6) return "ОСЬ · " + (dr === 3 ? "исток (3)" : "заземление (6)");
    return "КОЛЬЦО · ток материи (1-2-4-8-7-5)";
  }
  function mirrorPair(dr) {
    var pairs = { 1: 8, 8: 1, 2: 7, 7: 2, 4: 5, 5: 4, 3: 6, 6: 3, 9: 9 };
    return pairs[dr];
  }
  var DR_MEANING = {
    1: "Старт, инициация, воля, новое направление",
    2: "Партнёрство, баланс, зеркало, дипломатия",
    3: "Творчество, публикация, рост, самовыражение",
    4: "Структура, фундамент, дисциплина, система",
    5: "Сделка, перемена, свобода, движение",
    6: "Дом, гармония, забота, клиент, сервис",
    7: "Анализ, уединение, исследование, глубина",
    8: "Деньги, власть, переговоры, масштаб",
    9: "Завершение, релиз, отдача, целостность"
  };

  // ---------- Fibonacci / φ ----------
  function fibUpTo(limit) {
    var a = 1, b = 1, arr = [1, 1];
    while (b <= limit) { var c = a + b; arr.push(c); a = b; b = c; }
    return arr;
  }
  function nearestFib(n) {
    var arr = fibUpTo(Math.max(Math.abs(n), 2) * 2 + 5);
    var best = arr[0];
    for (var i = 0; i < arr.length; i++)
      if (Math.abs(arr[i] - n) < Math.abs(best - n)) best = arr[i];
    return best;
  }
  function isFib(n) { return nearestFib(n) === n; }
  // Кеплерова лестница 1 : √φ : φ
  function keplerLadder(base) {
    return { low: base, mid: base * SQRT_PHI, high: base * PHI };
  }
  var PHI_SCALE = [8, 13, 21, 34, 55, 89, 144];

  // ---------- Frequencies (Solfeggio + Schumann + canonical) ----------
  var FREQS = [
    { hz: 7.83, name: "Шуман (несущая Земли)" },
    { hz: 174, name: "Solfeggio 174 — основа/безопасность" },
    { hz: 285, name: "Solfeggio 285 — регенерация тканей" },
    { hz: 396, name: "Solfeggio 396 — освобождение от страха" },
    { hz: 417, name: "Solfeggio 417 — перемены" },
    { hz: 432, name: "432 — натуральный строй" },
    { hz: 528, name: "Solfeggio 528 — трансформация/ДНК" },
    { hz: 639, name: "Solfeggio 639 — связь/отношения" },
    { hz: 741, name: "Solfeggio 741 — выражение/решения" },
    { hz: 852, name: "Solfeggio 852 — интуиция" },
    { hz: 963, name: "Solfeggio 963 — источник/шишковидная" }
  ];
  function nearestFreq(hz) {
    var best = FREQS[0];
    for (var i = 0; i < FREQS.length; i++)
      if (Math.abs(FREQS[i].hz - hz) < Math.abs(best.hz - hz)) best = FREQS[i];
    return best;
  }

  // ---------- 62-node ИДСЗ geo-crystal (икосаэдро-додекаэдрическая сетка) ----------
  function buildNodes() {
    var p = PHI, ip = INV_PHI;
    function perms(a, b, c) { return [[a, b, c], [c, a, b], [b, c, a]]; }
    function signs(base) {
      var out = [], idx = [];
      for (var i = 0; i < 3; i++) if (base[i] !== 0) idx.push(i);
      var combos = 1 << idx.length;
      for (var m = 0; m < combos; m++) {
        var v = base.slice();
        for (var k = 0; k < idx.length; k++) if (m & (1 << k)) v[idx[k]] = -v[idx[k]];
        out.push(v);
      }
      return out;
    }
    function expand(triples) {
      var out = [];
      triples.forEach(function (t) {
        perms(t[0], t[1], t[2]).forEach(function (pp) {
          signs(pp).forEach(function (s) { out.push(s); });
        });
      });
      var seen = {}, res = [];
      out.forEach(function (v) {
        var key = v.map(function (x) { return x.toFixed(6); }).join(",");
        if (!seen[key]) { seen[key] = 1; res.push(v); }
      });
      return res;
    }
    var ico = expand([[0, 1, p]]);            // 12 вершин икосаэдра
    var dodec = expand([[1, 1, 1]]).concat(expand([[0, ip, p]])); // 20 вершин додекаэдра
    function d2(a, b) {
      return (a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1])+(a[2]-b[2])*(a[2]-b[2]);
    }
    var mids = [], seenM = {};
    for (var i = 0; i < ico.length; i++)
      for (var j = i + 1; j < ico.length; j++)
        if (Math.abs(d2(ico[i], ico[j]) - 4) < 1e-6) {
          var m = [(ico[i][0]+ico[j][0])/2,(ico[i][1]+ico[j][1])/2,(ico[i][2]+ico[j][2])/2];
          var key = m.map(function (x) { return x.toFixed(4); }).join(",");
          if (!seenM[key]) { seenM[key] = 1; mids.push(m); }
        }
    function toLatLon(v, id, cls) {
      var r = Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
      return { id: id, cls: cls,
        lat: Math.asin(v[2]/r) * 180/Math.PI,
        lon: Math.atan2(v[1], v[0]) * 180/Math.PI };
    }
    var nodes = [];
    ico.forEach(function (v, i) { nodes.push(toLatLon(v, "A" + (i+1), "icosa")); });
    dodec.forEach(function (v, i) { nodes.push(toLatLon(v, "B" + (i+1), "dodeca")); });
    mids.forEach(function (v, i) { nodes.push(toLatLon(v, "C" + (i+1), "mid")); });
    return nodes;
  }
  var NODES = buildNodes();
  function haversine(lat1, lon1, lat2, lon2) {
    var R = 6371, toR = Math.PI/180;
    var dLat = (lat2-lat1)*toR, dLon = (lon2-lon1)*toR;
    var a = Math.sin(dLat/2)*Math.sin(dLat/2) +
      Math.cos(lat1*toR)*Math.cos(lat2*toR)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }
  function nearestNode(lat, lon) {
    var best = null, bestD = Infinity;
    for (var i = 0; i < NODES.length; i++) {
      var d = haversine(lat, lon, NODES[i].lat, NODES[i].lon);
      if (d < bestD) { bestD = d; best = NODES[i]; }
    }
    return { node: best, distanceKm: bestD };
  }

  // ---------- Lunar phase ----------
  function lunarPhase(date) {
    var ref = Date.UTC(2000, 0, 6, 18, 14, 0); // известное новолуние
    var syn = 29.530588853;
    var days = (date.getTime() - ref) / 86400000;
    var pos = ((days % syn) + syn) % syn;
    var frac = pos / syn;
    var names = ["Новолуние","Растущий серп","Первая четверть","Растущая горбатая",
      "Полнолуние","Убывающая горбатая","Последняя четверть","Убывающий серп"];
    var idx = Math.floor(frac * 8 + 0.5) % 8;
    return { fraction: frac, ageDays: pos, name: names[idx] };
  }

  // ---------- Второй Ключ — 21 шаг (3 фазы × 7) ----------
  var PHASES = ["Nigredo (растворение)","Albedo (очищение)","Rubedo (соединение)"];
  var OPS = ["Calcinatio","Solutio","Separatio","Coniunctio","Fermentatio","Distillatio","Coagulatio"];
  function step21(n) {
    var s = ((((Math.trunc(n) - 1) % 21) + 21) % 21) + 1; // 1..21
    var phase = Math.ceil(s / 7);
    var op = ((s - 1) % 7) + 1;
    return { step: s, phase: phase, phaseName: PHASES[phase-1], operation: OPS[op-1] };
  }

  // ---------- Имя/слово → число ----------
  function nameToNumber(str) {
    var sum = 0, s = String(str).toLowerCase();
    for (var i = 0; i < s.length; i++) {
      var ch = s[i], code = ch.charCodeAt(0);
      if (code >= 97 && code <= 122) sum += code - 96;           // a-z
      else if (code >= 1072 && code <= 1103) sum += code - 1071; // а-я
      else if (ch === "ё") sum += 7;
      else if (code >= 48 && code <= 57) sum += code - 48;       // цифры
    }
    return sum;
  }

  // ---------- Парсинг ввода ----------
  function parseInput(raw) {
    var s = String(raw == null ? "" : raw).trim();
    if (!s) return { type: "empty" };
    var coord = s.match(/^(-?\d+(?:\.\d+)?)\s*[,;]\s*(-?\d+(?:\.\d+)?)$/);
    if (coord) return { type: "geo", lat: parseFloat(coord[1]), lon: parseFloat(coord[2]) };
    var freq = s.match(/^(\d+(?:\.\d+)?)\s*(hz|гц)$/i);
    if (freq) return { type: "freq", hz: parseFloat(freq[1]) };
    var iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return { type: "date", date: new Date(Date.UTC(+iso[1], +iso[2]-1, +iso[3])) };
    var ru = s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (ru) return { type: "date", date: new Date(Date.UTC(+ru[3], +ru[2]-1, +ru[1])) };
    if (/^-?\d+(?:\.\d+)?$/.test(s)) return { type: "number", value: parseFloat(s) };
    return { type: "name", text: s };
  }

  // ---------- Главное чтение поля ----------
  function fieldRead(raw) {
    var p = parseInput(raw);
    var lenses = [], scores = [], seed = 0;
    if (p.type === "empty")
      return { ok: false, message: "Пусто — введи дату, число, координаты, частоту или слово." };

    if (p.type === "number") seed = p.value;
    else if (p.type === "freq") seed = p.hz;
    else if (p.type === "name") seed = nameToNumber(p.text);
    else if (p.type === "date") {
      var d = p.date;
      seed = d.getUTCFullYear() + (d.getUTCMonth()+1) + d.getUTCDate();
    } else if (p.type === "geo") {
      seed = Math.round(Math.abs(p.lat) + Math.abs(p.lon));
    }

    var dr = digitalRoot(Math.round(seed));
    lenses.push({ key: "mod9", title: "Mod9 · Резонансная алгебра", lines: [
      "Цифровой корень: " + dr,
      "Класс: " + mod9Class(dr),
      "Зеркальная пара: " + dr + " ↔ " + mirrorPair(dr),
      "Смысл: " + DR_MEANING[dr]
    ]});
    scores.push(AXIS.indexOf(dr) >= 0 ? (dr === 9 ? 100 : 82) : 61.8);

    var baseN = Math.round(Math.abs(seed)) || 1;
    var nf = nearestFib(baseN);
    var kl = keplerLadder(Math.abs(seed) || 1);
    var fibClose = nf === 0 ? 1 : Math.abs(nf - baseN) / nf;
    lenses.push({ key: "phi", title: "φ · Золото и Фибоначчи", lines: [
      "Ближайшее Фибоначчи: " + nf + (isFib(baseN) ? " (точное попадание ✦)" : ""),
      "Кеплерова лестница 1:√φ:φ → " + kl.low.toFixed(2) + " : " + kl.mid.toFixed(2) + " : " + kl.high.toFixed(2),
      "Золотой угол: " + GOLDEN_ANGLE.toFixed(2) + "°"
    ]});
    scores.push(Math.max(0, 100 - fibClose * 120));

    var st = step21(baseN);
    lenses.push({ key: "key21", title: "Второй Ключ · 21 шаг", lines: [
      "Шаг " + st.step + " из 21",
      "Фаза: " + st.phaseName,
      "Операция: " + st.operation
    ]});
    scores.push(st.step % 7 === 0 ? 90 : 61.8);

    var mappedHz = (seed % 900 + 900) % 900 + 60;
    var fr = nearestFreq(p.type === "freq" ? p.hz : mappedHz);
    lenses.push({ key: "freq", title: "Частота · Solfeggio / Шуман", lines: [
      (p.type === "freq" ? "Введено: " + p.hz + " Гц" : "seed → " + mappedHz.toFixed(1) + " Гц"),
      "Ближайший канон: " + fr.hz + " Гц — " + fr.name,
      "DR частоты: " + digitalRoot(Math.round(fr.hz))
    ]});
    scores.push(p.type === "freq" ? Math.max(0, 100 - Math.abs(fr.hz - p.hz)) : 61.8);

    if (p.type === "geo") {
      var nn = nearestNode(p.lat, p.lon);
      lenses.push({ key: "geo", title: "ИДСЗ · Гео-кристалл (62 узла)", lines: [
        "Точка: " + p.lat.toFixed(3) + ", " + p.lon.toFixed(3),
        "Ближайший узел: " + nn.node.id + " (" + nn.node.cls + ")",
        "Координаты узла: " + nn.node.lat.toFixed(2) + ", " + nn.node.lon.toFixed(2),
        "Дистанция: " + Math.round(nn.distanceKm) + " км"
      ]});
      scores.push(Math.max(0, 100 - nn.distanceKm / 40));
    }

    if (p.type === "date") {
      var lp = lunarPhase(p.date);
      lenses.push({ key: "luna", title: "Луна · Селено-кристалл", lines: [
        "Фаза: " + lp.name,
        "Возраст Луны: " + lp.ageDays.toFixed(1) + " дн",
        "Позиция цикла: " + (lp.fraction * 100).toFixed(0) + "%"
      ]});
      var gp = Math.min(Math.abs(lp.fraction - 0.382), Math.abs(lp.fraction - 0.618));
      scores.push(Math.max(0, 100 - gp * 300));
    }

    var overall = scores.reduce(function (a, b) { return a + b; }, 0) / scores.length;
    var verdict = overall >= 61.8 ? "ЗВУЧИТ" : (overall >= 38.2 ? "ТРЕБУЕТ НАСТРОЙКИ" : "НЕ ЗВУЧИТ");

    return { ok: true, input: p, seed: seed, dr: dr,
      overall: Math.round(overall * 10) / 10, verdict: verdict, lenses: lenses };
  }

  return {
    PHI: PHI, INV_PHI: INV_PHI, SQRT_PHI: SQRT_PHI, GOLDEN_ANGLE: GOLDEN_ANGLE, PHI_SCALE: PHI_SCALE,
    digitalRoot: digitalRoot, mod9Class: mod9Class, mirrorPair: mirrorPair,
    DR_MEANING: DR_MEANING, AXIS: AXIS, RING: RING,
    fibUpTo: fibUpTo, nearestFib: nearestFib, isFib: isFib, keplerLadder: keplerLadder,
    FREQS: FREQS, nearestFreq: nearestFreq,
    NODES: NODES, nearestNode: nearestNode, haversine: haversine,
    lunarPhase: lunarPhase, step21: step21, nameToNumber: nameToNumber,
    parseInput: parseInput, fieldRead: fieldRead
  };
});
