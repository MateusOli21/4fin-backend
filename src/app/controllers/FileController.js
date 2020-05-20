const File = require('../models/File');

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { id, url } = await File.create({ name, path });

    return res.json({ id, path, url });
  }
}

module.exports = new FileController();
