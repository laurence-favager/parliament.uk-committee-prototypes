// Function to show/hide content when checkbox clicked
(function () {
  if (document.getElementById('toggleContent')) {
    var checkbox = document.getElementById('toggleContent');
    var container = document.getElementById('contentPane');
    var fnsh = function () {
      if (checkbox.checked) {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    };

    checkbox.onclick = fnsh;

    fnsh.apply(checkbox);
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
