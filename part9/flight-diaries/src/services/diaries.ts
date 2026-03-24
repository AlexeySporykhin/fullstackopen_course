import axios from "axios";
import { apiBaseUrl } from "../constants";
import { DiaryEntry, NewDiaryEntry } from "../types";

export const getAllDiaries = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return data;
};

export const createDiaryEntry = async (object: NewDiaryEntry) => {  
  const { data } = await axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, object);
  return data;
};
