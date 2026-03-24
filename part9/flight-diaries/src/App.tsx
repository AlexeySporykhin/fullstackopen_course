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
  console.log("diaries", diaries);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
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
      comment: comment,
    };
    try {
      const data = await createDiaryEntry(newDiary);
      setDiaries([...diaries, data]);
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
      setError(null);
      (event.target as HTMLFormElement).reset();
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
            type="date"
            id="date"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <label htmlFor="visibility">Visibility: </label>
          {Object.values(DiaryVisibility).map(visibility => (
            <div key={visibility}>
              <label htmlFor={visibility}>{visibility}</label>
              <input
                type="radio"
                name="visibility"
                value={visibility}
                onChange={() => setVisibility(visibility)}
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <label htmlFor="weather">Weather: </label>
          {Object.values(DiaryWeather).map(weather => (
            <div key={weather}>
              <label htmlFor={weather}>{weather}</label>
              <input
                type="radio"
                name="weather"
                value={weather}
                onChange={() => setWeather(weather)}
              />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            name="comment"
            type="text"
            placeholder="Enter your comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
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
          {diary.comment && <p>comment: {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;
