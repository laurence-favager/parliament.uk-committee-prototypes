// Function to show/hide content when checkbox clicked
(function () {
  if (document.getElementById('toggleContent')) {
    var checkbox = document.getElementById('toggleContent');
    var container = document.getElementById('contentPane');
    var fnshow = function () {
      if (checkbox.checked) {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    };

    checkbox.onclick = fnshow;

    fnshow.apply(checkbox);
  }
}());

// Function to show/hide content for representative details
if (document.getElementById('repDetails')) {
  var selectRep = document.getElementById('repDetails');
  var checkRep = document.getElementById('ext-rep');
  var checkInd = document.getElementById('ind-only');
  var fnRepShow = function () {
    selectRep.style.display = 'block';
  };

  var fnRepHide = function () {
    selectRep.style.display = 'none';
  };

  checkRep.onclick = fnRepShow;
  checkInd.onclick = fnRepHide;

  fnRepShow.apply(checkRep);
  fnRepHide.apply(checkInd);
}

// Function to show/hide content for country selection (Individual)
if (document.getElementById('countrySelect')) {
  var indCntSl = document.getElementById('countrySelect');
  var indCntUk = document.getElementById('country-uk');
  var indCntRw = document.getElementById('country-row');
  var indPcd = document.getElementById('postCodeInd');

  indCntSl.style.display = 'none';
  indPcd.style.display = 'block';

  indCntUk.addEventListener('click', function () {
    indCntSl.style.display = 'none';
    indPcd.style.display = 'block';
  });

  indCntRw.addEventListener('click', function () {
    indCntSl.style.display = 'block';
    indPcd.style.display = 'none';
  });
}

// Function to show/hide content for country selection (Representative)
if (document.getElementById('countrySelectRep')) {
  var repCntSl = document.getElementById('countrySelectRep');
  var repCntUk = document.getElementById('country-uk-rep');
  var repCntRw = document.getElementById('country-row-rep');
  var repPcd = document.getElementById('postCodeRep');

  repCntSl.style.display = 'none';
  repPcd.style.display = 'block';

  repCntUk.addEventListener('click', function () {
    repCntSl.style.display = 'none';
    repPcd.style.display = 'block';
  });

  repCntRw.addEventListener('click', function () {
    repCntSl.style.display = 'block';
    repPcd.style.display = 'none';
  });
}

// Function to enable submission buttons when radio checked
if (document.getElementById('petition-check-button')) {
  var radioYes = document.getElementById('petition-check-yes');
  var radioNo = document.getElementById('petition-check-no');
  var button = document.getElementById('petition-check-button');
  var message = document.getElementById('petitionCheckStatus');

  button.disabled = true;
  button.className = 'btn--disabled';
  button.style.cursor = 'not-allowed';
  message.style.display = 'block';

  radioYes.addEventListener('click', function () {
    button.disabled = false;
    button.className = 'btn--primary';
    button.style.cursor = 'pointer';
    message.style.display = 'none';
  });

  radioNo.addEventListener('click', function () {
    button.disabled = true;
    button.className = 'btn--disabled';
    button.style.cursor = 'not-allowed';
    message.style.display = 'block';
  });

}

// Function to enable submission buttons when checkbox clicked
(function () {
  if (document.getElementById('enableSubmit')) {
    var checkbox = document.getElementById('enableSubmit');
    var button = document.getElementById('buttonSubmit');
    var fnsubmit = function () {
      if (checkbox.checked) {
        button.disabled = false;
        button.className = 'btn--primary';
        button.style.cursor = 'pointer';
      } else {
        button.disabled = true;
        button.className = 'btn--disabled';
        button.style.cursor = 'not-allowed';
      }
    };

    checkbox.onclick = fnsubmit;

    fnsubmit.apply(checkbox);
  }
}());

// Function to listen for checked radio buttons and change form action
if (document.getElementById('submitterType')) {

  var radios = document.querySelectorAll('input[type=radio]');

  for (var i = 0; i < radios.length; i++) {
    radios[i].onclick = function () {
      var route = getCheckedRadioIndex(radios);
      document.getElementById('submitterType').action = route;
    };
  }
}

function getCheckedRadioIndex(radios) {
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      var r = radios[i].dataset.route;
      return r;
    }
  }
}

