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

// Function to show/hide content for country selection (Individual)
(function () {
  if (document.getElementById('countrySelect')) {
    var checkRow = document.getElementById('country-row');
    var checkUk = document.getElementById('country-uk');
    var fncshow = function () {
      document.getElementById('countrySelect').style.display = 'block';
    };

    var fnchide = function () {
      document.getElementById('countrySelect').style.display = 'none';
    };

    checkRow.onclick = fncshow;
    checkUk.onclick = fnchide;

    fncshow.apply(checkRow);
    fnchide.apply(checkUk);

    checkUk.setAttribute.checked;
  }
}());

// Function to show/hide content for country selection (Representative)
(function () {
  if (document.getElementById('countrySelectRep')) {
    var checkRowRep = document.getElementById('country-row-rep');
    var checkUkRep = document.getElementById('country-uk-rep');
    var fncrshow = function () {
      document.getElementById('countrySelectRep').style.display = 'block';
    };

    var fncrhide = function () {
      document.getElementById('countrySelectRep').style.display = 'none';
    };

    checkRowRep.onclick = fncrshow;
    checkUkRep.onclick = fncrhide;

    fncrshow.apply(checkRowRep);
    fncrhide.apply(checkUkRep);
  }
}());

// Function to show/hide content for representative details
(function () {
  if (document.getElementById('repDetails')) {
    var checkRep = document.getElementById('ext-rep');
    var checkInd = document.getElementById('ind-only');
    var fnrshow = function () {
      document.getElementById('repDetails').style.display = 'block';
    };

    var fnrhide = function () {
      document.getElementById('repDetails').style.display = 'none';
    };

    checkRep.onclick = fnrshow;
    checkInd.onclick = fnrhide;

    fnrshow.apply(checkRep);
    fnrhide.apply(checkInd);
  }
}());

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
function getCheckedRadioIndex(radios) {
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      var r = radios[i].dataset.route;
      return r;
    }
  }
}

(function () {
  if (document.getElementById('submitterType')) {

    var radios = document.querySelectorAll('input[type=radio]');

    for (var i = 0; i < radios.length; i++) {
      radios[i].onclick = function () {
        var route = getCheckedRadioIndex(radios);
        document.getElementById('submitterType').action = route;
      };
    }
  }
}());

// Functionality to add/remove organisation name inputs
var i = 0;

// Function to do standard incrementation
function increment() {
  i += 1;
}

// Function to do standard incrementation
function decrement() {
  i -= 1;
}

// Function to remove fom elements dynamically
function removeElement(parentDiv, childDiv) {
  var child = document.getElementById(childDiv);
  var parent = document.getElementById(parentDiv);
  parent.removeChild(child);
  decrement();
}

// Functions to add additional inputs to form
if (document.getElementById('org-new')) {
  document.getElementById('org-new').addEventListener('click', function (event) {
    event.preventDefault();
    if (i <= 4) {
      var r = document.createElement('span');
      var x = document.createElement('label');
      var y = document.createElement('input');
      y.setAttribute('type', 'text');
      var g = document.createElement('a');
      g.setAttribute('class', 'link--remove');
      g.innerHTML = 'remove';
      increment();
      x.setAttribute('for', 'txtOrgName_' + i);
      x.innerHTML = 'Organisation name ' + i;
      y.setAttribute('id', 'txtOrgName_' + i);
      r.appendChild(x);
      r.appendChild(y);
      g.setAttribute('onclick', "removeElement('multiOrgs','id_" + i + "')");
      r.appendChild(g);
      r.setAttribute('id', 'id_' + i);
      document.getElementById('org-new').insertAdjacentElement('beforebegin', r);
    } else {
      alert('You can only add up to 5 additional organisations per petition');
      return false;
    }
  });
}

// File upload - show file name
if (document.getElementById('file-upload')) {
  document.getElementById('file-upload').onchange = function () {
    var fullFile = this.value;
    var nameFile = fullFile.split(/(\\|\/)/g).pop();
    document.getElementById('file-uploaded-txt').innerHTML = nameFile;
    document.getElementById('file-uploaded').innerHTML = 'Thank you! Your petition template has been successfully attached';
    document.getElementById('file-uploaded').className = 'file--uploaded-success';
  };
}
