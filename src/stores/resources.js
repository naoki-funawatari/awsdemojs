import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    updateResources: (state, action) => action.payload,
  },
});

export default slice.reducer;

export const {
  updateResources
} = slice.actions;

export const updateResourcesAsync = () => {
  return async (dispatch, getState) => {
    const resources = await new Promise(resolve => {
      setTimeout(() => {
        resolve(initialResources)
      }, 1000)
    });

    dispatch(updateResources(resources));
  }
}

const initialResources = [
  { resourceId: 1, resourceTitle: '自分の予定' },
  { resourceId: 2, resourceTitle: '会議室１' },
  { resourceId: 3, resourceTitle: '会議室２' },
  { resourceId: 4, resourceTitle: '会議室３' },
  { resourceId: 5, resourceTitle: 'プロジェクター' },
  { resourceId: 6, resourceTitle: 'ノートPC' },
];
