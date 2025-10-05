import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import pptxgen from 'pptxgenjs';

const quizData = {
  rounds: [
    {
      title: 'Видеоигры',
      icon: 'Gamepad2',
      questions: [
        { q: 'В какой игре главный герой – Марио?', a: ['Super Mario Bros', 'Sonic', 'Zelda', 'Pokemon'], correct: 0 },
        { q: 'Как называется игра, где строят и разрушают блоки?', a: ['Minecraft', 'Roblox', 'Fortnite', 'Terraria'], correct: 0 },
        { q: 'Как зовут знаменитого ёжика?', a: ['Марио', 'Sonic', 'Crash', 'Spyro'], correct: 1 },
        { q: 'В какой игре выращивают растения против зомби?', a: ['Plants vs Zombies', 'Zombies Ate My Neighbors', 'Dead Island', 'L4D'], correct: 0 },
        { q: 'Королевская битва 100 игроков?', a: ['Fortnite', 'Apex', 'PUBG', 'Все варианты'], correct: 3 },
        { q: 'В какой игре есть Пикачу?', a: ['Digimon', 'Pokemon', 'Yokai Watch', 'Monster Hunter'], correct: 1 },
        { q: 'В Minecraft мир с лавой называется?', a: ['Ад', 'Нижний мир', 'Пустота', 'Край'], correct: 1 },
        { q: 'Главный герой Zelda?', a: ['Zelda', 'Link', 'Ganon', 'Epona'], correct: 1 },
        { q: 'Игра про ферму и животных?', a: ['FarmVille', 'Stardew Valley', 'Harvest Moon', 'Все варианты'], correct: 3 },
        { q: 'Игра где ломают блоки и сражаются с криперами?', a: ['Terraria', 'Minecraft', 'Roblox', 'Dragon Quest'], correct: 1 },
      ]
    },
    {
      title: 'Настольные игры',
      icon: 'Dices',
      questions: [
        { q: 'Игра с полем 8x8 и матом королю?', a: ['Шахматы', 'Шашки', 'Го', 'Нарды'], correct: 0 },
        { q: 'Карты с цветами и цифрами?', a: ['UNO', 'Покер', 'Бридж', 'Дурак'], correct: 0 },
        { q: 'Строим города и собираем ресурсы?', a: ['Монополия', 'Каркассон', 'Колонизаторы', 'Ticket to Ride'], correct: 2 },
        { q: 'Кости и комбинации для очков?', a: ['Yahtzee', 'Покер на костях', 'Кости', 'Все варианты'], correct: 0 },
        { q: 'Выкидываем фишки соперника?', a: ['Шашки', 'Нарды', 'Уголки', 'Реверси'], correct: 1 },
        { q: 'Карточки "Пропусти ход"?', a: ['UNO', 'Монополия', 'Мафия', 'Свинтус'], correct: 0 },
        { q: 'Угадай слово по подсказкам?', a: ['Активити', 'Элиас', 'Крокодил', 'Все варианты'], correct: 3 },
        { q: 'Башня из брусков?', a: ['Дженга', 'Башня', 'Jenga', 'Варианты 1 и 3'], correct: 3 },
        { q: 'Рисуем и угадываем?', a: ['Pictionary', 'Крокодил', 'Имаджинариум', 'Диxit'], correct: 0 },
        { q: 'Скидываем фишки в цель?', a: ['Дартс', 'Кольцеброс', 'Боулинг', 'Петанк'], correct: 1 },
      ]
    },
    {
      title: 'Логические игры',
      icon: 'Brain',
      questions: [
        { q: 'Цифры в квадрате 9x9?', a: ['Судоку', 'Какуро', 'Кенкен', 'Нонограмма'], correct: 0 },
        { q: 'Соединяем точки линиями?', a: ['Flow Free', 'Dots', 'Two Dots', 'Line Puzzle'], correct: 0 },
        { q: 'Кубик по цветам на гранях?', a: ['Кубик Рубика', 'Пирамидка', 'Мегаминкс', 'Square-1'], correct: 0 },
        { q: 'Угадай слово по буквам?', a: ['Wordle', 'Виселица', 'Балда', 'Все варианты'], correct: 3 },
        { q: 'Переворачиваем карточки, ищем пары?', a: ['Мемори', 'Memory', 'Найди пару', 'Все варианты'], correct: 3 },
        { q: 'Шарик через лабиринт?', a: ['Marble Maze', 'Labyrinth', 'Перплексус', 'Все варианты'], correct: 3 },
        { q: 'Угадай число больше/меньше?', a: ['Быки и коровы', 'Угадайка', 'Guess Number', 'Все варианты'], correct: 3 },
        { q: 'Перетаскиваем фигурки?', a: ['Танграм', 'Пазл', 'Головоломка', 'Все варианты'], correct: 0 },
        { q: 'Составляем слова из букв?', a: ['Scrabble', 'Эрудит', 'Балда', 'Варианты 1 и 2'], correct: 3 },
        { q: 'Соединяем точки в коробки?', a: ['Dots and Boxes', 'Точки', 'Squares', 'Все варианты'], correct: 0 },
      ]
    },
    {
      title: 'Популярные франшизы',
      icon: 'Trophy',
      questions: [
        { q: 'Герой Fortnite в мемах?', a: ['Джонси', 'Default Dance', 'Пили', 'Floss'], correct: 1 },
        { q: 'Игра про магический мир и снитч?', a: ['Гарри Поттер', 'Hogwarts Legacy', 'Quidditch', 'Все варианты'], correct: 3 },
        { q: 'Постапокалипсис и зомби?', a: ['Last of Us', 'Dying Light', 'Days Gone', 'Все варианты'], correct: 3 },
        { q: 'Зеленый костюм в замках?', a: ['Link (Zelda)', 'Luigi', 'Robin Hood', 'Peter Pan'], correct: 0 },
        { q: 'Сбор карточек и битвы?', a: ['Pokemon TCG', 'Magic', 'Hearthstone', 'Все варианты'], correct: 3 },
        { q: 'Главный герой Smash Bros?', a: ['Марио', 'Все персонажи', 'Kirby', 'Master Hand'], correct: 1 },
        { q: 'Строим парки аттракционов?', a: ['RollerCoaster Tycoon', 'Planet Coaster', 'Theme Park', 'Все варианты'], correct: 3 },
        { q: 'Спасение принцессы от дракона?', a: ['Марио', 'Zelda', 'Dragon Quest', 'Все варианты'], correct: 3 },
        { q: 'Машины с оружием на трассах?', a: ['Mario Kart', 'Twisted Metal', 'Wipeout', 'F-Zero'], correct: 0 },
        { q: 'Маленькие существа ловить и тренировать?', a: ['Pokemon', 'Digimon', 'Yokai Watch', 'Temtem'], correct: 0 },
      ]
    },
    {
      title: 'Игровые термины',
      icon: 'Sword',
      questions: [
        { q: 'Здоровье персонажа?', a: ['HP', 'Health', 'Life', 'Все варианты'], correct: 3 },
        { q: 'Существа что взрываются в Minecraft?', a: ['Крипер', 'Creeper', 'Динамит', 'Варианты 1 и 2'], correct: 3 },
        { q: 'Оружие стреляющее стрелами?', a: ['Лук', 'Арбалет', 'Bow', 'Все варианты'], correct: 3 },
        { q: 'Что называют "боссом"?', a: ['Главный враг', 'Сильный противник', 'Финальный враг', 'Все варианты'], correct: 3 },
        { q: 'Предмет восстанавливающий здоровье?', a: ['Зелье', 'Аптечка', 'Heal', 'Все варианты'], correct: 3 },
        { q: 'В Fortnite защита от ударов?', a: ['Щит', 'Shield', 'Броня', 'Все варианты'], correct: 3 },
        { q: 'Что называют "патчем"?', a: ['Обновление', 'Исправление', 'Патч', 'Все варианты'], correct: 3 },
        { q: 'Внутриигровая валюта за реальные деньги?', a: ['Донат', 'Микротранзакции', 'Премиум валюта', 'Все варианты'], correct: 3 },
        { q: 'В Minecraft что добывают киркой?', a: ['Руду', 'Камень', 'Ресурсы', 'Все варианты'], correct: 3 },
        { q: 'Персонажи которыми управляет игрок?', a: ['Герой', 'Персонаж', 'Аватар', 'Все варианты'], correct: 3 },
      ]
    },
    {
      title: 'Веселые вопросы',
      icon: 'Smile',
      questions: [
        { q: 'Кто любит есть грибы?', a: ['Марио', 'Луиджи', 'Жаба', 'Все варианты'], correct: 0 },
        { q: 'Красная кепка и прыжки?', a: ['Марио', 'Луиджи', 'Wario', 'Waluigi'], correct: 0 },
        { q: 'Лошади и блоки?', a: ['Minecraft', 'Roblox', 'Terraria', 'Все варианты'], correct: 0 },
        { q: 'Пингвины на льду?', a: ['Club Penguin', 'Pengu', 'Ice Climber', 'Все варианты'], correct: 0 },
        { q: 'Желтые существа и бананы?', a: ['Миньоны', 'Pikachu', 'Pac-Man', 'Donkey Kong'], correct: 0 },
        { q: 'Синий костюм спасает мир?', a: ['Мегамен', 'Sonic', 'Mega Man', 'Варианты 1 и 3'], correct: 3 },
        { q: 'Кататься на картах и бананы?', a: ['Mario Kart', 'Crash Team Racing', 'Sonic Racing', 'All-Stars'], correct: 0 },
        { q: 'Собирает кольца и бегает быстро?', a: ['Sonic', 'Shadow', 'Knuckles', 'Tails'], correct: 0 },
        { q: 'Ловят монстров шариками?', a: ['Pokemon', 'Digimon', 'Monster Rancher', 'Все варианты'], correct: 0 },
        { q: 'Строит мосты через реку?', a: ['Poly Bridge', 'Bridge Constructor', 'Portal', 'Все варианты'], correct: 3 },
      ]
    },
  ]
};

