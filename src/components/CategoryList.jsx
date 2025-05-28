import React from 'react';
import PropTypes from 'prop-types';

function CategoryList({ categories, onCategoryClick, selectedCategory }) {
  return (
    <div className="p-4 w-full max-w-xl rounded-lg md:w-fit md:min-w-[20rem] bg-neutral-800 min-h-11 h-fit">
      <p className="text-sm font-medium text-neutral-50">Categories</p>
      <div className="flex flex-wrap gap-2 pt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryClick(category)}
            className={`px-3 py-1 h-fit rounded-full border border-neutral-500 inline-flex justify-center items-center ${selectedCategory === category ? 'bg-neutral-50 text-neutral-900' : 'text-neutral-50'}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired
};

export default CategoryList;
