// Polyfill to enable 'forEach' in non ES6 supported browser
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// Function to go back one page in browser window
function goBack() {
  window.history.back();
}

// Function to grab and store submitter type
UK_Parliament.submitterIdentification = function () {
  if (document.querySelector('[data-evidence="form"]')) {
    var form = document.querySelector('[data-evidence="form"]');

    form.onsubmit = function (e) {
      e.preventDefault();

      // Grab name of radio group and then collection of same name
      var radiosArray = document.getElementsByName('submitter-type');

      // function to set submit button type from radio selection
      getSubmitterType = function (radio) {
        if (radio.checked) {
          console.log(radio.id);
          localStorage.submitter = radio.id;
          form.submit();
        }
      };

      // Loop radio group and grab clicked radio button
      for (var x = 0; x < radiosArray.length; x++) {
        getSubmitterType(radiosArray[x]);
      }
    };
  }
};

UK_Parliament.submitterIdentification();

// Function to route users correctly depending on submitter type
UK_Parliament.submitterRouting = function () {

  var submitterType = localStorage.getItem('submitter');

  if (document.getElementById('fileUploadForm')) {
    var submitterLink = document.getElementById('fileUploadForm');
    console.log(submitterLink);
    if (submitterType == 'ind') {
      submitterLink.action = 'page05-1.html';
    } else if (submitterType == 'org') {
      submitterLink.action = 'page06-1.html';
    }
  }
};

UK_Parliament.submitterRouting();

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

    // Reload DOM if page loaded from browser history
    if (performance.navigation.type == 2) {
      location.reload(true);
    }

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

// Dropdown switch for hiding/showing content using form elements
UK_Parliament.dropdownSwitch = function () {

  if (document.querySelector('[data-dropdown="switch"]')) {

    // Grab all elements which act as content switches
    var dropdownSwitcherList = document.querySelectorAll('[data-dropdown="switch"]');

    // Grab all elements which act as content content blocks
    var dropdownContentList = document.querySelectorAll('[data-dropdown-content]');

    // Find closest parent element function
    var closestParentElement = function (el, fn) {
      return el && (fn(el) ? el : closestParentElement(el.parentElement, fn));
    };

    // Show hidden content blocks function
    var contentShow = function (dc) {
      dc.style.display = 'block';
    };

    // Hide visible content blocks function
    var contentHide = function (dc) {
      dc.style.display = 'none';
    };

    // Set default content visibility state
    dropdownContentList.forEach(function (elements) {

      // Grab visibility state (show/hide) of each content block
      var dropdownContentInitalState = elements.getAttribute('data-dropdown-content');

      if (dropdownContentInitalState === 'show') {
        contentShow(elements);
      } else if (dropdownContentInitalState === 'hide') {
        contentHide(elements);
      }
    });

    // Loop through content switches
    dropdownSwitcherList.forEach(function (elements) {

      // Grab the switch/content holder using closestElement function
      var dropdownHolder = closestParentElement(elements, function (el) {
        return el.querySelector('[data-dropdown-content]');
      });

      // Grab the content block associated with holder and switch
      var dropdownContent = dropdownHolder.querySelector('[data-dropdown-content]');

      // Store reference to content data attribute
      var dropdownContentState = dropdownContent.getAttribute('data-dropdown-content');

      // Handle checkbox switches
      if (elements.type === 'checkbox') {
        elements.addEventListener('click', function () {
          if (this.checked) {
            if (dropdownContentState === 'show') {
              contentHide(dropdownContent);
            } else if (dropdownContentState === 'hide') {
              contentShow(dropdownContent);
            }
          } else {
            if (dropdownContentState === 'show') {
              contentShow(dropdownContent);
            } else if (dropdownContentState === 'hide') {
              contentHide(dropdownContent);
            }
          }
        });
      }

      // Handle radio group switches
      if (elements.type === 'radio') {

        // Grab radio group name
        var inputSwitchName = elements.name;

        // Grab radio group elements with that name
        var inputSwitchNamesArray = document.getElementsByName(inputSwitchName);

        // Loop radio group and grab clicked radio button
        inputSwitchNamesArray.forEach(function (radios, index) {

          radios.addEventListener('click', function () {

            if (this.getAttribute('data-dropdown') === 'switch' && this.checked) {
              if (dropdownContentState === 'show') {
                contentHide(dropdownContent);
              } else if (dropdownContentState === 'hide') {
                contentShow(dropdownContent);
              }
            } else {
              if (dropdownContentState === 'show') {
                contentShow(dropdownContent);
              } else if (dropdownContentState === 'hide') {
                contentHide(dropdownContent);
              }
            }
          });
        });
      }
    });
  }
};

UK_Parliament.dropdownSwitch();

