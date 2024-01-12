export const parseFilterOptions = (filterOption) => {
  const parsedFilter = {};

  for (const key in filterOption) {
    const value = filterOption[key];
    if (Array.isArray(value)) {
      parsedFilter[key] = value.map((item) => item.label);
    } else {
      parsedFilter[key] = value;
    }
  }

  for (const key in parsedFilter) {
    if (Array.isArray(parsedFilter[key]) && parsedFilter[key].length === 0) {
      delete parsedFilter[key];
    }
  }

  return parsedFilter;
};
