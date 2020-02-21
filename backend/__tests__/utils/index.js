function getStudentWeightOrHeight(min, max) {
  const random = (Math.random() * (max - min) + min) * 100;

  return Math.floor(random) / 100;
}

export { getStudentWeightOrHeight };
