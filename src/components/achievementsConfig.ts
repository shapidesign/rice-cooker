export interface Achievement {
  name: string;
  desc: string;
  icon: string;
  mascot?: string;
}

export const achievements: Record<string, Achievement> = {
  first_cook: { 
    name: "First Cook!", 
    icon: "🍚", 
    desc: "Complete your first cooking session.", 
    mascot: "^_^" 
  },
  five_sessions: { 
    name: "Novice Chef", 
    icon: "🧑‍🍳", 
    desc: "Complete 5 cooking sessions.", 
    mascot: "(-‿-)" 
  },
  ten_sessions: { 
    name: "Rice Connoisseur", 
    icon: "😎", 
    desc: "Complete 10 cooking sessions.", 
    mascot: "⌐■_■" 
  },
  variety_master: { 
    name: "Variety Master", 
    icon: "✨", 
    desc: "Cook 3 different types of rice.", 
    mascot: "(✨.✨)" 
  },
  perfectionist: { 
    name: "Perfectionist", 
    icon: "💯", 
    desc: "Complete 20 cooking sessions.", 
    mascot: "【•】_【•】" 
  },
};
