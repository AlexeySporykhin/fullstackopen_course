export enum DiaryWeather {
  SUNNY = 'sunny',
  RAINY = 'rainy',
  CLOUDY = 'cloudy',
  STORMY = 'stormy',
  WINDY = 'windy'
}

export enum DiaryVisibility {
  GREAT = 'great',
  GOOD = 'good',
  OK = 'ok',
  POOR = 'poor'
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: DiaryWeather;
  visibility: DiaryVisibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;