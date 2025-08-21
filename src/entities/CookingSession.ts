export interface CookingSession {
  id: string;
  rice_type: string;
  rice_amount: number;
  water_amount: number;
  cooking_time: number;
  status: 'completed' | 'active' | 'cancelled';
  created_date: string;
  completed_at?: string;
}

export class CookingSession {
  static async list(sortBy: string, limit: number): Promise<CookingSession[]> {
    // Mock implementation - replace with actual API call
    return [
      {
        id: '1',
        rice_type: 'Jasmine',
        rice_amount: 200,
        water_amount: 300,
        cooking_time: 25,
        status: 'completed',
        created_date: '2024-01-15T10:30:00Z',
        completed_at: '2024-01-15T10:55:00Z'
      },
      {
        id: '2',
        rice_type: 'Basmati',
        rice_amount: 150,
        water_amount: 225,
        cooking_time: 20,
        status: 'completed',
        created_date: '2024-01-14T18:00:00Z',
        completed_at: '2024-01-14T18:20:00Z'
      },
      {
        id: '3',
        rice_type: 'Brown',
        rice_amount: 180,
        water_amount: 360,
        cooking_time: 45,
        status: 'active',
        created_date: '2024-01-15T12:00:00Z'
      }
    ];
  }

  static async create(data: Partial<CookingSession>): Promise<CookingSession> {
    // Mock implementation - replace with actual API call
    const session: CookingSession = {
      id: Date.now().toString(),
      rice_type: data.rice_type || '',
      rice_amount: data.rice_amount || 0,
      water_amount: data.water_amount || 0,
      cooking_time: data.cooking_time || 0,
      status: data.status || 'active',
      created_date: new Date().toISOString()
    };
    
    console.log('Created cooking session:', session);
    return session;
  }
}
