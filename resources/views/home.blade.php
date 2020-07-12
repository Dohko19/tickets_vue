<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="user" content="{{ Auth::user() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('fontawesome-free/css/all.min.css') }}">

</head>
<body>
    <div id="app">
        <nav-bar></nav-bar>
        <main class="py-4">
             {{-- <transition-group tag="" name="fade" style="animation-duration: 0.3s">  --}}
                <router-view :key="$route.fullPath"></router-view>

                <vue-progress-bar></vue-progress-bar>
             {{-- </transition-group>  --}}
        </main>
    </div>
</body>
</html>
