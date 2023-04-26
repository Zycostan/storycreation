const saveStoryBtn = document.getElementById("save-story-btn");
const form = document.getElementById("story-form");

saveStoryBtn.addEventListener("click", function() {
  const storyTitle = document.getElementById("story-title").value;
  const chapters = [];

  // Get the chapter titles and contents
  const chapterTitles = document.getElementsByName("chapter-title[]");
  const chapterContents = document.getElementsByName("chapter-content[]");

  for (let i = 0; i < chapterTitles.length; i++) {
    const title = chapterTitles[i].value;
    const content = chapterContents[i].value;
    chapters.push({title: title, content: content});
  }

  // Combine everything into a single object
  const story = {
    title: storyTitle,
    chapters: chapters
  };

  // Convert the story object to a JSON string
  const storyJson = JSON.stringify(story);

  // Create a new Blob object with the JSON string as its data
  const blob = new Blob([storyJson], {type: "application/json"});

  // Create a link element to download the file
  const downloadLink = document.createElement("a");
  downloadLink.download = `${storyTitle}.json`;
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.onclick = function() {
    setTimeout(() => {
      URL.revokeObjectURL(downloadLink.href);
    }, 500);
  }

  // Click the link to trigger the download
  downloadLink.click();
});

const addChapterBtn = document.getElementById("add-chapter-btn");
const chaptersContainer = document.getElementById("chapters");

let chapterCount = 1;

addChapterBtn.addEventListener("click", function() {
  chapterCount++;

  const chapter = document.createElement("div");
  chapter.classList.add("chapter");

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", `chapter-${chapterCount}-title`);
  titleLabel.textContent = `Chapter ${chapterCount} Title`;

  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", `chapter-${chapterCount}-title`);
  titleInput.setAttribute("name", "chapter-title[]");
  titleInput.setAttribute("required", "");

  const contentLabel = document.createElement("label");
  contentLabel.setAttribute("for", `chapter-${chapterCount}-content`);
  contentLabel.textContent = `Chapter ${chapterCount} Content`;

  const contentTextarea = document.createElement("textarea");
  contentTextarea.setAttribute("id", `chapter-${chapterCount}-content`);
  contentTextarea.setAttribute("name", "chapter-content[]");
  contentTextarea.setAttribute("required", "");

  chapter.appendChild(titleLabel);
  chapter.appendChild(titleInput);
  chapter.appendChild(contentLabel);
  chapter.appendChild(contentTextarea);

  chaptersContainer.appendChild(chapter);
});