/**
 * Created by Steve on 1/28/2015.
 */

module.exports = function(router, db) {
    var bookmarks = db.collection('bookmarks');
    /* GET home page. */
    router.get('/bookmarks', function(req, res, next) {
        bookmarks.find({}, {sort: [['name', 'ascending']]}).toArray(function(e, result){
            if (e) return next(e);
            res.send({
                bookmarks: result
            });
        })
    });

    router.get('/bookmarks/:id', function(req, res, next){
        var id = req.params.id;
        bookmarks.findById(id, function(e, result) {
            if (e) return next(e);
            if (result) {
                res.send(result);
            } else {
                res.status(404);
                res.send({
                    status: 404,
                    message: 'error: not found'
                });
            }
        });
    });

    router.delete('/bookmarks/:id', function(req, res, next){
        var id = req.params.id;
        bookmarks.removeById(id, function(e, result){
            if (e) return next(e);
            res.status(result === 1 ? 200 : 404);
            res.send({
                status: result === 1 ? 200 : 404,
                message: result === 1 ? 'success' : 'error: not found'
            });
        });
    });

    router.put('/bookmarks/:id', function(req, res, next){
        delete req.body._id;
        var id = req.params.id;
        bookmarks.updateById(id, req.body, function(e, result) {
            if (e) return next(e);
            if (result === 1) {
                bookmarks.findById(id, function(e, result) {
                    if (e) return next(e);
                    res.send(result);
                })
            } else {
                res.status(404);
                res.send({status: 404, message: 'error: not found'});
            }
        });
    });

    router.post('/bookmarks', function(req, res, next){
        bookmarks.insert(req.body, function(e, result){
            if (e) return next(e);
            res.send(result[0]);
        });
    });

    return router;
};
