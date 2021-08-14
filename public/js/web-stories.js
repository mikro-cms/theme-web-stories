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

  // call next story with set timeout
  let callNextStory = null;

  // set timestamp on story running started and paused
  let callNextStarted = null;
  let callNextPaused = null;

  /**
   * Add stories navigation.
   *
   * @return  void
   */
  function addNavigation() {
    let loadBarStories = '';

    for (var i = 0; i < totalStory; i++) {
      loadBarStories += '<div></div>';
    }

    options.loadbar.innerHTML = loadBarStories;

    const domPreviousBtn = document.createElement('div');
    const domNextBtn = document.createElement('div');
    const domPauseBtn = document.createElement('div');

    domPreviousBtn.setAttribute('class', 'Previous');
    domNextBtn.setAttribute('class', 'Next');
    domPauseBtn.setAttribute('class', 'Pause');

    options.content.insertBefore(domPreviousBtn, options.content.children[0]);
    options.content.appendChild(domNextBtn);
    options.content.appendChild(domPauseBtn);

    domPreviousBtn.addEventListener('click', previousStory);
    domNextBtn.addEventListener('click', nextStory);
    domPauseBtn.addEventListener('click', toggleLoopStory);
  }


  /**
   * Change to previous story.
   *
   * @return  void
   */
  function previousStory() {
    clearLoopStory();

    const isFirstStory = currentStory === 0;

    if (!isFirstStory) {
      const previousStory = currentStory - 1;

      changeStory(previousStory);
    } else {
      pauseStory(currentStory);
    }
  }

  /**
   * Change to next story.
   *
   * @return  void
   */
  function nextStory() {
    clearLoopStory();

    const isLastStory = currentStory === (totalStory - 1);

    if (!isLastStory) {
      const nextStory = currentStory + 1;

      changeStory(nextStory);
    } else {
      pauseStory(currentStory);
      passedStory(currentStory);
    }
  }

  /**
   * Change current story.
   *
   * @param   number
   * @return  void
   */
  function changeStory(position) {
    // add 1 because we have non story element at first content (previous btn)
    let currentIndex = currentStory + 1;
    let changedIndex = position + 1;

    options.loadbar.children[currentStory].classList.remove('active');
    options.content.children[currentIndex].classList.add('hide');
    options.loadbar.children[position].classList.add('active');
    options.content.children[changedIndex].classList.remove('hide');

    if (currentStory < position) {
      passedStory(currentStory);
    } else {
      unpassedStory(currentStory);
    }

    currentStory = position;

    if (currentStory < totalStory) {
      loopStory();
    }
  }

  /**
   * Passed story.
   *
   * @param   number
   * @return  void
   */
  function passedStory(position) {
    options.loadbar.children[position].classList.remove('pause');
    options.loadbar.children[position].classList.remove('active');
    options.loadbar.children[position].classList.add('passed');
  }

  /**
   * Unpassed story.
   *
   * @param   number
   * @return  void
   */
  function unpassedStory(position) {
    options.loadbar.children[position].classList.remove('pause');
    options.loadbar.children[position].classList.remove('passed');
  }

  /**
   * Loop story.
   *
   * @param   number
   * @return  void
   */
  function loopStory(timingElapsed = 0) {
    callNextStarted = Date.now();
    callNextStory = window.setTimeout(function () {
      nextStory();
    }, (timing - timingElapsed));
  }

  /**
   * Clear loop story to cancel executed.
   *
   * @return  void
   */
  function clearLoopStory() {
    if (callNextStory !== null) {
      window.clearTimeout(callNextStory);

      callNextStarted = null;
      callNextStory = null;
    }
  }

  /**
   * Pause story.
   *
   * @return  void
   */
  function pauseStory() {
    callNextPaused = Date.now();

    window.clearTimeout(callNextStory);

    callNextStory = null;

    options.loadbar.children[currentStory].classList.add('pause');
  }

  /**
   * Start current paused story.
   *
   * @return  void
   */
  function startStory() {
    timingElapsed = callNextPaused - callNextStarted;

    options.loadbar.children[currentStory].classList.remove('pause');
    loopStory(timingElapsed);
  }

  /**
   * Toggle loop story.
   *
   * @return  void
   */
  function toggleLoopStory() {
    if (callNextStory === null) {
      startStory();
    } else {
      pauseStory();
    }
  }

  /**
   * Run stories.
   *
   * @return  void
   */
  function runStories() {
    addNavigation();

    // show first story and continue to next story
    changeStory(currentStory);

    // pause story on space pressed
    window.addEventListener('keyup', function (e) {
      if (e.code === 'Space') {
        toggleLoopStory();
      }
    })
  }

  // run story line
  runStories();
}
