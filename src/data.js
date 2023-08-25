import { nanoid } from 'nanoid';

export const docs = {
  0: {
    id: 0,
    finished: false,
    title: 'Biology',
    notes: [
      {
        id: nanoid(),
        flashcardDisabled: true,

        type: 'section-heading',
        content: 'Structure and function of the cell',
      },
      {
        id: nanoid(),
        flashcardDisabled: true,

        type: 'cloze',
        content: 'This is a plain note with no flashcards associated with it.',
      },
      {
        id: nanoid(),
        flashcardDisabled: true,

        type: 'cloze',
        content:
          'Plain notes are useful for jotting down information that is good for reference, but not something that you need to remember.',
      },
      {
        id: nanoid(),
        flashcardDisabled: true,

        type: 'basic',
        content: {
          front: 'Where is the DNA stored in eukaryotic cells?',
          back: 'It is stored inside the nucleus',
        },
      },
      {
        id: nanoid(),
        flashcardDisabled: false,

        type: 'reversible',
        content: {
          front: 'Nucleus:',
          back: 'A double membrane organelle that stores the DNA in eukaryotic cells',
        },

        flashcardInfo: {
          easeFactor: 4,
          repetitions: 6,
          timeOfNextReview: Date.now() - 86400000,
        },
      },
      {
        id: nanoid(),
        flashcardDisabled: false,

        type: 'cloze',
        content: 'Fill in the <span>blank</span>',

        flashcardInfo: {
          easeFactor: 4,
          repetitions: 6,
          timeOfNextReview: Date.now() + 86400000,
        },
      },
      {
        id: nanoid(),
        flashcardDisabled: false,

        type: 'list',
        content: {
          front: 'How to tie a tie?',
          back: ['Step 1...', 'Step 2...', 'Step 3...'],
        },
      },
      {
        id: nanoid(),
        flashcardDisabled: false,

        type: 'list',
        content: {
          front: 'How to tie a tie?',
          back: [],
        },
      },
    ],
  },
  1: { id: 1, finished: true, title: 'Chemistry', notes: [] },
  2: { id: 2, finished: true, title: 'Spanish 101', notes: [] },
  3: { id: 3, finished: true, title: 'General Biology', notes: [] },
  4: { id: 4, finished: true, title: 'Psychology 101', notes: [] },
  5: { id: 5, finished: true, title: 'Anatomy', notes: [] },
  6: { id: 6, finished: false, title: 'Calc 1', notes: [] },
  7: { id: 7, finished: false, title: 'World Geography', notes: [] },
  8: { id: 8, finished: false, title: 'Linear Algebra', notes: [] },
  9: { id: 9, finished: false, title: 'Essay project', notes: [] },
  10: { id: 10, finished: false, title: 'Final project ideas', notes: [] },
  11: { id: 11, finished: false, title: 'Physics 1', notes: [] },
};
