/* ORACULUM ∞ v3.0 — Living Unified Field Engine */
(function (root, factory) { if (typeof module === "object" && module.exports) module.exports = factory(); else root.ORC = factory(); })(typeof self !== "undefined" ? self : this, function () {
"use strict";

var PHI = (1 + Math.sqrt(5)) / 2, INV_PHI = 1 / PHI, SQRT_PHI = Math.sqrt(PHI), GOLDEN_ANGLE = 360 * (1 - INV_PHI);
var AXIS = [3, 6, 9], RING = [1, 2, 4, 8, 7, 5], TRI_A = [1, 4, 7], TRI_B = [2, 5, 8];
var SYNODIC = 29.530588853, SIDEREAL = 27.321661, NEW_MOON_REF = Date.UTC(2000, 0, 6, 18, 14, 0);
var OPS = ["Calcinatio", "Solutio", "Separatio", "Coniunctio", "Fermentatio", "Distillatio", "Coagulatio"];
var PHASES21 = ["Nigredo", "Albedo", "Rubedo"];
var PLANETS = ["Солнце", "Луна", "Марс", "Меркурий", "Юпитер", "Венера", "Сатурн"];
var ZODIAC = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"];
var HEXAGRAMS = ["Творческое", "Рецептивное", "Трудности", "Юность", "Умиротворение", "Спор", "Армия", "Содружество", "Умиротворение малого", "Тактика", "Мир", "Стояние", "Товарищество", "Большое имущество", "Скромность", "Энтузиазм", "Последователи", "Исправление", "Подход", "Созерцание", "Схватка", "Развитие", "Распад", "Возвращение", "Безупречность", "Питание", "Превосходящий", "Великий избыток", "Канцы", "Скорбный", "Привлечение", "Длительность", "Отступление", "Великая сила", "Прогресс", "Темное", "Семья", "Разногласие", "Трудности", "Разрешение", "Убыток", "Приобретение", "Удовлетворение", "Соединение", "Сбор", "Подъем", "Беда", "Колодец", "Революция", "Котел", "Гром", "Устойчивость", "Отступление", "Изобилие", "Паломничество", "Гостиная", "Измерение", "Проницаемость", "Последнее"];
var TAROT_MAJOR = ["Шут", "Маг", "Верховная Жрица", "Императрица", "Император", "Иерофант", "Влюбленные", "Колесница", "Сила", "Отшельник", "Колесо Фортуны", "Справедливость", "Повешенный", "Смерть", "Умеренность", "Дьявол", "Башня", "Звезда", "Луна", "Солнце", "Суд", "Мир"];
var RUNES = ["Феху", "Уруз", "Турисаз", "Ансуз", "Райдо", "Кеназ", "Гебо", "Вуньо", "Хагалаз", "Наутиз", "Иса", "Йера", "Эйваз", "Перт", "Альгиз", "Соулу", "Тейваз", "Беркана", "Эваз", "Манназ", "Лагуз", "Ингуз", "Одал", "Дагаз"];
var ELEMENTS = ["Огонь", "Вода", "Земля", "Воздух", "Эфир"];
var CHAKRAS = ["Муладхара", "Свадхистана", "Манипура", "Анахата", "Вишудха", "Аджна", "Сахасрара"];
var BODY_SYSTEMS = ["нервная", "сердечно-сосудистая", "дыхательная", "пищеварительная", "опорно-двигательная", "эндокринная", "иммунная", "выделительная", "репродуктивная"];

var DR_MEANING = {1: "Старт · воля · семя", 2: "Партнёрство · баланс", 3: "Творчество · рост", 4: "Структура · фундамент", 5: "Сделка · перемена", 6: "Дом · сервис", 7: "Анализ · глубина", 8: "Деньги · масштаб", 9: "Завершение · релиз"};
var DR_ACTION = {1: "Запускай", 2: "Связывай", 3: "Публикуй", 4: "Строй систему", 5: "Двигай сделки", 6: "Сервись", 7: "Исследуй", 8: "Торгуйся", 9: "Закрывай"};
var MONEY_DR = {1: {score: 88, label: "Посев"}, 2: {score: 72, label: "Партнёрства"}, 3: {score: 70, label: "Креатив→деньги"}, 4: {score: 65, label: "Инфра"}, 5: {score: 92, label: "Сделки"}, 6: {score: 80, label: "Клиенты"}, 7: {score: 55, label: "DD"}, 8: {score: 96, label: "Пик денег"}, 9: {score: 78, label: "Отдача"}};
var OPS_TIPS = {Calcinatio: "Огонь: сожги лишнее", Solutio: "Вода: раствори", Separatio: "Раздели", Coniunctio: "Соедини", Fermentatio: "Дай созреть", Distillatio: "Чистый экстракт", Coagulatio: "Релиз/деньги"};
var FREQS = [{hz: 7.83, name: "Шуман"}, {hz: 174, name: "174"}, {hz: 285, name: "285"}, {hz: 396, name: "396"}, {hz: 417, name: "417"}, {hz: 432, name: "432"}, {hz: 528, name: "528"}, {hz: 639, name: "639"}, {hz: 741, name: "741"}, {hz: 852, name: "852"}, {hz: 963, name: "963"}];
var COLORS = [{n: 1, hex: "#ff5a5a", name: "Алый"}, {n: 2, hex: "#ff9f5a", name: "Янтарный"}, {n: 3, hex: "#ffd75a", name: "Золотой"}, {n: 4, hex: "#5aff8a", name: "Изумрудный"}, {n: 5, hex: "#5a9fff", name: "Электрик"}, {n: 6, hex: "#c75aff", name: "Аметист"}, {n: 7, hex: "#5a5aff", name: "Синий"}, {n: 8, hex: "#ff5ad7", name: "Малиновый"}, {n: 9, hex: "#ffffff", name: "Белый"}];
var FOOD = {1: {type: "огненная", examples: "перец, им��ирь"}, 2: {type: "вода-земля", examples: "мёд, курага"}, 3: {type: "воздух-огонь", examples: "цитрусы, кофе"}, 4: {type: "земля", examples: "корнеплоды"}, 5: {type: "воздух", examples: "зерно, чай"}, 6: {type: "вода", examples: "супы, рыба"}, 7: {type: "эфир", examples: "грибы, водоросли"}, 8: {type: "металл", examples: "мясо, яйца"}, 9: {type: "свет", examples: "пост, вода"}};
var DEFAULT_BIRTH = {name: "Максим Мигай", date: "1998-04-10", time: "10:00", lat: 46.54, lon: 61.17, place: "Светлогорск, Казахстан"};
var MEANING_WORDS = {1: "старт", 2: "пара", 3: "творчество", 4: "фундамент", 5: "свобода", 6: "сервис", 7: "глубина", 8: "масштаб", 9: "завершение"};

function digitalRoot(n) { n = Math.abs(Math.trunc(Number(n) || 0)); if (n === 0) return 0; var r = n % 9; return r === 0 ? 9 : r; }
function sumDigits(n) { n = Math.abs(Math.trunc(Number(n) || 0)); var s = 0; while (n > 0) { s += n % 10; n = Math.floor(n / 10); } return s; }
function digitalRootSteps(n) { var steps = [Math.abs(Math.trunc(Number(n) || 0))]; while (steps[steps.length - 1] > 9) steps.push(sumDigits(steps[steps.length - 1])); return steps; }
function mod9Class(dr) { if (dr === 9) return "ОСЬ(9)"; if (dr === 3 || dr === 6) return "ОС��(" + dr + ")"; return "КОЛЬЦО"; }
function mirrorPair(dr) { return {1: 8, 8: 1, 2: 7, 7: 2, 4: 5, 5: 4, 3: 6, 6: 3, 9: 9, 0: 0}[dr]; }
function axisOf(dr) { if (TRI_A.indexOf(dr) >= 0) return {id: "147", name: "147"}; if (TRI_B.indexOf(dr) >= 0) return {id: "258", name: "258"}; if (AXIS.indexOf(dr) >= 0) return {id: "369", name: "369"}; return {id: "?", name: "?"}; }
function mulMod9(a, b) { var p = (a * b) % 9; return p === 0 ? 9 : p; }
function opArchetype(k) { if (k === 1) return "Самость"; if (k === 2 || k === 5) return "Ток"; if (k === 4 || k === 7) return "Гармоники"; if (k === 8) return "Инверсия"; if (k === 3 || k === 6) return "Коллапс"; if (k === 9) return "Аннигиляция"; return "?"; }
function fibUpTo(limit) { var a = 1, b = 1, arr = [1, 1]; while (b <= limit) { var c = a + b; arr.push(c); a = b; b = c; } return arr; }
function nearestFib(n) { var arr = fibUpTo(Math.max(Math.abs(n), 2) * 2 + 5), best = arr[0]; for (var i = 0; i < arr.length; i++) if (Math.abs(arr[i] - n) < Math.abs(best - n)) best = arr[i]; return best; }
function isFib(n) { return nearestFib(n) === n; }
function keplerLadder(base) { return {low: base, mid: base * SQRT_PHI, high: base * PHI}; }
function nearestFreq(hz) { var best = FREQS[0]; for (var i = 0; i < FREQS.length; i++) if (Math.abs(FREQS[i].hz - hz) < Math.abs(best.hz - hz)) best = FREQS[i]; return best; }
function step21(n) { var s = ((((Math.trunc(n) - 1) % 21) + 21) % 21) + 1; var phase = Math.ceil(s / 7); var op = ((s - 1) % 7) + 1; return {step: s, phase: phase, phaseName: PHASES21[phase - 1], operation: OPS[op - 1]}; }
function nameToNumber(str) { var sum = 0, s = String(str || "").toLowerCase(); for (var i = 0; i < s.length; i++) { var ch = s[i], c = ch.charCodeAt(0); if (c >= 97 && c <= 122) sum += c - 96; else if (c >= 1072 && c <= 1103) sum += c - 1071; else if (ch === "ё") sum += 7; else if (c >= 48 && c <= 57) sum += c - 48; } return sum; }
function hash32(s) { var h = 0; for (var i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; } return Math.abs(h); }
function seededRandom(seed) { var x = Math.sin(seed * 9999) * 10000; return x - Math.floor(x); }
function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function goldenRatioSplit(n) { return {n: n, small: n * INV_PHI, large: n * (1 - INV_PHI)}; }
function solarYearProgress(d) { var y = d.getUTCFullYear(), s = new Date(Date.UTC(y, 0, 1)), e = new Date(Date.UTC(y + 1, 0, 1)); return (d.getTime() - s.getTime()) / (e.getTime() - s.getTime()); }
function zodiacOf(d) { var day = d.getUTCDate(), m = d.getUTCMonth() + 1; var z = ((m - 1) * 2 + Math.floor(day / 15)); z = Math.max(0, Math.min(11, z)); return ZODIAC[z]; }
function chakraOf(dr) { return CHAKRAS[Math.min(6, Math.max(0, dr - 1))]; }
function elementOf(dr) { if (dr === 1 || dr === 5 || dr === 9) return ELEMENTS[0]; if (dr === 2 || dr === 6) return ELEMENTS[1]; if (dr === 3 || dr === 7) return ELEMENTS[3]; if (dr === 4 || dr === 8) return ELEMENTS[2]; return ELEMENTS[4]; }
function letterDR(c) { var v = (c || "").toLowerCase().charCodeAt(0); if (v >= 1072 && v <= 1103) return digitalRoot(v - 1071); if (v >= 97 && v <= 122) return digitalRoot(v - 96); return 0; }
function parseDate(raw) { if (raw instanceof Date) return raw; var s = String(raw || "").trim();
  var iso = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/); if (iso) return new Date(Date.UTC(+iso[1], +iso[2] - 1, +iso[3], +(iso[4] || 0), +(iso[5] || 0)));
  var ru = s.match(/^(\d{2})\.(\d{2})\.(\d{4})(?:\s+(\d{2}):(\d{2}))?/); if (ru) return new Date(Date.UTC(+ru[3], +ru[2] - 1, +ru[1], +(ru[4] || 0), +(ru[5] || 0)));
  var d = new Date(s); return isNaN(d.getTime()) ? null : d; }
function ymd(d) { return {y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, day: d.getUTCDate(), h: d.getUTCHours(), min: d.getUTCMinutes()}; }
function dateDR(d) { var p = ymd(d); return digitalRoot(sumDigits(p.y) + sumDigits(p.m) + sumDigits(p.day)); }
function lifePath(d) { var p = ymd(d); return digitalRoot(digitalRoot(p.y) + digitalRoot(p.m) + digitalRoot(p.day)); }
function personalYear(birth, year) { var b = ymd(birth); return digitalRoot(digitalRoot(b.m) + digitalRoot(b.day) + digitalRoot(year)); }
function personalMonth(birth, year, month) { return digitalRoot(personalYear(birth, year) + digitalRoot(month)); }
function personalDay(birth, year, month, day) { return digitalRoot(personalMonth(birth, year, month) + digitalRoot(day)); }
function planetDay(d) { return PLANETS[d.getUTCDay()]; }
function daysBetween(a, b) { return Math.floor((b.getTime() - a.getTime()) / 86400000); }
function ageYears(birth, now) { now = now || new Date(); var days = daysBetween(birth, now); var yf = Math.floor(days / 365.2425); return {days: days, years: days / 365.2425, yearsFloor: yf, nineYearCycle: Math.floor(yf / 9), nineYearPhase: yf % 9 + 1, cycle27: Math.floor(days / 27) % 9 + 1, cycle81: Math.floor(days / 81) % 9 + 1, cycle243: Math.floor(days / 243) % 9 + 1}; }
function lunarPhase(date) { var days = (date.getTime() - NEW_MOON_REF) / 86400000; var pos = ((days % SYNODIC) + SYNODIC) % SYNODIC; var frac = pos / SYNODIC;
  var names = ["Новолуние", "Растущий серп", "Первая четверть", "Растущая", "Полнолуние", "Убывающая", "Последняя четверть", "Убывающий серп"]; var idx = Math.floor(frac * 8 + 0.5) % 8;
  var phiPts = [0, 0.382, 0.5, 0.618, 1], nearestPhi = 0, best = 1; for (var i = 0; i < phiPts.length; i++) { var dd = Math.abs(frac - phiPts[i]); if (dd < best) { best = dd; nearestPhi = phiPts[i]; } }
  return {fraction: frac, ageDays: pos, name: names[idx], illumination: 0.5 * (1 - Math.cos(2 * Math.PI * frac)), nearestPhiPoint: nearestPhi, phiDistance: best, isPhiWindow: best < 0.04, siderealAge: ((days % SIDEREAL) + SIDEREAL) % SIDEREAL}; }
function retroHint(d) { var pd = planetDay(d); return pd === "Меркурий" ? "Ретро-тон: проверяй 2x" : pd === "Марс" ? "Марс: прямота" : pd === "Сатурн" ? "Сатурн: структура" : ""; }
function voidOfCourseHint(d) { var lp = lunarPhase(d); return lp.fraction > 0.48 && lp.fraction < 0.52 ? "Луна в последней четверти — затишье" : ""; }
function biorhythm(birth, date) { var days = daysBetween(birth, date); return {physical: Math.sin(2 * Math.PI * days / 23), emotional: Math.sin(2 * Math.PI * days / 28), intellectual: Math.sin(2 * Math.PI * days / 33), intuitive: Math.sin(2 * Math.PI * days / 38)}; }
function goldenHour(birth, date) { var br = biorhythm(birth, date); var score = (br.physical + br.emotional + br.intellectual + 3) / 6 * 100; return Math.round(score); }
function buildNodes() { var p = PHI, ip = INV_PHI;
  function perms(a, b, c) { return [[a, b, c], [c, a, b], [b, c, a]]; }
  function signs(base) { var out = [], idx = []; for (var i = 0; i < 3; i++) if (base[i] !== 0) idx.push(i); var combos = 1 << idx.length; for (var m = 0; m < combos; m++) { var v = base.slice(); for (var k = 0; k < idx.length; k++) if (m & (1 << k)) v[idx[k]] = -v[idx[k]]; out.push(v); } return out; }
  function expand(triples) { var out = []; triples.forEach(function (t) { perms(t[0], t[1], t[2]).forEach(function (pp) { signs(pp).forEach(function (s) { out.push(s); }); }); }); var seen = {}, res = []; out.forEach(function (v) { var key = v.map(function (x) { return x.toFixed(6); }).join(","); if (!seen[key]) { seen[key] = 1; res.push(v); } }); return res; }
  var ico = expand([[0, 1, p]]); var dodec = expand([[1, 1, 1]]).concat(expand([[0, ip, p]]));
  function d2(a, b) { return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2]); }
  var mids = [], seenM = {}; for (var i = 0; i < ico.length; i++) for (var j = i + 1; j < ico.length; j++) if (Math.abs(d2(ico[i], ico[j]) - 4) < 1e-6) { var m = [(ico[i][0] + ico[j][0]) / 2, (ico[i][1] + ico[j][1]) / 2, (ico[i][2] + ico[j][2]) / 2]; var key = m.map(function (x) { return x.toFixed(4); }).join(","); if (!seenM[key]) { seenM[key] = 1; mids.push(m); } }
  function toLatLon(v, id, cls) { var r = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]); return {id: id, cls: cls, lat: Math.asin(v[2] / r) * 180 / Math.PI, lon: Math.atan2(v[1], v[0]) * 180 / Math.PI}; }
  var nodes = []; ico.forEach(function (v, i) { nodes.push(toLatLon(v, "A" + (i + 1), "icosa")); }); dodec.forEach(function (v, i) { nodes.push(toLatLon(v, "B" + (i + 1), "dodeca")); }); mids.forEach(function (v, i) { nodes.push(toLatLon(v, "C" + (i + 1), "mid")); }); return nodes;
}
var NODES = buildNodes();
function haversine(lat1, lon1, lat2, lon2) { var R = 6371, toR = Math.PI / 180, dLat = (lat2 - lat1) * toR, dLon = (lon2 - lon1) * toR; var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * toR) * Math.cos(lat2 * toR) * Math.sin(dLon / 2) * Math.sin(dLon / 2); return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); }
function nearestNode(lat, lon) { var best = null, bestD = Infinity; for (var i = 0; i < NODES.length; i++) { var d = haversine(lat, lon, NODES[i].lat, NODES[i].lon); if (d < bestD) { bestD = d; best = NODES[i]; } } return {node: best, distanceKm: bestD}; }
function nodePhase(node, date) { var t = date.getTime() / 86400000; var seed = (node.lat + 90) * 17 + (node.lon + 180) * 31; var cycle = 12 * PHI; var phase = ((t / 365.2425 + seed) % cycle) / cycle; var heat = 0.5 + 0.5 * Math.cos(2 * Math.PI * phase); return {phase: phase, heat: heat, label: heat > 0.7 ? "ГОРЯЧИЙ" : (heat > 0.4 ? "ТЁПЛЫЙ" : "ХОЛОДНЫЙ")}; }
function leyLine(lat1, lon1, lat2, lon2) { var d = haversine(lat1, lon1, lat2, lon2); var midLat = (lat1 + lat2) / 2, midLon = (lon1 + lon2) / 2; var nn = nearestNode(midLat, midLon); var score = Math.max(0, 100 - d / 50); return {distanceKm: d, nearestNode: nn.node, nodeScore: Math.round(score), dr: digitalRoot(Math.round(d))}; }
function nodesInRadius(lat, lon, km) { var out = []; for (var i = 0; i < NODES.length; i++) { var d = haversine(lat, lon, NODES[i].lat, NODES[i].lon); if (d <= km) out.push({node: NODES[i], distanceKm: d}); } out.sort(function (a, b) { return a.distanceKm - b.distanceKm; }); return out; }
function birthProfile(opts) { opts = opts || {};
  var name = opts.name || DEFAULT_BIRTH.name, dateStr = opts.date || DEFAULT_BIRTH.date, time = opts.time || DEFAULT_BIRTH.time;
  var lat = opts.lat != null ? opts.lat : DEFAULT_BIRTH.lat, lon = opts.lon != null ? opts.lon : DEFAULT_BIRTH.lon, place = opts.place || DEFAULT_BIRTH.place;
  var now = opts.now ? parseDate(opts.now) : new Date();
  var birth = parseDate(dateStr + (time ? " " + time : "")); if (!birth) return {ok: false, message: "Невалидная дата рождения"};
  var p = ymd(birth), rawSum = sumDigits(p.y) + sumDigits(p.m) + sumDigits(p.day), dr = digitalRoot(rawSum);
  var lp = lifePath(birth), soul = digitalRoot(nameToNumber(name)), destiny = digitalRoot(soul + dr), hourDR = digitalRoot(p.h * 60 + p.min);
  var ax = axisOf(dr), age = ageYears(birth, now);
  var py = personalYear(birth, now.getUTCFullYear()), pm = personalMonth(birth, now.getUTCFullYear(), now.getUTCMonth() + 1);
  var pd = personalDay(birth, now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate());
  var nn = nearestNode(lat, lon), np = nodePhase(nn.node, now), lunaBirth = lunarPhase(birth), lunaNow = lunarPhase(now), st = step21(age.days);
  var amps = {}; for (var k = 1; k <= 9; k++) amps[k] = 0.08; amps[dr] += 0.28; amps[lp] += 0.18; amps[soul] += 0.14; amps[py] += 0.10; amps[pd] += 0.08; amps[mirrorPair(dr)] += 0.06;
  var sumA = 0; for (k = 1; k <= 9; k++) sumA += amps[k]; for (k = 1; k <= 9; k++) amps[k] = Math.round((amps[k] / sumA) * 1000) / 1000;
  var dominant = 1; for (k = 2; k <= 9; k++) if (amps[k] > amps[dominant]) dominant = k;
  var br = biorhythm(birth, now), gh = goldenHour(birth, now);
  var insight = [];
  insight.push("DR: " + dr + " — " + DR_MEANING[dr]); insight.push("LP: " + lp + " · Soul: " + soul + " · Destiny: " + destiny);
  insight.push("Ось: " + ax.name + " · зеркало " + dr + "↔" + mirrorPair(dr)); insight.push("Личный год " + now.getUTCFullYear() + ": " + py + " — " + DR_MEANING[py]);
  insight.push("Личный день: " + pd + " — " + DR_ACTION[pd]); insight.push("9-летняя фаза: " + age.nineYearPhase + "/9 — " + DR_MEANING[age.nineYearPhase]);
  insight.push("Возраст: " + age.yearsFloor + " · шаг21: " + st.step + " " + st.operation);
  insight.push("ИДСЗ: " + nn.node.id + " · " + Math.round(nn.distanceKm) + " км · " + np.label);
  insight.push("Луна: " + lunaBirth.name + " → сейчас: " + lunaNow.name);
  insight.push("Элемент: " + elementOf(dr) + " · Чакра: " + chakraOf(dr) + " · Зодиак: " + zodiacOf(birth));
  insight.push("Золотой час: " + gh + "/100 · бодрость " + Math.round((br.physical + 1) * 50) + "%");
  if (dr === 5) insight.push("DR5 — оператор перемен."); if (py === 1) insight.push("Личный год 1 — закладка систем."); if (py === 8) insight.push("Личный год 8 — масштаб."); if (py === 9) insight.push("Личный год 9 — завершение цикла.");
  return {ok: true, name: name, place: place, birthISO: dateStr, time: time, lat: lat, lon: lon, birth: birth, now: now,
    numbers: {rawSum: rawSum, dr: dr, lifePath: lp, soul: soul, destiny: destiny, hourDR: hourDR, steps: digitalRootSteps(rawSum), axis: ax, mirror: mirrorPair(dr), meaning: DR_MEANING[dr], action: DR_ACTION[dr], archetype: opArchetype(dr)},
    cycles: {age: age, personalYear: py, personalMonth: pm, personalDay: pd, personalYearMeaning: DR_MEANING[py], nineYearPhase: age.nineYearPhase, nineYearMeaning: DR_MEANING[age.nineYearPhase], step21: st, planetToday: planetDay(now), zodiac: zodiacOf(birth)},
    field: {nearestNode: nn, nodePhase: np, lunaBirth: lunaBirth, lunaNow: lunaNow}, spectrum: amps, dominant: dominant, biorhythm: br, goldenHour: gh,
    formula: "DR=" + dr + " · LP=" + lp + " · Soul=" + soul + " · Dest=" + destiny + " · Axis=" + ax.id + " · PY" + now.getUTCFullYear() + "=" + py, insight: insight};
}
function eventScore(opts) { opts = opts || {}; var date = parseDate(opts.date) || new Date();
  var lat = opts.lat != null ? opts.lat : DEFAULT_BIRTH.lat, lon = opts.lon != null ? opts.lon : DEFAULT_BIRTH.lon;
  var birth = parseDate(opts.birth || DEFAULT_BIRTH.date);
  var dr = dateDR(date), luna = lunarPhase(date), nn = nearestNode(lat, lon), np = nodePhase(nn.node, date);
  var pd = birth ? personalDay(birth, date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()) : dr;
  var sDR = AXIS.indexOf(dr) >= 0 ? (dr === 9 ? 92 : 78) : (RING.indexOf(dr) >= 0 ? 70 : 50); if (dr === 5 || dr === 8) sDR = 90;
  var sLuna = Math.round(40 + 60 * (1 - Math.min(1, luna.phiDistance * 8))); if (luna.name === "Новолуние" || luna.name === "Полнолуние") sLuna = Math.max(sLuna, 88);
  var sNode = Math.round(np.heat * 100); var sPersonal = (pd === dr) ? 95 : (mirrorPair(pd) === dr ? 82 : 60); var sMoney = MONEY_DR[dr].score;
  var rings = 0; if (sDR >= 70) rings++; if (sLuna >= 70) rings++; if (sNode >= 55) rings++; if (sPersonal >= 80) rings++;
  var overall = Math.round(sDR * 0.25 + sLuna * 0.25 + sNode * 0.2 + sPersonal * 0.15 + sMoney * 0.15);
  var verdict = rings >= 3 && overall >= 75 ? "СОБЫТИЕ · три кольца" : rings >= 2 && overall >= 60 ? "ОКНО · два кольца" : overall >= 45 ? "ФОН · готовь" : "ТИШИНА · копи силу";
  return {ok: true, date: date, dr: dr, personalDay: pd, planet: planetDay(date), luna: luna, node: nn, nodePhase: np,
    scores: {dr: sDR, luna: sLuna, node: sNode, personal: sPersonal, money: sMoney, overall: overall}, rings: rings, verdict: verdict,
    money: MONEY_DR[dr], meaning: DR_MEANING[dr], action: DR_ACTION[dr], retroHint: retroHint(date), voidHint: voidOfCourseHint(date),
    formula: "E=Luna×Node×DR×PD"};
}
function predict(opts) { opts = opts || {}; var days = opts.days || 27; var start = parseDate(opts.from) || new Date();
  start = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  var birth = parseDate(opts.birth || DEFAULT_BIRTH.date); var lat = opts.lat != null ? opts.lat : DEFAULT_BIRTH.lat; var lon = opts.lon != null ? opts.lon : DEFAULT_BIRTH.lon;
  var calendar = [], peaks = [], moneyDays = [], personalMirrors = [];
  for (var i = 0; i < days; i++) { var d = new Date(start.getTime() + i * 86400000); var ev = eventScore({date: d, birth: birth, lat: lat, lon: lon});
    var row = {date: d.toISOString().slice(0, 10), dr: ev.dr, pd: ev.personalDay, planet: ev.planet, luna: ev.luna.name, overall: ev.scores.overall, rings: ev.rings, verdict: ev.verdict, money: ev.money.label, moneyScore: ev.money.score, action: ev.action, node: ev.node.node.id, nodeHeat: Math.round(ev.nodePhase.heat * 100)};
    calendar.push(row); if (ev.scores.overall >= 78) peaks.push(row); if (ev.money.score >= 90) moneyDays.push(row); if (ev.personalDay === ev.dr) personalMirrors.push(row); }
  function bestFor(fn) { var best = calendar[0]; for (var j = 1; j < calendar.length; j++) if (fn(calendar[j]) > fn(best)) best = calendar[j]; return best; }
  return {ok: true, from: start.toISOString().slice(0, 10), days: days, calendar: calendar, peaks: peaks, moneyDays: moneyDays, personalMirrors: personalMirrors,
    best: {launch: bestFor(function (r) { return (r.dr === 1 || r.pd === 1 ? 30 : 0) + r.overall; }), money: bestFor(function (r) { return r.moneyScore + r.overall * 0.3; }),
      release: bestFor(function (r) { return (r.dr === 9 || r.pd === 9 ? 30 : 0) + r.overall; }), deal: bestFor(function (r) { return (r.dr === 5 || r.pd === 5 ? 25 : 0) + r.moneyScore * 0.5 + r.overall * 0.3; }),
      deepWork: bestFor(function (r) { return (r.dr === 7 || r.pd === 7 ? 35 : 0) + r.overall * 0.4; })},
    birth: birthProfile({date: opts.birth || DEFAULT_BIRTH.date, now: start, lat: lat, lon: lon})};
}
function createDesign(opts) { opts = opts || {}; var intent = String(opts.intent || "").trim(); if (!intent) return {ok: false, message: "Введи намерение"};
  var seed = nameToNumber(intent), dr = digitalRoot(seed), ax = axisOf(dr), st = step21(seed), kl = keplerLadder(1), fr = nearestFreq(seed % 900 + 60);
  var birth = birthProfile(opts.birth || {}); var now = new Date(); var pred = predict({days: 27, birth: opts.birth && opts.birth.date, lat: opts.lat, lon: opts.lon});
  var roadmap = []; for (var i = 1; i <= 21; i++) { var s = step21(i); var dayOffset = Math.round((i - 1) * (PHI * 1.2)); var d = new Date(now.getTime() + dayOffset * 86400000);
    roadmap.push({step: i, phase: s.phaseName, operation: s.operation, dayOffset: dayOffset, date: d.toISOString().slice(0, 10), dayDR: dateDR(d), tip: OPS_TIPS[s.operation] || ""}); }
  var modules = [{n: 1, role: "Инициатор", layer: "Data", task: "Семя: one-liner «" + intent + "»"}, {n: 2, role: "Зеркало", layer: "Data", task: "Парный feedback"}, {n: 3, role: "Заземлитель", layer: "Data", task: "Спека + constraints"}, {n: 4, role: "Архитектор", layer: "Logic", task: "1:√φ:φ · core/field/bridge"}, {n: 5, role: "Критик", layer: "Logic", task: "Аномалия-как-вход"}, {n: 6, role: "Соединитель", layer: "Logic", task: "API · интеграции"}, {n: 7, role: "Хранитель", layer: "Interface", task: "Docs · ADR · tests"}, {n: 8, role: "Реализатор", layer: "Interface", task: "Ship MVP · money"}, {n: 9, role: "Визионер", layer: "Interface", task: "Релиз + next octave"}];
  return {ok: true, intent: intent, seed: seed, dr: dr, meaning: DR_MEANING[dr], action: DR_ACTION[dr], axis: ax, step21: st, kepler: kl, frequency: fr, archetype: opArchetype(dr),
    modules: modules, roadmap: roadmap,
    checklist: {axis369: "Ось 3-6-9: data/logic/release", ring: "Кольцо 1-2-4-8-7-5", mirrors: "Пары 1↔8,2↔7,4↔5", returns9: "Финал в 9"},
    timing: {bestLaunch: pred.best.launch, bestMoney: pred.best.money, personalYear: birth.ok ? birth.cycles.personalYear : null, note: "Запуск DR1/PD1 · деньги DR8/5 · релиз DR9"},
    birthAlign: birth.ok ? {yourDR: birth.numbers.dr, resonance: digitalRoot(birth.numbers.dr + dr), note: birth.numbers.dr === dr ? "Прямой резонанс" : (mirrorPair(birth.numbers.dr) === dr ? "Зеркальный резонанс" : "Нейтральный")} : null,
    mantra: "Семя(" + dr + ") → кольцо → 9 · «" + intent + "»"};
}
function parseInput(raw) { var s = String(raw == null ? "" : raw).trim(); if (!s) return {type: "empty"};
  var coord = s.match(/^(-?\d+(?:\.\d+)?)\s*[,;]\s*(-?\d+(?:\.\d+)?)$/); if (coord) return {type: "geo", lat: parseFloat(coord[1]), lon: parseFloat(coord[2])};
  var freq = s.match(/^(\d+(?:\.\d+)?)\s*(hz|гц)$/i); if (freq) return {type: "freq", hz: parseFloat(freq[1])};
  var color = s.match(/^#([0-9a-f]{6})$/i); if (color) { var hex = color[1]; return {type: "color", hex: hex, r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16)}; }
  var time = s.match(/^\d{2}:\d{2}$/); if (time) { var parts = s.split(":"); return {type: "time", h: +parts[0], m: +parts[1]}; }
  var iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/); if (iso) return {type: "date", date: new Date(Date.UTC(+iso[1], +iso[2] - 1, +iso[3]))};
  var ru = s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/); if (ru) return {type: "date", date: new Date(Date.UTC(+ru[3], +ru[2] - 1, +ru[1]))};
  if (/^-?\d+(?:\.\d+)?$/.test(s)) return {type: "number", value: parseFloat(s)}; return {type: "name", text: s}; }
