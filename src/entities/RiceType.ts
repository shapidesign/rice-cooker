export interface RiceType {
  name: string;
  category: 'jasmine' | 'basmati' | 'arborio' | 'short_grain' | 'wild' | 'sticky';
  variety: 'white' | 'brown';
  water_ratio: number;
  cooking_time: number;
  instructions: string[];
}

export class RiceType {
  static async list(): Promise<RiceType[]> {
    // Mock implementation - replace with actual API call
    return [
      {
        name: "Jasmine White Rice",
        category: "jasmine",
        variety: "white",
        water_ratio: 1.5,
        cooking_time: 18,
        instructions: [
          "Rinse rice until water runs clear",
          "Add rice and water to pot",
          "Bring to boil, then reduce heat",
          "Simmer covered for 18 minutes",
          "Let rest for 5 minutes before serving"
        ]
      },
      {
        name: "Basmati White Rice",
        category: "basmati",
        variety: "white",
        water_ratio: 1.75,
        cooking_time: 15,
        instructions: [
          "Soak rice for 15 minutes",
          "Rinse rice thoroughly",
          "Add rice and water to pot",
          "Bring to boil, then reduce heat",
          "Simmer covered for 15 minutes",
          "Let rest for 5 minutes before serving"
        ]
      },
      {
        name: "Short Grain White Rice",
        category: "short_grain",
        variety: "white",
        water_ratio: 1.25,
        cooking_time: 20,
        instructions: [
          "Rinse rice until water runs clear",
          "Add rice and water to pot",
          "Bring to boil, then reduce heat",
          "Simmer covered for 20 minutes",
          "Let rest for 5 minutes before serving"
        ]
      },
      {
        name: "Arborio White Rice",
        category: "arborio",
        variety: "white",
        water_ratio: 2.0,
        cooking_time: 25,
        instructions: [
          "Rinse rice briefly",
          "Add rice and water to pot",
          "Bring to boil, then reduce heat",
          "Simmer covered for 25 minutes",
          "Let rest for 5 minutes before serving"
        ]
      },
      {
        name: "Brown Jasmine Rice",
        category: "jasmine",
        variety: "brown",
        water_ratio: 2.0,
        cooking_time: 45,
        instructions: [
          "Rinse rice until water runs clear",
          "Add rice and water to pot",
          "Bring to boil, then reduce heat",
          "Simmer covered for 45 minutes",
          "Let rest for 10 minutes before serving"
        ]
      },
      {
        name: "Wild Rice",
        category: "wild",
        variety: "brown",
        water_ratio: 2.5,
        cooking_time: 60,
        instructions: [
          "Rinse rice thoroughly",
          "Add rice and water to pot",
          "Bring to boil, then reduce heat",
          "Simmer covered for 60 minutes",
          "Let rest for 10 minutes before serving"
        ]
      }
    ];
  }
}