// Add additional organisations to multi org forms
UK_Parliament.addNewOrganisation = function () {

  // Functions to add additional inputs to form
  if (document.getElementById('addNewOrg')) {

    var o = 1;

    // Functionality to add/remove organisation name inputs
    document.getElementById('addNewOrg').addEventListener('click', function (e) {
      e.preventDefault();

      if (o <= 9) {

        var is = document.createElement('div'),
            ih = document.createElement('h2'),
            il = document.createElement('label'),
            it = document.createElement('input'),
            ir = document.createElement('a');

        is.setAttribute('class', 'radiv-cv');
        is.setAttribute('aria-live', 'polite');
        il.innerHTML = 'Organisation name';
        it.setAttribute('type', 'text');
        it.setAttribute('name', 'name');
        it.setAttribute('required', 'required');
        it.setAttribute('data-error', 'Please enter the organisation name');
        ir.setAttribute('class', 'link--remove-cv');
        ir.innerHTML = 'remove';

        increment();

        ih.innerHTML = 'Additional organisation ' + o;
        il.setAttribute('for', 'txtOrgName' + o);
        it.setAttribute('id', 'txtOrgName' + o);

        is.appendChild(ih);
        is.appendChild(il);
        is.appendChild(it);

        ir.setAttribute('onclick', "removeElement('id_" + o + "')");

        is.appendChild(ir);

        is.setAttribute('id', 'id_' + o);

        document.getElementById('multiOrgs').insertAdjacentElement('beforeend', is);

        UK_Parliament.formValidation();

      } else {
        var vm = document.createElement('div');
        var vp = document.createElement('p');
        vm.setAttribute('class', 'status--highlight theme--caution');
        vm.setAttribute('aria-live', 'polite');
        vp.innerHTML = 'You can\'t add more than 10 organisation names to this form.\n\n If there are more organisations on the submission make sure they\'re included in your evidence.';
        vm.appendChild(vp);
        document.getElementById('addNewOrg').insertAdjacentElement('beforebegin', vm);
      }
    });
  }

  // Function to do standard incrementation
  increment = function () {
    o += 1;
  };

  // Function to do standard incrementation
  decrement = function () {
    o -= 1;
  };

  // Function to remove fom elements dynamically
  removeElement = function (org) {
    var orgDelete = document.getElementById(org);
    orgDelete.remove();
    decrement();
  };
};

UK_Parliament.addNewOrganisation();

// Add additional individuals to group forms
UK_Parliament.addNewIndividual = function () {

  // Functions to add additional inputs to form
  if (document.getElementById('addNewInd')) {

    var i = 1;

    // Functionality to add/remove organisation name inputs
    document.getElementById('addNewInd').addEventListener('click', function (e) {
      e.preventDefault();

      if (i <= 9) {

        var is = document.createElement('div'),
            ih = document.createElement('h2'),
            il1 = document.createElement('label'),
            it1 = document.createElement('input'),
            il2 = document.createElement('label'),
            it2 = document.createElement('input'),
            il3 = document.createElement('label'),
            it3 = document.createElement('input'),
            ir = document.createElement('a');

        is.setAttribute('class', 'radiv-cv');
        is.setAttribute('aria-live', 'polite');
        il1.innerHTML = 'Title (optional)';
        it1.setAttribute('type', 'text');
        it1.setAttribute('name', 'title');

        il2.innerHTML = 'First name(s)';
        it2.setAttribute('type', 'text');
        it2.setAttribute('name', 'first-name');
        it2.setAttribute('required', 'required');
        it2.setAttribute('data-error', 'Please enter a first name');

        il3.innerHTML = 'Last name';
        it3.setAttribute('type', 'text');
        it3.setAttribute('name', 'last-name');
        it3.setAttribute('required', 'required');
        it3.setAttribute('data-error', 'Please enter a last name');

        ir.setAttribute('class', 'link--remove-cv');
        ir.innerHTML = 'remove';

        increment();

        ih.innerHTML = 'Additional individual ' + i;

        il1.setAttribute('for', 'txtTitle' + i);
        it1.setAttribute('id', 'txtTitle' + i);
        it1.setAttribute('class', 'input__md');
        il2.setAttribute('for', 'txtFirstName' + i);
        it2.setAttribute('id', 'txtFirstName' + i);
        il2.setAttribute('for', 'txtLastName' + i);
        it2.setAttribute('id', 'txtLastName' + i);

        is.appendChild(ih);
        is.appendChild(il1);
        is.appendChild(it1);
        is.appendChild(il2);
        is.appendChild(it2);
        is.appendChild(il3);
        is.appendChild(it3);

        ir.setAttribute('onclick', "removeElement('id_" + i + "')");

        is.appendChild(ir);

        is.setAttribute('id', 'id_' + i);

        document.getElementById('multiInds').insertAdjacentElement('beforeend', is);

        UK_Parliament.formValidation();

      } else {
        var vm = document.createElement('div');
        var vp = document.createElement('p');
        vm.setAttribute('class', 'status--highlight theme--caution');
        vm.setAttribute('aria-live', 'polite');
        vp.innerHTML = 'You can\'t add more than 10 names to this form.\n\n If there are more names on the submission make sure they\'re included in your evidence.';
        vm.appendChild(vp);
        document.getElementById('addNewind').insertAdjacentElement('beforebegin', vm);
      }
    });
  }

  // Function to do standard incrementation
  increment = function () {
    i += 1;
  };

  // Function to do standard incrementation
  decrement = function () {
    i -= 1;
  };

  // Function to remove fom elements dynamically
  removeElement = function (ind) {
    var indDelete = document.getElementById(ind);
    indDelete.remove();
    decrement();
  };
};

UK_Parliament.addNewIndividual();
