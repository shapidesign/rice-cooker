import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Guide() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const guideTopics = [
    {
      id: "basics",
      title: "RICE BASICS",
      icon: "📚",
      content: [
        "RICE TO WATER RATIOS:",
        "• SHORT GRAIN: 1:1.25",
        "• MEDIUM GRAIN: 1:1.5", 
        "• LONG GRAIN: 1:1.75",
        "• BROWN RICE: +25% WATER",
        "",
        "GENERAL RULE:",
        "75G RICE = 1 SERVING",
        "150G RICE = 2-3 SERVINGS",
        "300G RICE = FAMILY SIZE"
      ]
    },
    {
      id: "troubleshooting",
      title: "TROUBLESHOOTING",
      icon: "🔧",
      content: [
        "RICE TOO STICKY/MUSHY:",
        "• USE 10% LESS WATER",
        "• RINSE RICE MORE THOROUGHLY",
        "• REDUCE COOKING TIME",
        "",
        "RICE TOO DRY/HARD:",
        "• ADD 2-3 TBSP HOT WATER",
        "• COOK 2-3 MINUTES MORE",
        "• INCREASE WATER NEXT TIME",
        "",
        "RICE BURNT ON BOTTOM:",
        "• LOWER HEAT SETTING",
        "• USE HEAVIER POT",
        "• DON'T LIFT LID TOO EARLY"
      ]
    },
    {
      id: "types",
      title: "RICE VARIETIES",
      icon: "🌾",
      content: [
        "JASMINE RICE:",
        "• AROMATIC, SLIGHTLY STICKY",
        "• GREAT FOR ASIAN DISHES",
        "• COOK TIME: 18 MINUTES",
        "",
        "BASMATI RICE:",
        "• LONG GRAIN, FLUFFY",
        "• PERFECT FOR CURRY",
        "• COOK TIME: 15 MINUTES",
        "",
        "ARBORIO RICE:",
        "• SHORT GRAIN, CREAMY",
        "• IDEAL FOR RISOTTO",
        "• COOK TIME: 20 MINUTES",
        "",
        "WILD RICE:",
        "• NUTTY FLAVOR, CHEWY",
        "• TAKES LONGER TO COOK",
        "• COOK TIME: 45 MINUTES"
      ]
    },
    {
      id: "tips",
      title: "PRO TIPS",
      icon: "💡",
      content: [
        "BEFORE COOKING:",
        "• RINSE RICE 2-3 TIMES",
        "• SOAK BASMATI 15 MINUTES",
        "• USE HEAVY-BOTTOMED POT",
        "",
        "DURING COOKING:",
        "• NEVER LIFT THE LID",
        "• KEEP HEAT CONSISTENT",
        "• DON'T STIR THE RICE",
        "",
        "AFTER COOKING:",
        "• LET REST 5-10 MINUTES",
        "• FLUFF WITH FORK",
        "• SERVE IMMEDIATELY",
        "",
        "STORAGE:",
        "• REFRIGERATE UP TO 5 DAYS",
        "• FREEZE UP TO 6 MONTHS",
        "• REHEAT WITH DAMP PAPER TOWEL"
      ]
    }
  ];

  if (selectedTopic) {
    const topic = guideTopics.find(t => t.id === selectedTopic);
    if (!topic) return null;
    return (
      <div className="pixel-font text-pixel-dark min-h-60">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setSelectedTopic(null)}
            className="retro-button px-2 py-1 text-xs min-h-8"
          >
            ← BACK
          </button>
          <div className="text-xs font-bold text-center break-words">{topic.title}</div>
          <Link to={createPageUrl("Home")} className="retro-button px-2 py-1 text-xs min-h-8">
            HOME
          </Link>
        </div>

        {/* Topic Icon */}
        <div className="text-center mb-6">
          <div className="text-2xl mb-2">{topic.icon}</div>
          <div className="text-xs font-bold break-words">{topic.title}</div>
        </div>

        {/* Content */}
        <div className="pixel-border bg-pixel-cream p-4">
          <div className="text-xs space-y-1">
            {topic.content.map((line, index) => (
              <div 
                key={index} 
                className={`break-words hyphens-auto ${
                  line.startsWith('•') ? 'ml-2' : 
                  line.endsWith(':') ? 'font-bold mt-2' : 
                  line === '' ? 'h-2' : ''
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 space-y-3">
          <Link 
            to={createPageUrl("RiceSelection")}
            className="block retro-button py-3 text-center text-xs transition-colors min-h-12"
          >
            <div className="break-words">► START COOKING</div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pixel-font text-pixel-dark min-h-60">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to={createPageUrl("Home")} 
              className="retro-button px-2 py-1 text-xs min-h-8">
          ← BACK
        </Link>
        <div className="text-xs font-bold text-center break-words">RICE GUIDE</div>
        <div className="text-xs opacity-60">HELP</div>
      </div>

      {/* Welcome */}
      <div className="text-center mb-6">
        <div className="text-2xl mb-2">📖</div>
        <div className="text-xs font-bold mb-1 break-words">RICE COOKING GUIDE</div>
        <div className="text-xs opacity-70 break-words">LEARN THE BASICS</div>
      </div>

      {/* Topic List */}
      <div className="space-y-3 mb-6">
        {guideTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            className="w-full retro-button cursor-pointer group min-h-16 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="text-lg">{topic.icon}</div>
              <div className="text-left flex-1">
                <div className="text-xs font-bold break-words">{topic.title}</div>
                <div className="text-xs opacity-70 break-words">TAP TO LEARN MORE</div>
              </div>
              <div className="text-xs opacity-50">►</div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="pixel-border bg-pixel-cream p-4">
        <div className="text-xs font-bold mb-2 break-words">⚡ QUICK TIP:</div>
        <div className="text-xs break-words hyphens-auto">
          ALWAYS RINSE YOUR RICE UNTIL THE WATER RUNS CLEAR. THIS REMOVES EXCESS STARCH AND PREVENTS STICKY RICE!
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 text-center text-xs opacity-60 break-words">
        SELECT TOPIC TO CONTINUE
      </div>
    </div>
  );
}
