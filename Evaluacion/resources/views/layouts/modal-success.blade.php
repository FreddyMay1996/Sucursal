@php
$_color = isset($color) ? $color : 'font-success-info';
$_title1 = isset($title1) ? $title1 : '';
$_title2 = isset($title2) ? $title2 : '-';
@endphp
​
<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="vertical-alignment-helper" style="margin-left: 600px;">
        <div class="modal-dialog vertical-align-center">
            <div class="modal-content">
                <div class="row custom-modal">
                    <div class="col-sm-12" style="text-align: center;margin-bottom: 20px;margin-top: 20px;">
                        <img src="{{asset('/img/iconv/success-icon.svg')}}" alt="Icon Success">
                    </div>
                    <div class="col-sm-12 m-b-10">
                        <h5 class="font-body justify-content-center text-center custom-modal">{{$_title1}}</h5>
                    </div>
                    <div class="col-sm-12">
                        <h1 class="font-bold justify-content-center text-center {{$_color}} custom-exit">ÉXITO</h1>
                    </div>
                    <div class="col-sm-12" style="margin-bottom: 20px; display: block;">
                        <button id="factura-btn" type="submit" class="btn-table-delete"><img alt="icon" class="" width="14" height="14" style="margin-right: 6px;" src="{{url('/img/iconv/download.png')}}">Descargar nota</button>
                    </div>
                    <div class="col-sm-12" style="margin-bottom: 20px; display: none;">
                        <button id="success-btn" type="submit" class="btn-table-delete">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



