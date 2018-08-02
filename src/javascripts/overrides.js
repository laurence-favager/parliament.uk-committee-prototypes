// Polyfill to enable 'forEach' in non ES6 supported browser
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// Function to listen for checked radio buttons and change form action
UK_Parliament.radioRouting = function () {
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
};

UK_Parliament.radioRouting();

// Function to enable/disable form submit buttons using form elements
UK_Parliament.enableSubmit = function () {

  if (document.querySelector('[data-submit="disabled"]')) {

    var forms = document.querySelectorAll('form');

    // Enabled button attribute and styling
    var styleEnable = function (userButton, userButtonClass) {
      userButton.disabled = false;
      userButton.className = userButtonClass;
      userButton.setAttribute('aria-live', 'assertive');
    };

    // Disabled button attribute and styling
    var styleDisable = function (userButton) {
      userButton.disabled = true;
      userButton.className = 'btn--disabled';
      if (userButton.hasAttribute('aria-live')) userButton.removeAttribute('aria-live');
    };

    forms.forEach(function (elements, index) {

      if (elements.querySelector('[data-submit="disabled"]')) {

        // Grab form submit button and button classes
        var userButton = elements.querySelector('button[type="submit"]');
        var userButtonClass = userButton.className;

        // Disable form submit button
        styleDisable(userButton);

        // Grab all elements that has required data attributes
        var inputChecks = elements.querySelectorAll('[data-submit="disabled"]');

        inputChecks.forEach(function (element, index) {

          // Handle checkbox element
          if (element.type == 'checkbox') {
            element.addEventListener('click', function () {
              if (this.checked) {
                styleEnable(userButton, userButtonClass);
              } else {
                styleDisable(userButton);
              }
            });
          }

          // Handle radio button group
          if (element.type == 'radio') {

            // Grab name of radio group and then collection of same name
            var inputCheckName = element.name;
            var inputCheckNamesArray = document.getElementsByName(inputCheckName);

            // function to set submit button type from radio selection
            var styleSetRadio = function () {
              if (this.dataset.submit == 'disabled' && this.checked) {
                styleDisable(userButton);
              } else {
                styleEnable(userButton, userButtonClass);
              }
            };

            // Loop radio group and grab clicked radio button
            for (var x = 0; x < inputCheckNamesArray.length; x++) {
              inputCheckNamesArray[x].addEventListener('click', styleSetRadio, false);
            }
          }
        });
      }
    });
  }
};

UK_Parliament.enableSubmit();

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
