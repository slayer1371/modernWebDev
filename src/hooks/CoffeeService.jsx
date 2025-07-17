import { fetchAllWithReviews } from './CoffeeModelService.jsx';

 //Fetch coffees + their reviews via fetchAllwithReviews

 export async function fetchCoffees() {
  const results = await fetchAllWithReviews();
  return results.map(c => ({
    id: c.id,
    name: c.get('name'),
    description: c.get('description'),
    price: c.get('price'),
    imageUrl: c.get('imageUrl'),
    reviews: c.get('reviews')?.map(r => ({
      id: r.id,
      rating: r.get('rating'),
      text: r.get('text')
    })) || []
  }));
}