function fieldRead(raw, opts) { opts = opts || {}; var p = parseInput(raw); if (p.type === "empty") return {ok: false, message: "Пусто — дата, число, координаты, частота, цвет, время или слово."};
  var lenses = [], scores = [], seed = 0;
  if (p.type === "number") seed = p.value; else if (p.type === "freq") seed = p.hz; else if (p.type === "name") seed = nameToNumber(p.text);
  else if (p.type === "date") { var d = p.date; seed = d.getUTCFullYear() + (d.getUTCMonth() + 1) + d.getUTCDate(); }
  else if (p.type === "geo") seed = Math.round(Math.abs(p.lat) + Math.abs(p.lon));
  else if (p.type === "color") seed = p.r + p.g + p.b;
  else if (p.type === "time") seed = p.h * 60 + p.m;
  var dr = digitalRoot(Math.round(seed)), ax = axisOf(dr);
  lenses.push({key: "mod9", title: "Mod9", lines: ["DR: " + dr + " — " + DR_MEANING[dr], "Класс: " + mod9Class(dr), "Ось: " + ax.name, "Зеркало: " + dr + "↔" + mirrorPair(dr), "Оператор: " + opArchetype(dr), "Действие: " + DR_ACTION[dr]]});
  scores.push(AXIS.indexOf(dr) >= 0 ? (dr === 9 ? 100 : 82) : 68);
  var baseN = Math.round(Math.abs(seed)) || 1, nf = nearestFib(baseN), kl = keplerLadder(Math.abs(seed) || 1), fibClose = nf === 0 ? 1 : Math.abs(nf - baseN) / nf;
  lenses.push({key: "phi", title: "φ · Fib", lines: ["Fib: " + nf + (isFib(baseN) ? " ✦" : ""), "Кеплер: " + kl.low.toFixed(2) + " : " + kl.mid.toFixed(2) + " : " + kl.high.toFixed(2), "Угол: " + GOLDEN_ANGLE.toFixed(2) + "°"]});
  scores.push(Math.max(0, 100 - fibClose * 120));
  var st = step21(baseN); lenses.push({key: "key21", title: "Второй Ключ", lines: ["Шаг " + st.step + "/21 · " + st.phaseName, "Оп: " + st.operation, OPS_TIPS[st.operation] || ""]}); scores.push(st.step % 7 === 0 ? 90 : 62);
  var mappedHz = (seed % 900 + 900) % 900 + 60, fr = nearestFreq(p.type === "freq" ? p.hz : mappedHz);
  lenses.push({key: "freq", title: "Частота", lines: [(p.type === "freq" ? "Ввод: " + p.hz : "seed→ " + mappedHz.toFixed(1)) + " Гц", "Канон: " + fr.hz + " — " + fr.name, "DR: " + digitalRoot(Math.round(fr.hz))]});
  scores.push(p.type === "freq" ? Math.max(0, 100 - Math.abs(fr.hz - p.hz)) : 62);
  if (p.type === "geo") { var nn = nearestNode(p.lat, p.lon), nph = nodePhase(nn.node, new Date());
    lenses.push({key: "geo", title: "ИДСЗ", lines: ["Точка: " + p.lat.toFixed(3) + ", " + p.lon.toFixed(3), "Узел: " + nn.node.id + " · " + Math.round(nn.distanceKm) + " км", "Фаза: " + nph.label + " (" + Math.round(nph.heat * 100) + "%)"]}); scores.push(Math.max(0, 100 - nn.distanceKm / 40)); }
  if (p.type === "date") { var lp = lunarPhase(p.date), ev = eventScore({date: p.date, birth: opts.birth});
    lenses.push({key: "luna", title: "Луна", lines: ["Фаза: " + lp.name + " · " + lp.ageDays.toFixed(1) + "д", "φ-окно: " + (lp.isPhiWindow ? "ДА" : "нет"), "Свет: " + Math.round(lp.illumination * 100) + "%"]});
    lenses.push({key: "event", title: "Triple-Ring", lines: [ev.formula, "Кольца: " + ev.rings + "/4 · " + ev.scores.overall, ev.verdict, "Деньги: " + ev.money.label + " (" + ev.money.score + ")"]}); scores.push(ev.scores.overall); }
  if (p.type === "color") { var cdr = digitalRoot(p.r + p.g + p.b); lenses.push({key: "color", title: "Цвет", lines: ["RGB: " + p.r + "," + p.g + "," + p.b, "DR: " + cdr + " — " + DR_MEANING[cdr], "Цвет: " + COLORS[dr - 1].name]}); scores.push(72); }
  if (p.type === "time") { var tdr = digitalRoot(p.h * 60 + p.m); lenses.push({key: "time", title: "Время", lines: ["DR: " + tdr + " — " + DR_MEANING[tdr], "Планетный час: " + PLANETS[(p.h + p.m) % 7], "Совет: " + DR_ACTION[tdr]]}); scores.push(60); }
  lenses.push({key: "money", title: "Деньги", lines: ["DR " + dr + ": " + MONEY_DR[dr].label, "Score: " + MONEY_DR[dr].score + "/100", DR_ACTION[dr]]});
  var overall = scores.reduce(function (a, b) { return a + b; }, 0) / scores.length;
  var verdict = overall >= 61.8 ? "ЗВУЧИТ" : (overall >= 38.2 ? "ТР��БУЕТ НАСТРОЙКИ" : "НЕ ЗВУЧИТ");
  return {ok: true, input: p, seed: seed, dr: dr, axis: ax, overall: Math.round(overall * 10) / 10, verdict: verdict, lenses: lenses, money: MONEY_DR[dr], meaning: DR_MEANING[dr], action: DR_ACTION[dr]};
}
function operatorTable() { var rows = []; for (var k = 1; k <= 9; k++) { var orbit = [], x = 1; for (var i = 0; i < 6; i++) { orbit.push(x); x = mulMod9(x, k); if (x === 1 && i > 0) break; } rows.push({k: k, archetype: opArchetype(k), orbit: orbit, meaning: DR_MEANING[k]}); } return rows; }
function fibMod9Day(hour) { var fib = [0, 1]; for (var i = 2; i < 24; i++) fib.push((fib[i - 1] + fib[i - 2]) % 9); var v = fib[((hour % 24) + 24) % 24]; return v === 0 ? 9 : v; }
function synastry(a, b) { var A = birthProfile(a), B = birthProfile(b); if (!A.ok || !B.ok) return {ok: false, message: "Невалидные данные"};
  var drA = A.numbers.dr, drB = B.numbers.dr, comp = drA === drB ? "Прямой резонанс" : (mirrorPair(drA) === drB ? "Зеркальное дополнение" : (axisOf(drA).id === axisOf(drB).id ? "Осевой союз" : "Творческое трение"));
  var score = Math.round(60 + (drA === drB ? 30 : 0) + (mirrorPair(drA) === drB ? 25 : 0) + (axisOf(drA).id === axisOf(drB).id ? 15 : 0) + (A.numbers.soul === B.numbers.lifePath ? 10 : 0));
  var lines = [A.name + " DR" + drA + " + " + B.name + " DR" + drB + " = " + comp, "Резонанс: " + score + "/100", "Совместный DR: " + digitalRoot(drA + drB) + " — " + DR_MEANING[digitalRoot(drA + drB)]];
  if (A.numbers.lifePath === B.numbers.lifePath) lines.push("Совпадение Life Path"); if (A.numbers.soul === B.numbers.soul) lines.push("Совпадение Soul");
  return {ok: true, a: A.name, b: B.name, drA: drA, drB: drB, score: score, compatibility: comp, verdict: score >= 85 ? "РЕЗОНАНС" : (score >= 60 ? "ГАРМОНИЯ" : "ТРЕНИЕ"), lines: lines}; }
