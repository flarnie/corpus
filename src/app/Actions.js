// Copyright 2015-present Greg Hurrell. All rights reserved.
// Licensed under the terms of the MIT license.

'use strict';

import Dispatcher from './Dispatcher';
import keyMirror from 'react/lib/keyMirror';

function dispatch(type: string, payload?: Object): void {
  if (payload) {
    Dispatcher.dispatch({...payload, type});
  } else {
    Dispatcher.dispatch({type});
  }
}

const actionTypes = keyMirror({
  ALL_NOTES_DESELECTED: null,
  ALL_NOTES_SELECTED: null,
  ADJUST_NOTE_SELECTION_DOWN: null,
  ADJUST_NOTE_SELECTION_UP: null,
  FIRST_NOTE_SELECTED: null,
  LAST_NOTE_SELECTED: null,
  NEXT_NOTE_SELECTED: null,
  NOTES_LOADED: null,
  NOTE_DESELECTED: null,
  NOTE_RANGE_SELECTED: null,
  NOTE_RENAME_REQUESTED: null,
  NOTE_SELECTED: null,
  NOTE_TITLE_CHANGED: null,
  OMNI_BAR_FOCUS_REQUESTED: null,
  PREVIOUS_NOTE_SELECTED: null,
  SEARCH_REQUESTED: null,
});

const actionCreators = {
  adjustNoteSelectionDown() {
    dispatch(actionTypes.ADJUST_NOTE_SELECTION_DOWN);
  },

  adjustNoteSelectionUp() {
    dispatch(actionTypes.ADJUST_NOTE_SELECTION_UP);
  },

  allNotesSelected() {
    dispatch(actionTypes.ALL_NOTES_SELECTED);
  },

  allNotesDeselected() {
    dispatch(actionTypes.ALL_NOTES_DESELECTED);
  },

  firstNoteSelected() {
    dispatch(actionTypes.FIRST_NOTE_SELECTED);
  },

  omniBarFocused() {
    dispatch(actionTypes.OMNI_BAR_FOCUS_REQUESTED);
  },

  lastNoteSelected() {
    dispatch(actionTypes.LAST_NOTE_SELECTED);
  },

  nextNoteSelected() {
    dispatch(actionTypes.NEXT_NOTE_SELECTED);
  },

  noteDeselected(payload) {
    dispatch(actionTypes.NOTE_DESELECTED, payload);
  },

  noteRangeSelected(payload) {
    dispatch(actionTypes.NOTE_RANGE_SELECTED, payload);
  },

  noteSelected(payload) {
    dispatch(actionTypes.NOTE_SELECTED, payload);
  },

  notesLoaded() {
    dispatch(actionTypes.NOTES_LOADED);
  },

  previousNoteSelected() {
    dispatch(actionTypes.PREVIOUS_NOTE_SELECTED);
  },

  noteTitleChanged(payload) {
    dispatch(actionTypes.NOTE_TITLE_CHANGED, payload);
  },

  renameRequested() {
    dispatch(actionTypes.NOTE_RENAME_REQUESTED);
  },

  searchRequested(payload) {
    dispatch(actionTypes.SEARCH_REQUESTED, payload);
  },
};

const Actions = {...actionTypes, ...actionCreators};

export default Actions;