// Functions to add additional inputs to form
if (document.getElementById('org-new')) {

  var j = 1;

  // Functionality to add/remove organisation name inputs
  document.getElementById('org-new').addEventListener('click', function (event) {
    event.preventDefault();
    if (j <= 5) {
      var is = document.createElement('span');
      var il = document.createElement('label');
      var it = document.createElement('input');
      it.setAttribute('type', 'text');
      var ir = document.createElement('a');
      ir.setAttribute('class', 'link--remove');
      ir.innerHTML = 'remove';
      increment();
      il.setAttribute('for', 'txtOrgName_' + j);
      il.innerHTML = 'Organisation name ' + j;
      it.setAttribute('id', 'txtOrgName_' + j);
      is.appendChild(il);
      is.appendChild(it);
      ir.setAttribute('onclick', "removeElement('multiOrgs','id_" + j + "')");
      is.appendChild(ir);
      is.setAttribute('id', 'id_' + j);
      document.getElementById('org-new').insertAdjacentElement('beforebegin', is);
    } else {
      alert('You can\'t add more than six organisation names to this form.\n\n If there are more organisations on the petition make sure they\'re included in your petition template.');
      return false;
    }
  });
}

// Function to do standard incrementation
function increment() {
  j += 1;
}

// Function to do standard incrementation
function decrement() {
  j -= 1;
}

// Function to remove fom elements dynamically
function removeElement(parentDiv, childDiv) {
  var child = document.getElementById(childDiv);
  var parent = document.getElementById(parentDiv);
  parent.removeChild(child);
  decrement();
}

// Function to show file name and file upload status messages
(function () {
  if (document.getElementById('file-upload')) {
    document.getElementById('file-upload').onchange = function () {
      var fullFile = this.value;
      var nameFile = fullFile.split(/(\\|\/)/g).pop();
      document.getElementById('file-uploaded-txt').innerHTML = nameFile;
      document.getElementById('file-uploaded').innerHTML = '&#x2713; Success';
      document.getElementById('file-uploaded').className = 'file--uploaded-success';
    };
  }
}());


// Show file name, file upload status and check file size

UK_Parliament.fileUploader = function () {

  if (document.getElementById('fileUpload')) {
    // Local variables
    var
      fileInput = document.getElementById('fileUpload'),
      fileStatusText = document.getElementById('fileUploadStatusText'),
      fileStatusIcon = document.getElementById('fileUploadStatusIcon'),
      fileUploadButton = document.getElementById('file-upload-check');

    // Set submit button state
    fileUploadButton.disabled = true;
    fileUploadButton.className = 'btn--disabled';

    fileInput.onchange = function () {

      // Grab file object reference, determine size and construct filename
      var
        fileObject = this.files,
        fileObjectSize = fileObject[0].size,
        fileNameSplit = this.value.split(/(\\|\/)/g).pop(),
        fileNameSplitFormatted = '<b>\'' + fileNameSplit + '\'</b>';

      // Remove error attributes and classes
      if (fileStatusText.hasAttribute('aria-live')) {
        fileStatusText.removeAttribute('aria-live', 'assertive');
        fileStatusText.classList.remove('message--error');
      }

      // Check if file exceeds size limit (currently set to 2Mb)
      if (fileObjectSize > 2097152) {
        fileStatusText.setAttribute('aria-live', 'assertive');
        fileStatusText.innerHTML = 'The file you have uploaded is too big. Please make sure it is smaller than 2MB.';
        fileStatusText.classList.add('message--error');
        fileStatusIcon.classList = '';
        fileStatusIcon.classList.add('file--upload__status--error');
        fileUploadButton.disabled = true;
        fileUploadButton.className = 'btn--disabled';

      // Check if linked file object is present
      } else if (fileObject) {
        fileStatusText.innerHTML = fileNameSplitFormatted + ' is ready to be uploaded';
        fileStatusIcon.classList = '';
        fileStatusIcon.classList.add('file--upload__status--success');
        fileUploadButton.disabled = false;
        fileUploadButton.className = 'btn--primary';

      // Return text to default state if no linked file object exists
      } else {
        fileStatusText.innerHTML = 'No file(s) selected';
        fileStatusIcon.classList = '';
        fileStatusIcon.classList.add('file--upload__status--standard');
        fileUploadButton.disabled = true;
        fileUploadButton.className = 'btn--disabled';
      }
    };
  }
};

UK_Parliament.fileUploader();
