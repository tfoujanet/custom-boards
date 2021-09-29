Array.prototype.sortBy = function(prop) {
  return this.sort((a, b) => {
    const propA = a[prop];
    const propB = b[prop];
    return propA < propB ? -1 : propA > propB ? 1 : 0;
  });
};
