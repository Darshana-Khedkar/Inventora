import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error, totalPages, currentPage } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts({ page: 1 })); // Load first page when component mounts
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id)).then(() => {
        dispatch(getProducts({ page: currentPage })); // Reload current page after delete
      });
    }
  };

  const handlePageChange = (pageNumber) => {
    dispatch(getProducts({ page: pageNumber }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        {userInfo?.role === 'admin' && (
          <Link
            to="/admin/products/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Product
          </Link>
        )}
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>

            <div className="mt-4 flex gap-2">
              {userInfo?.role === 'admin' ? (
                <>
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
