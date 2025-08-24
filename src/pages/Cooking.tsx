import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backFalseSvg from "../assets/back=false.svg";
import backTrueSvg from "../assets/back=true.svg";
import riceyLogoSvg from "../assets/ricey-logo2.svg";
import plusFalseSvg from "../assets/+=false.svg";
import plusTrueSvg from "../assets/+=true.svg";
import minusFalseSvg from "../assets/-=false.svg";
import minusTrueSvg from "../assets/-=true.svg";
import waterNeed2Svg from "../assets/water-need2.svg";
import sharpButtonSvg from "../assets/Sharp Button.svg";
import typeFalseSvg from "../assets/type=false.svg";
import typeTrueSvg from "../assets/type=true.svg";
import jasmineSvg from "../assets/jasmine.svg";
import basmatiSvg from "../assets/basmati.svg";
import sushiSvg from "../assets/sushi.svg";
import arborioSvg from "../assets/arborio.svg";
import wholeSvg from "../assets/whole.svg";
import shortSvg from "../assets/short.svg";
import cookFalseSvg from "../assets/cook=false.svg";
import cookTrueSvg from "../assets/cook=true.svg";
import pauseFalseSvg from "../assets/pause=false.svg";
import playFalseSvg from "../assets/play=false.svg";
import timerSvg from "../assets/timer.svg";
import timerFalseSvg from "../assets/timer=false.svg";
import timerTrueSvg from "../assets/timer=true.svg";
import tipSvg from "../assets/tip.svg";
import pattern8pxSvg from "../assets/8px.svg";
// Audio file for completion sound
const asianGongMusic = "/asian-gong-music.mp3";

const riceOptions = [
  { category: "jasmine", variety: "white", name: "Jasmine", time: 12, waterRatio: 1.5, svg: jasmineSvg },
  { category: "basmati", variety: "white", name: "Basmati", time: 15, waterRatio: 2.0, svg: basmatiSvg },
  { category: "sushi", variety: "white", name: "Sushi", time: 20, waterRatio: 1.0, svg: sushiSvg },
  { category: "arborio", variety: "white", name: "Arborio", time: 20, waterRatio: 2.0, svg: arborioSvg },
  { category: "brown", variety: "brown", name: "Whole", time: 30, waterRatio: 2.0, svg: wholeSvg },
  { category: "short_grain", variety: "white", name: "Short", time: 20, waterRatio: 1.25, svg: shortSvg }
];

interface RiceOption {
  category: string;
  variety: string;
  name: string;
  time: number;
  waterRatio: number;
  svg: string;
}

