/**
 * Copyright 2015-present Greg Hurrell. All rights reserved.
 * Licensed under the terms of the MIT license.
 *
 * @flow
 */

// babel-eslint issue: https://github.com/babel/babel-eslint/issues/108
import type {List as ImmutableList} from 'immutable'; // eslint-disable-line no-unused-vars

import Actions from '../Actions';
import NotesStore from './NotesStore';
import Store from './Store';
import stringFinder from '../util/stringFinder';

let query = null;
let notes = filter(query);

function filter(value: ?string): ImmutableList {
  const regexen = (
    value != null &&
    value.trim().split(/\s+/).map(stringFinder)
  );
  if (regexen && regexen.length) {
    const indices = [];
    return NotesStore.notes
      .filter((note, index) => {
        if ((regexen.every(regexp => (
          note.get('title').search(regexp) !== -1 ||
          note.get('text').search(regexp) !== -1
        )))) {
          indices.push(index);
          return true;
        }
        return false;
      })
      .map((note, index) => (
        // Augment note with its index within the NotesStore.
        note.set('index', indices[index])
      ))
      .toList();
  } else {
    return NotesStore.notes.map((note, index) => (
      // Augment note with its index within the NoteStore.
      note.set('index', index)
    ));
  }
}

class FilteredNotesStore extends Store {
  handleDispatch(payload) {
    switch (payload.type) {
      // TODO: may need some events here to reset query
      case Actions.NOTE_BUBBLED:
      case Actions.NOTE_CREATION_COMPLETED:
      case Actions.SELECTED_NOTES_DELETED:
        this.waitFor(NotesStore.dispatchToken);
        this._change();
        break;

      case Actions.NOTE_TITLE_CHANGED:
        // Forget the query; the note will be bumped to the top.
        this.waitFor(NotesStore.dispatchToken);
        query = null;
        this._change();
        break;

      case Actions.NOTE_TEXT_CHANGED:
        if (!payload.isAutosave) {
          // Forget the query; the note will be bumped to the top.
          this.waitFor(NotesStore.dispatchToken);
          query = null;
          this._change();
        }
        break;

      case Actions.NOTES_LOADED:
        this._change();
        break;

      case Actions.SEARCH_REQUESTED:
        query = payload.value;
        this._change();
        break;
    }
  }

  _change() {
    const previous = notes;
    notes = filter(query);
    if (notes !== previous) {
      this.emit('change', query);
    }
  }

  get notes() {
    return notes;
  }
}

export default new FilteredNotesStore();
