/**
 * Created by Steve on 1/28/2015.
 */

module.exports = function(superagent, expect, host) {
    describe('/v1/bookmarks tests', function() {
        var bookmark = {
            name: 'Test Bookmark',
            url: 'http://stevegood.org/'
        };

        it('should create a bookmark', function(done){
            superagent.post(host + '/v1/bookmarks')
                .send(bookmark)
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(res.status).to.eql(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.eql(bookmark.name);
                    expect(res.body.url).to.eql(bookmark.url);
                    expect(res.body._id.length).to.be.above(0);

                    bookmark._id = res.body._id;

                    done();
                });
        });

        it('should list bookmarks', function(done){
            superagent.get(host + '/v1/bookmarks')
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(res.status).to.eql(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.key('bookmarks');
                    expect(res.body.bookmarks).to.be.an('array');

                    var foundBookmark = false;
                    for (var i=0; i < res.body.bookmarks.length; i++) {
                        if (res.body.bookmarks[i]._id === bookmark._id) {
                            foundBookmark = true;
                        }
                    }

                    if (!foundBookmark) {
                        expect().fail('Bookmark with id [' + bookmark._id + '] was not in the list');
                    }

                    done();
                });
        });

        it('should get a bookmark by id', function(done){
            superagent.get(host + '/v1/bookmarks/' + bookmark._id)
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(res.status).to.eql(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.eql(bookmark);

                    done();
                });
        });

        it('should update a bookmark by id', function(done){
            bookmark.name += ' XXX';
            superagent.put(host + '/v1/bookmarks/' + bookmark._id)
                .send(bookmark)
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(res.status).to.eql(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.eql(bookmark);

                    done();
                });
        });

        it('should delete a bookmark by id', function(done){
            superagent.del(host + '/v1/bookmarks/' + bookmark._id)
                .end(function(e, res) {
                    expect(e).to.eql(null);
                    expect(res.status).to.eql(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.key('status');
                    expect(res.body.status).to.eql(200);
                    expect(res.body).to.have.key('message');
                    expect(res.body.message).to.eql('success');

                    done();
                });
        });

        it('should throw a 404 when trying to get a bookmark with an invalid id', function(done){
            superagent.get(host + '/v1/bookmarks/1234567890ilikebeefjerky')
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(res.status).to.eql(404);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.key('status');
                    expect(res.body).to.have.key('message');
                    expect(res.body.status).to.eql(404);
                    expect(res.body.message).to.contain('error: not found');

                    done();
                });
        });

        it('should throw a 404 when trying to update a bookmark with an invalid id', function(done){
            superagent.put(host + '/v1/bookmarks/1234567890ilikebeefjerky')
                .send(bookmark)
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(res.status).to.eql(404);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.key('status');
                    expect(res.body).to.have.key('message');
                    expect(res.body.status).to.eql(404);
                    expect(res.body.message).to.contain('error: not found');

                    done();
                });
        });

        it('should throw a 404 when trying to delete a bookmark with an invalid id', function(done){
            superagent.del(host + '/v1/bookmarks/1234567890ilikebeefjerky')
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(res.status).to.eql(404);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.key('status');
                    expect(res.body).to.have.key('message');
                    expect(res.body.status).to.eql(404);
                    expect(res.body.message).to.contain('error: not found');

                    done();
                });
        });
    });
};