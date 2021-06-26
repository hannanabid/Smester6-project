const express = require ("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers")
const Booking = require("./models/bookings")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static( static_path ));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/index.hbs", (req, res) => {
    res.render("index")
});

app.get("/about.hbs", (req, res) => {
    res.render("about")
});

app.get("/menu.hbs", (req, res) => {
    res.render("menu.hbs")
});

app.get("/gallery.hbs", (req, res) => {
    res.render("gallery.hbs")
});

app.get("/contact.hbs", (req, res) => {
    res.render("contact.hbs")
});

app.get("/form.hbs", (req, res) => {
    res.render("form.hbs")
});

app.get("/login.hbs", (req, res) => {
    res.render("login.hbs")
});

app.get("/register.hbs", (req, res) => {
    res.render("register.hbs")
});

app.get("/form.hbs", (req, res) => {
    res.render("form.hbs")
});




//signup

app.post("/register",async (req, res) => {
    try{
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            
            const registerClient = new Register({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })

           const register = await registerClient.save();
           res.status(201).render("index");

        }else{
            res.send("password are not matcing")
        }
    }catch(error){
        res.status(400).send(error)
    }
});

// login check

app.post("/login", async(req, res) => {
    try{
       const email = req.body.email;
       const password = req.body.password;
         
        const useremail = await Register.findOne({email:email});
        
        if(useremail.password === password){
            res.status(201).render("index");
        }else{
            res.send("Invalid Login Details");
        }

    }catch(error){
        res.status(400).send("Invalid Login Details");
    }
});
app.post("/form", async(req, res) => {
    const {name,email,phone,guests,menu,perhead,bookingdate,weddingdate,message} = req.body
    console.log(name,email,phone,guests,menu,perhead,bookingdate,weddingdate,message)
    try{
        const booking = new Booking({name,email,phone,guests,menu,perhead,bookingdate,weddingdate,message})
        const bookingSaved = await booking.save();
        
        if(bookingSaved){
         res.status(201).render("index");
        }else{
            res.send("Invalid Login Details");
        }

    }catch(error){
        console.log(error)
        res.status(400).send("Invalid Login Details");
    }
});





// app.post("/form", async(req, res) => {
//     try{
//          console.log(req.body.name)
//         res.send(req.body.name);
        
//     }catch(error){
//         res.status(400).send("cannot book");
//     }
// });


app.listen(port, () =>  {
    console.log(`Server is running at port no ${port}`);
})

