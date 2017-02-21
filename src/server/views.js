const fs = require('fs');
var getRawBody = require('raw-body');

module.exports = function (myApp) {

  const dbSource = 'src/server/mockTasks.json';

  function response500(response, err) {
    response.statusCode = 500;
    response.end(`Error getting the file: ${err}.`);
  }

  myApp.get('/api/v1/task', function (request, response) {
    fs.readFile(dbSource, function (err, data) {
      if (err) {
        response500(response, err);
      } else {
        response.statusCode = 200;
        response.setHeader('Content-type', 'application/json');
        response.end(data);
      }
    })
  });

  myApp.post('/api/v1/task', function (request, response) {
    getRawBody(request)
      .then(function (buf) {

        fs.readFile(dbSource, function (err, data) {
          if (err) {
            response500(response, err);
          } else {
            var jData = JSON.parse(data);
            var newTask = JSON.parse(buf);
            var newId = Math.floor(Math.random() * (Math.pow(10, 12))).toString() + Math.floor(Math.random() * (Math.pow(10, 13)).toString());
            newTask.id = newId;
            jData.push(newTask);

            fs.writeFile(dbSource, JSON.stringify(jData), (err) => {
              if (err) console.warn(err);
            });

            response.setHeader('Content-type', 'application/json');
            response.statusCode = 200;
            response.end(JSON.stringify(newTask));
          }
        });

      })
      .catch(function (err) {
        response.statusCode = 500;
        response.end(err.message)
      });
  });

  myApp.put('/api/v1/task/:task_id', function (request, response) {

    getRawBody(request)
      .then(function (buf) {

        fs.readFile(dbSource, function (err, data) {
          if (err) {
            response500(response, err);

          } else {
            var jData = JSON.parse(data);
            var requestBody = JSON.parse(buf);
            jData = jData.map(el=> {
              if (el.id === request.params.task_id) {
                el = requestBody;
              }
              return el;
            });
            fs.writeFile(dbSource, JSON.stringify(jData), (err) => {
              if (err) console.warn(err);
            });
            response.statusCode = 200;
            response.setHeader('Content-type', 'application/json');
            response.end('true');
          }
        });
      })
      .catch(function (err) {
        response.statusCode = 500;
        response.end(err.message)
      });


  });

  myApp.delete('/api/v1/task/:task_id', function (request, response) {
    fs.readFile(dbSource, function (err, data) {
      if (err) {
        response500(response, err);
      } else {
        var jData = JSON.parse(data);
        var taskIndex = jData.findIndex(el=>el.id === request.params.task_id);

        response.statusCode = 200;
        response.setHeader('Content-type', 'application/json');

        if (taskIndex !== -1) {
          jData.splice(taskIndex, 1);
          fs.writeFile(dbSource, JSON.stringify(jData), (err) => {
            if (err) console.warn(err);
          });
          response.end('true');
        } else {
          response.end('false');
        }
      }
    })
  });

};
