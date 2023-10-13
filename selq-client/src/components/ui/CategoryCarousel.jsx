import React from 'react';
import { CATEGORIES } from '../../constant/categories';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { StyledBadge, StyledButton } from '../../styles/Styles';

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
    <div style={{ marginTop: '20px', padding: '0 10px 0' }}>
      <ScrollingCarousel>
        {CATEGORIES.map(({ category, label }, index) => (
          <StyledButton
            style={{ margin: '5px' }}
            key={index}
            onClick={() => onClickCategory(label)}
            selected={selectedCategory === label}
          >
            <span style={{ paddingRight: '5px' }}>{category}</span>
            <StyledBadge selected={selectedCategory === label}>
              {categoryCounts.get(label) ?? 0}
            </StyledBadge>
          </StyledButton>
        ))}
      </ScrollingCarousel>
    </div>
  );
}
