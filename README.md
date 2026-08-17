# Midnight Letter — Rebuilt v19

This version is deliberately rebuilt as a single-page application.

- One `index.html` contains all five chapters.
- Next/Back/menu navigation swaps sections without loading another HTML document.
- The single audio element is never destroyed during navigation, so music keeps playing.
- Each chapter is statically present in the HTML; JavaScript cannot make a chapter blank.
- Navigation always resets the scroll position to the top.
- Password: `Varun123`
- Music cover: `assets/images/music-cover.webp`
- Audio: `assets/audio/song.mp3`

Deploy the folder containing `index.html` as the Netlify publish directory.


## v21 alignment pass
- Menu circle moved to the same top row as the S brand mark.
- Removed the duplicate in-page chapter counter; only the upper counter remains.
- Right-side emoji note rail reduced to 32–34px and kept in a dedicated fixed lane.
- Chapter reading content centered consistently on mobile and desktop.
- Final page remains wired to the dedicated thank-you screen.
