import { createAction, handleActions } from 'redux-actions';
import createReactSaga, {
  createReactSagaType,
} from '../lib/createReactSaga.js';
import * as db from '../lib/api/db.js';
import { takeLatest } from 'redux-saga/effects';

const [DBGET, DBGET_SUCCESS, DBGET_FAILURE] = createReactSagaType('dbs/DBGET');
const [DBPATCH, DBPATCH_SUCCESS, DBPATCH_FAILURE] = createReactSagaType(
  'dbs/DBPATCH',
);
const [DBPOST, DBPOST_SUCCESS, DBPOST_FAILURE] = createReactSagaType(
  'dbs/DBPOST',
);

export const dbGet = createAction(DBGET);
export const dbPatch = createAction(DBPATCH, ({ channelId, videoCount }) => ({
  channelId,
  videoCount,
}));
export const dbPost = createAction(
  DBPOST,
  ({ channelId, name, categoryId }) => ({
    channelId,
    name,
    videoCount: '0',
    categoryId,
  }),
);

const dbGetSaga = createReactSaga(DBGET, db.dbGet);
const dbPatchSaga = createReactSaga(DBPATCH, db.dbPatch);
const dbPostSaga = createReactSaga(DBPOST, db.dbPost);

export function* sagaDb() {
  yield takeLatest(DBGET, dbGetSaga);
  yield takeLatest(DBPATCH, dbPatchSaga);
  yield takeLatest(DBPOST, dbPostSaga);
}

const initialState = {
  dbChannel: null,
  dbPostPatch: null,
  dbError: null,
};

const dbs = handleActions(
  {
    [DBGET_SUCCESS]: (state, action) => ({
      ...state,
      dbChannel: action.payload,
      dbError: null,
      dbPutPatch: null,
    }),
    [DBGET_FAILURE]: (state, action) => ({
      ...state,
      dbError: action.payload,
    }),
    [DBPATCH_SUCCESS]: (state, action) => ({
      ...state,
      dbPutPatch: action.payload,
      dbError: null,
    }),
    [DBPATCH_FAILURE]: (state, action) => ({
      ...state,
      dbError: action.payload,
    }),
    [DBPOST_SUCCESS]: (state, action) => ({
      ...state,
      dbPostPatch: action.payload,
      dbError: null,
    }),
    [DBPOST_FAILURE]: (state, action) => ({
      ...state,
      dbError: action.payload,
    }),
  },
  initialState,
);

export default dbs;
