<?php 
    use App\User;
    $user = new User();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Ciber Milagros</title>
<meta charset="UTF-8" />
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!--styles css-->
<link rel="stylesheet" href="{{asset('css/Nuevo/bootstrap.min.css')}}" />
<!--<link rel="stylesheet" href="{{asset('css/bootstrap-responsive.min.css')}}" />-->
<link rel="stylesheet" href="{{asset('css/matrix-style.css')}}" />
<link rel="stylesheet" href="{{asset('css/matrix-media.css')}}" />
<link href="{{asset('css/datatables.min.css')}}" rel="stylesheet">
<link rel="stylesheet" href="{{asset('css/bootstrap-datetimepicker.min.css')}}" />
<link rel="stylesheet" href="{{asset('datePicker/css/bootstrap-datepicker3.standalone.css')}}" />
<link href="{{asset('css/sweetalert.css')}}" rel="stylesheet">
<link href="{{asset('css/toastr.min.css')}}" rel="stylesheet">
<!--Scripts-->
<script src="{{asset('js/jquery-3.1.1.min.js')}}"></script>
<script src="{{asset('js/DataTable/bootstrap.min.js')}}"></script>
<script src="{{asset('js/datatables.min.js')}}"></script>
<script src="{{asset('js/DataTable/jquery.table-edit.js')}}"></script>
<script src="{{asset('js/Master.js')}}"></script> 
<script src="{{asset('js/validator.js')}}"></script>   
<script src="{{asset('js/swal.style.js')}}"></script>
<script src="{{asset('js/sweetalert.min.js')}}"></script>
<script src="{{asset('js/toastr.min.js')}}"></script>
<script src="{{asset('js/moment.js')}}"></script>
<!--<script src="{{asset('js/dataTables.responsive.min.js')}}"></script>-->
<script src="{{asset('js/bootstrap-datetimepicker.min.js')}}"></script>
<!-- Languaje DatePicker-->
<script src="{{asset('datePicker/locales/bootstrap-datepicker.es.min.js')}}"></script>
</head>
<body>

<!--Header-part-->
<div id="header">
</div>
<!--close-Header-part--> 


<!--top-Header-menu-->
<div id="user-nav">
  
</div>
<!--close-top-Header-menu-->

<!--sidebar-menu-->
<div id="sidebar">

</div>
<!--sidebar-menu-->

<!--main-container-part-->
<div id="content">
    <!--breadcrumbs-->
    <div id="content-header">

    </div>
    <!--End-breadcrumbs-->
    @yield('content')

</div>

<!--end-main-container-part-->

<!--Footer-part-->

<div class="row-fluid">
  <div id="footer" class="span12"> 2013 &copy; Matrix Admin. Brought to you by <a href="http://themedesigner.in">Themedesigner.in</a> </div>
</div>
<!--end-Footer-part-->
</body>
</html>