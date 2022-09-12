import dotenv from "dotenv"
import path from "path"
import express from "express"
import { UploadedFile } from "express-fileupload"
dotenv.config()

const FILE_NAME = "clientinfo.xml"
const filepath = path.join(__dirname, "..", "file", FILE_NAME)

const main = async () => {
  const PORT = process.env.PORT || 8080
  const app = express()
  app.listen(PORT, () => console.log(`Server running on ${PORT}`))

  app.get("/", (_req, res) => {
    console.log("Download request")
    console.log(filepath)
    console.log(__dirname)
    return res.download(filepath)
  })

  app.post("/upload", (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.")
    }
    const { files } = req
    const file = files.file as UploadedFile
    return file.mv(filepath, (err) => {
      if (err) return res.status(500).send(err)
      return res.status(201).send("file updated.")
    })
  })
}

main()
