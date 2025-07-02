// CoffeeService.jsx
import CoffeeModel from './models/CoffeeModel';

/**
 * Fetch coffees + their reviews via CoffeeModel
 */
export async function fetchCoffees() {
  const results = await CoffeeModel.fetchAllWithReviews();
  return results.map(c => ({
    id: c.id,
    name: c.get('name'),
    description: c.get('description'),
    price: c.get('price'),
    reviews: c.get('reviews')?.map(r => ({
      id: r.id,
      rating: r.get('rating'),
      text: r.get('text')
    })) || []
  }));
}