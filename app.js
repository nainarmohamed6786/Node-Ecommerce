const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog = require('./blog');

const app=express();

// CONNECT MONGODB

const dbURI='mongodb+srv://nainarns:Nainarns876@todolist.qsewwr8.mongodb.net/TodoList?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>app.listen(3300))
.catch((err)=>console.log(err));

// register view engines
app.set('view engine', 'ejs');

//middlewares & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


//monggose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog=new Blog({
        title:'new blog',
        snippet:'about my blogs',
        body:'this is a body blog'
    });

blog.save()
.then((result)=>{
    res.send(result)
})
.catch((err)=>{
    console.log(err);
})

});


app.get('/full-blog',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})


app.get('/single-blog',(req,res)=>{
    Blog.findById('637dcbfda1b83111b0894eac')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
       console.log(err);
    })
});

//routes
app.get('/',(req,res)=>{
   res.redirect('/blogs');
});

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'Home',blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
});


app.post('/blogs',(req,res)=>{
  const blogs=new Blog(req.body);

  blogs.save()
  .then((result)=>{
    res.redirect('/blogs')
  })
  .catch((err)=>{
    console.log(err)
  })
});

app.get('/blogs/:id',(req,res)=>{
const id=req.params.id;

Blog.findById(id)
.then((result)=>{
    res.render('detail',{title:'detail',blog:result})
})
.catch((err)=>{
    console.log(err);
})
})

app.delete('/blogs/:id',(req,res)=>{
    const id=req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({ redirect:'/blogs'}) 
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/create/blog',(req,res)=>{
    res.render('createBlog');
});

app.get('/about-wwe',(req,res)=>{
    res.redirect('/about');
});

app.use((req,res)=>{
    res.status(404).render('404');
});

