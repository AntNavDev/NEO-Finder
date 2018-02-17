function reformatDate(date)
{
    var temp = date.split('/');
    if(temp[0] == '' || temp[1] == '' || temp[2] == '')
    {
        return null;
    }
    return $.datepicker.formatDate('yy-mm-dd', new Date(temp[2], (temp[0] - 1), temp[1]));
}

function compare_dates(start_date, end_date)
{
    day1 = start_date.split('-')[2];
    day2 = end_date.split('-')[2];
    if((day2 - day1) > 7)
    {
        return false;
    }
    else
    {
        return true;
    }
}

$(document).ready(function(){
    $('#start_date').datepicker();
    $('#end_date').datepicker();

    $('#content').on('click', 'button[name="hide_data_button"]', function(){
        $('p[name="date_' + $(this).data('date') + '"]').toggleClass('hide_data');
        if($(this).html() == 'Hide Data')
        {
            $(this).html('Show Data');
        }
        else
        {
            $(this).html('Hide Data');
        }
        
    });
    
    $('#get_data_button').on('click', function(){
        var api_key = '';
        var has_error = '';
        var start_date = reformatDate($('#start_date').val());
        var end_date = reformatDate($('#end_date').val());
        var my_url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + start_date + '&end_date=' + end_date + '&api_key=' + api_key;

        if(!start_date)
        {
            has_error += 'You seem to be missing the start date. Please enter a start date to continue.'
        }
        if(!end_date)
        {
            has_error += ' You seem to be missing the end date. Please enter an end date to continue.'
        }

        if(has_error.length || !compare_dates(start_date, end_date))
        {
            if(!compare_dates(start_date, end_date))
            {
                has_error += ' The date range is more than 7. NASA requires you have a date range of 7 days or less.<br><br><br>...jerks.'    
            }
            $('#content').html('<div>' + has_error + '</div>');
        }
        else
        {
            $('#content').html('');
            $.ajax({
                url: my_url,
                success: function(data){
                    $.each(data.near_earth_objects, function(outer_index, outer_value){
                        $('#content').append('<div><span id="occurence_date">' + outer_index + '</span><button name="hide_data_button" data-date="' + outer_index + '">Hide Data</button>');

                        $.each(outer_value, function(inner_index, inner_value){
                            $('#content').append('<p id="individual_data" name="date_' + outer_index + '">NEO Name: ' + inner_value.name + '<br>NASA JPL(Jet Propulsion Laboratory) Link: <a href="' + inner_value.nasa_jpl_url + '" target="_blank">' + inner_value.nasa_jpl_url + '</a></p>');
                        });

                        $('#content').append('</div>');
                        console.log(outer_value);
                    })
                },
                error: function(err){
                    console.log('Error: ');
                    console.log(err);
                }
            });
        }
        
    });
});
