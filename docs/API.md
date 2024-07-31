# BAZAR API DOCUMENTATION
 
 ### Table of Contents

1. <a href="#base">Base URL</a>
2. <a href="#endpoint">Endpoints</a>
    * <a href="#user">User Management endpoints</a>
    * <a href="#product">Products endpoints</a>
    * <a href="#cart">Cart endpoints</a>
    * <a href="#booking">Booking endpoints</a>
    * <a href="#order">Order endpoints</a>


### <span id="base">Base URL</span>

The base URL for all API endpoints will be `http://localhost:{PORT}/api/v1`.


### <span id="endpoint">Endpoints</span>

<br id="user">**User Management endpoints**<br>

| HTTP Verbs | Endpoints | Action | Expected Data |
|  :---:  |  :---:  |  :---:  |  :---:  |
| POST | /users/signup | To Sign Up / create account | email : string,<br> password : string |
| POST | /users/signin | To Sign In | email : string,<br> password : string |
| GET | /users | To get user details |  |
| PATCH | /users | To update user data | fields to update : string |
| PATCH | /forgetpassword | To regenerate password | email : string |
| PATCH | /updatepassword/:id | To update password | password : string,<br> verificationCode |

<br id="product">**Products endpoints**<br>

| HTTP Verbs | Endpoints | Action | Expected Data |
|  :---:  |  :---:  |  :---:  |  :---:  |
| POST | /products | Add products in database |  |
| GET | /products/{productId} | Get product details | productId in params |
| GET | /products | Get all the products |  |

<br id="cart">**Cart endpoints**<br>

| HTTP Verbs | Endpoints | Action | Expected Data |
|  :---:  |  :---:  |  :---:  |  :---:  |
| POST | /carts | Create cart for user |  |
| GET | /carts | Get cart products |  |
| GET | /carts/{productSKUId} | Get cart product details | productSKUId in params |

<br id="booking">**Booking endpoints**<br>

| HTTP Verbs | Endpoints | Action | Expected Data |
|  :---:  |  :---:  |  :---:  |  :---:  |
| POST | /bookings/cart | Purchase cart products |  |
| POST | /bookings | Purchase single product | id:string,<br> quantity:string |


<br id="order">**Order endpoints**<br>

| HTTP Verbs | Endpoints | Action | Expected Data |
|  :---:  |  :---:  |  :---:  |  :---:  |
| GET | /orders/{orderId} | Get order details | orderId in params |
| GET | /orders | Get all orders |  |


For more, [refer](../src/routes/v1/index.js)