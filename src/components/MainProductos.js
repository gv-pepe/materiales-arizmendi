import CategoryForm from '../views/CategoryForm';
import ProductForm from '../views/ProductForm';
import ProductList from '../views/ProductList';

export default function MainProductos() {
  return (
    <div className="container mx-auto p-4">
      <CategoryForm />
      <ProductForm />
      <ProductList />
    </div>
  );
}
