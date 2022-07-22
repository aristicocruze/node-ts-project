function omit<T>(obj: T, property: keyof T | (keyof T)[]) {
  // If an Array of properties.
  if (Array.isArray(property)) {
    const entries = Object.entries(obj).filter((item) => {
      const [key] = item;

      return !property.includes(key as keyof T);
    });

    return Object.fromEntries(entries);
  }
  // Remove a single property
  const { [property]: unused, ...rest } = obj;
  return rest;
}

export default omit;
