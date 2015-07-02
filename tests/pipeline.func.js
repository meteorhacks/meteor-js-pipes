Tinytest.add(
  'Pipeline - simple aggregation',
  function (test) {
    var stages = [
      {$match: {marks: {$gt: 50}}},
      {$group: {_id: '$name', marks: {$avg: '$marks'}}},
      {$sort: {marks: -1}},
      {$limit: 2},
      {$project: {_id: 0, name: '$_id', marks: '$marks'}}
    ];

    var dataset = [
      {_id: 0, name: 'first', marks: 10},
      {_id: 1, name: 'second', marks: 60},
      {_id: 2, name: 'second', marks: 80},
      {_id: 3, name: 'third', marks: 70},
      {_id: 4, name: 'third', marks: 90},
      {_id: 5, name: 'fourth', marks: 60},
    ];

    var pipeline = new Pipeline(stages);
    var result = pipeline.apply(dataset);

    test.equal(result, [
      {name: 'third', marks: 80},
      {name: 'second', marks: 70},
    ]);
  }
);


Tinytest.add(
  'Pipeline - aggregation with no pipeline stages',
  function (test) {
    var stages = [];

    var dataset = [
      {_id: 0, name: 'first', marks: 10},
      {_id: 1, name: 'second', marks: 60},
      {_id: 2, name: 'second', marks: 80},
      {_id: 3, name: 'third', marks: 70},
      {_id: 4, name: 'third', marks: 90},
      {_id: 5, name: 'fourth', marks: 60},
    ];

    var pipeline = new Pipeline(stages);
    var result = pipeline.apply(dataset);

    test.equal(result, dataset);
  }
);


Tinytest.add(
  'Pipeline - aggregation with empty dataset',
  function (test) {
    var stages = [
      {$match: {marks: {$gt: 50}}},
      {$group: {_id: '$name', marks: {$avg: '$marks'}}},
      {$sort: {marks: -1}},
      {$limit: 2},
      {$project: {_id: 0, name: '$_id', marks: '$marks'}}
    ];

    var dataset = [];
    var pipeline = new Pipeline(stages);
    var result = pipeline.apply(dataset);

    test.equal(result, []);
  }
);


Tinytest.add(
  'Pipeline - errors - aggregation with invalid pipeline',
  function (test) {
    var stages = [
      {$hello: 'world'}
    ];

    test.throws(function () {
      new Pipeline(stages); // jshint ignore:line
    });
  }
);


Tinytest.add(
  'Pipeline - errors - aggregation with invalid dataset',
  function (test) {
    var stages = [
      {$match: {marks: {$gt: 50}}},
      {$group: {_id: '$name', marks: {$avg: '$marks'}}},
      {$sort: {marks: -1}},
      {$limit: 2},
      {$project: {_id: 0, name: '$_id', marks: '$marks'}}
    ];

    var dataset = ['invalid-data'];
    var pipeline = new Pipeline(stages);
    var result = pipeline.apply(dataset);
    test.equal(result, []);
  }
);