type SlideType = 'title' | 'rules' | 'round-intro' | 'question' | 'answer' | 'final';

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState<SlideType>('title');
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextSlide = () => {
    if (currentSlide === 'title') {
      setCurrentSlide('rules');
    } else if (currentSlide === 'rules') {
      setCurrentSlide('round-intro');
    } else if (currentSlide === 'round-intro') {
      setCurrentSlide('question');
    } else if (currentSlide === 'question') {
      if (selectedAnswer !== null) {
        setShowAnswer(true);
        setCurrentSlide('answer');
        if (selectedAnswer === quizData.rounds[currentRound].questions[currentQuestion].correct) {
          setScore(score + 1);
        }
      }
    } else if (currentSlide === 'answer') {
      setSelectedAnswer(null);
      setShowAnswer(false);
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentSlide('question');
      } else if (currentRound < 5) {
        setCurrentQuestion(0);
        setCurrentRound(currentRound + 1);
        setCurrentSlide('round-intro');
      } else {
        setCurrentSlide('final');
      }
    }
  };

  const progress = ((currentRound * 10 + currentQuestion) / 60) * 100;

  const generatePowerPoint = () => {
    const pptx = new pptxgen();

    pptx.layout = 'LAYOUT_WIDE';
    pptx.defineSlideMaster({
      title: 'MASTER_SLIDE',
      background: { color: '1a1f2c' },
    });

    const titleSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    titleSlide.background = { color: '1a1f2c' };
    titleSlide.addText('МИР ИГР', {
      x: 0.5, y: 1.5, w: 9, h: 2,
      fontSize: 60, bold: true, color: 'FF00FF',
      align: 'center'
    });
    titleSlide.addText('🎮 🎲 🧩 🏆 ⚔️ 😄', {
      x: 0.5, y: 3.5, w: 9, h: 1,
      fontSize: 40, align: 'center'
    });
    titleSlide.addText('Квиз для геймеров 13-15 лет', {
      x: 0.5, y: 4.5, w: 9, h: 0.5,
      fontSize: 24, color: '00FFFF', align: 'center'
    });

    const rulesSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    rulesSlide.background = { color: '1a1f2c' };
    rulesSlide.addText('ПРАВИЛА', {
      x: 0.5, y: 0.5, w: 9, h: 1,
      fontSize: 48, bold: true, color: '00FFFF', align: 'center'
    });
    rulesSlide.addText('🎯 6 раундов по 10 вопросов\n✅ Выбери правильный ответ из 4 вариантов\n⭐ За каждый правильный ответ — 1 балл\n🏆 Максимум 60 баллов', {
      x: 1, y: 2, w: 8, h: 3,
      fontSize: 20, color: 'FFFFFF', lineSpacing: 40
    });

    quizData.rounds.forEach((round, roundIdx) => {
      const roundSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
      roundSlide.background = { color: '1a1f2c' };
      roundSlide.addText(`РАУНД ${roundIdx + 1}`, {
        x: 0.5, y: 1.5, w: 9, h: 1,
        fontSize: 48, bold: true, color: 'FB2708', align: 'center'
      });
      roundSlide.addText(round.title, {
        x: 0.5, y: 3, w: 9, h: 1,
        fontSize: 36, color: '00FFFF', align: 'center'
      });

      round.questions.forEach((question, qIdx) => {
        const qSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        qSlide.background = { color: '1a1f2c' };
        qSlide.addText(`Вопрос ${qIdx + 1}`, {
          x: 0.5, y: 0.3, w: 9, h: 0.5,
          fontSize: 18, color: '00FFFF'
        });
        qSlide.addText(question.q, {
          x: 0.5, y: 1.2, w: 9, h: 1.5,
          fontSize: 28, bold: true, color: 'FFFFFF', align: 'center'
        });
        
        question.a.forEach((answer, aIdx) => {
          const row = Math.floor(aIdx / 2);
          const col = aIdx % 2;
          qSlide.addText(answer, {
            x: 0.5 + col * 5, y: 3 + row * 1.2, w: 4.5, h: 1,
            fontSize: 18, color: 'FFFFFF',
            fill: { color: '0a0e27' },
            align: 'center'
          });
        });

        const aSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        aSlide.background = { color: '1a1f2c' };
        aSlide.addText('ПРАВИЛЬНЫЙ ОТВЕТ:', {
          x: 0.5, y: 1.5, w: 9, h: 1,
          fontSize: 36, bold: true, color: 'FFD700', align: 'center'
        });
        aSlide.addText(question.a[question.correct], {
          x: 0.5, y: 3, w: 9, h: 1.5,
          fontSize: 32, color: '00FFFF', align: 'center'
        });
      });
    });

    const finalSlide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
    finalSlide.background = { color: '1a1f2c' };
    finalSlide.addText('🏆', {
      x: 0.5, y: 1, w: 9, h: 1,
      fontSize: 72, align: 'center'
    });
    finalSlide.addText('ФИНИШ!', {
      x: 0.5, y: 2.5, w: 9, h: 1,
      fontSize: 48, bold: true, color: 'FFD700', align: 'center'
    });
    finalSlide.addText('Спасибо за игру!', {
      x: 0.5, y: 4, w: 9, h: 1,
      fontSize: 32, color: '00FFFF', align: 'center'
    });

    pptx.writeFile({ fileName: 'Квиз_Мир_Игр.pptx' });
  };

  return (
    <div className="min-h-screen bg-[#1a1f2c] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {currentSlide === 'title' && (
          <Card className="p-8 bg-gradient-to-br from-[#1a1f2c] to-[#0a0e27] border-4 border-[#FB2708] neon-border animate-fade-in">
            <div className="text-center space-y-8">
              <h1 className="font-pixel text-4xl md:text-6xl text-[#FF00FF] neon-text mb-8 leading-relaxed">
                МИР ИГР
              </h1>
              <div className="flex justify-center gap-4 text-4xl mb-8 animate-pixel-pulse">
                🎮 🎲 🧩 🏆 ⚔️ 😄
              </div>
              <p className="text-xl text-[#00FFFF] font-semibold">
                Квиз для геймеров 13-15 лет
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={nextSlide}
                  className="font-pixel text-lg px-8 py-6 bg-[#FB2708] hover:bg-[#FF00FF] neon-border transition-all duration-300"
                >
                  СТАРТ
                </Button>
                <Button
                  onClick={generatePowerPoint}
                  className="font-pixel text-lg px-8 py-6 bg-[#00FFFF] text-[#1a1f2c] hover:bg-[#FFD700] neon-border-cyan transition-all duration-300"
                >
                  <Icon name="Download" size={24} className="mr-2" />
                  СКАЧАТЬ PPT
                </Button>
              </div>
            </div>
          </Card>
        )}

        {currentSlide === 'rules' && (
          <Card className="p-8 bg-gradient-to-br from-[#1a1f2c] to-[#0a0e27] border-4 border-[#00FFFF] neon-border-cyan animate-slide-in">
            <h2 className="font-pixel text-3xl text-[#00FFFF] mb-6 text-center">ПРАВИЛА</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-3">
                <span className="text-[#FFD700] text-2xl">🎯</span>
                <p className="text-white">6 раундов по 10 вопросов</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FFD700] text-2xl">✅</span>
                <p className="text-white">Выбери правильный ответ из 4 вариантов</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FFD700] text-2xl">⭐</span>
                <p className="text-white">За каждый правильный ответ — 1 балл</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FFD700] text-2xl">🏆</span>
                <p className="text-white">Максимум 60 баллов</p>
              </div>
            </div>
            <Button
              onClick={nextSlide}
              className="font-pixel text-lg px-8 py-6 bg-[#00FFFF] text-[#1a1f2c] hover:bg-[#FFD700] mt-8 w-full"
            >
              НАЧАТЬ
            </Button>
          </Card>
        )}

        {currentSlide === 'round-intro' && (
          <Card className="p-8 bg-gradient-to-br from-[#1a1f2c] to-[#0a0e27] border-4 border-[#FB2708] neon-border animate-fade-in">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">
                <Icon name={quizData.rounds[currentRound].icon as any} size={80} className="inline-block text-[#FFD700]" />
              </div>
              <h2 className="font-pixel text-4xl text-[#FB2708] neon-text">
                РАУНД {currentRound + 1}
              </h2>
              <p className="text-3xl text-[#00FFFF] font-bold">
                {quizData.rounds[currentRound].title}
              </p>
              <Button
                onClick={nextSlide}
                className="font-pixel text-lg px-8 py-6 bg-[#FFD700] text-[#1a1f2c] hover:bg-[#FB2708] hover:text-white mt-8"
              >
                GO!
              </Button>
            </div>
          </Card>
        )}

        {currentSlide === 'question' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <span className="font-pixel text-[#00FFFF]">
                Вопрос {currentQuestion + 1}/10
              </span>
              <span className="font-pixel text-[#FFD700]">
                Очки: {score}
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-[#0a0e27]" />
            <Card className="p-8 bg-gradient-to-br from-[#1a1f2c] to-[#0a0e27] border-4 border-[#FF00FF] neon-border">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {quizData.rounds[currentRound].questions[currentQuestion].q}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizData.rounds[currentRound].questions[currentQuestion].a.map((answer, idx) => (
                  <Button
                    key={idx}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`p-6 text-lg font-semibold transition-all duration-300 ${
                      selectedAnswer === idx
                        ? 'bg-[#FB2708] text-white neon-border scale-105'
                        : 'bg-[#0a0e27] text-white border-2 border-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#1a1f2c]'
                    }`}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
              <Button
                onClick={nextSlide}
                disabled={selectedAnswer === null}
                className="font-pixel text-lg px-8 py-6 bg-[#FFD700] text-[#1a1f2c] hover:bg-[#00FFFF] mt-8 w-full disabled:opacity-50"
              >
                ОТВЕТИТЬ
              </Button>
            </Card>
          </div>
        )}

        {currentSlide === 'answer' && (
          <Card className="p-8 bg-gradient-to-br from-[#1a1f2c] to-[#0a0e27] border-4 border-[#FFD700] neon-border animate-fade-in">
            <div className="text-center space-y-6">
              {selectedAnswer === quizData.rounds[currentRound].questions[currentQuestion].correct ? (
                <>
                  <div className="text-8xl mb-4">✅</div>
                  <h3 className="font-pixel text-3xl text-[#00FFFF]">ПРАВИЛЬНО!</h3>
                  <p className="text-2xl text-white">+1 балл</p>
                </>
              ) : (
                <>
                  <div className="text-8xl mb-4">❌</div>
                  <h3 className="font-pixel text-3xl text-[#FB2708]">НЕВЕРНО</h3>
                  <p className="text-xl text-white">
                    Правильный ответ: <br />
                    <span className="text-[#00FFFF] font-bold">
                      {quizData.rounds[currentRound].questions[currentQuestion].a[
                        quizData.rounds[currentRound].questions[currentQuestion].correct
                      ]}
                    </span>
                  </p>
                </>
              )}
              <Button
                onClick={nextSlide}
                className="font-pixel text-lg px-8 py-6 bg-[#FB2708] text-white hover:bg-[#FF00FF] mt-8"
              >
                ДАЛЕЕ
              </Button>
            </div>
          </Card>
        )}

        {currentSlide === 'final' && (
          <Card className="p-8 bg-gradient-to-br from-[#1a1f2c] to-[#0a0e27] border-4 border-[#FFD700] neon-border animate-fade-in">
            <div className="text-center space-y-6">
              <div className="text-8xl mb-4">🏆</div>
              <h2 className="font-pixel text-4xl text-[#FFD700] neon-text">
                ФИНИШ!
              </h2>
              <div className="text-6xl font-bold text-[#FB2708] my-8">
                {score} / 60
              </div>
              <p className="text-2xl text-white">
                {score >= 50 ? '🌟 Легенда геймдева!' :
                 score >= 40 ? '🎮 Опытный игрок!' :
                 score >= 30 ? '⭐ Хороший результат!' :
                 score >= 20 ? '👍 Неплохо!' : '💪 Практика делает мастера!'}
              </p>
              <Button
                onClick={() => {
                  setCurrentSlide('title');
                  setCurrentRound(0);
                  setCurrentQuestion(0);
                  setScore(0);
                  setSelectedAnswer(null);
                }}
                className="font-pixel text-lg px-8 py-6 bg-[#00FFFF] text-[#1a1f2c] hover:bg-[#FB2708] hover:text-white mt-8"
              >
                ЗАНОВО
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}