@extends('layouts.master')
@section('content')
<div class="container-fluid">
    <h1  class="title-index">Registrando sucursal</h1>
    {{ Form::open(['id'=>'create','url' => '/services', 'role' => 'form', 'enctype' => 'multipart/form-data','data-toggle' => 'validator','class' => 'form-horizontal', 'method' => 'post', 'files' => true]) }}
            <div class="row-fulid col-md-6">
                <!--info cliente-->
                <div class="widget-box">
                    <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
                    <h5>Información del cliente</h5>
                    </div>
                    <div class="widget-content nopadding">
                        <div class="control-group">
                            <label class="control-label">Nombre :</label>
                            <div class="controls">
                                <input id="name" name="name" type="text" class="form-control input-type-text" placeholder="Nombre" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Descripcion :</label>
                            <div class="controls">
                                <textarea name="resume" id="resume"  class="form-control input-type-text"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                        <label class="control-label">Direccion 1 :</label>
                            <div class="controls">
                                <textarea name="address1" id="address1"  class="form-control input-type-text"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Direccion 2 :</label>
                            <div class="controls">
                                <textarea name="address2" id="address2"  class="form-control input-type-text"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">PC :</label>
                            <div class="controls">
                                <input id="pc" name="pc" type="number" class="form-control input-type-text" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Numero de contacto :</label>
                            <div class="controls">
                                <input id="contactPhone" name="contactPhone" type="number" class="form-control input-type-text" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Whatsapp :</label>
                            <div class="controls">
                                <input id="whatsapp" name="whatsapp" type="number" class="form-control input-type-text" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Longitud :</label>
                            <div class="controls">
                                <input id="logitud" name="logitud" type="text" class="form-control input-type-text" placeholder="Nombre" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Latitud :</label>
                            <div class="controls">
                                <input id="latitud" name="latitud" type="text" class="form-control input-type-text" placeholder="Nombre" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Empresa :</label>
                            <div class="controls">
                            {{ Form::select( 'idCompany', array( 1=> 'Patito',0 => 'Sams'), null, [
                                'id' => 'idCompany',
                                'class' => 'form-control input-type-text',
                                'required' => 'required',
                                'data-required-error' => 'Obligatorio',
                                'style' => 'width: 20% !important;'
                            ])}}
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Empleados :</label>
                            <div class="controls">
                                <input id="employees" name="employees" type="number" class="form-control input-type-text" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">Estado :</label>
                            <div class="controls">
                                <input id="estado" name="estado" type="text" class="form-control input-type-text" placeholder="Estados" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">InSite :</label>
                            <div class="controls">
                                <input id="inSite" name="inSite" type="text" class="form-control input-type-text" placeholder="Insite" 
                                required="required" data-required-error="Obligatorio"/>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div class="form-group col-md-12" style="margin-bottom: 30px !important;">
                    <label class="control-label col-md-5 label-length-device">Dias de trabajo :</label>
                    <select class="form-control form-length-device" name="reparacion" id="reparacion"
                    required="required" data-required-error="Obligatorio"
                    >
                        <option value="0" selected>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
            </div>
            <div class="row-fluid co-md-12 div-device-build">
                
            </div>
            <div id="btns-actions" class="col-md-8">
                <button id="btn-save" type="submit" class="btn-table-new">Guardar</button>
                <!--<button id="btn-cancel" type="submit" class="btn btn-primary">Cancelar</button>-->
            </div>
        {{ Form::close() }} 
        @include('layouts.modal-success',[
            'title1' => 'Reparación agregada con',
            'title2' => 'Exito'
        ])
</div> 
<script src="{{asset('js/Business.js')}}"></script>
<script src="{{asset('js/Master.js')}}"></script>
<script type="module">
    import {InputImageController} from "/js/InputImageController.js";
	$(document).ready(function() {
        Business.setDeviceBuild($('#reparacion'),()=>{
            Business.setDatePickerController();
        });
        Master.FormValidator('#create',(e)=>{
            e.preventDefault();  
           /*
                Master.mensajeForm('#create','/business','POST');
            }*/
            
        });
	});
</script> 
@endsection