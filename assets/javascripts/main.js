/**
 * Created by Steve on 1/28/2015.
 */

!function($){
    $(document).on('ready', function(){
        $('a.list-group-item').contextMenu({
            menuSelector: "#contextMenu",
            menuSelected: function (target, selectedMenu) {
                var action = selectedMenu.data('action'),
                    _id = target.data('id');
                switch(action) {
                    case 'edit':
                        console.log('Editing ' + _id);
                        break;
                    case 'delete':
                        console.log('Deleting ' + _id);
                        break;
                }
            }
        });
    });
}(jQuery);