function placeScore(lat, lon, name) { name = String(name || ""); var nn = nearestNode(lat, lon), np = nodePhase(nn.node, new Date()), dr = digitalRoot(nameToNumber(name) + Math.round(lat * 100 + lon * 100));
  var score = Math.round((100 - nn.distanceKm / 40) * 0.4 + np.heat * 30 + MONEY_DR[dr].score * 0.2 + 10);
  return {ok: true, name: name, lat: lat, lon: lon, dr: dr, meaning: DR_MEANING[dr], nearestNode: nn.node, distanceKm: Math.round(nn.distanceKm), nodeHeat: Math.round(np.heat * 100), element: elementOf(dr), score: clamp(score, 0, 100), verdict: score >= 75 ? "МЕСТО СИЛЫ" : (score >= 50 ? "РАБОЧАЯ ТОЧКА" : "ТРЕНИЕ")}; }
function relocateChart(birth, newLat, newLon) { var B = birthProfile(birth); if (!B.ok) return B;
  var nn = nearestNode(newLat, newLon), np = nodePhase(nn.node, new Date()), nnBirth = nearestNode(B.lat, B.lon);
  var score = Math.round((100 - nn.distanceKm / 40) * 0.5 + np.heat * 25 + (B.numbers.dr === digitalRoot(Math.round(newLat + newLon)) ? 15 : 0));
  return {ok: true, newLat: newLat, newLon: newLon, birthNode: nnBirth.node, relocatedNode: nn.node, distanceFromBirth: Math.round(haversine(B.lat, B.lon, newLat, newLon)), score: clamp(score, 0, 100), verdict: score >= 80 ? "ПЕРЕЕЗД ЗВУЧИТ" : (score >= 55 ? "ТРЕНИРУЙ МЕСТО" : "ЛУЧШЕ НЕТ"), note: "Новый узел " + nn.node.id + " · " + np.label}; }
