// dom element
var domHomeListStatus, domStatus, domStatusContent, domStatusImage, domStatusText,
    domInputStatusCustomImage, domStatusCaption, domInputStatusCaption, domBtnStatusPost;

// status placholder
var placeholder, placeholderText;


// petch configuration
var petch = new Petch({
  origin: ENV.apiUrl,
  headers: {
    'Authorization': ENV.token
  }
});

// status options
var statusOptions = {
  content: '',
  text: [
    'Arial',
    'Arial Black',
    'Tahoma',
    'Trebuchet MS',
    'Impact',
    'Times New Roman',
    'Courier',
    'Comic Sans MS'
  ],
  selectedText: 0,
  color: [
    '#075E54',
    '#128C7E',
    '#25D366',
    '#DCF8C6',
    '#34B7F1',
    '#ECE5DD'
  ],
  selectedColor: 0
};

document.addEventListener('DOMContentLoaded', function () {
  domHomeListStatus = document.getElementById('HomeListStatus');

  const domBtnHomeTypeLast = document.getElementById('BtnHomeTypeLast');
  const domBtnHomeTypeArchived = document.getElementById('BtnHomeTypeArchived');
  const domBtnHomeAddStatus = document.getElementById('BtnHomeAddStatus');

  domBtnHomeTypeLast.addEventListener('click', loadLastStatus);
  domBtnHomeTypeArchived.addEventListener('click', loadArchivedStatus);
  domBtnHomeAddStatus.addEventListener('click', toggleStatus);

  domStatus = document.getElementById('Status');
  domStatusContent = document.getElementById('StatusContent');
  domStatusImage = document.getElementById('StatusImage');
  domStatusText = document.getElementById('StatusText');
  placeholder = domStatusText.getAttribute('placeholder');
  placeholderText = `<span class="Placeholder">${placeholder}</span>`;
  domStatusCaption = document.getElementById('StatusCaption');
  domInputStatusCaption = document.getElementById('InputStatusCaption');
  domBtnStatusPost = document.getElementById('BtnStatusPost');

  const domBtnStatusClose = document.getElementById('BtnStatusClose');

  domBtnStatusClose.addEventListener('click', toggleStatus);
  domStatusText.addEventListener('keydown', toggleType);
  domStatusText.addEventListener('keyup', toggleType);
  domStatusText.addEventListener('blur', toggleType);
  domBtnStatusPost.addEventListener('click', postStatus);

  domInputStatusCustomImage = document.getElementById('InputStatusCustomImage');

  const domBtnStatusCustomText = document.getElementById('BtnStatusCustomText');
  const domBtnStatusCustomColor = document.getElementById('BtnStatusCustomColor');
  const domBtnStatusCustomImage = document.getElementById('BtnStatusCustomImage');

  domBtnStatusCustomText.addEventListener('click', customText);
  domBtnStatusCustomColor.addEventListener('click', customColor);
  domInputStatusCustomImage.addEventListener('change', customImage);

  loadLastStatus();
});

/**
 * Load available last status.
 *
 * @return  void
 */
function loadLastStatus() {
  loadListStatus(true, []);

  petch.get('status?type=lasted')
    .then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        window.alert(res.statusText);
      }
    })
    .then(function (data) {
      loadListStatus(false, data)
    });
}

/**
 * Load archived status.
 *
 * @return  void
 */
function loadArchivedStatus() {
  loadListStatus(true, []);

  petch.get('status?type=archived')
    .then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        window.alert(res.statusText);
      }
    })
    .then(function (data) {
      loadListStatus(false, data);
    });
}

/**
 * Load list status.
 *
 * @param   boolean
 * @param   mixed
 * @return  void
 */
function loadListStatus(inLoad, data) {
  if (inLoad) {
    domHomeListStatus.innerHTML = '<p class="Loading"><span class="LoadingText">Loading</span></p>';
  } else {
    domHomeListStatus.innerHTML = renderListStatus(data);
  }
}

/**
 * Render list status.
 *
 * @param   object
 * @return  string
 */
function renderListStatus(data) {
  let htmlListStatus = '';

  for (var post of data.posts) {
    htmlListStatus += '<div class="Item">\
                        <div class="Image" style="background:' + post.post_options.background + ';">\
                          ' + (post.post_options.image ? '\
                          <img src="' + ENV.publicUrl + '/upload/webstories/' + post.post_options.image + '" />\
                          ' : '\
                          <p>' + post.post_content + '</p>') + '\
                        </div>\
                        <p class="Date" style="font-style:' + post.post_options.font + ';">' + translateDate(post.created_at) + '</p>\
                       </div>';
  }

  return htmlListStatus;
}

