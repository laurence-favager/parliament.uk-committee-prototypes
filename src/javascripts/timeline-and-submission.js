function toggleContent(event) {

  if (event.target && event.target.className == 'slider-link') {

    var next = event.target.previousElementSibling;

    if (next.style.display == 'none') {
      event.target.innerHTML = 'show less';
      next.style.display = 'block';
    } else {
      next.style.display = 'none';
      event.target.innerHTML = 'show more';
    }
  }
}

document.addEventListener('click', toggleContent, true);

function showDocument() {
  var doc = document.getElementById('updoc');
  if (doc.style.display === 'none') {
    doc.style.display = 'table';
  } else {
    doc.style.display = 'none';
  }
}

function userContent(rad) {
  var urads = document.getElementsByName(rad.name);

  document.getElementById('org').style.display = (urads[0].checked) ? 'none' : 'block';
  document.getElementById('org').style.display = (urads[1].checked) ? 'block' : 'none';
}

function evidenceContent(rads) {
  var erads = document.getElementsByName(rads.name);

  document.getElementById('wtn').style.display = (erads[0].checked) ? 'block' : 'none';
  document.getElementById('upd').style.display = (erads[1].checked) ? 'block' : 'none';
}

function privacyContent(radz) {
  var prads = document.getElementsByName(radz.name);

  document.getElementById('prv').style.display = (prads[0].checked) ? 'none' : 'block';
  document.getElementById('prv').style.display = (prads[1].checked) ? 'block' : 'none';
}

function userTypeInd() {
  var ind = 'an individual';
  sessionStorage.setItem('user', ind);
  document.getElementById('user_type').action = 'evidence_3.html';
}

function userTypeOrg() {
  var org = 'part of an organisation';
  sessionStorage.setItem('user', org);
  document.getElementById('user_type').action = 'evidence_4.html';
}

function wrtEvdType() {
  var wrt = 'Written Evidence';
  sessionStorage.setItem('evidence', wrt);
  document.getElementById('evidence_type').action = 'evidence_9.html';
}

function updEvdType() {
  var wrd = 'Word Document';
  sessionStorage.setItem('evidence', wrd);
  document.getElementById('evidence_type').action = 'evidence_8.html';
}

if (document.getElementById == 'eType') {
  document.getElementById('eType').innerHTML = sessionStorage.getItem('evidence');
}

if (document.getElementById == 'uIype') {
  document.getElementById('uType').innerHTML = sessionStorage.getItem('user');
}
