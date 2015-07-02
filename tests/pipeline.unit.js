Tinytest.add(
  'Pipeline - fn.constructor - simple',
  function (test) {
    var context = {};
    var stages = [{$match: {foo: 'bar'}}];
    Pipeline.call(context, stages);
    test.equal(context.pipeline.stages, stages);
  }
);

Tinytest.add(
  'Pipeline - fn.apply - simple',
  function (test) {
    var context = {
      pipeline: {apply: sinon.stub().callsArgWith(1, null, 'res')}
    };

    var dataset = 'test-data';
    var result = Pipeline.prototype.apply.call(context, dataset);
    test.isTrue(context.pipeline.apply.calledOnce);
    test.isTrue(context.pipeline.apply.calledWith(dataset));
    test.equal(result, 'res');
  }
);
