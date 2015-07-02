Package.describe({
  name: 'meteorhacks:js-pipes',
  summary: 'MongoDB aggregation pipeline implementation in JavaScript',
  version: '1.1.0',
});

Npm.depends({
  'js-pipes': '1.1.0',
});

Package.onUse(function (api) {
  api.versionsFrom('1.0.2.1');
  api.addFiles('server/pipeline.js', 'server');
  api.export('Pipeline', 'server');
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('practicalmeteor:sinon');
  api.use('meteorhacks:js-pipes');
  api.addFiles('tests/pipeline.unit.js', 'server');
  api.addFiles('tests/pipeline.func.js', 'server');
});