function brandProfile(name) { var seed = nameToNumber(name), dr = digitalRoot(seed), ax = axisOf(dr), fr = nearestFreq(seed % 900 + 60), kl = keplerLadder(seed || 1);
  var domains = [".com", ".io", ".ai", ".app"]; var suffix = domains[seed % domains.length];
  var words = []; for (var i = 1; i <= 9; i++) if (i !== dr && digitalRoot(dr * i) === dr) words.push(MEANING_WORDS[i]);
  return {ok: true, name: name, dr: dr, meaning: DR_MEANING[dr], action: DR_ACTION[dr], axis: ax, archetype: opArchetype(dr), frequency: fr, kepler: kl, vibe: [elementOf(dr), chakraOf(dr)], powerWords: words, suggestedDomain: name.toLowerCase().replace(/\s+/g, "") + suffix, money: MONEY_DR[dr], score: MONEY_DR[dr].score, verdict: dr === 8 || dr === 5 ? "БРЕНД-ДЕНЬГИ" : (dr === 1 || dr === 9 ? "БРЕНД-СИГНАЛ" : "БРЕНД-РАБОТА")}; }
function colorOfNumber(n) { n = Math.round(Number(n) || 1); var dr = digitalRoot(n); return {ok: true, n: n, dr: dr, hex: COLORS[dr - 1].hex, name: COLORS[dr - 1].name, element: elementOf(dr), chakra: chakraOf(dr), meaning: DR_MEANING[dr]}; }
function auraPalette(birth) { var B = birthProfile(birth); if (!B.ok) return B; var dr = B.numbers.dr, lp = B.numbers.lifePath, soul = B.numbers.soul, dest = B.numbers.destiny;
  return {ok: true, core: COLORS[dr - 1], life: COLORS[lp - 1], soul: COLORS[soul - 1], destiny: COLORS[dest - 1], mirror: COLORS[mirrorPair(dr) - 1], element: elementOf(dr), chakra: chakraOf(dr), palette: [COLORS[dr - 1].hex, COLORS[lp - 1].hex, COLORS[soul - 1].hex, COLORS[mirrorPair(dr) - 1].hex, COLORS[8].hex]}; }
