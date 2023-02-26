# SundsvallsSpegelnSSR

Navigate to REPERTUAR -> Hela Bioprogrammet to view all movies

# API DOCUMENTATION

/api/movies
 - GET - Get all movies
 
/api/movies/{id}
- GET - Get specific movie

/api/movies/{id}/screenings
- GET - Get 5 upcoming screenings for specific movie

/api/movies/{id}/reviews
- GET - Get all reviews for specific movie
  ### Parameters:
  - ?page=1 (required)
  ### Responses:
    Code 200
    ```
      {
        body: {
          "reviews": [
            {
              "id" "string",
              "attributes": {
                "comment": "string",
                "rating": 0,
                "author": "string",
                "verified": true,
                "movie": {}
              }
            }
          ],
          "pagination": {
            "page": 0,
            "pageSize": 25,
            "pageCount": 1,
            "total": 0
          }
        }
      }
    ```
    Code 404
  

- POST - Add new review 
  ### Request body:
  ```
  {
    body: {
      "author": "string",
      "rating": 0
      "comment": "string"
    }
  }
  ```
  ### Responses
    Code 200, 400, 403
    ```
    {
      body: {
        "status": {
          "isValid": false,
          "code": 0,
          "message": "string"
        }
      }
    }
    ```
/api/upcoming-screenings
- GET - Get 10 upcoming screenings
  ### Responses:
    Code 200
    ```
    {
      body: {
        "dates": [
        
        ],
        "screenings": [
        
        ]
      }
    }
    ```
    Code 404
    