/**
 * Translate date.
 *
 * @param   number
 * @return  string
 */
function translateDate(srcDate) {
  const currentDate = new Date();
  const today = Date.now() - currentDate.getHours() * (1000 * 60 * 60);
  const yesterday = today - (1000 * 60 * 60 * 24);

  if (srcDate >= today) {
    return 'Today ' + moment(srcDate).format('h:mm A');
  } else if (srcDate >= yesterday) {
    return 'Yesterday ' + moment(srcDate).format('h:mm A');
  } else {
    return moment(srcDate).format('MMMM DD YYYY, h:mm A');
  }
}

/**
 * Toggle status.
 *
 * @param   event
 * @return  void
 */
function toggleStatus(e) {
  domStatus.style.display = domStatus.style.display === 'none' ? 'flex' : 'none';

  toggleType({
    type: 'blur',
    target: domStatusText
  });
}

/**
 * Toggle type status
 * set and unset placeholder.
 *
 * @param   event
 * @return  void
 */
function toggleType(e) {
  if (e.type === 'keydown') {
    if (e.target.innerHTML === placeholder || e.target.innerHTML === placeholderText) {
      statusOptions.content = '';
      e.target.innerHTML = '';
    } else {
      statusOptions.content = e.target.innerHTML;
    }
  } else if (e.type === 'keyup') {
    if (e.target.innerHTML === '') {
      statusOptions.content = '';
      e.target.innerHTML = placeholderText;
    } else {
      statusOptions.content = e.target.innerHTML;
    }
  } else if (e.type === 'blur') {
    if (e.target.innerHTML === '') {
      statusOptions.content = '';
      e.target.innerHTML = placeholderText;
    }
  }

  toggleCaption('text');
}

/**
 * Toggle input caption.
 *
 * @param   string
 * @return  void
 */
function toggleCaption(type) {
  if (type === 'text') {
    domStatusText.style.display = 'inline-block';
    domStatusImage.style.display = 'none';

    if (domStatusText.innerHTML !== placeholderText && domStatusText.innerHTML !== '') {
      domInputStatusCaption.style.display = 'none';
      domBtnStatusPost.style.display = 'initial';
    } else {
      domInputStatusCaption.style.display = 'none';
      domBtnStatusPost.style.display = 'none';
    }
  } else if (type === 'image') {
    domStatusText.style.display = 'none';
    domStatusImage.style.display = 'flex';
    domInputStatusCaption.style.display = 'initial';
    domBtnStatusPost.style.display = 'initial';
  }
}

/**
 * Custom text status.
 *
 * @param   event
 * @return  void
 */
function customText(e) {
  statusOptions.selectedText += 1;

  if (statusOptions.selectedText >= statusOptions.text.length) {
    statusOptions.selectedText = 0;
  }

  domStatusText.style.fontFamily = statusOptions.text[statusOptions.selectedText];
}

/**
 * Custom color status.
 *
 * @param   event
 * @return  void
 */
function customColor(e) {
  statusOptions.selectedColor += 1;

  if (statusOptions.selectedColor >= statusOptions.color.length) {
    statusOptions.selectedColor = 0;
  }

  domStatusContent.style.background = statusOptions.color[statusOptions.selectedColor];
}

/**
 * Custom image status.
 *
 * @param   event
 * @return  void
 */
function customImage(e) {
  const selectedFile = e.target.files[0];
  const reader = new FileReader();

  reader.onload = changeStatusImage;

  reader.readAsDataURL(selectedFile);
}

/**
 * Change status image.
 *
 * @param   object
 * @return  void
 */
function changeStatusImage(readerResult) {
  domStatusImage.src = readerResult.target.result;

  toggleCaption('image');
}

/**
 * Post status.
 *
 * @param   event
 * @return  void
 */
function postStatus(e) {
  petch.uploadData('status', {
    body: {
      page_id: ENV.pageId,
      content: statusOptions.content,
      font: statusOptions.text[statusOptions.selectedText],
      image: domInputStatusCustomImage.files[0],
      background: statusOptions.color[statusOptions.selectedColor],
      caption: domInputStatusCaption.value,
    }
  })
  .then(res => {
    if (res.ok) {
      toggleStatus();
      loadLastStatus();
    } else {
      window.alert(res.status);
    }
  })
}
