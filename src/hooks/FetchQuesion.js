import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";

/** redux actions */
import * as Action from "../redux/question_reducer";

/** fetch question hook to fetch api data and set value to store */
export const useFetchQestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    /** async function fetch backend data */
    (async () => {
      try {
        const [{ questions, answers }] = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/questions`,
          (data) => data
        );
        console.log({ questions, answers });

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          const shuffledQuestions = shuffleArray(questions);
          const limitedQuestions = questions.slice(0, 3); // 문제 수를 3개로 제한
          setGetData((prev) => ({ ...prev, apiData: questions }));

          /** dispatch an action */
          dispatch(
            Action.startExamAction({ question: limitedQuestions, answers })
          ); //question reducer에서 불러온 데이터 questions랑 db에서 불러온 questions이랑 맞게함
        } else {
          throw new Error("No Question Avalibale");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  // 배열을 섞는 Fisher-Yates 알고리즘
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return [getData, setGetData];
};

/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction()); /** increase trace by 1 */
  } catch (error) {
    console.log(error);
  }
};

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction()); /** decrease trace by 1 */
  } catch (error) {
    console.log(error);
  }
};
