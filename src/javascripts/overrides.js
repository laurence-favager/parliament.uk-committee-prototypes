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

// Function to open print dialog in browser window
function printPage() {
  window.print();
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
          localStorage.submitter = radio.id;
          form.action = radio.dataset.route;
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
function submitterRouting(subLoc, subAct, indPage, orgPage) {

  var submitterType = localStorage.getItem('submitter');
  var submitterControl = document.getElementById(subLoc);
  var submitterAction = subAct;
  var individualPage = indPage;
  var organisationPage = orgPage;

  if ((submitterType == 'ind' || submitterType == 'grp') && submitterAction == 'form') {
    submitterControl.action = individualPage;
  } else if ((submitterType == 'org' || submitterType == 'orgs') && submitterAction == 'form') {
    submitterControl.action = organisationPage;
  } else if ((submitterType == 'ind' || submitterType == 'grp') && submitterAction == 'link') {
    submitterControl.href = individualPage;
  } else {
    submitterControl.href = organisationPage;
  }
}

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

    var j = 1;

    // Functionality to add/remove organisation name inputs
    document.getElementById('addNewOrg').addEventListener('click', function (e) {
      e.preventDefault();

      if (j <= 4) {

        var is = document.createElement('div'),
            ih = document.createElement('h2'),
            il = document.createElement('label'),
            it = document.createElement('input'),
            ip = document.createElement('p'),
            ir = document.createElement('a');

        is.setAttribute('class', 'input-group__extended');
        is.setAttribute('aria-live', 'polite');
        il.innerHTML = 'Organisation name';
        it.setAttribute('type', 'text');
        it.setAttribute('name', 'name');
        it.setAttribute('required', 'required');
        it.setAttribute('data-error', 'Please enter the organisation name');
        ir.setAttribute('class', 'link--remove-cv');

        incrementOrg();

        ih.innerHTML = 'Additional organisation ' + j;
        il.setAttribute('for', 'txtOrgName' + j);
        it.setAttribute('id', 'txtOrgName' + j);

        is.appendChild(ih);
        is.appendChild(il);
        is.appendChild(it);

        ir.innerHTML = 'Remove additional organisation ' + j;
        ir.setAttribute('onclick', "removeOrgElement('id_" + j + "')");

        ip.appendChild(ir);
        is.appendChild(ip);

        is.setAttribute('id', 'id_' + j);

        document.getElementById('multiOrgs').insertAdjacentElement('beforeend', is);

        UK_Parliament.formValidation();

      } else {
        var vm = document.createElement('div');
        var vp = document.createElement('p');
        vm.setAttribute('id', 'orgError');
        vm.setAttribute('class', 'status--highlight theme--caution');
        vm.setAttribute('aria-live', 'polite');
        vp.innerHTML = 'You can\'t add more than 10 organisation names to this form.\n\n If there are more organisations on the submission make sure they\'re included in your evidence.';
        vm.appendChild(vp);
        document.getElementById('addNewOrg').insertAdjacentElement('beforebegin', vm);
      }
    });
  }

  // Function to do standard incrementation
  incrementOrg = function () {
    j += 1;
  };

  // Function to do standard incrementation
  decrementOrg = function () {
    j -= 1;
  };

  // Function to remove fom elements dynamically
  removeOrgElement = function (org) {
    document.getElementById(org).remove();

    if (document.getElementById('orgError')) {
      document.getElementById('orgError').remove();
    }

    decrementOrg();
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

      if (i <= 4) {

        var is = document.createElement('div'),
            ih = document.createElement('h2'),
            il1 = document.createElement('label'),
            it1 = document.createElement('input'),
            il2 = document.createElement('label'),
            it2 = document.createElement('input'),
            il3 = document.createElement('label'),
            it3 = document.createElement('input'),
            il4 = document.createElement('label'),
            it4 = document.createElement('input'),
            il5 = document.createElement('label'),
            it5 = document.createElement('input'),
            ip = document.createElement('p'),
            ir = document.createElement('a');

        is.setAttribute('class', 'input-group__extended');
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

        il4.innerHTML = 'Job title (optional)';
        it4.setAttribute('type', 'text');
        it4.setAttribute('name', 'pro-name');

        il5.innerHTML = 'Organisation (optional)';
        it5.setAttribute('type', 'text');
        it5.setAttribute('name', 'pro-role');

        ir.setAttribute('class', 'link--remove-cv');

        increment();

        ih.innerHTML = 'Additional individual ' + i;

        il1.setAttribute('for', 'txtTitle' + i);
        it1.setAttribute('id', 'txtTitle' + i);
        it1.setAttribute('class', 'input__md');
        il2.setAttribute('for', 'txtFirstName' + i);
        it2.setAttribute('id', 'txtFirstName' + i);
        il3.setAttribute('for', 'txtLastName' + i);
        it3.setAttribute('id', 'txtLastName' + i);
        il4.setAttribute('for', 'txtProName' + i);
        it4.setAttribute('id', 'txtProName' + i);
        il5.setAttribute('for', 'txtProRole' + i);
        it5.setAttribute('id', 'txtProRole' + i);

        is.appendChild(ih);
        is.appendChild(il1);
        is.appendChild(it1);
        is.appendChild(il2);
        is.appendChild(it2);
        is.appendChild(il3);
        is.appendChild(it3);
        is.appendChild(il4);
        is.appendChild(it4);
        is.appendChild(il5);
        is.appendChild(it5);

        ir.innerHTML = 'Remove additional individual ' + i;
        ir.setAttribute('onclick', "removeElement('id_" + i + "')");

        ip.appendChild(ir);
        is.appendChild(ip);

        is.setAttribute('id', 'id_' + i);

        document.getElementById('multiInds').insertAdjacentElement('beforeend', is);

        UK_Parliament.formValidation();

      } else {
        var vm = document.createElement('div');
        var vp = document.createElement('p');
        vm.setAttribute('id', 'indError');
        vm.setAttribute('class', 'status--highlight theme--caution');
        vm.setAttribute('aria-live', 'polite');
        vp.innerHTML = 'You can\'t add more than 10 names to this form.\n\n If there are more names on the submission make sure they\'re included in your evidence.';
        vm.appendChild(vp);
        document.getElementById('addNewInd').insertAdjacentElement('beforebegin', vm);
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
    document.getElementById(ind).remove();

    if (document.getElementById('indError')) {
      document.getElementById('indError').remove();
    }

    decrement();
  };
};

UK_Parliament.addNewIndividual();