function textResonance(text) { var s = String(text || "").trim(); if (!s) return {ok: false, message: "Пустой текст"}; var words = s.split(/\s+/).length, chars = s.length, seed = nameToNumber(s), dr = digitalRoot(seed), sentiment = chars % 9 >= 6 ? "подъём" : (chars % 9 >= 3 ? "нейтрал" : "спад");
  var sentences = s.split(/[.!?]+/).filter(function (x) { return x.trim(); }); var long = sentences.length > 0 ? Math.max.apply(null, sentences.map(function (x) { return x.length; })) : 0;
  var rhythm = Math.round(words / (sentences.length || 1) * 10) / 10;
  return {ok: true, seed: seed, dr: dr, meaning: DR_MEANING[dr], words: words, chars: chars, sentences: sentences.length, avgSentence: Math.round(chars / (sentences.length || 1)), longest: long, rhythmScore: rhythm, sentiment: sentiment, element: elementOf(dr), archetype: opArchetype(dr), color: COLORS[dr - 1], verdict: dr === 3 || dr === 5 ? "ТЕКСТ ДВИЖЕТ" : (dr === 7 || dr === 4 ? "ТЕКСТ КОПАЕТ" : "ТЕКСТ БАЛАНСИРУЕТ")}; }
function headlineScore(text) { var t = textResonance(text); if (!t.ok) return t; var len = text.length, power = 0;
  if (len >= 40 && len <= 90) power += 30; else if (len < 40) power += 15; else power += 10;
  if (/\d/.test(text)) power += 15; if (/[—:;]/.test(text)) power += 10;
  var dr = t.dr; if ([1, 5, 8].indexOf(dr) >= 0) power += 25; else if ([3, 9].indexOf(dr) >= 0) power += 20; else power += 10;
  return {ok: true, text: text, dr: t.dr, score: clamp(power + t.rhythmScore * 5, 0, 100), verdict: power >= 70 ? "ЦЕПЛЯЕТ" : (power >= 45 ? "РАБОТАЕТ" : "ДОПИЛИТЬ"), tips: power >= 70 ? ["Делай A/B", "Запускай"] : ["Короче", "Добавь цифру", "Усиль глагол"]}; }
