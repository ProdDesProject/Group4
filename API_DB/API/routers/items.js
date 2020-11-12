const express = require('express');
const parseobj = require('xml2js');


let router = express.Router();
const db = require('./db.js');

const passport = require('passport');
const { render } = require('ejs');
const BasicStrategy = require('passport-http').BasicStrategy;

/*let ItemsData = [
    {
        id: "0",
        title: "Selling used car",
        description: "Used BMW 1995, black, diesel, etc.",
        category: "Cars",
        location: "London,YK",
        images: "asd123asd123asd123",
        askingprice: 2000,
        dateofposting: 1591012800,
        deliverytype: "Pickup",
        sellername: "Bill BMW",
        sellermail: "Billruleforever@gmail.com",
        sellerphonenumber: "+44 23 448 112"
    }

  ];*/
  
  /*
  let ItemObject = {
        "id": "0",
        "title": "Selling used car",
        "description": "Used BMW 1995, black, diesel, etc.",
        "category": "Cars",
        "location": "London,YK",
        "images": "asd123asd123asd123",
        "askingprice": 2000,
        "dateofposting": 1591012800,
        "deliverytype": "Pickup",
        "sellername": "Bill BMW",
        "sellermail": "Billruleforever@gmail.com",
        "sellerphonenumber": "+44 23 448 112"
  };*/



router
.route('')
.get((req, res) => 
{
    //res.json({ItemsData});
    
    const builder = new parseobj.Builder();

    async function changeXML(result2)
    {
        async function xmlLoop()
        {
            var result2;
            await db.query('SELECT * FROM items').then(results => 
                {
                    //res.json({ ItemsData: results})
                    //res.send(xml);
                    result2 = {ItemsData:results};
                    
                    //res.json({ ItemsData: results});
                })
                .catch(() => {
                    res.sendStatus(500);
                })
    
            //console.log(result2);
            return result2;    
        }

        var result3 = await xmlLoop();
        var result4="All Items:";
        var xml = builder.buildObject(result3);

        for (i=0;i<result3.ItemsData.length;i++)
        {
            var xml = builder.buildObject(result3.ItemsData[i]);
            var image1 = result3.ItemsData[i].image1;
            var image2 = result3.ItemsData[i].image2;
            var image3 = result3.ItemsData[i].image3;
            var image4 = result3.ItemsData[i].image4;

            image1 = "<img src=\""+image1+"\" style= \""+"width:128px;height:128px"+"\" \/>";
            image2 = "<img src=\""+image2+"\" style= \""+"width:128px;height:128px"+"\" \/>";
            image3 = "<img src=\""+image3+"\" style= \""+"width:128px;height:128px"+"\" \/>";
            image4 = "<img src=\""+image4+"\" style= \""+"width:128px;height:128px"+"\"\/>";

            result4 = result4 +"<h1>"+image1+image2+image3+image4+"</h1>" + xml;
        }
    
        res.send(result4);
    }

    changeXML();
    
});

router
.route('/objectresponse')
.get(passport.authenticate('basic', { session: false }),
(req,res) => {
    //console.log(category2.category)
    db.query('SELECT * FROM items')
    .then(ItemsData => {
        res.json({ItemsData});
        console.log(ItemsData);
        })
        .catch(() => {
            res.sendStatus(500);
        })
    
    // var result = ItemsData.filter(obj => obj.category === category2.category)
    // console.log(result)
    //res.json({result});
    })

router
.route('/:id')
.get((req, res) => {

    const builder = new parseobj.Builder();

    async function changeXML(result2)
    {
        async function xmlLoop()
        {
            var result2;
            await db.query('SELECT * FROM items WHERE id =?',[req.params.id]).then(results => 
                {
                    //res.json({ ItemsData: results})
                    //res.send(xml);
                    result2 = {ItemsData:results};
                    
                    //res.json({ ItemsData: results});
                })
                .catch(() => {
                    res.sendStatus(500);
                })
    
            //console.log(result2);
            return result2;    
        }

        var result3 = await xmlLoop();
        var xml = builder.buildObject(result3);
        console.log(result3);
    
        var image1 = result3.ItemsData[0].image1;
        var image2 = result3.ItemsData[0].image2;
        var image3 = result3.ItemsData[0].image3;
        var image4 = result3.ItemsData[0].image4;

        image1 = "<img src=\""+image1+"\" style= \""+"width:128px;height:128px"+"\" \/>";
        image2 = "<img src=\""+image2+"\" style= \""+"width:128px;height:128px"+"\" \/>";
        image3 = "<img src=\""+image3+"\" style= \""+"width:128px;height:128px"+"\" \/>";
        image4 = "<img src=\""+image4+"\" style= \""+"width:128px;height:128px"+"\"\/>";

        result3 = "<h1>"+image1+image2+image3+image4+"</h1>"+xml
        console.log(result3);
        res.send(result3);
    }

    changeXML();
    
    /* let params = req.params;
    console.log(params.id)

    db.query('SELECT * FROM items WHERE id =?',[req.params.id]).then(results => {
    res.json({ItemsData:results});
    //console.log(ItemsData);
    })
    .catch(() => {
        res.sendStatus(500);
    })*/

    /*let params = req.params;
    console.log(params.id)
    //ItemsData = ItemsData[params.id]
    res.json(ItemsData[params.id]);*/
});

