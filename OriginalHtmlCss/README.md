# FlashNote
 Flashnote is a note-taking app with flashcard functionality. It makes the learning of memory intensive subjects easier. Users of the app can make notes and then test themselves on certain notes that they have turned into flash cards. If the user recalls a flashcard easily and repeatedly, then that flashcard is shown again after a longer time interval. If the user can't recall the flashcard, then it is shown again very quickly until the user begins to reliably recall that card. 
 
 The user can simply take notes or they can generate different styles of flash cards as shown in the [funtionality](https://github.com/Fahad-Iqbal/Flashnote-Fullstack-Project/edit/main/README.md#functionality) section. The user can freely share their notes with anyone or they can allow access to a select group of users. 

 The demo page can be viewed [here](https://fahad-iqbal.github.io/Flashnote-Fullstack-Project/main-page.html).

 
 
## Database Design Process
Mission statement: definition of the specific purpose of the database.
Well defined, succinct and to the point. No specific tasks.
e.g. The purpose of the Starting Up Careers database is to gather information
from companies and job seekers and to make it available to the counterpart so
that the demand of work can meet with the offer.
Ask yourself/the client: why do you need a database?

### Mission Statement
The purpose of the FlashNote database is to store user generated notes and flashcards and make them available for the user to review and practice. 

### Mission Objectives

- Create notes as bullet points
- Review, change, or delete notes
- Format notes with bolding, italicising, underlining, or highlighting
- Organize notes with section headings
- Organize notes by nesting notes
- Generate flashcards with the information from the note/bullet point that the flashcard is based on
- Store information on the time interval, after which the flashcard should be practiced again
 
 
## User Stories

> As a psychology student, I want to be able to make well organized notes, generate flashcards easily, and test myself in one app. 

> As a Spanish language learner, I want to make flashcards where on one side there is a Spanish word or phrase, and on the other side is the English translation. I want these flashcards to be reversible so if I am given an English word, I have to translate into Spanish and vice versa. 

> As a medical student, I want to make a flashcard with an anatomy diagram with the labels blocked out, and then I want to test myself on the diagram one label at a time.

> As a French language instructor, I want to create notes and flashcards that are relevant to my course, and share them with my students as a learning resource.

> As a learning enthusiast, I want to take notes and make flashcards on the subjects that I'm learning, and share them with the world.

## Figma Design

Here is the [Figma link](https://www.figma.com/file/qLDlZ9jFJyVfCwlUggwRTH/FlashNote-Project?t=dlnkvsX8MIRRQTuq-1) for the project. It has limited interactivity and the design for each device size is on a separate page.

### Changes from the original figma design

- The logo on the top of the screen was changed to a smaller size
- The arrows in the notes are different because the original arrows didn't render well on the webpage
- A dark mode button was added
- Extra flashcards were added

## Functionality

FlashNote is a note-taking and flashcard app that makes use of learning techniques such as [active recall](https://en.wikipedia.org/wiki/Testing_effect) and [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition).

Apart from simply taking notes, a user can:
- generate standard flashcards with the question on the front and the answer on the back
- generate reversible flashcards, where either the front or the back of the card can be shown as the question
- generate [cloze deletion](https://en.wikipedia.org/wiki/Cloze_test) flashcards, which contain 'fill in the blank' style questions
- generate a link for a document that can be shared with all users
- generate a flash card with multiple items as an answer. For example, an answer that can be described in steps
- generate image occulsion flashcards like the example shown below
  - ![image](https://user-images.githubusercontent.com/14140389/215241373-541afb8c-411d-4401-9749-e400723ff5e1.png)
  - ![image](https://user-images.githubusercontent.com/14140389/215241394-6bf81b9f-9dea-4fdf-ab62-ea5dcb083174.png)


An admin can:
- do everything a user can
- share a document with a select group of users



