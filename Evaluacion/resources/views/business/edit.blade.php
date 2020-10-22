@extends('layouts.master')
@section('content') 
<div class="container-fluid">
<h1 class="title-index">Actualizando reparacion</h1>
    <div class="row-fluid">
  
    </div>
</div>
<script src="{{asset('js/Device.js')}}"></script>
<script type="module">
    import {InputImageController} from "/js/InputImageController.js";
	$(document).ready(function() {
        $('.datepicker').datepicker({
			format: "dd-mm-yyyy",
			language: "es",
            autoclose: true,
            startDate: new Date()
        });
        let url = '/services/'+$('#id-device').val();
        Master.FormValidator($('#update'),(e)=>{
            e.preventDefault();
            Master.mensajeForm('#update',url,'POST');
        });
        Device.setConfigurationInputsImage($('#_name'),$('#_id'),$('#_exist'),$('#_archivo'));
        InputImageController({});
	});
</script>     
@endsection