function decisionMatrix(options, opts) { opts = opts || {}; var birth = opts.birth ? birthProfile(opts.birth) : null; var rows = [];
  for (var i = 0; i < options.length; i++) { var opt = options[i]; var seed = nameToNumber(opt), dr = digitalRoot(seed); var ev = eventScore({date: opts.date || new Date(), birth: birth && birth.birthISO || DEFAULT_BIRTH.date, lat: opts.lat, lon: opts.lon});
    var score = Math.round((MONEY_DR[dr].score + ev.scores.overall + (birth && birth.numbers.dr === dr ? 15 : 0)) / 2.5);
    rows.push({option: opt, dr: dr, meaning: DR_MEANING[dr], action: DR_ACTION[dr], eventScore: ev.scores.overall, moneyScore: MONEY_DR[dr].score, total: clamp(score, 0, 100)}); }
  rows.sort(function (a, b) { return b.total - a.total; });
  return {ok: true, rows: rows, winner: rows[0], verdict: rows[0].total >= 75 ? "ЕСТЬ ПОБЕДИТЕЛЬ" : "ТРЕБУЕТСЯ ДОРАБОТКА"}; }
function teamField(members) { if (!members || !members.length) return {ok: false, message: "Добавь участников"}; var drs = [], souls = [], total = 0;
  for (var i = 0; i < members.length; i++) { var b = birthProfile(members[i]); drs.push(b.ok ? b.numbers.dr : 0); souls.push(b.ok ? b.numbers.soul : 0); total += b.ok ? b.numbers.dr : 0; }
  var teamDR = digitalRoot(total), missing = [];
  for (var k = 1; k <= 9; k++) if (drs.indexOf(k) < 0 && k !== mirrorPair(teamDR)) missing.push(k);
  var dupes = {}; drs.forEach(function (d) { dupes[d] = (dupes[d] || 0) + 1; }); var resonance = Object.keys(dupes).filter(function (k) { return dupes[k] > 1; }).map(function (k) { return "DR" + k + "×" + dupes[k]; });
  return {ok: true, teamDR: teamDR, meaning: DR_MEANING[teamDR], action: DR_ACTION[teamDR], size: members.length, drProfile: drs, soulProfile: souls, resonances: resonance, missing: missing, verdict: missing.length <= 2 ? "КОМАНДА ЗВУЧИТ" : "ДОБАВЬ ТИПЫ: " + missing.slice(0, 3).join(",")}; }
function moneyMap(birth, days) { days = days || 30; var B = birthProfile(birth); if (!B.ok) return B; var map = predict({days: days, birth: birth.date, lat: birth.lat, lon: birth.lon});
  var buckets = [0, 0, 0, 0, 0, 0, 0, 0, 0]; for (var i = 0; i < map.calendar.length; i++) buckets[map.calendar[i].dr - 1] += map.calendar[i].moneyScore;
  var bestDR = buckets.indexOf(Math.max.apply(null, buckets)) + 1;
  return {ok: true, days: days, birthDR: B.numbers.dr, bestMoneyDR: bestDR, buckets: buckets, highDays: map.moneyDays, plan: map.best.money, verdict: "Деньги пульсируют в DR" + bestDR + " — " + DR_MEANING[bestDR]}; }
function investmentTiming(amount, birth, date) { var B = birthProfile(birth); if (!B.ok) return B; var ev = eventScore({date: date, birth: birth.date, lat: birth.lat, lon: birth.lon});
  var dr = digitalRoot(Math.round(amount)); var risk = ([1, 5, 8].indexOf(ev.dr) >= 0 ? "умеренный" : ([4, 7].indexOf(ev.dr) >= 0 ? "низкий" : "высокий"));
  var score = Math.round((ev.scores.overall + MONEY_DR[ev.dr].score + MONEY_DR[dr].score) / 3);
  return {ok: true, amount: amount, date: date, dr: ev.dr, moneyDR: dr, eventScore: ev.scores.overall, risk: risk, score: score, verdict: score >= 75 ? "ВХОДИ" : (score >= 50 ? "МАЛАЯ ПОЗИЦИЯ" : "ЖДИ"), action: DR_ACTION[ev.dr]}; }
function healthRhythm(birth, date) { var B = birthProfile(birth); if (!B.ok) return B; var br = biorhythm(B.birth, parseDate(date) || new Date()), dr = B.numbers.dr;
  var systems = {}; for (var i = 0; i < 9; i++) { systems[BODY_SYSTEMS[i]] = Math.round((Math.sin((br.physical + i) * Math.PI / 4.5) + 1) * 50); }
  var weak = BODY_SYSTEMS[8 - ((dr - 1) % 9)];
  return {ok: true, dr: dr, physical: Math.round((br.physical + 1) * 50), emotional: Math.round((br.emotional + 1) * 50), intellectual: Math.round((br.intellectual + 1) * 50), intuitive: Math.round((br.intuitive + 1) * 50), systems: systems, watch: weak, verdict: br.physical > 0.3 ? "ТЕЛО В ПОТОКЕ" : "БЕРЕГИ " + weak}; }
function chronobiology(birth, date) { var B = birthProfile(birth); if (!B.ok) return B; var d = parseDate(date) || new Date(), br = biorhythm(B.birth, d);
  var schedule = [{t: 6, label: "Подъём", score: (br.physical + br.emotional + 2) / 4 * 100}, {t: 9, label: "Глубокая работа", score: (br.physical + br.intellectual + 2) / 4 * 100}, {t: 12, label: "Коммуникации", score: (br.emotional + 1) * 50}, {t: 15, label: "Движение", score: (br.physical + 1) * 50}, {t: 18, label: "Переговоры", score: (br.emotional + br.intellectual + 2) / 4 * 100}, {t: 21, label: "Творчество", score: (br.intuitive + 1) * 50}, {t: 23, label: "Отбой", score: (br.physical + br.emotional + 2) / 4 * 100}];
  schedule.forEach(function (x) { x.score = Math.round(x.score); });
  return {ok: true, date: d, schedule: schedule, best: schedule.reduce(function (a, b) { return a.score > b.score ? a : b; }), worst: schedule.reduce(function (a, b) { return a.score < b.score ? a : b; })}; }
