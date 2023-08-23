import { ArrowDownward } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import PlainNote from './PlainNote';
import { useGlobalContext } from '../context';
import Note from './Note';

const ListCardNote = ({ id, type, content, index, practice }) => {
  const [frontContent, setFrontContent] = useState(content?.front || '');
  const [backContent, setBackContent] = useState(content?.back || []);
  const [showSelectionBar, setShowSelectionBar] = useState(false);
  const {
    selectedDoc,
    moveNoteUp,
    moveNoteDown,
    updateDocument,
    handleArrowUp,
    isCaretAtEnd,
    removeNote,
    focusOnPreviousNote,
    duplicateNote,
    insertEmptyNoteOfType,
    isPracticeOpen,
  } = useGlobalContext();
  useEffect(() => {
    const frontInput = document.getElementById(id);
    frontInput.innerText = frontContent;
    if (!practice) {
      updateDocument(selectedDoc.id, id, {
        id: id,
        type: type,
        content: {
          front: frontContent,
          back: backContent,
        },
      });
    }
  }, [frontContent, backContent]);

  const handleMoveUp = (index) => {
    if (index > 0) {
      const current = backContent[index];
      const previous = backContent[index - 1];
      const newList = [...backContent];
      newList[index] = previous;
      newList[index - 1] = current;
      setBackContent(newList);
      setTimeout(() => {
        document.getElementById(`${id}${index - 1}`)?.focus();
      }, 90);
    }
  };
  const handleMoveDown = (index) => {
    if (index < backContent.length - 1) {
      const current = backContent[index];
      const next = backContent[index + 1];
      const newList = [...backContent];
      newList[index] = next;
      newList[index + 1] = current;
      setBackContent(newList);
      setTimeout(() => {
        document.getElementById(`${id}${index + 1}`)?.focus();
      }, 90);
    }
  };

  const handleUpdate = (index, noteContent) => {
    const newList = [...backContent];
    newList[index] = noteContent;
    setBackContent(newList);
  };

  const handleRemove = (index) => {
    const newList = [...backContent];
    newList.splice(index, 1);
    console.log('newList', newList);
    setBackContent(newList);

    if (index === 0) {
      document.getElementById(id)?.focus();
    }
  };

  return (
    <div className="list-note">
      <div className="list-front-container basic-note">
        <div
          id={id}
          className={
            frontContent ? 'front-of-card' : 'front-of-card empty-front'
          }
          // ref={frontInput}

          contentEditable={!(selectedDoc.finished || isPracticeOpen)}
          onKeyDown={(e) => {
            if (
              e.key === 'Backspace' &&
              !e.target.innerText.length &&
              (!backContent.length ||
                (backContent.length === 1 && !backContent[0].length))
            ) {
              removeNote(selectedDoc.id, id);
              focusOnPreviousNote(id);
            }

            if (e.key === 'Enter') {
              e.preventDefault();
              if (!e.altKey) {
                setShowSelectionBar(true);
              } else if (e.altKey && !e.shiftKey) {
                insertEmptyNoteOfType(selectedDoc.id, index + 1, type);
              } else if (e.altKey && e.shiftKey) {
                duplicateNote(selectedDoc.id, index + 1, id);
              }
            }
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              if (e.altKey) {
                moveNoteUp(selectedDoc.id, id);
              } else if (!e.altKey && !e.shiftKey) {
                handleArrowUp(id);
              }
              return;
            }
            if (e.altKey) {
              if (e.key === 'ArrowDown') {
                moveNoteDown(selectedDoc.id, id);
              }
              return;
            } else if (
              isCaretAtEnd() &&
              !e.altKey &&
              !e.shiftKey &&
              (e.key === 'ArrowDown' || e.key === 'ArrowRight')
            ) {
              document.getElementById(`${id}0`)?.focus();
              return;
            }
            e.target.classList.remove('empty-front');
          }}
          onBlur={(e) => {
            setFrontContent(e.target.innerText);
            if (!frontContent) {
              e.target.classList.add('empty-front');
            }
            setTimeout(() => {
              setShowSelectionBar(false);
            }, 100);
          }}
          onPaste={(e) => {
            if (e.clipboardData.items[0].type !== 'text/plain') {
              e.preventDefault();
            }
            setFrontContent(`${e.target.innerText}`);
          }}
        ></div>
        <div className="icon">
          <ArrowDownward className="arrow" />
        </div>
      </div>
      <div
        id={'back' + id}
        style={{ marginTop: '0.5rem' }}
        key={backContent}
        className="list-back"
      >
        <ul>
          {!backContent.length ? (
            <li>
              <PlainNote
                id={`${id}0`}
                index={0}
                type={'list-item'}
                content=""
                handleMoveUp={handleMoveUp}
                handleMoveDown={handleMoveDown}
                handleUpdate={handleUpdate}
                parentId={id}
                handleRemove={handleRemove}
                setBackContent={setBackContent}
                backContent={backContent}
              />
            </li>
          ) : (
            backContent.map((item, index) => {
              return (
                <li key={index}>
                  <PlainNote
                    id={`${id}${index}`}
                    index={index}
                    type={'list-item'}
                    content={item}
                    handleMoveUp={handleMoveUp}
                    handleMoveDown={handleMoveDown}
                    handleUpdate={handleUpdate}
                    handleRemove={handleRemove}
                    parentId={id}
                    setBackContent={setBackContent}
                    backContent={backContent}
                  />
                </li>
              );
            })
          )}
        </ul>
      </div>
      {showSelectionBar && <Note type={'selection-bar'} index={index + 1} />}
    </div>
  );
};

export default React.memo(ListCardNote);
