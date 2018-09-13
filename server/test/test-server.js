// To run automated test  'node_modules/mocha/bin/mocha ./test'
var expect = require('chai').expect;
var chai = require('chai');
var app = require('../app');
var request = require('request');
var baseUrl = 'http://localhost:5000/api';

var posts = require('../routes/api/posts');

// api/posts | GET get all posts test
describe('should return 200 response with posts', () => {
	it('should return posts json objects', function(done) {
		request.get({ url: baseUrl + '/posts' }, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			expect('Content-type', /json/);
			done();
		});
	}).timeout(5000);
});

// api/classrooms | GET classrooms test
describe('should return 200 response with classrooms', () => {
	it('should get classrooms json objects', function(done) {
		request.get({ url: baseUrl + '/classrooms' }, function(
			error,
			response,
			body
		) {
			expect(response.statusCode).to.equal(401);
			expect('Content-type', /json/);
			done();
		});
	}).timeout(5000);
});

// api/usrs/posts | POST create-post test
describe('should return 401 response', () => {
	it('should get error messages', function(done) {
		request.post(
			{
				url: baseUrl + '/posts',
				text: 'Working on unit testing'
			},
			function(error, response, body) {
				expect(response.statusCode).to.equal(401);
				expect('Content-type', /json/);
				done();
			}
		);
	}).timeout(5000);
});
