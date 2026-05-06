<!DOCTYPE html>
<html lang="en" data-theme="light">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="Portfolio of Kristine Bernadette D. Burgos, focused on financial management, analysis, and corporate finance.">

        <title>Kristine Bernadette D. Burgos | Portfolio</title>

        @fonts
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body>
        <div id="portfolio-root"></div>
    </body>
</html>
