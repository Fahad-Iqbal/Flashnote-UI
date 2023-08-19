export const draftDocs = [
  { id: 1, title: 'Chemistry', content: '' },
  { id: 2, title: 'Spanish 101', content: '' },
  { id: 3, title: 'General Biology', content: '' },
  { id: 4, title: 'Psychology 101', content: '' },
  { id: 5, title: 'Anatomy', content: '' },
];

export const finishedDocs = [
  { id: 6, title: 'Calc 1', content: '' },
  { id: 7, title: 'World Geography', content: '' },
  { id: 8, title: 'Linear Algebra', content: '' },
  { id: 9, title: 'Essay project', content: '' },
  { id: 10, title: 'Final project ideas', content: '' },
  { id: 11, title: 'Physics 1', content: '' },
];

export const docs = [
  {
    id: 1,
    title: 'Biology',
    notes: [
      {
        type: 'section-heading',
        content: { heading: 'Structure and function of the cell' },
      },
      { type: 'plain', content: 'note1' },
      { type: 'plain', content: 'note2' },
      {
        type: 'basic',
        content: {
          front: 'Where is the DNA stored in eukaryotic cells?',
          back: 'It is stored inside the nucleus',
        },
      },
      {
        type: 'reversible',
        content: {
          front: 'Nucleus:',
          back: 'A double membrane organelle that stores the DNA in eukaryotic cells',
        },
      },
      {
        type: 'cloze',
        content: 'Fill in the <span>blank</span>',
      },
      {
        type: 'list',
        content: {
          front: 'How to tie a tie?',
          back: ['Step 1...', 'Step 2...', 'Step 3...'],
        },
      },
    ],
  },
];
