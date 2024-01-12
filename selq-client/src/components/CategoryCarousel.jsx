import React from 'react';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { CATEGORIES } from '../constant/categories';
import { StyledBadge, StyledButton } from '../styles/Styles';

export default function CategoryCarousel({
  questions,
  onClickCategory,
  selectedCategory,
}) {
  const categoryCounts = new Map();
  categoryCounts.set('all', questions?.length);

  questions?.forEach((question) => {
    const category = question.category;
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  });

  return (
    <div className='mt-3 px-2'>
      <ScrollingCarousel>
        {CATEGORIES.map(({ category, label }, index) => (
          <StyledButton
            className='m-1'
            key={index}
            onClick={() => onClickCategory(label)}
            selected={selectedCategory === label}
          >
            <span className='px-1'>{category}</span>
            <StyledBadge selected={selectedCategory === label}>
              {categoryCounts.get(label) ?? 0}
            </StyledBadge>
          </StyledButton>
        ))}
      </ScrollingCarousel>
    </div>
  );
}
