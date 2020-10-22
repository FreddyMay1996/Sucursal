@extends('layouts.master')
@section('content')
<div class="container-fluid">
  <h1 class="title-index">Sucursales</h1> 
    <div class="row-fluid">
        <input id="token" type="hidden" value="{{ csrf_token() }}">
        <div class="">
            <table id="business" class="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>
                      <label class="checbkox-container">
                          <input id="master-checkbox" title="Seleccionar todos" style="width: 14px; height:14px" type="checkbox">
                          <span class="checkmark"></span>
                      </label>
                    </th>
                    <th>Nombre</th>
                    <th>Resumen</th>
                    <th>Direccion 1</th>
                    <th>Direccion 2</th>
                    <th>PC</th>
                    <th>Numero de contacto</th>
                    <th>Horarios de trabajo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>
<script src="{{asset('js/Business.js')}}"></script>
<script type="text/javascript">
  $(document).ready(function() {
    Business.LoadTable();
  });
</script> 
@endsection