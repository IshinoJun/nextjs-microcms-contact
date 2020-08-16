import Contact from "../models/Contact";

const isContact = (item: unknown): item is Contact => {
  const target = item as Contact;

  return (
    "name" in target &&
    typeof target.name === "string" &&
    !!target.name &&
    "email" in target &&
    typeof target.email === "string" &&
    !!target.email &&
    "body" in target &&
    typeof target.body === "string" &&
    !!target.body
  );
};

export { isContact };