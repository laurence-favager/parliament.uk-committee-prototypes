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
      document.getElementById('countrySelect').style.display ='none';
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
      document.getElementById('countrySelectRep').style.display ='none';
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
      document.getElementById('repDetails').style.display ='none';
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


(function () {
  ;( function ( document, window, index )
  	{
  		// feature detection for drag&drop upload
  		var isAdvancedUpload = function()
  			{
  				var div = document.createElement( 'div' );
  				return ( ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ) ) && 'FormData' in window && 'FileReader' in window;
  			}();


  		// applying the effect for every form
  		var forms = document.querySelectorAll( '.box' );
  		Array.prototype.forEach.call( forms, function( form )
  		{
  			var input		 = form.querySelector( 'input[type="file"]' ),
  				label		 = form.querySelector( 'label' ),
  				errorMsg	 = form.querySelector( '.box__error span' ),
  				restart		 = form.querySelectorAll( '.box__restart' ),
  				droppedFiles = false,
  				showFiles	 = function( files )
  				{
  					label.textContent = files.length > 1 ? ( input.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', files.length ) : files[ 0 ].name;
  				},
  				triggerFormSubmit = function()
  				{
  					var event = document.createEvent( 'HTMLEvents' );
  					event.initEvent( 'submit', true, false );
  					form.dispatchEvent( event );
  				};

  			// letting the server side to know we are going to make an Ajax request
  			var ajaxFlag = document.createElement( 'input' );
  			ajaxFlag.setAttribute( 'type', 'hidden' );
  			ajaxFlag.setAttribute( 'name', 'ajax' );
  			ajaxFlag.setAttribute( 'value', 1 );
  			form.appendChild( ajaxFlag );

  			// automatically submit the form on file select
  			input.addEventListener( 'change', function( e )
  			{
  				showFiles( e.target.files );


  				triggerFormSubmit();


  			});

  			// drag&drop files if the feature is available
  			if( isAdvancedUpload )
  			{
  				form.classList.add( 'has-advanced-upload' ); // letting the CSS part to know drag&drop is supported by the browser

  				[ 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ].forEach( function( event )
  				{
  					form.addEventListener( event, function( e )
  					{
  						// preventing the unwanted behaviours
  						e.preventDefault();
  						e.stopPropagation();
  					});
  				});
  				[ 'dragover', 'dragenter' ].forEach( function( event )
  				{
  					form.addEventListener( event, function()
  					{
  						form.classList.add( 'is-dragover' );
  					});
  				});
  				[ 'dragleave', 'dragend', 'drop' ].forEach( function( event )
  				{
  					form.addEventListener( event, function()
  					{
  						form.classList.remove( 'is-dragover' );
  					});
  				});
  				form.addEventListener( 'drop', function( e )
  				{
  					droppedFiles = e.dataTransfer.files; // the files that were dropped
  					showFiles( droppedFiles );


  					triggerFormSubmit();

  									});
  			}


  			// if the form was submitted
  			form.addEventListener( 'submit', function( e )
  			{
  				// preventing the duplicate submissions if the current one is in progress
  				if( form.classList.contains( 'is-uploading' ) ) return false;

  				form.classList.add( 'is-uploading' );
  				form.classList.remove( 'is-error' );

  				if( isAdvancedUpload ) // ajax file upload for modern browsers
  				{
  					e.preventDefault();

  					// gathering the form data
  					var ajaxData = new FormData( form );
  					if( droppedFiles )
  					{
  						Array.prototype.forEach.call( droppedFiles, function( file )
  						{
  							ajaxData.append( input.getAttribute( 'name' ), file );
  						});
  					}

  					// ajax request
  					var ajax = new XMLHttpRequest();
  					ajax.open( form.getAttribute( 'method' ), form.getAttribute( 'action' ), true );

  					ajax.onload = function()
  					{
  						form.classList.remove( 'is-uploading' );
  						if( ajax.status >= 200 && ajax.status < 400 )
  						{
  							var data = JSON.parse( ajax.responseText );
  							form.classList.add( data.success == true ? 'is-success' : 'is-error' );
  							if( !data.success ) errorMsg.textContent = data.error;
  						}
  						else alert( 'Error. Please, contact the webmaster!' );
  					};

  					ajax.onerror = function()
  					{
  						form.classList.remove( 'is-uploading' );
  						alert( 'Error. Please, try again!' );
  					};

  					ajax.send( ajaxData );
  				}
  				else // fallback Ajax solution upload for older browsers
  				{
  					var iframeName	= 'uploadiframe' + new Date().getTime(),
  						iframe		= document.createElement( 'iframe' );

  						$iframe		= $( '<iframe name="' + iframeName + '" style="display: none;"></iframe>' );

  					iframe.setAttribute( 'name', iframeName );
  					iframe.style.display = 'none';

  					document.body.appendChild( iframe );
  					form.setAttribute( 'target', iframeName );

  					iframe.addEventListener( 'load', function()
  					{
  						var data = JSON.parse( iframe.contentDocument.body.innerHTML );
  						form.classList.remove( 'is-uploading' )
  						form.classList.add( data.success == true ? 'is-success' : 'is-error' )
  						form.removeAttribute( 'target' );
  						if( !data.success ) errorMsg.textContent = data.error;
  						iframe.parentNode.removeChild( iframe );
  					});
  				}
  			});


  			// restart the form if has a state of error/success
  			Array.prototype.forEach.call( restart, function( entry )
  			{
  				entry.addEventListener( 'click', function( e )
  				{
  					e.preventDefault();
  					form.classList.remove( 'is-error', 'is-success' );
  					input.click();
  				});
  			});

  			// Firefox focus bug fix for file input
  			input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
  			input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });

  		});
  	}( document, window, 0 ));
}());
