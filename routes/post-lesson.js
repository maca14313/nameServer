
const express=require('express');
const router=express.Router();
const mysql=require('mysql')



const db=mysql.createConnection({
    host:"sql11.freemysqlhosting.net",
    user:"sql11644520",
    password:"JRgbfIDZQN",
    database:"sql11644520",
    /*connectionLimit: 50,
      queueLimit: 0,
      waitForConnection: true*/
    //charset : 'utf8mb4_unicode_ci',
  })


router.get('/',(req,res)=>{
    res.send("hello word")
})

              //registermember
router.post('/registermember',async(req,res)=>{
     

     db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber} `,(errors,resultes)=>{

          const matchPhoneNumber=resultes.map((re)=>{
            return re.phone_number;
          })
     
         if (matchPhoneNumber!=req.body.phoneNumber) {

             /****************************************** */
             db.query(`SELECT * FROM Phone_Number_List WHERE phone_number=${req.body.phoneNumber}`,(error,result)=>{
              const phoneNumberExist=result.map((re)=>{
                return re.phone_number
              })
    
              if (phoneNumberExist==req.body.phoneNumber) {
             /****************************************** */
             const memberNumber=req.body.phoneNumber
             const memberName=req.body.name
             const g=memberName.length-2
             const memberId= memberName.slice(0,2) + memberNumber.slice(6) + Math.floor(Math.random() * 100);
             const q="INSERT INTO members_data (`name`,`father_name`,`grand_father_name`,`email`,`gender`,`campus`,`dept`,`city`,`phone_number`,`register_date`,`personal_id`,`batch`) VALUES (?)"
             const values= [req.body.name,req.body.fatherName,req.body.grandFatherName,req.body.email,req.body.gender,req.body.campus,req.body.department,req.body.city,req.body.phoneNumber,new Date(),memberId,req.body.batch];
                  
                db.query(q,[values],(err,data)=>{
                  if(data){
                    db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber}`,(e,re)=>{
                      console.log(re.map((r)=>r.personal_id))
                      res.json({
                        id:re.map((r)=>r.personal_id),
                        name:re.map((r)=>r.name),
                        father_name:re.map((r)=>r.father_name),
                        grand_father_name:re.map((r)=>r.grand_father_name),
                        email:re.map((r)=>r.email),
                        gender:re.map((r)=>r.gender),
                        batch:re.map((r)=>r.batch),
                        campus:re.map((r)=>r.campus),
                        dept:re.map((r)=>r.dept),
                        city:re.map((r)=>r.city),
                        phone_number:re.map((r)=>r.phone_number),
                        register_date:re.map((r)=>r.register_date),

                        response:'',
                        registerd:'Registerd'
                      })
                    })
                  
          
          
          
                  }else{
                  res.send(err)
          
                  }
               } )
         /*******************************************/
              } else {
                res.json({
                  id:'',
                  response:'Your phone number not on the list',
                })
    
              }  
        } )
    
            /*******************************************/
         } else {
          res.json({
            id:'',
            response:'Try another phone number',
          })

         }

     })






   


    
  

  
  })    
  /************************** Log In  *********************************** */

  router.post('/loginmember',async(req,res)=>{
     
    //console.log(req.body.id)

    db.query(`SELECT * FROM members_data WHERE phone_number=${req.body.phoneNumber} `,(errors,resultes)=>{

      if (resultes) {

        const matchPhoneNumber=resultes.map((re)=>{
        return re.personal_id;
         }) 
         if (matchPhoneNumber[0]==req.body.id) {
          res.json({
            id:resultes.map((r)=>r.personal_id),
            name:resultes.map((r)=>r.name),
            father_name:resultes.map((r)=>r.father_name),
            grand_father_name:resultes.map((r)=>r.grand_father_name),
            email:resultes.map((r)=>r.email),
            gender:resultes.map((r)=>r.gender),
            batch:resultes.map((r)=>r.batch),
            campus:resultes.map((r)=>r.campus),
            dept:resultes.map((r)=>r.dept),
            city:resultes.map((r)=>r.city),
            phone_number:resultes.map((r)=>r.phone_number),
            register_date:resultes.map((r)=>r.register_date),

            response:'',
            registerd:'Loged In'
          })
         } else {
          res.json({
            response:'incorrect intery',
          })
         }

      } else {
        res.json({
          response:'incorrect intery',
        })
      }
    
    
       

    })






  


   
 

 
 })    
  /* addphonenumber addphonenumber addphonenumber addphonenumber addphonenumber addphonenumber*/
      
  router.post('/addphonenumber',async(req,res)=>{
    const q="INSERT INTO Phone_Number_List (`phone_number`) VALUES (?)"
    const v=[req.body.phoneNumber];
    db.query(`SELECT * FROM Phone_Number_List WHERE phone_number =${req.body.phoneNumber} `,(err,result)=>{
            const existPhoneNumber=result?.map((re)=>{
        return re.phone_number
   })
       if(existPhoneNumber==req.body.phoneNumber){
        res.json('Duplicated entry')
       }else{

           db.query(q,[v],(error,data)=>{
          if(data){
           res.json('registerd')
          }else{
            res.json('err')
                    }
          
        })

       }

       
     
    })
    
  })

  /******************************************************************************************************* */
     
  router.get('/listofmembers',async(req,res)=>{

      db.query(`SELECT * FROM members_data `,(err,data)=>{
             if(data){
              res.json(data)
             }else{
              res.json('err')
                         }
      })
  })

  router.get('/listofphonenumber',async(req,res)=>{

    db.query(`SELECT * FROM Phone_Number_List `,(err,data)=>{
           if(data){
            res.json(data)
           }else{
            res.json('err')
                     }
    })
})

  /******************************************************************************************************* */


  router.get(`/fetchmember/:phone_number`,(req,res)=>{
  db.query(`SELECT * FROM members_data WHERE phone_number=${req.params.phone_number}`,(err,re)=>{
    res.json({
                        id:re.map((r)=>r.personal_id),
                        name:re.map((r)=>r.name),
                        father_name:re.map((r)=>r.father_name),
                        grand_father_name:re.map((r)=>r.grand_father_name),
                        email:re.map((r)=>r.email),
                        gender:re.map((r)=>r.gender),
                        batch:re.map((r)=>r.batch),
                        campus:re.map((r)=>r.campus),
                        dept:re.map((r)=>r.dept),
                        city:re.map((r)=>r.city),
                        phone_number:re.map((r)=>r.phone_number),
                        register_date:re.map((r)=>r.register_date),
    })
  })
})
  /*****************************************************UPDATE************************************************** */

     router.put(`/updatemember`,(req,res)=>{
      db.query(`UPDATE members_data 
      
      SET name=?,father_name=?,grand_father_name=?,email=?,gender=?,campus=?,dept=?,city=?,phone_number=?,batch=?
      WHERE phone_number=${req.body.phoneNumber} `,[req.body.name,req.body.fatherName,req.body.grandFatherName,req.body.email,req.body.gender,req.body.campus,req.body.department,req.body.city,req.body.phoneNumber,req.body.batch],(err,data)=>{
  if (data) {
    
    res.json('You have successfully updated your profile')

  } else {
    res.json('try again')
  }
      })
     })
    /******************************************************************************************************* */
  router.get(`/delete/:phone_number`,(req,res)=>{
    db.query(`DELETE FROM members_data WHERE phone_number = ${req.params.phone_number}`,(err,data)=>{
      if (data) {
        res.json('ok')
      }else{
        res.json('err')
      }
    })
  })

  router.get(`/deletephonenumber/:phone_number`,(req,res)=>{
    db.query(`DELETE FROM Phone_Number_List WHERE phone_number = ${req.params.phone_number}`,(err,data)=>{
      if (data) {
        res.json('ok')
      }else{
        res.json(err)
      }
      
    })
  })
        /******************************************************************************************************* */

        router.get(`/searchbyname/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM members_data WHERE name LIKE '${req.params.searchText}%'`,(err,re)=>{
            if (re) {
              res.json(re)
            }else{
              res.json('err')
                        }
          })
        })

        router.get(`/searchbyphonenumber/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM members_data WHERE phone_number = ${req.params.searchText}`,(err,re)=>{
            if (re) {
              res.json(re)
            }else{
              res.json('err')
                        }
          })
        })


        router.get(`/searchphonenumber/:searchText`,(req,res)=>{
          db.query(`SELECT * FROM Phone_Number_List WHERE phone_number = ${req.params.searchText}`,(err,re)=>{
            if (re) {
              res.json(re)
            }else{
              res.json('err')
              
            }
          })
        })
        /******************************************************************************************************* */

module.exports=router