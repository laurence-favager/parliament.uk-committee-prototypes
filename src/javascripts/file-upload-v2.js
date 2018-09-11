// Show file name, file upload status and check file size

UK_Parliament.fileUploaderV2 = function () {

  var fileInput = document.querySelector('[data-file-upload="newbutton"]');

  if (fileInput) {

    // Local variables
    var
      fileIcon = document.querySelector('[data-file-upload="upload"]'),
      fileStatus = document.querySelector('[data-file-upload="newstatus"]'),
      fileSizeLimit = fileInput.getAttribute('data-file-size') ? fileInput.getAttribute('data-file-size') : '5242880',
      fileSizeLimitFormatted = fileSizeLimit.substring(0, 2),
      fileContainer = document.getElementById('uploader-container');

    fileInput.onchange = function () {

      if (this.files.length === 0) {

        // Set default state if no linked file object exists
        fileContainer.className = 'card uploader-container normal-cv';
        fileStatus.className = 'status--highlight';
        fileStatus.innerHTML = '';
        fileIcon.setAttribute('data-file-upload', 'upload');
      } else {

        // Grab file object reference, determine size and construct filename
        var
          fileObject = this.files,
          fileObjectSize = fileObject[0].size,
          fileName = this.value.split(/(\\|\/)/g).pop(),
          fileNameFormatted = '<strong>\'' + fileName + '\'</strong>';

        // Check for aria attribute and manage addition / class removal accordingly
        fileStatus.hasAttribute('aria-live') ? fileStatus.classList.remove('theme--warning') : fileStatus.setAttribute('aria-live', 'polite');

        // Check if file exceeds size limit passed in data-file-size attribute (default set to 5MB in binary)
        if (fileObjectSize > fileSizeLimit) {
          fileContainer.className = 'card uploader-container normal-cv';
          fileStatus.className = 'status--highlight';
          fileStatus.classList.add('theme--warning');
          fileStatus.innerHTML = 'The file you have uploaded is too big. Please make sure it is smaller than ' + fileSizeLimitFormatted + 'MB.';
          fileIcon.setAttribute('data-file-upload', 'upload');

        // Check if linked file object is present
        } else if (fileObject) {
          fileContainer.className = 'card uploader-container success-cv';
          fileStatus.className = 'status--highlight';
          fileStatus.classList.add('theme--success');
          fileStatus.innerHTML = 'Your file ' + fileNameFormatted + ' is ready to be uploaded';
          fileIcon.setAttribute('data-file-upload', 'uploaded');
        }
      }
    };

    // Check if element is in focus and add class for Firefox
    fileInput.addEventListener('focus', function () {
      fileInput.classList.add('js-has-focus');
    });

    // Check if element is out of focus and remove class for Firefox
    fileInput.addEventListener('blur', function () {
      fileInput.classList.remove('js-has-focus');
    });
  }
};

UK_Parliament.fileUploaderV2();
