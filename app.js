const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let listItems = [];
let workItems = [];

app.get('/', (req, res) => {
  const today = new Date();
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  let day = today.toLocaleDateString('en-US', options);

  res.render('list', { listTitle: day, listItems: listItems });
});

app.post('/', (req, res) => {
  let newItem = req.body.newList;
  if (req.body.list === 'Work') {
    workItems.push(newItem);
    res.redirect('/work');
  } else {
    listItems.push(newItem);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work', listItems: workItems });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
