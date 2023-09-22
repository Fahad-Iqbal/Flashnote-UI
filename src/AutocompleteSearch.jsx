import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Note, { QuestionWrapper, Wrapper } from './Notes/Note';
import { useGlobalContext } from './context';
import BasicCardNote from './Notes/BasicCardNote';
import ListCardNote from './Notes/ListCardNote';
import ClozeDeletionNote from './Notes/ClozeDeletionNote';
import PlainNote from './Notes/PlainNote';

export default function AutocompleteSearch() {
  const { allNotes, isSearchOpen, setIsSearchOpen, setSelectedDoc, state } =
    useGlobalContext();
  const showAnswer = true;
  const index = 0;
  const practice = true;
  return (
    <Autocomplete
      id="country-select-demo"
      style={{
        width: '100%',
        backgroundColor: 'var(--color-background)',
        zIndex: '10000',
        color: 'var(--note-text-color)',
      }}
      // sx={{ height: 800 }}

      options={allNotes}
      autoHighlight
      getOptionLabel={(option) => {
        if (typeof option.content === 'string') {
          return option.content.replace('<span>', '').replace('</span>', '');
        }
        if (option.content.front) {
          if (typeof option.content.back === 'string') {
            return `${option.content.front} ${option.content.back}`;
          }
          if (Array.isArray(option.content.back)) {
            return `${option.content.front} ${option.content.back.join(' ')}`;
          }
        }
      }}
      renderOption={(props, option) => {
        const { id, type, content, flashcardDisabled, documentId } = option;
        return (
          <Box>
            <div
              style={{
                width: '100%',
                marginBottom: '0.5rem',
                borderBottom: '1px solid #8f8f8f40',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
              onClick={() => {
                setIsSearchOpen(false);
                setSelectedDoc(state[documentId]);
                setTimeout(() => {
                  const noteElement = document.getElementById(id);
                  noteElement?.scrollIntoView();
                  noteElement?.classList?.add('searched-note');
                  setTimeout(() => {
                    noteElement?.classList?.remove('searched-note');
                  }, 2500);
                }, 150);
              }}
            >
              <QuestionWrapper>
                <Wrapper
                  className={
                    showAnswer || isSearchOpen ? 'answer-note' : 'question-note'
                  }
                >
                  {type === 'section-heading' && (
                    <PlainNote
                      key={id}
                      id={id}
                      type={type}
                      content={content}
                      index={index}
                      practice={[practice]}
                    />
                  )}
                  {type === 'basic' && (
                    <BasicCardNote
                      className={
                        showAnswer || isSearchOpen
                          ? 'show-answer-basic'
                          : 'show-question-basic'
                      }
                      key={id}
                      id={id}
                      type={type}
                      content={content}
                      index={index}
                      practice={practice}
                      flashcardDisabled={flashcardDisabled}
                    />
                  )}
                  {type === 'reversible' && (
                    <BasicCardNote
                      className={
                        showAnswer || isSearchOpen
                          ? 'show-answer-basic'
                          : 'show-question-basic'
                      }
                      key={id}
                      id={id}
                      type={type}
                      content={content}
                      index={index}
                      practice={practice}
                      flashcardDisabled={flashcardDisabled}
                    />
                  )}
                  {type === 'cloze' && (
                    <ClozeDeletionNote
                      className={
                        showAnswer || isSearchOpen
                          ? 'show-answer-cloze'
                          : 'show-question-cloze'
                      }
                      key={id}
                      id={id}
                      type={type}
                      content={content}
                      index={index}
                      practice={practice}
                      flashcardDisabled={flashcardDisabled}
                    />
                  )}
                  {type === 'list' && (
                    <ListCardNote
                      className={
                        showAnswer || isSearchOpen
                          ? 'show-answer-list'
                          : 'show-question-list'
                      }
                      key={id}
                      id={id}
                      type={type}
                      content={content}
                      index={index}
                      practice={practice}
                      flashcardDisabled={flashcardDisabled}
                    />
                  )}
                </Wrapper>
              </QuestionWrapper>
            </div>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan, Republic of China',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];
