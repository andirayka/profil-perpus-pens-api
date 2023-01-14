const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const resFormat = ({ res, message, data = {} }) => {
  res.status(200).json({ message, data });
};

module.exports = { slugify, resFormat };
