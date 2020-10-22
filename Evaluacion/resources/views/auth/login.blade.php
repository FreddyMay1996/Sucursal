<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Ciber Milagros</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/bootstrap-responsive.min.css" />
    <link rel="stylesheet" href="css/matrix-login.css" />
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />
</head>
<body style="background-image:url({{asset('img/fondo.jpg')}})">
   
<div id="loginbox" style="margin-top: -111px;">            
            <form id="loginform" method="POST" class="form-vertical" action="{{ route('login') }}" class="form-vertical">
                @csrf
				 <div class="control-group normal_text"> <h3><img src="img/milagros logo_Mesa de trabajo 1.png" alt="Logo" /></h3></div>
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <label class="label-login">Email</label>
                            <input id="email" type="email"  class="@error('email') is-invalid @enderror"  name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="Email" />
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <label class="label-login">Contraseña</label>
                            <input id="password" class="@error('password') is-invalid @enderror" name="password" required autocomplete="current-password" type="password" placeholder="Password" />
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                </div>
                <div class="form-actions" style="display: grid;text-align: center;">
                    <span class="">
                    <button type="submit" class="btn-circle-login">
                        {{ __('Ingresar') }}
                    </button>
                    </span>
                </div>
            </form>
        </div>
</body>
</html>
