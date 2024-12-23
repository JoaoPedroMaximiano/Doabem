<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Encontre necessidades de doação perto de você!" />
        <meta name="author" content="IFSC-Tubarão, Douglas Guimarães dos Santos e João Pedro Barreto Maximiano" />
        <meta name="keywords" content="doações, eventos beneficentes, ajuda, solidariedade" />
        <meta property="og:title" content={Doações} />
        <meta property="og:description" content="Encontre necessidades de doação perto de você!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        <title inertia>{{ config('app.name', 'doabem') }}</title>

        <!-- Fonts -->
        <!-- <link rel="preconnect" href="https://fonts.bunny.net"> -->
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
