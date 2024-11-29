import useEditProduct from "./useEditProduct";
import EditProductView from "../views/EditProductView";

export default function EditProductModal({ isOpen, onClose, onSave, product, categories }) {
  const {
    editedProduct,
    handleChange,
    handleCategoryChange,
    handleSave,
  } = useEditProduct({ product, categories, onSave, onClose });

  return (
    <EditProductView
      isOpen={isOpen}
      editedProduct={editedProduct}
      categories={categories}
      handleChange={handleChange}
      handleCategoryChange={handleCategoryChange}
      handleSave={handleSave}
      onClose={onClose}
    />
  );
}
