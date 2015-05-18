// Copyright 2015-present Greg Hurrell. All rights reserved.
// Licensed under the terms of the MIT license.

'use strict';

import React from 'react';
import ipc from 'ipc';

import Actions from './Actions';
import NoteView from './NoteView.react';
import NoteList from './NoteList.react';
import OmniBar from './OmniBar.react';
import SplitView from './SplitView.react';
import Viewport from './Viewport.react';

export default class Corpus extends React.Component {
  componentDidMount() {
    ipc.on('next', Actions.nextNoteSelected);
    ipc.on('previous', Actions.previousNoteSelected);
    ipc.on('rename', Actions.renameRequested);
    ipc.on('search', Actions.omniBarFocused);
  }

  componentWillUnmount() {
    ipc.removeAllListeners('next');
    ipc.removeAllListeners('previous');
    ipc.removeAllListeners('rename');
    ipc.removeAllListeners('search');
  }

  render() {
    return (
      <Viewport>
        <OmniBar />
        <SplitView>
          <NoteList />
          <NoteView />
        </SplitView>
      </Viewport>
    );
  }
}
