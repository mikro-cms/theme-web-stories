/**
 * Web stories
 *
 * @param   object
 * @return  void
 */
function WebStories(options) {
  if (!options.loadbar instanceof Element) return;
  if (!options.content instanceof Element) return;

  // total story
  const totalStory = options.content.childElementCount;

  // view story in seconds
  let timing = options.timing || 10000;

  // current index story
  let currentStory = 0;

  /**
   * Change story.
   *
   * @param   index
   * @return  void
   */
  function changeStory(index) {
    const isCurrentExists = options.loadbar.children[index];

    if (isCurrentExists) {
      options.loadbar.children[index].classList.add('active');
      options.content.children[index].classList.remove('hide');
    }

    const isFirstIndex = index === 0;

    if (!isFirstIndex) {
      const previousIndex = index - 1;

      options.loadbar.children[previousIndex].classList.remove('active');
      options.loadbar.children[previousIndex].classList.add('passed');

      const isLastIndex = index === totalStory;

      if (!isLastIndex) {
        options.content.children[previousIndex].classList.add('hide');
      }
    }
  }

  /**
   * Loop story.
   *
   * @return  void
   */
  function loopStory() {
    window.setTimeout(function () {
      currentStory += 1;

      changeStory(currentStory)

      if (currentStory < totalStory) {
        loopStory();
      }
    }, timing);
  }

  /**
   * Run stories.
   *
   * @return  void
   */
  function runStories() {
    let loadBarStories = '';

    for (var i = 0; i < totalStory; i++) {
      loadBarStories += '<div></div>';
    }

    options.loadbar.innerHTML = loadBarStories;


    // show first story and continue to next story
    changeStory(currentStory);
    loopStory();
  }

  // run story line
  runStories();
}
