import igdb from 'igdb-api-node';
console.log("TESTING");
const client = igdb('qh6jfouob87senzmm6422jomq4ui44', 'l769ze4bm9867k792tg9qqdqo2ghvb');
console.log(client.tagNumber(1, 5));
const response = await igdb()
    .fields(['name', 'movies', 'age']) // fetches only the name, movies, and age fields
    // .fields('name,movies,age') // same as above

    .limit(50) // limit to 50 results
    // .offset(10) // offset results by 10

    // .sort('name') // default sort direction is 'asc' (ascending)
    .sort('name', 'desc') // sorts by name, descending
    .search('mario') // search for a specific name (search implementations can vary)

    // .where(`first_release_date > ${new Date().getTime() / 1000}`) // filter the results

    .request('/games'); // execute the query and return a response object

console.log(response.data);