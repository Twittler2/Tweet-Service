const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({ host: 'localhost:9200', log: 'info' });

const indexName = "tweets";

function initMapping() {
  return elasticClient.indices.putMapping({
    index: indexName,
    type: "tweet",
    body: {
      properties: {
        id: { type: "text" },
        content: { type: "text" },
        isad: { type: "boolean" },
        date: { type: "date" },
        interactors: {},
        suggest: {
          type: "completion",
          analyzer: "simple",
          search_analyzer: "simple",
          payloads: true
        }
      }
    }
  });
}
exports.initMapping = initMapping;

function getSuggestions(input) {
  return elasticClient.suggest({
    index: indexName,
    type: "tweet",
    body: {
      docsuggest: {
        // text: input,
        completion: {
          field: "suggest",
          fuzzy: true
        }
      }
    }
  })
}
exports.getSuggestions = getSuggestions;

/**
* Delete an existing index
*/
function deleteIndex() {
  return elasticClient.indices.delete({
      index: indexName
  });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {
  return elasticClient.indices.create({
      index: indexName
  });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {
  return elasticClient.indices.exists({
      index: indexName
  });
}
exports.indexExists = indexExists;


function addTweet(tweet) {
  return elasticClient.index({
    index: indexName,
    type: "tweet",
    body: {
      id: tweet.id,
      content: tweet.content,
      isad: tweet.isad,
      date: tweet.date,
      interactors: tweet.interactors,
      suggest: {
        // input: document.title.split(" "),
        // output: document.title,
        // payload: document.metadata || {}
      }
    }
  });
}
exports.addTweet = addTweet;



function addBulkTweets(tweets) {
  const params = { body: [] };
  let id;
  let content;
  let isad;
  let date;
  let interactors;

  tweets.forEach((tweet) => {
    [id, content, isad, date, interactors] = tweet.params;
    params.body.push({ index: { _index: indexName, _type: 'tweet' } });
    params.body.push({ id, content, isad, date, interactors });
  });

  return elasticClient.bulk(params);
}
exports.addBulkTweets = addBulkTweets;