export default function CookingPage() {
  const [stage, setStage] = useState('select_rice');
  const [selectedRice, setSelectedRice] = useState<RiceOption | null>(null);
  const [cups, setCups] = useState(1.0);
  
  const [totalTime, setTotalTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isBackPressed, setIsBackPressed] = useState(false);
  const [isPlusPressed, setIsPlusPressed] = useState(false);
  const [isMinusPressed, setIsMinusPressed] = useState(false);
  const [isChooseBackPressed, setIsChooseBackPressed] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [riceProgress, setRiceProgress] = useState(0);


  // 100 Cooking Tips
  const cookingTips = [
    "Don't lift the lid while cooking! This releases steam and can affect the cooking process.",
    "Always rinse your rice until the water runs clear to remove excess starch.",
    "Let rice rest for 5-10 minutes after cooking for better texture.",
    "Use a heavy-bottomed pot for even heat distribution.",
    "Don't stir rice while it's cooking - this can make it sticky.",
    "The water should be at a gentle simmer, not a rolling boil.",
    "Brown rice needs more water and longer cooking time than white rice.",
    "Jasmine rice is perfect for Asian dishes and has a subtle floral aroma.",
    "Basmati rice is ideal for Indian cuisine and has long, fluffy grains.",
    "Arborio rice is best for risotto and has a creamy texture when cooked.",
    "Short grain rice is stickier and perfect for sushi.",
    "Wild rice is actually a grass seed, not true rice.",
    "Rice doubles in volume when cooked - plan accordingly.",
    "Use a 2:1 water to rice ratio for most white rice varieties.",
    "Brown rice typically uses a 2.5:1 water to rice ratio.",
    "Add a pinch of salt to the cooking water for better flavor.",
    "Rice can be stored in the refrigerator for up to 4 days.",
    "Freeze cooked rice in portions for quick meals later.",
    "Reheat rice with a splash of water to restore moisture.",
    "Don't use metal utensils on non-stick rice cookers.",
    "Rice cookers automatically switch to 'warm' when done.",
    "Soaking rice for 30 minutes before cooking can reduce cooking time.",
    "Long grain rice stays separate and fluffy when cooked properly.",
    "Medium grain rice has a balance of stickiness and fluffiness.",
    "Sticky rice is perfect for eating with chopsticks.",
    "Rice bran contains most of the rice's nutrients.",
    "White rice has the bran and germ removed during processing.",
    "Parboiled rice is partially cooked before milling.",
    "Instant rice is pre-cooked and dehydrated for quick preparation.",
    "Rice flour is made from finely ground rice grains.",
    "Rice vinegar is made from fermented rice wine.",
    "Rice wine (sake) is made from fermented rice.",
    "Rice milk is a dairy-free alternative made from rice.",
    "Rice paper is made from rice flour and water.",
    "Rice noodles are made from rice flour and water.",
    "Rice cakes are made from puffed rice grains.",
    "Rice pudding is a sweet dessert made with cooked rice.",
    "Rice and beans together provide complete protein.",
    "Rice is naturally gluten-free and safe for celiacs.",
    "Rice is a good source of complex carbohydrates.",
    "Brown rice contains more fiber than white rice.",
    "Rice is low in fat and cholesterol-free.",
    "Rice is easy to digest and gentle on the stomach.",
    "Rice is a staple food for over half the world's population.",
    "There are over 40,000 varieties of rice worldwide.",
    "Rice has been cultivated for over 10,000 years.",
    "China is the world's largest producer of rice.",
    "Rice paddies are flooded fields where rice grows.",
    "Rice plants can grow up to 6 feet tall.",
    "Rice grains are actually the seeds of the rice plant.",
    "Rice is harvested when the grains turn golden yellow.",
    "Rice is threshed to separate grains from stalks.",
    "Rice is milled to remove the outer husk.",
    "Rice is polished to remove the bran layer.",
    "Rice is graded by size, shape, and quality.",
    "Premium rice has fewer broken grains.",
    "Rice is packaged to maintain freshness.",
    "Rice should be stored in a cool, dry place.",
    "Rice can absorb odors from nearby foods.",
    "Rice expands when cooked due to starch gelatinization.",
    "Rice starch helps thicken soups and sauces.",
    "Rice water can be used as a natural hair rinse.",
    "Rice bran oil is extracted from rice bran.",
    "Rice husks can be used as fuel or insulation.",
    "Rice straw can be used for animal feed or crafts.",
    "Rice fields provide habitat for many wildlife species.",
    "Rice cultivation helps prevent soil erosion.",
    "Rice farming creates important wetland ecosystems.",
    "Rice is a sustainable crop that can be grown year-round.",
    "Rice requires less water than many other grains.",
    "Rice can be grown in both wet and dry conditions.",
    "Rice is resistant to many common plant diseases.",
    "Rice plants help purify water in rice paddies.",
    "Rice cultivation dates back to ancient civilizations.",
    "Rice was first domesticated in China around 10,000 BC.",
    "Rice spread from Asia to other continents via trade routes.",
    "Rice became a staple in Europe during the Middle Ages.",
    "Rice was introduced to the Americas by European settlers.",
    "Rice cultivation shaped many Asian cultures and traditions.",
    "Rice festivals are celebrated in many rice-growing regions.",
    "Rice is often used in religious ceremonies and offerings.",
    "Rice symbolizes prosperity and fertility in many cultures.",
    "Rice is a traditional wedding food in many countries.",
    "Rice is used in traditional medicine in some cultures.",
    "Rice water is believed to have healing properties.",
    "Rice is a symbol of life and sustenance worldwide.",
    "Rice farming techniques vary by region and climate.",
    "Rice can be grown at high altitudes in mountain terraces.",
    "Rice is grown in flooded fields called paddies.",
    "Rice plants need warm temperatures to grow well.",
    "Rice requires plenty of water during the growing season.",
    "Rice is harvested when the grains are mature and dry.",
    "Rice processing removes impurities and improves quality.",
    "Rice is tested for quality before packaging.",
    "Rice varieties are bred for different growing conditions.",
    "Rice research continues to improve yields and quality.",
    "Rice is an important crop for food security worldwide.",
    "Rice provides essential nutrients for billions of people.",
    "Rice is a versatile ingredient in many cuisines.",
    "Rice can be cooked in many different ways.",
    "Rice is a budget-friendly staple food.",
    "Rice is easy to prepare and requires minimal equipment.",
    "Rice is a good choice for beginner cooks.",
    "Rice is perfect for meal prep and batch cooking.",
    "Rice can be flavored with herbs, spices, and seasonings.",
    "Rice pairs well with many different proteins and vegetables.",
    "Rice is a blank canvas for creative cooking.",
    "Rice can be served hot, warm, or cold.",
    "Rice is perfect for leftovers and next-day meals.",
    "Rice is a great base for one-pot meals.",
    "Rice can be used in both sweet and savory dishes.",
    "Rice is a traditional comfort food in many cultures.",
    "Rice is often the first solid food given to babies.",
    "Rice is a gentle food for people with digestive issues.",
    "Rice is a good choice for athletes and active people.",
    "Rice provides sustained energy for daily activities.",
    "Rice is a heart-healthy whole grain option.",
    "Rice is naturally low in sodium and fat.",
    "Rice is a good source of B vitamins.",
    "Rice contains important minerals like magnesium and selenium.",
    "Rice is a sustainable and environmentally friendly crop.",
    "Rice farming supports rural communities worldwide.",
    "Rice is a crop that can feed the world sustainably."
  ];

  // Randomize tip every 30 seconds
  useEffect(() => {
    if (stage === 'timer') {
      const tipInterval = setInterval(() => {
        setCurrentTip(Math.floor(Math.random() * cookingTips.length));
      }, 30000);

      return () => clearInterval(tipInterval);
    }
  }, [stage]);

  // Set initial random tip when timer starts
  useEffect(() => {
    if (stage === 'timer') {
      setCurrentTip(Math.floor(Math.random() * cookingTips.length));
    }
  }, [stage]);

  // Play gong sound when cooking is complete
  useEffect(() => {
    if (stage === 'timer' && timeRemaining === 0) {
      const audio = new Audio(asianGongMusic);
      audio.volume = 0.7;
      
      // Play first gong
      audio.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
      
      // Play second gong after the first one finishes
      audio.addEventListener('ended', () => {
        const audio2 = new Audio(asianGongMusic);
        audio2.volume = 0.7;
        audio2.play().catch(error => {
          console.log('Second audio playback failed:', error);
        });
      });
    }
  }, [timeRemaining, stage]);

  // Stop audio when leaving timer stage
  useEffect(() => {
    if (stage !== 'timer') {
      // Stop all audio elements
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }, [stage]);

  // Rice progress animation
  useEffect(() => {
    if (stage === 'timer') {
      const totalTime = selectedRice?.time || 1;
      const totalSeconds = totalTime * 60;
      const progress = 1 - (timeRemaining / totalSeconds);
      setRiceProgress(Math.max(0, Math.min(1, progress)));
    } else {
      setRiceProgress(0);
    }
  }, [stage, timeRemaining, selectedRice]);

  useEffect(() => {
    if (stage !== 'timer') return;
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, stage]);

  const handleSelectRice = (riceOption: RiceOption) => {
    setSelectedRice(riceOption);
    setStage('set_amount');
  };
  
  const handleStartCooking = () => {
    if (!selectedRice) return;
    
    const timeInSeconds = selectedRice.time * 60;
    setTotalTime(timeInSeconds);
    setTimeRemaining(timeInSeconds);
    setIsComplete(false);
    setStage('timer');
    setIsRunning(true);
  };

  const handleTimerComplete = async () => {
    setIsComplete(true);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    // Logic to update session and user progress
  };

  const adjustCups = (amount: number) => {
    setCups(prev => Math.max(0.25, Math.min(4.0, Math.round((prev + amount) * 4) / 4)));
  };

  const getServingText = () => {
    if (cups <= 0.75) return "SERVES 1";
    if (cups <= 1.5) return "SERVES 2-3";
    if (cups <= 3.0) return "SERVES 4-6";
    return "SERVES 6+";
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const waterCups = selectedRice ? Math.round(cups * selectedRice.waterRatio * 10) / 10 : 0;
  const waterMl = selectedRice ? Math.round(cups * selectedRice.waterRatio * 240) : 0;
  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#fcfbf4] font-pixel select-none" style={{
      imageRendering: 'crisp-edges'
    }}>
      <style>
        {`
          img {
            image-rendering: crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: pixelated;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        `}
      </style>
      {/* Stage: Select Rice */}
      {stage === 'select_rice' && (
        <div className="relative w-full h-screen max-w-[100vw] mx-auto">
          {/* Background Pattern - Circles 48px */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAe1JREFUaAXtmaFOxEAQhg9QCAQYQJOQ4PEnQfAAvAASBe+A4gwvwROARoMkIZCgcJCABAf/17SEkmmvTefolswkf8XudPvP39vtzNxoZNupho/tqV5Gj/TUifXkeWtQY1vCY8VcH8NwgVMj25TXi7DSyPtvnJZzTnCrtUXNEu1+rVc/k3D6FOBoGtHhcG7OpjEINwQuvQk2x6XAzyZF5UWrZHCEK5wnc7qww4nqSngThmDsibGwMQSywTEUCAVCgVAgFPi/CpBKzMJIxX9+6otU5dX7YQveC2o9kq0LYU34EJaEHeFEeBJuhWSNdJeUvJTu5mwZ400km66jPAQrC458jgDxTcoal3xizZtwK1mrivq26rBhb4SHBjficy1wT2fzCoDC4q4FG3xdihGvAFpw93X1CoDN27hvk/tyTzLW2yb2VICjkSNy2jGK8skdo4UQZt8mn+T4JEDXD3ksciHUPRM4VouTif2xLRwKyQcgjqPffRt+NkPqOxFDWCgQCoQCoUAoEApMVYC2Cn9orwrPwrswBKPvtCvsUdCsCwfCvZBsmituhcERrnCG+7cl37cRUzJZUnK4mkYxgkOKbwJOZLV1BZOmnfs22YrdL5Ulq1XUu/ZtunPPVhjravadrAC4w61vkz2++6Wy7/QFbrhQvjGdAq4AAAAASUVORK5CYII=")`,
              backgroundSize: '48px 48px'
            }}></div>
          </div>

          {/* Header - Frame 12 */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
            <Link to="/">
              <div 
                className="w-12 h-12 relative"
                onMouseDown={() => setIsChooseBackPressed(true)}
                onMouseUp={() => setIsChooseBackPressed(false)}
                onMouseLeave={() => setIsChooseBackPressed(false)}
                onTouchStart={() => setIsChooseBackPressed(true)}
                onTouchEnd={() => setIsChooseBackPressed(false)}
              >
                <img 
                  src={isChooseBackPressed ? backTrueSvg : backFalseSvg} 
                  alt="Back" 
                  className="w-full h-full cursor-pointer" 
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
            </Link>
            <div className="w-12 h-12">
              <img src={riceyLogoSvg} alt="Ricey Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Title - choose your rice! */}
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-3xl font-normal text-black whitespace-nowrap">choose your rice!</div>
          </div>

          {/* Rice Options Grid - Frame 3 */}
          <div className="absolute top-64 left-4 right-4">
            <div className="grid grid-cols-2 gap-2" style={{ width: '100%', height: '180px' }}>
              {riceOptions.map((option, index) => (
                <div key={option.name} className="flex items-center justify-center p-1">
                  <img 
                    src={option.svg} 
                    alt={option.name}
                    onClick={() => handleSelectRice(option)}
                    className="w-full h-full max-w-[140px] max-h-[58px] cursor-pointer hover:opacity-80 transition-opacity touch-manipulation active:scale-95"
                    style={{ imageRendering: 'crisp-edges' }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.transform = 'scale(0.95)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stage: Set Amount */}
      {stage === 'set_amount' && selectedRice && (
        <div className="relative w-full h-screen max-w-[100vw] mx-auto">
          {/* Background Pattern - Circles 48px */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAe1JREFUaAXtmaFOxEAQhg9QCAQYQJOQ4PEnQfAAvAASBe+A4gwvwROARoMkIZCgcJCABAf/17SEkmmvTefolswkf8XudPvP39vtzNxoZNupho/tqV5Gj/TUifXkeWtQY1vCY8VcH8NwgVMj25TXi7DSyPtvnJZzTnCrtUXNEu1+rVc/k3D6FOBoGtHhcG7OpjEINwQuvQk2x6XAzyZF5UWrZHCEK5wnc7qww4nqSngThmDsibGwMQSywTEUCAVCgVAgFPi/CpBKzMJIxX9+6otU5dX7YQveC2o9kq0LYU34EJaEHeFEeBJuhWSNdJeUvJTu5mwZ400km66jPAQrC458jgDxTcoal3xizZtwK1mrivq26rBhb4SHBjficy1wT2fzCoDC4q4FG3xdihGvAFpw93X1CoDN27hvk/tyTzLW2yb2VICjkSNy2jGK8skdo4UQZt8mn+T4JEDXD3ksciHUPRM4VouTif2xLRwKyQcgjqPffRt+NkPqOxFDWCgQCoQCoUAoEApMVYC2Cn9orwrPwrswBKPvtCvsUdCsCwfCvZBsmituhcERrnCG+7cl37cRUzJZUnK4mkYxgkOKbwJOZLV1BZOmnfs22YrdL5Ulq1XUu/ZtunPPVhjravadrAC4w61vkz2++6Wy7/QFbrhQvjGdAq4AAAAASUVORK5CYII=")`,
              backgroundSize: '48px 48px'
            }}></div>
          </div>

          {/* Header - Frame 12 */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
            <div
              className="w-[68px] h-[68px] relative cursor-pointer"
              onMouseDown={() => setIsBackPressed(true)}
              onMouseUp={() => setIsBackPressed(false)}
              onMouseLeave={() => setIsBackPressed(false)}
              onTouchStart={() => setIsBackPressed(true)}
              onTouchEnd={() => setIsBackPressed(false)}
              onClick={() => setStage('select_rice')}
            >
              <img 
                src={isBackPressed ? backTrueSvg : backFalseSvg} 
                alt="Back" 
                className="w-full h-full" 
              />
            </div>
            <div className="w-[68px] h-[68px]">
              <img src={riceyLogoSvg} alt="Ricey Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Main Content - Frame 6 */}
          <div className="absolute top-32 left-4 right-4">
            <div className="flex flex-col space-y-6">
              {/* Rice Details - Frame 4 */}
              <div className="w-[205px] h-[84px] flex flex-col space-y-1 mx-auto">
                <div className="text-5xl font-normal text-black text-center">{selectedRice.name}</div>
                <div className="text-xl font-code text-black text-center">{selectedRice.time} minute cooking</div>
              </div>

              {/* Cups Amount - Frame 7 */}
              <div className="w-full h-[110px] flex flex-col space-y-1">
                <div className="text-xl text-black text-center">rice amount (cups)</div>
                
                {/* Amount Controls - Frame 5 */}
                <div className="w-full h-[60px] flex items-center space-x-1">
                  {/* Minus Button */}
                  <div className="w-[49px] h-[50px] relative">
                    <div 
                      className="w-full h-full cursor-pointer touch-manipulation active:scale-95 transition-transform"
                      onMouseDown={() => setIsMinusPressed(true)}
                      onMouseUp={() => setIsMinusPressed(false)}
                      onMouseLeave={() => setIsMinusPressed(false)}
                      onTouchStart={(e) => {
                        setIsMinusPressed(true);
                        e.currentTarget.style.transform = 'scale(0.95)';
                      }}
                      onTouchEnd={(e) => {
                        setIsMinusPressed(false);
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onClick={() => setCups(Math.max(0.25, cups - 0.25))}
                    >
                      <img 
                        src={isMinusPressed ? minusTrueSvg : minusFalseSvg} 
                        alt="-" 
                        className="w-full h-full" 
                        style={{ imageRendering: 'crisp-edges' }}
                      />
                    </div>
                  </div>

                  {/* Amount Display */}
                  <div className="flex-1 h-[60px] flex items-center justify-center">
                    <div className="w-[151.05px] h-[62.16px] flex items-center justify-center" style={{
                      background: `linear-gradient(rgba(252, 252, 244, 1), rgba(252, 252, 244, 1)), url(${pattern8pxSvg})`,
                      backgroundRepeat: 'repeat',
                      border: '2.7px solid black',
                      boxShadow: '-5.39px 5.39px 0px #000000'
                    }}>
                      <div className="text-2xl font-code font-normal text-black">{cups.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Plus Button */}
                  <div className="w-[49px] h-[50px] relative">
                    <div 
                      className="w-full h-full cursor-pointer touch-manipulation active:scale-95 transition-transform"
                      onMouseDown={() => setIsPlusPressed(true)}
                      onMouseUp={() => setIsPlusPressed(false)}
                      onMouseLeave={() => setIsPlusPressed(false)}
                      onTouchStart={(e) => {
                        setIsPlusPressed(true);
                        e.currentTarget.style.transform = 'scale(0.95)';
                      }}
                      onTouchEnd={(e) => {
                        setIsPlusPressed(false);
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      onClick={() => setCups(Math.min(5, cups + 0.25))}
                    >
                      <img 
                        src={isPlusPressed ? plusTrueSvg : plusFalseSvg} 
                        alt="+" 
                        className="w-full h-full" 
                        style={{ imageRendering: 'crisp-edges' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Serves Text */}
                <div className="text-lg text-black text-center">serves {Math.ceil(cups * 2)}-{Math.ceil(cups * 3)}</div>
              </div>

                             {/* Water Needed - Frame 8 */}
               <div className="w-full h-[100px] flex items-center justify-center" style={{
                 background: `linear-gradient(rgba(255, 221, 0, 0.8), rgba(255, 221, 0, 0.8)), url(${pattern8pxSvg})`,
                 backgroundRepeat: 'repeat',
                 border: '3.74px solid black',
                 boxShadow: '-4px 4px 0px #000000'
               }}>
                 <div className="w-[197px] h-[115px] flex flex-col space-y-1.5">
                   <div className="text-xl text-[#4B4B4B] text-center px-4">water needed:</div>
                   <div className="w-[197px] h-[63px] flex items-center justify-center">
                     <div className="w-[192px] h-[58px] bg-[#D2D6D8] border-2 border-black shadow-[-5px_5px_0px_#000000] flex items-center justify-center" style={{
                       backgroundImage: `url(${pattern8pxSvg})`,
                       backgroundRepeat: 'repeat'
                     }}>
                       <div className="text-lg font-code text-black">{waterCups} cups ({waterMl}ml)</div>
                     </div>
                   </div>
                 </div>
               </div>

              {/* Start Cooking Button - Sharp Button */}
              <div className="w-[163px] h-[42px] mx-auto">
                <div
                  className="w-full h-full relative cursor-pointer touch-manipulation active:scale-95 transition-transform"
                  onMouseEnter={() => setIsButtonPressed(true)}
                  onMouseLeave={() => setIsButtonPressed(false)}
                  onTouchStart={(e) => {
                    setIsButtonPressed(true);
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onTouchEnd={(e) => {
                    setIsButtonPressed(false);
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={handleStartCooking}
                >
                  <img 
                    src={isButtonPressed ? cookTrueSvg : cookFalseSvg} 
                    alt="Start Cooking" 
                    className="w-full h-full" 
                    style={{ 
                      imageRendering: 'crisp-edges',
                      transform: 'translateZ(0)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Stage: Timer */}
      {stage === 'timer' && selectedRice && (
        <div className="relative w-full h-screen max-w-[100vw] mx-auto">
          {/* Background Pattern - Circles 48px */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAe1JREFUaAXtmaFOxEAQhg9QCAQYQJOQ4PEnQfAAvAASBe+A4gwvwROARoMkIZCgcJCABAf/17SEkmmvTefolswkf8XudPvP39vtzNxoZNupho/tqV5Gj/TUifXkeWtQY1vCY8VcH8NwgVMj25TXi7DSyPtvnJZzTnCrtUXNEu1+rVc/k3D6FOBoGtHhcG7OpjEINwQuvQk2x6XAzyZF5UWrZHCEK5wnc7qww4nqSngThmDsibGwMQSywTEUCAVCgVAgFPi/CpBKzMJIxX9+6otU5dX7YQveC2o9kq0LYU34EJaEHeFEeBJuhWSNdJeUvJTu5mwZ400km66jPAQrC458jgDxTcoal3xizZtwK1mrivq26rBhb4SHBjficy1wT2fzCoDC4q4FG3xdihGvAFpw93X1CoDN27hvk/tyTzLW2yb2VICjkSNy2jGK8skdo4UQZt8mn+T4JEDXD3ksciHUPRM4VouTif2xLRwKyQcgjqPffRt+NkPqOxFDWCgQCoQCoUAoEApMVYC2Cn9orwrPwrswBKPvtCvsUdCsCwfCvZBsmituhcERrnCG+7cl37cRUzJZUnK4mkYxgkOKbwJOZLV1BZOmnfs22YrdL5Ulq1XUu/ZtunPPVhjravadrAC4w61vkz2++6Wy7/QFbrhQvjGdAq4AAAAASUVORK5CYII=")`,
              backgroundSize: '48px 48px'
            }}></div>
          </div>

          {/* Header - Frame 12 */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
            <div
              className="w-[68px] h-[68px] relative cursor-pointer"
              onMouseDown={() => setIsBackPressed(true)}
              onMouseUp={() => setIsBackPressed(false)}
              onMouseLeave={() => setIsBackPressed(false)}
              onTouchStart={() => setIsBackPressed(true)}
              onTouchEnd={() => setIsBackPressed(false)}
              onClick={() => setStage('set_amount')}
            >
              <img 
                src={isBackPressed ? backTrueSvg : backFalseSvg} 
                alt="Back" 
                className="w-full h-full" 
              />
            </div>
            <div className="w-[68px] h-[68px]">
              <img src={riceyLogoSvg} alt="Ricey Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Main Content - Frame 11 */}
          <div className="absolute top-32 left-4 right-4">
            <div className="flex flex-col space-y-8">
              {/* Title - Frame 4 */}
              <div className="w-[267px] h-[96px] flex flex-col space-y-1 mx-auto">
                <div className="text-4xl font-normal text-black text-center">we're cooking some rice</div>
              </div>

                              {/* Timer and Controls - Frame 9 */}
                <div className="w-full max-w-[224px] h-[180px] flex flex-col space-y-4 mx-auto">
                  {/* Timer Display */}
                  <div className="w-[224px] h-[103px] flex items-center justify-center animate-bounce relative overflow-hidden" style={{
                    animation: 'bounce 2s infinite'
                  }}>
                    <div className="w-[209px] h-[96px] bg-[#FD0] border-[3.7px] border-black shadow-[-7.5px_7.5px_0px_#000000] flex items-center justify-center relative overflow-hidden">
                      {/* Rice Progress Fill */}
                      <div 
                        className="absolute bottom-0 left-0 bg-[#F5DEB3] transition-all duration-300 ease-out"
                        style={{
                          width: '100%',
                          height: `${riceProgress * 100}%`,
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 4px,
                            rgba(139, 69, 19, 0.1) 4px,
                            rgba(139, 69, 19, 0.1) 8px
                          )`
                        }}
                      />
                      
                      {/* Rice Texture Overlay */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.3) 1px, transparent 1px),
                                          radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.3) 1px, transparent 1px)`,
                          backgroundSize: '8px 8px, 12px 12px'
                        }}
                      />
                      
                      <div className="text-3xl font-code font-normal text-black relative z-10">{formatTime(timeRemaining)}</div>
                    </div>
                  </div>

                {/* Play/Pause Controls */}
                <div className="w-full max-w-[224px] h-[70px] flex justify-between items-center">
                  {/* Pause Button */}
                  <div className="w-[70px] h-[70px] flex flex-col items-center space-y-1">
                    <div 
                      className="w-[70px] h-[70px] cursor-pointer touch-manipulation active:scale-95 transition-transform"
                      onClick={() => setIsRunning(false)}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <img 
                        src={pauseFalseSvg} 
                        alt="Pause" 
                        className="w-full h-full" 
                      />
                    </div>
                    <div className="text-base text-black text-center w-full">pause</div>
                  </div>

                  {/* Play Button */}
                  <div className="w-[70px] h-[70px] flex flex-col items-center space-y-1">
                    <div 
                      className="w-[70px] h-[70px] cursor-pointer touch-manipulation active:scale-95 transition-transform"
                      onClick={() => setIsRunning(true)}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <img 
                        src={playFalseSvg} 
                        alt="Play" 
                        className="w-full h-full" 
                      />
                    </div>
                    <div className="text-base text-black text-center w-full">play</div>
                  </div>
                </div>
              </div>

              {/* Tip Section - Frame 10 */}
              <div className="w-[293px] flex flex-col space-y-6">
                {/* Tip Button */}
                <div className="w-[141px] h-[50px] mx-auto">
                  <img 
                    src={tipSvg} 
                    alt="Tip" 
                    className="w-full h-full cursor-pointer touch-manipulation active:scale-95 transition-transform" 
                    onClick={() => setCurrentTip((prev) => (prev + 1) % cookingTips.length)}
                    onTouchStart={(e) => {
                      e.currentTarget.style.transform = 'scale(0.95)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>

                {/* Tip Content */}
                <div className="w-[293px] bg-[#F5F5F5] border-2 border-black p-4">
                  <div className="text-sm text-black text-center leading-relaxed">
                    {cookingTips[currentTip]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
