const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`App listen on port ${process.env.PORT}`);
});
