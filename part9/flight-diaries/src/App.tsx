import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "./constants";
import { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`).then(res => {
      setDiaries(res.data);
    });
  }, []);
  return (
    <div>
      <h2> Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
        <h3>{diary.date}</h3>
        <p>visibility: {diary.visibility}</p>
        <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
