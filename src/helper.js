const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[-]+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const resFormat = ({ res, message, data }) => {
  res.status(200).json({ message, data });
};

module.exports = { slugify, resFormat };
