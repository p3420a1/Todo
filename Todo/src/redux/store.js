import {
    combineReducers,
    configureStore,
    createSlice,
    getDefaultMiddleware,
    PayloadAction
  } from "@reduxjs/toolkit";

  import uuid from 'react-native-uuid'

// import logger from "redux-logger";

const todosInitialState = [
    {
      id: uuid.v1(),
      desc: "Learn React Native",
      isComplete: true
    },
    {
      id: uuid.v1(),
      desc: "Learn Redux",
      isComplete: true
    },
    {
      id: uuid.v1(),
      desc: "Learn Redux-ToolKit",
      isComplete: false
    }
  ];

  const todosSlice = createSlice({
    name: "todos",
    initialState: todosInitialState,
    reducers: {
      create: {
        reducer: (
          state,
          {
            payload
          }
        ) => {
          state.push(payload);
        },
        prepare: ({ desc }) => ({
          payload: {
            id: uuid.v1(),
            desc,
            isComplete: false
          }
        })
      },
      edit: (state, { payload }) => {
        const index = state.findIndex(todo => todo.id === payload.id);
        if (index !== -1) {
          state[index].desc = payload.desc;
        }
      },
      toggle: (
        state,
        { payload }) => {
        const index = state.findIndex(todo => todo.id === payload.id);
        if (index !== -1) {
          state[index].isComplete = payload.isComplete;
        }
      },
      remove: (state, { payload }) => {
        const index = state.findIndex(todo => todo.id === payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      }
    }
  });

  const selectedTodoSlice = createSlice({
    name: "selectedTodo",
    initialState: null,
    reducers: {
      select: (state, { payload }) => payload.id
    }
  });
  
  const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {},
    extraReducers: {
      [todosSlice.actions.create.type]: state => state + 1,
      [todosSlice.actions.edit.type]: state => state + 1,
      [todosSlice.actions.toggle.type]: state => state + 1,
      [todosSlice.actions.remove.type]: state => state + 1
    }
  });

  export const {
    create: createTodoActionCreator,
    edit: editTodoActionCreator,
    toggle: toggleTodoActionCreator,
    remove: deleteTodoActionCreator
  } = todosSlice.actions;
  export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;
  
  const reducer = combineReducers({
    todos: todosSlice.reducer,
    selectedTodo: selectedTodoSlice.reducer,
    counter: counterSlice.reducer
  });
  
  // const middleware = [...getDefaultMiddleware(), logger];
  export default configureStore({
    reducer,
  });