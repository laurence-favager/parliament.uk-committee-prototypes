(function () {
  var checkbox = document.getElementById('chkAgent');
  var container = document.getElementById('detAgent');
  var fn = function () {
    if (checkbox.checked) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  };

  checkbox.onclick = fn;

  fn.apply(checkbox);

}());
