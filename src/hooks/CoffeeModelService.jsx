// CoffeeModel.jsx
import Parse from "parse";
 export const fetchAllWithReviews = () => {
    const Coffee = Parse.Object.extend('Coffee');
    const query = new Parse.Query(Coffee);
    query.include('reviews');        // one-to-many relation, 1 coffee type can have multiple ratings from many customers.
    return query.find();
  }