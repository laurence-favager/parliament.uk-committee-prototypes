// Function to enhance client side form validation
UK_Parliament.formValidation = function () {

  if (document.querySelector('input[required]:not([type="search"])')) {

    // Grab all required input omitting the global search input
    var requiredFields = document.querySelectorAll('[required]:not([type="search"])');

    checkUserInput = function (e) {

      var
        elemValidity = this.validity,
        elemIdError = (this.getAttribute('id') + 'Error'),
        elemParent = this.parentElement,
        elemPrevSibling = this.previousElementSibling;

      // If invalid or change event listener is fired and input fails certain validity check
      if (elemValidity.valueMissing === true || elemValidity.patternMismatch === true || elemValidity.tooLong === true) {

        // Set aria attritbute on invalid input field
        this.setAttribute('aria-invalid', 'true');
        this.setAttribute('aria-describedby', elemIdError);

        // Construct inline error message
        var
          errorText = this.getAttribute('data-error'),
          errorMessage = document.createElement('p');

        errorMessage.innerHTML = errorText;
        errorMessage.classList.add('message--error');
        errorMessage.setAttribute('id', elemIdError);
        errorMessage.setAttribute('aria-live', 'polite');

        // Add error message and custom validity if it doesn't already exist
        if (!elemPrevSibling || !elemPrevSibling.classList.contains('message--error')) {
          elemParent.insertBefore(errorMessage, this);
          this.setCustomValidity(errorText);
        } else {
          return false;
        }
      }

      // If change event listener is fired and input passes individual validity checks
      else {

        // Reset custom validity message
        this.setCustomValidity('');

        // Check for aria attributes, remove them and associated inline error message
        if (this.hasAttribute('aria-invalid')) {
          this.removeAttribute('aria-invalid');
          this.removeAttribute('aria-describedby');
          elemPrevSibling.remove();
        }
      }
    };

    // Add event listeners on all required input fields
    for (var x = 0; x < requiredFields.length; x++) {
      requiredFields[x].addEventListener('invalid', checkUserInput, false);
      requiredFields[x].addEventListener('change', checkUserInput, false);
    }
  }
};

UK_Parliament.formValidation();
