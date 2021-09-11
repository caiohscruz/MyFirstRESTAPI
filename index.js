const express = require("express")
const app = express()

// Settings to use forms - begin
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
// Settings to use forms - end



app.listen(45789, () => {
    console.log("API RODANDO")
})