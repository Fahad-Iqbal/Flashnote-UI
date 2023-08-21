import { ArrowDownward } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import PlainNote from './PlainNote';
import { useGlobalContext } from '../context';

const ListCardNote = ({ id, type, content }) => {
  const [frontContent, setFrontContent] = useState(content?.front || '');
  const [backContent, setBackContent] = useState(content?.back || []);
  const {
    selectedDoc,
    moveNoteUp,
    moveNoteDown,
    updateDocument,
    handleArrowUp,
    isCaretAtEnd,
    removeNote,
    focusOnPreviousNote,
  } = useGlobalContext();
  useEffect(() => {
    const frontInput = document.getElementById(id);
    frontInput.innerText = frontContent;

    updateDocument(selectedDoc.id, id, {
      id: id,
      type: type,
      content: {
        front: frontContent,
        back: backContent,
      },
    });
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

          contentEditable={!selectedDoc.finished}
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
              setFrontContent(e.target.innerText);
              document.getElementById(`${id}0`)?.focus();
              return;
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
      <div id={'back' + id} style={{ marginTop: '0.5rem' }} key={backContent}>
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
    </div>
  );
};

export default React.memo(ListCardNote);
