import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StaticService { 
 demoUser = {
    "entities":{
       "users":{
          "00567340-785d-11ec-b8ad-11a49d1dc9ea":{
             "id":"00567340-785d-11ec-b8ad-11a49d1dc9ea",
             "first_name":"Test",
             "last_name":"Step",
             "email":"test@email.com",
             "alias":null,
             "phone_number":null,
             "country":null,
             "zip_code":null,
             "epay_subscription_id":null,
             "payment_card":null,
             "language":"en",
             "payment_card_issuer":null,
             "bank_account":null,
             "vat":null,
             "roles":[
                
             ],
             "auth_key":null,
             "economic_id":200100,
             "created_at":"2022-01-18T12:48:57.557Z",
             "address_1":null,
             "address_2":null,
             "is_company":false,
             "city":null,
             "country_id":null,
             "payout":null,
             "quickpay_subscription_id":null
          }
       }
    },
    "result":[
       "00567340-785d-11ec-b8ad-11a49d1dc9ea"
    ],
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDU2NzM0MC03ODVkLTExZWMtYjhhZC0xMWE0OWQxZGM5ZWEiLCJpYXQiOjE2NDI1OTQzNzYsImV4cCI6MTY0NTE4NjM3Nn0.Sw6c5qK1zuiJAmkmoYVPu3rFFuRsa5BzeiEIa6_m4H4",
    "languageChanged":false
 }

 demoRegister = {
   "entities":{
      "users":{
         "95e724e0-792f-11ec-8f8a-578abaec1af5":{
            "email":"admin@email.com",
            "first_name":"test ",
            "last_name":"registration",
            "language":"en",
            "id":"95e724e0-792f-11ec-8f8a-578abaec1af5"
         }
      }
   },
   "result":[
      "95e724e0-792f-11ec-8f8a-578abaec1af5"
   ],
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NWU3MjRlMC03OTJmLTExZWMtOGY4YS01NzhhYmFlYzFhZjUiLCJpYXQiOjE2NDI2MDA1ODIsImV4cCI6MTY0NTE5MjU4Mn0.CB_fbmySOmLeLUyWIieyge1ztMo0ZTBfSNnI2rZyEv0"
}

updateUser = {
   "entities":{
      "users":{
         "95e724e0-792f-11ec-8f8a-578abaec1af5":{
            "id":"95e724e0-792f-11ec-8f8a-578abaec1af5",
            "first_name":"test",
            "last_name":"registration test",
            "email":"admin@email.com",
            "password":"$2b$10$KypnYCVSGBcjJXOsxix9i.xGUS71FELTJyFW65J6IVk9ocXsJu6sC",
            "alias":null,
            "phone_number":null,
            "country":null,
            "zip_code":null,
            "epay_subscription_id":null,
            "payment_card":null,
            "language":"en",
            "payment_card_issuer":null,
            "bank_account":null,
            "vat":null,
            "roles":[
               
            ],
            "auth_key":null,
            "economic_id":null,
            "created_at":"2022-01-19T13:56:22.778Z",
            "address_1":null,
            "address_2":null,
            "is_company":false,
            "city":null,
            "country_id":218,
            "payout":null,
            "quickpay_subscription_id":null,
            "company":null
         }
      }
   },
   "result":[
      "95e724e0-792f-11ec-8f8a-578abaec1af5"
   ]
}

posts = {
   "pagination":{
      "total":2,
      "limit":10,
      "totalPages":1,
      "page":1
   },
   "posts":[
      {
         "id":"260de510-7942-11ec-b870-b16fbf7630d1",
         "title":"New post from coolguy",
         "maecenate":"a0daaba0-7868-11ec-936e-739f12a07846",
         "author":"00567340-785d-11ec-b8ad-11a49d1dc9ea",
         "author_alias":"test post",
         "content":"<strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
         "created_at":"2022-01-19T16:09:15.494Z",
         "status":"PUBLISHED",
         "sticky":false,
         "publish_date":"2022-01-19T16:09:15.494Z",
         "customization":null,
         "notify_followers":null,
         "notification_sent_at":null,
         "post_read_at":null,
         "media":[
            {
               "id":"13074a10-7942-11ec-b048-ed49ff2ae226",
               "obj_id":"260de510-7942-11ec-b870-b16fbf7630d1",
               "file_type":"image",
               "local_path":"thumb/image/93/333d91e424803c2a8948e7b90e3e7a-sc-1200.png",
               "role":"MEDIA",
               "filename":"Horned_logo.jpeg",
               "img_width":640,
               "img_height":512,
               "video_status":null,
               "video_preview_path":null,
               "created_at":"2022-01-19T16:08:43.616Z",
               "props":{
                  
               }
            }
         ],
         "file":null
      },
      {
         "id":"b6fec860-786a-11ec-9110-9b62e3d27088",
         "title":"New post from coolguy",
         "maecenate":"a0daaba0-7868-11ec-936e-739f12a07846",
         "author":"00567340-785d-11ec-b8ad-11a49d1dc9ea",
         "author_alias":"test",
         "content":"Test content for new post",
         "created_at":"2022-01-18T14:27:07.374Z",
         "status":"PUBLISHED",
         "sticky":false,
         "publish_date":"2022-01-18T14:27:07.374Z",
         "customization":null,
         "notify_followers":null,
         "notification_sent_at":null,
         "post_read_at":null,
         "media":[
            {
               "id":"cf502230-7868-11ec-9110-9b62e3d27088",
               "obj_id":"b6fec860-786a-11ec-9110-9b62e3d27088",
               "file_type":"image",
               "local_path":"thumb/image/93/333d91e424803c2a8948e7b90e3e7a-sc-1200.png",
               "role":"MEDIA",
               "filename":"logo-social.png",
               "img_width":1200,
               "img_height":630,
               "video_status":null,
               "video_preview_path":null,
               "created_at":"2022-01-18T14:13:29.193Z",
               "props":{
                  
               }
            }
         ],
         "file":[
            {
               "id":"13074a10-7942-11ec-b048-ed49ff2ae226",
               "obj_id":"260de510-7942-11ec-b870-b16fbf7630d1",
               "file_type":"image",
               "local_path":"thumb/image/93/333d91e424803c2a8948e7b90e3e7a-sc-1200.png",
               "role":"FILE",
               "filename":"Horned_logo.jpeg",
               "img_width":640,
               "img_height":512,
               "video_status":null,
               "video_preview_path":null,
               "created_at":"2022-01-19T16:08:43.616Z",
               "props":{
                  
               }
            }
         ]
      }
   ],
   "meta":{
      "isSupporter":false,
      "isAdmin":true,
      "isContentLocked":false
   }
}




    
}