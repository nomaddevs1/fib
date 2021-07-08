import axios from "axios";
import { FETCH_VALUES, FECTH_INDEXES } from "./types";

export const fetchValues = () => async (dispatch) => {
  const values = await axios.get("/api/values/current");
  dispatch({ type: FETCH_VALUES, payload: values.data });
};
export const fetchValue = (index) => async (dispatch) => {
  const values = await axios.post("/api/values", { index });
  dispatch({ type: FETCH_VALUES, payload: values.data });
};

export const fetchIndex = () => async (dispatch) => {
  const seenIndex = await axios.get("/api/values/all");
  dispatch({ type: FECTH_INDEXES, payload: seenIndex.data });
};
