import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { User, UserProgress } from "../entities/all";
import { achievements } from "../components/achievementsConfig";

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const user = await User.me();
        const progressRecords = await UserProgress.filter({ user_email: user.email });
        if (progressRecords.length > 0) {
          setProgress(progressRecords[0]);
          setUnlocked(progressRecords[0].unlocked_achievements || []);
        }
      } catch (error) {
        console.log("User not logged in.");
      }
      setIsLoading(false);
    };
    fetchProgress();
  }, []);

  const allAchievementKeys = Object.keys(achievements);

  if (isLoading) {
    return (
      <div className="pixel-font text-pixel-dark text-center min-h-48">
        <div className="text-xs blink-animation">LOADING ACHIEVEMENTS...</div>
      </div>
    );
  }
  
  if (!progress && !isLoading) {
    return (
      <div className="pixel-font text-pixel-dark text-center min-h-60">
          <div className="text-2xl mb-6">🏆</div>
          <div className="text-xs mb-6 break-words">LOG IN & COOK TO UNLOCK</div>
          <Link 
            to={createPageUrl("Home")}
            className="retro-button px-4 py-3 text-xs inline-block transition-colors min-h-12"
          >
            <div className="break-words">RETURN HOME</div>
          </Link>
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
        <div className="text-xs font-bold text-center break-words">ACHIEVEMENTS</div>
        <div className="text-xs">{unlocked.length}/{allAchievementKeys.length}</div>
      </div>

      {/* Progress Summary */}
      <div className="pixel-border bg-pixel-cream p-4 mb-6">
        <div className="text-xs font-bold mb-3 break-words">📊 YOUR STATS</div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="break-words">COOKS:</div>
            <div className="font-bold">{progress?.completed_cooks || 0}</div>
          </div>
          <div>
            <div className="break-words">VARIETIES:</div>
            <div className="font-bold">{progress?.cooked_varieties?.length || 0}</div>
          </div>
        </div>
      </div>
      
      {/* Achievements List */}
      <div className="space-y-3">
        {allAchievementKeys.map(key => {
          const ach = achievements[key];
          const isUnlocked = unlocked.includes(key);
          
          return (
            <div
              key={key}
              className={`pixel-border p-4 transition-opacity ${
                isUnlocked ? 'bg-pixel-tan opacity-100' : 'bg-pixel-cream opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-lg">{isUnlocked ? ach.icon : '❓'}</div>
                <div className="flex-1">
                  <div className="text-xs font-bold break-words">
                    {isUnlocked ? ach.name : 'LOCKED'}
                  </div>
                  <div className="text-xs mt-1 break-words hyphens-auto">
                    {ach.desc}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Completion Message */}
      {unlocked.length === allAchievementKeys.length && (
        <div className="mt-6 pixel-border bg-pixel-brown text-pixel-cream p-4 text-center victory-animation">
          <div className="text-xs font-bold blink-animation break-words">
            🎉 MASTER RICE CHEF! 🎉
          </div>
          <div className="text-xs mt-2 break-words">YOU HAVE UNLOCKED ALL ACHIEVEMENTS!</div>
        </div>
      )}
    </div>
  );
}
