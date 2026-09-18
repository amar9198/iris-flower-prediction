// Display metadata for each class the model can predict.
// Keys must match the lowercase class names the API returns
// (setosa / versicolor / virginica).
export const SPECIES_INFO = {
  setosa: {
    label: "Iris setosa",
    color: "bloom",
    description:
      "The smallest-petaled of the three, with short, rounded petals and a compact flower head. Easiest of the three species for a model to tell apart.",
  },
  versicolor: {
    label: "Iris versicolor",
    color: "sky",
    description:
      "Mid-sized petals and sepals that sit between the other two species in almost every measurement, which is why it's the one most often confused with virginica.",
  },
  virginica: {
    label: "Iris virginica",
    color: "leaf",
    description:
      "The largest of the three, with long, broad petals. Typically has the longest petal length in the dataset.",
  },
};

export const EXAMPLE_VALUES = [
  { sepal_length: 5.1, sepal_width: 3.5, petal_length: 1.4, petal_width: 0.2, label: "Setosa example" },
  { sepal_length: 5.9, sepal_width: 3.0, petal_length: 4.2, petal_width: 1.5, label: "Versicolor example" },
  { sepal_length: 6.7, sepal_width: 3.0, petal_length: 5.2, petal_width: 2.3, label: "Virginica example" },
];
