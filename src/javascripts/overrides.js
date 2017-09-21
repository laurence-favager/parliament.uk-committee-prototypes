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

// Function to enable submission buttons when checkbox clicked
(function () {
  if (document.getElementById('enableSubmit')) {
    var checkbox = document.getElementById('enableSubmit');
    var button = document.getElementById('buttonSubmit');
    var fnsubmit = function () {
      if (checkbox.checked) {
        button.disabled = false;
        button.className = 'btn--primary';
        button.style.cursor = 'pointer'
      } else {
        button.disabled = true;
        button.className = 'btn--disabled';
        button.style.cursor = 'not-allowed'
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
  if (document.querySelectorAll('input[type=radio]')) {

    var radios = document.querySelectorAll('input[type=radio]');

    for (var i = 0; i < radios.length; i++) {
      radios[i].onclick = function () {
        var route = getCheckedRadioIndex(radios);
        document.getElementById('submitterType').action = route;
      };
    }
  }
}());