function codeResonance(code) { var t = textResonance(code); if (!t.ok) return t; var lines = code.split("\n").length, funcs = (code.match(/function\s+/g) || []).length, loops = (code.match(/(for|while|forEach)/g) || []).length;
  var dr = t.dr; var verdict = dr === 4 || dr === 7 ? "СТРУКТУРНЫЙ" : (dr === 5 || dr === 3 ? "ГИБКИЙ" : (dr === 8 ? "МАСШТАБИРУЕМЫЙ" : "БАЛАНСИРОВАННЫЙ"));
  return {ok: true, dr: dr, meaning: DR_MEANING[dr], lines: lines, functions: funcs, loops: loops, entropy: Math.round(t.words / ((lines || 1)) * 10), verdict: verdict, tips: funcs > loops ? ["Модульность хороша", "Проверь тесты"] : ["Добавь функций", "Упрости циклы"]}; }
function dreamRead(text) { var t = textResonance(text); if (!t.ok) return t; var seed = nameToNumber(text), dr = digitalRoot(seed), st = step21(seed);
  var symbols = {"вода": "эмоции", "огонь": "страсть", "дом": "архетип себя", "дорога": "путь", "число": "Mod9-сигнал", "человек": "зеркало", "летать": "освобождение", "падать": "страх", "змея": "трансформация", "золото": "ценность"};
  var found = Object.keys(symbols).filter(function (k) { return text.toLowerCase().indexOf(k) >= 0; }).map(function (k) { return k + ": " + symbols[k]; });
  return {ok: true, dr: dr, meaning: DR_MEANING[dr], phase: st.phaseName, operation: st.operation, symbols: found, message: "Сон в фазе " + st.phaseName + " · действуй: " + DR_ACTION[dr], color: COLORS[dr - 1]}; }
function ichingDraw(question) { var seed = hash32(String(question || "").trim() + Date.now()); var hex = HEXAGRAMS[seed % HEXAGRAMS.length]; var dr = digitalRoot(seed); var lines = ["Гексаграмма: " + hex, "DR: " + dr + " — " + DR_MEANING[dr], "Вектор: " + DR_ACTION[dr]]; return {ok: true, question: question, hexagram: hex, dr: dr, meaning: DR_MEANING[dr], action: DR_ACTION[dr], lines: lines}; }
function tarotSpread(seed) { seed = seed != null ? seed : Math.floor(Date.now() / 1000); var rng = seededRandom(seed); var cards = []; for (var i = 0; i < 3; i++) { cards.push({position: ["Прошлое", "Настоящее", "Будущее"][i], card: TAROT_MAJOR[Math.floor(rng * 100000 * (i + 1)) % TAROT_MAJOR.length], runes: RUNES[Math.floor(rng * 100000 * (i + 3)) % RUNES.length]}); }
  var dr = digitalRoot(seed); return {ok: true, seed: seed, cards: cards, dr: dr, meaning: DR_MEANING[dr], action: DR_ACTION[dr]}; }
function randomOracle(seed) { seed = seed != null ? seed : Math.floor(Date.now() / 1000); var rng = seededRandom(seed); var dr = digitalRoot(Math.floor(rng * 100) + 1); var rune = RUNES[Math.floor(rng * 100000) % RUNES.length]; var el = elementOf(dr); var advice = DR_ACTION[dr]; return {ok: true, seed: seed, dr: dr, rune: rune, element: el, meaning: DR_MEANING[dr], advice: advice, verdict: rng > 0.61 ? "ЗНАК" : (rng > 0.38 ? "СОВЕТ" : "ПАУЗА")}; }
function runeDraw(seed) { seed = seed != null ? seed : Math.floor(Date.now() / 1000); return {ok: true, rune: RUNES[Math.floor(seededRandom(seed) * RUNES.length)], dr: digitalRoot(seed)}; }
function routeScore(places) { if (!places || places.length < 2) return {ok: false, message: "Нужно минимум 2 точки"}; var total = 0, legs = [];
  for (var i = 0; i < places.length - 1; i++) { var a = places[i], b = places[i + 1]; var leg = leyLine(a.lat, a.lon, b.lat, b.lon); total += leg.nodeScore; legs.push({from: a.name || "A", to: b.name || "B", leg: leg}); }
  var avg = Math.round(total / (places.length - 1)); return {ok: true, places: places, legs: legs, score: avg, verdict: avg >= 75 ? "МАРШРУТ В РЕЗОНАНСЕ" : (avg >= 50 ? "МАРШРУТ РАБОТАЕТ" : "ПЕРЕСТРОЙ МАРШРУТ"), bestStop: legs.reduce(function (a, b) { return a.leg.nodeScore > b.leg.nodeScore ? a : b; })}; }
function manifestation369(intent, days) { days = days || 21; var seed = nameToNumber(intent), dr = digitalRoot(seed); var plan = []; for (var i = 1; i <= days; i++) { var step = (i % 3 === 0) ? "write 9x" : (i % 3 === 1 ? "think 3x" : "speak 6x"); var d = new Date(Date.now() + i * 86400000); var ev = eventScore({date: d}); plan.push({day: i, date: d.toISOString().slice(0, 10), action: step, dr: ev.dr, score: ev.scores.overall}); }
  return {ok: true, intent: intent, dr: dr, meaning: DR_MEANING[dr], days: days, plan: plan, focus: "Утро — 3 · День — 6 · Вечер — 9"}; }
function foodResonance(name) { var seed = nameToNumber(name), dr = digitalRoot(seed); var f = FOOD[dr]; return {ok: true, name: name, dr: dr, element: elementOf(dr), type: f.type, examples: f.examples, meaning: DR_MEANING[dr], action: DR_ACTION[dr], chance: dr === 6 || dr === 8 ? "усиливает" : (dr === 9 ? "очищает" : "балансирует")}; }
function spacePlan(room) { var s = String(room || "").trim(); if (!s) return {ok: false, message: "Опиши помещение"}; var seed = nameToNumber(s), dr = digitalRoot(seed); var zones = ["вход/внимание", "работа/фокус", "отдых/сон", "кухня/тело", "карта/планы", "окно/свет", "угол/глубина", "центр/сила", "потолок/видение"];
  var active = zones[dr - 1]; return {ok: true, room: s, dr: dr, element: elementOf(dr), focusZone: active, meaning: DR_MEANING[dr], action: DR_ACTION[dr], tip: "Акцент на зоне: " + active}; }
function learningWindow(subject, birth) { var B = birthProfile(birth); if (!B.ok) return B; var dr = digitalRoot(nameToNumber(subject) + B.numbers.dr); var bestDays = [1, 5, 7]; var bestHours = [9, 15, 21]; return {ok: true, subject: subject, dr: dr, element: elementOf(dr), meaning: DR_MEANING[dr], bestDays: bestDays.map(function (d) { return {day: PLANETS[d % 7], dr: d}; }), bestHours: bestHours, method: dr === 3 || dr === 5 ? "через практику" : (dr === 4 || dr === 7 ? "через систему" : "через образы")}; }
function commitTiming(message, birth) { var B = birthProfile(birth); if (!B.ok) return B; var t = textResonance(message); var now = new Date(); var ev = eventScore({date: now, birth: birth.date}); var score = Math.round((t.dr === B.numbers.dr ? 30 : 0) + (t.dr === B.numbers.lifePath ? 20 : 0) + ev.scores.overall * 0.5); return {ok: true, message: message, dr: t.dr, eventScore: ev.scores.overall, score: clamp(score, 0, 100), verdict: score >= 75 ? "КОММИТИ СЕЙЧАС" : (score >= 50 ? "МОЖНО, НО ПРОВЕРЬ" : "ПОДОЖДИ"), action: DR_ACTION[t.dr]}; }
function dateCompatibility(date1, date2) { var d1 = parseDate(date1), d2 = parseDate(date2); if (!d1 || !d2) return {ok: false, message: "Невалидные даты"}; var dr1 = dateDR(d1), dr2 = dateDR(d2); var score = dr1 === dr2 ? 95 : (mirrorPair(dr1) === dr2 ? 85 : (axisOf(dr1).id === axisOf(dr2).id ? 70 : 50)); return {ok: true, date1: date1, date2: date2, dr1: dr1, dr2: dr2, score: score, verdict: score >= 80 ? "СИНХРОН" : "АСИНХРОН", note: DR_MEANING[digitalRoot(dr1 + dr2)]}; }
function wordPower(word) { var n = nameToNumber(word), dr = digitalRoot(n); return {ok: true, word: word, dr: dr, meaning: DR_MEANING[dr], action: DR_ACTION[dr], color: COLORS[dr - 1], element: elementOf(dr), syllables: word.split(/[\s-]+/).length, power: dr === 8 || dr === 5 ? "высокая" : (dr === 3 || dr === 9 ? "медийная" : "стабильная")}; }
function priceResonance(price) { price = Number(price) || 0; var dr = digitalRoot(Math.round(price * 100)); var split = goldenRatioSplit(price); var rounded = Math.round(price / PHI) * PHI; var friendly = Math.round(rounded * 100) / 100; return {ok: true, price: price, dr: dr, meaning: DR_MEANING[dr], goldenSplit: split, phiFriendly: friendly, verdict: dr === 8 || dr === 5 ? "ТЯГОТЕЕТ К ПОКУПКЕ" : (dr === 4 || dr === 7 ? "РАЦИОНАЛЬНАЯ" : (dr === 9 ? "СИМВОЛИЧНАЯ" : "СТАНДАРТНАЯ"))}; }
function yearlyArc(birth, year) { var B = birthProfile(birth); if (!B.ok) return B; var py = personalYear(B.birth, year); var pred = predict({from: new Date(year, 0, 1), days: 81, birth: birth.date}); var peaks = pred.peaks.slice(0, 5); return {ok: true, year: year, personalYear: py, meaning: DR_MEANING[py], peaks: peaks, theme: py === 1 ? "СЕМЯ" : (py === 9 ? "��АТВА" : (py === 5 ? "ПЕРЕМЕНА" : (py === 8 ? "МАСШТАБ" : "РОСТ")))}; }
function bodyClock(birth, date) { var h = healthRhythm(birth, date); var c = chronobiology(birth, date); return {ok: true, health: h, schedule: c, summary: "Сильная сторона: " + (h.physical > h.emotional ? "тело" : (h.emotional > h.intellectual ? "эмоции" : "интеллект"))}; }
function soulContract(birth) { var B = birthProfile(birth); if (!B.ok) return B; var dr = B.numbers.dr, lp = B.numbers.lifePath, soul = B.numbers.soul, dest = B.numbers.destiny;
  var tasks = ["учиться воли/старту", "учиться партнёрству", "учиться творчеству", "учиться структуре", "учиться свободе", "учиться сервису", "учиться глубине", "учиться масштабу", "учиться отпусканию"];
  return {ok: true, dr: dr, lifePath: lp, soul: soul, destiny: dest, coreLesson: tasks[dr - 1], lifePathLesson: tasks[lp - 1], soulLesson: tasks[soul - 1], destinyLesson: tasks[dest - 1], note: "DR=" + dr + " + LP=" + lp + " + Soul=" + soul + " + Dest=" + dest}; }
