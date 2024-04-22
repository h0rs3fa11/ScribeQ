import ObjectID from "bson-objectid";

export const generateId = () => {
  return ObjectID();
};
