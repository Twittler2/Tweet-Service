// const elasticsearch = require('elasticsearch');

// const elasticClient = new elasticsearch.Client({ host: 'localhost:9200', log: 'info' });

// const indexName = "events";

// function initMapping() {
//   return elasticClient.indices.putMapping({
//     index: indexName,
//     type: "event",
//     body: {
//       properties: {
//         type: { type: "text" },
//         date: { type: "date" },
//         suggest: {
//           type: "completion",
//           analyzer: "simple",
//           search_analyzer: "simple",
//           payloads: true
//         }
//       }
//     }
//   });
// }
// exports.initMapping = initMapping;

// function getSuggestions(input) {
//   return elasticClient.suggest({
//     index: indexName,
//     type: "event",
//     body: {
//       docsuggest: {
//         // text: input,
//         completion: {
//           field: "suggest",
//           fuzzy: true
//         }
//       }
//     }
//   })
// }
// exports.getSuggestions = getSuggestions;

// /**
// * Delete an existing index
// */
// function deleteIndex() {
//   return elasticClient.indices.delete({
//       index: indexName
//   });
// }
// exports.deleteIndex = deleteIndex;

// /**
// * create the index
// */
// function initIndex() {
//   return elasticClient.indices.create({
//       index: indexName
//   });
// }
// exports.initIndex = initIndex;

// /**
// * check if the index exists
// */
// function indexExists() {
//   return elasticClient.indices.exists({
//       index: indexName
//   });
// }
// exports.indexExists = indexExists;


// function addEvent(event) {
//   return elasticClient.index({
//     index: indexName,
//     type: "event",
//     body: {
//       type: event.type,
//       date: event.date
//     }
//   });
// }
// exports.addEvent = addEvent;



// // function addBulkTweets(tweets) {
// //   const params = { body: [] };
// //   let id;
// //   let content;
// //   let isad;
// //   let date;
// //   let interactors;

// //   tweets.forEach((tweet) => {
// //     [id, content, isad, date, interactors] = tweet.params;
// //     params.body.push({ index: { _index: indexName, _type: 'event' } });
// //     params.body.push({ id, content, isad, date, interactors });
// //   });

// //   return elasticClient.bulk(params);
// // }
// // exports.addBulkTweets = addBulkTweets;

