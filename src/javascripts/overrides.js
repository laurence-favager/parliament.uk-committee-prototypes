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
    var container = document.getElementById('countrySelect');
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
  }
}());

// Function to show/hide content for country selection (Representative)
(function () {
  if (document.getElementById('countrySelectRep')) {
    var checkRowRep = document.getElementById('country-row-rep');
    var checkUkRep = document.getElementById('country-uk-rep');
    var container = document.getElementById('countrySelectRep');
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
    var container = document.getElementById('repDetails');
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