router
.route('/objectresponse/:id')
.get(passport.authenticate('basic', { session: false }),
(req,res) => {
    //console.log(category2.category)
    db.query('SELECT * FROM items WHERE id =?',[req.params.id])
    .then(ItemsData => {
        res.json({ItemsData});
        console.log(ItemsData);
        })
        .catch(() => {
            res.sendStatus(500);
        })
    
    // var result = ItemsData.filter(obj => obj.category === category2.category)
    // console.log(result)
    //res.json({result});
    })

router
.route('/create')
.post(
    passport.authenticate('basic', { session: false }),
    (req, res) => {

        db.query('INSERT INTO items(title,description,category,location,askingprice,dateofposting,deliverytype,sellername,sellermail,sellerphonenumber,image1,image2,image3,image4)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        ,[req.body.title
        ,req.body.description
        ,req.body.category
        ,req.body.location
        ,req.body.askingprice
        ,req.body.dateofposting
        ,req.body.deliverytype
        ,req.body.sellername
        ,req.body.sellermail
        ,req.body.sellerphonenumber
        ,req.body.image1
        ,req.body.image2
        ,req.body.image3
        ,req.body.image4]);
          
    /*ItemsData.push({
        id: ItemsData.length,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        images: req.body.images,
        askingprice: req.body.askingprice,
        dateofposting: req.body.dateofposting,
        deliverytype: req.body.deliverytype,
        sellername: req.body.sellername,
        sellermail: req.body.sellermail,
        sellerphonenumber: req.body.sellerphonenumber
      })*/
      res.sendStatus(201);
    });

//search category
router
.route('/search/category/:category')
.get((req,res) => {
    //console.log(category2.category)
    db.query('SELECT * FROM items WHERE category =?',[req.params.category]).then(ItemsData => {
        res.json({ItemsData});
        console.log(ItemsData);
        })
        .catch(() => {
            res.sendStatus(500);
        })

   // var result = ItemsData.filter(obj => obj.category === category2.category)
   // console.log(result)
    //res.json({result});
})


//search location
router
.route('/search/location/:location')
.get((req,res) => {
    
    db.query('SELECT * FROM items WHERE location =?',[req.params.location]).then(ItemsData => {
        res.json({ItemsData});
        console.log(ItemsData);
        })
        .catch(() => {
            res.sendStatus(500);
        })
    /*let location2 = req.params;
    console.log(location2.location)

    

    var result = ItemsData.filter(obj => obj.location === location2.location)
    console.log(result)
    res.json({result});*/
})

//search dateofposting
router
.route('/search/dateofposting/:dateofposting')
.get((req,res) => {
    
    db.query('SELECT * FROM items WHERE dateofposting =?',[req.params.dateofposting]).then(ItemsData => {
        res.json({ItemsData});
        console.log(ItemsData);
        })
        .catch(() => {
            res.sendStatus(500);
        })
    /*let dateofposting2 = req.params;

    console.log(dateofposting2.dateofposting)

    var result = ItemsData.filter(obj => obj.dateofposting === parseInt(dateofposting2.dateofposting))
    console.log(result)
    res.json({result});*/
})

router
.route('/change/:id')
.put(
    passport.authenticate('basic', { session: false }),
    (req,res) => {
    

        db.query('UPDATE items SET title = ?,description = ?,category = ?,location = ?,askingprice = ?,dateofposting = ?,deliverytype = ?,sellername = ?,sellermail = ?,sellerphonenumber = ?, image1 = ?, image2 = ?,image3 = ?,image4 = ? WHERE id = ?'
        ,[req.body.title,req.body.description,req.body.category,req.body.location,req.body.askingprice,req.body.dateofposting,req.body.deliverytype,req.body.sellername,req.body.sellermail,req.body.sellerphonenumber,req.body.image1,req.body.image2,req.body.image3,req.body.image4,req.params.id]);
        res.sendStatus(201);

        /*ItemsData[Itemid.id] = 
        {
            userid: Itemid.id,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            location: req.body.location,
            images: req.body.images,
            askingprice: req.body.askingprice,
            dateofposting: req.body.dateofposting,
            deliverytype: req.body.deliverytype,
            sellername: req.body.sellername,
            sellermail: req.body.sellermail,
            sellerphonenumber: req.body.sellerphonenumber
        }

        res.send(ItemsData[Itemid.id]);*/
  })

router
.route('/delete/:id')
.delete(
    passport.authenticate('basic', { session: false }),
    (req, res) => {
    
        db.query('DELETE FROM items WHERE id = ?',[req.params.id]);
        db.query('ALTER TABLE items AUTO_INCREMENT=?',[(req.params.id-1)]); 
        /*let Itemid = req.params;
    
        console.log(Itemid.id);
        console.log(ItemsData[Itemid.id]);

        ItemsData.splice(Itemid.id,ItemsData.length);
        console.log(ItemsData);*/
        res.sendStatus(200);
    })

module.exports = router;