User Role Base Authentication & Role Base Routes

This project is a User Role Base Authentication system made with Node.js, Express, MongoDB, and TypeScript.
It has signup, login, email OTP verification, and forgot password with reset option.

Features

Signup with OTP verification (via email)

Login with email & password

Verify email with OTP

Forgot password flow → send OTP, verify OTP, reset password

Reusable middleware (follow DRY principle)

Concepts Used

Express Router → For handling routes

Middleware → For reusable logic (validation, hashing, OTP, email sending)

bcryptjs → For hashing passwords

crypto → For generating OTP

nodemailer → For sending OTP email

Mongoose → For database and user schema

TypeScript Interfaces → For type safety

DRY Principle → Don’t Repeat Yourself (reusing code)

API Endpoints

1) Signup User

Route:

POST /signup


Input JSON:

{
  "name": "John Doe",
  "email": "example@gmail.com",
  "number": 123456789,
  "password": "test123",
  "role":"user" ( "user" || "admin")
}



Response:

{ "message": "User registered successfully. Please verify your email." }

2) Verify Email OTP

Route:

POST /verify-otp


Input JSON:

{
  "email": "example@gmail.com",
  "otp": "123456"
}


Response:

{ "message": "Email verified successfully" }

3) Login User

Route:

POST /login


Input JSON:

{
  "email": "example@gmail.com",
  "password": "test123"
}


Response:

{
    "success": true,
    "message": "Login successful",
    "token": "TOKEN",
    "user": {
        "id": "",
        "name": "John Doe",
        "email": "example@gmail.com",
        "role": "user",
        "isVerified": true,
        "number": 123456789
    }
}

Forgot Password Flow
4) Forgot Password (Send OTP)

Route:

POST /forgot-password


Input JSON:

{
  "email": "example@gmail.com"
}


Response:

{ "message": "OTP sent to your email for password reset" }

5) Verify Reset OTP

Route:

POST /verify-reset-otp


Input JSON:

{
  "email": "example@gmail.com",
  "otp": "123456"
}


Response:

{ "message": "OTP verified, you can now reset your password" }

6) Reset Password

Route:

POST /reset-password


Input JSON:

{
  "email": "example@gmail.com",
  "password": "NewStrongPassword456"
}


Response:

{ "message": "Password reset successful" }


7) User Profile Flow

Route:

GET /profile

Headers:

Authorization : Bearer (Token)

Input JSON :

{
    "success": true,
    "message": "User profile fetched successfully",
    "data": {
        "name": "John Doe",
        "email": "example@gmail.com",
        "isVerified": true,
        "role": "user"
    }
}



8) Admin Dashboard Flow

Route:

GET /admin-dashboard

Headers:

Authorization : Bearer (Token)

Input JSON :

{
    "success": true,
    "message": "Admin dashboard data fetched successfully",
    "data": {
        "name": "John Doe",
        "email": "example@gmail.com",
        "isVerified": true,
        "role": "admin"
    }
}

9) Logout Flow :

Route:

POST: /logout

Headers:

Authorization : Bearer (Token)

Input JSON : 
{
  "Logout successful. Token removed."
}


🔄 Flow

Signup → User registered + OTP sent.

Verify OTP → Confirms user’s email.

Login → Works only if email verified.

Forgot Password → Send OTP to email.

Verify Reset OTP → Confirms OTP for reset.

Reset Password → Change password after OTP check.

User Profile → Check the role ,if role === 'user' then route satus will be "200 : ok"

Admin Dashboard → Check the role, if role === 'admin' then route status will be "200 : ok"

Logout → get the token if token exist then logout successfully and removed the token.

Testing on Postman

Always use Content-Type: application/json header.

Test APIs in this order:

/signup

/verify-otp

/login

/forgot-password

/verify-reset-otp

/reset-password

/profile

/admin-dashboard

/logout

Check email inbox for OTP when testing.

Routes Overview
Method	Route	Description
POST	/signup	Register + send OTP
POST	/verify-otp	Verify email with OTP
POST	/login	User login
POST	/forgot-password	Send OTP for reset
POST	/verify-reset-otp	Verify OTP for reset
POST	/reset-password	Reset password
POST	/logout	Logout
GET	  /profile User Profile fetched
GET   /admin-dashboard Admin Dashboard Data Fetched



How to Run Backend :

1) Clone that Repo, and run the command " npm install ", after create a MongoDB Database Cluster and connect with "MONGODB_URI" in file.
2) Create an Email Password from Google, and use in this for sending Otp on others email.
3) Create a " JWT_SECRET " and use.
4) Run this command " npm run dev "

Note : After all this steps you can see in CMD BASE_URL : "[Server Running on ](http://localhost:3000/api)"