'use babel';

import EdutinClasesView from './edutin-clases-view';
import { CompositeDisposable } from 'atom';

export default {

  edutinClasesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.edutinClasesView = new EdutinClasesView(state.edutinClasesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.edutinClasesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'edutin-clases:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.edutinClasesView.destroy();
  },

  serialize() {
    return {
      edutinClasesViewState: this.edutinClasesView.serialize()
    };
  },

  toggle() {
    console.log('EdutinClases was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
