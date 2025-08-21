export interface User {
  email: string;
  name?: string;
}

export interface UserProgress {
  user_email: string;
  completed_cooks: number;
  cooked_varieties: string[];
  unlocked_achievements: string[];
}

export class User {
  static async me(): Promise<User> {
    // Mock implementation - replace with actual API call
    return {
      email: "user@example.com",
      name: "Rice Cooker User"
    };
  }
}

export class UserProgress {
  static async filter(params: { user_email: string }): Promise<UserProgress[]> {
    // Mock implementation - replace with actual API call
    return [{
      user_email: params.user_email,
      completed_cooks: 5,
      cooked_varieties: ["jasmine", "basmati", "brown"],
      unlocked_achievements: ["first_cook", "five_sessions"]
    }];
  }
}

// Re-export other entities
export { RiceType } from './RiceType';
export { CookingSession } from './CookingSession';
