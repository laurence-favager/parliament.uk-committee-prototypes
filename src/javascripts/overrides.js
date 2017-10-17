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

  indCntUk.checked = true;
  indCntSl.style.display = 'none';

  indCntUk.addEventListener('click', function () {
    indCntSl.style.display = 'none';
  });

  indCntRw.addEventListener('click', function () {
    indCntSl.style.display = 'block';
  });
}

// Function to show/hide content for country selection (Representative)
if (document.getElementById('countrySelectRep')) {
  var repCntSl = document.getElementById('countrySelectRep');
  var repCntUk = document.getElementById('country-uk-rep');
  var repCntRw = document.getElementById('country-row-rep');

  repCntUk.checked = true;
  repCntSl.style.display = 'none';

  repCntUk.addEventListener('click', function () {
    repCntSl.style.display = 'none';
  });

  repCntRw.addEventListener('click', function () {
    repCntSl.style.display = 'block';
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
      document.getElementById('file-uploaded').innerHTML = 'Thank you! Your petition template has been successfully attached';
      document.getElementById('file-uploaded').className = 'file--uploaded-success';
    };
  }
}());
