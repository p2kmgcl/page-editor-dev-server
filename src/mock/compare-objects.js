window.compareObjects = (o1, o2) => {
  const changes = {};

  Object.keys(o1)
    .filter((key) => o1[key] !== o2[key])
    .forEach((key) => {
      changes[key] = {
        left: o1[key],
        right: o2[key],
      };
    });

  Object.keys(o2)
    .filter((key) => !changes[key] && o1[key] !== o2[key])
    .forEach((key) => {
      changes[key] = {
        left: o1[key],
        right: o2[key],
      };
    });

  if (Object.keys(changes).length) {
    console.table(changes);
  }
};
