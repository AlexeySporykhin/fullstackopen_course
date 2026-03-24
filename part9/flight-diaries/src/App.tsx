import { useState, useEffect } from "react";
import axios from "axios";
import {
  DiaryEntry,
  DiaryVisibility,
  DiaryWeather,
  NewDiaryEntry,
} from "./types";
import { createDiaryEntry, getAllDiaries } from "./services/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date: date,
      visibility: visibility as DiaryVisibility,
      weather: weather as DiaryWeather,
      comment: "",
    };
    try {
      const data = await createDiaryEntry(newDiary);
      setDiaries([...diaries, data]);
      setDate("");
      setVisibility("");
      setWeather("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('AxiosError:', error.response)
        setError(error.response?.data ?? "Error creating diary entry");
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setError("Error creating diary entry");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h2> Add new entry</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={diaryCreation} style={{ marginBottom: "20px" }}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            name="date"
            id="date"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <input
            name="visibility"
            id="visibility"
            placeholder="Visibility"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <input
            name="weather"
            id="weather"
            placeholder="Weather"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
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
