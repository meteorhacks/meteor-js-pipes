var Future = Npm.require('fibers/future');
var JsPipe = Npm.require('js-pipes');


Pipeline = function (stages) {
  this.pipeline = new JsPipe(stages);

  var error = this.pipeline.hasErrors();
  if(error) {
    throw error;
  }
};


Pipeline.prototype.apply = function (data) {
  var future = new Future();
  this.pipeline.apply(data, future.resolver());
  return future.wait();
};
