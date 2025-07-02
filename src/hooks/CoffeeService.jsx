// CoffeeService.jsx
import { fetchAllWithReviews } from './CoffeeModelService.jsx';

 //Fetch coffees + their reviews via fetchAllwithReviews

 export async function fetchCoffees() {
  const results = await fetchAllWithReviews();
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


//Coffee and CoffeeReviews are 2 seperate classes. Through documentation, we tried accessing the
// values through query.include('reviews'), which was stored as an array of pointers, like so - 
// [
//   {
//     "__type": "Pointer",
//     "className": "CoffReview",
//     "objectId": "LfPZo7IIs5"
//   },
//   {
//     "__type": "Pointer",
//     "className": "CoffReview",
//     "objectId": "fFRPJKzg8r"
//   }
// ]

// and directly access the values in CoffReview class. 