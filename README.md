# ORACULUM ∞ v3

**Living Unified Field Engine** — одно приложение, которое сшивает весь Natural Code стек MIGI в один вход.

Любой объект (дата, координаты, частота, число, слово, цвет, время, бренд, маршрут, сон, код, цена) проходит через 12 перспектив:

| Перспектива | Что видит |
| --- | --- |
| **Mod9** | DR, ось 147/258/369, зеркала, операторы |
| **φ / Fibonacci** | Кеплерова лестница, φ-окна, золотое деление |
| **ИДСЗ** | 62 узла гео-кристалла, ближайший узел, лей-линии |
| **Второй Ключ** | 21 шаг = 3 фазы × 7 операций |
| **Solfeggio / Шуман** | Канонические частоты, ближайший резонанс |
| **Луна** | Фаза, φ-окно, освещённость |
| **Birth Deep** | DR, LP, Soul, Destiny, личный год/день, спектр 9 |
| **Triple-Ring** | DR × Луна × Узел × Личный день = score |
| **Деньги×Время** | Денежный DR, окна сделок, инвестиции |
| **Синастрия / Команда** | Совместимость, командное поле |
| **Цвет / Звук** | Персональная палитра, тон подписи |
| **Оракул / Текст** | I Ching, таро, сны, заголовки, текст, код |

На выходе — вердикт **ЗВУЧИТ / ТРЕБУЕТ НАСТРОЙКИ / НЕ ЗВУЧИТ** и конкретное действие.

## Запуск

```bash
npm test        # 43/43 теста, zero deps
npm run check   # sanity check
npx serve . -l 4173   # UI
```

Никаких зависимостей. `engine.js` работает и в Node, и в браузере (UMD).

## Структура

```
engine.js              # v3 core — 12 перспектив, 40+ функций
index.html             # living UI — 12+ вкладок
package.json           # v3.0.0
test/engine.test.cjs    # 43 теста
```

## v3 — что нового

- **12 перспектив** вместо 6 линз
- **40+ функций**: `fieldRead`, `birthProfile`, `eventScore`, `predict`, `createDesign`, `synastry`, `placeScore`, `brandProfile`, `auraPalette`, `textResonance`, `headlineScore`, `decisionMatrix`, `teamField`, `moneyMap`, `investmentTiming`, `healthRhythm`, `chronobiology`, `codeResonance`, `dreamRead`, `ichingDraw`, `tarotSpread`, `randomOracle`, `routeScore`, `manifestation369`, `foodResonance`, `spacePlan`, `learningWindow`, `commitTiming`, `dateCompatibility`, `wordPower`, `priceResona