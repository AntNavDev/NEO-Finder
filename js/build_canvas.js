$(document).ready(function(){
    var canvas = document.getElementById('distance_canvas');
    if(canvas.getContext)
    {
        var ctx = canvas.getContext('2d');

        // Earth
        ctx.beginPath();
        ctx.arc(100, 400, 50, 0, Math.PI * 2, true);
        ctx.fillStyle = '#0000FF';
        ctx.fill();
        ctx.closePath();

        // Moon
        ctx.beginPath();
        ctx.arc(630, 65, 20, 0, Math.PI * 2, true);
        ctx.fillStyle = '#BBCFBF';
        ctx.fill();
        ctx.closePath();

        // Continents
        ctx.fillStyle = '#00FF00';

        ctx.fillRect(75, 375, 20, 8);
        ctx.fillRect(78, 380, 12, 10);

        ctx.fillRect(110, 405, 10, 15);

    }
});