function nameOptimize(name, goal) { goal = goal || "бренд"; var base = brandProfile(name); var best = null, bestScore = 0;
  for (var i = 0; i < 9; i++) { var alt = name + " " + (i + 1); var b = brandProfile(alt); if (b.score > bestScore) { bestScore = b.score; best = alt; } }
  return {ok: true, name: name, base: base, goal: goal, suggested: best, boost: Math.round(bestScore - base.score)}; }
function dailyRitual(birth, date) { var B = birthProfile(birth); if (!B.ok) return B; var d = parseDate(date) || new Date(); var ev = eventScore({date: d, birth: birth.date}); var dr = ev.dr;
  var rituals = ["3 мин тишины + намерение", "2 мин зеркального диалога", "10 мин творчества", "10 мин уборки/структуры", "5 мин нового контакта", "6 мин клиентского сервиса", "15 мин анализа", "2 мин декларации денег", "9 мин благодарности"];
  return {ok: true, date: d, dr: dr, ritual: rituals[dr - 1], action: DR_ACTION[dr], element: elementOf(dr)}; }
function astroLocality(birth, lat, lon) { var B = birthProfile(birth); if (!B.ok) return B; var nn = nearestNode(lat, lon), np = nodePhase(nn.node, new Date()); var ax = axisOf(B.numbers.dr);
  return {ok: true, lat: lat, lon: lon, dr: B.numbers.dr, nearestNode: nn.node, nodeHeat: Math.round(np.heat * 100), axis: ax.id, verdict: np.heat > 0.7 ? "СИЛЬНАЯ ЛОКАЦИЯ" : (np.heat > 0.4 ? "РАБОЧАЯ" : "СЛАБАЯ"), note: "Линии силы с осью " + ax.id}; }
function eventFlow(birth, startDate, days) { days = days || 9; var map = predict({from: startDate, days: days, birth: birth.date}); var flow = map.calendar.map(function (r) { return {r: r.dr > 0 ? "▲" : "▼", d: r.date, dr: r.dr, score: r.overall}; });
  return {ok: true, flow: flow, best: map.best, verdict: map.peaks.length > 0 ? "ЕСТЬ ПИКОВЫЕ ДНИ" : "ПЛАВНЫЙ ПЕРИОД"}; }
function signatureTone(name, birth) { var B = birthProfile(birth); if (!B.ok) return B; var n = nameToNumber(name); var dr = digitalRoot(n + B.numbers.dr); var fr = nearestFreq((n + B.numbers.soul) % 900 + 60); var note = ["До", "Ре", "Ми", "Фа", "Соль", "Ля", "Си"][(dr - 1) % 7]; return {ok: true, name: name, dr: dr, note: note, frequency: fr, meaning: DR_MEANING[dr], color: COLORS[dr - 1]}; }
function crystalOf(dr) { var map = {1: "красный яспис", 2: "оранжевый сердолик", 3: "жёлтый цитрин", 4: "зелёный авантюрин", 5: "синий лазурит", 6: "индиго содалит", 7: "фиолетовый аметист", 8: "розовый кварц", 9: "прозрачный кварц"}; return {dr: dr, crystal: map[dr], element: elementOf(dr)}; }
// === EXPORT ===
return {version: "3.0.0", PHI: PHI, INV_PHI: INV_PHI, SQRT_PHI: SQRT_PHI, GOLDEN_ANGLE: GOLDEN_ANGLE, AXIS: AXIS, RING: RING, TRI_A: TRI_A, TRI_B: TRI_B,
  DR_MEANING: DR_MEANING, DR_ACTION: DR_ACTION, MONEY_DR: MONEY_DR, FREQS: FREQS, COLORS: COLORS, NODES: NODES, DEFAULT_BIRTH: DEFAULT_BIRTH, FOOD: FOOD, CHAKRAS: CHAKRAS, ELEMENTS: ELEMENTS, PLANETS: PLANETS, ZODIAC: ZODIAC, HEXAGRAMS: HEXAGRAMS, TAROT_MAJOR: TAROT_MAJOR, RUNES: RUNES, BODY_SYSTEMS: BODY_SYSTEMS,
  digitalRoot: digitalRoot, sumDigits: sumDigits, digitalRootSteps: digitalRootSteps, mod9Class: mod9Class, mirrorPair: mirrorPair, axisOf: axisOf, mulMod9: mulMod9,
  opArchetype: opArchetype, fibUpTo: fibUpTo, nearestFib: nearestFib, isFib: isFib, keplerLadder: keplerLadder, nearestFreq: nearestFreq, step21: step21,
  nameToNumber: nameToNumber, hash32: hash32, seededRandom: seededRandom, clamp: clamp, lerp: lerp, goldenRatioSplit: goldenRatioSplit, letterDR: letterDR,
  parseDate: parseDate, dateDR: dateDR, lifePath: lifePath, personalYear: personalYear, personalMonth: personalMonth, personalDay: personalDay,
  planetDay: planetDay, ageYears: ageYears, lunarPhase: lunarPhase, haversine: haversine, nearestNode: nearestNode, nodePhase: nodePhase, leyLine: leyLine, nodesInRadius: nodesInRadius,
  biorhythm: biorhythm, zodiacOf: zodiacOf, chakraOf: chakraOf, elementOf: elementOf, solarYearProgress: solarYearProgress, goldenHour: goldenHour,
  birthProfile: birthProfile, eventScore: eventScore, predict: predict, createDesign: createDesign, parseInput: parseInput, fieldRead: fieldRead,
  operatorTable: operatorTable, fibMod9Day: fibMod9Day, retroHint: retroHint, voidOfCourseHint: voidOfCourseHint,
  synastry: synastry, placeScore: placeScore, relocateChart: relocateChart, brandProfile: brandProfile, colorOfNumber: colorOfNumber, auraPalette: auraPalette,
  textResonance: textResonance, headlineScore: headlineScore, decisionMatrix: decisionMatrix, teamField: teamField, moneyMap: moneyMap,
  investmentTiming: investmentTiming, healthRhythm: healthRhythm, chronobiology: chronobiology, codeResonance: codeResonance, dreamRead: dreamRead,
  ichingDraw: ichingDraw, tarotSpread: tarotSpread, randomOracle: randomOracle, runeDraw: runeDraw, routeScore: routeScore, manifestation369: manifestation369,
  foodResonance: foodResonance, spacePlan: spacePlan, learningWindow: learningWindow, commitTiming: commitTiming, dateCompatibility: dateCompatibility,
  wordPower: wordPower, priceResonance: priceResonance, yearlyArc: yearlyArc, bodyClock: bodyClock, soulContract: soulContract, nameOptimize: nameOptimize,
  dailyRitual: dailyRitual, astroLocality: astroLocality, eventFlow: eventFlow, signatureTone: signatureTone, crystalOf: crystalOf
};
});
