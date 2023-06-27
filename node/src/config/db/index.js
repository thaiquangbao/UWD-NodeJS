const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://thaiquangbao:thaiquangbaobao@cluster0.dteah.mongodb.net/UWD?retryWrites=true&w=majority');
    console.log('Connect thành công !!!');
  } catch (error) {
    console.log('Connect không thành công');
  }
}
module.exports = { connect };