/*
 * ORACULUM ∞ v2.0 — Deep Unified Field Engine
 * ------------------------------------------------------------
 * Full Natural Code: Mod9 · φ · ИДСЗ · Second Key 21 · Solfeggio/Шуман · Luna
 * + Birth Deep Model (DR, LP, Soul, Destiny, 9-year, step21, spectrum)
 * + Triple-Ring Event (Lunar × Node × DR × PD)
 * + Predict (calendar windows, best days)
 * + Create (intent → 9-module arch, 21-step roadmap, timing)
 * + Cube 147-258-369, operator table, fibMod9
 * Pure, zero deps. UMD (window.ORC / require)
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ORC = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // === CONSTANTS ===
  var PHI = (1 + Math.sqrt(5)) / 2;
  var INV_PHI = 1 / PHI;
  var SQRT_PHI = Math.sqrt(PHI);
  var GOLDEN_ANGLE = 360 * (1 - INV_PHI);
  var PHI_SCALE = [8,13,21,34,55,89,144,233,377];
  var AXIS = [3,6,9];
  var RING = [1,2,4,8,7,5];
  var TRI_A = [1,4,7]; // ▲
  var TRI_B = [2,5,8]; // ▼
  var SYNODIC = 29.530588853;
  var SIDEREAL = 27.321661;
  var NEW_MOON_REF = Date.UTC(2000,0,6,18,14,0);
  var OPS = ["Calcinatio","Solutio","Separatio","Coniunctio","Fermentatio","Distillatio","Coagulatio"];
  var PHASES21 = ["Nigredo (растворение)","Albedo (очищение)","Rubedo (соединение)"];
  var PLANETS = ["Солнце","Луна","Мар��","Меркурий","Юпитер","Венера","Сатурн"];

  var DR_MEANING = {1:"Старт · инициация · воля · семя",2:"Партнёрство · баланс · зеркало",3:"Творчество · публикация · рост",4:"Структура · фундамент · система",5:"Сделка · перемена · свобода",6:"Дом · гармония · клиент · сервис",7:"Анализ · уединение · глубина",8:"Деньги · власть · масштаб",9:"Завершение · релиз · целостность"};
  var DR_ACTION = {1:"Запускай. Не шлифуй — сей.",2:"Связывай людей/идеи.",3:"Публикуй. Говори. Показывай.",4:"Строй систему. Документируй.",5:"Двигай сделки. Меняй курс.",6:"Сервись. Закрывай клиентов.",7:"Исследуй. Уединись. Глубина.",8:"Торгуйся. Масштабируй. Деньги.",9:"Закрывай. Отпускай. Релиз."};
  var MONEY_DR = {1:{score:88,label:"Старт капитала / посев"},2:{score:72,label:"Партнёрские сделки"},3:{score:70,label:"Креатив → деньги"},4:{score:65,label:"Инфра / учёт"},5:{score:92,label:"Сделки · быстрые деньги"},6:{score:80,label:"��лиенты · recurring"},7:{score:55,label:"Due diligence"},8:{score:96,label:"ПИК ДЕНЕГ · переговоры"},9:{score:78,label:"Релиз · отдача"}};
  var OPS_TIPS = {Calcinatio:"Огонь: сожги лишнее.",Solutio:"Вода: раствори форму.",Separatio:"Раздели сигнал от шума.",Coniunctio:"Соедини в живую систему.",Fermentatio:"Брожение: дай созреть.",Distillatio:"Дистиляция: чистый экстракт.",Coagulatio:"Сгущение: релиз / деньги."};
  var FREQS = [{hz:7.83,name:"Шуман"},{hz:174,name:"174 основа"},{hz:285,name:"285 реген"},{hz:396,name:"396 свобода"},{hz:417,name:"417 перемены"},{hz:432,name:"432 строй"},{hz:528,name:"528 ДНК"},{hz:639,name:"639 связь"},{hz:741,name:"741 выражение"},{hz:852,name:"852 интуиция"},{hz:963,name:"963 источник"}];
  var DEFAULT_BIRTH = {name:"Максим Мигай",date:"1998-04-10",time:"10:00",lat:46.54,lon:61.17,place:"Светлогорск, Казахстан"};

  // === CORE MATH ===
  function digitalRoot(n){n=Math.abs(Math.trunc(Number(n)||0));if(n===0)return 0;var r=n%9;return r===0?9:r;}
  function sumDigits(n){n=Math.abs(Math.trunc(Number(n)||0));var s=0;while(n>0){s+=n%10;n=Math.floor(n/10);}return s;}
  function digitalRootSteps(n){var steps=[Math.abs(Math.trunc(Number(n)||0))];while(steps[steps.length-1]>9)steps.push(sumDigits(steps[steps.length-1]));return steps;}
  function mod9Class(dr){if(dr===9)return"ОСЬ · Источник (9)";if(dr===3||dr===6)return"ОСЬ · "+(dr===3?"исток (3)":"заземление (6)");return"КОЛЬЦО · ток материи (1-2-4-8-7-5)";}
  function mirrorPair(dr){return {1:8,8:1,2:7,7:2,4:5,5:4,3:6,6:3,9:9,0:0}[dr];}
  function axisOf(dr){if(TRI_A.indexOf(dr)>=0)return{id:"147",name:"▲ 147 · дух/инициация"};if(TRI_B.indexOf(dr)>=0)return{id:"258",name:"▼ 258 · материя/поток"};if(AXIS.indexOf(dr)>=0)return{id:"369",name:"⬯ 369 · ось источника"};return{id:"?",name:"—"};}
  function mulMod9(a,b){var p=(a*b)%9;return p===0?9:p;}
  function opArchetype(k){if(k===1)return"Самость";if(k===2||k===5)return"Ток/Цикл";if(k===4||k===7)return"Гармоники";if(k===8)return"Инверсия";if(k===3||k===6)return"Коллапс";if(k===9)return"Аннигиляция";return"?";}
  function fibUpTo(limit){var a=1,b=1,arr=[1,1];while(b<=limit){var c=a+b;arr.push(c);a=b;b=c;}return arr;}
  function nearestFib(n){var arr=fibUpTo(Math.max(Math.abs(n),2)*2+5),best=arr[0];for(var i=0;i<arr.length;i++)if(Math.abs(arr[i]-n)<Math.abs(best-n))best=arr[i];return best;}
  function isFib(n){return nearestFib(n)===n;}
  function keplerLadder(base){return{low:base,mid:base*SQRT_PHI,high:base*PHI};}
  function nearestFreq(hz){var best=FREQS[0];for(var i=0;i<FREQS.length;i++)if(Math.abs(FREQS[i].hz-hz)<Math.abs(best.hz-hz))best=FREQS[i];return best;}
  function step21(n){var s=((((Math.trunc(n)-1)%21)+21)%21)+1;var phase=Math.ceil(s/7);var op=((s-1)%7)+1;return{step:s,phase:phase,phaseName:PHASES21[phase-1],operation:OPS[op-1]};}
  function nameToNumber(str){var sum=0,s=String(str).toLowerCase();for(var i=0;i<s.length;i++){var ch=s[i],c=ch.charCodeAt(0);if(c>=97&&c<=122)sum+=c-96;else if(c>=1072&&c<=1103)sum+=c-1071;else if(ch==="ё")sum+=7;else if(c>=48&&c<=57)sum+=c-48;}return sum;}

  // === DATE / TIME / LUNAR ===
  function parseDate(raw){if(raw instanceof Date)return raw;var s=String(raw||"").trim();
    var iso=s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/);if(iso)return new Date(Date.UTC(+iso[1],+iso[2]-1,+iso[3],+(iso[4]||0),+(iso[5]||0)));
    var ru=s.match(/^(\d{2})\.(\d{2})\.(\d{4})(?:\s+(\d{2}):(\d{2}))?/);if(ru)return new Date(Date.UTC(+ru[3],+ru[2]-1,+ru[1],+(ru[4]||0),+(ru[5]||0)));
    var d=new Date(s);return isNaN(d.getTime())?null:d;}
  function ymd(d){return{y:d.getUTCFullYear(),m:d.getUTCMonth()+1,day:d.getUTCDate(),h:d.getUTCHours(),min:d.getUTCMinutes()};}
  function dateDR(d){var p=ymd(d);return digitalRoot(sumDigits(p.y)+sumDigits(p.m)+sumDigits(p.day));}
  function lifePath(d){var p=ymd(d);return digitalRoot(digitalRoot(p.y)+digitalRoot(p.m)+digitalRoot(p.day));}
  function personalYear(birth,year){var b=ymd(birth);return digitalRoot(digitalRoot(b.m)+digitalRoot(b.day)+digitalRoot(year));}
  function personalMonth(birth,year,month){return digitalRoot(personalYear(birth,year)+digitalRoot(month));}
  function personalDay(birth,year,month,day){return digitalRoot(personalMonth(birth,year,month)+digitalRoot(day));}
  function planetDay(d){return PLANETS[d.getUTCDay()];}
  function daysBetween(a,b){return Math.floor((b.getTime()-a.getTime())/86400000);}
  function ageYears(birth,now){now=now||new Date();var days=daysBetween(birth,now);var yf=Math.floor(days/365.2425);return{days:days,years:days/365.2425,yearsFloor:yf,nineYearCycle:Math.floor(yf/9),nineYearPhase:yf%9+1,cycle27:Math.floor(days/27)%9+1,cycle81:Math.floor(days/81)%9+1,cycle243:Math.floor(days/243)%9+1};}
  function lunarPhase(date){var days=(date.getTime()-NEW_MOON_REF)/86400000;var pos=((days%SYNODIC)+SYNODIC)%SYNODIC;var frac=pos/SYNODIC;
    var names=["Новолуние","Растущий серп","Первая четверть","Растущая горбатая","Полнолуние","Убывающая горбатая","Последняя четверть","Убывающий серп"];var idx=Math.floor(frac*8+0.5)%8;
    var phiPts=[0,0.382,0.5,0.618,1],nearestPhi=0,best=1;for(var i=0;i<phiPts.length;i++){var dd=Math.abs(frac-phiPts[i]);if(dd<best){best=dd;nearestPhi=phiPts[i];}}
    return{fraction:frac,ageDays:pos,name:names[idx],illumination:0.5*(1-Math.cos(2*Math.PI*frac)),nearestPhiPoint:nearestPhi,phiDistance:best,isPhiWindow:best<0.04,siderealAge:((days%SIDEREAL)+SIDEREAL)%SIDEREAL};
  }

  // === ИДСЗ 62 ===
  function buildNodes(){var p=PHI,ip=INV_PHI;
    function perms(a,b,c){return[[a,b,c],[c,a,b],[b,c,a]];}
    function signs(base){var out=[],idx=[];for(var i=0;i<3;i++)if(base[i]!==0)idx.push(i);var combos=1<<idx.length;for(var m=0;m<combos;m++){var v=base.slice();for(var k=0;k<idx.length;k++)if(m&(1<<k))v[idx[k]]=-v[idx[k]];out.push(v);}return out;}
    function expand(triples){var out=[];triples.forEach(function(t){perms(t[0],t[1],t[2]).forEach(function(pp){signs(pp).forEach(function(s){out.push(s);});});});var seen={},res=[];out.forEach(function(v){var key=v.map(function(x){return x.toFixed(6);}).join(",");if(!seen[key]){seen[key]=1;res.push(v);}});return res;}
    var ico=expand([[0,1,p]]);var dodec=expand([[1,1,1]]).concat(expand([[0,ip,p]]));
    function d2(a,b){return(a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1])+(a[2]-b[2])*(a[2]-b[2]);}
    var mids=[],seenM={};for(var i=0;i<ico.length;i++)for(var j=i+1;j<ico.length;j++)if(Math.abs(d2(ico[i],ico[j])-4)<1e-6){var m=[(ico[i][0]+ico[j][0])/2,(ico[i][1]+ico[j][1])/2,(ico[i][2]+ico[j][2])/2];var key=m.map(function(x){return x.toFixed(4);}).join(",");if(!seenM[key]){seenM[key]=1;mids.push(m);}}
    function toLatLon(v,id,cls){var r=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);return{id:id,cls:cls,lat:Math.asin(v[2]/r)*180/Math.PI,lon:Math.atan2(v[1],v[0])*180/Math.PI};}
    var nodes=[];ico.forEach(function(v,i){nodes.push(toLatLon(v,"A"+(i+1),"icosa"));});dodec.forEach(function(v,i){nodes.push(toLatLon(v,"B"+(i+1),"dodeca"));});mids.forEach(function(v,i){nodes.push(toLatLon(v,"C"+(i+1),"mid"));});return nodes;
  }
  var NODES=buildNodes();
  function haversine(lat1,lon1,lat2,lon2){var R=6371,toR=Math.PI/180,dLat=(lat2-lat1)*toR,dLon=(lon2-lon1)*toR;var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*toR)*Math.cos(lat2*toR)*Math.sin(dLon/2)*Math.sin(dLon/2);return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
  function nearestNode(lat,lon){var best=null,bestD=Infinity;for(var i=0;i<NODES.length;i++){var d=haversine(lat,lon,NODES[i].lat,NODES[i].lon);if(d<bestD){bestD=d;best=NODES[i];}}return{node:best,distanceKm:bestD};}
  function nodePhase(node,date){var t=date.getTime()/86400000;var seed=(node.lat+90)*17+(node.lon+180)*31;var cycle=12*PHI;var phase=((t/365.2425+seed)%cycle)/cycle;var heat=0.5+0.5*Math.cos(2*Math.PI*phase);return{phase:phase,heat:heat,label:heat>0.7?"ГОРЯЧИЙ":(heat>0.4?"ТЁПЛЫЙ":"ХОЛОДНЫЙ")};}

  // === BIRTH DEEP MODEL ===
  function birthProfile(opts){opts=opts||{};
    var name=opts.name||DEFAULT_BIRTH.name,dateStr=opts.date||DEFAULT_BIRTH.date,time=opts.time||DEFAULT_BIRTH.time;
    var lat=opts.lat!=null?opts.lat:DEFAULT_BIRTH.lat,lon=opts.lon!=null?opts.lon:DEFAULT_BIRTH.lon,place=opts.place||DEFAULT_BIRTH.place;
    var now=opts.now?parseDate(opts.now):new Date();
    var birth=parseDate(dateStr+(time?" "+time:""));if(!birth)return{ok:false,message:"Невалидная дата рождения"};
    var p=ymd(birth),rawSum=sumDigits(p.y)+sumDigits(p.m)+sumDigits(p.day),dr=digitalRoot(rawSum);
    var lp=lifePath(birth),soul=digitalRoot(nameToNumber(name)),destiny=digitalRoot(soul+dr),hourDR=digitalRoot(p.h*60+p.min);
    var ax=axisOf(dr),age=ageYears(birth,now);
    var py=personalYear(birth,now.getUTCFullYear()),pm=personalMonth(birth,now.getUTCFullYear(),now.getUTCMonth()+1);
    var pd=personalDay(birth,now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate());
    var nn=nearestNode(lat,lon),np=nodePhase(nn.node,now),lunaBirth=lunarPhase(birth),lunaNow=lunarPhase(now),st=step21(age.days);
    var amps={};for(var k=1;k<=9;k++)amps[k]=0.08;amps[dr]+=0.28;amps[lp]+=0.18;amps[soul]+=0.14;amps[py]+=0.10;amps[pd]+=0.08;amps[mirrorPair(dr)]+=0.06;
    var sumA=0;for(k=1;k<=9;k++)sumA+=amps[k];for(k=1;k<=9;k++)amps[k]=Math.round((amps[k]/sumA)*1000)/1000;
    var dominant=1;for(k=2;k<=9;k++)if(amps[k]>amps[dominant])dominant=k;
    var insight=[];
    insight.push("Личный оператор DR: "+dr+" — "+DR_MEANING[dr]);
    insight.push("Life Path: "+lp+" · Soul (имя): "+soul+" · Destiny: "+destiny);
    insight.push("Ось куба: "+ax.name+" · зеркало "+dr+"↔"+mirrorPair(dr));
    insight.push("Личный год "+now.getUTCFullYear()+": "+py+" — "+DR_MEANING[py]);
    insight.push("Личный день сегодня: "+pd+" — "+DR_ACTION[pd]);
    insight.push("9-летняя фаза жизни: "+age.nineYearPhase+"/9 — "+DR_MEANING[age.nineYearPhase]);
    insight.push("Возраст: "+age.yearsFloor+" лет · шаг21: "+st.step+"/"+st.operation);
    insight.push("ИДСЗ: "+nn.node.id+" · "+Math.round(nn.distanceKm)+" км · "+np.label);
    insight.push("Луна рождения: "+lunaBirth.name+" · сейчас: "+lunaNow.name);
    if(dr===5)insight.push("✦ DR5 — оператор перемены/свободы. Дни DR5 = твои зеркальные окна.");
    if(py===1)insight.push("✦ Личный год 1 — закладка систем. Посеянное растёт 9 лет.");
    if(py===8)insight.push("✦ Личный год 8 — денежный/масштабный.");
    if(py===9)insight.push("✦ Личный год 9 — завершение цикла.");
    return{ok:true,name:name,place:place,birthISO:dateStr,time:time,lat:lat,lon:lon,birth:birth,now:now,
      numbers:{rawSum:rawSum,dr:dr,lifePath:lp,soul:soul,destiny:destiny,hourDR:hourDR,steps:digitalRootSteps(rawSum),axis:ax,mirror:mirrorPair(dr),meaning:DR_MEANING[dr],action:DR_ACTION[dr],archetype:opArchetype(dr)},
      cycles:{age:age,personalYear:py,personalMonth:pm,personalDay:pd,personalYearMeaning:DR_MEANING[py],nineYearPhase:age.nineYearPhase,nineYearMeaning:DR_MEANING[age.nineYearPhase],step21:st,planetToday:planetDay(now)},
      field:{nearestNode:nn,nodePhase:np,lunaBirth:lunaBirth,lunaNow:lunaNow},spectrum:amps,dominant:dominant,
      formula:"DR="+dr+" · LP="+lp+" · Soul="+soul+" · Dest="+destiny+" · Axis="+ax.id+" · PY"+now.getUTCFullYear()+"="+py,insight:insight};
  }

  // === TRIPLE-RING EVENT ===
  function eventScore(opts){opts=opts||{};var date=parseDate(opts.date)||new Date();
    var lat=opts.lat!=null?opts.lat:DEFAULT_BIRTH.lat,lon=opts.lon!=null?opts.lon:DEFAULT_BIRTH.lon;
    var birth=parseDate(opts.birth||DEFAULT_BIRTH.date);
    var dr=dateDR(date),luna=lunarPhase(date),nn=nearestNode(lat,lon),np=nodePhase(nn.node,date);
    var pd=birth?personalDay(birth,date.getUTCFullYear(),date.getUTCMonth()+1,date.getUTCDate()):dr;
    var sDR=AXIS.indexOf(dr)>=0?(dr===9?92:78):(RING.indexOf(dr)>=0?70:50);if(dr===5||dr===8)sDR=90;
    var sLuna=Math.round(40+60*(1-Math.min(1,luna.phiDistance*8)));if(luna.name==="Новолуние"||luna.name==="Полнолуние")sLuna=Math.max(sLuna,88);
    var sNode=Math.round(np.heat*100);var sPersonal=(pd===dr)?95:(mirrorPair(pd)===dr?82:60);var sMoney=MONEY_DR[dr].score;
    var rings=0;if(sDR>=70)rings++;if(sLuna>=70)rings++;if(sNode>=55)rings++;if(sPersonal>=80)rings++;
    var overall=Math.round(sDR*0.25+sLuna*0.25+sNode*0.2+sPersonal*0.15+sMoney*0.15);
    var verdict=rings>=3&&overall>=75?"СОБЫТИЕ · три кольца в резонансе":rings>=2&&overall>=60?"ОКНО · два кольца — действуй":overall>=45?"ФОН · один слой — готовь":"ТИШИНА · копи силу";
    return{ok:true,date:date,dr:dr,personalDay:pd,planet:planetDay(date),luna:luna,node:nn,nodePhase:np,
      scores:{dr:sDR,luna:sLuna,node:sNode,personal:sPersonal,money:sMoney,overall:overall},rings:rings,verdict:verdict,
      money:MONEY_DR[dr],meaning:DR_MEANING[dr],action:DR_ACTION[dr],
      formula:"E=Luna("+luna.name+")×Node("+nn.node.id+":"+np.label+")×DR("+dr+")×PD("+pd+")"};
  }

  // === PREDICT ===
  function predict(opts){opts=opts||{};var days=opts.days||27;var start=parseDate(opts.from)||new Date();
    start=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),start.getUTCDate()));
    var birth=parseDate(opts.birth||DEFAULT_BIRTH.date);var lat=opts.lat!=null?opts.lat:DEFAULT_BIRTH.lat;var lon=opts.lon!=null?opts.lon:DEFAULT_BIRTH.lon;
    var calendar=[],peaks=[],moneyDays=[],personalMirrors=[];
    for(var i=0;i<days;i++){var d=new Date(start.getTime()+i*86400000);var ev=eventScore({date:d,birth:birth,lat:lat,lon:lon});
      var row={date:d.toISOString().slice(0,10),dr:ev.dr,pd:ev.personalDay,planet:ev.planet,luna:ev.luna.name,overall:ev.scores.overall,rings:ev.rings,verdict:ev.verdict,money:ev.money.label,moneyScore:ev.money.score,action:ev.action,node:ev.node.node.id,nodeHeat:Math.round(ev.nodePhase.heat*100)};
      calendar.push(row);if(ev.scores.overall>=78)peaks.push(row);if(ev.money.score>=90)moneyDays.push(row);if(ev.personalDay===ev.dr)personalMirrors.push(row);}
    function bestFor(fn){var best=calendar[0];for(var j=1;j<calendar.length;j++)if(fn(calendar[j])>fn(best))best=calendar[j];return best;}
    return{ok:true,from:start.toISOString().slice(0,10),days:days,calendar:calendar,peaks:peaks,moneyDays:moneyDays,personalMirrors:personalMirrors,
      best:{launch:bestFor(function(r){return(r.dr===1||r.pd===1?30:0)+r.overall;}),money:bestFor(function(r){return r.moneyScore+r.overall*0.3;}),
        release:bestFor(function(r){return(r.dr===9||r.pd===9?30:0)+r.overall;}),deal:bestFor(function(r){return(r.dr===5||r.pd===5?25:0)+r.moneyScore*0.5+r.overall*0.3;}),
        deepWork:bestFor(function(r){return(r.dr===7||r.pd===7?35:0)+r.overall*0.4;})},
      birth:birthProfile({date:opts.birth||DEFAULT_BIRTH.date,now:start,lat:lat,lon:lon})};
  }

  // === CREATE ===
  function createDesign(opts){opts=opts||{};var intent=String(opts.intent||"").trim();if(!intent)return{ok:false,message:"Введи намерение / проект"};
    var seed=nameToNumber(intent),dr=digitalRoot(seed),ax=axisOf(dr),st=step21(seed),kl=keplerLadder(1),fr=nearestFreq(seed%900+60);
    var birth=birthProfile(opts.birth||{});var now=new Date();var pred=predict({days:27,birth:opts.birth&&opts.birth.date,lat:opts.lat,lon:opts.lon});
    var roadmap=[];for(var i=1;i<=21;i++){var s=step21(i);var dayOffset=Math.round((i-1)*(PHI*1.2));var d=new Date(now.getTime()+dayOffset*86400000);
      roadmap.push({step:i,phase:s.phaseName,operation:s.operation,dayOffset:dayOffset,date:d.toISOString().slice(0,10),dayDR:dateDR(d),tip:OPS_TIPS[s.operation]||""});}
    var modules=[{n:1,role:"Инициатор",layer:"Data/Тело",task:"Семя: one-liner сути «"+intent+"»"},{n:2,role:"Зеркало",layer:"Data/Тело",task:"Парный feedback / research"},{n:3,role:"Заземлитель",layer:"Data/Тело",task:"Спека + constraints + ENV"},{n:4,role:"Архитектор",layer:"Logic/Дух",task:"1:√φ:φ · core/field/bridge"},{n:5,role:"Критик",layer:"Logic/Дух",task:"Аномалия-как-вход · security"},{n:6,role:"Соединитель",layer:"Logic/Дух",task:"API · интеграции · связи"},{n:7,role:"Хранитель",layer:"Interface/Душа",task:"Docs · ADR · tests"},{n:8,role:"Реализатор",layer:"Interface/Душа",task:"Ship MVP · money path"},{n:9,role:"Визионер",layer:"Interface/Душа",task:"Релиз + отдача + next octave"}];
    return{ok:true,intent:intent,seed:seed,dr:dr,meaning:DR_MEANING[dr],action:DR_ACTION[dr],axis:ax,step21:st,kepler:kl,frequency:fr,archetype:opArchetype(dr),
      modules:modules,roadmap:roadmap,
      checklist:{axis369:"Ось 3-6-9: data/logic/release",ring:"Кольцо 1-2-4-8-7-5: семя→рост→экспансия→feedback→интеграция→виток",mirrors:"Пары 1↔8,2↔7,4↔5",returns9:"Финал в 9: релиз сеет следующую октаву"},
      timing:{bestLaunch:pred.best.launch,bestMoney:pred.best.money,personalYear:birth.ok?birth.cycles.personalYear:null,note:"Запуск DR1/PD1 · деньги DR8/5 · релиз DR9"},
      birthAlign:birth.ok?{yourDR:birth.numbers.dr,resonance:digitalRoot(birth.numbers.dr+dr),note:birth.numbers.dr===dr?"Прямой резонанс — проект «твой»":(mirrorPair(birth.numbers.dr)===dr?"Зеркальный резонанс — дополняет тебя":"Нейтральный — держи ось 3-6-9")}:null,
      mantra:"Семя("+dr+") → кольцо 1-2-4-8-7-5 → 9 · «"+intent+"»"};
  }

  // === FIELD READ (enhanced) ===
  function parseInput(raw){var s=String(raw==null?"":raw).trim();if(!s)return{type:"empty"};
    var coord=s.match(/^(-?\d+(?:\.\d+)?)\s*[,;]\s*(-?\d+(?:\.\d+)?)$/);if(coord)return{type:"geo",lat:parseFloat(coord[1]),lon:parseFloat(coord[2])};
    var freq=s.match(/^(\d+(?:\.\d+)?)\s*(hz|гц)$/i);if(freq)return{type:"freq",hz:parseFloat(freq[1])};
    var iso=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(iso)return{type:"date",date:new Date(Date.UTC(+iso[1],+iso[2]-1,+iso[3]))};
    var ru=s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);if(ru)return{type:"date",date:new Date(Date.UTC(+ru[3],+ru[2]-1,+ru[1]))};
    if(/^-?\d+(?:\.\d+)?$/.test(s))return{type:"number",value:parseFloat(s)};return{type:"name",text:s};}
  function fieldRead(raw,opts){opts=opts||{};var p=parseInput(raw);if(p.type==="empty")return{ok:false,message:"Пусто — дата, число, координаты, частота или слово."};
    var lenses=[],scores=[],seed=0;
    if(p.type==="number")seed=p.value;else if(p.type==="freq")seed=p.hz;else if(p.type==="name")seed=nameToNumber(p.text);
    else if(p.type==="date"){var d=p.date;seed=d.getUTCFullYear()+(d.getUTCMonth()+1)+d.getUTCDate();}else if(p.type==="geo")seed=Math.round(Math.abs(p.lat)+Math.abs(p.lon));
    var dr=digitalRoot(Math.round(seed)),ax=axisOf(dr);
    lenses.push({key:"mod9",title:"Mod9 · Резонансная алгебра",lines:["DR: "+dr+" — "+DR_MEANING[dr],"Класс: "+mod9Class(dr),"Ось: "+ax.name,"Зеркало: "+dr+"↔"+mirrorPair(dr),"×"+dr+": "+opArchetype(dr),"Действие: "+DR_ACTION[dr]]});
    scores.push(AXIS.indexOf(dr)>=0?(dr===9?100:82):68);
    var baseN=Math.round(Math.abs(seed))||1,nf=nearestFib(baseN),kl=keplerLadder(Math.abs(seed)||1),fibClose=nf===0?1:Math.abs(nf-baseN)/nf;
    lenses.push({key:"phi",title:"φ · Золото и Fib",lines:["Fib: "+nf+(isFib(baseN)?" ✦":""),"Кеплер: "+kl.low.toFixed(2)+" : "+kl.mid.toFixed(2)+" : "+kl.high.toFixed(2),"Угол: "+GOLDEN_ANGLE.toFixed(2)+"°"]});
    scores.push(Math.max(0,100-fibClose*120));
    var st=step21(baseN);lenses.push({key:"key21",title:"Второй Ключ · 21",lines:["Шаг "+st.step+"/21 · "+st.phaseName,"Оп: "+st.operation,OPS_TIPS[st.operation]||""]});scores.push(st.step%7===0?90:62);
    var mappedHz=(seed%900+900)%900+60,fr=nearestFreq(p.type==="freq"?p.hz:mappedHz);
    lenses.push({key:"freq",title:"Частота",lines:[(p.type==="freq"?"Ввод: "+p.hz:"seed→ "+mappedHz.toFixed(1))+" Гц","Канон: "+fr.hz+" — "+fr.name,"DR: "+digitalRoot(Math.round(fr.hz))]});
    scores.push(p.type==="freq"?Math.max(0,100-Math.abs(fr.hz-p.hz)):62);
    if(p.type==="geo"){var nn=nearestNode(p.lat,p.lon),nph=nodePhase(nn.node,new Date());
      lenses.push({key:"geo",title:"ИДСЗ · 62",lines:["Точка: "+p.lat.toFixed(3)+", "+p.lon.toFixed(3),"Узел: "+nn.node.id+" · "+Math.round(nn.distanceKm)+" км","Фаза: "+nph.label+" ("+Math.round(nph.heat*100)+"%)"]});scores.push(Math.max(0,100-nn.distanceKm/40));}
    if(p.type==="date"){var lp=lunarPhase(p.date),ev=eventScore({date:p.date,birth:opts.birth});
      lenses.push({key:"luna",title:"Луна",lines:["Фаза: "+lp.name+" · "+lp.ageDays.toFixed(1)+"д","φ-окно: "+(lp.isPhiWindow?"ДА ✦":"нет"),"Свет: "+Math.round(lp.illumination*100)+"%"]});
      lenses.push({key:"event",title:"Triple-Ring",lines:[ev.formula,"Кольца: "+ev.rings+"/4 · "+ev.scores.overall,ev.verdict,"Деньги: "+ev.money.label+" ("+ev.money.score+")"]});scores.push(ev.scores.overall);}
    lenses.push({key:"money",title:"Деньги×Время",lines:["DR "+dr+": "+MONEY_DR[dr].label,"Score: "+MONEY_DR[dr].score+"/100",DR_ACTION[dr]]});
    var overall=scores.reduce(function(a,b){return a+b;},0)/scores.length;
    var verdict=overall>=61.8?"ЗВУЧИТ":(overall>=38.2?"ТРЕБУЕТ НАСТРОЙКИ":"НЕ ЗВУЧИТ");
    return{ok:true,input:p,seed:seed,dr:dr,axis:ax,overall:Math.round(overall*10)/10,verdict:verdict,lenses:lenses,money:MONEY_DR[dr],meaning:DR_MEANING[dr],action:DR_ACTION[dr]};
  }

  // === CUBE / OPERATORS ===
  function operatorTable(){var rows=[];for(var k=1;k<=9;k++){var orbit=[],x=1;for(var i=0;i<6;i++){orbit.push(x);x=mulMod9(x,k);if(x===1&&i>0)break;}rows.push({k:k,archetype:opArchetype(k),orbit:orbit,meaning:DR_MEANING[k]});}return rows;}
  function fibMod9Day(hour){var fib=[0,1];for(var i=2;i<24;i++)fib.push((fib[i-1]+fib[i-2])%9);var v=fib[((hour%24)+24)%24];return v===0?9:v;}

  // === EXPORT ===
  return {version:"2.0.0",PHI:PHI,INV_PHI:INV_PHI,SQRT_PHI:SQRT_PHI,GOLDEN_ANGLE:GOLDEN_ANGLE,AXIS:AXIS,RING:RING,TRI_A:TRI_A,TRI_B:TRI_B,
    DR_MEANING:DR_MEANING,DR_ACTION:DR_ACTION,MONEY_DR:MONEY_DR,FREQS:FREQS,NODES:NODES,DEFAULT_BIRTH:DEFAULT_BIRTH,
    digitalRoot:digitalRoot,sumDigits:sumDigits,digitalRootSteps:digitalRootSteps,mod9Class:mod9Class,mirrorPair:mirrorPair,axisOf:axisOf,mulMod9:mulMod9,
    opArchetype:opArchetype,fibUpTo:fibUpTo,nearestFib:nearestFib,isFib:isFib,keplerLadder:keplerLadder,nearestFreq:nearestFreq,step21:step21,
    nameToNumber:nameToNumber,parseDate:parseDate,dateDR:dateDR,lifePath:lifePath,personalYear:personalYear,personalMonth:personalMonth,personalDay:personalDay,
    planetDay:planetDay,ageYears:ageYears,lunarPhase:lunarPhase,haversine:haversine,nearestNode:nearestNode,nodePhase:nodePhase,
    birthProfile:birthProfile,eventScore:eventScore,predict:predict,createDesign:createDesign,parseInput:parseInput,fieldRead:fieldRead,
    operatorTable:operatorTable,fibMod9Day:fibMod9Day};
});
