# ORACULUM ∞

**Unified Field Reader** — одно приложение, которое сшивает весь Natural Code стек MIGI в один вход.

Любой объект (дата, координаты, частота, число, слово/бренд) проходит через шесть линз:

| Линза | Источник |
| --- | --- |
| **Mod9** | Resonance Algebra · ось `{3,6,9}` + кольцо `{1,2,4,8,7,5}` |
| **φ / Fibonacci** | Natural Code · Кеплерова лестница `1 : √φ : φ` |
| **ИДСЗ** | 62 узла гео-кристалла (12+20+30) |
| **Второй Ключ** | 21 шаг = 3 фазы × 7 операций (Эмблема 21) |
| **Solfeggio / Шуман** | канонические частоты MIGI |
| **Луна** | Селено-кристалл · фаза цикла |

На выходе — вердикт **ЗВУЧИТ / ТРЕБУЕТ НАСТРОЙКИ / НЕ ЗВУЧИТ** и score 0–100.

## Зачем это существует

В Notion у Макса разложены десятки протоколов и открытий (Mod9, Earth Crystal, Second Key, TRE, Longevity, Weeekend-экосистема…).  
**ORACULUM** — точка, где они перестают быть «разными документами» и становятся **одним рабочим инструментом**: ввёл → считал поле → понял, звучит ли.

## Запуск

```bash
# тесты (zero deps)
npm test

# sanity
npm run check

# UI — открой index.html в браузере
# или
npx serve . -l 4173
```

Никаких зависимостей. `engine.js` работает и в Node, и в браузере (UMD).

## Структура

```
engine.js              # pure Natural Code core
index.html             # dark φ-UI + canvas map of 62 nodes
test/engine.test.cjs   # unit tests (assert)
package.json
.github/workflows/ci.yml
```

## API (engine)

```js
const ORC = require('./engine.js');

ORC.fieldRead('10.04.1998');
// → { ok, seed, dr, overall, verdict, lenses[] }

ORC.fieldRead('41.72, 44.83'); // Тбилиси → nearest ИДСЗ node
ORC.fieldRead('528hz');
ORC.fieldRead('Weeekend');

ORC.digitalRoot(1998);        // 9
ORC.nearestNode(41.72, 44.83);
ORC.step21(13);               // { step, phase, phaseName, operation }
ORC.keplerLadder(1);          // { low, mid, high }
```

## Принципы

1. **Суть выше формы** — сначала поле, потом UI.
2. **Тройная архитектура** — Data (`engine`) / Logic (`fieldRead`) / Interface (`index.html`).
3. **Аномалия = вход** — неожиданный тип ввода не сглаживается, а открывает доп. линзу.
4. **Малая окружность** — каждый reading заве��шается вердиктом и seed'ом следующей октавы.

## Рождение

Собрано MIG AI в Notion-песочнице 15–16.07.2026  
из живого контекста memories + ATHANOR ∞ + MIG Coder Hub.

MIT
