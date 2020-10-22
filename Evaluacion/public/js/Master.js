Master = {
    url: {
		dt_language: '/src/json/language_dt.json'
	},
    SelectAllCheckboxes: function(masterCheckBox,selector,callback = () => {}){
		$(masterCheckBox).on('change', function(){
			let checked =$(this).is(':checked');
			//Obtenemos los inputs type=checkbox de la tabla
			var $selector = $(selector);
			//Iteramos por cada type=checkbox de la tabla
			$.each($selector,function(index,element){
				$checkbox = $(element);
				$tr = $checkbox.parents('tr');
				if(checked)
				{
					$checkbox.prop('checked',true);
					//$tr.addClass(Device.vars.rowColor);
				}
				else
				{
					$checkbox.prop('checked',false);
					//$tr.removeClass(Device.vars.rowColor);
				}
				callback( $checkbox, checked, $tr );
			});
		});
    },
    AddToDeleteArray: function($checkbox,checked,idsArray,toDeleteArray){
		var index = $checkbox.data('index');
		deviceIds = idsArray;
		toDeleteArray = toDeleteArray;
		deviceId = deviceIds[index];
		if(checked)
		{
			if(deviceId!= undefined){
				toDeleteArray[index] = deviceId;
			}
		}
		else
		{
			if(toDeleteArray.length!==0)
			{
				toDeleteArray.length = 0;
			}
		}
    },
    Ajax: function(url,method,_data,async,onsuccess,oncomplete,onerror=null) {
		var oncomplete = oncomplete || function() {};
		$.ajax({
			url: url,
		  	type: method,
		  	dataType: 'jsonp',
		  	data: _data,
		  	async: async,
		  	success: function(data, textStatus, xhr) {
		    	onsuccess(data);
		  	},
		  	complete: function(xhr, textStatus) {
		    	oncomplete(xhr);
		  	},
		  	error: function(xhr, textStatus, errorThrown) {
		  		alert('ha ocurrido un error');
		  	}
		});
    },
    CreateTable: function(tableId,dom,ajaxUrl,buttons,columns,columnsDefault,onDrawCallback,onDrawRowCallback,onInitComplete = () => {}) {
		
		var table = $(tableId).DataTable({
			
			pageLength: 10,
			responsive: true,
			dom: dom,
			buttons: buttons,
			processing: true,
			serverSide: true,
			language: {
				url: Master.url.dt_language
			},
        	ajax: {
        		url: ajaxUrl,
				method: 'GET',
        	},
			columns: columns,
			columnDefs: columnsDefault,
			fnDrawCallback: function( oSettings ) {
		    	onDrawCallback(oSettings);
    		},
		    fnRowCallback: function(row,data,index) {
		    	onDrawRowCallback(row,data,index);
		    },
			//Cuando se termina de cargar la tabla
		    initComplete: function(settings, json) { 
				onInitComplete(settings, json);
		  	}
		});
		return table;
    },
    TableEvents: function(tableId,selector,callback){
		$(tableId).on('change',selector, function(e) {
			e.preventDefault();
			callback($(this));
		});
    },
    SelectTableRow: function(obj,array_ids,toDeleteArray)
	{
		var $checkbox = $(obj);//obtenemos el checkbox de la tabla
		var checked =$checkbox.is(':checked') ? true: false; //Si esta presionado si o no
		var index = $checkbox.data('index');//Obtenemos las posiciones del data-index del checkbox
		var arrayids = array_ids;//almacenamos los ids de los dispositivos
		var toDeleteArray = toDeleteArray;//tomamos la variable para regresar a la variable
		var deviceId = arrayids[index];
		if(index!= undefined && checked == true)
		{
			if(deviceId!=undefined)
			{
				//toDeleteArray[index] = deviceId;
				toDeleteArray.push(deviceId);
			}
		}
		else
		{
			let index = toDeleteArray.indexOf(deviceId);
			if ( index !== -1 ) 
				toDeleteArray.splice( (index), 1 ); //busca el index del elemento y lo borra
			
			//if (arrayCheckeds.length < 1)
				//$('#master-checkbox').prop('checked', false);
		}
	},
	FormValidator: function(form,validCallback = () => {},invalidCallback = () => {}) {
		$(form).validator().on('submit', function (e) {
		    if ( e.isDefaultPrevented() ) {
		    	invalidCallback(e);
	        } else {
	        	validCallback(e);
	    	}
		});
	},
	mensajeForm: function(idForm,url,method,url_fact){
		let data = new FormData($(idForm)[0]);
			data.append( "_token",$('meta[name="csrf-token"]').attr('content') );
			$.ajax({
				url:url,
				data:data,
				method:method,
				processData: false,
				contentType: false,
				success:function(data){
					if(data.status == 'success')
					{
						//$(idForm).addClass('fom-op');
						$('#successModal').modal('show');
						if(data.client_id!=null || data.client_id!= undefined)
						{
							let url_dest = url_fact+data.client_id;
							$('#factura-btn').click(function(){
								//window.location.href = url_dest;
								window.open(url_dest);
								$('#factura-btn').parents().css('display','none');
								$('#success-btn').parents().css('display','block');
							});
							$('#success-btn').click(function(){
								window.location.href = url;
							});
						}
						else
						{
							$('#factura-btn').parents().css('display','none');
							$('#success-btn').parents().css('display','block');
							$('#success-btn').click(function(){
								window.location.href = url;
							});
						}
					}
				},
				error:function(data){
					alert('Ha ocurrido un error mientras se enviaban los datos verifique');
				}
			});
	},
	ConfirmDelete: function(rowSelectedLength, onconfirmCallback) {
    	let title = rowSelectedLength > 1 ? '¿Está seguro que desea eliminar los registros?' : 
    	'¿Está seguro que desea eliminar el registro?',
    	message = rowSelectedLength > 1 ? 'Se eliminarán '+rowSelectedLength+' registros de forma permanente' : 
    	'Se eliminará '+rowSelectedLength+' registro de forma permanente';
    	swal({
			title: title,
			text: message,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'btn-primary',//btn-primary
			confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar',
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(){
			onconfirmCallback(this); 
		});
	},
	NoRowSelectedMessage: function(options = {preventDuplicates: true, timeOut: 2000}) {
    	toastr.warning('', 'Debe seleccionar al menos un elemento para eliminar', options);
	}
}