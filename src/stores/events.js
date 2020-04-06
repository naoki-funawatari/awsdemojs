import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    updateEvents: (state, action) => action.payload,
  },
});

export default slice.reducer;

export const {
  updateEvents
} = slice.actions;

export const updateEventsAsync = () => async (dispatch, getState) => {
  // const { token } = getState();
  // const res = await fetch('https://localhost:44335/Users', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  // });  
  // const events = await res.json();
  // dispatch(updateEvents(events));

  const events = await new Promise(resolve => {
    setTimeout(() => {
      resolve(initialEvents)
    }, 1000)
  });

  dispatch(updateEvents(events));
}

const initialEvents = [
  { id: 1, title: 'テスト１', allDay: false, start: new Date(2020, 3, 22, 8, 0, 0), end: new Date(2020, 3, 22, 16, 0, 0), resourceId: 4 },
  { id: 2, title: 'テスト２', allDay: false, start: new Date(2020, 3, 2, 8, 0, 0), end: new Date(2020, 3, 2, 14, 0, 0), resourceId: 1 },
  { id: 3, title: 'テスト３', allDay: false, start: new Date(2020, 3, 19, 7, 0, 0), end: new Date(2020, 3, 19, 16, 0, 0), resourceId: 1 },
  { id: 4, title: 'テスト４', allDay: false, start: new Date(2020, 3, 2, 9, 0, 0), end: new Date(2020, 3, 2, 16, 0, 0), resourceId: 4 },
  { id: 5, title: 'テスト５', allDay: false, start: new Date(2020, 3, 1, 8, 0, 0), end: new Date(2020, 3, 1, 13, 0, 0), resourceId: 3 },
  { id: 6, title: 'テスト６', allDay: false, start: new Date(2020, 3, 12, 8, 0, 0), end: new Date(2020, 3, 12, 12, 0, 0), resourceId: 2 },
  { id: 7, title: 'テスト７', allDay: false, start: new Date(2020, 3, 24, 10, 0, 0), end: new Date(2020, 3, 24, 18, 0, 0), resourceId: 1 },
  { id: 8, title: 'テスト８', allDay: false, start: new Date(2020, 3, 11, 7, 0, 0), end: new Date(2020, 3, 11, 12, 0, 0), resourceId: 3 },
  { id: 9, title: 'テスト９', allDay: false, start: new Date(2020, 3, 28, 8, 0, 0), end: new Date(2020, 3, 28, 15, 0, 0), resourceId: 4 },
  { id: 10, title: 'テスト１０', allDay: false, start: new Date(2020, 3, 8, 9, 0, 0), end: new Date(2020, 3, 8, 16, 0, 0), resourceId: 3 },
  { id: 11, title: 'テスト１１', allDay: false, start: new Date(2020, 3, 3, 10, 0, 0), end: new Date(2020, 3, 3, 20, 0, 0), resourceId: 4 },
  { id: 12, title: 'テスト１２', allDay: false, start: new Date(2020, 3, 26, 10, 0, 0), end: new Date(2020, 3, 26, 16, 0, 0), resourceId: 2 },
  { id: 13, title: 'テスト１３', allDay: false, start: new Date(2020, 3, 18, 9, 0, 0), end: new Date(2020, 3, 18, 19, 0, 0), resourceId: 3 },
  { id: 14, title: 'テスト１４', allDay: false, start: new Date(2020, 3, 2, 9, 0, 0), end: new Date(2020, 3, 2, 12, 0, 0), resourceId: 1 },
  { id: 15, title: 'テスト１５', allDay: false, start: new Date(2020, 3, 12, 10, 0, 0), end: new Date(2020, 3, 12, 15, 0, 0), resourceId: 3 },
  { id: 16, title: 'テスト１６', allDay: false, start: new Date(2020, 3, 24, 7, 0, 0), end: new Date(2020, 3, 24, 17, 0, 0), resourceId: 1 },
  { id: 17, title: 'テスト１７', allDay: false, start: new Date(2020, 3, 16, 9, 0, 0), end: new Date(2020, 3, 16, 12, 0, 0), resourceId: 4 },
  { id: 18, title: 'テスト１８', allDay: false, start: new Date(2020, 3, 27, 10, 0, 0), end: new Date(2020, 3, 27, 17, 0, 0), resourceId: 2 },
  { id: 19, title: 'テスト１９', allDay: false, start: new Date(2020, 3, 15, 7, 0, 0), end: new Date(2020, 3, 15, 14, 0, 0), resourceId: 3 },
  { id: 20, title: 'テスト２０', allDay: false, start: new Date(2020, 3, 10, 8, 0, 0), end: new Date(2020, 3, 10, 16, 0, 0), resourceId: 2 },
  { id: 21, title: 'テスト２１', allDay: false, start: new Date(2020, 3, 11, 8, 0, 0), end: new Date(2020, 3, 11, 16, 0, 0), resourceId: 3 },
  { id: 22, title: 'テスト２２', allDay: false, start: new Date(2020, 3, 21, 9, 0, 0), end: new Date(2020, 3, 21, 14, 0, 0), resourceId: 1 },
  { id: 23, title: 'テスト２３', allDay: false, start: new Date(2020, 3, 12, 9, 0, 0), end: new Date(2020, 3, 12, 18, 0, 0), resourceId: 1 },
  { id: 24, title: 'テスト２４', allDay: false, start: new Date(2020, 3, 22, 8, 0, 0), end: new Date(2020, 3, 22, 16, 0, 0), resourceId: 3 },
  { id: 25, title: 'テスト２５', allDay: false, start: new Date(2020, 3, 26, 9, 0, 0), end: new Date(2020, 3, 26, 17, 0, 0), resourceId: 4 },
  { id: 26, title: 'テスト２６', allDay: false, start: new Date(2020, 3, 31, 10, 0, 0), end: new Date(2020, 3, 31, 16, 0, 0), resourceId: 2 },
  { id: 27, title: 'テスト２７', allDay: false, start: new Date(2020, 3, 14, 10, 0, 0), end: new Date(2020, 3, 14, 17, 0, 0), resourceId: 4 },
  { id: 28, title: 'テスト２８', allDay: false, start: new Date(2020, 3, 19, 10, 0, 0), end: new Date(2020, 3, 19, 17, 0, 0), resourceId: 1 },
  { id: 29, title: 'テスト２９', allDay: false, start: new Date(2020, 3, 18, 7, 0, 0), end: new Date(2020, 3, 18, 16, 0, 0), resourceId: 4 },
  { id: 30, title: 'テスト３０', allDay: false, start: new Date(2020, 3, 7, 9, 0, 0), end: new Date(2020, 3, 7, 12, 0, 0), resourceId: 4 },
  { id: 31, title: 'テスト３１', allDay: false, start: new Date(2020, 3, 13, 7, 0, 0), end: new Date(2020, 3, 13, 10, 0, 0), resourceId: 4 },
  { id: 32, title: 'テスト３２', allDay: false, start: new Date(2020, 3, 29, 7, 0, 0), end: new Date(2020, 3, 29, 10, 0, 0), resourceId: 2 },
  { id: 33, title: 'テスト３３', allDay: false, start: new Date(2020, 3, 19, 9, 0, 0), end: new Date(2020, 3, 19, 15, 0, 0), resourceId: 3 },
  { id: 34, title: 'テスト３４', allDay: false, start: new Date(2020, 3, 17, 10, 0, 0), end: new Date(2020, 3, 17, 19, 0, 0), resourceId: 4 },
  { id: 35, title: 'テスト３５', allDay: false, start: new Date(2020, 3, 27, 10, 0, 0), end: new Date(2020, 3, 27, 20, 0, 0), resourceId: 2 },
  { id: 36, title: 'テスト３６', allDay: false, start: new Date(2020, 3, 26, 8, 0, 0), end: new Date(2020, 3, 26, 14, 0, 0), resourceId: 1 },
  { id: 37, title: 'テスト３７', allDay: false, start: new Date(2020, 3, 21, 10, 0, 0), end: new Date(2020, 3, 21, 17, 0, 0), resourceId: 1 },
  { id: 38, title: 'テスト３８', allDay: false, start: new Date(2020, 3, 5, 8, 0, 0), end: new Date(2020, 3, 5, 15, 0, 0), resourceId: 1 },
  { id: 39, title: 'テスト３９', allDay: false, start: new Date(2020, 3, 30, 8, 0, 0), end: new Date(2020, 3, 30, 12, 0, 0), resourceId: 4 },
  { id: 40, title: 'テスト４０', allDay: false, start: new Date(2020, 3, 12, 9, 0, 0), end: new Date(2020, 3, 12, 16, 0, 0), resourceId: 3 },
  { id: 41, title: 'テスト４１', allDay: false, start: new Date(2020, 3, 27, 10, 0, 0), end: new Date(2020, 3, 27, 19, 0, 0), resourceId: 1 },
  { id: 42, title: 'テスト４２', allDay: false, start: new Date(2020, 3, 25, 8, 0, 0), end: new Date(2020, 3, 25, 15, 0, 0), resourceId: 1 },
  { id: 43, title: 'テスト４３', allDay: false, start: new Date(2020, 3, 1, 10, 0, 0), end: new Date(2020, 3, 1, 19, 0, 0), resourceId: 2 },
  { id: 44, title: 'テスト４４', allDay: false, start: new Date(2020, 3, 2, 7, 0, 0), end: new Date(2020, 3, 2, 16, 0, 0), resourceId: 4 },
  { id: 45, title: 'テスト４５', allDay: false, start: new Date(2020, 3, 31, 8, 0, 0), end: new Date(2020, 3, 31, 15, 0, 0), resourceId: 3 },
  { id: 46, title: 'テスト４６', allDay: false, start: new Date(2020, 3, 8, 8, 0, 0), end: new Date(2020, 3, 8, 13, 0, 0), resourceId: 2 },
  { id: 47, title: 'テスト４７', allDay: false, start: new Date(2020, 3, 26, 10, 0, 0), end: new Date(2020, 3, 26, 13, 0, 0), resourceId: 1 },
  { id: 48, title: 'テスト４８', allDay: false, start: new Date(2020, 3, 30, 8, 0, 0), end: new Date(2020, 3, 30, 15, 0, 0), resourceId: 2 },
  { id: 49, title: 'テスト４９', allDay: false, start: new Date(2020, 3, 28, 7, 0, 0), end: new Date(2020, 3, 28, 12, 0, 0), resourceId: 4 },
  { id: 50, title: 'テスト５０', allDay: false, start: new Date(2020, 3, 22, 7, 0, 0), end: new Date(2020, 3, 22, 11, 0, 0), resourceId: 3 },
  { id: 51, title: 'テスト５１', allDay: false, start: new Date(2020, 3, 21, 9, 0, 0), end: new Date(2020, 3, 21, 13, 0, 0), resourceId: 2 },
  { id: 52, title: 'テスト５２', allDay: false, start: new Date(2020, 3, 20, 7, 0, 0), end: new Date(2020, 3, 20, 17, 0, 0), resourceId: 4 },
  { id: 53, title: 'テスト５３', allDay: false, start: new Date(2020, 3, 29, 9, 0, 0), end: new Date(2020, 3, 29, 15, 0, 0), resourceId: 2 },
  { id: 54, title: 'テスト５４', allDay: false, start: new Date(2020, 3, 8, 10, 0, 0), end: new Date(2020, 3, 8, 13, 0, 0), resourceId: 2 },
  { id: 55, title: 'テスト５５', allDay: false, start: new Date(2020, 3, 18, 10, 0, 0), end: new Date(2020, 3, 18, 15, 0, 0), resourceId: 2 },
  { id: 56, title: 'テスト５６', allDay: false, start: new Date(2020, 3, 23, 7, 0, 0), end: new Date(2020, 3, 23, 10, 0, 0), resourceId: 4 },
  { id: 57, title: 'テスト５７', allDay: false, start: new Date(2020, 3, 31, 10, 0, 0), end: new Date(2020, 3, 31, 14, 0, 0), resourceId: 2 },
  { id: 58, title: 'テスト５８', allDay: false, start: new Date(2020, 3, 28, 8, 0, 0), end: new Date(2020, 3, 28, 11, 0, 0), resourceId: 3 },
  { id: 59, title: 'テスト５９', allDay: false, start: new Date(2020, 3, 9, 7, 0, 0), end: new Date(2020, 3, 9, 14, 0, 0), resourceId: 3 },
  { id: 60, title: 'テスト６０', allDay: false, start: new Date(2020, 3, 29, 7, 0, 0), end: new Date(2020, 3, 29, 12, 0, 0), resourceId: 2 },
  { id: 61, title: 'テスト６１', allDay: false, start: new Date(2020, 3, 29, 7, 0, 0), end: new Date(2020, 3, 29, 17, 0, 0), resourceId: 1 },
  { id: 62, title: 'テスト６２', allDay: false, start: new Date(2020, 3, 26, 9, 0, 0), end: new Date(2020, 3, 26, 13, 0, 0), resourceId: 4 },
  { id: 63, title: 'テスト６３', allDay: false, start: new Date(2020, 3, 10, 7, 0, 0), end: new Date(2020, 3, 10, 14, 0, 0), resourceId: 4 },
  { id: 64, title: 'テスト６４', allDay: false, start: new Date(2020, 3, 3, 10, 0, 0), end: new Date(2020, 3, 3, 17, 0, 0), resourceId: 2 },
  { id: 65, title: 'テスト６５', allDay: false, start: new Date(2020, 3, 21, 10, 0, 0), end: new Date(2020, 3, 21, 20, 0, 0), resourceId: 1 },
  { id: 66, title: 'テスト６６', allDay: false, start: new Date(2020, 3, 22, 8, 0, 0), end: new Date(2020, 3, 22, 11, 0, 0), resourceId: 3 },
  { id: 67, title: 'テスト６７', allDay: false, start: new Date(2020, 3, 1, 9, 0, 0), end: new Date(2020, 3, 1, 12, 0, 0), resourceId: 3 },
  { id: 68, title: 'テスト６８', allDay: false, start: new Date(2020, 3, 28, 8, 0, 0), end: new Date(2020, 3, 28, 13, 0, 0), resourceId: 1 },
  { id: 69, title: 'テスト６９', allDay: false, start: new Date(2020, 3, 18, 8, 0, 0), end: new Date(2020, 3, 18, 14, 0, 0), resourceId: 4 },
  { id: 70, title: 'テスト７０', allDay: false, start: new Date(2020, 3, 25, 8, 0, 0), end: new Date(2020, 3, 25, 11, 0, 0), resourceId: 3 },
  { id: 71, title: 'テスト７１', allDay: false, start: new Date(2020, 3, 28, 10, 0, 0), end: new Date(2020, 3, 28, 16, 0, 0), resourceId: 3 },
  { id: 72, title: 'テスト７２', allDay: false, start: new Date(2020, 3, 23, 9, 0, 0), end: new Date(2020, 3, 23, 14, 0, 0), resourceId: 2 },
  { id: 73, title: 'テスト７３', allDay: false, start: new Date(2020, 3, 24, 7, 0, 0), end: new Date(2020, 3, 24, 13, 0, 0), resourceId: 4 },
  { id: 74, title: 'テスト７４', allDay: false, start: new Date(2020, 3, 20, 9, 0, 0), end: new Date(2020, 3, 20, 14, 0, 0), resourceId: 4 },
  { id: 75, title: 'テスト７５', allDay: false, start: new Date(2020, 3, 3, 10, 0, 0), end: new Date(2020, 3, 3, 16, 0, 0), resourceId: 4 },
  { id: 76, title: 'テスト７６', allDay: false, start: new Date(2020, 3, 2, 9, 0, 0), end: new Date(2020, 3, 2, 14, 0, 0), resourceId: 4 },
  { id: 77, title: 'テスト７７', allDay: false, start: new Date(2020, 3, 23, 7, 0, 0), end: new Date(2020, 3, 23, 13, 0, 0), resourceId: 3 },
  { id: 78, title: 'テスト７８', allDay: false, start: new Date(2020, 3, 26, 7, 0, 0), end: new Date(2020, 3, 26, 11, 0, 0), resourceId: 2 },
  { id: 79, title: 'テスト７９', allDay: false, start: new Date(2020, 3, 30, 7, 0, 0), end: new Date(2020, 3, 30, 13, 0, 0), resourceId: 3 },
  { id: 80, title: 'テスト８０', allDay: false, start: new Date(2020, 3, 2, 7, 0, 0), end: new Date(2020, 3, 2, 14, 0, 0), resourceId: 3 },
  { id: 81, title: 'テスト８１', allDay: false, start: new Date(2020, 3, 16, 9, 0, 0), end: new Date(2020, 3, 16, 16, 0, 0), resourceId: 4 },
  { id: 82, title: 'テスト８２', allDay: false, start: new Date(2020, 3, 2, 7, 0, 0), end: new Date(2020, 3, 2, 17, 0, 0), resourceId: 2 },
  { id: 83, title: 'テスト８３', allDay: false, start: new Date(2020, 3, 6, 10, 0, 0), end: new Date(2020, 3, 6, 17, 0, 0), resourceId: 3 },
  { id: 84, title: 'テスト８４', allDay: false, start: new Date(2020, 3, 9, 10, 0, 0), end: new Date(2020, 3, 9, 13, 0, 0), resourceId: 4 },
  { id: 85, title: 'テスト８５', allDay: false, start: new Date(2020, 3, 24, 10, 0, 0), end: new Date(2020, 3, 24, 19, 0, 0), resourceId: 1 },
  { id: 86, title: 'テスト８６', allDay: false, start: new Date(2020, 3, 3, 10, 0, 0), end: new Date(2020, 3, 3, 17, 0, 0), resourceId: 4 },
  { id: 87, title: 'テスト８７', allDay: false, start: new Date(2020, 3, 14, 7, 0, 0), end: new Date(2020, 3, 14, 17, 0, 0), resourceId: 2 },
  { id: 88, title: 'テスト８８', allDay: false, start: new Date(2020, 3, 4, 10, 0, 0), end: new Date(2020, 3, 4, 19, 0, 0), resourceId: 3 },
  { id: 89, title: 'テスト８９', allDay: false, start: new Date(2020, 3, 11, 8, 0, 0), end: new Date(2020, 3, 11, 13, 0, 0), resourceId: 2 },
  { id: 90, title: 'テスト９０', allDay: false, start: new Date(2020, 3, 24, 7, 0, 0), end: new Date(2020, 3, 24, 13, 0, 0), resourceId: 3 },
  { id: 91, title: 'テスト９１', allDay: false, start: new Date(2020, 3, 19, 8, 0, 0), end: new Date(2020, 3, 19, 11, 0, 0), resourceId: 1 },
  { id: 92, title: 'テスト９２', allDay: false, start: new Date(2020, 3, 31, 10, 0, 0), end: new Date(2020, 3, 31, 15, 0, 0), resourceId: 1 },
  { id: 93, title: 'テスト９３', allDay: false, start: new Date(2020, 3, 14, 8, 0, 0), end: new Date(2020, 3, 14, 14, 0, 0), resourceId: 3 },
  { id: 94, title: 'テスト９４', allDay: false, start: new Date(2020, 3, 4, 10, 0, 0), end: new Date(2020, 3, 4, 14, 0, 0), resourceId: 1 },
  { id: 95, title: 'テスト９５', allDay: false, start: new Date(2020, 3, 24, 7, 0, 0), end: new Date(2020, 3, 24, 10, 0, 0), resourceId: 4 },
  { id: 96, title: 'テスト９６', allDay: false, start: new Date(2020, 3, 31, 10, 0, 0), end: new Date(2020, 3, 31, 18, 0, 0), resourceId: 3 },
  { id: 97, title: 'テスト９７', allDay: false, start: new Date(2020, 3, 30, 8, 0, 0), end: new Date(2020, 3, 30, 12, 0, 0), resourceId: 4 },
  { id: 98, title: 'テスト９８', allDay: false, start: new Date(2020, 3, 14, 10, 0, 0), end: new Date(2020, 3, 14, 15, 0, 0), resourceId: 3 },
  { id: 99, title: 'テスト９９', allDay: false, start: new Date(2020, 3, 26, 7, 0, 0), end: new Date(2020, 3, 26, 13, 0, 0), resourceId: 2 },
  { id: 100, title: 'テスト１００', allDay: false, start: new Date(2020, 3, 6, 8, 0, 0), end: new Date(2020, 3, 6, 18, 0, 0), resourceId: 1 },
];
