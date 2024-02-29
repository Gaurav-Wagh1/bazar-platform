# BAZAR (E-COMMERCE PLATFORM)



##### Assosiations betweet different tables of database

categories -> subcategories (one to many)
subcategories -> products  (one to many)
supplier -> products (one to many)
user -> cart (one to one)
user -> order-details (one to many)
cart -> cartItem (one to many)
productsky -> cartitem (one to many)
paymentdetails -> orderdetails (one to one)
orderdetails -> orderItem (one to many)
productsku -> orderItem (one to many)



##### Migration order (db:migrate)

###### 1st migration
user        
category    
supplier    
orderdetail 

###### 2nd migration
subcategory 
cart        
paymentdetail   

###### 3rd migration
product      

###### 4th migration
productsku  

###### 5th migration
cartitem    
orderitem   