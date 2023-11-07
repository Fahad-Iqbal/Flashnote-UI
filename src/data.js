import { nanoid } from 'nanoid';

export const docs = {
  0: {
    id: 0,
    finished: true,
    title: 'Welcome to Flashnote!',
    notes: [
      {
        id: 'VX3zIjWu0hn_AgPUzaIlJ',
        type: 'section-heading',
        content: 'How to use Flashnote:',
      },
      {
        id: 'g39pOkNEFfftB2nBa4wy2',
        type: 'cloze',
        content:
          'First create a document by clicking the create button. Enter a document title and click the button.',
        flashcardDisabled: false,
      },
      {
        id: 'RzEPpf0vsh2k-L7Ya6Rbq',
        type: 'cloze',
        content:
          'Then, start inserting different cards and fill them with information that you need to retain.&nbsp;',
        flashcardDisabled: false,
      },
      {
        id: 'xxkB08tcrTepoqNbjJX8u',
        type: 'cloze',
        content:
          "Then, start reviewing the flashcards by clicking the 'Practice Flashcards' button.&nbsp;",
        flashcardDisabled: false,
      },
      {
        id: '6zLVmFq4DerPuhyWEoaT7',
        type: 'section-heading',
        content: 'How to insert cards:',
      },
      {
        id: '7WTldyfQuF6P9bvxS53dc',
        type: 'cloze',
        content:
          'A card can be inserted by clicking a button on the card selection bar at the bottom of the document.',
        flashcardDisabled: false,
      },
      {
        id: 'r27yaDKR6wMhiFlCSnu9A',
        flashcardDisabled: false,
        type: 'cloze',
        content:
          "You can also create on by pressing 'Enter', while typing in any note.",
      },
      {
        id: 'Ld41IZP5kzA0wCz8FQyyB',
        type: 'section-heading',
        content: 'How to remove a card:',
      },
      {
        id: 'fv9eAO1bbJdKu_k6pp7GY',
        type: 'cloze',
        content:
          "To remove a card, hover on the circular icon on the right, and click on the 'Remove' icon.",
        flashcardDisabled: false,
      },
      {
        id: '5gAJhyZ4cKFQFFbD-RoLM',
        type: 'cloze',
        content:
          "You can also remove a card by deleting all the contents of the card and pressing the 'Backspace' key.",
        flashcardDisabled: false,
      },
      {
        id: 'nu0J4VQ7Ec087xGChZE8b',
        type: 'section-heading',
        content: 'How to move the card up and down:',
      },
      {
        id: 'wPsqShcNFsqcN79D-8O9l',
        type: 'cloze',
        content:
          "To move the card, hover on the circular icon on the right, and click on the 'Move Up' and 'Move Down' icons.",
        flashcardDisabled: false,
      },
      {
        id: 'OiYJ-1MC18WSi7Xs5zhHb',
        type: 'cloze',
        content:
          "Alternatively, while the cursor is inside a card, hold the 'Alt' key, and press the up and down keys.",
        flashcardDisabled: false,
      },
      {
        id: 'HS7eMo_d690IpYyGmfQvB',
        type: 'section-heading',
        content: 'Types of cards:',
      },
      {
        id: '1KzEQtwdr6yfP61ZkJh8c',
        type: 'cloze',
        content:
          'Some cards are more useful for certain kinds of information than others.',
        flashcardDisabled: false,
      },
      {
        id: 'GjHSEst9Ns5X0wpF0M3xg',
        type: 'section-heading',
        content: 'Section Heading:',
      },
      {
        id: 'W2yVXjqomleNa86SRsUvZ',
        type: 'cloze',
        content:
          'A section heading has no flashcards associated with it, and it is just used to organize the document.',
        flashcardDisabled: false,
      },
      {
        id: '7yh_so81xWbSTo98QTNJw',
        flashcardDisabled: false,
        type: 'cloze',
        content:
          'It also provides context, while reviewing flashcards. The section heading will be visible for all flashcards that originate from a note underneath that heading.',
      },
      {
        id: 'oPosxzKrpv5zVDZBqroFC',
        type: 'section-heading',
        content: 'Basic Card:',
      },
      {
        id: '-LzgOuZp9GJOp31oG_i7h',
        type: 'cloze',
        content: 'A basic card is good for simple question and answer format.',
        flashcardDisabled: false,
      },
      {
        id: '1k-UZHlNX70OueSzjzJsS',
        type: 'basic',
        content: {
          front: 'Question',
          back: 'Answer',
        },
        flashcardDisabled: true,
      },
      {
        id: 'DFNTCi_746zAZ3W9A2WXu',
        type: 'basic',
        content: {
          front: 'What is the capital of Canada?',
          back: 'Ottawa',
        },
        flashcardDisabled: true,
      },
      {
        id: 'DpQ9GEakvxgwzbxwPaKrM',
        type: 'section-heading',
        content: 'Reversible Card:',
      },
      {
        id: 'WCPFXaxJ4JN6KE8a6OoaH',
        type: 'cloze',
        content:
          'A reversible card is similar to a basic card, but the order in which the card is shown can be reversed.',
        flashcardDisabled: false,
      },
      {
        id: 'nFQeaDalOxN9sU8FqmkXN',
        type: 'reversible',
        content: {
          front: 'Question',
          back: 'Answer',
        },
        flashcardDisabled: true,
      },
      {
        id: 'BIJLQVTQzr4OfzRtHoOvg',
        type: 'reversible',
        content: {
          front: 'Answer',
          back: 'Question',
        },
        flashcardDisabled: true,
      },
      {
        id: 'up_QOB4yjC3DBsyaVRpdT',
        flashcardDisabled: true,
        type: 'reversible',
        content: {
          front: 'Cell',
          back: 'The smallest unit of life that can function independently',
        },
      },
      {
        id: 'fXhEnsma8TH5_Yk0-82Sv',
        type: 'section-heading',
        content: 'List Card:',
      },
      {
        id: 'M6wRT3bkqbdkG0rUacqX1',
        type: 'cloze',
        content:
          'A list card is useful when a question has a multistep answer or the answer is in the format of a list.',
        flashcardDisabled: false,
      },
      {
        id: 'lCcNzHKtItRSWC6Glorem',
        type: 'list',
        content: {
          front: 'Question',
          back: ['Step 1...', 'Step 2...', 'Step 3...'],
        },
        flashcardDisabled: true,
      },
      {
        id: 'wIO4rrlc1LbT6mIVSr-97',
        type: 'section-heading',
        content: 'Cloze Deletion Card:',
      },
      {
        id: 'BHJvTF0F40KPg50YmDTnD',
        type: 'cloze',
        content:
          "A cloze deletion card can be used to create 'Fill in the blank' style of questions.",
        flashcardDisabled: false,
      },
      {
        id: 'EMf4tPa3eZwid53Xd2VF_',
        flashcardDisabled: false,
        type: 'cloze',
        content:
          'A cloze deletion card can also be used to create plain notes with no flashcards associated with them.',
      },
      {
        id: 'PwUz-qrJ5kNVQKVmtao1I',
        flashcardDisabled: false,
        type: 'cloze',
        content:
          'Plain notes are useful for jotting down information that is good for reference, but not something that you need to remember.',
      },
      {
        id: 'juLTRmT2FYZbZxKPjs1c8',
        flashcardDisabled: false,
        type: 'cloze',
        content:
          "To create add a cloze deletion, highlight an important word and click the 'Add a cloze' button.",
      },
      {
        id: 'zq_mdRT1ZNGeb2OlaejxS',
        flashcardDisabled: true,
        type: 'cloze',
        content: 'Fill in the <span>blank</span>.',
      },
      {
        id: '2849e5z7Bnr_JgZG0EjAl',
        type: 'section-heading',
        content: 'Useful Keyboard Shortcuts:',
      },
      {
        id: 'bk0sFAZIJlcPi4L1zXOC-',
        type: 'cloze',
        content: "'Alt' + Up or Down: Move the note up and down",
        flashcardDisabled: false,
      },
      {
        id: 'W9Bj0vuWaiw2V5tZCFE-h',
        type: 'cloze',
        content: "'Alt' + 'Enter' : Insert an empty note of the same type",
        flashcardDisabled: false,
      },
      {
        id: 'iE-Tm8xFKtNEpu9BR90s4',
        type: 'cloze',
        content:
          "'Alt' + 'Shift' + 'Enter': Duplicate the contents of the note",
        flashcardDisabled: false,
      },
    ],
  },
  1: {
    id: 1,
    finished: true,
    title: 'Chemistry',
    notes: [
      {
        id: 'xx8eQcpNILUopemjA4d2c',
        type: 'section-heading',
        content: 'Basic Chemistry',
      },
      {
        id: 'n6Uodv2RxY2nQQ2V47HLy',
        type: 'basic',
        content: {
          front: 'Matter',
          back: 'Anything that has mass and takes up space',
        },
        flashcardDisabled: false,
        flashcardInfo: {
          easeFactor: 2,
          repetitions: 2,
          timeOfNextReview: 1693030246469,
        },
      },
      {
        id: 'Oa-SKgASEmHkc-hwn3cxW',
        type: 'reversible',
        content: {
          front: 'Solubility',
          back: 'The ability to dissolve in a solvent',
        },
        flashcardDisabled: false,
        flashcardInfo: {
          reverse: {
            easeFactor: 2,
            repetitions: 2,
            timeOfNextReview: 1693030251492,
          },
          easeFactor: 2,
          repetitions: 2,
          timeOfNextReview: 1693030254004,
        },
      },
      {
        id: 'eHFqzQroGX3hhhsF1xbaU',
        type: 'cloze',
        content:
          '<span></span>The mass of a substance divided by its volume is called <span>density</span>.',
        flashcardDisabled: false,
        flashcardInfo: {
          easeFactor: 2,
          repetitions: 1,
          timeOfNextReview: 1693030255196,
        },
      },
    ],
  },

  3: {
    id: 3,
    finished: false,
    title: 'General Biology',
    notes: [
      {
        id: 'RTWw_wd3ZH3gHK6WJzM3n',
        type: 'section-heading',
        content: 'Basic Cell Biology',
      },
      {
        id: 'hp5pjzVgSOq7Y8rr4YXMp',
        type: 'basic',
        content: {
          front: 'What is the nucleus? ',
          back: 'A membrane-bound compartment that contains the DNA in eukaryotic cells.',
        },
        flashcardDisabled: false,
        flashcardInfo: {
          easeFactor: 3,
          repetitions: 1,
          timeOfNextReview: 1693027010576,
        },
      },
      {
        id: '8pNblLU9VHF_SazXWRfRI',
        type: 'reversible',
        content: {
          front: 'Cell',
          back: 'The smallest unit of life that can function independently',
        },
        flashcardDisabled: false,
        flashcardInfo: {
          reverse: {
            easeFactor: 3,
            repetitions: 1,
            timeOfNextReview: 1693027017751,
          },
          easeFactor: 1,
          repetitions: 2,
          timeOfNextReview: 1693026564119,
        },
      },
      {
        id: 'qHv5QrGptyj0lkesiVXev',
        type: 'cloze',
        content:
          '<span></span>The genetic material of archaea and bacteria is located in the&nbsp;<span>nucleoid</span>.',
        flashcardDisabled: false,
        flashcardInfo: {
          easeFactor: 1,
          repetitions: 2,
          timeOfNextReview: 1693026596583,
        },
      },
      {
        id: 'WLLdY-e-UPDGpK0s9fxxW',
        type: 'section-heading',
        content: 'Cell Theory',
      },
      {
        id: '-VEhcz7w1kbvWch0VF0Ta',
        type: 'list',
        content: {
          front: 'What are the three main ideas of cell theory?',
          back: [
            '1. All organisms are composed of one or more cells',
            '2. Cells are the smallest units of life that can function independently',
            '3. A cell can only arise from the division of pre-existing cells',
          ],
        },
        flashcardDisabled: false,
      },
    ],
  },

  8: { id: 8, finished: false, title: 'Linear Algebra', notes: [] },
  9: { id: 9, finished: false, title: 'Essay project', notes: [] },
  10: { id: 10, finished: false, title: 'Final project ideas', notes: [] },
  11: {
    id: 11,
    finished: false,
    title: 'Physics 1',
    notes: [
      {
        id: 'G6qsPMamWC6yDNxj3b7oe',
        type: 'cloze',
        content:
          '<span></span><span>Net force</span> is the combination of all forces on an object',
        flashcardDisabled: false,
        flashcardInfo: {
          easeFactor: 2,
          repetitions: 1,
          timeOfNextReview: 1693030271116,
        },
      },
      {
        id: 'LWtf8VwuIS8gcSZOH28mw',
        type: 'basic',
        content: {
          front: 'Mechanical equilibrium',
          back: 'A state where no physical changes occur',
        },
        flashcardDisabled: false,
        flashcardInfo: {
          easeFactor: 2,
          repetitions: 1,
          timeOfNextReview: 1693030274332,
        },
      },
    ],
  },
};

export const baseURL = 'https://flash-mr6g6krara-nn.a.run.app';
