// CoffeeModel.js
import Parse from '../parseConfig';

/**
 * Model for 'Coffee' class with relation to 'CoffeeReview'
 */
export default class CoffeeModel {
  /**
   * Fetch all coffees and include their reviews relation
   */
  static async fetchAllWithReviews() {
    const Coffee = Parse.Object.extend('Coffee');
    const query = new Parse.Query(Coffee);
    query.include('reviews');        // one-to-many relation
    return query.find();
  }
}