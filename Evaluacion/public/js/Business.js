Business = {
	vars: {
		table: null,
		tableId: '#business',
		businessId : [],
		toDeleteBusiness : []
	},
    LoadTable: function(url) {
		var url = url || 'sucursal/data';
		Business.vars.table = Master.CreateTable('#business',Business.tableContent.dom,url,
			Business.tableContent.buttons,Business.tableContent.columns,Business.tableContent.columnsDef,
			Business.tableCallbacks.onDraw,Business.tableCallbacks.onDrawRow);

		Master.SelectAllCheckboxes('#master-checkbox','#business > tbody > tr > td > label > input[type=checkbox]',Business.AddToDelete);
		Business.SelectCheckBoxTable();
	},
	tableContent: {	
		dom:'<<"input-search"f>< <B>> <l><t><i><p>>',	
		columns: [
			{ data: 'id',searchable: false,visible:false},	
			{ data: 'id', sortable:false, searchable: false, 'width':'1%'},		
			{ data: 'name', sortable:false,className: 'title-table'},
			{ data: 'resume',sortable:false,className: 'title-table'},
			{ data: 'address1',sortable:false,className: 'title-table'},
			{ data: 'address2',sortable:false,className: 'title-table'},
			{ data: 'pc',sortable:false,className: 'title-table'},
			{ data: 'contactPhone',sortable:false,className: 'title-table'},
			{ data: 'workingHours',sortable:false,className: 'title-table'},
			{ data: 'id',sortable:false,searchable: false,visible: true},
	    ], 
		columnsDef: [
			{
				"targets": 1,
				"searchable": false,
				"data": 'id',
				'width':'1%',
				"render": function (data,type,row,meta) {
					//return '<div class="text-center"><input class="checkbox" data-id="'+data+'" data-index="'+meta.row+'" title="Seleccionar fila" style="width: 14px; height:14px" type="checkbox"></div>';
					return '<label class="checbkox-container"><input class="checkbox" data-id="'+data+'" data-index="'+meta.row+'" title="Seleccionar fila" style="width: 14px; height:14px" type="checkbox"><span class="checkmark"></span></label>';			
				}
			},
			{
				'targets': 2,
				'visible': true,
				'render': function(data,type,row,meta)
				{
				 let dato= data;
				  if(dato!=null)
					  return '<span>'+dato+'</span>'
				  else
					  return '<span>-</span>'
				}
			},
			{
				'targets': 3,
				'visible': true,
				'render': function(data,type,row,meta)
				{
				 let dato= data;
				  if(dato!='')
					  return '<span>'+dato+'</span>'
				  else
					  return '<span>-</span>'
				}
			},
			{
				'targets': 4,
				'visible': true,
				'render': function(data,type,row,meta)
				{
				 let dato= data;
				  if(dato!=null)
					  return '<span>'+dato+'</span>'
				  else
					  return '<span>-</span>'
				}
			},
			{
				'targets': 5,
				'visible': true,
				'render': function(data,type,row,meta)
				{
					return data!=null ? data:'-';
				}
			},
			{
				'targets': 6,
				'visible': true,
				'render': function(data,type,row,meta)
				{
					return data!=null ? data:'-';
				}
			},
			{
				'targets': 7,
				'visible': true,
				'render': function(data,type,row,meta)
				{
					return data!=null ? data:'-';
				}
			},
		    {
				'targets': 8,
				'visible': true,
				"data": 'workingHours',
				'width':'5%',
		    	'render': function(data,type,row,meta) {
					for(var i=0;i<data.length;i++){
						return data[i].day;
					}
				}
		    },
			{
				'targets': 9,
				'visible': true,
				'data': 'id',
				'width':'2%',
					'render': function(data,type,row,meta) {
						var url = '#';
					if (data !== null && data !== '')
						url = 'services/'+data;
					return '<div class=""><a title="Detalle" href="'+url+'" >'+
					'<img src="/img/iconv/edit-btn.png"></a></div>';
					}
			  }
	    ],
		buttons: [
			{
            	enabled: false,
                text: '<svg class="m-r-xs" id="Grupo_6528" data-name="Grupo 6528" xmlns="http://www.w3.org/2000/svg" width="14.991" height="14.991" viewBox="0 0 14.991 14.991"><g id="Grupo_6525" data-name="Grupo 6525"><path id="Trazado_2884" data-name="Trazado 2884" d="M7.5,14.991a7.5,7.5,0,1,1,7.5-7.5A7.5,7.5,0,0,1,7.5,14.991ZM7.5.856A6.639,6.639,0,1,0,14.134,7.5,6.647,6.647,0,0,0,7.5.856Z" fill="#fff"/></g><g id="Grupo_6526" data-name="Grupo 6526" transform="translate(4.126 7.069)"><path id="Trazado_2885" data-name="Trazado 2885" d="M14.829,15.494H8.945a.426.426,0,1,1,0-.853h5.885a.426.426,0,0,1,0,.853Z" transform="translate(-8.518 -14.641)" fill="#fff"/></g><g id="Grupo_6527" data-name="Grupo 6527" transform="translate(7.069 4.126)"><path id="Trazado_2886" data-name="Trazado 2886" d="M15.068,15.256a.427.427,0,0,1-.427-.426V8.945a.426.426,0,1,1,.853,0v5.885A.426.426,0,0,1,15.068,15.256Z" transform="translate(-14.641 -8.518)" fill="#fff"/></g></svg><span class="hidden-xs">Registrar una empresa</span>',
                className: 'btn-table-new',
				titleAttr: 'Registrar una empresa',
				init: function(api, node, config) {
					$(node).removeClass('btn btn-default disabled')
						.find('span').addClass('text-responsive');
				},
                action: function ( e, dt, node, config ) {
                    window.location.href = 'business/create';
				},
			},
			{
            	enabled: false,
				//text: '<i style="font-size: 17.5px;" class="fa fa-times"></i>',
				text: '<svg class="m-r-xs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="13" viewBox="0 0 11 13"><defs><clipPath id="clip-path"><rect id="Rectángulo_1347" data-name="Rectángulo 1347" width="11" height="13" fill="#e84b4b"/></clipPath></defs><g id="Grupo_6517" data-name="Grupo 6517" transform="translate(-786 -327)"><path id="Trazado_2871" data-name="Trazado 2871" d="M1009.69,481.7a.293.293,0,0,0-.293.293v5.528a.293.293,0,0,0,.585,0V482a.293.293,0,0,0-.293-.293Zm0,0" transform="translate(-216.304 -149.668)" fill="#e84b4b"/><g id="Grupo_6516" data-name="Grupo 6516" transform="translate(786 327)"><g id="Grupo_6515" data-name="Grupo 6515" transform="translate(0 0)" clip-path="url(#clip-path)"><path id="Trazado_2872" data-name="Trazado 2872" d="M891.714,481.7a.31.31,0,0,0-.316.3v5.754a.316.316,0,0,0,.632,0v-5.754a.31.31,0,0,0-.316-.3Zm0,0" transform="translate(-888.067 -476.993)" fill="#e84b4b"/><path id="Trazado_2873" data-name="Trazado 2873" d="M787.894,330.869v7.5a1.646,1.646,0,0,0,.464,1.158,1.585,1.585,0,0,0,1.129.47h5.981a1.585,1.585,0,0,0,1.129-.47,1.646,1.646,0,0,0,.464-1.158v-7.5a1.165,1.165,0,0,0,.888-1.274,1.193,1.193,0,0,0-1.2-1.013h-1.618V328.2a1.174,1.174,0,0,0-.365-.853,1.266,1.266,0,0,0-.887-.349h-2.807a1.267,1.267,0,0,0-.887.349,1.174,1.174,0,0,0-.365.853v.381H788.2a1.193,1.193,0,0,0-1.2,1.013,1.165,1.165,0,0,0,.887,1.274Zm7.574,8.521h-5.981a.98.98,0,0,1-.961-1.02V330.9h7.9v7.474a.98.98,0,0,1-.961,1.02ZM790.455,328.2a.575.575,0,0,1,.179-.423.621.621,0,0,1,.44-.171h2.807a.621.621,0,0,1,.44.171.575.575,0,0,1,.179.423v.381h-4.046Zm-2.251.989h8.547a.548.548,0,1,1,0,1.1H788.2a.548.548,0,1,1,0-1.1Zm0,0" transform="translate(-786.965 -326.999)" fill="#e84b4b"/></g></g><path id="Trazado_2874" data-name="Trazado 2874" d="M950.69,481.7a.293.293,0,0,0-.292.293v5.528a.293.293,0,0,0,.585,0V482a.293.293,0,0,0-.293-.293Zm0,0" transform="translate(-159.178 -149.668)" fill="#e84b4b"></g></svg><span class="hidden-xs">Eliminar</span>',
                className: 'btn-table-delete',
				titleAttr: 'Eliminar Registros Seleccionados',
				init: function(api, node, config) {
					$(node).removeClass('btn btn-default disabled')
						.find('span').addClass('text-responsive');
				},
                action: function ( e, dt, node, config ) {
					var selectedRows = Business.vars.toDeleteBusiness;
					console.log(selectedRows.length);
                	if (selectedRows.length > 0) {
                		Master.ConfirmDelete(selectedRows.length, () => {
                			
                		});
                	} else {
                		Master.NoRowSelectedMessage();
                	}
                }
			}
        ]
	},
	tableCallbacks: {
		onDraw: function() {
		},
		onDrawRow: function(row,data,index) {
			//Recuperamos los ID´s de los dispositivos
			Business.vars.businessId[index] = data.id;
			console.log(Business.vars.businessId);
		}
	},
	SelectCheckBoxTable: function(){
		Master.TableEvents('#business','tr td label.checbkox-container input[type=checkbox]',(obj) => {
				Master.SelectTableRow(obj,Business.vars.businessId,Business.vars.toDeleteBusiness);
				console.log(Business.vars.toDeleteBusiness);
		});
	},
	AddToDelete: function($checkbox,checked){
		Master.AddToDeleteArray($checkbox,checked,Business.vars.businessId,Business.vars.toDeleteBusiness)
		console.log(Business.vars.toDeleteBusiness);
	},
	Delete: function(idsArray) {
		if (idsArray.length > 0 && idsArray !== null) {
			
		}
	},
	setDeviceBuild: function(obj,datePickerCallback = () => {}){
			$(obj).on('change', function(e){
				let device = $(obj).val();
				if(device !=0)
				{
					if($('.info-device').length >0)
					{
						$('.info-device').remove();
						$('br').remove();
					}
					for(let $i=0;$i<device;$i++)
					{
						$('.div-device-build').append('<div class="col-md-12"><div class="col-md-6 info-device"><div class="widget-box"><div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span><h5>Dias de trabajo</h5></div><div class="widget-content nopadding"><div class="control-group"><label class="control-label">Dia :</label><div class="controls"><input id="day" name="day[]" type="text" class="form-control input-type-text" placeholder="M/N"/></div></div><div class="control-group"><label class="control-label">Open :</label><div class="controls"><input id="startdate" name="startdate[]" type="text" class="datepicker form-control input-type-text" required="required" data-required-error="Obligatorio"/><span class="help-block with-errors"></span></div></div><div class="control-group"><label class="control-label">Cierre :</label><div class="controls"><input id="enddate" name="enddate[]" type="text" class="datepicker form-control input-type-text" required="required" data-required-error="Obligatorio"/><span class="help-block with-errors"></span></div></div></div></div>');
						//Device.setSelectAjax();	
					}
				}
				else
				{
					if($('.info-device').length >0)
					{
						$('.info-device').remove();
						$('br').remove();
					}
				}
				datePickerCallback();
			});
			
	},
	setDatePickerController: function(startDate,endDate){
		$('.datepicker').datetimepicker({
			format: "dd-mm-yyyy H:i"
		});
	},
	validateDropDownBuild: function(obj,inputEmail,btnSave,btnCancel){	
		$(obj).on('change',function(){
			let dato = $(obj).val();
			if(dato != 0)
			{
				$(btnSave).removeAttr('disabled');
				$(btnCancel).removeAttr('disabled');
			}
			else
			{
				$(btnSave).attr('disabled','disabled');
				$(btnCancel).attr('disabled','disabled');
			}
		});
	}
}